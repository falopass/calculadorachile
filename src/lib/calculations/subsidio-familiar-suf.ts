// ============================================
// Cálculo de Subsidio Familiar (SUF) Chile 2026
// $22.601 por carga; $45.202 si es persona con discapacidad
// ============================================

import { SUBSIDIO_FAMILIAR } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioFamiliarSufInput {
  /** Causantes/cargas acreditadas sin discapacidad. */
  causantes: number;
  /** Causantes personas con discapacidad (monto mayorado). */
  causantesDiscapacidad: number;
  /** Hogar dentro del 60% más vulnerable según RSH. */
  rsh60: boolean;
}

export interface SubsidioFamiliarSufResult {
  causantes: number;
  causantesDiscapacidad: number;
  aplica: boolean;
  montoCausantesComunes: number;
  montoCausantesDiscapacidad: number;
  montoMensual: number;
  montoAnual: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

/**
 * Calcula el Subsidio Familiar (SUF), ChileAtiende ficha 33112.
 *
 * Reglas: beneficio mensual de $22.601 por cada carga familiar
 * acreditada y $45.202 si se trata de una persona con discapacidad
 * (valores desde 01-05-2026, Ley 21.830). Requiere estar dentro del
 * 60% más vulnerable según RSH y no tener previsión social. Dura 3
 * años mientras se cumplan los requisitos y es incompatible con la
 * asignación familiar. Esta estimación no verifica la edad ni el
 * ingreso de cada causante.
 */
export function calculateSubsidioFamiliarSuf(
  input: SubsidioFamiliarSufInput,
): SubsidioFamiliarSufResult {
  const causantes = Math.max(0, Math.round(input.causantes ?? 0));
  const causantesDiscapacidad = Math.max(
    0,
    Math.round(input.causantesDiscapacidad ?? 0),
  );
  const rsh60 = input.rsh60 === true;

  const motivosNoAplica: string[] = [];
  if (!rsh60) {
    motivosNoAplica.push(
      'Se requiere pertenecer al 60% más vulnerable según el Registro Social de Hogares.',
    );
  }
  if (causantes + causantesDiscapacidad === 0) {
    motivosNoAplica.push(
      'Debe acreditar al menos un causante (menores de 18 con las condiciones del beneficio o personas con discapacidad de cualquier edad).',
    );
  }

  const aplica = motivosNoAplica.length === 0;
  const montoCausantesComunes = causantes * SUBSIDIO_FAMILIAR.montoPorCausanteCLP;
  const montoCausantesDiscapacidad =
    causantesDiscapacidad * SUBSIDIO_FAMILIAR.montoDiscapacidadCLP;
  const montoMensual = aplica
    ? montoCausantesComunes + montoCausantesDiscapacidad
    : 0;

  const baseCalculo = aplica
    ? `${causantes} carga(s) × $${SUBSIDIO_FAMILIAR.montoPorCausanteCLP.toLocaleString('es-CL')}${causantesDiscapacidad > 0 ? ` + ${causantesDiscapacidad} con discapacidad × $${SUBSIDIO_FAMILIAR.montoDiscapacidadCLP.toLocaleString('es-CL')}` : ''}.`
    : motivosNoAplica.join(' ');

  return {
    causantes,
    causantesDiscapacidad,
    aplica,
    montoCausantesComunes: aplica ? montoCausantesComunes : 0,
    montoCausantesDiscapacidad: aplica ? montoCausantesDiscapacidad : 0,
    montoMensual,
    montoAnual: montoMensual * 12,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioFamiliarSufToResults(
  result: SubsidioFamiliarSufResult,
): CalculatorResult[] {
  return [
    {
      label: 'SUF mensual estimado',
      value: result.montoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'SUF anual estimado',
      value: result.montoAnual,
      format: 'CLP',
    },
    {
      label: 'Cargas sin discapacidad',
      value: result.montoCausantesComunes,
      format: 'CLP',
    },
    {
      label: 'Cargas con discapacidad',
      value: result.montoCausantesDiscapacidad,
      format: 'CLP',
    },
  ];
}
