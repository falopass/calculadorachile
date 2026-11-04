// ============================================
// Calculadora de Interés Compuesto
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export type FrecuenciaCapitalizacion =
  | 'mensual'
  | 'trimestral'
  | 'semestral'
  | 'anual';

export interface InteresCompuestoInput {
  /** Capital inicial en CLP. */
  capitalInicial: number;
  /** Tasa de interés anual nominal en porcentaje (ej: 10 para 10%). */
  tasaAnual: number;
  /** Plazo de la inversión en años. */
  anos: number;
  /** Frecuencia con que se capitalizan los intereses. */
  frecuencia: FrecuenciaCapitalizacion;
  /**
   * Aporte mensual opcional. Se agrupa según la frecuencia de
   * capitalización (ej. con capitalización trimestral cada período
   * aporta `aporteMensual × 3`) y se abona al final de cada período.
   */
  aporteMensual?: number;
}

export interface InteresCompuestoResult {
  capitalInicial: number;
  tasaAnual: number;
  anos: number;
  frecuencia: FrecuenciaCapitalizacion;
  /** Capitalizaciones por año (12 mensual, 4 trimestral, 2 semestral, 1 anual). */
  periodosPorAno: number;
  /** Número total de períodos de capitalización (m × años). */
  periodosTotales: number;
  /** Tasa de interés por período de capitalización (decimal). */
  tasaPorPeriodo: number;
  /** Aporte agrupado por cada período de capitalización. */
  aportePorPeriodo: number;
  /** Suma de todos los aportes periódicos (sin el capital inicial). */
  totalAportes: number;
  /** Capital inicial + aportes: lo que efectivamente puso la persona. */
  totalAportado: number;
  /** Intereses generados sobre lo aportado. */
  gananciaIntereses: number;
  /** Valor futuro redondeado a pesos. */
  montoFinal: number;
  /** Ganancia como porcentaje de lo aportado. */
  rentabilidadTotalPct: number;
}

const PERIODOS_POR_ANO: Record<FrecuenciaCapitalizacion, number> = {
  mensual: 12,
  trimestral: 4,
  semestral: 2,
  anual: 1,
};

/**
 * Valor futuro con interés compuesto y aportes periódicos al final de
 * cada período de capitalización:
 *
 *   i = (tasaAnual / 100) / m,   N = m × años,   A = aporteMensual × (12 / m)
 *   VF = C0·(1 + i)^N + A·((1 + i)^N − 1) / i
 *
 * Si i = 0 la fórmula degenera a VF = C0 + A·N.
 *
 * Es una estimación puramente matemática con la tasa que ingresa el
 * usuario: no incluye impuestos, comisiones ni variaciones de la tasa
 * en el tiempo.
 */
export function calculateInteresCompuesto(
  input: InteresCompuestoInput,
): InteresCompuestoResult {
  const { capitalInicial, tasaAnual, anos, frecuencia } = input;
  const aporteMensual = input.aporteMensual ?? 0;

  if (!Number.isFinite(capitalInicial) || capitalInicial < 0) {
    throw new Error('El capital inicial no puede ser negativo.');
  }
  if (!Number.isFinite(tasaAnual) || tasaAnual < 0 || tasaAnual > 100) {
    throw new Error('La tasa anual debe estar entre 0% y 100%.');
  }
  if (!Number.isFinite(anos) || anos <= 0 || anos > 100) {
    throw new Error('El plazo debe ser mayor a 0 y hasta 100 años.');
  }
  if (!Number.isFinite(aporteMensual) || aporteMensual < 0) {
    throw new Error('El aporte mensual no puede ser negativo.');
  }

  const m = PERIODOS_POR_ANO[frecuencia];
  const tasaPorPeriodo = tasaAnual / 100 / m;
  const periodosTotales = m * anos;
  const aportePorPeriodo = aporteMensual * (12 / m);

  const factor = Math.pow(1 + tasaPorPeriodo, periodosTotales);
  const valorFuturo =
    tasaPorPeriodo === 0
      ? capitalInicial + aportePorPeriodo * periodosTotales
      : capitalInicial * factor +
        aportePorPeriodo * ((factor - 1) / tasaPorPeriodo);

  const totalAportes = aportePorPeriodo * periodosTotales;
  const totalAportado = capitalInicial + totalAportes;
  const montoFinal = Math.round(valorFuturo);
  const totalAportadoRedondeado = Math.round(totalAportado);
  const gananciaIntereses = montoFinal - totalAportadoRedondeado;
  const rentabilidadTotalPct =
    totalAportadoRedondeado > 0
      ? (gananciaIntereses / totalAportadoRedondeado) * 100
      : 0;

  return {
    capitalInicial: Math.round(capitalInicial),
    tasaAnual,
    anos,
    frecuencia,
    periodosPorAno: m,
    periodosTotales,
    tasaPorPeriodo,
    aportePorPeriodo: Math.round(aportePorPeriodo * 100) / 100,
    totalAportes: Math.round(totalAportes),
    totalAportado: totalAportadoRedondeado,
    gananciaIntereses,
    montoFinal,
    rentabilidadTotalPct: Math.round(rentabilidadTotalPct * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function interesCompuestoToResults(
  result: InteresCompuestoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Monto Final',
      value: result.montoFinal,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'Estimación matemática con la tasa ingresada; no incluye impuestos, comisiones ni cambios de la tasa en el tiempo.',
      },
    },
    {
      label: 'Ganancia por Intereses',
      value: result.gananciaIntereses,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Total Aportado',
      value: result.totalAportado,
      format: 'CLP',
    },
    {
      label: 'Capital Inicial',
      value: result.capitalInicial,
      format: 'CLP',
    },
  ];

  if (result.aportePorPeriodo > 0) {
    results.push({
      label: 'Total Aportes Periódicos',
      value: result.totalAportes,
      format: 'CLP',
    });
  }

  results.push(
    {
      label: 'Rentabilidad Total sobre lo Aportado',
      value: result.rentabilidadTotalPct,
      format: 'percentage',
    },
    {
      label: 'Tasa Anual',
      value: result.tasaAnual,
      format: 'percentage',
    },
    {
      label: 'Períodos de Capitalización',
      value: result.periodosTotales,
      format: 'number',
    },
  );

  return results;
}
