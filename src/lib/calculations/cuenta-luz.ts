// ============================================
// Cálculo de Cuenta de Luz - Tarifa BT1 Chile 2026
// ============================================

import { IVA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoTarifa = 'bt1_residencial' | 'bt1_comercial' | 'bt1_industrial';
export type Zona = 'norte' | 'central' | 'sur';

export interface CuentaLuzInput {
  consumoKWH: number;
  tipoTarifa?: TipoTarifa;
  zona?: Zona;
}

export interface CuentaLuzResult {
  consumoKWH: number;
  tipoTarifa: TipoTarifa;
  zona: Zona;
  tarifaKWH: number;
  cargoFijo: number;
  cargoEnergia: number;
  subtotal: number;
  iva: number;
  total: number;
}

/**
 * Tarifas BT1 por zona ($/kWh)
 *
 * Las tarifas corresponden a valores aproximados 2026 para clientes
 * regulados en BT1 (baja tensión, hasta 2.000 kWh mensuales).
 * Varían según zona geográfica y distribuidora.
 *
 * Base legal: Tarifas reguladas por CNE y fijadas por resolución
 *             de la Superintendencia de Electricidad y Combustible (SEC).
 */
const TARIFAS_KWH: Record<Zona, number> = {
  norte: 150,
  central: 135,
  sur: 145,
} as const;

/**
 * Recargo por tipo de tarifa sobre la tarifa residencial
 */
const RECARGO_TARIFA: Record<TipoTarifa, number> = {
  bt1_residencial: 1.0,   // Sin recargo
  bt1_comercial: 1.2,     // +20%
  bt1_industrial: 1.35,   // +35%
} as const;

/**
 * Cargo fijo mensual según tipo de tarifa
 */
const CARGO_FIJO: Record<TipoTarifa, number> = {
  bt1_residencial: 800,
  bt1_comercial: 1000,
  bt1_industrial: 1200,
} as const;

/**
 * Calcula la cuenta de luz (electricidad) tarifa BT1
 *
 * Incluye cargo fijo mensual, cargo por energía consumida (kWh),
 * e IVA (19%). Las tarifas varían según zona y tipo de cliente.
 *
 * @param input - Consumo en kWh, tipo de tarifa y zona
 * @returns Desglose completo de la cuenta de electricidad
 */
export function calculateCuentaLuz(input: CuentaLuzInput): CuentaLuzResult {
  const { consumoKWH, tipoTarifa = 'bt1_residencial', zona = 'central' } = input;

  // Validar rangos
  const consumoValido = Math.max(0, consumoKWH);

  // Tarifa por kWh según zona y tipo
  const tarifaBase = TARIFAS_KWH[zona];
  const recargo = RECARGO_TARIFA[tipoTarifa];
  const tarifaKWH = tarifaBase * recargo;

  // Cargo fijo mensual
  const cargoFijo = CARGO_FIJO[tipoTarifa];

  // Cargo por energía
  const cargoEnergia = tarifaKWH * consumoValido;

  // Subtotal antes de IVA
  const subtotal = cargoFijo + cargoEnergia;

  // IVA (19%)
  const iva = subtotal * (IVA.tasa / 100);

  // Total
  const total = subtotal + iva;

  return {
    consumoKWH: consumoValido,
    tipoTarifa,
    zona,
    tarifaKWH: Math.round(tarifaKWH * 100) / 100,
    cargoFijo,
    cargoEnergia: Math.round(cargoEnergia),
    subtotal: Math.round(subtotal),
    iva: Math.round(iva),
    total: Math.round(total),
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function cuentaLuzToResults(result: CuentaLuzResult): CalculatorResult[] {
  return [
    {
      label: 'Total Cuenta',
      value: result.total,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Subtotal (sin IVA)',
      value: result.subtotal,
      format: 'CLP',
    },
    {
      label: 'IVA (19%)',
      value: result.iva,
      format: 'CLP',
    },
    {
      label: 'Cargo por Energía',
      value: result.cargoEnergia,
      format: 'CLP',
    },
    {
      label: 'Cargo Fijo Mensual',
      value: result.cargoFijo,
      format: 'CLP',
    },
    {
      label: 'Tarifa por kWh',
      value: result.tarifaKWH,
      format: 'CLP',
    },
    {
      label: 'Consumo (kWh)',
      value: result.consumoKWH,
      format: 'number',
    },
  ];
}
