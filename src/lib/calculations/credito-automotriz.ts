// ============================================
// Cálculo de Crédito Automotriz Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { SEGURO_VEHICULAR, CREDITO_AUTOMOTRIZ } from '@/lib/values/constants';

export interface CreditoAutomotrizInput {
  valorVehiculo: number;
  pie: number;
  tasaAnual: number;
  plazoMeses: number;
  incluyeSeguro?: boolean;
  /** Gastos/comisiones % del crédito para CAE simple. */
  gastosAsociadosPct?: number;
}

export interface CreditoAutomotrizResult {
  valorVehiculo: number;
  pie: number;
  piePorcentaje: number;
  montoFinanciar: number;
  tasaAnual: number;
  plazoMeses: number;
  dividendoMensual: number;
  seguroMensual: number;
  dividendoConSeguro: number;
  totalIntereses: number;
  totalPago: number;
  costoTotal: number;
  caeAproximada: number;
  gastosAsociadosPct: number;
  pctIntereses: number;
}

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return (monto * (tasaMensual * factor)) / (factor - 1);
}

/**
 * Crédito automotriz — amortización francesa.
 * CAE es aproximación educativa (no reemplaza la CAE de la hoja de resumen).
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
    gastosAsociadosPct = CREDITO_AUTOMOTRIZ.gastos_asociados_default,
  } = input;

  const valorValido = Math.max(0, valorVehiculo);
  const pieValido = Math.max(0, Math.min(pie, valorValido));
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));
  const gastosPct = Math.max(0, Math.min(50, gastosAsociadosPct));

  const montoFinanciar = valorValido - pieValido;
  const piePorcentaje =
    valorValido > 0 ? Math.round((pieValido / valorValido) * 1000) / 10 : 0;
  const tasaMensual = tasaValida / 100 / 12;

  const dividendoMensual =
    montoFinanciar > 0 ? calcularPMT(montoFinanciar, tasaMensual, plazoValido) : 0;

  const seguroMensual = incluyeSeguro
    ? Math.round(valorValido * (SEGURO_VEHICULAR.tasa_mensual_porcentaje / 100))
    : 0;
  const dividendoConSeguro = Math.round(dividendoMensual) + seguroMensual;

  const totalPago = Math.round(dividendoMensual) * plazoValido;
  const totalIntereses = totalPago - montoFinanciar;
  const costoTotal = totalPago + seguroMensual * plazoValido;
  const pctIntereses =
    montoFinanciar > 0 ? Math.round((totalIntereses / montoFinanciar) * 1000) / 10 : 0;

  const anios = plazoValido / 12;
  const caeAproximada =
    montoFinanciar > 0 && anios > 0
      ? Math.round((tasaValida + gastosPct / anios) * 100) / 100
      : tasaValida;

  return {
    valorVehiculo: Math.round(valorValido),
    pie: Math.round(pieValido),
    piePorcentaje,
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
    gastosAsociadosPct: gastosPct,
    pctIntereses,
  };
}

export function creditoAutomotrizToResults(
  result: CreditoAutomotrizResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Dividendo mensual (crédito)',
      value: result.dividendoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto a financiar',
      value: result.montoFinanciar,
      format: 'CLP',
    },
    {
      label: 'Pie',
      value: result.pie,
      format: 'CLP',
    },
    {
      label: 'Pie sobre valor (%)',
      value: result.piePorcentaje,
      format: 'percentage',
    },
    {
      label: 'Valor vehículo',
      value: result.valorVehiculo,
      format: 'CLP',
    },
    {
      label: 'Total intereses',
      value: result.totalIntereses,
      format: 'CLP',
    },
    {
      label: 'Intereses / capital (%)',
      value: result.pctIntereses,
      format: 'percentage',
    },
    {
      label: 'Total a pagar (solo crédito)',
      value: result.totalPago,
      format: 'CLP',
    },
    {
      label: 'Tasa anual ingresada',
      value: result.tasaAnual,
      format: 'percentage',
    },
    {
      label: 'CAE aproximada (educativa)',
      value: result.caeAproximada,
      format: 'percentage',
    },
    {
      label: 'Gastos asociados usados en CAE (%)',
      value: result.gastosAsociadosPct,
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
        label: 'Seguro mensual estimado',
        value: result.seguroMensual,
        format: 'CLP',
      },
      {
        label: 'Dividendo + seguro',
        value: result.dividendoConSeguro,
        format: 'CLP',
        highlight: true,
      },
      {
        label: 'Costo total (crédito + seguros del plazo)',
        value: result.costoTotal,
        format: 'CLP',
      },
    );
  }

  return results;
}
