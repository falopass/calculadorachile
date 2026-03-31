// ============================================
// Cálculo de Gastos Comunes Chile 2026
// Estimación de gastos comunes mensuales en edificios/condominios
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface GastosComunesInput {
  superficieM2: number;
  valorM2?: number;
  incluyeEstacionamiento?: boolean;
  estacionamientos?: number;
  tienePiscina?: boolean;
  tieneGimnasio?: boolean;
  tieneConserje?: boolean;
}

export interface GastosComunesResult {
  gastoBaseM2: number;
  gastoEstacionamiento: number;
  gastoExtras: number;
  totalMensual: number;
  totalAnual: number;
}

/**
 * Costos adicionales por amenidades (valores de referencia 2026).
 * Piscina: ~$15.000, Gimnasio: ~$10.000, Conserje 24h: ~$20.000.
 */
const COSTOS_EXTRAS = {
  piscina: 15000,
  gimnasio: 10000,
  conserje: 20000,
};

/**
 * Costo por estacionamiento según rango de precio.
 * Valor de referencia: ~$35.000 por estacionamiento.
 */
const COSTO_ESTACIONAMIENTO = 35000;

/**
 * Calcula los gastos comunes mensuales estimados.
 * Base = superficie en m2 * valor por m2.
 * Se suman estacionamientos y amenidades según corresponda.
 * Los gastos comunes se regulan por la Ley de Copropiedad Inmobiliaria (Ley 19.537).
 */
export function calculateGastosComunes(input: GastosComunesInput): GastosComunesResult {
  const {
    superficieM2,
    valorM2 = 15000,
    incluyeEstacionamiento = false,
    estacionamientos = 0,
    tienePiscina = false,
    tieneGimnasio = false,
    tieneConserje = false,
  } = input;

  // Validar rangos
  const superficie = Math.max(0, superficieM2);
  const valorPorM2 = Math.max(0, valorM2);
  const numEstacionamientos = incluyeEstacionamiento ? Math.max(0, Math.round(estacionamientos)) : 0;

  // Gasto base por metros cuadrados
  const gastoBaseM2 = Math.round(superficie * valorPorM2);

  // Gasto por estacionamientos
  const gastoEstacionamiento = Math.round(numEstacionamientos * COSTO_ESTACIONAMIENTO);

  // Gasto por amenidades/extras
  let gastoExtras = 0;
  if (tienePiscina) gastoExtras += COSTOS_EXTRAS.piscina;
  if (tieneGimnasio) gastoExtras += COSTOS_EXTRAS.gimnasio;
  if (tieneConserje) gastoExtras += COSTOS_EXTRAS.conserje;

  // Total mensual y anual
  const totalMensual = gastoBaseM2 + gastoEstacionamiento + gastoExtras;
  const totalAnual = totalMensual * 12;

  return {
    gastoBaseM2,
    gastoEstacionamiento,
    gastoExtras,
    totalMensual,
    totalAnual,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function gastosComunesToResults(result: GastosComunesResult): CalculatorResult[] {
  return [
    { label: 'Total Mensual', value: result.totalMensual, format: 'CLP', highlight: true },
    { label: 'Total Anual', value: result.totalAnual, format: 'CLP' },
    { label: 'Gasto Base (m²)', value: result.gastoBaseM2, format: 'CLP' },
    { label: 'Gasto Estacionamiento', value: result.gastoEstacionamiento, format: 'CLP' },
    { label: 'Gasto Extras', value: result.gastoExtras, format: 'CLP' },
  ];
}
