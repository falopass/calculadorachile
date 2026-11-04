// ============================================
// Simulador de Depósito a Plazo (DAP) Chile
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type MonedaDAP = 'CLP' | 'UF';
export type TipoTasaDAP = 'mensual' | 'anual';

export interface DepositoAPlazoInput {
  /** Monto del depósito en la moneda indicada. */
  monto: number;
  /** Moneda del depósito: pesos o UF. */
  moneda: MonedaDAP;
  /**
   * Tasa que ofrece el banco, en porcentaje. Con `tipoTasa: 'mensual'`
   * corresponde a la tasa del período base de 30 días; con `'anual'`
   * corresponde a la tasa nominal anual (base 360 días).
   */
  tasaPeriodo: number;
  /** Base de la tasa ingresada. */
  tipoTasa: TipoTasaDAP;
  /** Plazo de cada período del depósito en días (mínimo 7). */
  plazoDias: number;
  /**
   * Renovaciones automáticas del depósito. 0 = DAP fijo sin renovar;
   * cada renovación capitaliza los intereses del período anterior.
   */
  renovaciones?: number;
  /** UF en vivo (UI). Default: snapshot `UF.valor`. */
  valorUF?: number;
}

export interface DepositoAPlazoResult {
  monto: number;
  moneda: MonedaDAP;
  tasaPeriodo: number;
  tipoTasa: TipoTasaDAP;
  plazoDias: number;
  renovaciones: number;
  /** Períodos totales capitalizados (1 + renovaciones). */
  periodos: number;
  /** Días totales considerando las renovaciones. */
  plazoTotalDias: number;
  /** Tasa efectiva de cada período de `plazoDias` días (decimal). */
  tasaEfectivaPeriodo: number;
  /** Tasa efectiva total del plazo completo (%). */
  tasaEfectivaTotalPct: number;
  /** Valor UF usado para las conversiones. */
  valorUF: number;
  montoInicialCLP: number;
  interesesGanadosCLP: number;
  montoFinalCLP: number;
  montoInicialUF: number;
  interesesGanadosUF: number;
  montoFinalUF: number;
}

/** Plazo mínimo de un depósito a plazo según la oferta habitual de los bancos. */
const PLAZO_MINIMO_DIAS = 7;

/**
 * Simula un depósito a plazo a interés simple por período, prorrateando
 * la tasa según su base:
 *
 *   mensual (base 30 días):  i = (tasa / 100) × (plazoDias / 30)
 *   anual   (base 360 días): i = (tasa / 100) × (plazoDias / 360)
 *
 * Con k = 1 + renovaciones períodos iguales, el monto final es
 * monto × (1 + i)^k: cada renovación reinvierte capital + intereses.
 *
 * Es una simulación matemática con la tasa que ingresa el usuario según
 * la oferta de su banco: no incluye impuestos, comisiones ni diferencias
 * de días efectivos entre meses.
 */
export function calculateDepositoAPlazo(
  input: DepositoAPlazoInput,
): DepositoAPlazoResult {
  const { monto, moneda, tasaPeriodo, tipoTasa, plazoDias } = input;
  const renovaciones = input.renovaciones ?? 0;
  const valorUF = input.valorUF ?? UF.valor;

  if (!Number.isFinite(monto) || monto <= 0) {
    throw new Error('El monto del depósito debe ser mayor a 0.');
  }
  if (moneda !== 'CLP' && moneda !== 'UF') {
    throw new Error('La moneda del depósito debe ser CLP o UF.');
  }
  if (!Number.isFinite(tasaPeriodo) || tasaPeriodo < 0 || tasaPeriodo > 100) {
    throw new Error('La tasa del período debe estar entre 0% y 100%.');
  }
  if (tipoTasa !== 'mensual' && tipoTasa !== 'anual') {
    throw new Error('El tipo de tasa debe ser mensual o anual.');
  }
  if (!Number.isFinite(plazoDias) || plazoDias < PLAZO_MINIMO_DIAS) {
    throw new Error('El plazo mínimo de un depósito a plazo es de 7 días.');
  }
  if (!Number.isInteger(renovaciones) || renovaciones < 0) {
    throw new Error(
      'Las renovaciones deben ser un número entero mayor o igual a 0.',
    );
  }
  if (!Number.isFinite(valorUF) || valorUF <= 0) {
    throw new Error('Valor de UF inválido. Actualiza la página e intenta de nuevo.');
  }

  const tasaEfectivaPeriodo =
    tipoTasa === 'mensual'
      ? (tasaPeriodo / 100) * (plazoDias / 30)
      : (tasaPeriodo / 100) * (plazoDias / 360);

  const periodos = 1 + renovaciones;
  const factor = Math.pow(1 + tasaEfectivaPeriodo, periodos);
  const tasaEfectivaTotalPct = (factor - 1) * 100;

  const montoInicialCLP = Math.round(moneda === 'UF' ? monto * valorUF : monto);
  const montoFinalCLP = Math.round(montoInicialCLP * factor);
  const interesesGanadosCLP = montoFinalCLP - montoInicialCLP;

  const montoInicialUF = moneda === 'UF' ? monto : montoInicialCLP / valorUF;
  const montoFinalUF = montoFinalCLP / valorUF;
  const interesesGanadosUF = montoFinalUF - montoInicialUF;

  return {
    monto,
    moneda,
    tasaPeriodo,
    tipoTasa,
    plazoDias,
    renovaciones,
    periodos,
    plazoTotalDias: plazoDias * periodos,
    tasaEfectivaPeriodo,
    tasaEfectivaTotalPct: Math.round(tasaEfectivaTotalPct * 10000) / 10000,
    valorUF,
    montoInicialCLP,
    interesesGanadosCLP,
    montoFinalCLP,
    montoInicialUF: Math.round(montoInicialUF * 100) / 100,
    interesesGanadosUF: Math.round(interesesGanadosUF * 100) / 100,
    montoFinalUF: Math.round(montoFinalUF * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function depositoAPlazoToResults(
  result: DepositoAPlazoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Monto Final',
      value: result.montoFinalCLP,
      format: 'CLP',
      highlight: true,
      note: {
        text: 'Simulación con la tasa ingresada según la oferta del banco; no incluye impuestos ni comisiones.',
      },
    },
    {
      label: 'Intereses Ganados',
      value: result.interesesGanadosCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto Inicial',
      value: result.montoInicialCLP,
      format: 'CLP',
    },
    {
      label: 'Equivalente Final en UF',
      value: result.montoFinalUF,
      format: 'UF',
    },
    {
      label: 'Intereses Ganados en UF',
      value: result.interesesGanadosUF,
      format: 'UF',
    },
    {
      label: 'Tasa Efectiva del Período',
      value: Math.round(result.tasaEfectivaPeriodo * 10000) / 100,
      format: 'percentage',
    },
    {
      label: 'Tasa Efectiva Total',
      value: result.tasaEfectivaTotalPct,
      format: 'percentage',
    },
  ];

  if (result.renovaciones > 0) {
    results.push({
      label: 'Plazo Total con Renovaciones',
      value: result.plazoTotalDias,
      format: 'days',
    });
  }

  results.push({
    label: 'Valor UF utilizado',
    value: result.valorUF,
    format: 'CLP',
  });

  return results;
}
