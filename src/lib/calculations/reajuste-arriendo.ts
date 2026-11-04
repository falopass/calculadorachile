// ============================================
// Cálculo de Reajuste de Arriendo por UF/IPC Chile 2026
// ============================================

import { UF } from '@/lib/values/constants';
import {
  IPC_FUENTE_URL,
  ipcIndiceMes,
  variacionIpcEntreMeses,
} from '@/lib/values/ipc-serie';
import type { CalculatorResult } from '@/types/calculator';

export interface ReajusteArriendoInput {
  arriendoActual: number;
  arriendoEnUF: boolean;
  /**
   * Variación IPC anual en porcentaje (modo manual). Si se entregan
   * `mesInicial` + `mesFinal` válidos se usa la serie oficial INE y
   * este valor se ignora.
   */
  variacionIPC?: number;
  /**
   * Meses desde el último reajuste. La Ley 18.101 / 21.461 permite
   * reajustar máximo cada 6 meses (en arriendos en CLP) y prorrateado
   * según el período transcurrido.
   */
  mesesDesdeUltimoReajuste: number;
  /**
   * Mes inicial 'YYYY-MM' de la serie INE base 2023=100 (opcional).
   * Si junto a `mesFinal` ambos existen en `IPC_SERIE_2023`, el
   * reajuste usa el factor real de la serie en vez del prorrateo
   * lineal del IPC anual.
   */
  mesInicial?: string;
  /** Mes final 'YYYY-MM' de la serie INE base 2023=100 (opcional). */
  mesFinal?: string;
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
  /** Mes inicial usado cuando el factor vino de la serie INE. */
  mesInicial?: string;
  /** Mes final usado cuando el factor vino de la serie INE. */
  mesFinal?: string;
  /** Índice INE del mes inicial (base 2023=100), si se usó la serie. */
  indiceIpcInicial?: number;
  /** Índice INE del mes final (base 2023=100), si se usó la serie. */
  indiceIpcFinal?: number;
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
  const {
    arriendoActual,
    arriendoEnUF,
    mesesDesdeUltimoReajuste,
    mesInicial,
    mesFinal,
  } = input;
  let variacionIPC = input.variacionIPC ?? 0;

  const valorUF = UF.valor;
  const meses = Math.max(0, Math.min(mesesDesdeUltimoReajuste, 24));

  const arriendoActualCLP = arriendoEnUF ? arriendoActual * valorUF : arriendoActual;
  const arriendoActualUF = arriendoEnUF ? arriendoActual : arriendoActual / valorUF;

  let factorReajuste = 1;
  let motivoSinReajuste: string | undefined;
  let variacionSerieIne: ReturnType<typeof variacionIpcEntreMeses> | undefined;

  if (arriendoEnUF) {
    // En UF: la UF ya se ajusta por IPC del mes anterior. NO se suma
    // IPC adicional. El monto en UF queda igual; el monto en CLP varía
    // diariamente con la UF.
    factorReajuste = 1;
    motivoSinReajuste =
      'El arriendo en UF se reajusta automáticamente con la variación diaria de la UF.';
  } else if (
    mesInicial !== undefined &&
    mesFinal !== undefined &&
    ipcIndiceMes(mesInicial) !== undefined &&
    ipcIndiceMes(mesFinal) !== undefined
  ) {
    // Serie oficial INE (base 2023=100): factor real entre los índices
    // de ambos meses, sin prorrateo lineal. Reemplaza al IPC anual
    // manual siempre que ambos meses existan en la serie.
    variacionSerieIne = variacionIpcEntreMeses(mesInicial, mesFinal);
    factorReajuste = variacionSerieIne.factor;
    variacionIPC = Math.round(variacionSerieIne.variacionExactaPct * 100) / 100;
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
    ...(variacionSerieIne && mesInicial && mesFinal
      ? {
          mesInicial,
          mesFinal,
          indiceIpcInicial: variacionSerieIne.indiceInicial,
          indiceIpcFinal: variacionSerieIne.indiceFinal,
        }
      : {}),
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
      ...(result.mesInicial && result.mesFinal
        ? {
            note: {
              text: `Serie oficial del INE (base 2023=100), ${result.mesInicial} → ${result.mesFinal}.`,
              source: { name: 'INE — Calculadora del IPC', url: IPC_FUENTE_URL },
            },
          }
        : {}),
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
