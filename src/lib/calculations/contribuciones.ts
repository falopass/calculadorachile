// ============================================
// Cálculo de Contribuciones (Impuesto Territorial) Chile 2026
// ============================================

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
 * Tasas de contribuciones según destino del inmueble
 * Las tasas incluyen el 0.025% de descuento para propiedades no agrícolas
 * con avalúo fiscal hasta cierto monto (solo habitacional)
 */
const TASAS_CONTRIBUCIONES: Record<string, { tasa: number; label: string }> = {
  habitacional: { tasa: 0.93, label: 'Habitacional' },
  comercial: { tasa: 1.2, label: 'Comercial' },
  industrial: { tasa: 1.2, label: 'Industrial' },
  sitio_eriado: { tasa: 2.0, label: 'Sitio Eriado' },
  agrario: { tasa: 0.5, label: 'Agrario' },
};

/**
 * Descuento habitacional para propiedades no agrícolas
 * Se aplica un descuento de 0.025% sobre la tasa a propiedades habitacionales
 */
const DESCUENTO_HABITACIONAL = 0.025;

/**
 * Exención para propiedades habitacionales con avalúo hasta 225.96 UTM
 * (actualizar anualmente con el valor UTM)
 */
const EXENCION_HABITACIONAL_UTM = 225.96;

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

  // Obtener tasa según destino
  const datosTasa = TASAS_CONTRIBUCIONES[destino];
  const tasaAnual = datosTasa.tasa;

  // Verificar exención habitacional
  // Nota: se usa un valor aproximado en CLP para la exención
  const avaluoUTM = avaluo / 67900; // UTM actual
  const exento = destino === 'habitacional' && avaluoUTM <= EXENCION_HABITACIONAL_UTM;

  // Calcular descuento habitacional (solo para habitacional)
  const descuentoHabitacional = destino === 'habitacional' ? DESCUENTO_HABITACIONAL : 0;

  // Calcular contribución anual
  const tasaEfectiva = tasaAnual - descuentoHabitacional;
  const contribucionAnual = exento ? 0 : Math.round(avaluo * (tasaEfectiva / 100));

  // Contribución semestral (se paga en 2 cuotas)
  const contribucionSemestral = Math.round(contribucionAnual / 2);

  return {
    avaluoFiscal: Math.round(avaluo),
    destino: datosTasa.label,
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
