// ============================================
// Cálculo de Permiso de Circulación Chile 2026
// ============================================

import {
  UTM,
  PERMISO_CIRCULACION,
  PERMISO_CIRCULACION_DESCUENTOS_VEHICULO,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PermisoCirculacionInput {
  /** Tasación fiscal SII del vehículo (no el valor de compra). */
  valorVehiculo: number;
  tipoVehiculo: 'automovil' | 'motocicleta' | 'carga' | 'bus' | 'taxi' | 'camion';
  antiguedadVehiculo: number;
  esZonaCarga: boolean;
  /**
   * Si el permiso se compra por primera vez en mitad del año, se prorratea
   * según meses restantes (no es un recargo).
   */
  esPrimeraVez: boolean;
  /** Meses restantes del año si es primera inscripción (1-12). */
  mesesRestantes?: number;
}

export interface PermisoCirculacionResult {
  valorVehiculo: number;
  tipoVehiculo: string;
  antiguedadVehiculo: number;
  factorAntiguedad: number;
  montoBase: number;
  descuentoAntiguedad: number;
  prorrateoPrimeraVez: number;
  permisoTotal: number;
  valorUTM: number;
  tasaEfectiva: number;
}

/**
 * Tabla progresiva del permiso de circulación según tasación fiscal,
 * expresada en UTM. Definida en `PERMISO_CIRCULACION.tramos_utm` en
 * constants.ts.
 *
 * Base legal: Ley 17.235, DFL 1 (Tránsito), Tabla anual SII.
 */
const TRAMOS_PERMISO_UTM: Array<{ hasta: number; tasa: number }> =
  PERMISO_CIRCULACION.tramos_utm.map((t) => ({
    hasta: t.hasta_utm,
    tasa: t.tasa / 100, // convertir a decimal para cálculo
  }));

const LABELS_TIPO: Record<string, string> = {
  automovil: 'Automóvil',
  motocicleta: 'Motocicleta',
  carga: 'Carga',
  bus: 'Bus',
  taxi: 'Taxi',
  camion: 'Camión',
};

/**
 * Calcula el permiso de circulación.
 *
 * Bug histórico: la versión anterior usaba "factores fijos por tipo
 * de vehículo" inventados (auto 2.5 UTM por millón, moto 0.5, etc.).
 * Esos factores no existen en la ley.
 *
 * Fix: aplicar la tabla SII en escalones progresivos sobre la tasación
 * fiscal expresada en UTM. Ajustes:
 *   - Motos / taxis: 50% de la tarifa.
 *   - Vehículos > 20 años: 50% de descuento (aproximación a la
 *     depreciación de la tabla SII).
 *   - "Primera vez" prorratea por meses restantes en vez de recargar.
 *
 * Base legal: Ley 17.235 / DFL 1 (Tránsito), Tabla anual SII.
 */
export function calculatePermisoCirculacion(
  input: PermisoCirculacionInput,
): PermisoCirculacionResult {
  const {
    valorVehiculo,
    tipoVehiculo,
    antiguedadVehiculo,
    esZonaCarga,
    esPrimeraVez,
    mesesRestantes = 12,
  } = input;

  void esZonaCarga;

  const valorUTM = UTM.valor;
  const tasacion = Math.max(0, valorVehiculo);

  // Tasación en UTM
  const tasacionUTM = valorUTM > 0 ? tasacion / valorUTM : 0;

  // Calcular permiso aplicando la tabla por escalones (impuesto progresivo).
  let permisoUTM = 0;
  let restante = tasacionUTM;
  let limiteAnterior = 0;
  for (const tramo of TRAMOS_PERMISO_UTM) {
    const ancho = Math.min(restante, tramo.hasta - limiteAnterior);
    if (ancho <= 0) break;
    permisoUTM += ancho * tramo.tasa;
    restante -= ancho;
    limiteAnterior = tramo.hasta;
  }

  let montoBase = permisoUTM * valorUTM;

  // Factor por tipo de vehículo: motos y taxis pagan 50% (definido
  // en `PERMISO_CIRCULACION_DESCUENTOS_VEHICULO`).
  const factorTipo =
    PERMISO_CIRCULACION_DESCUENTOS_VEHICULO[tipoVehiculo] ?? 1.0;
  montoBase *= factorTipo;

  // Descuento por antigüedad (vehículos > 20 años: 50%).
  let factorAntiguedad = 0;
  if (antiguedadVehiculo >= PERMISO_CIRCULACION.descuento_antiguedad_anios) {
    factorAntiguedad = PERMISO_CIRCULACION.descuento_antiguedad_porcentaje / 100;
  }
  const descuentoAntiguedad = montoBase * factorAntiguedad;

  // Prorrateo si es primera inscripción del año.
  let prorrateoPrimeraVez = 0;
  let permisoTotal = montoBase - descuentoAntiguedad;
  if (esPrimeraVez && mesesRestantes > 0 && mesesRestantes < 12) {
    const factorProrrateo = mesesRestantes / 12;
    const permisoProrrateado = permisoTotal * factorProrrateo;
    prorrateoPrimeraVez = permisoTotal - permisoProrrateado;
    permisoTotal = permisoProrrateado;
  }

  const tasaEfectiva = tasacion > 0 ? (permisoTotal / tasacion) * 100 : 0;

  return {
    valorVehiculo: Math.round(tasacion),
    tipoVehiculo: LABELS_TIPO[tipoVehiculo] || tipoVehiculo,
    antiguedadVehiculo,
    factorAntiguedad,
    montoBase: Math.round(montoBase),
    descuentoAntiguedad: Math.round(descuentoAntiguedad),
    prorrateoPrimeraVez: Math.round(prorrateoPrimeraVez),
    permisoTotal: Math.round(permisoTotal),
    valorUTM,
    tasaEfectiva: Math.round(tasaEfectiva * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function permisoCirculacionToResults(
  result: PermisoCirculacionResult,
): CalculatorResult[] {
  return [
    {
      label: 'Permiso Total',
      value: result.permisoTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto Base (tabla SII)',
      value: result.montoBase,
      format: 'CLP',
    },
    {
      label: 'Descuento Antigüedad',
      value: result.descuentoAntiguedad,
      format: 'CLP',
    },
    {
      label: 'Prorrateo Primera Vez',
      value: result.prorrateoPrimeraVez,
      format: 'CLP',
    },
    {
      label: 'Tasación Fiscal',
      value: result.valorVehiculo,
      format: 'CLP',
    },
    {
      label: 'Antigüedad',
      value: result.antiguedadVehiculo,
      format: 'number',
    },
    {
      label: 'Tasa Efectiva',
      value: result.tasaEfectiva,
      format: 'percentage',
    },
  ];
}
