// ============================================
// Cálculo de Crédito Automotriz Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CreditoAutomotrizInput {
  valorVehiculo: number;
  pie: number;
  tasaAnual: number; // Tasa de interés anual (típico 4-8%)
  plazoMeses: number; // Plazo en meses (24-60)
  incluyeSeguro?: boolean;
}

export interface CreditoAutomotrizResult {
  valorVehiculo: number;
  pie: number;
  montoFinanciar: number;
  tasaAnual: number;
  plazoMeses: number;
  dividendoMensual: number;
  seguroMensual: number;
  dividendoConSeguro: number;
  totalIntereses: number;
  totalPago: number;
  costoTotal: number;
}

/**
 * Calcula la cuota mensual con amortización francesa (cuota fija)
 *
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;

  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return monto * (tasaMensual * factor) / (factor - 1);
}

/**
 * Calcula el crédito automotriz
 *
 * Simula un crédito de consumo destinado a la compra de un vehículo,
 * con amortización francesa (cuota fija). Opcionalmente incluye seguro
 * vehicular estimado en 0,3% mensual del valor del vehículo.
 *
 * Base legal: Ley 18.010 (Operaciones de Crédito de Dinero),
 *             Ley 19.496 (Protección de los Derechos de los Consumidores)
 *
 * @param input - Datos para el cálculo del crédito automotriz
 * @returns Desglose completo del crédito automotriz
 */
export function calculateCreditoAutomotriz(input: CreditoAutomotrizInput): CreditoAutomotrizResult {
  const { valorVehiculo, pie, tasaAnual, plazoMeses, incluyeSeguro = false } = input;

  // Validar rangos
  const valorValido = Math.max(0, valorVehiculo);
  const pieValido = Math.max(0, Math.min(pie, valorValido));
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));

  // Monto a financiar
  const montoFinanciar = valorValido - pieValido;

  // Tasa mensual
  const tasaMensual = tasaValida / 100 / 12;

  // Dividendo mensual sin seguro
  const dividendoMensual = montoFinanciar > 0
    ? calcularPMT(montoFinanciar, tasaMensual, plazoValido)
    : 0;

  // Seguro vehicular: 0,3% mensual del valor del vehículo
  const seguroMensual = incluyeSeguro ? Math.round(valorValido * 0.003) : 0;

  // Dividendo con seguro incluido
  const dividendoConSeguro = Math.round(dividendoMensual) + seguroMensual;

  // Total a pagar (solo crédito, sin seguro)
  const totalPago = Math.round(dividendoMensual) * plazoValido;

  // Total de intereses
  const totalIntereses = totalPago - montoFinanciar;

  // Costo total incluyendo pie + crédito + seguros
  const costoTotal = totalPago + (seguroMensual * plazoValido);

  return {
    valorVehiculo: Math.round(valorValido),
    pie: Math.round(pieValido),
    montoFinanciar: Math.round(montoFinanciar),
    tasaAnual: tasaValida,
    plazoMeses: plazoValido,
    dividendoMensual: Math.round(dividendoMensual),
    seguroMensual,
    dividendoConSeguro: Math.round(dividendoConSeguro),
    totalIntereses: Math.round(totalIntereses),
    totalPago: Math.round(totalPago),
    costoTotal: Math.round(costoTotal),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function creditoAutomotrizToResults(result: CreditoAutomotrizResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Dividendo Mensual',
      value: result.dividendoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto a Financiar',
      value: result.montoFinanciar,
      format: 'CLP',
    },
    {
      label: 'Valor Vehículo',
      value: result.valorVehiculo,
      format: 'CLP',
    },
    {
      label: 'Pie',
      value: result.pie,
      format: 'CLP',
    },
    {
      label: 'Total Intereses',
      value: result.totalIntereses,
      format: 'CLP',
    },
    {
      label: 'Total a Pagar (crédito)',
      value: result.totalPago,
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

  if (result.seguroMensual > 0) {
    results.push(
      {
        label: 'Seguro Mensual',
        value: result.seguroMensual,
        format: 'CLP',
      },
      {
        label: 'Dividendo + Seguro',
        value: result.dividendoConSeguro,
        format: 'CLP',
        highlight: true,
      },
      {
        label: 'Costo Total (pie + crédito + seguro)',
        value: result.costoTotal,
        format: 'CLP',
      },
    );
  }

  return results;
}
