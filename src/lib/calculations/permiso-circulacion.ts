// ============================================
// Permiso de circulación de vehículos livianos 2026
// ============================================

import { PERMISO_CIRCULACION } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PermisoCirculacionInput {
  /** Tasación fiscal SII 2026, no precio comercial. */
  valorVehiculo: number;
  /** Solo si el modelo figura en la nómina SII con exención de 75%. */
  electricoHibridoElegible: boolean;
}

export interface PermisoCirculacionResult {
  tasacionFiscal: number;
  tasacionUTM: number;
  montoEscala: number;
  montoAntesExencion: number;
  exencionElectrico: number;
  permisoTotalEstimado: number;
  cuotaBase1: number;
  cuotaBase2: number;
  utmEneroCLP: number;
  usaPermisoMinimo: boolean;
}

const TRAMOS = PERMISO_CIRCULACION.tramos_utm.map((tramo) => ({
  hasta: tramo.hasta_utm,
  tasa: tramo.tasa / 100,
}));

/**
 * Aplica la escala progresiva y acumulativa publicada por el SII para
 * vehículos livianos. Usa la UTM de enero de 2026 ($69.751), no la UTM del
 * día. El resultado no sustituye la consulta por código SII o la liquidación
 * municipal, especialmente para motos, vehículos pesados o casos especiales.
 */
export function calculatePermisoCirculacion(
  input: PermisoCirculacionInput,
): PermisoCirculacionResult {
  const tasacionFiscal = Math.max(0, Math.round(input.valorVehiculo));
  const utmEneroCLP = PERMISO_CIRCULACION.utmEneroCLP;
  const tasacionUTM = tasacionFiscal / utmEneroCLP;

  let montoEscalaUTM = 0;
  let restante = tasacionUTM;
  let limiteAnterior = 0;
  for (const tramo of TRAMOS) {
    const baseTramo = Math.min(restante, tramo.hasta - limiteAnterior);
    if (baseTramo <= 0) break;
    montoEscalaUTM += baseTramo * tramo.tasa;
    restante -= baseTramo;
    limiteAnterior = tramo.hasta;
  }

  const montoEscala = Math.round(montoEscalaUTM * utmEneroCLP);
  const usaPermisoMinimo =
    tasacionFiscal > 0 &&
    tasacionFiscal <= PERMISO_CIRCULACION.tasacionHastaPermisoMinimoCLP;
  const montoAntesExencion =
    tasacionFiscal === 0
      ? 0
      : usaPermisoMinimo
        ? PERMISO_CIRCULACION.permisoMinimoCLP
        : montoEscala;
  const exencionElectrico = input.electricoHibridoElegible
    ? Math.round(montoAntesExencion * (PERMISO_CIRCULACION.exencionElectricoPct / 100))
    : 0;
  const permisoTotalEstimado = montoAntesExencion - exencionElectrico;
  const cuotaBase1 = Math.round(permisoTotalEstimado / 2);

  return {
    tasacionFiscal,
    tasacionUTM: Math.round(tasacionUTM * 100) / 100,
    montoEscala,
    montoAntesExencion,
    exencionElectrico,
    permisoTotalEstimado,
    cuotaBase1,
    cuotaBase2: permisoTotalEstimado - cuotaBase1,
    utmEneroCLP,
    usaPermisoMinimo,
  };
}

export function permisoCirculacionToResults(
  result: PermisoCirculacionResult,
): CalculatorResult[] {
  return [
    {
      label: 'Permiso anual estimado',
      value: result.permisoTotalEstimado,
      format: 'CLP',
      highlight: true,
    },
    { label: 'Primera cuota base (50%)', value: result.cuotaBase1, format: 'CLP' },
    {
      label: 'Segunda cuota base antes de reajuste',
      value: result.cuotaBase2,
      format: 'CLP',
    },
    { label: 'Monto antes de exención', value: result.montoAntesExencion, format: 'CLP' },
    { label: 'Exención vehículo elegible', value: result.exencionElectrico, format: 'CLP' },
    { label: 'Tasación fiscal SII', value: result.tasacionFiscal, format: 'CLP' },
    { label: 'UTM enero 2026', value: result.utmEneroCLP, format: 'CLP' },
  ];
}
