// ============================================
// Conversión UF ↔ CLP
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface UFCLPInput {
  monto: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
  /** UF en vivo (UI). Default: snapshot `UF.valor`. */
  valorUF?: number;
}

export interface UFCLPResult {
  montoOriginal: number;
  montoConvertido: number;
  valorUF: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
}

/**
 * Convierte entre UF y CLP usando el último valor disponible de la UF.
 *
 * Nota histórica: una versión anterior incluía "histórico" y "proyección"
 * con `Math.random()`. Eso generaba datos falsos en producción y se
 * eliminó. Si en el futuro se quiere agregar histórico real, debe venir
 * de una serie de BCentral o Mindicador, no de un random.
 */
export function calculateUFCLP(input: UFCLPInput): UFCLPResult {
  const { monto, direccion } = input;
  const valorUF = input.valorUF ?? UF.valor;

  if (valorUF <= 0) {
    throw new Error('Valor de UF inválido. Actualiza la página e intenta de nuevo.');
  }

  const montoConvertido =
    direccion === 'uf-a-clp' ? monto * valorUF : monto / valorUF;

  return {
    montoOriginal: monto,
    montoConvertido,
    valorUF,
    direccion,
  };
}

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
    label: 'Valor UF actual',
    value: result.valorUF,
    format: 'CLP',
  });

  return results;
}
