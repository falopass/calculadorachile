// ============================================
// Cálculo de IVA Chile
// ============================================

import { IVA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface IVAInput {
  monto: number;
  tipo: 'agregar-iva' | 'quitar-iva';
}

export interface IVAResult {
  montoOriginal: number;
  montoConIVA: number;
  montoSinIVA: number;
  iva: number;
  tipo: 'agregar-iva' | 'quitar-iva';
}

/**
 * Calcula IVA (19%)
 */
export function calculateIVA(input: IVAInput): IVAResult {
  const { monto, tipo } = input;
  const tasaIVA = IVA.tasa / 100; // 0.19
  
  let montoConIVA: number;
  let montoSinIVA: number;
  let iva: number;
  
  if (tipo === 'agregar-iva') {
    // El monto ingresado es neto, agregar IVA
    montoSinIVA = monto;
    iva = monto * tasaIVA;
    montoConIVA = monto + iva;
  } else {
    // El monto ingresado es bruto, quitar IVA
    montoConIVA = monto;
    montoSinIVA = monto / (1 + tasaIVA);
    iva = montoConIVA - montoSinIVA;
  }
  
  return {
    montoOriginal: monto,
    montoConIVA: Math.round(montoConIVA),
    montoSinIVA: Math.round(montoSinIVA),
    iva: Math.round(iva),
    tipo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function ivaToResults(result: IVAResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  if (result.tipo === 'agregar-iva') {
    results.push({
      label: 'Monto con IVA',
      value: result.montoConIVA,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto Neto',
      value: result.montoSinIVA,
      format: 'CLP',
    });
  } else {
    results.push({
      label: 'Monto Neto (sin IVA)',
      value: result.montoSinIVA,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto Bruto',
      value: result.montoConIVA,
      format: 'CLP',
    });
  }
  
  results.push({
    label: 'IVA (19%)',
    value: result.iva,
    format: 'CLP',
  });
  
  return results;
}
