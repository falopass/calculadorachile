// ============================================
// Cálculo de Horas Extra Chile
// ============================================

import {
  HORAS_EXTRA,
  JORNADA_LEGAL,
  SALUD,
  SEGURO_CESANTIA,
  SEMANAS_POR_MES,
  AFP_OBLIGATORIA_PCT,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface HorasExtraInput {
  sueldoBruto: number;
  horasExtra: number;
  esDomingoFestivo?: boolean;
  /**
   * Jornada semanal vigente (Ley 21.561). Por defecto se usa la
   * jornada legal vigente al momento del cálculo (`JORNADA_LEGAL.actual`).
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
    jornadaSemanal = JORNADA_LEGAL.actual as 40 | 42 | 44 | 45,
    recargoPersonalizado,
    sueldoVariable = false,
    sueldoPromedio3Meses = 0,
    horasExtraFestivos = 0,
    calcularImpactoCotizaciones = false,
    mostrarTopeLegal = false,
  } = input;

  const sueldoBase =
    sueldoVariable && sueldoPromedio3Meses > 0 ? sueldoPromedio3Meses : sueldoBruto;

  // Valor hora ordinaria: jornada × SEMANAS_POR_MES (4,33).
  const horasMensuales = jornadaSemanal * SEMANAS_POR_MES;
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
    // Tasas legales fijas: 10% AFP (D.L. 3500), 7% salud, y aporte
    // del trabajador a seguro de cesantía (0,6%) si tiene contrato
    // indefinido. La comisión variable de la AFP no se incluye aquí
    // (varía por administradora).
    const TASA_AFP_OBLIGATORIA = AFP_OBLIGATORIA_PCT;
    const TASA_SALUD = SALUD.fonasa.tasa;
    const TASA_CESANTIA_TRABAJADOR = SEGURO_CESANTIA.contrato_indefinido.trabajador;

    impactoCotizaciones = {
      afp: totalTodasHorasExtra * (TASA_AFP_OBLIGATORIA / 100),
      salud: totalTodasHorasExtra * (TASA_SALUD / 100),
      seguroCesantia: totalTodasHorasExtra * (TASA_CESANTIA_TRABAJADOR / 100),
      total:
        totalTodasHorasExtra *
        ((TASA_AFP_OBLIGATORIA + TASA_SALUD + TASA_CESANTIA_TRABAJADOR) / 100),
    };
  }

  // Tope legal Art. 31 CdT: máximo 2 horas extra por día. La cifra
  // semanal se deriva multiplicando por 6 días.
  const topeLegal = mostrarTopeLegal
    ? { horasDiarias: HORAS_EXTRA.tope_diario, horasSemanal: HORAS_EXTRA.tope_diario * 6 }
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
