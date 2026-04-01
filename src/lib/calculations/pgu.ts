// ============================================
// Cálculo de Pensión Garantizada Universal (PGU) Chile 2026
// Beneficio previsional del Estado para pensionados con bajas pensiones
// ============================================

import { UF, PGU_2026 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PGUInput {
  pensionActual: number;
  anosCotizados: number;
  esHombre: boolean;
}

export interface PGUResult {
  pensionActual: number;
  anosCotizados: number;
  pguBase: number;
  factorAniosCotizados: number;
  pguMensual: number;
  pensionTotal: number;
}

/**
 * Monto base PGU 2026: ~$214.296 para pensionados con 0-10 años de cotizaciones.
 * Escala progresivamente con más años de cotización hasta un máximo.
 * Umbral de reducción: pensiones sobre 1 UF tienen reducción progresiva.
 * D.L. 3500, Ley 21.396 y modificaciones.
 */
// El monto base de PGU se obtiene de los valores constantes actualizados
// La PGU ahora tiene montos diferenciados por edad (65-81 años vs 82+ años)

/**
 * Factor máximo por años de cotización (a más años, mayor PGU).
 * Escala desde 0.5 (pocos años) hasta 1.0 (30+ años).
 */
function calcularFactorAnios(anosCotizados: number): number {
  const anos = Math.max(0, anosCotizados);
  if (anos <= 10) return 0.5;
  if (anos <= 20) return 0.5 + (anos - 10) * 0.03;
  if (anos <= 30) return 0.8 + (anos - 20) * 0.02;
  return 1.0;
}

/**
 * Calcula la Pensión Garantizada Universal (PGU).
 * El monto depende de los años de cotización y se reduce para pensiones altas.
 * Reducción: 0% si la pensión es menor a 1 UF, progresiva por encima de 1 UF.
 * La pensión base se calcula en UF para la reducción y se convierte a CLP.
 * Ley 21.396, D.L. 3500.
 */
export function calculatePGU(input: PGUInput): PGUResult {
  const { pensionActual, anosCotizados, esHombre } = input;

  // Validar rangos
  const pension = Math.max(0, pensionActual);
  const anos = Math.max(0, Math.round(anosCotizados));

  // Factor según años de cotización
  const factorAniosCotizados = Number(calcularFactorAnios(anos).toFixed(2));

  // PGU base ajustada por años de cotización
    // Usar el monto base para 65-81 años como referencia (el más común)
    const pguBase = Math.round(PGU_2026.montoMaximo65a81CLP * factorAniosCotizados);

  // Umbral de reducción en CLP (1 UF)
  const umbralUF1 = Math.round(1 * UF.valor);

  // Calcular reducción si la pensión supera 1 UF
  let pguMensual: number;
  if (pension <= umbralUF1) {
    // Sin reducción
    pguMensual = pguBase;
  } else {
    // Reducción progresiva: 9.57% por cada UF sobre el umbral
    const ufExcedentes = (pension - umbralUF1) / UF.valor;
    const reduccionPct = Math.min(1, ufExcedentes * 0.0957);
    pguMensual = Math.round(pguBase * (1 - reduccionPct));
  }

  // Asegurar PGU no negativa
  pguMensual = Math.max(0, pguMensual);

  // Pensión total = pensión actual + PGU
  const pensionTotal = pension + pguMensual;

  return {
    pensionActual: pension,
    anosCotizados: anos,
    pguBase,
    factorAniosCotizados,
    pguMensual,
    pensionTotal,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function pguToResults(result: PGUResult): CalculatorResult[] {
  return [
    { label: 'PGU Mensual', value: result.pguMensual, format: 'CLP', highlight: true },
    { label: 'Pensión Total', value: result.pensionTotal, format: 'CLP', highlight: true },
    { label: 'Pensión Actual', value: result.pensionActual, format: 'CLP' },
    { label: 'PGU Base', value: result.pguBase, format: 'CLP' },
    { label: 'Años Cotizados', value: result.anosCotizados, format: 'number' },
    { label: 'Factor por Años', value: result.factorAniosCotizados, format: 'number' },
  ];
}
