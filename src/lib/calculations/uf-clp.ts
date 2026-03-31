// ============================================
// Cálculo de Conversión UF ↔ CLP
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface UFCLPInput {
  monto: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
}

export interface UFCLPResult {
  montoOriginal: number;
  montoConvertido: number;
  valorUF: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
}

/**
 * Convierte entre UF y CLP
 */
export function calculateUFCLP(input: UFCLPInput): UFCLPResult {
  const { monto, direccion } = input;
  const valorUF = UF.valor;
  
  let montoConvertido: number;
  
  if (direccion === 'uf-a-clp') {
    // UF a CLP: multiplicar
    montoConvertido = monto * valorUF;
  } else {
    // CLP a UF: dividir
    montoConvertido = monto / valorUF;
  }
  
  return {
    montoOriginal: monto,
    montoConvertido,
    valorUF,
    direccion,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function ufclpToResults(result: UFCLPResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  if (result.direccion === 'uf-a-clp') {
    results.push({
      label: 'Monto en CLP',
      value: Math.round(result.montoConvertido),
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto en UF',
      value: result.montoOriginal,
      format: 'UF',
    });
  } else {
    results.push({
      label: 'Monto en UF',
      value: Math.round(result.montoConvertido * 100) / 100,
      format: 'UF',
      highlight: true,
    });
    results.push({
      label: 'Monto en CLP',
      value: result.montoOriginal,
      format: 'CLP',
    });
  }
  
  results.push({
    label: 'Valor UF',
    value: result.valorUF,
    format: 'CLP',
  });
  
  return results;
}
