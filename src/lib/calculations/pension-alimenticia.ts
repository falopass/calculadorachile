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
  tramoAplicado: string;
}

/**
 * Calcula la pensión de alimentos sugerida según la Ley 14.908
 * 
 * La pensión alimenticia se calcula como un porcentaje del ingreso del padre/madre obligado:
 * - 1 hijo: 40%
 * - 2-4 hijos: 30% por hijo
 * - 5+ hijos: 30% por hijo
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
  let tramoAplicado = '1 hijo';
  
  for (const tramo of PENSION_ALIMENTICIA.tramos) {
    if (numeroHijos > tramo.min && numeroHijos <= tramo.max) {
      porcentajeAplicable = tramo.porcentaje;
      if (tramo.max === 1) tramoAplicado = '1 hijo';
      else if (tramo.max === 4) tramoAplicado = '2-4 hijos';
      else tramoAplicado = '5+ hijos';
      break;
    }
  }
  
  // Calcular pensión sugerida
  const pensionSugerida = totalIngresos * (porcentajeAplicable / 100);
  
  return {
    sueldoBruto,
    totalIngresos: Math.round(totalIngresos),
    numeroHijos,
    porcentajeAplicable,
    pensionSugerida: Math.round(pensionSugerida),
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function pensionAlimenticiaToResults(result: PensionAlimenticiaResult): CalculatorResult[] {
  return [
    {
      label: 'Pensión Mensual Sugerida',
      value: result.pensionSugerida,
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
  ];
}
