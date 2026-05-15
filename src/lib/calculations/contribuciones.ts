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
  contribucionSemestral: number;
  exento: boolean;
}

/**
 * Etiquetas legibles por destino. Las tasas y exenciones vienen de
 * `CONTRIBUCIONES_BIENES_RAICES` en constants.ts (Ley 17.235 +
 * Art. 2° bis DL 3063).
 */
const LABELS_DESTINO: Record<string, string> = {
  habitacional: 'Habitacional',
  comercial: 'Comercial',
  industrial: 'Industrial',
  sitio_eriado: 'Sitio Eriado',
  agrario: 'Agrario',
};

/**
 * Calcula las contribuciones (impuesto territorial) de un inmueble
 *
 * Las contribuciones son un impuesto anual que gravan los inmuebles según su
 * avalúo fiscal y destino. Se pagan semestralmente (abril y septiembre).
 * Las propiedades habitacionales con avalúo bajo cierto monto están exentas.
 *
 * Base legal: Ley de Impuesto Territorial (DL 3063/1979), Art. 2° bis
 *
 * @param input - Datos para el cálculo de contribuciones
 * @returns Desglose completo de las contribuciones
 */
export function calculateContribuciones(
  input: ContribucionesInput
): ContribucionesResult {
  const { avaluoFiscal, destino } = input;

  // Validar rango
  const avaluo = Math.max(0, avaluoFiscal);

  // Tasa anual según destino (Ley 17.235).
  const tasaAnual = CONTRIBUCIONES_BIENES_RAICES.tasas_anuales[destino];

  // Verificar exención habitacional usando el valor UTM dinámico del snapshot
  // (antes estaba hardcodeado en 67.900, lo que dejaba el cálculo desincronizado).
  const avaluoUTM = UTM.valor > 0 ? avaluo / UTM.valor : 0;
  const exento =
    destino === 'habitacional' &&
    avaluoUTM <= CONTRIBUCIONES_BIENES_RAICES.exencion_habitacional_utm;

  // Descuento habitacional (Art. 2° bis DL 3063): 0,025 puntos % sobre la tasa.
  const descuentoHabitacional =
    destino === 'habitacional' ? CONTRIBUCIONES_BIENES_RAICES.descuento_habitacional : 0;

  // Calcular contribución anual
  const tasaEfectiva = tasaAnual - descuentoHabitacional;
  const contribucionAnual = exento ? 0 : Math.round(avaluo * (tasaEfectiva / 100));

  // Contribución semestral (se paga en 2 cuotas: abril y septiembre).
  const contribucionSemestral = Math.round(contribucionAnual / 2);

  return {
    avaluoFiscal: Math.round(avaluo),
    destino: LABELS_DESTINO[destino],
    tasaAnual: Math.round(tasaEfectiva * 100) / 100,
    descuentoHabitacional,
    contribucionAnual,
    contribucionSemestral,
    exento,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function contribucionesToResults(result: ContribucionesResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Contribución Semestral',
    value: result.contribucionSemestral,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: 'Contribución Anual',
    value: result.contribucionAnual,
    format: 'CLP',
  });

  results.push({
    label: 'Tasa Anual',
    value: result.tasaAnual,
    format: 'percentage',
  });

  results.push({
    label: 'Avalúo Fiscal',
    value: result.avaluoFiscal,
    format: 'CLP',
  });

  if (result.exento) {
    results.push({
      label: 'Exento de Contribuciones',
      value: 1,
      format: 'number',
    });
  }

  if (result.descuentoHabitacional > 0) {
    results.push({
      label: 'Descuento Habitacional',
      value: result.descuentoHabitacional,
      format: 'percentage',
    });
  }

  return results;
}
