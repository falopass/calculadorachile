// ============================================
// Cálculo de Crédito con Aval del Estado (CAE) Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CreditoCAEInput {
  montoCredito: number;
  /**
   * Tasa anual fija establecida por ley desde 2022. Default 2%.
   * Reformas posteriores podrían cambiar esta tasa.
   */
  tasaAnual?: number;
  plazoMeses: number;
  tieneGarantiaEstatal: boolean;
}

export interface CreditoCAEResult {
  montoCredito: number;
  tasaAnual: number;
  plazoMeses: number;
  dividendoMensual: number;
  totalIntereses: number;
  totalPago: number;
  costoCredito: number;
  montoGarantiaEstatal: number;
  /** Aviso sobre la transición CAE → FES. */
  aviso: string;
}

/**
 * Tasa fija 2% anual para CAE (Ley 21.477 / reforma 2022 que
 * reemplazó la tasa variable original por una tasa fija máxima).
 */
const TASA_CAE_LEGAL = 2.0;

/**
 * Garantía estatal del CAE: 90% del monto del crédito (Ley 20.027).
 */
const GARANTIA_ESTATAL_PCT = 0.9;

const AVISO_FES =
  'El CAE está en transición al nuevo sistema FES (Financiamiento de Educación Superior). Esta calculadora sigue vigente para créditos CAE existentes. Las nuevas postulaciones desde 2025 se regirán por las normas FES cuando entren en vigor.';

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return (monto * (tasaMensual * factor)) / (factor - 1);
}

/**
 * Calcula el crédito con Aval del Estado (CAE).
 *
 * Bug histórico:
 *  - Default tasa 2-5% como rango sin tope. La tasa CAE es FIJA al
 *    2% anual desde la reforma 2022. Ahora el default es 2% y el
 *    parámetro es opcional.
 *  - No mencionaba la transición a FES (Financiamiento de Educación
 *    Superior) que reemplaza al CAE para nuevos créditos desde 2025.
 *
 * Base legal: Ley 20.027 (CAE), reformas 2022 (tasa fija 2%).
 */
export function calculateCreditoCAE(input: CreditoCAEInput): CreditoCAEResult {
  const { montoCredito, tasaAnual = TASA_CAE_LEGAL, plazoMeses, tieneGarantiaEstatal } = input;

  const montoValido = Math.max(0, montoCredito);
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));

  const tasaMensual = tasaValida / 100 / 12;
  const dividendoMensual = calcularPMT(montoValido, tasaMensual, plazoValido);
  const totalPago = dividendoMensual * plazoValido;
  const totalIntereses = totalPago - montoValido;
  const costoCredito = montoValido > 0 ? Math.round((totalPago / montoValido) * 100) / 100 : 0;
  const montoGarantiaEstatal = tieneGarantiaEstatal ? montoValido * GARANTIA_ESTATAL_PCT : 0;

  return {
    montoCredito: Math.round(montoValido),
    tasaAnual: tasaValida,
    plazoMeses: plazoValido,
    dividendoMensual: Math.round(dividendoMensual),
    totalIntereses: Math.round(totalIntereses),
    totalPago: Math.round(totalPago),
    costoCredito,
    montoGarantiaEstatal: Math.round(montoGarantiaEstatal),
    aviso: AVISO_FES,
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
      label: 'Garantía Estatal (90%)',
      value: result.montoGarantiaEstatal,
      format: 'CLP',
    },
    {
      label: 'Tasa Anual (legal)',
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
