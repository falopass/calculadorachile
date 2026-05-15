// ============================================
// Cálculo de Costo TAG Autopista Chile 2026
// ============================================

import {
  TAG_RUTAS,
  TAG_RECARGO_SIN_TAG,
  TAG_URBANO_SANTIAGO,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type RutaPeaje =
  | 'santiago_rancagua'
  | 'santiago_valparaiso'
  | 'santiago_los_andes'
  | 'santiago_san_fernando'
  | 'urbano_santiago';

export interface CostoTagInput {
  peajes: RutaPeaje;
  viajesMes: number;
  /**
   * Algunas concesionarias dan rebajas a usuarios con TAG vigente
   * (vs. tarifa "ocasional" que es ~50% más alta). El "convenio" no
   * es un descuento adicional formal; se mantiene como modelado de
   * tarifa con TAG vs sin TAG.
   */
  tieneConvenio?: boolean;
  /** Categoría del vehículo (1: auto/moto, 2: camioneta, 3: camión). */
  categoria?: 1 | 2 | 3;
}

export interface CostoTagResult {
  peajes: RutaPeaje;
  costoPorViaje: number;
  costoPorViajeSinTag: number;
  viajesMes: number;
  costoMensual: number;
  costoAnual: number;
  tieneConvenio: boolean;
  categoria: number;
  ahorroPorTagAnual: number;
}

/**
 * Mapeo entre la clave de la calculadora y la clave de TAG_RUTAS
 * en constants.ts (que ya tiene tarifas reales por categoría).
 */
const RUTA_A_KEY: Record<RutaPeaje, keyof typeof TAG_RUTAS | null> = {
  santiago_rancagua: 'santiago-rancagua',
  santiago_valparaiso: 'santiago-valparaiso',
  santiago_los_andes: 'santiago-losandes',
  santiago_san_fernando: 'santiago-rancagua', // misma ruta extendida
  urbano_santiago: null, // valor distinto, ver más abajo
};

/**
 * Tarifas urbano-Santiago (Costanera Norte, Vespucio, Autopista del
 * Sol, Acceso Sur, etc.) ahora viven en `TAG_URBANO_SANTIAGO` en
 * constants.ts. Mapeamos por categoría de vehículo.
 */
const URBANO_SANTIAGO_TARIFA: Record<1 | 2 | 3, number> = {
  1: TAG_URBANO_SANTIAGO.categoria1,
  2: TAG_URBANO_SANTIAGO.categoria2,
  3: TAG_URBANO_SANTIAGO.categoria3,
};

/**
 * Recargo "sin TAG" / "ocasional": MOP autoriza hasta +50% sobre la
 * tarifa con TAG. Definido en `TAG_RECARGO_SIN_TAG` en constants.ts.
 */
const RECARGO_SIN_TAG = TAG_RECARGO_SIN_TAG / 100;

/**
 * Calcula el costo mensual y anual del TAG.
 *
 * Bug histórico:
 *  - El archivo definía un set hardcodeado de tarifas distinto al de
 *    `TAG_RUTAS` en constants.ts (3.800 vs 3.500), generando
 *    inconsistencias internas.
 *  - El "descuento por convenio 30%" no corresponde al modelo real:
 *    la diferencia es entre tarifa con TAG y tarifa ocasional
 *    (sin TAG paga +50%).
 *
 * Fix: usa los valores de `TAG_RUTAS` (categorizados por tipo de
 * vehículo) y modela "sin TAG" como recargo +50% sobre la tarifa
 * con TAG, en vez de un descuento ficticio.
 */
export function calculateCostoTag(input: CostoTagInput): CostoTagResult {
  const { peajes, viajesMes, tieneConvenio = true, categoria = 1 } = input;

  const viajesValidos = Math.max(0, viajesMes);

  // Obtener tarifa con TAG según ruta y categoría
  let costoConTag: number;
  const rutaKey = RUTA_A_KEY[peajes];
  if (rutaKey === null) {
    costoConTag = URBANO_SANTIAGO_TARIFA[categoria];
  } else {
    const ruta = TAG_RUTAS[rutaKey];
    costoConTag =
      categoria === 1
        ? ruta.categoria1
        : categoria === 2
          ? ruta.categoria2
          : ruta.categoria3;
  }

  const costoSinTag = Math.round(costoConTag * (1 + RECARGO_SIN_TAG));
  const tarifaEfectiva = tieneConvenio ? costoConTag : costoSinTag;

  const costoMensual = tarifaEfectiva * viajesValidos;
  const costoAnual = costoMensual * 12;

  // Ahorro de tener TAG vs no tenerlo
  const ahorroPorTagAnual = (costoSinTag - costoConTag) * viajesValidos * 12;

  return {
    peajes,
    costoPorViaje: tarifaEfectiva,
    costoPorViajeSinTag: costoSinTag,
    viajesMes: viajesValidos,
    costoMensual: Math.round(costoMensual),
    costoAnual: Math.round(costoAnual),
    tieneConvenio,
    categoria,
    ahorroPorTagAnual: tieneConvenio ? Math.round(ahorroPorTagAnual) : 0,
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
      value: result.costoPorViaje,
      format: 'CLP',
    },
    {
      label: 'Tarifa sin TAG (referencial)',
      value: result.costoPorViajeSinTag,
      format: 'CLP',
    },
    {
      label: 'Viajes al Mes',
      value: result.viajesMes,
      format: 'number',
    },
    {
      label: 'Categoría Vehículo',
      value: result.categoria,
      format: 'number',
    },
  ];

  if (result.tieneConvenio && result.ahorroPorTagAnual > 0) {
    results.push({
      label: 'Ahorro Anual por usar TAG',
      value: result.ahorroPorTagAnual,
      format: 'CLP',
    });
  }

  return results;
}
