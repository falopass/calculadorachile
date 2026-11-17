// ============================================
// Costo de un viaje en auto (combustible + peajes)
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CostoViajeInput {
  distanciaKm: number;
  rendimientoKmL: number;
  /** Precio por litro que declara el usuario (sin valor por defecto). */
  precioCombustible: number;
  /** Peajes/TAG de un trayecto; se duplican si es ida y vuelta. */
  peajes?: number;
  pasajeros?: number;
  idaYVuelta?: boolean;
}

export interface CostoViajeResult {
  distanciaTotal: number;
  litros: number;
  costoCombustible: number;
  costoPeajes: number;
  costoTotal: number;
  pasajeros: number;
  costoPorPasajero: number;
  costoPorKm: number;
}

/** Litros = km ÷ rendimiento; combustible = litros × precio; total = combustible + peajes. */
export function calculateCostoViaje(input: CostoViajeInput): CostoViajeResult {
  const tramos = input.idaYVuelta ? 2 : 1;
  const distanciaTotal = Math.max(0, input.distanciaKm) * tramos;
  const rendimiento = Math.max(0, input.rendimientoKmL);
  const litrosExactos = rendimiento > 0 ? distanciaTotal / rendimiento : 0;
  const costoCombustible = Math.round(litrosExactos * Math.max(0, input.precioCombustible));
  const costoPeajes = Math.round(Math.max(0, input.peajes ?? 0) * tramos);
  const costoTotal = costoCombustible + costoPeajes;
  const pasajeros = Math.max(1, Math.floor(input.pasajeros ?? 1));

  return {
    distanciaTotal,
    litros: Math.round(litrosExactos * 10) / 10,
    costoCombustible,
    costoPeajes,
    costoTotal,
    pasajeros,
    costoPorPasajero: Math.round(costoTotal / pasajeros),
    costoPorKm: distanciaTotal > 0 ? Math.round(costoTotal / distanciaTotal) : 0,
  };
}

export function costoViajeToResults(result: CostoViajeResult): CalculatorResult[] {
  return [
    { label: 'Costo total del viaje', value: result.costoTotal, format: 'CLP', highlight: true },
    {
      label: `Costo por pasajero (${result.pasajeros})`,
      value: result.costoPorPasajero,
      format: 'CLP',
    },
    { label: 'Costo de combustible', value: result.costoCombustible, format: 'CLP' },
    { label: 'Peajes y TAG', value: result.costoPeajes, format: 'CLP' },
    { label: 'Litros estimados', value: result.litros, format: 'number' },
    { label: 'Costo por km', value: result.costoPorKm, format: 'CLP' },
    { label: 'Distancia total (km)', value: result.distanciaTotal, format: 'number' },
  ];
}
