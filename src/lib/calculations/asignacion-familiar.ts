// ============================================
// Cálculo de Asignación Familiar por Tramo Chile 2026
// ============================================

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
const TRAMOS_ASIGNACION = {
  a: {
    limiteSuperior: 430560,
    montoPorHijo: 18624,
  },
  b: {
    limiteSuperior: 630816,
    montoPorHijo: 11358,
  },
  c: {
    limiteSuperior: Infinity,
    montoPorHijo: 0,
  },
} as const;

/**
 * Determina el tramo de asignación familiar según el sueldo bruto
 */
function determinarTramo(sueldoBruto: number): 'a' | 'b' | 'c' {
  if (sueldoBruto <= TRAMOS_ASIGNACION.a.limiteSuperior) return 'a';
  if (sueldoBruto <= TRAMOS_ASIGNACION.b.limiteSuperior) return 'b';
  return 'c';
}

/**
 * Calcula la asignación familiar por tramo
 *
 * El tramo se determina automáticamente según el sueldo bruto si no se
 * especifica explícitamente. Tramo A: hasta $430.560, Tramo B: hasta
 * $630.816, Tramo C: sin asignación.
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
  const montoPorHijo = TRAMOS_ASIGNACION[tramo].montoPorHijo;

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
