// ============================================
// Cálculo de Costo TAG Autopista Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export type RutaPeaje = 'santiago_rancagua' | 'santiago_valparaiso' | 'santiago_los_andes' | 'santiago_san_fernando' | 'urbano_santiago';

export interface CostoTagInput {
  peajes: RutaPeaje;
  viajesMes: number;
  tieneConvenio?: boolean;
}

export interface CostoTagResult {
  peajes: RutaPeaje;
  costoPorViaje: number;
  costoPorViajeConvenio: number;
  viajesMes: number;
  costoMensual: number;
  costoAnual: number;
  tieneConvenio: boolean;
  descuentoConvenio: number;
  ahorroAnual: number;
}

/**
 * Costos base por tramo de autopista (valuados por viaje simple)
 *
 * Los precios son aproximados y corresponden a tarifas vigentes 2026
 * de las principales autopistas con cobro electrónico (TAG).
 *
 * Nota: Los valores reales pueden variar según horario (hora valle/punta)
 * y según la autopista específica (Costanera Norte, Vespucio, etc.)
 */
const COSTOS_PEAJE: Record<RutaPeaje, number> = {
  santiago_rancagua: 3800,
  santiago_valparaiso: 3200,
  santiago_los_andes: 2800,
  santiago_san_fernando: 4200,
  urbano_santiago: 1200,
} as const;

/**
 * Descuento por convenio de usuario frecuente (30%)
 */
const DESCUENTO_CONVENIO = 30; // 30%

/**
 * Calcula el costo mensual y anual del TAG en autopistas
 *
 * Incluye descuento por convenio de usuario frecuente (30%) para
 * quienes realizan viajes regulares por las autopistas concretadas.
 *
 * @param input - Datos del peaje, viajes mensuales y convenio
 * @returns Desglose del costo TAG mensual y anual
 */
export function calculateCostoTag(input: CostoTagInput): CostoTagResult {
  const { peajes, viajesMes, tieneConvenio = false } = input;

  // Validar rangos
  const viajesValidos = Math.max(0, viajesMes);

  // Costo base por viaje
  const costoPorViaje = COSTOS_PEAJE[peajes];

  // Costo con convenio (30% descuento)
  const costoPorViajeConvenio = costoPorViaje * (1 - DESCUENTO_CONVENIO / 100);

  // Tarifa efectiva según convenio
  const tarifaEfectiva = tieneConvenio ? costoPorViajeConvenio : costoPorViaje;

  // Costo mensual y anual
  const costoMensual = tarifaEfectiva * viajesValidos;
  const costoAnual = costoMensual * 12;

  // Ahorro por usar convenio
  const costoSinConvenioMensual = costoPorViaje * viajesValidos;
  const ahorroMensual = tieneConvenio ? costoSinConvenioMensual - costoMensual : 0;
  const ahorroAnual = ahorroMensual * 12;

  return {
    peajes,
    costoPorViaje,
    costoPorViajeConvenio: Math.round(costoPorViajeConvenio),
    viajesMes: viajesValidos,
    costoMensual: Math.round(costoMensual),
    costoAnual: Math.round(costoAnual),
    tieneConvenio,
    descuentoConvenio: tieneConvenio ? DESCUENTO_CONVENIO : 0,
    ahorroAnual: Math.round(ahorroAnual),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function costoTagToResults(result: CostoTagResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Costo Mensual',
      value: result.costoMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Costo Anual',
      value: result.costoAnual,
      format: 'CLP',
    },
    {
      label: 'Costo por Viaje',
      value: result.tieneConvenio ? result.costoPorViajeConvenio : result.costoPorViaje,
      format: 'CLP',
    },
    {
      label: 'Viajes al Mes',
      value: result.viajesMes,
      format: 'number',
    },
  ];

  if (result.descuentoConvenio > 0) {
    results.push(
      {
        label: 'Descuento Convenio',
        value: result.descuentoConvenio,
        format: 'percentage',
      },
      {
        label: 'Ahorro Anual por Convenio',
        value: result.ahorroAnual,
        format: 'CLP',
      },
    );
  }

  return results;
}
