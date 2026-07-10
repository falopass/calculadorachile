// ============================================
// Cálculo de Contribuciones (Impuesto Territorial) Chile 2026
// ============================================

import { UTM, CONTRIBUCIONES_BIENES_RAICES } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ContribucionesInput {
  avaluoFiscal: number;
  destino: 'habitacional' | 'comercial' | 'industrial' | 'sitio_eriado' | 'agrario';
}

export interface ContribucionesResult {
  avaluoFiscal: number;
  destino: string;
  tasaAnual: number;
  descuentoHabitacional: number;
  contribucionAnual: number;
  /** Mitad del año (2 semestres). */
  contribucionSemestral: number;
  /** Cuota trimestral típica (4 cuotas: abr / jun / sep / nov). */
  contribucionCuota: number;
  avaluoUTM: number;
  umbralExencionCLP: number;
  valorUTM: number;
  exento: boolean;
}

const LABELS_DESTINO: Record<string, string> = {
  habitacional: 'Habitacional',
  comercial: 'Comercial',
  industrial: 'Industrial',
  sitio_eriado: 'Sitio Eriado',
  agrario: 'Agrario',
};

/**
 * Impuesto territorial (contribuciones) según avalúo fiscal y destino.
 *
 * Base: tasas referenciales Ley 17.235 / DL 3063 (uso educativo).
 * Exención habitacional: avalúo ≤ 225,96 UTM.
 * Calendario de pago habitual: 4 cuotas (abr, jun, sep, nov) vía TGR/SII.
 */
export function calculateContribuciones(
  input: ContribucionesInput,
): ContribucionesResult {
  const { avaluoFiscal, destino } = input;
  const avaluo = Math.max(0, avaluoFiscal);
  const valorUTM = UTM.valor > 0 ? UTM.valor : 0;

  const tasaAnual = CONTRIBUCIONES_BIENES_RAICES.tasas_anuales[destino];
  const avaluoUTM = valorUTM > 0 ? avaluo / valorUTM : 0;
  const umbralExencionCLP = Math.round(
    CONTRIBUCIONES_BIENES_RAICES.exencion_habitacional_utm * valorUTM,
  );

  const exento =
    destino === 'habitacional' &&
    avaluoUTM <= CONTRIBUCIONES_BIENES_RAICES.exencion_habitacional_utm;

  const descuentoHabitacional =
    destino === 'habitacional' ? CONTRIBUCIONES_BIENES_RAICES.descuento_habitacional : 0;

  const tasaEfectiva = tasaAnual - descuentoHabitacional;
  const contribucionAnual = exento ? 0 : Math.round(avaluo * (tasaEfectiva / 100));
  const contribucionSemestral = Math.round(contribucionAnual / 2);
  const contribucionCuota = Math.round(contribucionAnual / 4);

  return {
    avaluoFiscal: Math.round(avaluo),
    destino: LABELS_DESTINO[destino],
    tasaAnual: Math.round(tasaEfectiva * 100) / 100,
    descuentoHabitacional,
    contribucionAnual,
    contribucionSemestral,
    contribucionCuota,
    avaluoUTM: Math.round(avaluoUTM * 100) / 100,
    umbralExencionCLP,
    valorUTM,
    exento,
  };
}

export function contribucionesToResults(result: ContribucionesResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.exento) {
    results.push({
      label: 'Estado: EXENTO (habitacional ≤ 225,96 UTM)',
      value: 0,
      format: 'CLP',
      highlight: true,
    });
  } else {
    results.push({
      label: 'Cuota (1 de 4) — abr / jun / sep / nov',
      value: result.contribucionCuota,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: 'Contribución anual',
    value: result.contribucionAnual,
    format: 'CLP',
    highlight: !result.exento,
  });

  results.push({
    label: 'Semestre (2 cuotas)',
    value: result.contribucionSemestral,
    format: 'CLP',
  });

  results.push({
    label: 'Tasa anual efectiva',
    value: result.tasaAnual,
    format: 'percentage',
  });

  results.push({
    label: 'Avalúo fiscal',
    value: result.avaluoFiscal,
    format: 'CLP',
  });

  results.push({
    label: 'Avalúo en UTM',
    value: result.avaluoUTM,
    format: 'UTM',
  });

  results.push({
    label: 'Umbral exención habitacional (≈ CLP)',
    value: result.umbralExencionCLP,
    format: 'CLP',
  });

  results.push({
    label: 'UTM usada en el cálculo',
    value: result.valorUTM,
    format: 'CLP',
  });

  if (result.descuentoHabitacional > 0) {
    results.push({
      label: 'Descuento habitacional (puntos %)',
      value: result.descuentoHabitacional,
      format: 'percentage',
    });
  }

  return results;
}
