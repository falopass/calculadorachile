// ============================================
// Pago o descanso por trabajar un domingo o festivo
// ============================================

import { HORAS_EXTRA, JORNADA_LEGAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface TrabajoEnFeriadoInput {
  sueldoBruto: number;
  jornadaSemanal?: number;
  horasTrabajadas: number;
  /** Recargo en %; valores bajo el 50% del art. 32 se elevan al mínimo legal. */
  recargo?: number;
  /** Art. 38: el festivo trabajado se compensa con un día de descanso. */
  compensaConDescanso?: boolean;
}

export interface TrabajoEnFeriadoResult {
  jornadaSemanal: number;
  horasTrabajadas: number;
  recargo: number;
  valorDia: number;
  valorHora: number;
  valorHoraConRecargo: number;
  /** Monto si el tiempo se paga con recargo (art. 32 / art. 38 inc. 6). */
  montoConRecargo: number;
  compensaConDescanso: boolean;
  totalAPagar: number;
  diasDescanso: number;
}

/**
 * Valor hora DT para sueldo mensual: sueldo ÷ 30 × 28 ÷ (jornada × 4).
 * - Art. 38 inc. 4: empresas exceptuadas otorgan un día de descanso por cada
 *   festivo trabajado.
 * - Art. 38 inc. 6: los descansos que excedan de uno semanal pueden pactarse
 *   remunerados, con un pago no inferior al de horas extraordinarias (art. 32).
 * - Trabajador no exceptuado (art. 35/37): las horas se pagan como extraordinarias.
 */
export function calculateTrabajoEnFeriado(input: TrabajoEnFeriadoInput): TrabajoEnFeriadoResult {
  const sueldo = Math.max(0, input.sueldoBruto);
  const jornadaSemanal = Math.min(45, Math.max(1, input.jornadaSemanal ?? JORNADA_LEGAL.actual));
  const horasTrabajadas = Math.max(0, input.horasTrabajadas);
  const recargo = Math.max(HORAS_EXTRA.recargo_normal, input.recargo ?? HORAS_EXTRA.recargo_normal);
  const compensaConDescanso = input.compensaConDescanso ?? true;

  const valorHoraExacto = ((sueldo / 30) * 28) / (jornadaSemanal * 4);
  const valorHoraConRecargoExacto = valorHoraExacto * (1 + recargo / 100);
  const montoConRecargo = Math.round(valorHoraConRecargoExacto * horasTrabajadas);
  const trabajo = horasTrabajadas > 0;

  return {
    jornadaSemanal,
    horasTrabajadas,
    recargo,
    valorDia: Math.round(sueldo / 30),
    valorHora: Math.round(valorHoraExacto),
    valorHoraConRecargo: Math.round(valorHoraConRecargoExacto),
    montoConRecargo,
    compensaConDescanso,
    totalAPagar: compensaConDescanso ? 0 : montoConRecargo,
    diasDescanso: compensaConDescanso && trabajo ? 1 : 0,
  };
}

export function trabajoEnFeriadoToResults(result: TrabajoEnFeriadoResult): CalculatorResult[] {
  const rows: CalculatorResult[] = result.compensaConDescanso
    ? [
        {
          label: 'Días de descanso compensatorio',
          value: result.diasDescanso,
          format: 'days',
          highlight: true,
        },
        {
          label: 'Pago adicional (se compensa con descanso)',
          value: result.totalAPagar,
          format: 'CLP',
        },
        {
          label: `Monto si pactan remunerar el descanso (+${result.recargo}%)`,
          value: result.montoConRecargo,
          format: 'CLP',
        },
      ]
    : [
        {
          label: `Total a pagar por ${result.horasTrabajadas} h con recargo`,
          value: result.totalAPagar,
          format: 'CLP',
          highlight: true,
        },
        { label: 'Días de descanso compensatorio', value: result.diasDescanso, format: 'days' },
      ];
  rows.push(
    { label: 'Valor día (sueldo ÷ 30)', value: result.valorDia, format: 'CLP' },
    { label: 'Valor hora ordinaria', value: result.valorHora, format: 'CLP' },
    {
      label: `Valor hora con recargo (+${result.recargo}%)`,
      value: result.valorHoraConRecargo,
      format: 'CLP',
    },
    { label: 'Jornada semanal', value: result.jornadaSemanal, format: 'number' },
  );
  return rows;
}
