// ============================================
// Cálculo de Bono Bodas de Oro Chile 2026
// Beneficio único por 50 años de matrimonio (Ley 20.506)
// ============================================

import {
  BODAS_ORO,
  getMontoBodasOro,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type SituacionConyuges =
  | 'ambos-vivos'
  | 'viudez-en-plazo'
  | 'viudez-fuera-plazo';

export interface BonoBodasOroInput {
  /** Años de matrimonio cumplidos a la fecha de postulación. */
  anosMatrimonio: number;
  /** Indica si pertenece al 80% más vulnerable según RSH. */
  perteneceAl80Vulnerable: boolean;
  /**
   * Los cónyuges no están separados ni divorciados y conviven en el
   * mismo hogar (o acreditan residencia en hogares de larga estadía).
   */
  convivenSinSeparacion: boolean;
  /** Residencia en Chile 4 años dentro de los últimos 5 anteriores a la solicitud. */
  residencia4de5: boolean;
  /**
   * ambos-vivos: solicitud conjunta.
   * viudez-en-plazo: el cónyuge falleció dentro del año de plazo para
   *   solicitar (el sobreviviente puede optar a su parte del bono).
   * viudez-fuera-plazo: fallecimiento fuera de ese plazo.
   */
  situacionConyuges: SituacionConyuges;
  /** Fecha de referencia para el monto vigente (reajuste cada octubre). Default: hoy. */
  fecha?: Date;
}

export interface BonoBodasOroResult {
  anosMatrimonio: number;
  aplica: boolean;
  /** Bono por cada cónyuge vivo. */
  montoPorConyuge: number;
  /** Bono total del matrimonio (2 × monto por cónyuge). */
  montoTotal: number;
  /**
   * Parte del cónyuge fallecido a la que puede optar el sobreviviente
   * (solo cuando situacionConyuges = 'viudez-en-plazo'). 0 en los demás casos.
   */
  parteConyugeFallecido: number;
  baseCalculo: string;
  motivosNoAplica: string[];
  /** Fecha ISO desde la que rige el monto aplicado. */
  montoVigenteDesde: string;
}

const ANOS_REQUERIDOS = BODAS_ORO.anios_requeridos;

/**
 * Calcula el Bono Bodas de Oro (Ley 20.506), administrado por el IPS.
 *
 * Reglas (ChileAtiende ficha 5369):
 *  - 50 años de matrimonio y solicitud dentro del año siguiente al
 *    50º aniversario (cumplir 51 o más años implica plazo vencido).
 *  - No separados ni divorciados; convivencia en el mismo hogar o
 *    residencia acreditada en hogares de larga estadía.
 *  - 80% más vulnerable según RSH; residencia en Chile 4 de los
 *    últimos 5 años.
 *  - Viudez dentro del plazo: el sobreviviente cobra su parte y puede
 *    optar a la parte del cónyuge fallecido.
 */
export function calculateBonoBodasOro(input: BonoBodasOroInput): BonoBodasOroResult {
  const anos = Math.max(0, Math.round(input.anosMatrimonio ?? 0));
  const situacion = input.situacionConyuges;
  const monto = getMontoBodasOro(input.fecha ?? new Date());

  const motivosNoAplica: string[] = [];

  if (anos < ANOS_REQUERIDOS) {
    motivosNoAplica.push(
      `Aún no cumplen ${ANOS_REQUERIDOS} años de matrimonio (tienen ${anos}).`,
    );
  } else if (anos > ANOS_REQUERIDOS) {
    motivosNoAplica.push(
      'El plazo de un año desde el 50º aniversario venció: ya no pueden realizar el trámite.',
    );
  }
  if (situacion === 'viudez-fuera-plazo') {
    motivosNoAplica.push(
      'El fallecimiento del cónyuge ocurrió fuera del plazo de un año para solicitar el beneficio.',
    );
  }
  if (input.perteneceAl80Vulnerable !== true) {
    motivosNoAplica.push('Debe pertenecer al 80% más vulnerable según RSH.');
  }
  if (input.convivenSinSeparacion !== true) {
    motivosNoAplica.push(
      'Los cónyuges no deben estar separados ni divorciados y deben convivir en el mismo hogar (o acreditar residencia en hogares de larga estadía).',
    );
  }
  if (input.residencia4de5 !== true) {
    motivosNoAplica.push(
      'Se exige residencia en Chile por 4 años dentro de los últimos 5 anteriores a la solicitud.',
    );
  }

  const aplica = motivosNoAplica.length === 0;

  const esViudez = situacion === 'viudez-en-plazo';
  const montoPorConyuge = aplica ? monto.montoPorConyugeCLP : 0;
  const montoTotal = aplica ? monto.montoTotalCLP : 0;
  const parteConyugeFallecido = aplica && esViudez ? monto.montoPorConyugeCLP : 0;

  const porConyugeFmt = monto.montoPorConyugeCLP.toLocaleString('es-CL');
  const baseCalculo = aplica
    ? esViudez
      ? `Su parte es $${porConyugeFmt}; puede optar además a la parte del cónyuge fallecido ($${porConyugeFmt}) porque el fallecimiento ocurrió dentro del plazo legal (Ley 20.506).`
      : `Pago único de $${porConyugeFmt} por cada cónyuge vivo (Ley 20.506).`
    : motivosNoAplica.join(' ');

  return {
    anosMatrimonio: anos,
    aplica,
    montoPorConyuge,
    montoTotal,
    parteConyugeFallecido,
    baseCalculo,
    motivosNoAplica,
    montoVigenteDesde: monto.desde,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function bonoBodasOroToResults(result: BonoBodasOroResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.aplica) {
    const esViudez = result.parteConyugeFallecido > 0;
    results.push({
      label: esViudez
        ? 'Monto que puede recibir (su parte + parte del cónyuge)'
        : 'Bono total matrimonio',
      value: result.montoTotal,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Su parte del bono',
      value: result.montoPorConyuge,
      format: 'CLP',
    });
    if (esViudez) {
      results.push({
        label: 'Parte del cónyuge fallecido (opcional, en plazo)',
        value: result.parteConyugeFallecido,
        format: 'CLP',
      });
    } else {
      results.push({
        label: 'Bono por cada cónyuge vivo',
        value: result.montoPorConyuge,
        format: 'CLP',
      });
    }
  } else {
    results.push({
      label: 'No aplica',
      value: 0,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: 'Años de matrimonio',
    value: result.anosMatrimonio,
    format: 'number',
  });

  results.push({
    label: 'Requisito legal (años de matrimonio)',
    value: ANOS_REQUERIDOS,
    format: 'number',
  });

  return results;
}
