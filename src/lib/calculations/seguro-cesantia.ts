// ============================================
// Cálculo de Seguro de Cesantía Chile 2026 (Ley 19.728)
// Cuenta Individual de Cesantía (CIC) + Fondo de Cesantía Solidario
// ============================================

import { SEGURO_CESANTIA_BENEFICIOS } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoContratoCesantia = 'indefinido' | 'plazo-fijo';

export interface SeguroCesantiaInput {
  tipoContrato: TipoContratoCesantia;
  /** Promedio de las últimas remuneraciones (10 si indefinido, 5 si plazo fijo). */
  remuneracionPromedio: number;
  /** Cotizaciones pagadas; para el FCS, en los últimos 24 meses. */
  cotizaciones: number;
  /** Las últimas 3 cotizaciones continuas con el mismo empleador (FCS). */
  ultimas3Continuas: boolean;
  /**
   * Causal con derecho a FCS: necesidades de la empresa, quiebra,
   * vencimiento del plazo, conclusión de la obra o caso
   * fortuito/fuerza mayor.
   */
  causalFCS: boolean;
  /** Saldo de la Cuenta Individual de Cesantía. 0 = no informado. */
  saldoCIC?: number;
}

export interface PagoCesantia {
  numero: number;
  total: number;
  desdeCIC: number;
  desdeFCS: number;
}

