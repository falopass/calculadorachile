// ============================================
// Conversor UTM ↔ CLP Chile 2026
// ============================================

import { UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface UtmClpInput {
  monto: number;
  direccion: 'utm-a-clp' | 'clp-a-utm';
}

export interface UtmClpResult {
  montoOriginal: number;
  montoConvertido: number;
  valorUtm: number;
  direccion: 'utm-a-clp' | 'clp-a-utm';
}

/**
 * Convierte entre UTM y pesos chilenos
 * 
 * La UTM (Unidad Tributaria Mensual) es una unidad de cuenta usada en Chile
 * para fines tributarios, actualizada mensualmente según el IPC.
 * 
 * @param input - Monto y dirección de conversión
 * @returns Resultado con monto convertido y valor UTM usado
 */
export function calculateUTMCLP(input: UtmClpInput): UtmClpResult {
  const { monto, direccion } = input;
  const valorUtm = UTM.valor;

  let montoConvertido: number;

  if (direccion === 'utm-a-clp') {
    // Convertir UTM a CLP: multiplicar por valor de la UTM
    montoConvertido = monto * valorUtm;
  } else {
    // Convertir CLP a UTM: dividir por valor de la UTM
    montoConvertido = monto / valorUtm;
  }

  return {
    montoOriginal: monto,
    montoConvertido,
    valorUtm,
    direccion,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function utmClpToResults(result: UtmClpResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.direccion === 'utm-a-clp') {
    results.push({
      label: 'Monto en Pesos',
      value: Math.round(result.montoConvertido),
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto en UTM',
      value: result.montoOriginal,
      format: 'number',
    });
  } else {
    results.push({
      label: 'Monto en UTM',
      value: Math.round(result.montoConvertido * 100) / 100, // 2 decimales
      format: 'number',
      highlight: true,
    });
    results.push({
      label: 'Monto en Pesos',
      value: Math.round(result.montoOriginal),
      format: 'CLP',
    });
  }

  results.push({
    label: 'Valor UTM',
    value: result.valorUtm,
    format: 'CLP',
  });

  return results;
}
