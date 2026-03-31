// ============================================
// Cálculo de Vacaciones Proporcionales Chile
// ============================================

import { VACACIONES } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface VacacionesInput {
  sueldoBruto: number;
  mesesTrabajados: number;
  añosTrabajados?: number;
  diasVacacionesPendientes?: number;
}

export interface VacacionesResult {
  sueldoBruto: number;
  mesesTrabajados: number;
  diasProporcionales: number;
  diasPendientes: number;
  diasTotales: number;
  valorDia: number;
  totalVacaciones: number;
  diasProgresivos: number;
}

/**
 * Calcula los días de vacaciones progresivas
 * +1 día por cada 3 años después del 10° año, máximo 5 días adicionales
 */
function calcularDiasProgresivos(añosTrabajados: number): number {
  if (añosTrabajados <= 10) return 0;
  
  const añosAdicionales = añosTrabajados - 10;
  const diasProgresivos = Math.floor(añosAdicionales / 3);
  
  return Math.min(diasProgresivos, VACACIONES.tope_progresivos);
}

/**
 * Calcula las vacaciones proporcionales
 */
export function calculateVacaciones(input: VacacionesInput): VacacionesResult {
  const {
    sueldoBruto,
    mesesTrabajados,
    añosTrabajados = 0,
    diasVacacionesPendientes = 0,
  } = input;
  
  // Días proporcionales por meses trabajados
  const diasProporcionales = Math.round((VACACIONES.dias_anuales / 12) * mesesTrabajados);
  
  // Días progresivos
  const diasProgresivos = calcularDiasProgresivos(añosTrabajados);
  
  // Total días
  const diasTotales = diasProporcionales + diasVacacionesPendientes + diasProgresivos;
  
  // Valor día de sueldo
  const valorDia = sueldoBruto / 30;
  
  // Total a pagar
  const totalVacaciones = diasTotales * valorDia;
  
  return {
    sueldoBruto,
    mesesTrabajados,
    diasProporcionales,
    diasPendientes: diasVacacionesPendientes,
    diasTotales,
    valorDia: Math.round(valorDia),
    totalVacaciones: Math.round(totalVacaciones),
    diasProgresivos,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function vacacionesToResults(result: VacacionesResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  results.push({
    label: 'Total Vacaciones',
    value: result.totalVacaciones,
    format: 'CLP',
    highlight: true,
  });
  
  results.push({
    label: `Días totales (${result.diasTotales} días)`,
    value: result.diasTotales,
    format: 'days',
  });
  
  results.push({
    label: 'Días proporcionales',
    value: result.diasProporcionales,
    format: 'days',
  });
  
  if (result.diasPendientes > 0) {
    results.push({
      label: 'Días pendientes',
      value: result.diasPendientes,
      format: 'days',
    });
  }
  
  if (result.diasProgresivos > 0) {
    results.push({
      label: 'Días progresivos',
      value: result.diasProgresivos,
      format: 'days',
    });
  }
  
  results.push({
    label: 'Valor día',
    value: result.valorDia,
    format: 'CLP',
  });
  
  return results;
}
