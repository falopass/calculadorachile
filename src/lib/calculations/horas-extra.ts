// ============================================
// Cálculo de Horas Extra Chile
// ============================================

import { HORAS_EXTRA, INGRESO_MINIMO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface HorasExtraInput {
  sueldoBruto: number;
  horasExtra: number;
  esDomingoFestivo?: boolean;
}

export interface HorasExtraResult {
  sueldoBruto: number;
  horasExtra: number;
  valorHoraNormal: number;
  valorHoraExtra: number;
  recargo: number;
  totalHorasExtra: number;
  totalAPagar: number;
}

/**
 * Calcula el valor de una hora de trabajo
 */
function calcularValorHora(sueldoBruto: number): number {
  // Jornada legal: 45 horas semanales
  // Promedio mensual: 45 * 52 / 12 = 195 horas mensuales
  return sueldoBruto / 195;
}

/**
 * Calcula las horas extra
 */
export function calculateHorasExtra(input: HorasExtraInput): HorasExtraResult {
  const { sueldoBruto, horasExtra, esDomingoFestivo = false } = input;
  
  // Valor hora normal
  const valorHoraNormal = calcularValorHora(sueldoBruto);
  
  // Recargo según día
  const recargoPorcentaje = esDomingoFestivo 
    ? HORAS_EXTRA.recargo_domingo 
    : HORAS_EXTRA.recargo_normal;
  
  // Valor hora con recargo
  const valorHoraExtra = valorHoraNormal * (1 + recargoPorcentaje / 100);
  
  // Total a pagar por horas extra
  const totalHorasExtra = valorHoraExtra * horasExtra;
  
  // Total incluyendo sueldo
  const totalAPagar = sueldoBruto + totalHorasExtra;
  
  return {
    sueldoBruto,
    horasExtra,
    valorHoraNormal: Math.round(valorHoraNormal),
    valorHoraExtra: Math.round(valorHoraExtra),
    recargo: recargoPorcentaje,
    totalHorasExtra: Math.round(totalHorasExtra),
    totalAPagar: Math.round(totalAPagar),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function horasExtraToResults(result: HorasExtraResult): CalculatorResult[] {
  return [
    { label: 'Total a Pagar', value: result.totalAPagar, format: 'CLP', highlight: true },
    { label: 'Sueldo Bruto', value: result.sueldoBruto, format: 'CLP' },
    { label: `Pago por ${result.horasExtra} hrs extra`, value: result.totalHorasExtra, format: 'CLP' },
    { label: 'Valor hora normal', value: result.valorHoraNormal, format: 'CLP' },
    { label: `Valor hora extra (+${result.recargo}%)`, value: result.valorHoraExtra, format: 'CLP' },
  ];
}
