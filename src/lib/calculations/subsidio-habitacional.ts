// ============================================
// Cálculo de Subsidio Habitacional MINVU Chile 2026
// ============================================

import { UF, SUBSIDIO_HABITACIONAL } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type TipoSubsidio = 'ds49' | 'ds01' | 'ds19';
export type TramoSubsidio = 'tramo1' | 'tramo2' | 'tramo3';

export interface SubsidioHabitacionalInput {
  valorPropiedad: number;
  ahorro: number;
  /**
   * Tipo de subsidio MINVU:
   *  - DS49: Fondo Solidario (sectores vulnerables, sin crédito)
   *  - DS01: Sectores medios (con crédito hipotecario)
   *  - DS19: Integración Social y Territorial (clase media)
   */
  tipoSubsidio: TipoSubsidio;
  tramo: TramoSubsidio;
}

export interface SubsidioHabitacionalResult {
  valorPropiedadUF: number;
  ahorroUF: number;
  tipoSubsidio: string;
  tramo: string;
  subsidioBaseUF: number;
  subsidioCLP: number;
  ahorroRequeridoUF: number;
  ahorroRequeridoCLP: number;
  montoMaximoPropiedadUF: number;
  montoMaximoPropiedadCLP: number;
  deficitUF: number;
  deficitCLP: number;
  cumpleRequisitos: boolean;
  /** Errores o advertencias en vez de lanzar Error. */
  errores: string[];
}

/**
 * Ahorro mínimo requerido por tipo de subsidio y tramo (en UF).
 *
 * Estos son los montos mínimos que el postulante debe tener
 * efectivamente ahorrados para postular. NO son derivados del
 * ingreso del hogar (la versión anterior asumía 10% del ingreso
 * máximo, lo cual no corresponde a la normativa).
 *
 * Base legal:
 *  - DS49 (Fondo Solidario, vivienda nueva): 10 UF
 *  - DS01 tramo 1 (Sectores medios): 30 UF
 *  - DS01 tramo 2 (Sectores medios): 50 UF
 *  - DS19 (Integración Social): 80 UF
 */
const AHORRO_MINIMO_UF: Record<TipoSubsidio, Record<TramoSubsidio, number>> = {
  ds49: { tramo1: 10, tramo2: 10, tramo3: 10 },
  ds01: { tramo1: 30, tramo2: 50, tramo3: 80 },
  ds19: { tramo1: 80, tramo2: 100, tramo3: 100 },
};

/**
 * DS19: Subsidio de Integración Social y Territorial.
 * Para hogares con ingresos hasta 60 UF mensuales (clase media).
 * Subsidio entre 50 y 800 UF según tramo socioeconómico.
 */
const DS19_TRAMOS: Record<TramoSubsidio, { ingresoMaximoUF: number; subsidioMaximoUF: number }> = {
  tramo1: { ingresoMaximoUF: 25, subsidioMaximoUF: 800 },
  tramo2: { ingresoMaximoUF: 40, subsidioMaximoUF: 500 },
  tramo3: { ingresoMaximoUF: 60, subsidioMaximoUF: 200 },
};

const DS19_MONTO_MAX_PROPIEDAD_UF = 2200;

const NOMBRES_TIPO: Record<TipoSubsidio, string> = {
  ds49: 'DS49 (Fondo Solidario)',
  ds01: 'DS01 (Sectores Medios)',
  ds19: 'DS19 (Integración Social)',
};

/**
 * Calcula el subsidio habitacional según tipo y tramo.
 *
 * Bugs históricos corregidos:
 *  - Lanzaba `Error` para combinaciones inválidas (DS01 + tramo3),
 *    rompiendo la UI sin manejo. Ahora retorna el error en
 *    `result.errores` y un cálculo parcial seguro.
 *  - El "ahorro requerido" se calculaba como 10% del ingreso máximo,
 *    lo cual es inventado. Los montos reales son fijos en UF según
 *    el decreto.
 *  - No contemplaba DS19 (Integración Social), uno de los subsidios
 *    más usados por la clase media.
 *
 * Base legal: DS49, DS01, DS19 MINVU.
 */
