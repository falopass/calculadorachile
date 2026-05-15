// ============================================
// Cálculo de Cuenta de Luz - Tarifa BT1 Chile 2026
// ============================================

import { IVA, TARIFA_BT1 } from '@/lib/values/constants';
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
 * Recargo por tipo de tarifa sobre la BT1 residencial. Aproximación
 * razonable: comercial paga +20% y baja tensión industrial +35%.
 * Las tarifas reales BT2/BT3 varían por distribuidora y CNE las
 * publica trimestralmente.
 */
const RECARGO_TARIFA: Record<TipoTarifa, number> = {
  bt1_residencial: 1.0,
  bt1_comercial: 1.2,
  bt1_industrial: 1.35,
};

/**
 * Ajuste por zona geográfica respecto a la zona central.
 * Las tarifas reales varían por distribuidora; valores aproximados
 * para 2026 según decretos tarifarios CNE/SEC.
 */
const AJUSTE_ZONA: Record<Zona, number> = {
  norte: 1.05,
  central: 1.0,
  sur: 1.1,
};

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

  // Cargo fijo según tipo (residencial usa el de constants).
  const cargoFijoBase = TARIFA_BT1.cargoFijoCLP;
  const cargoFijo = Math.round(
    cargoFijoBase *
      (tipoTarifa === 'bt1_comercial' ? 1.4 : tipoTarifa === 'bt1_industrial' ? 1.8 : 1),
  );

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
