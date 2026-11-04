// ============================================
// Calculadora de IPC — reajuste entre dos meses
// Chile, serie oficial INE base anual 2023=100
// ============================================

import {
  IPC_FUENTE_URL,
  IPC_ULTIMO_MES,
  ipcIndiceMes,
  variacionIpcEntreMeses,
} from '@/lib/values/ipc-serie';
import type { CalculatorResult } from '@/types/calculator';

export interface IpcInput {
  /** Monto en CLP a reajustar. Si es 0, igual se informa la variación. */
  monto: number;
  /** Mes inicial 'YYYY-MM' de la serie INE. */
  mesInicial: string;
  /** Mes final 'YYYY-MM' de la serie INE. */
  mesFinal: string;
}

export interface IpcResult {
  monto: number;
  mesInicial: string;
  mesFinal: string;
  /** Índice INE del mes inicial (base 2023=100). */
  indiceInicial: number;
  /** Índice INE del mes final (base 2023=100). */
  indiceFinal: number;
  /** IPC_final / IPC_inicial, sin redondear. */
  factor: number;
  /** Variación exacta redondeada a 2 decimales. */
  variacionPct: number;
  /** Variación a 1 decimal, convención de publicación del INE. */
  variacionIne1Decimal: number;
  /** `Math.round(monto × factor)`. */
  montoReajustado: number;
  /** `montoReajustado − Math.round(monto)`. */
  diferencia: number;
}

/**
 * Reajusta un monto por la variación oficial del IPC entre dos meses.
 *
 * Réplica la calculadora del INE: el factor es el cuociente entre los
 * índices generales de ambos meses de la serie base 2023=100. El INE
 * publica la variación a 1 decimal; aquí se entrega también la exacta
 * a 2 decimales para trazabilidad.
 *
 * Lanza error si algún mes no existe en `IPC_SERIE_2023` (fuera del
 * rango publicado o formato distinto de 'YYYY-MM').
 *
 * Fuente: INE, https://calculadoraipc.ine.cl/
 */
export function calculateIPC(input: IpcInput): IpcResult {
  const { monto, mesInicial, mesFinal } = input;

  if (ipcIndiceMes(mesInicial) === undefined) {
    throw new Error(
      `mesInicial '${mesInicial}' no existe en la serie IPC INE ` +
        `(base 2023=100, último mes publicado: ${IPC_ULTIMO_MES}).`,
    );
  }
  if (ipcIndiceMes(mesFinal) === undefined) {
    throw new Error(
      `mesFinal '${mesFinal}' no existe en la serie IPC INE ` +
        `(base 2023=100, último mes publicado: ${IPC_ULTIMO_MES}).`,
    );
  }

  const { indiceInicial, indiceFinal, factor, variacionExactaPct, variacionRedondeadaPct } =
    variacionIpcEntreMeses(mesInicial, mesFinal);

  // Con monto 0 el reajuste es 0, pero la variación y los índices
  // siguen siendo información válida para el usuario.
  const montoBase = Math.round(monto);
  const montoReajustado = Math.round(monto * factor);

  return {
    monto,
    mesInicial,
    mesFinal,
    indiceInicial,
    indiceFinal,
    factor,
    variacionPct: Math.round(variacionExactaPct * 100) / 100,
    variacionIne1Decimal: variacionRedondeadaPct,
    montoReajustado,
    diferencia: montoReajustado - montoBase,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function ipcToResults(result: IpcResult): CalculatorResult[] {
  return [
    {
      label: 'Monto Reajustado',
      value: result.montoReajustado,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Variación IPC del período',
      value: result.variacionIne1Decimal,
      format: 'percentage',
      highlight: true,
      note: {
        text: `Serie oficial del INE (base 2023=100), ${result.mesInicial} → ${result.mesFinal}.`,
        source: { name: 'INE — Calculadora del IPC', url: IPC_FUENTE_URL },
      },
    },
    {
      label: 'Diferencia',
      value: result.diferencia,
      format: 'CLP',
    },
    {
      label: 'Variación exacta',
      value: result.variacionPct,
      format: 'percentage',
    },
    {
      label: 'Factor de reajuste',
      value: Math.round(result.factor * 10000) / 10000,
      format: 'number',
    },
    {
      label: `Índice ${result.mesInicial}`,
      value: result.indiceInicial,
      format: 'number',
    },
    {
      label: `Índice ${result.mesFinal}`,
      value: result.indiceFinal,
      format: 'number',
    },
    {
      label: 'Monto Original',
      value: Math.round(result.monto),
      format: 'CLP',
    },
  ];
}
