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
  /** Tasación fiscal SII (no precio de compra). */
  valorVehiculo: number;
  tipoVehiculo: 'automovil' | 'motocicleta' | 'carga' | 'bus' | 'taxi' | 'camion';
  antiguedadVehiculo: number;
  esZonaCarga: boolean;
  esPrimeraVez: boolean;
  /** Meses restantes del año si es primera inscripción (1-12). */
  mesesRestantes?: number;
  /** UTM opcional (live). */
  valorUTM?: number;
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
  cuota1: number;
  cuota2: number;
  valorUTM: number;
  tasacionUTM: number;
  tasaEfectiva: number;
}

const TRAMOS_PERMISO_UTM: Array<{ hasta: number; tasa: number }> =
  PERMISO_CIRCULACION.tramos_utm.map((t) => ({
    hasta: t.hasta_utm,
    tasa: t.tasa / 100,
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
 * Estimación con tabla SII en UTM (progresiva).
 * Confirmar siempre en municipio / TGR: no es liquidación oficial.
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
    valorUTM: valorUTMInput,
  } = input;

  void esZonaCarga;

  const valorUTM = valorUTMInput && valorUTMInput > 0 ? valorUTMInput : UTM.valor;
  const tasacion = Math.max(0, valorVehiculo);
  const tasacionUTM = valorUTM > 0 ? tasacion / valorUTM : 0;

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

  const factorTipo = PERMISO_CIRCULACION_DESCUENTOS_VEHICULO[tipoVehiculo] ?? 1.0;
  montoBase *= factorTipo;

  let factorAntiguedad = 0;
  if (antiguedadVehiculo >= PERMISO_CIRCULACION.descuento_antiguedad_anios) {
    factorAntiguedad = PERMISO_CIRCULACION.descuento_antiguedad_porcentaje / 100;
  }
  const descuentoAntiguedad = montoBase * factorAntiguedad;

  let prorrateoPrimeraVez = 0;
  let permisoTotal = montoBase - descuentoAntiguedad;
  const meses = Math.min(12, Math.max(1, Math.round(mesesRestantes)));
  if (esPrimeraVez && meses < 12) {
    const factorProrrateo = meses / 12;
    const permisoProrrateado = permisoTotal * factorProrrateo;
    prorrateoPrimeraVez = permisoTotal - permisoProrrateado;
    permisoTotal = permisoProrrateado;
  }

  const tasaEfectiva = tasacion > 0 ? (permisoTotal / tasacion) * 100 : 0;
  const cuota1 = Math.round(permisoTotal / 2);
  const cuota2 = Math.round(permisoTotal) - cuota1;

  return {
    valorVehiculo: Math.round(tasacion),
    tipoVehiculo: LABELS_TIPO[tipoVehiculo] || tipoVehiculo,
    antiguedadVehiculo,
    factorAntiguedad,
    montoBase: Math.round(montoBase),
    descuentoAntiguedad: Math.round(descuentoAntiguedad),
    prorrateoPrimeraVez: Math.round(prorrateoPrimeraVez),
    permisoTotal: Math.round(permisoTotal),
    cuota1,
    cuota2,
    valorUTM,
    tasacionUTM: Math.round(tasacionUTM * 100) / 100,
    tasaEfectiva: Math.round(tasaEfectiva * 100) / 100,
  };
}

export function permisoCirculacionToResults(
  result: PermisoCirculacionResult,
): CalculatorResult[] {
  return [
    {
      label: 'Permiso total estimado',
      value: result.permisoTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: '1.ª cuota (50%, tip. mar–abr)',
      value: result.cuota1,
      format: 'CLP',
      highlight: true,
    },
    {
      label: '2.ª cuota (50%, tip. ago)',
      value: result.cuota2,
      format: 'CLP',
    },
    {
      label: 'Monto base (tabla SII UTM)',
      value: result.montoBase,
      format: 'CLP',
    },
    {
      label: 'Descuento antigüedad (≥20 años)',
      value: result.descuentoAntiguedad,
      format: 'CLP',
    },
    {
      label: 'Ajuste prorrateo 1.ª inscripción',
      value: result.prorrateoPrimeraVez,
      format: 'CLP',
    },
    {
      label: 'Tasación fiscal (SII)',
      value: result.valorVehiculo,
      format: 'CLP',
    },
    {
      label: 'Tasación en UTM',
      value: result.tasacionUTM,
      format: 'UTM',
    },
    {
      label: 'Antigüedad (años)',
      value: result.antiguedadVehiculo,
      format: 'number',
    },
    {
      label: 'Tasa efectiva sobre tasación',
      value: result.tasaEfectiva,
      format: 'percentage',
    },
  ];
}
