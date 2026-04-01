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
 * La ley establece tramos con diferentes reglas:
 * - Hasta $789.139: PGU completa
 * - Entre $789.139 y $1.252.602: PGU parcial (variable)
 * - Sobre $1.252.602: No aplica PGU
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

  // Determinar monto de PGU según tramos de ingreso
  let pguMensual: number;
  
  if (pension <= PGU_2026.tramos[0].ingresoMaximoCLP) {
    // Pensión base hasta $789.139: PGU completa
    pguMensual = pguBase;
  } else if (pension <= PGU_2026.tramos[1].ingresoMaximoCLP) {
    // Pensión entre $789.139 y $1.252.602: PGU parcial (variable)
    // La PGU se reduce proporcionalmente en este tramo
    const tramoInferior = PGU_2026.tramos[0].ingresoMaximoCLP;
    const tramoSuperior = PGU_2026.tramos[1].ingresoMaximoCLP;
    
    // Calcular reducción proporcional
    const posicionEnTramo = (pension - tramoInferior) / (tramoSuperior - tramoInferior);
    pguMensual = Math.round(pguBase * (1 - posicionEnTramo));
  } else {
    // Pensión sobre $1.252.602: No aplica PGU
    pguMensual = 0;
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
