// ============================================
// Cálculo de Pensión Alimenticia Chile 2026
// ============================================

import { PENSION_ALIMENTICIA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PensionAlimenticiaInput {
  sueldoBruto: number;
  numeroHijos: number;
  tieneOtroIngreso: boolean;
  otroIngreso?: number;
}

export interface PensionAlimenticiaResult {
  sueldoBruto: number;
  totalIngresos: number;
  numeroHijos: number;
  porcentajeAplicable: number;
  pensionSugerida: number;
  minimoPorHijo: number;
  pensionMinima: number;
  tramoAplicado: string;
}

/**
 * Calcula la pensión de alimentos sugerida según la Ley 14.908
 * 
 * La pensión alimenticia se calcula como un porcentaje del ingreso del padre/madre obligado:
 * - 1-2 hijos: 40%
 * - 3-4 hijos: 45%
 * - 5+ hijos: 50%
 * 
 * Además, existe un mínimo por hijo que debe garantizarse.
 * 
 * NOTA: Esta calculadora entrega una ESTIMACIÓN. El monto final lo determina
 * un juez considerando múltiples factores (necesidades del niño, capacidad económica, etc.)
 * 
 * @param input - Datos para el cálculo
 * @returns Desglose completo de la pensión sugerida
 */
export function calculatePensionAlimenticia(input: PensionAlimenticiaInput): PensionAlimenticiaResult {
  const { sueldoBruto, numeroHijos, tieneOtroIngreso, otroIngreso = 0 } = input;
  
  // Total de ingresos
  const totalIngresos = tieneOtroIngreso ? sueldoBruto + otroIngreso : sueldoBruto;
  
  // Determinar porcentaje según número de hijos
  let porcentajeAplicable = 40;
  let tramoAplicado = '1-2 hijos';
  
  for (const tramo of PENSION_ALIMENTICIA.tramos) {
    if (numeroHijos > tramo.min && numeroHijos <= tramo.max) {
      porcentajeAplicable = tramo.porcentaje;
      if (tramo.max === 2) tramoAplicado = '1-2 hijos';
      else if (tramo.max === 4) tramoAplicado = '3-4 hijos';
      else tramoAplicado = '5+ hijos';
      break;
    }
  }
  
  // Calcular pensión sugerida
  const pensionSugerida = totalIngresos * (porcentajeAplicable / 100);
  
  // Calcular mínimo por hijo
  const minimoPorHijo = PENSION_ALIMENTICIA.minimo_por_hijo;
  const pensionMinima = minimoPorHijo * numeroHijos;
  
  return {
    sueldoBruto,
    totalIngresos: Math.round(totalIngresos),
    numeroHijos,
    porcentajeAplicable,
    pensionSugerida: Math.round(pensionSugerida),
    minimoPorHijo,
    pensionMinima,
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function pensionAlimenticiaToResults(result: PensionAlimenticiaResult): CalculatorResult[] {
  return [
    {
      label: 'Pensión Sugerida',
      value: result.pensionSugerida,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Pensión Mínima',
      value: result.pensionMinima,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Porcentaje Aplicado',
      value: result.porcentajeAplicable,
      format: 'percentage',
    },
    {
      label: 'Número de Hijos',
      value: result.numeroHijos,
      format: 'number',
    },
    {
      label: 'Total Ingresos',
      value: result.totalIngresos,
      format: 'CLP',
    },
    {
      label: 'Mínimo por Hijo',
      value: result.minimoPorHijo,
      format: 'CLP',
    },
  ];
}
