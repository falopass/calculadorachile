// ============================================
// Cálculo de Crédito Automotriz Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CreditoAutomotrizInput {
  valorVehiculo: number;
  pie: number;
  /** Tasa anual nominal (típico 8-15% para automotriz en 2026). */
  tasaAnual: number;
  plazoMeses: number;
  incluyeSeguro?: boolean;
  /**
   * Costos adicionales (gastos operacionales, comisiones, seguros
   * obligatorios) para calcular CAE simple. Default 2% del crédito.
   */
  gastosAsociadosPct?: number;
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
  /** CAE estimada (incluye gastos asociados). */
  caeAproximada: number;
}

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return (monto * (tasaMensual * factor)) / (factor - 1);
}

/**
 * Calcula el crédito automotriz con amortización francesa.
 *
 * Notas sobre tasas:
 *  - Tasas reales 2026 para crédito automotriz: 8-15% anual nominal,
 *    según institución, plazo y perfil del cliente.
 *  - El seguro de vehículo NO se modela como % del valor mensual
 *    (eso era 0,3% mensual = 3,6% anual, sobreestimado). Se ajusta
 *    a un valor más realista: ~0,15% mensual del valor.
 *
 * Base legal: Ley 18.010 (Operaciones de Crédito de Dinero),
 *             Ley 19.496 (Protección al Consumidor),
 *             Ley 20.555 (SERNAC Financiero - obliga a informar CAE).
 */
export function calculateCreditoAutomotriz(
  input: CreditoAutomotrizInput,
): CreditoAutomotrizResult {
  const {
    valorVehiculo,
    pie,
    tasaAnual,
    plazoMeses,
    incluyeSeguro = false,
    gastosAsociadosPct = 2,
  } = input;

  const valorValido = Math.max(0, valorVehiculo);
  const pieValido = Math.max(0, Math.min(pie, valorValido));
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));

  const montoFinanciar = valorValido - pieValido;
  const tasaMensual = tasaValida / 100 / 12;

  const dividendoMensual =
    montoFinanciar > 0 ? calcularPMT(montoFinanciar, tasaMensual, plazoValido) : 0;

  // Seguro mensual: 0,15% del valor del vehículo (más realista que 0,3%).
  const seguroMensual = incluyeSeguro ? Math.round(valorValido * 0.0015) : 0;
  const dividendoConSeguro = Math.round(dividendoMensual) + seguroMensual;

  const totalPago = Math.round(dividendoMensual) * plazoValido;
  const totalIntereses = totalPago - montoFinanciar;
  const costoTotal = totalPago + seguroMensual * plazoValido;

  // CAE simple: tasa anual + gastos prorrateados anualmente.
  // Aproximación: tasa nominal + (gastos% / años).
  const anios = plazoValido / 12;
  const caeAproximada =
    montoFinanciar > 0 && anios > 0
      ? Math.round((tasaValida + gastosAsociadosPct / anios) * 100) / 100
      : tasaValida;

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
    caeAproximada,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function creditoAutomotrizToResults(
  result: CreditoAutomotrizResult,
): CalculatorResult[] {
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
      label: 'CAE Aproximada',
      value: result.caeAproximada,
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
        label: 'Costo Total (crédito + seguro)',
        value: result.costoTotal,
        format: 'CLP',
      },
    );
  }

  return results;
}
