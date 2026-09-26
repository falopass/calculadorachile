// ============================================
// Cálculo del Factor de Hora Extra Chile 2026
// Fórmula legal Dirección del Trabajo (ficha 95182)
// ============================================

import { JORNADA_LEGAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface FactorHoraExtraInput {
  /** Sueldo mensual base en CLP. */
  sueldoBase: number;
  /** Jornada semanal pactada (default: jornada legal vigente, 42 h). */
  jornadaSemanal?: number;
  /** Horas extraordinarias del mes. */
  horasExtra?: number;
}

export interface FactorHoraExtraResult {
  sueldoBase: number;
  jornadaSemanal: number;
  /** Factor multiplicador del sueldo mensual (hora extra con recargo 50%). */
  factor: number;
  valorHoraOrdinaria: number;
  valorHoraExtra: number;
  horasExtra: number;
  totalHorasExtra: number;
  baseCalculo: string;
}

/**
 * Calcula el factor y el valor de la hora extraordinaria.
 *
 * Fórmula DT: valor hora ordinaria = (sueldo / 30) × 28 / (jornada
 * semanal × 4); la hora extra lleva recargo mínimo de 50% (×1,5).
 * Con jornada de 42 h equivale a sueldo × 0,0083333.
 * Misma matemática que `horas-extra.ts` (valorHoraNormalExacto).
 */
export function calculateFactorHoraExtra(
  input: FactorHoraExtraInput,
): FactorHoraExtraResult {
  const sueldo = Math.max(0, input.sueldoBase ?? 0);
  const jornada = Math.min(
    45,
    Math.max(1, Math.round(input.jornadaSemanal ?? JORNADA_LEGAL.actual)),
  );
  const horas = Math.max(0, input.horasExtra ?? 0);

  const valorHoraOrdinariaExacto = ((sueldo / 30) * 28) / (jornada * 4);
  const valorHoraExtraExacto = valorHoraOrdinariaExacto * 1.5;
  const factorExacto = valorHoraExtraExacto / (sueldo || 1);
  const factor = Math.round(factorExacto * 1e7) / 1e7;

  const valorHoraOrdinaria = Math.round(valorHoraOrdinariaExacto);
  const valorHoraExtra = Math.round(valorHoraExtraExacto);
  const totalHorasExtra = Math.round(valorHoraExtraExacto * horas);

  const factorFmt = factor.toLocaleString('es-CL', {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
  });
  const baseCalculo = `Valor hora ordinaria = ($${sueldo.toLocaleString('es-CL')} / 30) × 28 / (${jornada} h × 4) = $${valorHoraOrdinaria.toLocaleString('es-CL')}; hora extra = ×1,5 = $${valorHoraExtra.toLocaleString('es-CL')}. Factor sobre el sueldo mensual: ${factorFmt}.`;

  return {
    sueldoBase: Math.round(sueldo),
    jornadaSemanal: jornada,
    factor,
    valorHoraOrdinaria,
    valorHoraExtra,
    horasExtra: horas,
    totalHorasExtra,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function factorHoraExtraToResults(
  result: FactorHoraExtraResult,
): CalculatorResult[] {
  return [
    {
      label: 'Factor hora extra (× sueldo mensual)',
      value: result.factor,
      format: 'number',
      highlight: true,
    },
    {
      label: 'Valor hora ordinaria',
      value: result.valorHoraOrdinaria,
      format: 'CLP',
    },
    {
      label: 'Valor hora extra (recargo 50%)',
      value: result.valorHoraExtra,
      format: 'CLP',
    },
    {
      label: 'Total horas extra del mes',
      value: result.totalHorasExtra,
      format: 'CLP',
      highlight: true,
    },
  ];
}
