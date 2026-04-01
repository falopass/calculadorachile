// ============================================
// Cálculo de Asignación Familiar por Tramo Chile 2026
// ============================================

import { ASIGNACION_FAMILIAR_2026 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface AsignacionFamiliarInput {
  sueldoBruto: number;
  numeroHijos: number;
  tramo?: 'a' | 'b' | 'c';
}

export interface AsignacionFamiliarResult {
  sueldoBruto: number;
  tramo: 'a' | 'b' | 'c';
  montoPorHijo: number;
  numeroHijos: number;
  asignacionMensual: number;
  asignacionAnual: number;
}

/**
 * Tramos de Asignación Familiar Chile 2026
 *
 * La asignación familiar es un beneficio previsional que se paga por cada
 * carga familiar reconocida (hijos, cónyuge, etc.). El monto depende del
 * tramo en que se encuentra el trabajador según su remuneración.
 *
 * Base legal: DFL 150, Art. 1 y ss. (Cajas de Compensación y Asignación Familiar)
 *             Decreto Supremo N° 3 de 2025 (fija montos vigentes)
 */
// Usar los valores actualizados desde constants.ts
// Los tramos ahora siguen la Ley 21.751 con 3 tramos actualizados

/**
 * Determina el tramo de asignación familiar según el sueldo bruto
 */
function determinarTramo(sueldoBruto: number): 'a' | 'b' | 'c' {
  if (sueldoBruto <= ASIGNACION_FAMILIAR_2026.tramoA.ingresoMaximoCLP) return 'a';
  if (sueldoBruto <= ASIGNACION_FAMILIAR_2026.tramoB.ingresoMaximoCLP) return 'b';
  return 'c';
}

/**
 * Calcula la asignación familiar por tramo
 *
 * El tramo se determina automáticamente según el sueldo bruto si no se
 * especifica explícitamente. Tramo A: hasta $631.976, Tramo B: hasta
 * $923.067, Tramo C: hasta $1.439.668.
 *
 * @param input - Datos para el cálculo de la asignación familiar
 * @returns Desglose completo de la asignación familiar
 */
export function calculateAsignacionFamiliar(input: AsignacionFamiliarInput): AsignacionFamiliarResult {
  const { sueldoBruto, numeroHijos, tramo: tramoForzado } = input;

  // Validar rangos
  const sueldoValido = Math.max(0, sueldoBruto);
  const hijosValidos = Math.max(0, Math.round(numeroHijos));

  // Determinar tramo (automático o forzado)
  const tramo = tramoForzado ?? determinarTramo(sueldoValido);

  // Monto por hijo según tramo
  const montoPorHijo =
    tramo === 'a' ? ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP :
    tramo === 'b' ? ASIGNACION_FAMILIAR_2026.tramoB.montoPorCargaCLP :
    ASIGNACION_FAMILIAR_2026.tramoC.montoPorCargaCLP;

  // Cálculo mensual y anual
  const asignacionMensual = montoPorHijo * hijosValidos;
  const asignacionAnual = asignacionMensual * 12;

  return {
    sueldoBruto: Math.round(sueldoValido),
    tramo,
    montoPorHijo,
    numeroHijos: hijosValidos,
    asignacionMensual: Math.round(asignacionMensual),
    asignacionAnual: Math.round(asignacionAnual),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function asignacionFamiliarToResults(result: AsignacionFamiliarResult): CalculatorResult[] {
  return [
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
      value: result.tramo === 'a' ? 1 : result.tramo === 'b' ? 2 : 3,
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
}
