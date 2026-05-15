// ============================================
// Cálculo de Multas de Tránsito en UTM Chile 2026
// ============================================

import { UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoMulta =
  | 'leve'
  | 'menos_grave'
  | 'grave'
  | 'gravisima'
  | 'gravisima_alcohol';

export interface MultasTransitoInput {
  tipoMulta: TipoMulta;
  cantidadMultas?: number;
  /** Reincidencia dentro de 12 meses: recargo del 50%. */
  esReincidente?: boolean;
}

export interface MultasTransitoResult {
  tipoMulta: TipoMulta;
  montoUTM: number;
  montoCLP: number;
  cantidadMultas: number;
  totalCLP: number;
  recargoReincidencia: number;
}

/**
 * Montos de multas de tránsito en UTM (Ley 18.290, Art. 196 y ss.).
 *
 * Bug histórico:
 *  - El "punto medio" para grave (1,5-3 UTM) y gravísima (3-5 UTM)
 *    se mantenía hardcoded sin documentar el rango.
 *  - Faltaba el caso especial de gravísimas con alcohol (Ley Emilia
 *    20.770 y Ley Tolerancia Cero 20.580): manejar bajo influencia
 *    del alcohol > 0,8 g/L o causando muerte/lesiones llega hasta
 *    10-15 UTM.
 *
 * Valores de referencia (punto medio del rango legal):
 *   - leve: 0,5 UTM (rango 0,1 - 1)
 *   - menos_grave: 1 UTM (rango 1 - 1,5)
 *   - grave: 2 UTM (rango 1,5 - 3)
 *   - gravisima: 4 UTM (rango 3 - 5)
 *   - gravisima_alcohol: 12 UTM (rango 10 - 15, Ley Emilia)
 */
const MONTOS_MULTAS: Record<TipoMulta, number> = {
  leve: 0.5,
  menos_grave: 1,
  grave: 2,
  gravisima: 4,
  gravisima_alcohol: 12,
};

const NOMBRES_MULTA: Record<TipoMulta, string> = {
  leve: 'Leve',
  menos_grave: 'Menos Grave',
  grave: 'Grave',
  gravisima: 'Gravísima',
  gravisima_alcohol: 'Gravísima con alcohol (Ley Emilia)',
};

/** Recargo por reincidencia dentro de 12 meses (Art. 197 Ley 18.290). */
const RECARGO_REINCIDENCIA = 0.5;

/**
 * Calcula el monto de multas de tránsito en CLP.
 *
 * Base legal: Ley 18.290 (Ley de Tránsito) Art. 196-204;
 *             Ley 20.770 (Ley Emilia) y Ley 20.580 (Tolerancia Cero).
 */
export function calculateMultasTransito(
  input: MultasTransitoInput,
): MultasTransitoResult {
  const { tipoMulta, cantidadMultas = 1, esReincidente = false } = input;

  const cantidadValida = Math.max(1, Math.round(cantidadMultas));
  const montoUTM = MONTOS_MULTAS[tipoMulta];

  let montoCLP = montoUTM * UTM.valor;

  // Recargo por reincidencia (50%)
  const recargoReincidencia = esReincidente ? Math.round(montoCLP * RECARGO_REINCIDENCIA) : 0;
  if (esReincidente) {
    montoCLP += recargoReincidencia;
  }

  const totalCLP = montoCLP * cantidadValida;

  return {
    tipoMulta,
    montoUTM,
    montoCLP: Math.round(montoCLP),
    cantidadMultas: cantidadValida,
    totalCLP: Math.round(totalCLP),
    recargoReincidencia,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function multasTransitoToResults(result: MultasTransitoResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Total Multas',
      value: result.totalCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto por Multa',
      value: result.montoCLP,
      format: 'CLP',
    },
    {
      label: 'Monto en UTM',
      value: result.montoUTM,
      format: 'UTM',
    },
    {
      label: `Tipo: ${NOMBRES_MULTA[result.tipoMulta]}`,
      value:
        result.tipoMulta === 'leve'
          ? 1
          : result.tipoMulta === 'menos_grave'
            ? 2
            : result.tipoMulta === 'grave'
              ? 3
              : result.tipoMulta === 'gravisima'
                ? 4
                : 5,
      format: 'number',
    },
    {
      label: 'Cantidad de Multas',
      value: result.cantidadMultas,
      format: 'number',
    },
  ];

  if (result.recargoReincidencia > 0) {
    results.push({
      label: 'Recargo por Reincidencia (50%)',
      value: result.recargoReincidencia,
      format: 'CLP',
    });
  }

  return results;
}
