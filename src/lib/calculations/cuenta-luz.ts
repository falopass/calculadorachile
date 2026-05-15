// ============================================
// Cálculo de Cuenta de Luz - Tarifa BT1 Chile 2026
// ============================================

import {
  IVA,
  TARIFA_BT1,
  TARIFA_BT1_RECARGOS,
  TARIFA_BT1_ZONA,
  TARIFA_BT1_CARGO_FIJO,
} from '@/lib/values/constants';
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
  /** Tarifa promedio por kWh efectiva (cargo energía / consumo). */
  tarifaPromedioKWH: number;
  cargoFijo: number;
  cargoEnergia: number;
  subtotal: number;
  iva: number;
  total: number;
  desgloseTramos: Array<{
    desdeKWH: number;
    hastaKWH: number;
    consumoKWH: number;
    tarifa: number;
    subtotal: number;
  }>;
}

/**
 * Recargo por tipo de tarifa sobre la BT1 residencial. Definido en
 * `TARIFA_BT1_RECARGOS` en constants.ts.
 */
const RECARGO_TARIFA: Record<TipoTarifa, number> = TARIFA_BT1_RECARGOS;

/**
 * Ajuste por zona geográfica respecto a la zona central. Definido en
 * `TARIFA_BT1_ZONA` en constants.ts.
 */
const AJUSTE_ZONA: Record<Zona, number> = TARIFA_BT1_ZONA;

/**
 * Calcula la cuenta de luz BT1 con tramos progresivos por consumo.
 *
 * Bug histórico: la versión anterior aplicaba tarifa plana por zona
 * (135/145/150) ignorando los tramos por consumo de TARIFA_BT1
 * (160/180/220 según consumo). El cliente con alto consumo terminaba
 * subestimando su cuenta hasta 30%.
 *
 * Fix: aplica los tramos progresivos definidos en `TARIFA_BT1`,
 * ajustados por tipo de tarifa y zona geográfica.
 *
 * Base legal: Ley 21.667 (descongelamiento tarifas), Decreto Tarifario
 * CNE, Norma Técnica SEC.
 */
export function calculateCuentaLuz(input: CuentaLuzInput): CuentaLuzResult {
  const { consumoKWH, tipoTarifa = 'bt1_residencial', zona = 'central' } = input;

  const consumo = Math.max(0, consumoKWH);
  const recargoTipo = RECARGO_TARIFA[tipoTarifa];
  const ajusteZona = AJUSTE_ZONA[zona];
  const factorTotal = recargoTipo * ajusteZona;

  // Aplicar tramos progresivos
  let cargoEnergia = 0;
  let consumoRestante = consumo;
  let limiteAnterior = 0;
  const desgloseTramos: CuentaLuzResult['desgloseTramos'] = [];

  for (const tramo of TARIFA_BT1.tramosConsumo) {
    if (consumoRestante <= 0) break;

    const anchoTramo = tramo.maximoKWh - limiteAnterior;
    const consumoEnTramo = Math.min(consumoRestante, anchoTramo);
    const tarifaAjustada = tramo.precioCLPKWh * factorTotal;
    const subtotalTramo = consumoEnTramo * tarifaAjustada;

    cargoEnergia += subtotalTramo;
    consumoRestante -= consumoEnTramo;

    desgloseTramos.push({
      desdeKWH: limiteAnterior,
      hastaKWH: tramo.maximoKWh === Infinity ? limiteAnterior + consumoEnTramo : tramo.maximoKWh,
      consumoKWH: consumoEnTramo,
      tarifa: Math.round(tarifaAjustada),
      subtotal: Math.round(subtotalTramo),
    });

    limiteAnterior = tramo.maximoKWh;
  }

  // Cargo fijo según tipo (definido en constants.ts).
  const cargoFijo = TARIFA_BT1_CARGO_FIJO[tipoTarifa];

  const subtotal = cargoFijo + cargoEnergia;
  const iva = subtotal * (IVA.tasa / 100);
  const total = subtotal + iva;

  const tarifaPromedioKWH = consumo > 0 ? cargoEnergia / consumo : 0;

  return {
    consumoKWH: consumo,
    tipoTarifa,
    zona,
    tarifaPromedioKWH: Math.round(tarifaPromedioKWH),
    cargoFijo,
    cargoEnergia: Math.round(cargoEnergia),
    subtotal: Math.round(subtotal),
    iva: Math.round(iva),
    total: Math.round(total),
    desgloseTramos,
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
      label: 'Tarifa Promedio por kWh',
      value: result.tarifaPromedioKWH,
      format: 'CLP',
    },
    {
      label: 'Consumo (kWh)',
      value: result.consumoKWH,
      format: 'number',
    },
  ];
}
