// ============================================
// Conversor de Divisas (USD/EUR a CLP) Chile 2026
// Valores aproximados de referencia, no oficiales
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface ConversorDivisasInput {
  monto: number;
  moneda: 'usd' | 'eur';
  direccion: 'a_clp' | 'desde_clp';
}

export interface ConversorDivisasResult {
  monto: number;
  moneda: string;
  tasaCambio: number;
  resultado: number;
  direccion: string;
}

/**
 * Tasas de cambio aproximadas para 2026 (valores de referencia).
 * Estos valores son estimaciones y NO reemplazan las tasas oficiales del BCCH.
 * USD: ~960 CLP, EUR: ~1.040 CLP.
 */
export const TASAS_DIVISAS = {
  usd: 960,
  eur: 1040,
};

const NOMBRES_MONEDA: Record<ConversorDivisasInput['moneda'], string> = {
  usd: 'Dólar estadounidense (USD)',
  eur: 'Euro (EUR)',
};

/**
 * Convierte montos entre CLP y divisas extranjeras (USD/EUR).
 * Dirección 'a_clp': convierte moneda extranjera a pesos chilenos.
 * Dirección 'desde_clp': convierte pesos chilenos a moneda extranjera.
 * Las tasas son aproximadas. Consulte el Banco Central de Chile para valores oficiales.
 */
export function calculateConversorDivisas(input: ConversorDivisasInput): ConversorDivisasResult {
  const { monto, moneda, direccion } = input;

  // Validar monto
  const montoValidado = Math.max(0, monto);

  // Tasa de cambio según moneda
  const tasaCambio = TASAS_DIVISAS[moneda];

  // Calcular conversión
  let resultado: number;
  if (direccion === 'a_clp') {
    // Moneda extranjera a CLP
    resultado = Math.round(montoValidado * tasaCambio);
  } else {
    // CLP a moneda extranjera (2 decimales para divisas)
    resultado = Number((montoValidado / tasaCambio).toFixed(2));
  }

  return {
    monto: montoValidado,
    moneda: NOMBRES_MONEDA[moneda],
    tasaCambio,
    resultado,
    direccion: direccion === 'a_clp' ? `CLP desde ${moneda.toUpperCase()}` : `${moneda.toUpperCase()} desde CLP`,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function conversorDivisasToResults(result: ConversorDivisasResult): CalculatorResult[] {
  return [
    { label: 'Resultado', value: result.resultado, format: 'CLP', highlight: true },
    { label: 'Monto Original', value: result.monto, format: 'number' },
    { label: 'Tasa de Cambio', value: result.tasaCambio, format: 'number' },
  ];
}
