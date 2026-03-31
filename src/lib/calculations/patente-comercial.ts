// ============================================
// Cálculo de Patente Comercial Municipal Chile 2026
// ============================================

import { UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PatenteComercialInput {
  capitalInvertido: number;
  actividad: 'comercio' | 'industria' | 'servicios' | 'transporte';
  comuna: 'santiago' | 'providencia' | 'las_condes' | 'otra';
}

export interface PatenteComercialResult {
  capitalInvertido: number;
  actividad: string;
  comuna: string;
  tasaComunal: number;
  patenteAnual: number;
  patenteSemestral: number;
  patenteMinimaSemestral: number;
  patenteMaximaSemestral: number;
  aplicaTope: 'minimo' | 'normal' | 'maximo';
}

/**
 * Tasas comunales como porcentaje del capital invertido
 * Varían según la comuna donde se obtiene la patente
 */
const TASAS_COMUNALES: Record<string, number> = {
  santiago: 0.5,
  providencia: 0.4,
  las_condes: 0.35,
  otra: 0.25,
};

/**
 * Límites de patente en UTM (semestral)
 * Base legal: DL 3063/1979 Ley de Rentas Municipales
 */
const PATENTE_MINIMA_UTM = 1;   // 1 UTM semestral
const PATENTE_MAXIMA_UTM = 8;   // 8 UTM semestral

/**
 * Etiquetas legibles para actividades y comunas
 */
const LABELS_ACTIVIDAD: Record<string, string> = {
  comercio: 'Comercio',
  industria: 'Industria',
  servicios: 'Servicios',
  transporte: 'Transporte',
};

const LABELS_COMUNA: Record<string, string> = {
  santiago: 'Santiago',
  providencia: 'Providencia',
  las_condes: 'Las Condes',
  otra: 'Otra Comuna',
};

/**
 * Calcula la patente comercial municipal
 *
 * La patente comercial es un tributo municipal que deben pagar las empresas
 * y personas naturales que desarrollan actividades comerciales, industriales
 * o de servicios. Se calcula como un porcentaje del capital invertido,
 * con montos mínimos y máximos expresados en UTM.
 * Se paga semestralmente (enero y julio).
 *
 * Base legal: DL 3063/1979 (Ley de Rentas Municipales), Art. 24-26
 *
 * @param input - Datos para el cálculo de patente comercial
 * @returns Desglose completo de la patente comercial
 */
export function calculatePatenteComercial(input: PatenteComercialInput): PatenteComercialResult {
  const { capitalInvertido, actividad, comuna } = input;

  // Validar rango
  const capital = Math.max(0, capitalInvertido);

  const valorUTM = UTM.valor;

  // Obtener tasa comunal
  const tasaComunal = TASAS_COMUNALES[comuna];

  // Calcular patente anual base (tasa del capital invertido)
  const patenteAnualBase = capital * (tasaComunal / 100);

  // Calcular límites semestrales en CLP
  const patenteMinimaSemestral = Math.round(PATENTE_MINIMA_UTM * valorUTM);
  const patenteMaximaSemestral = Math.round(PATENTE_MAXIMA_UTM * valorUTM);

  // Calcular patente semestral base
  const patenteSemestralBase = Math.round(patenteAnualBase / 2);

  // Aplicar topes
  let patenteSemestral: number;
  let aplicaTope: 'minimo' | 'normal' | 'maximo';

  if (patenteSemestralBase < patenteMinimaSemestral) {
    patenteSemestral = patenteMinimaSemestral;
    aplicaTope = 'minimo';
  } else if (patenteSemestralBase > patenteMaximaSemestral) {
    patenteSemestral = patenteMaximaSemestral;
    aplicaTope = 'maximo';
  } else {
    patenteSemestral = patenteSemestralBase;
    aplicaTope = 'normal';
  }

  // Patente anual final
  const patenteAnual = patenteSemestral * 2;

  return {
    capitalInvertido: Math.round(capital),
    actividad: LABELS_ACTIVIDAD[actividad],
    comuna: LABELS_COMUNA[comuna],
    tasaComunal,
    patenteAnual,
    patenteSemestral,
    patenteMinimaSemestral,
    patenteMaximaSemestral,
    aplicaTope,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function patenteComercialToResults(result: PatenteComercialResult): CalculatorResult[] {
  return [
    {
      label: 'Patente Semestral',
      value: result.patenteSemestral,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Patente Anual',
      value: result.patenteAnual,
      format: 'CLP',
    },
    {
      label: 'Tasa Comunal',
      value: result.tasaComunal,
      format: 'percentage',
    },
    {
      label: 'Capital Invertido',
      value: result.capitalInvertido,
      format: 'CLP',
    },
    {
      label: 'Patente Mínima (semestral)',
      value: result.patenteMinimaSemestral,
      format: 'CLP',
    },
    {
      label: 'Patente Máxima (semestral)',
      value: result.patenteMaximaSemestral,
      format: 'CLP',
    },
  ];
}
