// ============================================
// Cálculo de Crédito con Aval del Estado (CAE) Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { CREDITO_CAE, UF } from '@/lib/values/constants';

export interface CreditoCAEInput {
  montoCredito: number;
  /** Tasa anual real de referencia (legal 2%). */
  tasaAnual?: number;
  plazoMeses: number;
  tieneGarantiaEstatal: boolean;
  /**
   * Meses de gracia antes de la 1.ª cuota (típico: estudios + ~18 m post-egreso).
   * Solo afecta el calendario estimado; no modela subsidio de intereses real.
   */
  mesesGracia?: number;
  /** UF opcional (live); default snapshot. */
  valorUF?: number;
}

export interface CreditoCAEResult {
  montoCredito: number;
  tasaAnual: number;
  plazoMeses: number;
  plazoAnios: number;
  dividendoMensual: number;
  dividendoUF: number;
  totalIntereses: number;
  totalPago: number;
  costoCredito: number;
  pctIntereses: number;
  montoGarantiaEstatal: number;
  mesesGracia: number;
  mesPrimeraCuota: number;
  valorUF: number;
  aviso: string;
}

const TASA_CAE_LEGAL = CREDITO_CAE.tasa_anual_legal;
const GARANTIA_ESTATAL_PCT = CREDITO_CAE.garantia_estatal / 100;

const AVISO_FES =
  'Simulación educativa de cuota CAE (tasa fija en UF). No es tu estado de cuenta Ingresa ni el FES. Confirma saldo, subsidios y condonaciones en ingresa.cl.';

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return (monto * (tasaMensual * factor)) / (factor - 1);
}

/**
 * Estima dividendo CAE con amortización francesa a tasa fija.
 * Base: Ley 20.027 / reforma tasa 2% real anual.
 */
export function calculateCreditoCAE(input: CreditoCAEInput): CreditoCAEResult {
  const {
    montoCredito,
    tasaAnual = TASA_CAE_LEGAL,
    plazoMeses,
    tieneGarantiaEstatal,
    mesesGracia = 0,
    valorUF = UF.valor,
  } = input;

  const montoValido = Math.max(0, montoCredito);
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));
  const gracia = Math.max(0, Math.round(mesesGracia));
  const uf = valorUF > 0 ? valorUF : UF.valor;

  const tasaMensual = tasaValida / 100 / 12;
  const dividendoMensual = calcularPMT(montoValido, tasaMensual, plazoValido);
  const totalPago = dividendoMensual * plazoValido;
  const totalIntereses = totalPago - montoValido;
  const costoCredito =
    montoValido > 0 ? Math.round((totalPago / montoValido) * 100) / 100 : 0;
  const pctIntereses =
    montoValido > 0 ? Math.round((totalIntereses / montoValido) * 1000) / 10 : 0;
  const montoGarantiaEstatal = tieneGarantiaEstatal
    ? montoValido * GARANTIA_ESTATAL_PCT
    : 0;
  const dividendoUF = uf > 0 ? dividendoMensual / uf : 0;

  return {
    montoCredito: Math.round(montoValido),
    tasaAnual: tasaValida,
    plazoMeses: plazoValido,
    plazoAnios: Math.round((plazoValido / 12) * 10) / 10,
    dividendoMensual: Math.round(dividendoMensual),
    dividendoUF: Math.round(dividendoUF * 1000) / 1000,
    totalIntereses: Math.round(totalIntereses),
    totalPago: Math.round(totalPago),
    costoCredito,
    pctIntereses,
    montoGarantiaEstatal: Math.round(montoGarantiaEstatal),
    mesesGracia: gracia,
    mesPrimeraCuota: gracia + 1,
    valorUF: uf,
    aviso: AVISO_FES,
  };
}

export function creditoCAEToResults(result: CreditoCAEResult): CalculatorResult[] {
  return [
    {
      label: 'Dividendo mensual estimado',
      value: result.dividendoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Dividendo en UF (ref.)',
      value: result.dividendoUF,
      format: 'UF',
    },
    {
      label: 'Total a pagar (solo período de cuotas)',
      value: result.totalPago,
      format: 'CLP',
      highlight: true,
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
      label: 'Monto del crédito',
      value: result.montoCredito,
      format: 'CLP',
    },
    {
      label: `Garantía estatal (${CREDITO_CAE.garantia_estatal}%)`,
      value: result.montoGarantiaEstatal,
      format: 'CLP',
    },
    {
      label: 'Tasa anual (ref. legal 2%)',
      value: result.tasaAnual,
      format: 'percentage',
    },
    {
      label: 'Plazo (meses)',
      value: result.plazoMeses,
      format: 'number',
    },
    {
      label: 'Plazo (años)',
      value: result.plazoAnios,
      format: 'number',
    },
    {
      label: 'Meses de gracia (antes 1.ª cuota)',
      value: result.mesesGracia,
      format: 'number',
    },
    {
      label: 'N.º mes estimado 1.ª cuota',
      value: result.mesPrimeraCuota,
      format: 'number',
    },
    {
      label: 'UF usada en la simulación',
      value: result.valorUF,
      format: 'CLP',
    },
    {
      label: 'Costo del crédito (× capital)',
      value: result.costoCredito,
      format: 'number',
    },
  ];
}
