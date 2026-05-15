// ============================================
// Cálculo de Horas Extra Chile
// ============================================

import { HORAS_EXTRA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface HorasExtraInput {
  sueldoBruto: number;
  horasExtra: number;
  esDomingoFestivo?: boolean;
  /**
   * Jornada semanal vigente:
   *  - 44h desde abril 2024 (Ley 21.561, "40 horas")
   *  - 42h en abril 2026
   *  - 40h en abril 2028
   * Default: 44h (jornada vigente en 2026 al cierre de Q1).
   */
  jornadaSemanal?: 40 | 42 | 44 | 45;
  recargoPersonalizado?: number;
  sueldoVariable?: boolean;
  sueldoPromedio3Meses?: number;
  /**
   * Horas en festivos. La ley NO establece recargo "nocturno" automático
   * (Art. 32 CdT), por lo que se eliminó ese campo.
   */
  horasExtraFestivos?: number;
  calcularImpactoCotizaciones?: boolean;
  mostrarTopeLegal?: boolean;
}

export interface HorasExtraResult {
  sueldoBruto: number;
  horasExtra: number;
  valorHoraNormal: number;
  valorHoraExtra: number;
  recargo: number;
  totalHorasExtra: number;
  totalAPagar: number;
  horasFestivas?: number;
  impactoCotizaciones?: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    total: number;
  };
  topeLegal?: {
    horasDiarias: number;
    horasSemanal: number;
  };
  jornadaSemanal: number;
}

/**
 * Calcula el pago de horas extra (Art. 32 CdT).
 *
 * Recargo legal único: 50% sobre el valor de la hora ordinaria. Para
 * domingos y festivos trabajados, el recargo aplica sobre la hora extra
 * cuando esa hora califica como extraordinaria; el descanso compensatorio
 * se gestiona por separado (Art. 38).
 *
 * Bug histórico:
 *   - Default `jornadaSemanal = 45` cuando la jornada vigente desde
 *     abril 2024 es 44 horas (Ley 21.561). Ahora default 44.
 *   - "Recargo nocturno 25%" inventado: en Chile no existe recargo
 *     nocturno automático (depende de convenio). Se eliminó el campo.
 */
export function calculateHorasExtra(input: HorasExtraInput): HorasExtraResult {
  const {
    sueldoBruto,
    horasExtra,
    esDomingoFestivo = false,
    jornadaSemanal = 44,
    recargoPersonalizado,
    sueldoVariable = false,
    sueldoPromedio3Meses = 0,
    horasExtraFestivos = 0,
    calcularImpactoCotizaciones = false,
    mostrarTopeLegal = false,
  } = input;

  const sueldoBase =
    sueldoVariable && sueldoPromedio3Meses > 0 ? sueldoPromedio3Meses : sueldoBruto;

  // Valor hora ordinaria: jornada × 4,33 semanas/mes.
  const horasMensuales = jornadaSemanal * 4.33;
  const valorHoraNormal = sueldoBase / horasMensuales;

  const recargoPorcentaje =
    recargoPersonalizado !== undefined
      ? recargoPersonalizado
      : esDomingoFestivo
        ? HORAS_EXTRA.recargo_domingo
        : HORAS_EXTRA.recargo_normal;

  const valorHoraExtra = valorHoraNormal * (1 + recargoPorcentaje / 100);
  const totalHorasExtra = valorHoraExtra * horasExtra;

  // Horas extra en festivos (Art. 38): 100% de recargo legal.
  let totalHorasExtraFestivos = 0;
  if (horasExtraFestivos > 0) {
    const valorHoraExtraFestivo = valorHoraNormal * 2; // +100%
    totalHorasExtraFestivos = valorHoraExtraFestivo * horasExtraFestivos;
  }

  const totalTodasHorasExtra = totalHorasExtra + totalHorasExtraFestivos;
  const totalAPagar = sueldoBase + totalTodasHorasExtra;

  let impactoCotizaciones: HorasExtraResult['impactoCotizaciones'];
  if (calcularImpactoCotizaciones) {
    impactoCotizaciones = {
      afp: totalTodasHorasExtra * 0.10,
      salud: totalTodasHorasExtra * 0.07,
      seguroCesantia: totalTodasHorasExtra * 0.006,
      total: totalTodasHorasExtra * (0.10 + 0.07 + 0.006),
    };
  }

  // Tope legal Art. 31 CdT: máximo 2 horas extra por día. La cifra
  // "10 horas semanales" no está en la ley; se deriva de 2h × 5 días.
  const topeLegal = mostrarTopeLegal
    ? { horasDiarias: 2, horasSemanal: 2 * 6 }
    : undefined;

  return {
    sueldoBruto: sueldoBase,
    horasExtra,
    valorHoraNormal: Math.round(valorHoraNormal),
    valorHoraExtra: Math.round(valorHoraExtra),
    recargo: recargoPorcentaje,
    totalHorasExtra: Math.round(totalTodasHorasExtra),
    totalAPagar: Math.round(totalAPagar),
    horasFestivas: horasExtraFestivos > 0 ? horasExtraFestivos : undefined,
    impactoCotizaciones,
    topeLegal,
    jornadaSemanal,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function horasExtraToResults(result: HorasExtraResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Total a Pagar',
    value: result.totalAPagar,
    format: 'CLP',
    highlight: true,
  });

  results.push({ label: 'Sueldo Bruto', value: result.sueldoBruto, format: 'CLP' });

  results.push({
    label: `Pago por ${result.horasExtra} hrs extra`,
    value: result.totalHorasExtra,
    format: 'CLP',
  });

  results.push({ label: 'Valor hora normal', value: result.valorHoraNormal, format: 'CLP' });

  results.push({
    label: `Valor hora extra (+${result.recargo}%)`,
    value: result.valorHoraExtra,
    format: 'CLP',
  });

  if (result.horasFestivas !== undefined && result.horasFestivas > 0) {
    results.push({
      label: `Horas extra festivas (${result.horasFestivas})`,
      value: result.horasFestivas,
      format: 'number',
    });
  }

  if (result.impactoCotizaciones) {
    results.push({
      label: 'Impacto en Cotizaciones Prev.',
      value: result.impactoCotizaciones.total,
      format: 'CLP',
    });
    results.push({
      label: 'Cotización AFP (10%)',
      value: result.impactoCotizaciones.afp,
      format: 'CLP',
    });
    results.push({
      label: 'Cotización Salud (7%)',
      value: result.impactoCotizaciones.salud,
      format: 'CLP',
    });
    results.push({
      label: 'Seguro Cesantía (0.6%)',
      value: result.impactoCotizaciones.seguroCesantia,
      format: 'CLP',
    });
  }

  if (result.topeLegal) {
    results.push({
      label: 'Tope Legal Horas Extra Diarias',
      value: result.topeLegal.horasDiarias,
      format: 'number',
    });
    results.push({
      label: 'Tope Legal Horas Extra Semanales (estimado)',
      value: result.topeLegal.horasSemanal,
      format: 'number',
    });
  }

  results.push({
    label: `Jornada Semanal (hrs)`,
    value: result.jornadaSemanal,
    format: 'number',
  });

  return results;
}