export interface SeguroCesantiaResult {
  tipoContrato: TipoContratoCesantia;
  remuneracionPromedio: number;
  cotizaciones: number;
  cumpleCIC: boolean;
  cumpleFCS: boolean;
  /** El saldo CIC alcanza para cubrir al menos 5 pagos completos. */
  cicCubre5Pagos: boolean;
  aplica: boolean;
  /** true cuando el primer pago es solo una estimación (sin saldo informado). */
  esEstimacionSinSaldo: boolean;
  pagos: PagoCesantia[];
  totalEstimado: number;
  saldoRestanteCIC: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

const BENEFICIOS = SEGURO_CESANTIA_BENEFICIOS;

/** % CIC del pago i (0-indexed); desde el 6° pago se repite el último (30%). */
function pctCIC(i: number): number {
  const arr = BENEFICIOS.cic.porcentajes;
  return arr[Math.min(i, arr.length - 1)];
}

/**
 * Estima los pagos del Seguro de Cesantía.
 *
 * CIC (cualquier causal): hasta 13 pagos de 70/60/45/40/35/30/30…% del
 * promedio, hasta agotar el saldo de la cuenta individual.
 *
 * FCS (solo causales con derecho, 10 cotizaciones en 24 meses con las
 * últimas 3 continuas en el mismo empleador, y cuando el saldo CIC no
 * cubre 5 pagos): 5 pagos con porcentaje, mínimo y máximo por tramo,
 * financiados primero con el saldo CIC y complementados por el Fondo.
 * Montos FCS vigentes hasta el 28-02-2027 (Res. Ex. N°383 SP).
 */
export function calculateSeguroCesantia(
  input: SeguroCesantiaInput,
): SeguroCesantiaResult {
  const tipo = input.tipoContrato === 'plazo-fijo' ? 'plazo-fijo' : 'indefinido';
  const promedio = Math.max(0, input.remuneracionPromedio ?? 0);
  const cotizaciones = Math.max(0, Math.round(input.cotizaciones ?? 0));
  const saldoInformado = Math.max(0, input.saldoCIC ?? 0);

  const minCotCIC =
    tipo === 'indefinido'
      ? BENEFICIOS.cic.minCotizaciones.indefinido
      : BENEFICIOS.cic.minCotizaciones.plazoFijo;

  const cumpleCIC = cotizaciones >= minCotCIC;
  const cumpleFCS =
    input.causalFCS === true &&
    cotizaciones >= BENEFICIOS.fcs.minCotizaciones24m &&
    input.ultimas3Continuas === true;

  const motivosNoAplica: string[] = [];
  if (!cumpleCIC) {
    motivosNoAplica.push(
      `La Cuenta Individual exige ${minCotCIC} cotizaciones pagadas (declaró ${cotizaciones}).`,
    );
  }
  if (!cumpleFCS) {
    if (input.causalFCS !== true) {
      motivosNoAplica.push(
        'El Fondo de Cesantía Solidario solo cubre despidos por necesidades de la empresa, quiebra, vencimiento del plazo, fin de obra o caso fortuito/fuerza mayor.',
      );
    }
    if (cotizaciones < BENEFICIOS.fcs.minCotizaciones24m) {
      motivosNoAplica.push(
        `El FCS exige ${BENEFICIOS.fcs.minCotizaciones24m} cotizaciones en los últimos 24 meses.`,
      );
    }
    if (input.ultimas3Continuas !== true) {
      motivosNoAplica.push(
        'El FCS exige que las últimas 3 cotizaciones sean continuas con el mismo empleador.',
      );
    }
  }

  // ¿El saldo CIC cubre al menos 5 pagos completos?
  let suma5 = 0;
  for (let i = 0; i < 5; i++) suma5 += Math.round((pctCIC(i) / 100) * promedio);
  const cicCubre5Pagos = saldoInformado >= suma5;

  // El FCS aplica solo si el saldo no cubre 5 pagos (o no se informó).
  const fcsAplica =
    cumpleFCS && (saldoInformado === 0 ? true : !cicCubre5Pagos);

  const pagos: PagoCesantia[] = [];
  let saldoRestanteCIC = saldoInformado;
  let esEstimacionSinSaldo = false;

  if (fcsAplica) {
    // 5 pagos FCS con piso y tope; el saldo CIC financia primero.
    const tabla =
      tipo === 'indefinido' ? BENEFICIOS.fcs.indefinido : BENEFICIOS.fcs.plazoFijo;
    for (let i = 0; i < BENEFICIOS.fcs.pagos; i++) {
      const bruto = Math.round((tabla.porcentajes[i] / 100) * promedio);
      const total = Math.min(Math.max(bruto, tabla.minimos[i]), tabla.maximos[i]);
      const desdeCIC = Math.min(total, Math.max(0, saldoRestanteCIC));
      saldoRestanteCIC -= desdeCIC;
      pagos.push({
        numero: i + 1,
        total,
        desdeCIC,
        desdeFCS: total - desdeCIC,
      });
    }
  } else if (cumpleCIC && saldoInformado > 0) {
    // CIC: pagos decrecientes hasta agotar el saldo, máx. 13.
    for (let i = 0; i < BENEFICIOS.cic.maxPagos && saldoRestanteCIC > 0; i++) {
      const bruto = Math.round((pctCIC(i) / 100) * promedio);
      const pago = Math.min(bruto, saldoRestanteCIC);
      saldoRestanteCIC -= pago;
      pagos.push({ numero: i + 1, total: pago, desdeCIC: pago, desdeFCS: 0 });
    }
  } else if (cumpleCIC) {
    // Sin saldo informado y sin FCS: estimación del primer pago.
    esEstimacionSinSaldo = true;
    const pago = Math.round((pctCIC(0) / 100) * promedio);
    pagos.push({ numero: 1, total: pago, desdeCIC: pago, desdeFCS: 0 });
  }

  const aplica = pagos.length > 0;
  const totalEstimado = pagos.reduce((acc, p) => acc + p.total, 0);
  const totalFCS = pagos.reduce((acc, p) => acc + p.desdeFCS, 0);

  const baseCalculo = fcsAplica
    ? `5 pagos del FCS sobre el promedio declarado (${tipo === 'indefinido' ? '70/60/45/40/35%' : '60/40/35/30/30%'}, con mínimos y máximos vigentes hasta ${BENEFICIOS.fcs.vigenteHasta}). El saldo de la cuenta individual financia primero y el Fondo complementa${totalFCS > 0 ? ` ($${totalFCS.toLocaleString('es-CL')} del Fondo)` : ''}.`
    : esEstimacionSinSaldo
      ? `Primer pago CIC estimado = 70% del promedio declarado; los siguientes dependen del saldo real de la cuenta.`
      : aplica
        ? `Pagos CIC de ${BENEFICIOS.cic.porcentajes.join('/')}${'…'}% del promedio hasta agotar el saldo (máx. ${BENEFICIOS.cic.maxPagos} pagos).`
        : motivosNoAplica.join(' ');

  return {
    tipoContrato: tipo,
    remuneracionPromedio: Math.round(promedio),
    cotizaciones,
    cumpleCIC,
    cumpleFCS,
    cicCubre5Pagos,
    aplica,
    esEstimacionSinSaldo,
    pagos,
    totalEstimado,
    saldoRestanteCIC: Math.round(saldoRestanteCIC),
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function seguroCesantiaToResults(
  result: SeguroCesantiaResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.esEstimacionSinSaldo) {
    results.push({
      label: 'Primer pago CIC estimado (depende de su saldo)',
      value: result.pagos[0]?.total ?? 0,
      format: 'CLP',
      highlight: true,
    });
  } else {
    results.push({
      label: 'Total estimado del seguro',
      value: result.totalEstimado,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: 'Número de pagos estimados',
    value: result.pagos.length,
    format: 'number',
  });

  for (const pago of result.pagos) {
    results.push({
      label:
        pago.desdeFCS > 0
          ? `Pago ${pago.numero} (CIC + Fondo Solidario)`
          : `Pago ${pago.numero}`,
      value: pago.total,
      format: 'CLP',
    });
  }

  if (result.saldoRestanteCIC > 0) {
    results.push({
      label: 'Saldo CIC sin usar (tope de 13 pagos)',
      value: result.saldoRestanteCIC,
      format: 'CLP',
    });
  }

  return results;
}
