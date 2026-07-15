// ============================================
// Cálculo de Pensión Garantizada Universal (PGU) Chile 2026
// Beneficio no contributivo del Estado para pensionados (Ley 21.419)
// ============================================

import { PGU_2026 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PGUInput {
  pensionActual: number;
  /** Años cotizados (informativo, no afecta la PGU desde Ley 21.419). */
  anosCotizados: number;
  /** Sexo del beneficiario (informativo, la PGU no distingue por sexo). */
  esHombre: boolean;
  /** Edad del beneficiario para elegir tramo de PGU (default 70). */
  edad?: number;
}

export interface PGUResult {
  pensionActual: number;
  anosCotizados: number;
  pguBase: number;
  pguMensual: number;
  pensionTotal: number;
  edad: number;
  cumpleEdadMinima: boolean;
  esContributiva: false;
}

/**
 * Calcula la Pensión Garantizada Universal (PGU).
 *
 * Bug histórico: la versión anterior aplicaba un "factor por años
 * cotizados" (0.5 → 1.0) que no existe en la ley. La PGU es un
 * beneficio NO CONTRIBUTIVO (Ley 21.419), por lo que no requiere años
 * de cotización ni los reajusta. Adicionalmente el parámetro
 * `esHombre` no se usa porque la PGU no distingue por sexo.
 *
 * Reglas correctas (Ley 21.419):
 *   - 65 a 81 años: monto base $231.732 (PGU 2026).
 *   - 82+: monto base $250.275 (PGU 2026).
 *   - Pensión base ≤ $789.139: PGU completa.
 *   - Entre $789.139 y $1.252.602: PGU se reduce linealmente hasta 0.
 *   - Sobre $1.252.602: no recibe PGU.
 *
 * Base legal: Ley 21.419.
 */
export function calculatePGU(input: PGUInput): PGUResult {
  const { pensionActual, anosCotizados, edad = 70 } = input;

  const pension = Math.max(0, pensionActual);
  const anos = Math.max(0, Math.round(anosCotizados));
  const edadVal = Math.max(0, Math.round(edad));

  const cumpleEdadMinima = edadVal >= PGU_2026.edadMinima;

  // PGU base según edad (sin factor por años cotizados).
  const pguBase =
    edadVal >= 82
      ? PGU_2026.montoMaximo82MasCLP
      : PGU_2026.montoMaximo65a81CLP;

  // Reducción lineal entre los dos tramos de pensión base.
  let pguMensual: number;
  if (!cumpleEdadMinima) {
    pguMensual = 0;
  } else if (pension <= PGU_2026.tramos[0].ingresoMaximoCLP) {
    pguMensual = pguBase;
  } else if (pension <= PGU_2026.tramos[1].ingresoMaximoCLP) {
    const tramoInferior = PGU_2026.tramos[0].ingresoMaximoCLP;
    const tramoSuperior = PGU_2026.tramos[1].ingresoMaximoCLP;
    const posicionEnTramo = (pension - tramoInferior) / (tramoSuperior - tramoInferior);
    pguMensual = Math.round(pguBase * (1 - posicionEnTramo));
  } else {
    pguMensual = 0;
  }

  pguMensual = Math.max(0, pguMensual);
  const pensionTotal = pension + pguMensual;

  return {
    pensionActual: pension,
    anosCotizados: anos,
    pguBase,
    pguMensual,
    pensionTotal,
    edad: edadVal,
    cumpleEdadMinima,
    esContributiva: false,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function pguToResults(result: PGUResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    { label: 'PGU Mensual', value: result.pguMensual, format: 'CLP', highlight: true },
    { label: 'Pensión Total', value: result.pensionTotal, format: 'CLP', highlight: true },
    { label: 'Pensión Actual', value: result.pensionActual, format: 'CLP' },
    { label: 'PGU Base (según edad)', value: result.pguBase, format: 'CLP' },
    { label: 'Edad', value: result.edad, format: 'number' },
  ];

  if (!result.cumpleEdadMinima) {
    results.push({ label: 'No cumple la edad mínima de 65 años', value: 1, format: 'number' });
  }

  return results;
}
