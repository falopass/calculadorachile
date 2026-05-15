// ============================================
// Cálculo de Asignación Familiar por Tramo Chile 2026
// ============================================

import { ASIGNACION_FAMILIAR_2026 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface AsignacionFamiliarInput {
  sueldoBruto: number;
  numeroHijos: number;
  /** Si se omite, se determina automáticamente según el sueldo. */
  tramo?: 'a' | 'b' | 'c' | 'd';
}

export interface AsignacionFamiliarResult {
  sueldoBruto: number;
  tramo: 'a' | 'b' | 'c' | 'd';
  montoPorHijo: number;
  numeroHijos: number;
  asignacionMensual: number;
  asignacionAnual: number;
  /** Indica si tiene derecho al beneficio. */
  tieneDerecho: boolean;
  motivoSinDerecho?: string;
}

/**
 * Tope superior del tramo C: sueldos sobre este monto NO reciben
 * asignación familiar (tramo D, monto $0).
 * Base legal: Ley 21.751 Art. 1° letra a).
 */
const INGRESO_MAXIMO_TRAMO_C = ASIGNACION_FAMILIAR_2026.tramoC.ingresoMaximoCLP;

/**
 * Determina el tramo según el sueldo bruto.
 * Sobre el tope C, el trabajador queda en tramo D (sin derecho).
 */
function determinarTramo(sueldoBruto: number): 'a' | 'b' | 'c' | 'd' {
  if (sueldoBruto <= ASIGNACION_FAMILIAR_2026.tramoA.ingresoMaximoCLP) return 'a';
  if (sueldoBruto <= ASIGNACION_FAMILIAR_2026.tramoB.ingresoMaximoCLP) return 'b';
  if (sueldoBruto <= ASIGNACION_FAMILIAR_2026.tramoC.ingresoMaximoCLP) return 'c';
  return 'd';
}

/**
 * Calcula la asignación familiar por tramo.
 *
 * Bug histórico: la versión anterior siempre asignaba tramo C aunque
 * el sueldo superara el tope ($1.439.668). Ahora retorna correctamente
 * tramo D con monto $0 cuando el sueldo excede ese tope.
 *
 * Base legal: Ley 21.751 (reajuste 2026), DFL 150.
 */
export function calculateAsignacionFamiliar(
  input: AsignacionFamiliarInput,
): AsignacionFamiliarResult {
  const { sueldoBruto, numeroHijos, tramo: tramoForzado } = input;

  const sueldoValido = Math.max(0, sueldoBruto);
  const hijosValidos = Math.max(0, Math.round(numeroHijos));

  const tramo = tramoForzado ?? determinarTramo(sueldoValido);

  let montoPorHijo: number;
  let tieneDerecho = true;
  let motivoSinDerecho: string | undefined;

  switch (tramo) {
    case 'a':
      montoPorHijo = ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP;
      break;
    case 'b':
      montoPorHijo = ASIGNACION_FAMILIAR_2026.tramoB.montoPorCargaCLP;
      break;
    case 'c':
      montoPorHijo = ASIGNACION_FAMILIAR_2026.tramoC.montoPorCargaCLP;
      break;
    case 'd':
    default:
      montoPorHijo = 0;
      tieneDerecho = false;
      motivoSinDerecho = `Sueldo bruto supera el tope del tramo C ($${INGRESO_MAXIMO_TRAMO_C.toLocaleString('es-CL')}).`;
      break;
  }

  const asignacionMensual = montoPorHijo * hijosValidos;
  const asignacionAnual = asignacionMensual * 12;

  return {
    sueldoBruto: Math.round(sueldoValido),
    tramo,
    montoPorHijo,
    numeroHijos: hijosValidos,
    asignacionMensual: Math.round(asignacionMensual),
    asignacionAnual: Math.round(asignacionAnual),
    tieneDerecho,
    motivoSinDerecho,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function asignacionFamiliarToResults(
  result: AsignacionFamiliarResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Asignación Mensual',
      value: result.asignacionMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Asignación Anual',
      value: result.asignacionAnual,
      format: 'CLP',
    },
    {
      label: `Tramo ${result.tramo.toUpperCase()}`,
      value:
        result.tramo === 'a'
          ? 1
          : result.tramo === 'b'
            ? 2
            : result.tramo === 'c'
              ? 3
              : 4,
      format: 'number',
    },
    {
      label: 'Monto por Hijo',
      value: result.montoPorHijo,
      format: 'CLP',
    },
    {
      label: 'Número de Hijos',
      value: result.numeroHijos,
      format: 'number',
    },
    {
      label: 'Sueldo Bruto',
      value: result.sueldoBruto,
      format: 'CLP',
    },
  ];

  if (!result.tieneDerecho) {
    results.push({
      label: 'Sin derecho al beneficio (tramo D)',
      value: 1,
      format: 'number',
    });
  }

  return results;
}
