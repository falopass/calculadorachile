// ============================================
// Presupuesto de telepeaje TAG
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface CostoTagInput {
  /** Tarifa vigente del pórtico/peaje y horario consultado. */
  tarifaPorPaso: number;
  pasadasMes: number;
  cargoFijoMensual?: number;
  otrosCargosMensuales?: number;
}

export interface CostoTagResult {
  tarifaPorPaso: number;
  pasadasMes: number;
  costoVariableMensual: number;
  cargoFijoMensual: number;
  otrosCargosMensuales: number;
  costoMensual: number;
  costoAnual: number;
}

/**
 * Proyecta el gasto desde la tarifa que el usuario obtiene del tarifario de su
 * concesionaria. No asigna precios por ruta ni un recargo universal “sin TAG”:
 * pórticos, horarios, categorías, pases diarios y mecanismos de regularización
 * cambian entre concesiones.
 */
export function calculateCostoTag(input: CostoTagInput): CostoTagResult {
  const tarifaPorPaso = Math.max(0, input.tarifaPorPaso);
  const pasadasMes = Math.max(0, Math.round(input.pasadasMes));
  const cargoFijoMensual = Math.max(0, input.cargoFijoMensual ?? 0);
  const otrosCargosMensuales = Math.max(0, input.otrosCargosMensuales ?? 0);
  const costoVariableMensual = tarifaPorPaso * pasadasMes;
  const costoMensual = costoVariableMensual + cargoFijoMensual + otrosCargosMensuales;

  return {
    tarifaPorPaso: Math.round(tarifaPorPaso),
    pasadasMes,
    costoVariableMensual: Math.round(costoVariableMensual),
    cargoFijoMensual: Math.round(cargoFijoMensual),
    otrosCargosMensuales: Math.round(otrosCargosMensuales),
    costoMensual: Math.round(costoMensual),
    costoAnual: Math.round(costoMensual * 12),
  };
}

export function costoTagToResults(result: CostoTagResult): CalculatorResult[] {
  return [
    { label: 'Presupuesto mensual', value: result.costoMensual, format: 'CLP', highlight: true },
    { label: 'Proyección anual', value: result.costoAnual, format: 'CLP' },
    { label: 'Costo variable del mes', value: result.costoVariableMensual, format: 'CLP' },
    { label: 'Tarifa ingresada por pasada', value: result.tarifaPorPaso, format: 'CLP' },
    { label: 'Pasadas al mes', value: result.pasadasMes, format: 'number' },
    { label: 'Cargos mensuales adicionales', value: result.cargoFijoMensual + result.otrosCargosMensuales, format: 'CLP' },
  ];
}
