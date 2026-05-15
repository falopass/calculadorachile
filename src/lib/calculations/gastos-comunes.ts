// ============================================
// Estimador de Gastos Comunes Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface GastosComunesInput {
  /** Superficie útil del departamento o casa en m². */
  superficieM2: number;
  /** Valor por m² mensual (referencial). Default: $15.000/m². */
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
  /** Aviso: es una estimación, no un cálculo legal exacto. */
  aviso: string;
}

/**
 * Costos adicionales por amenidades (valores referenciales 2026).
 */
const COSTOS_EXTRAS = {
  piscina: 15000,
  gimnasio: 10000,
  conserje: 20000,
};

/** Costo aproximado por estacionamiento. */
const COSTO_ESTACIONAMIENTO = 35000;

const AVISO_LEGAL =
  'Esta calculadora entrega una ESTIMACIÓN basada en valores promedio. La Ley 21.442 (Nueva Ley de Copropiedad Inmobiliaria, vigente desde abril 2024) regula la distribución de gastos comunes según el coeficiente de prorrateo de cada unidad establecido en el reglamento de copropiedad — no fija montos. Consulta tu administración para conocer los gastos reales de tu condominio.';

/**
 * Estima los gastos comunes mensuales de un departamento o casa
 * en condominio.
 *
 * Bug histórico: el archivo se llamaba "calculadora" pero es un
 * ESTIMADOR (los gastos reales se calculan por prorrateo según el
 * reglamento de copropiedad). Se actualiza la referencia legal a la
 * Ley 21.442 (2024) que reemplazó a la Ley 19.537.
 *
 * Base legal: Ley 21.442 (Nueva Ley de Copropiedad Inmobiliaria).
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

  const superficie = Math.max(0, superficieM2);
  const valorPorM2 = Math.max(0, valorM2);
  const numEstacionamientos = incluyeEstacionamiento
    ? Math.max(0, Math.round(estacionamientos))
    : 0;

  const gastoBaseM2 = Math.round(superficie * valorPorM2);
  const gastoEstacionamiento = Math.round(numEstacionamientos * COSTO_ESTACIONAMIENTO);

  let gastoExtras = 0;
  if (tienePiscina) gastoExtras += COSTOS_EXTRAS.piscina;
  if (tieneGimnasio) gastoExtras += COSTOS_EXTRAS.gimnasio;
  if (tieneConserje) gastoExtras += COSTOS_EXTRAS.conserje;

  const totalMensual = gastoBaseM2 + gastoEstacionamiento + gastoExtras;
  const totalAnual = totalMensual * 12;

  return {
    gastoBaseM2,
    gastoEstacionamiento,
    gastoExtras,
    totalMensual,
    totalAnual,
    aviso: AVISO_LEGAL,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function gastosComunesToResults(result: GastosComunesResult): CalculatorResult[] {
  return [
    { label: 'Total Mensual (estimado)', value: result.totalMensual, format: 'CLP', highlight: true },
    { label: 'Total Anual (estimado)', value: result.totalAnual, format: 'CLP' },
    { label: 'Gasto Base (m²)', value: result.gastoBaseM2, format: 'CLP' },
    { label: 'Gasto Estacionamiento', value: result.gastoEstacionamiento, format: 'CLP' },
    { label: 'Gasto Extras', value: result.gastoExtras, format: 'CLP' },
  ];
}
