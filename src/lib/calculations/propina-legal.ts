// ============================================
// Cálculo de Propina Legal 10% Chile 2026
// Propina obligatoria del 10% en restaurantes y similares
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface PropinaLegalInput {
  montoConsumo: number;
  incluyePropina: boolean;
  porcentajePropina?: number;
}

export interface PropinaLegalResult {
  consumo: number;
  propina: number;
  total: number;
  porcentaje: number;
}

/**
 * Calcula la propina legal del 10% sobre consumo en restaurantes.
 * Si el monto ya incluye propina, se desglosa: consumo = total / (1 + %).
 * Si no incluye propina, se agrega: total = consumo * (1 + %).
 * Ley 19.628 y modificaciones, Art. 4 bis Ley de Protección al Consumidor.
 */
export function calculatePropinaLegal(input: PropinaLegalInput): PropinaLegalResult {
  const {
    montoConsumo,
    incluyePropina,
    porcentajePropina = 10,
  } = input;

  // Validar rangos
  const monto = Math.max(0, montoConsumo);
  const porcentaje = Math.max(0, Math.min(100, porcentajePropina));
  const factor = porcentaje / 100;

  let consumo: number;
  let propina: number;
  let total: number;

  if (incluyePropina) {
    // El monto recibido incluye la propina: desglosar
    total = monto;
    consumo = Math.round(total / (1 + factor));
    propina = total - consumo;
  } else {
    // El monto es solo el consumo: agregar propina
    consumo = monto;
    propina = Math.round(consumo * factor);
    total = consumo + propina;
  }

  return {
    consumo,
    propina,
    total,
    porcentaje,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function propinaLegalToResults(result: PropinaLegalResult): CalculatorResult[] {
  return [
    { label: 'Total a Pagar', value: result.total, format: 'CLP', highlight: true },
    { label: 'Consumo', value: result.consumo, format: 'CLP' },
    { label: 'Propina', value: result.propina, format: 'CLP' },
    { label: 'Porcentaje', value: result.porcentaje, format: 'percentage' },
  ];
}
