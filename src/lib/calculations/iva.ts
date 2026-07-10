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
  tasaPct: number;
  factorBruto: number;
}

/**
 * IVA Chile 19% (DL 825).
 * Agregar: neto → bruto. Quitar: bruto → neto (÷ 1,19).
 */
export function calculateIVA(input: IVAInput): IVAResult {
  const { monto, tipo } = input;
  const tasaIVA = IVA.tasa / 100;
  const factorBruto = 1 + tasaIVA;

  let montoConIVA: number;
  let montoSinIVA: number;
  let iva: number;

  if (tipo === 'agregar-iva') {
    montoSinIVA = monto;
    iva = monto * tasaIVA;
    montoConIVA = monto + iva;
  } else {
    montoConIVA = monto;
    montoSinIVA = monto / factorBruto;
    iva = montoConIVA - montoSinIVA;
  }

  return {
    montoOriginal: monto,
    montoConIVA: Math.round(montoConIVA),
    montoSinIVA: Math.round(montoSinIVA),
    iva: Math.round(iva),
    tipo,
    tasaPct: IVA.tasa,
    factorBruto,
  };
}

export function ivaToResults(result: IVAResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.tipo === 'agregar-iva') {
    results.push({
      label: 'Precio con IVA (bruto)',
      value: result.montoConIVA,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Precio neto (sin IVA)',
      value: result.montoSinIVA,
      format: 'CLP',
    });
  } else {
    results.push({
      label: 'Precio neto (sin IVA)',
      value: result.montoSinIVA,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Precio bruto (con IVA)',
      value: result.montoConIVA,
      format: 'CLP',
    });
  }

  results.push({
    label: `IVA (${result.tasaPct}%)`,
    value: result.iva,
    format: 'CLP',
  });

  results.push({
    label: 'Tasa IVA Chile',
    value: result.tasaPct,
    format: 'percentage',
  });

  results.push({
    label: 'Factor bruto (×1,19)',
    value: Math.round(result.factorBruto * 100) / 100,
    format: 'number',
  });

  return results;
}
