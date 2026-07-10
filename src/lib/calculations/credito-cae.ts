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
   * Meses de gracia antes de la 1.ª cuota (típico: ~18 m post-egreso).
   * Solo afecta el calendario estimado.
   */
  mesesGracia?: number;
  /**
   * Ingreso bruto mensual opcional: estima cuota como % del ingreso
   * (referencia educativa al tope 10% Ley 21.605; no es tu cuota Ingresa).
   */
  ingresoMensualBruto?: number;
  valorUF?: number;
}

export interface CreditoCAEResult {
  montoCredito: number;
  tasaAnual: number;
  plazoMeses: number;
  plazoAnios: number;
  dividendoMensual: number;
  dividendoUF: number;
  dividendoAnual: number;
  totalIntereses: number;
  totalPago: number;
  costoCredito: number;
  pctIntereses: number;
  montoGarantiaEstatal: number;
  mesesGracia: number;
  mesPrimeraCuota: number;
  valorUF: number;
  ingresoMensualBruto: number;
  /** Cuota estimada / ingreso × 100 (0 si no hay ingreso). */
  cuotaSobreIngresoPct: number;
  /** Tope referencial 10% del ingreso (si se ingresó ingreso). */
  topeDiezPctIngreso: number;
  /** Cuánto excedería la cuota PMT sobre el 10% (0 si no aplica). */
  excesoSobreTopeIngreso: number;
  aviso: string;
  avisoCobranza: string;
}

const TASA_CAE_LEGAL = CREDITO_CAE.tasa_anual_legal;
const GARANTIA_ESTATAL_PCT = CREDITO_CAE.garantia_estatal / 100;
const TOPE_INGRESO_PCT = 10;

const AVISO_SIMULACION =
  'Simulación educativa de cuota (amortización francesa, tasa fija). No es estado de cuenta Ingresa ni FES. Confirma saldo y reglas de pago en ingresa.cl.';

const AVISO_COBRANZA =
  'Si hay mora y el Fisco ya pagó la garantía al banco, el cobro puede pasar a la Tesorería (TGR): convenios o embargos (cuentas, inmuebles). Revisa tgr.cl/cae. Esto no simula embargos.';

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return (monto * (tasaMensual * factor)) / (factor - 1);
}

/**
 * Estima dividendo CAE con amortización francesa a tasa fija.
 * Base: Ley 20.027 / reforma tasa 2% real anual.
 * El tope 10% ingreso (Ley 21.605) se muestra solo como comparación educativa.
 */
export function calculateCreditoCAE(input: CreditoCAEInput): CreditoCAEResult {
  const {
    montoCredito,
    tasaAnual = TASA_CAE_LEGAL,
    plazoMeses,
    tieneGarantiaEstatal,
    mesesGracia = 0,
    ingresoMensualBruto = 0,
    valorUF = UF.valor,
  } = input;

  const montoValido = Math.max(0, montoCredito);
  const tasaValida = Math.max(0, Math.min(100, tasaAnual));
  const plazoValido = Math.max(1, Math.round(plazoMeses));
  const gracia = Math.max(0, Math.round(mesesGracia));
  const uf = valorUF > 0 ? valorUF : UF.valor;
  const ingreso = Math.max(0, ingresoMensualBruto);

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
  const dividendoMensualRound = Math.round(dividendoMensual);
  const dividendoUF = uf > 0 ? dividendoMensual / uf : 0;
  const dividendoAnual = dividendoMensualRound * 12;

  const topeDiezPctIngreso = ingreso > 0 ? ingreso * (TOPE_INGRESO_PCT / 100) : 0;
  const cuotaSobreIngresoPct =
    ingreso > 0 ? Math.round((dividendoMensual / ingreso) * 1000) / 10 : 0;
  const excesoSobreTopeIngreso =
    ingreso > 0 && dividendoMensual > topeDiezPctIngreso
      ? Math.round(dividendoMensual - topeDiezPctIngreso)
      : 0;

  return {
    montoCredito: Math.round(montoValido),
    tasaAnual: tasaValida,
    plazoMeses: plazoValido,
    plazoAnios: Math.round((plazoValido / 12) * 10) / 10,
    dividendoMensual: dividendoMensualRound,
    dividendoUF: Math.round(dividendoUF * 1000) / 1000,
    dividendoAnual,
    totalIntereses: Math.round(totalIntereses),
    totalPago: Math.round(totalPago),
    costoCredito,
    pctIntereses,
    montoGarantiaEstatal: Math.round(montoGarantiaEstatal),
    mesesGracia: gracia,
    mesPrimeraCuota: gracia + 1,
    valorUF: uf,
    ingresoMensualBruto: Math.round(ingreso),
    cuotaSobreIngresoPct,
    topeDiezPctIngreso: Math.round(topeDiezPctIngreso),
    excesoSobreTopeIngreso,
    aviso: AVISO_SIMULACION,
    avisoCobranza: AVISO_COBRANZA,
  };
}

export function creditoCAEToResults(result: CreditoCAEResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Dividendo mensual estimado (PMT)',
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
      label: 'Carga anual de cuotas (×12)',
      value: result.dividendoAnual,
      format: 'CLP',
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
      label: `Garantía estatal mostrada (${CREDITO_CAE.garantia_estatal}%)`,
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

  if (result.ingresoMensualBruto > 0) {
    results.push(
      {
        label: 'Ingreso bruto mensual (tu dato)',
        value: result.ingresoMensualBruto,
        format: 'CLP',
      },
      {
        label: 'Cuota PMT como % del ingreso',
        value: result.cuotaSobreIngresoPct,
        format: 'percentage',
        highlight: result.cuotaSobreIngresoPct > 10,
      },
      {
        label: 'Tope ref. 10% del ingreso (Ley 21.605)',
        value: result.topeDiezPctIngreso,
        format: 'CLP',
      },
    );
    if (result.excesoSobreTopeIngreso > 0) {
      results.push({
        label: 'Exceso de la cuota PMT sobre el 10%',
        value: result.excesoSobreTopeIngreso,
        format: 'CLP',
      });
    }
  }

  return results;
}
