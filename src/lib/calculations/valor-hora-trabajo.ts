// ============================================
// Valor de la hora y del día de trabajo
// ============================================

import { HORAS_EXTRA, JORNADA_LEGAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ValorHoraTrabajoInput {
  sueldoBruto: number;
  jornadaSemanal?: number;
}

export interface ValorHoraTrabajoResult {
  jornadaSemanal: number;
  valorDia: number;
  valorHora: number;
  valorHoraExtra: number;
}

/** Fórmula DT: día = sueldo ÷ 30; hora = sueldo ÷ 30 × 28 ÷ (jornada × 4); extra = hora × 1,5. */
export function calculateValorHoraTrabajo(input: ValorHoraTrabajoInput): ValorHoraTrabajoResult {
  const sueldo = Math.max(0, input.sueldoBruto);
  const jornadaSemanal = Math.min(45, Math.max(1, input.jornadaSemanal ?? JORNADA_LEGAL.actual));
  const valorHoraExacto = ((sueldo / 30) * 28) / (jornadaSemanal * 4);

  return {
    jornadaSemanal,
    valorDia: Math.round(sueldo / 30),
    valorHora: Math.round(valorHoraExacto),
    valorHoraExtra: Math.round(valorHoraExacto * (1 + HORAS_EXTRA.recargo_normal / 100)),
  };
}

export function valorHoraTrabajoToResults(result: ValorHoraTrabajoResult): CalculatorResult[] {
  return [
    { label: 'Valor hora ordinaria', value: result.valorHora, format: 'CLP', highlight: true },
    { label: 'Valor día (sueldo ÷ 30)', value: result.valorDia, format: 'CLP' },
    { label: 'Hora extra referencial (+50%)', value: result.valorHoraExtra, format: 'CLP' },
    { label: 'Jornada semanal', value: result.jornadaSemanal, format: 'number' },
  ];
}
