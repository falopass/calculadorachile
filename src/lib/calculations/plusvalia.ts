// ============================================
// Cálculo de Impuesto a la Ganancia por Venta de Inmueble Chile 2026
// ============================================

import { UF, PLUSVALIA_INMOBILIARIA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PlusvaliaInput {
  precioCompra: number;
  precioVenta: number;
  anosTenencia: number;
  mejoras?: number;
  /**
   * Persona natural con derecho al beneficio de 8.000 UF: inmueble
   * adquirido desde el 01-01-2004, tenencia superior a 1 año (4 años
   * en venta por pisos o subdivisión) y vendedor que no actúa como
   * comerciante habitual de bienes raíces. Aplica a cualquier bien
   * raíz (vivienda, oficina, terreno), no solo vivienda.
   */
  aplicaBeneficio?: boolean;
  /**
   * UF del cupo vitalicio de 8.000 UF ya utilizadas en ventas anteriores
   * que hayan aplicado la exención. El cupo es acumulado durante toda la
   * vida del contribuyente (Art. 17 N°8 letra b) LIR); solo queda
   * disponible el saldo restante.
   */
  cupoExentoUsadoUF?: number;
}

export interface PlusvaliaResult {
  precioCompra: number;
  precioVenta: number;
  mejoras: number;
  anosTenencia: number;
  gananciaBruta: number;
  gananciaNeta: number;
  /** Tope de exención vitalicio en UF para persona natural (8.000 UF). */
  exencionUF: number;
  /** Cupo ya utilizado en ventas anteriores, en UF. */
  cupoExentoUsadoUF: number;
  /** Cupo disponible para esta venta, en UF (8.000 - usado). */
  exencionDisponibleUF: number;
  /** Ganancia exenta aplicada en CLP. */
  exencionAplicada: number;
  /** Ganancia gravada (neta - exención). */
  baseImponible: number;
  tasaPlusvalia: number;
  impuestoPlusvalia: number;
  exento: boolean;
  aplicaBeneficio: boolean;
}

/**
 * Tope de exención por mayor valor en venta de bienes raíces:
 * 8.000 UF acumulados durante toda la vida del contribuyente
 * (persona natural, cualquier bien raíz que cumpla los requisitos).
 * Sobre el exceso aplica el impuesto único sustitutivo del 10%
 * (o se incluye en Global Complementario, a elección del contribuyente).
 *
 * Base legal: Art. 17 N°8 letra b) LIR, Ley 21.210 (2020).
 */
const TOPE_EXENCION_UF = PLUSVALIA_INMOBILIARIA.exencion_uf;

/**
 * Tasa del impuesto único sustitutivo. Definida en
 * `PLUSVALIA_INMOBILIARIA.tasa_impuesto_unico`.
 */
const TASA_IMPUESTO_UNICO = PLUSVALIA_INMOBILIARIA.tasa_impuesto_unico;

/**
 * Calcula el impuesto a la ganancia por venta de un inmueble
 *
 * Bug histórico: la versión anterior aplicaba una tabla 30%→0%
 * decreciente por años de tenencia que no existe en la ley
 * chilena. La normativa real es:
 *
 *   - Persona natural que cumple los requisitos del beneficio
 *     (adquisición desde 2004, tenencia >1 año, no comerciante
 *     habitual): exento hasta 8.000 UF de mayor valor acumulado
 *     en su vida; sobre el exceso, 10% impuesto único sustitutivo
 *     (o IGC). Aplica a viviendas, oficinas, terrenos, etc.
 *   - Sin derecho al beneficio (ej. comerciante habitual o
 *     tenencia <= 1 año): 10% impuesto único sobre la ganancia
 *     neta (o IGC, a elección).
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
    aplicaBeneficio = true,
    cupoExentoUsadoUF = 0,
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

  // Exención: solo para persona natural con derecho al beneficio,
  // hasta 8.000 UF de mayor valor. El cupo es vitalicio y acumulado:
  // se descuentan las UF ya exentas en ventas anteriores. Además la
  // ley exige tenencia superior a 1 año (4 en venta por pisos o
  // subdivisión). Art. 17 N°8 letra b) LIR.
  const cumpleTenencia = anos > 1;
  const cupoUsadoUF = Math.max(0, Math.min(cupoExentoUsadoUF, TOPE_EXENCION_UF));
  const exencionDisponibleUF = TOPE_EXENCION_UF - cupoUsadoUF;
  const exencionEnCLP = exencionDisponibleUF * UF.valor;
  const exencionAplicada = aplicaBeneficio && cumpleTenencia && hayGanancia
    ? Math.min(gananciaNeta, exencionEnCLP)
    : 0;

  // Base imponible: ganancia gravada después de la exención.
  const baseImponible = hayGanancia ? Math.max(0, gananciaNeta - exencionAplicada) : 0;

  // Si la ganancia neta cabe completa en la exención disponible, el
  // contribuyente queda exento.
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
    cupoExentoUsadoUF: Math.round(cupoUsadoUF * 100) / 100,
    exencionDisponibleUF: Math.round(exencionDisponibleUF * 100) / 100,
    exencionAplicada: Math.round(exencionAplicada),
    baseImponible: Math.round(baseImponible),
    tasaPlusvalia,
    impuestoPlusvalia,
    exento,
    aplicaBeneficio,
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

  if (result.aplicaBeneficio) {
    results.push({
      label: `Exención 8.000 UF (hasta ${result.exencionDisponibleUF} UF disponibles)`,
      value: result.exencionAplicada,
      format: 'CLP',
    });
    if (result.cupoExentoUsadoUF > 0) {
      results.push({
        label: 'Cupo exento usado en ventas anteriores',
        value: result.cupoExentoUsadoUF,
        format: 'UF',
      });
    }
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
