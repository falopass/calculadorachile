// ============================================
// Cálculo de Plusvalía por Venta de Propiedad Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface PlusvaliaInput {
  precioCompra: number;
  precioVenta: number;
  anosTenencia: number;
  mejoras?: number;
}

export interface PlusvaliaResult {
  precioCompra: number;
  precioVenta: number;
  mejoras: number;
  anosTenencia: number;
  gananciaBruta: number;
  gananciaNeta: number;
  tasaPlusvalia: number;
  impuestoPlusvalia: number;
  exento: boolean;
}

/**
 * Tramos de tasa de plusvalía según años de tenencia
 * La tasa disminuye con mayor tiempo de tenencia.
 * Base legal: Art. 17 N°8 LIR, modificado por Ley 21.210 (2020)
 */
const TRAMOS_PLUSVALIA = [
  { anosMax: 1, tasa: 30 },
  { anosMax: 2, tasa: 25 },
  { anosMax: 3, tasa: 20 },
  { anosMax: 4, tasa: 15 },
  { anosMax: 5, tasa: 10 },
  { anosMax: 10, tasa: 5 },
  { anosMax: Infinity, tasa: 0 },
];

/**
 * Calcula el impuesto de plusvalía por venta de un inmueble
 *
 * La plusvalía es la ganancia obtenida al vender una propiedad por encima
 * de su precio de compra. El impuesto aplica solo sobre la ganancia neta
 * (precio de venta - precio de compra - mejoras) y la tasa disminuye
 * según los años de tenencia: a más años, menor tasa.
 * Propiedades mantenidas más de 10 años están exentas.
 *
 * Base legal: Art. 17 N°8 LIR, Ley 21.210 (2020)
 *
 * @param input - Datos para el cálculo de plusvalía
 * @returns Desglose completo del impuesto de plusvalía
 */
export function calculatePlusvalia(input: PlusvaliaInput): PlusvaliaResult {
  const {
    precioCompra,
    precioVenta,
    anosTenencia,
    mejoras = 0,
  } = input;

  // Validar rangos
  const compra = Math.max(0, precioCompra);
  const venta = Math.max(0, precioVenta);
  const anos = Math.max(0, Math.min(anosTenencia, 50));
  const mejorasVal = Math.max(0, mejoras);

  // Ganancia bruta: diferencia entre venta y compra
  const gananciaBruta = venta - compra;

  // Ganancia neta: bruta menos mejoras documentadas
  const gananciaNeta = gananciaBruta - mejorasVal;

  // Solo aplica impuesto si hay ganancia neta positiva
  const hayGanancia = gananciaNeta > 0;

  // Determinar tasa según años de tenencia
  let tasaPlusvalia = 0;
  for (const tramo of TRAMOS_PLUSVALIA) {
    if (anos < tramo.anosMax) {
      tasaPlusvalia = tramo.tasa;
      break;
    }
  }

  // Exento si más de 10 años o no hay ganancia
  const exento = anos >= 10 || !hayGanancia;

  // Calcular impuesto
  const impuestoPlusvalia = exento ? 0 : Math.round(gananciaNeta * (tasaPlusvalia / 100));

  return {
    precioCompra: Math.round(compra),
    precioVenta: Math.round(venta),
    mejoras: Math.round(mejorasVal),
    anosTenencia: anos,
    gananciaBruta: Math.round(gananciaBruta),
    gananciaNeta: Math.round(gananciaNeta),
    tasaPlusvalia,
    impuestoPlusvalia,
    exento,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function plusvaliaToResults(result: PlusvaliaResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Impuesto Plusvalía',
    value: result.impuestoPlusvalia,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: 'Ganancia Neta',
    value: result.gananciaNeta,
    format: 'CLP',
  });

  results.push({
    label: 'Ganancia Bruta',
    value: result.gananciaBruta,
    format: 'CLP',
  });

  results.push({
    label: 'Tasa Plusvalía',
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
      label: 'Mejas Deducidas',
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
