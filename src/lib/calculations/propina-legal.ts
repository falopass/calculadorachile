// ============================================
// Cálculo de Propina Sugerida 10% Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface PropinaLegalInput {
  montoConsumo: number;
  /**
   * Si el monto recibido ya incluye propina (boleta total) o no
   * (subtotal antes de propina).
   */
  incluyePropina: boolean;
  /** Porcentaje de propina (default: 10%, sugerencia legal). */
  porcentajePropina?: number;
}

export interface PropinaLegalResult {
  consumo: number;
  propina: number;
  total: number;
  porcentaje: number;
  /** La propina NO es legalmente obligatoria, solo sugerida. */
  esObligatoria: false;
}

/**
 * Calcula la propina sugerida del 10% sobre consumo en restaurantes.
 *
 * Aclaración legal: en Chile la propina del 10% NO es obligatoria.
 * La Ley 20.918 (2016) obliga al restaurante a SUGERIR la propina
 * en la cuenta, pero el cliente decide pagarla o no, y puede
 * pagar un monto distinto al sugerido. La propina, además, va
 * íntegramente al trabajador (no a la empresa) y no se le aplican
 * cotizaciones.
 *
 * Bug histórico: la versión anterior citaba la "Ley 19.628" (que es
 * la de protección de datos personales). La ley correcta es la
 * 20.918.
 *
 * Si `incluyePropina=true`: el monto recibido es el total (consumo +
 * propina) y se desglosa: consumo = total / (1 + %).
 * Si `incluyePropina=false`: el monto es solo el consumo y se agrega
 * la propina: total = consumo × (1 + %).
 *
 * Base legal: Ley 20.918 (Ley de Propina, 2016).
 */
export function calculatePropinaLegal(input: PropinaLegalInput): PropinaLegalResult {
  const { montoConsumo, incluyePropina, porcentajePropina = 10 } = input;

  const monto = Math.max(0, montoConsumo);
  const porcentaje = Math.max(0, Math.min(100, porcentajePropina));
  const factor = porcentaje / 100;

  let consumo: number;
  let propina: number;
  let total: number;

  if (incluyePropina) {
    total = monto;
    consumo = Math.round(total / (1 + factor));
    propina = total - consumo;
  } else {
    consumo = monto;
    propina = Math.round(consumo * factor);
    total = consumo + propina;
  }

  return {
    consumo,
    propina,
    total,
    porcentaje,
    esObligatoria: false,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function propinaLegalToResults(result: PropinaLegalResult): CalculatorResult[] {
  return [
    { label: 'Total a Pagar', value: result.total, format: 'CLP', highlight: true },
    { label: 'Consumo', value: result.consumo, format: 'CLP' },
    { label: 'Propina (sugerida)', value: result.propina, format: 'CLP' },
    { label: 'Porcentaje', value: result.porcentaje, format: 'percentage' },
  ];
}
