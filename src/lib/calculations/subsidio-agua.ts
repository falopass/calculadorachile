// ============================================
// Cálculo de Subsidio de Agua Potable Chile 2026
// Beneficio del Estado para el pago del servicio de agua potable
// ============================================

import { SUBSIDIO_AGUA_POTABLE } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioAguaInput {
  /** Consumo del período en m³. */
  consumoM3: number;
  /** Personas en el hogar (informativo, no altera el cálculo). */
  numeroPersonas: number;
  /**
   * Tramo asignado por el Registro Social de Hogares:
   *   - tramo1: 60% sobre el valor de la cuenta hasta 15 m³
   *   - tramo2: 40% sobre el valor de la cuenta hasta 15 m³
   *   - tramo3: 25% sobre el valor de la cuenta hasta 15 m³
   */
  tramo: 'tramo1' | 'tramo2' | 'tramo3';
  /** Tarifa total de la cuenta sin subsidio (CLP). Si se entrega, se usa para el cálculo real. */
  montoCuenta?: number;
  /** Tarifa por m³ (CLP/m³) si se desea estimar la cuenta a partir del consumo. */
  tarifaPorM3?: number;
}

export interface SubsidioAguaResult {
  consumoM3: number;
  consumoSubsidiado: number;
  subsidioPct: number;
  montoSubsidio: number;
  montoPagar: number;
  montoSinSubsidio: number;
}

/** Subsidio cubre hasta este número de m³ (DS 195/MOP). */
const TOPE_M3 = SUBSIDIO_AGUA_POTABLE.tope_m3;

const SUBSIDIO_POR_TRAMO: Record<'tramo1' | 'tramo2' | 'tramo3', number> = {
  tramo1: SUBSIDIO_AGUA_POTABLE.tramos.tramo1 / 100,
  tramo2: SUBSIDIO_AGUA_POTABLE.tramos.tramo2 / 100,
  tramo3: SUBSIDIO_AGUA_POTABLE.tramos.tramo3 / 100,
};

/**
 * Calcula el subsidio de agua potable.
 *
 * Bug histórico: la versión anterior multiplicaba `consumo × $14.000 ×
 * porcentaje`, lo que asume que cada m³ cuesta exactamente $14.000 (algo
 * que NO es así — la tarifa la fija cada sanitaria). El subsidio real
 * cubre un porcentaje del valor de la cuenta hasta 15 m³.
 *
 * Fix: aceptar el monto real de la cuenta (preferido) o estimar con una
 * tarifa por m³. El subsidio se calcula como:
 *   subsidio = (cuenta × min(consumo, 15) / consumo) × %tramo
 *
 * Base legal: Ley 18.778, DS 195/MOP.
 */
export function calculateSubsidioAgua(input: SubsidioAguaInput): SubsidioAguaResult {
  const { consumoM3, tramo, montoCuenta, tarifaPorM3 } = input;

  const consumo = Math.max(0, consumoM3);
  const subsidioPct = (SUBSIDIO_POR_TRAMO[tramo] ?? 0) * 100;

  // Tarifa de referencia: si no entrega cuenta ni tarifa, se usa el
  // promedio nacional aproximado del MOP (definido en constants.ts).
  const tarifaRef =
    tarifaPorM3 && tarifaPorM3 > 0
      ? tarifaPorM3
      : SUBSIDIO_AGUA_POTABLE.tarifa_promedio_clp_m3;

  // Monto real (o estimado) de la cuenta sin subsidio
  const montoSinSubsidio =
    montoCuenta && montoCuenta > 0
      ? Math.round(montoCuenta)
      : Math.round(consumo * tarifaRef);

  // Consumo subsidiado: hasta 15 m³ (resto se paga sin subsidio).
  const consumoSubsidiado = Math.min(consumo, TOPE_M3);

  // Proporción de la cuenta que corresponde al consumo subsidiado.
  const proporcionSubsidiada = consumo > 0 ? consumoSubsidiado / consumo : 0;
  const cuentaSobreSubsidio = montoSinSubsidio * proporcionSubsidiada;

  const montoSubsidio = Math.round(cuentaSobreSubsidio * (subsidioPct / 100));
  const montoPagar = Math.max(0, montoSinSubsidio - montoSubsidio);

  // SUBSIDIO_AGUA_POTABLE ya proporciona el tope.
  // No se necesita el legacy SUBSIDIO_AGUA.

  return {
    consumoM3: consumo,
    consumoSubsidiado,
    subsidioPct,
    montoSubsidio,
    montoPagar,
    montoSinSubsidio,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioAguaToResults(result: SubsidioAguaResult): CalculatorResult[] {
  return [
    { label: 'Monto a Pagar', value: result.montoPagar, format: 'CLP', highlight: true },
    { label: 'Monto Subsidio', value: result.montoSubsidio, format: 'CLP' },
    { label: 'Monto Sin Subsidio', value: result.montoSinSubsidio, format: 'CLP' },
    { label: 'Subsidio', value: result.subsidioPct, format: 'percentage' },
    { label: `Consumo Subsidiado (hasta ${TOPE_M3} m³)`, value: result.consumoSubsidiado, format: 'number' },
    { label: 'Consumo m³', value: result.consumoM3, format: 'number' },
  ];
}
