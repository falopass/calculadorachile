// ============================================
// Cálculo de Subsidio de Agua Potable Chile 2026
// Beneficio del Estado para el pago del servicio de agua potable
// ============================================

import { SUBSIDIO_AGUA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioAguaInput {
  consumoM3: number;
  numeroPersonas: number;
  tramo: 'tramo1' | 'tramo2';
}

export interface SubsidioAguaResult {
  consumoM3: number;
  consumoSubsidiado: number;
  subsidioPct: number;
  montoSubsidio: number;
  montoPagar: number;
  montoSinSubsidio: number;
}

/**
 * Calcula el subsidio de agua potable según consumo y tramo.
 * El subsidio se aplica según los tramos definidos en el Registro Social de Hogares.
 * D.S. N° 235 del MOP, Ley N° 21.064.
 */
export function calculateSubsidioAgua(input: SubsidioAguaInput): SubsidioAguaResult {
  const {
    consumoM3,
    numeroPersonas,
    tramo,
  } = input;

  // Validar rangos
  const consumo = Math.max(0, consumoM3);
  const personas = Math.max(1, Math.round(numeroPersonas));

  // Determinar porcentaje de subsidio según tramo
  let subsidioPct = 0;
  if (tramo === 'tramo1') {
    subsidioPct = SUBSIDIO_AGUA.tramos[0].subsidio * 100; // 60%
  } else if (tramo === 'tramo2') {
    subsidioPct = SUBSIDIO_AGUA.tramos[1].subsidio * 100; // 40%
  }

  // Consumo subsidiado: se aplica subsidio según los tramos de consumo
  let consumoSubsidiado = 0;
  if (consumo <= SUBSIDIO_AGUA.tramos[0].consumoMaximoM3) {
    // Todo el consumo está en el primer tramo
    consumoSubsidiado = consumo;
  } else if (consumo <= SUBSIDIO_AGUA.tramos[1].consumoMaximoM3) {
    // Parte del consumo está en el primer tramo y parte en el segundo
    consumoSubsidiado = SUBSIDIO_AGUA.tramos[0].consumoMaximoM3;
  } else {
    // Todo el consumo superior al segundo tramo no recibe subsidio
    consumoSubsidiado = SUBSIDIO_AGUA.tramos[1].consumoMaximoM3;
  }

  // Calcular monto del subsidio
  const montoSubsidio = Math.round(consumoSubsidiado * SUBSIDIO_AGUA.montoMaximoCLP * (subsidioPct / 100));

  // Calcular monto sin subsidio (monto total)
  const montoSinSubsidio = Math.round(consumo * SUBSIDIO_AGUA.montoMaximoCLP);

  // Calcular monto a pagar
  const montoPagar = Math.max(0, montoSinSubsidio - montoSubsidio);

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
    { label: 'Consumo Subsidiado', value: result.consumoSubsidiado, format: 'number' },
    { label: 'Consumo m³', value: result.consumoM3, format: 'number' },
  ];
}
