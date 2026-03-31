// ============================================
// Cálculo de Crédito con Aval del Estado (CAE) Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CreditoCAEInput {
  montoCredito: number;
  tasaAnual: number; // Tasa de interés anual (típico 2-5%)
  plazoMeses: number; // Plazo en meses (típico 120-180)
  tieneGarantiaEstatal: boolean;
}

export interface CreditoCAEResult {
  montoCredito: number;
  tasaAnual: number;
  plazoMeses: number;
  dividendoMensual: number;
  totalIntereses: number;
  totalPago: number;
  costoCredito: number; // Multiplicador (totalPago / montoCredito)
  montoGarantiaEstatal: number;
}

/**
 * Calcula el dividendo mensual con amortización francesa (cuota fija)
 *
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
 * donde P = monto, r = tasa mensual, n = número de cuotas
 */
function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;

  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return monto * (tasaMensual * factor) / (factor - 1);
}

/**
 * Calcula el crédito con Aval del Estado (CAE)
 *
 * El CAE es un crédito para estudios superiores con garantía estatal
 * de hasta el 90% del monto. Utiliza amortización francesa (cuota fija)
 * con tasas que varían entre 2% y 5% anual según institución y año.
 *
 * Base legal: Ley 20.027 (Crédito con Aval del Estado para Estudios
 *             de Educación Superior), y sus modificaciones.
 *
 * @param input - Datos para el cálculo del crédito CAE
 * @returns Desglose completo del crédito con aval del estado
 */
export function calculateCreditoCAE(input: CreditoCAEInput): CreditoCAEResult {
  const { montoCredito, tasaAnual, plazoMeses, tieneGarantiaEstatal } = input;

  // Validar rangos
  const montoValido = Math.max(0, montoCredito);
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));

  // Tasa mensual
  const tasaMensual = tasaValida / 100 / 12;

  // Dividendo mensual (amortización francesa)
  const dividendoMensual = calcularPMT(montoValido, tasaMensual, plazoValido);

  // Total a pagar
  const totalPago = dividendoMensual * plazoValido;

  // Total de intereses
  const totalIntereses = totalPago - montoValido;

  // Costo del crédito (multiplicador)
  const costoCredito = montoValido > 0
    ? Math.round((totalPago / montoValido) * 100) / 100
    : 0;

  // Garantía estatal: 90% del monto del crédito si aplica
  const montoGarantiaEstatal = tieneGarantiaEstatal ? montoValido * 0.9 : 0;

  return {
    montoCredito: Math.round(montoValido),
    tasaAnual: tasaValida,
    plazoMeses: plazoValido,
    dividendoMensual: Math.round(dividendoMensual),
    totalIntereses: Math.round(totalIntereses),
    totalPago: Math.round(totalPago),
    costoCredito,
    montoGarantiaEstatal: Math.round(montoGarantiaEstatal),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function creditoCAEToResults(result: CreditoCAEResult): CalculatorResult[] {
  return [
    {
      label: 'Dividendo Mensual',
      value: result.dividendoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Total a Pagar',
      value: result.totalPago,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Total Intereses',
      value: result.totalIntereses,
      format: 'CLP',
    },
    {
      label: 'Monto del Crédito',
      value: result.montoCredito,
      format: 'CLP',
    },
    {
      label: 'Costo del Crédito (x)',
      value: result.costoCredito,
      format: 'number',
    },
    {
      label: 'Garantía Estatal',
      value: result.montoGarantiaEstatal,
      format: 'CLP',
    },
    {
      label: 'Tasa Anual',
      value: result.tasaAnual,
      format: 'percentage',
    },
    {
      label: 'Plazo (meses)',
      value: result.plazoMeses,
      format: 'number',
    },
  ];
}