export function calculateSubsidioHabitacional(
  input: SubsidioHabitacionalInput,
): SubsidioHabitacionalResult {
  const { valorPropiedad, ahorro, tipoSubsidio, tramo } = input;

  const errores: string[] = [];

  const propiedad = Math.max(0, valorPropiedad);
  const ahorroVal = Math.max(0, ahorro);
  const valorUF = UF.valor;

  const valorPropiedadUF = Math.round((propiedad / valorUF) * 100) / 100;
  const ahorroUF = Math.round((ahorroVal / valorUF) * 100) / 100;

  // Resolver subsidio base según tipo + tramo
  let subsidioBaseUF = 0;
  let montoMaximoPropiedadUF = 0;

  if (tipoSubsidio === 'ds19') {
    const datos = DS19_TRAMOS[tramo];
    subsidioBaseUF = datos.subsidioMaximoUF;
    montoMaximoPropiedadUF = DS19_MONTO_MAX_PROPIEDAD_UF;
  } else {
    const datosSubsidio = SUBSIDIO_HABITACIONAL[tipoSubsidio];
    montoMaximoPropiedadUF = datosSubsidio.montoMaximoUF;

    if (tramo === 'tramo1') {
      subsidioBaseUF = datosSubsidio.tramo1.subsidioMaximoUF;
    } else if (tramo === 'tramo2') {
      subsidioBaseUF = datosSubsidio.tramo2.subsidioMaximoUF;
    } else if (tramo === 'tramo3') {
      if ('tramo3' in datosSubsidio && datosSubsidio.tramo3) {
        subsidioBaseUF = datosSubsidio.tramo3.subsidioMaximoUF;
      } else {
        errores.push(`El subsidio ${tipoSubsidio.toUpperCase()} no tiene tramo 3.`);
        // Fallback al tramo 2 para no romper el cálculo
        subsidioBaseUF = datosSubsidio.tramo2.subsidioMaximoUF;
      }
    }
  }

  // Ahorro requerido (montos fijos por DS, no derivados del ingreso)
  const ahorroRequeridoUF = AHORRO_MINIMO_UF[tipoSubsidio][tramo];
  const ahorroRequeridoCLP = Math.round(ahorroRequeridoUF * valorUF);

  const subsidioCLP = Math.round(subsidioBaseUF * valorUF);
  const montoMaximoPropiedadCLP = Math.round(montoMaximoPropiedadUF * valorUF);

  // Déficit = propiedad - subsidio - ahorro
  const deficitUF =
    Math.max(0, Math.round((valorPropiedadUF - subsidioBaseUF - ahorroUF) * 100) / 100);
  const deficitCLP = Math.round(deficitUF * valorUF);

  const cumpleRequisitos =
    ahorroUF >= ahorroRequeridoUF &&
    valorPropiedadUF <= montoMaximoPropiedadUF &&
    errores.length === 0;

  if (ahorroUF < ahorroRequeridoUF) {
    errores.push(
      `Ahorro insuficiente: requiere ${ahorroRequeridoUF} UF, tiene ${ahorroUF.toFixed(2)} UF.`,
    );
  }
  if (valorPropiedadUF > montoMaximoPropiedadUF) {
    errores.push(
      `Propiedad excede el tope ${montoMaximoPropiedadUF} UF para ${tipoSubsidio.toUpperCase()}.`,
    );
  }

  return {
    valorPropiedadUF,
    ahorroUF,
    tipoSubsidio: NOMBRES_TIPO[tipoSubsidio],
    tramo: `${tramo.toUpperCase()} (${tipoSubsidio.toUpperCase()})`,
    subsidioBaseUF,
    subsidioCLP,
    ahorroRequeridoUF,
    ahorroRequeridoCLP,
    montoMaximoPropiedadUF,
    montoMaximoPropiedadCLP,
    deficitUF,
    deficitCLP,
    cumpleRequisitos,
    errores,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioHabitacionalToResults(
  result: SubsidioHabitacionalResult,
): CalculatorResult[] {
  return [
    {
      label: 'Subsidio Total',
      value: result.subsidioCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Subsidio Total (UF)',
      value: result.subsidioBaseUF,
      format: 'UF',
      highlight: true,
    },
    {
      label: 'Déficit (UF)',
      value: result.deficitUF,
      format: 'UF',
    },
    {
      label: 'Déficit',
      value: result.deficitCLP,
      format: 'CLP',
    },
    {
      label: 'Ahorro Requerido (UF)',
      value: result.ahorroRequeridoUF,
      format: 'UF',
    },
    {
      label: 'Ahorro Requerido',
      value: result.ahorroRequeridoCLP,
      format: 'CLP',
    },
    {
      label: 'Máx. Propiedad (UF)',
      value: result.montoMaximoPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Valor Propiedad (UF)',
      value: result.valorPropiedadUF,
      format: 'UF',
    },
    {
      label: 'Ahorro (UF)',
      value: result.ahorroUF,
      format: 'UF',
    },
  ];
}
