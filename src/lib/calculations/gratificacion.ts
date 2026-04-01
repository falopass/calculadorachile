// ============================================
// Cálculo de Gratificación Legal Chile 2026
// ============================================

import { GRATIFICACION, INGRESO_MINIMO, UF } from '@/lib/values/constants';
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
  metodo: '25%' | '4.75%';
}

/**
 * Calcula la gratificación legal según Art. 47 del Código del Trabajo
 * 
 * La gratificación es un beneficio obligatorio que el empleador debe pagar.
 * Se calcula de dos formas y se paga la que resulte MAYOR:
 * - 25% de la remuneración mensual
 * - 4.75% del ingreso mínimo anual (tope legal)
 * 
 * @param input - Datos de entrada para el cálculo
 * @returns Desglose completo de la gratificación
 */
export function calculateGratificacion(input: GratificacionInput): GratificacionResult {
  const { sueldoBruto, mesesTrabajados, tipoGratificacion } = input;
  
  // Método 1: 25% de la remuneración
  const gratificacion25Porciento = sueldoBruto * (GRATIFICACION.porcentaje / 100);
  
  // Método 2: Tope de 4.75 ingresos mínimos anuales
  const topeAnual = INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm;
  const gratificacionTope = topeAnual / 12; // Mensual equivalente
  
  // Se paga el mayor de los dos (mensual)
  const gratificacionMensual = Math.max(gratificacion25Porciento, gratificacionTope);
  
  // Gratificación anual completa
  const gratificacionAnual = gratificacionMensual * 12;
  
  // Gratificación proporcional por meses trabajados
  const gratificacionProporcional = (gratificacionAnual / 12) * mesesTrabajados;
  
  // Determinar método aplicado
  const metodo = gratificacion25Porciento >= gratificacionTope ? '25%' : '4.75%';
  
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
      format: 'percentage',
    },
  ];
}
