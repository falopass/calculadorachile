// ============================================
// Cálculo de Impuesto a la Ganancia por Venta de Inmueble Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PlusvaliaInput {
  precioCompra: number;
  precioVenta: number;
  anosTenencia: number;
  mejoras?: number;
  /** Vivienda habitacional (única o segunda vivienda con destino habitacional). */
  esViviendaHabitual?: boolean;
}

export interface PlusvaliaResult {
  precioCompra: number;
  precioVenta: number;
  mejoras: number;
  anosTenencia: number;
  gananciaBruta: number;
  gananciaNeta: number;
  /** Tope de exención en UF para vivienda habitacional (8.000 UF). */
  exencionUF: number;
  /** Ganancia exenta aplicada en CLP. */
  exencionAplicada: number;
  /** Ganancia gravada (neta - exención). */
  baseImponible: number;
  tasaPlusvalia: number;
  impuestoPlusvalia: number;
  exento: boolean;
  esViviendaHabitual: boolean;
}

/**
 * Tope de exención por mayor valor en venta de bienes raíces:
 * 8.000 UF acumulados durante toda la vida del contribuyente
 * (vivienda habitacional, persona natural). Sobre el exceso aplica
 * el impuesto único sustitutivo del 10% (o se incluye en Global
 * Complementario, a elección del contribuyente).
 *
 * Base legal: Art. 17 N°8 letra b) LIR, Ley 21.210 (2020).
 */
const TOPE_EXENCION_UF = 8000;

/**
 * Tasa del impuesto único sustitutivo del 10%.
 * Aplica sobre el exceso del tope para vivienda habitacional, o
 * sobre toda la ganancia neta para inmuebles no habitacionales /
 * de inversionistas.
 */
const TASA_IMPUESTO_UNICO = 10;

/**
 * Calcula el impuesto a la ganancia por venta de un inmueble
 *
 * Bug histórico: la versión anterior aplicaba una tabla 30%→0%
 * decreciente por años de tenencia que no existe en la ley
 * chilena. La normativa real es:
 *
 *   - Persona natural, vivienda habitacional: exento hasta 8.000 UF
 *     de mayor valor acumulado en su vida; sobre el exceso, 10%
 *     impuesto único sustitutivo (o IGC).
 *   - Inmueble no habitacional / inversionista: 10% impuesto único
 *     sobre la ganancia neta (o IGC, a elección).
 *
 * Base legal: Art. 17 N°8 letra b) LIR, Ley 21.210.
 *
 * @param input Datos del inmueble vendido.
 * @returns Desglose del impuesto a la ganancia.
 */
export function calculatePlusvalia(input: PlusvaliaInput): PlusvaliaResult {
  const {
    precioCompra,
    precioVenta,
    anosTenencia,
    mejoras = 0,
    esViviendaHabitual = true,
  } = input;

  // Validar rangos
  const compra = Math.max(0, precioCompra);
  const venta = Math.max(0, precioVenta);
  const anos = Math.max(0, Math.min(anosTenencia, 100));
  const mejorasVal = Math.max(0, mejoras);

  // Ganancia bruta y neta (descontando compra + mejoras)
  const gananciaBruta = venta - compra;
  const gananciaNeta = gananciaBruta - mejorasVal;

  const hayGanancia = gananciaNeta > 0;

  // Exención: solo aplica para vivienda habitacional, hasta 8.000 UF de mayor valor.
  const exencionEnCLP = TOPE_EXENCION_UF * UF.valor;
  const exencionAplicada = esViviendaHabitual && hayGanancia
    ? Math.min(gananciaNeta, exencionEnCLP)
    : 0;

  // Base imponible: ganancia gravada después de la exención.
  const baseImponible = hayGanancia ? Math.max(0, gananciaNeta - exencionAplicada) : 0;

  // Si la vivienda es habitacional y la ganancia neta cabe completa en la
  // exención, el contribuyente queda exento.
  const exento = !hayGanancia || baseImponible === 0;

  // Tasa fija del impuesto único sustitutivo (10%).
  const tasaPlusvalia = exento ? 0 : TASA_IMPUESTO_UNICO;

  // Impuesto a pagar
  const impuestoPlusvalia = exento
    ? 0
    : Math.round(baseImponible * (TASA_IMPUESTO_UNICO / 100));

  return {
    precioCompra: Math.round(compra),
    precioVenta: Math.round(venta),
    mejoras: Math.round(mejorasVal),
    anosTenencia: anos,
    gananciaBruta: Math.round(gananciaBruta),
    gananciaNeta: Math.round(gananciaNeta),
    exencionUF: TOPE_EXENCION_UF,
    exencionAplicada: Math.round(exencionAplicada),
    baseImponible: Math.round(baseImponible),
    tasaPlusvalia,
    impuestoPlusvalia,
    exento,
    esViviendaHabitual,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function plusvaliaToResults(result: PlusvaliaResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Impuesto a la Ganancia',
    value: result.impuestoPlusvalia,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: 'Ganancia Neta',
    value: result.gananciaNeta,
    format: 'CLP',
  });

  if (result.esViviendaHabitual) {
    results.push({
      label: `Exención Vivienda Habitacional (${result.exencionUF} UF)`,
      value: result.exencionAplicada,
      format: 'CLP',
    });
  }

  results.push({
    label: 'Base Imponible',
    value: result.baseImponible,
    format: 'CLP',
  });

  results.push({
    label: 'Ganancia Bruta',
    value: result.gananciaBruta,
    format: 'CLP',
  });

  results.push({
    label: 'Tasa Aplicada',
    value: result.tasaPlusvalia,
    format: 'percentage',
  });

  results.push({
    label: 'Precio Compra',
    value: result.precioCompra,
    format: 'CLP',
  });

  results.push({
    label: 'Precio Venta',
    value: result.precioVenta,
    format: 'CLP',
  });

  if (result.mejoras > 0) {
    results.push({
      label: 'Mejoras Deducidas',
      value: result.mejoras,
      format: 'CLP',
    });
  }

  results.push({
    label: 'Años de Tenencia',
    value: result.anosTenencia,
    format: 'number',
  });

  if (result.exento) {
    results.push({
      label: 'Exento de Impuesto',
      value: 1,
      format: 'number',
    });
  }

  return results;
}
