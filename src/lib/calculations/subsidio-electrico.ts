// ============================================
// Cálculo de Subsidio Eléctrico Chile 2026
// 5ª convocatoria — descuento semestral jul–dic 2026
// ============================================

import { SUBSIDIO_ELECTRICO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioElectricoInput {
  /** Integrantes del hogar (≥ 1). */
  integrantes: number;
  /** Hogar dentro del 40% más vulnerable según RSH. */
  rsh40: boolean;
  /**
   * Hogar con una persona inscrita en el Registro de Pacientes
   * Electrodependientes (acceso por cualquier tramo RSH).
   */
  electrodependiente: boolean;
  /** Al día en el pago de la cuenta eléctrica al 22-06-2026. */
  alDiaPago: boolean;
}

export interface SubsidioElectricoResult {
  integrantes: number;
  aplica: boolean;
  montoSemestral: number;
  cuotaMensual: number;
  numeroCuotas: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

/**
 * Estima el Subsidio Eléctrico de la 5ª convocatoria (2º semestre
 * 2026), beneficio transitorio vigente para 2024, 2025 y 2026.
 *
 * Tramos por integrantes del hogar (fichas 124375 y VUS 381):
 *  - 1 integrante: $17.346 ($2.891 por cuota)
 *  - 2 a 3 integrantes: $22.548 ($3.758)
 *  - 4 o más: $31.224 ($5.204)
 * El descuento jul–dic 2026 se distribuye en 6 cuotas mensuales
 * desde septiembre de 2026.
 *
 * Requisitos: mayor de 18, cliente al día al 22-06-2026 y 40% más
 * vulnerable RSH, u hogar con persona electrodependiente inscrita.
 */
export function calculateSubsidioElectrico(
  input: SubsidioElectricoInput,
): SubsidioElectricoResult {
  const integrantes = Math.max(1, Math.round(input.integrantes ?? 1));

  const motivosNoAplica: string[] = [];
  if (input.alDiaPago !== true) {
    motivosNoAplica.push(
      'Debe estar al día en el pago de la cuenta de electricidad al 22-06-2026.',
    );
  }
  if (input.rsh40 !== true && input.electrodependiente !== true) {
    motivosNoAplica.push(
      'Se requiere estar dentro del 40% más vulnerable según RSH o tener en el hogar una persona inscrita en el Registro de Pacientes Electrodependientes.',
    );
  }

  const tramo =
    SUBSIDIO_ELECTRICO.tramos.find((t) => integrantes <= t.maxIntegrantes) ??
    SUBSIDIO_ELECTRICO.tramos[SUBSIDIO_ELECTRICO.tramos.length - 1];

  const aplica = motivosNoAplica.length === 0;

  const baseCalculo = aplica
    ? `Hogar de ${integrantes} integrante(s): tramo $${tramo.montoCLP.toLocaleString('es-CL')} semestral, repartido en ${SUBSIDIO_ELECTRICO.cuotas} cuotas de $${tramo.cuotaCLP.toLocaleString('es-CL')} (5ª convocatoria, ${SUBSIDIO_ELECTRICO.periodo}).`
    : motivosNoAplica.join(' ');

  return {
    integrantes,
    aplica,
    montoSemestral: aplica ? tramo.montoCLP : 0,
    cuotaMensual: aplica ? tramo.cuotaCLP : 0,
    numeroCuotas: SUBSIDIO_ELECTRICO.cuotas,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioElectricoToResults(
  result: SubsidioElectricoResult,
): CalculatorResult[] {
  return [
    {
      label: 'Descuento semestral total',
      value: result.montoSemestral,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Descuento por cuota mensual',
      value: result.cuotaMensual,
      format: 'CLP',
    },
    {
      label: 'Número de cuotas',
      value: result.numeroCuotas,
      format: 'number',
    },
    {
      label: 'Integrantes del hogar',
      value: result.integrantes,
      format: 'number',
    },
  ];
}
