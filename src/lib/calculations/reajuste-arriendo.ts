// ============================================
// Cálculo de Reajuste de Arriendo por UF/IPC Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ReajusteArriendoInput {
  arriendoActual: number;
  arriendoEnUF: boolean;
  /** Variación IPC anual en porcentaje. */
  variacionIPC: number;
  /**
   * Meses desde el último reajuste. La Ley 18.101 / 21.461 permite
   * reajustar máximo cada 6 meses (en arriendos en CLP) y prorrateado
   * según el período transcurrido.
   */
  mesesDesdeUltimoReajuste: number;
}

export interface ReajusteArriendoResult {
  arriendoActual: number;
  arriendoActualUF: number;
  variacionIPC: number;
  mesesDesdeUltimoReajuste: number;
  factorReajuste: number;
  nuevoArriendoCLP: number;
  nuevoArriendoUF: number;
  incrementoMensual: number;
  incrementoPorcentual: number;
  valorUF: number;
  /** Indicador para la UI: si está en UF, no se aplica IPC adicional. */
  motivoSinReajuste?: string;
}

/**
 * Calcula el reajuste de arriendo por UF o IPC.
 *
 * Bugs históricos:
 *  - `mesesDesdeUltimoReajuste` se recibía pero no se usaba: se aplicaba
 *    el IPC anual completo aunque hubieran pasado 3 meses. La Ley 21.461
 *    exige proporcionalidad según el período (mín. 6 meses entre
 *    reajustes en arriendos CLP).
 *  - Si `arriendoEnUF=true` igual sumaba IPC sobre la UF, doble
 *    reajuste. Los arriendos en UF se ajustan automáticamente por la
 *    variación de la UF y NO se les suma IPC.
 *
 * Base legal: Ley 18.101 (Arrendamiento de Predios Urbanos),
 *             Ley 21.461 (transparencia y reajuste).
 */
export function calculateReajusteArriendo(
  input: ReajusteArriendoInput,
): ReajusteArriendoResult {
  const { arriendoActual, arriendoEnUF, variacionIPC, mesesDesdeUltimoReajuste } = input;

  const valorUF = UF.valor;
  const meses = Math.max(0, Math.min(mesesDesdeUltimoReajuste, 24));

  const arriendoActualCLP = arriendoEnUF ? arriendoActual * valorUF : arriendoActual;
  const arriendoActualUF = arriendoEnUF ? arriendoActual : arriendoActual / valorUF;

  let factorReajuste = 1;
  let motivoSinReajuste: string | undefined;

  if (arriendoEnUF) {
    // En UF: la UF ya se ajusta por IPC del mes anterior. NO se suma
    // IPC adicional. El monto en UF queda igual; el monto en CLP varía
    // diariamente con la UF.
    factorReajuste = 1;
    motivoSinReajuste =
      'El arriendo en UF se reajusta automáticamente con la variación diaria de la UF.';
  } else {
    // En CLP: proporcional al tiempo transcurrido. La ley permite
    // reajustar como máximo cada 6 meses; si han pasado menos meses,
    // se prorratea linealmente.
    if (meses >= 12) {
      factorReajuste = 1 + variacionIPC / 100;
    } else {
      factorReajuste = 1 + (variacionIPC / 100) * (meses / 12);
    }
  }

  const nuevoArriendoCLP = arriendoActualCLP * factorReajuste;
  const nuevoArriendoUF = nuevoArriendoCLP / valorUF;

  const incrementoMensual = nuevoArriendoCLP - arriendoActualCLP;
  const incrementoPorcentual =
    arriendoActualCLP > 0 ? ((nuevoArriendoCLP / arriendoActualCLP) - 1) * 100 : 0;

  return {
    arriendoActual: Math.round(arriendoActualCLP),
    arriendoActualUF: Math.round(arriendoActualUF * 100) / 100,
    variacionIPC,
    mesesDesdeUltimoReajuste: meses,
    factorReajuste: Math.round(factorReajuste * 10000) / 10000,
    nuevoArriendoCLP: Math.round(nuevoArriendoCLP),
    nuevoArriendoUF: Math.round(nuevoArriendoUF * 100) / 100,
    incrementoMensual: Math.round(incrementoMensual),
    incrementoPorcentual: Math.round(incrementoPorcentual * 100) / 100,
    valorUF,
    motivoSinReajuste,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function reajusteArriendoToResults(
  result: ReajusteArriendoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Nuevo Arriendo',
      value: result.nuevoArriendoCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Nuevo Arriendo (UF)',
      value: result.nuevoArriendoUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Incremento Mensual',
      value: result.incrementoMensual,
      format: 'CLP',
    },
    {
      label: 'Incremento Porcentual',
      value: result.incrementoPorcentual,
      format: 'percentage',
    },
    {
      label: 'Arriendo Actual',
      value: result.arriendoActual,
      format: 'CLP',
    },
    {
      label: 'Variación IPC',
      value: result.variacionIPC,
      format: 'percentage',
    },
    {
      label: 'Meses desde último reajuste',
      value: result.mesesDesdeUltimoReajuste,
      format: 'number',
    },
    {
      label: 'Valor UF',
      value: result.valorUF,
      format: 'CLP',
    },
  ];

  return results;
}
