// ============================================
// Cálculo de Pensión Alimenticia Chile 2026
// ============================================

import { INGRESO_MINIMO } from '@/lib/values/constants';
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
  porcentajePorHijo: number;
  pensionSugerida: number;
  pensionPorHijo: number;
  /** Mínimo legal por hijo (40% IMM primer hijo, 30% IMM por adicional). */
  minimoLegal: number;
  /** Tope 50% del ingreso del demandado (Art. 7 Ley 14.908). */
  topeAplicado: boolean;
  topeMaximo: number;
  tramoAplicado: string;
}

/**
 * Porcentajes referenciales del PJUD para pensión sugerida:
 *  - 1 hijo: 40% del ingreso
 *  - 2+ hijos: 30% del ingreso por cada hijo (acumulativo)
 */
const PORCENTAJE_PRIMER_HIJO = 40;
const PORCENTAJE_HIJO_ADICIONAL = 30;

/**
 * Mínimos legales por hijo expresados como porcentaje del ingreso
 * mínimo mensual (IMM):
 *  - 40% IMM por el primer hijo
 *  - 30% IMM por cada hijo adicional
 *
 * Base legal: Ley 14.908 (modificada por Ley 21.389/2021).
 */
const MINIMO_IMM_PRIMER_HIJO = 0.4;
const MINIMO_IMM_HIJO_ADICIONAL = 0.3;

/**
 * Tope legal: las retenciones por pensión de alimentos no pueden
 * exceder el 50% de la remuneración del alimentante.
 * Base legal: Art. 7 Ley 14.908.
 */
const TOPE_INGRESO = 0.5;

/**
 * Calcula la pensión de alimentos sugerida según la Ley 14.908.
 *
 * Bug histórico: la versión anterior aplicaba un porcentaje plano
 * para 2+ hijos sin multiplicar por número de hijos y sin tope del
 * 50% del ingreso. La fórmula correcta es acumulativa por hijo, con
 * tope del 50% del ingreso del alimentante (Art. 7 Ley 14.908).
 *
 * NOTA: esta calculadora entrega una ESTIMACIÓN orientativa. El monto
 * final lo determina un juez considerando necesidades del alimentario
 * y capacidad económica del alimentante.
 *
 * @param input Datos para el cálculo.
 * @returns Pensión sugerida con desglose y mínimos legales.
 */
export function calculatePensionAlimenticia(
  input: PensionAlimenticiaInput,
): PensionAlimenticiaResult {
  const { sueldoBruto, numeroHijos, tieneOtroIngreso, otroIngreso = 0 } = input;

  const sueldo = Math.max(0, sueldoBruto);
  const otro = Math.max(0, otroIngreso);
  const hijos = Math.max(0, Math.round(numeroHijos));

  const totalIngresos = tieneOtroIngreso ? sueldo + otro : sueldo;

  // Porcentaje acumulado según hijos
  let porcentajeAplicable = 0;
  let porcentajePorHijo = 0;
  let tramoAplicado = 'Sin hijos';

  if (hijos === 1) {
    porcentajeAplicable = PORCENTAJE_PRIMER_HIJO;
    porcentajePorHijo = PORCENTAJE_PRIMER_HIJO;
    tramoAplicado = '1 hijo (40%)';
  } else if (hijos >= 2) {
    porcentajePorHijo = PORCENTAJE_HIJO_ADICIONAL;
    porcentajeAplicable = PORCENTAJE_HIJO_ADICIONAL * hijos;
    tramoAplicado = `${hijos} hijos (${PORCENTAJE_HIJO_ADICIONAL}% c/u)`;
  }

  // Pensión sugerida sin tope
  const pensionSinTope = totalIngresos * (porcentajeAplicable / 100);

  // Tope 50% del ingreso (Art. 7 Ley 14.908)
  const topeMaximo = totalIngresos * TOPE_INGRESO;
  const aplicaTope = pensionSinTope > topeMaximo;
  const pensionSugerida = aplicaTope ? topeMaximo : pensionSinTope;

  // Pensión por hijo (referencial, distribuyendo el total)
  const pensionPorHijo = hijos > 0 ? pensionSugerida / hijos : 0;

  // Mínimo legal: 40% IMM primer hijo + 30% IMM por adicional
  const imm = INGRESO_MINIMO.mensual;
  const minimoLegal =
    hijos >= 1
      ? imm * MINIMO_IMM_PRIMER_HIJO + imm * MINIMO_IMM_HIJO_ADICIONAL * Math.max(0, hijos - 1)
      : 0;

  return {
    sueldoBruto: Math.round(sueldo),
    totalIngresos: Math.round(totalIngresos),
    numeroHijos: hijos,
    porcentajeAplicable,
    porcentajePorHijo,
    pensionSugerida: Math.round(pensionSugerida),
    pensionPorHijo: Math.round(pensionPorHijo),
    minimoLegal: Math.round(minimoLegal),
    topeAplicado: aplicaTope,
    topeMaximo: Math.round(topeMaximo),
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function pensionAlimenticiaToResults(
  result: PensionAlimenticiaResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Pensión Mensual Sugerida',
    value: result.pensionSugerida,
    format: 'CLP',
    highlight: true,
  });

  if (result.numeroHijos > 1) {
    results.push({
      label: `Pensión Referencial por Hijo (${result.numeroHijos} hijos)`,
      value: result.pensionPorHijo,
      format: 'CLP',
    });
  }

  results.push({
    label: 'Porcentaje Total Aplicado',
    value: result.porcentajeAplicable,
    format: 'percentage',
  });

  results.push({
    label: 'Mínimo Legal (Ley 14.908)',
    value: result.minimoLegal,
    format: 'CLP',
  });

  if (result.topeAplicado) {
    results.push({
      label: 'Tope 50% Ingreso (Art. 7 Ley 14.908)',
      value: result.topeMaximo,
      format: 'CLP',
    });
  }

  results.push({
    label: 'Número de Hijos',
    value: result.numeroHijos,
    format: 'number',
  });

  results.push({
    label: 'Total Ingresos',
    value: result.totalIngresos,
    format: 'CLP',
  });

  return results;
}
