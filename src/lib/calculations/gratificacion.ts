// ============================================
// Cálculo de Gratificación Legal Chile 2026
// ============================================

import { GRATIFICACION, INGRESO_MINIMO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface GratificacionInput {
  sueldoBruto: number;
  mesesTrabajados: number;
  tipoGratificacion: 'mensual' | 'anual';
}

export interface GratificacionResult {
  sueldoBruto: number;
  mesesTrabajados: number;
  gratificacionMensual: number;
  gratificacionAnual: number;
  gratificacionProporcional: number;
  topeAnual: number;
  metodo: '25%' | '4.75 IMM';
}

/**
 * Calcula la gratificación legal según Art. 50 del Código del Trabajo
 *
 * La gratificación legal es un beneficio anual. El empleador puede acogerse
 * al Art. 50 (modalidad más usada): pagar el MENOR entre el 25% de la
 * remuneración mensual y el tope mensual de 4,75 ingresos mínimos / 12.
 *
 * Es decir, sueldos bajos pagan el 25% (menor que el tope), y sueldos
 * altos quedan topeados en 4,75 IMM/12 mensual.
 *
 * Bug histórico: la versión anterior pagaba el MAYOR, lo que sobreestimaba
 * la gratificación 2-5x para sueldos bajos (paga el tope cuando debía
 * pagar el 25%).
 *
 * @param input - Datos de entrada para el cálculo
 * @returns Desglose completo de la gratificación
 */
export function calculateGratificacion(input: GratificacionInput): GratificacionResult {
  const { sueldoBruto, mesesTrabajados } = input;

  // Método 1: 25% de la remuneración mensual
  const gratificacion25Porciento = sueldoBruto * (GRATIFICACION.porcentaje / 100);

  // Método 2: tope de 4,75 ingresos mínimos mensuales / 12 (mensual equivalente)
  const topeAnual = INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm;
  const gratificacionTopeMensual = topeAnual / 12;

  // Art. 50 CdT: se paga el MENOR de los dos
  const gratificacionMensual = Math.min(gratificacion25Porciento, gratificacionTopeMensual);

  // Gratificación anual completa
  const gratificacionAnual = gratificacionMensual * 12;

  // Gratificación proporcional por meses trabajados (cap 12)
  const meses = Math.max(0, Math.min(mesesTrabajados, 12));
  const gratificacionProporcional = (gratificacionAnual / 12) * meses;

  // Determinar método aplicado: si el 25% es menor, ese es el aplicado
  const metodo: '25%' | '4.75 IMM' =
    gratificacion25Porciento <= gratificacionTopeMensual ? '25%' : '4.75 IMM';

  return {
    sueldoBruto,
    mesesTrabajados,
    gratificacionMensual: Math.round(gratificacionMensual),
    gratificacionAnual: Math.round(gratificacionAnual),
    gratificacionProporcional: Math.round(gratificacionProporcional),
    topeAnual: Math.round(topeAnual),
    metodo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function gratificacionToResults(result: GratificacionResult): CalculatorResult[] {
  return [
    {
      label: 'Gratificación Mensual',
      value: result.gratificacionMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Gratificación Proporcional',
      value: result.gratificacionProporcional,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Gratificación Anual',
      value: result.gratificacionAnual,
      format: 'CLP',
    },
    {
      label: 'Sueldo Bruto Mensual',
      value: result.sueldoBruto,
      format: 'CLP',
    },
    {
      label: 'Meses Trabajados',
      value: result.mesesTrabajados,
      format: 'number',
    },
    {
      label: 'Tope Anual (4.75 IMM)',
      value: result.topeAnual,
      format: 'CLP',
    },
    {
      label: 'Método Aplicado',
      value: result.metodo === '25%' ? 25 : 4.75,
      format: result.metodo === '25%' ? 'percentage' : 'number',
    },
  ];
}
