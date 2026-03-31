// ============================================
// Simulador de Crédito Hipotecario Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CreditoHipotecarioInput {
  /** Monto del crédito en UF */
  montoUF: number;
  /** Plazo del crédito en años (típicamente 20-30) */
  plazoAnos: number;
  /** Tasa de interés anual en porcentaje (ej: 4.5 para 4.5%) */
  tasaAnual: number;
  /** Pie en UF (opcional) */
  pieUF?: number;
}

export interface CreditoHipotecarioResult {
  /** Monto del crédito solicitado en UF */
  montoUF: number;
  /** Pie pagado en UF */
  pieUF: number;
  /** Monto a financiar en UF (monto - pie) */
  montoFinanciarUF: number;
  /** Tasa de interés anual */
  tasaAnual: number;
  /** Plazo en años */
  plazoAnos: number;
  /** Plazo total en meses */
  plazoMeses: number;
  /** Dividendo mensual en UF */
  dividendoMensualUF: number;
  /** Dividendo mensual en CLP */
  dividendoMensualCLP: number;
  /** Monto financiado en CLP */
  montoFinanciarCLP: number;
  /** Total pagado durante el crédito en UF */
  totalPagoUF: number;
  /** Total pagado durante el crédito en CLP */
  totalPagoCLP: number;
  /** Total de intereses pagados en UF */
  totalInteresesUF: number;
  /** Multiplicador: cuántas veces se paga sobre el monto financiado */
  costoTotal: number;
  /** Valor UF usado para la conversión */
  valorUF: number;
}

/**
 * Calcula el dividendo mensual y costo total de un crédito hipotecario
 * usando el sistema de amortización francés (cuota fija).
 *
 * Fórmula del dividendo (PMT):
 *   PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
 *   donde:
 *     P = monto a financiar
 *     r = tasa mensual (tasa anual / 12 / 100)
 *     n = plazo total en meses
 *
 * En Chile los créditos hipotecarios se expresan en UF y el dividendo
 * se ajusta mensualmente según el valor de la UF.
 *
 * Base legal: Ley General de Bancos, Título VIII (Créditos Hipotecarios);
 *             Norma de la Comisión para el Mercado Financiero (CMF).
 *
 * @param input - Datos del crédito hipotecario
 * @returns Desglose completo del crédito hipotecario
 */
export function calculateCreditoHipotecario(input: CreditoHipotecarioInput): CreditoHipotecarioResult {
  const { montoUF, plazoAnos, tasaAnual, pieUF = 0 } = input;

  const valorUF = UF.valor;

  // Validaciones de rango
  if (montoUF < 0) {
    throw new Error('El monto en UF no puede ser negativo');
  }
  if (plazoAnos < 1 || plazoAnos > 50) {
    throw new Error('El plazo debe estar entre 1 y 50 años');
  }
  if (tasaAnual < 0 || tasaAnual > 100) {
    throw new Error('La tasa anual debe estar entre 0% y 100%');
  }
  if (pieUF < 0) {
    throw new Error('El pie no puede ser negativo');
  }
  if (pieUF >= montoUF) {
    throw new Error('El pie no puede ser igual o mayor al monto del crédito');
  }

  // Monto a financiar (crédito - pie)
  const montoFinanciarUF = montoUF - pieUF;

  // Plazo total en meses
  const plazoMeses = plazoAnos * 12;

  // Tasa mensual expresada como decimal
  const tasaMensual = tasaAnual / 100 / 12;

  // Cálculo del dividendo usando amortización francesa
  let dividendoMensualUF: number;

  if (tasaMensual === 0) {
    // Sin interés: dividendo es simplemente la división del capital
    dividendoMensualUF = montoFinanciarUF / plazoMeses;
  } else {
    // PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + tasaMensual, plazoMeses);
    dividendoMensualUF = montoFinanciarUF * (tasaMensual * factor) / (factor - 1);
  }

  // Totales
  const totalPagoUF = dividendoMensualUF * plazoMeses;
  const totalInteresesUF = totalPagoUF - montoFinanciarUF;
  const costoTotal = totalPagoUF / montoFinanciarUF;

  // Conversiones a CLP
  const montoFinanciarCLP = montoFinanciarUF * valorUF;
  const dividendoMensualCLP = dividendoMensualUF * valorUF;
  const totalPagoCLP = totalPagoUF * valorUF;

  return {
    montoUF: Math.round(montoUF * 100) / 100,
    pieUF: Math.round(pieUF * 100) / 100,
    montoFinanciarUF: Math.round(montoFinanciarUF * 100) / 100,
    tasaAnual: Math.round(tasaAnual * 100) / 100,
    plazoAnos,
    plazoMeses,
    dividendoMensualUF: Math.round(dividendoMensualUF * 100) / 100,
    dividendoMensualCLP: Math.round(dividendoMensualCLP),
    montoFinanciarCLP: Math.round(montoFinanciarCLP),
    totalPagoUF: Math.round(totalPagoUF * 100) / 100,
    totalPagoCLP: Math.round(totalPagoCLP),
    totalInteresesUF: Math.round(totalInteresesUF * 100) / 100,
    costoTotal: Math.round(costoTotal * 100) / 100,
    valorUF,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function creditoHipotecarioToResults(result: CreditoHipotecarioResult): CalculatorResult[] {
  return [
    {
      label: 'Dividendo Mensual (CLP)',
      value: result.dividendoMensualCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Dividendo Mensual (UF)',
      value: result.dividendoMensualUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Monto a Financiar (UF)',
      value: result.montoFinanciarUF,
      format: 'UF',
    },
    {
      label: 'Monto a Financiar (CLP)',
      value: result.montoFinanciarCLP,
      format: 'CLP',
    },
    {
      label: 'Total Intereses (UF)',
      value: result.totalInteresesUF,
      format: 'UF',
    },
    {
      label: 'Total a Pagar (UF)',
      value: result.totalPagoUF,
      format: 'UF',
    },
    {
      label: 'Total a Pagar (CLP)',
      value: result.totalPagoCLP,
      format: 'CLP',
    },
    {
      label: 'Costo Total (multiplicador)',
      value: result.costoTotal,
      format: 'number',
    },
    {
      label: 'Tasa Anual',
      value: result.tasaAnual,
      format: 'percentage',
    },
    {
      label: 'Plazo',
      value: result.plazoMeses,
      format: 'days',
    },
    {
      label: 'Pie (UF)',
      value: result.pieUF,
      format: 'UF',
    },
    {
      label: 'Valor UF',
      value: result.valorUF,
      format: 'CLP',
    },
  ];
}
