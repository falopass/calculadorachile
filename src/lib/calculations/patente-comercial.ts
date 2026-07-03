// ============================================
// Cálculo de Patente Comercial Municipal Chile 2026
// ============================================

import { UTM, PATENTE_COMERCIAL } from '@/lib/values/constants';
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
 * Tasas comunales como porcentaje del capital propio tributario
 * Varían según la comuna donde se obtiene la patente
 */
const TASAS_COMUNALES: Record<string, number> = {
  santiago: 0.5,
  providencia: 0.4,
  las_condes: 0.35,
  otra: 0.25,
};

/**
 * Límites de patente en UTM (anuales). Definidos en
 * `PATENTE_COMERCIAL` en constants.ts.
 *  - Mínimo: 1 UTM anual
 *  - Máximo: 8.000 UTM anuales (DL 3063 Art. 24)
 */
const PATENTE_MINIMA_ANUAL_UTM = PATENTE_COMERCIAL.minimo_utm_anual;
const PATENTE_MAXIMA_ANUAL_UTM = PATENTE_COMERCIAL.maximo_utm_anual;

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
 * o de servicios. Se calcula como un porcentaje del capital propio tributario,
 * con montos mínimos y máximos expresados en UTM.
 * Se paga anualmente en dos cuotas (31 enero y 31 julio).
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

  // Patente anual base (tasa del capital propio del contribuyente)
  const patenteAnualBase = capital * (tasaComunal / 100);

  // Topes ANUALES en CLP (DL 3063 Art. 24)
  const patenteMinimaAnual = Math.round(PATENTE_MINIMA_ANUAL_UTM * valorUTM);
  const patenteMaximaAnual = Math.round(PATENTE_MAXIMA_ANUAL_UTM * valorUTM);

  // Aplicar topes a nivel anual
  let patenteAnual: number;
  let aplicaTope: 'minimo' | 'normal' | 'maximo';

  if (patenteAnualBase < patenteMinimaAnual) {
    patenteAnual = patenteMinimaAnual;
    aplicaTope = 'minimo';
  } else if (patenteAnualBase > patenteMaximaAnual) {
    patenteAnual = patenteMaximaAnual;
    aplicaTope = 'maximo';
  } else {
    patenteAnual = Math.round(patenteAnualBase);
    aplicaTope = 'normal';
  }

  // La patente se paga anualmente en dos cuotas (31 enero y 31 julio)
  const patenteSemestral = Math.round(patenteAnual / 2);
  const patenteMinimaSemestral = Math.round(patenteMinimaAnual / 2);
  const patenteMaximaSemestral = Math.round(patenteMaximaAnual / 2);

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
      label: 'Cuota (50% anual)',
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
      label: 'Capital Propio Tributario',
      value: result.capitalInvertido,
      format: 'CLP',
    },
    {
      label: 'Cuota Mínima (50% anual)',
      value: result.patenteMinimaSemestral,
      format: 'CLP',
    },
    {
      label: 'Cuota Máxima (50% anual)',
      value: result.patenteMaximaSemestral,
      format: 'CLP',
    },
  ];
}
