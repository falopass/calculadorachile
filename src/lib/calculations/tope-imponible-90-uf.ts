// ============================================
// Cálculo del Tope Imponible 90 UF Chile 2026
// AFP/Salud 90 UF — Seguro de Cesantía 135,2 UF
// ============================================

import {
  AFP_OBLIGATORIA_PCT,
  SALUD,
  SEGURO_CESANTIA,
  TOPE_IMPOSITIVO,
  UF,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface TopeImponibleInput {
  /** Sueldo imponible mensual (CLP). */
  sueldoImponible: number;
  /** Valor UF inyectado desde la UI (default: fallback local). */
  valorUF?: number;
}

export interface TopeImponibleResult {
  sueldoImponible: number;
  topeAfpSaludCLP: number;
  topeCesantiaCLP: number;
  /** Imponible considerado para AFP y salud (sueldo topado). */
  imponibleConsideradoCLP: number;
  /** Parte del sueldo sobre el tope AFP/salud (≥0). */
  excesoSobreTopeCLP: number;
  cotizacionAfpCLP: number;
  cotizacionSaludCLP: number;
  cotizacionCesantiaTrabajadorCLP: number;
  valorUF: number;
  baseCalculo: string;
}

/**
 * Calcula los topes imponibles vigentes y las cotizaciones que se
 * pagan sobre el sueldo topado.
 *
 * AFP y salud cotizan hasta 90 UF mensuales (Res. Ex. 237 SP). El
 * seguro de cesantía del trabajador (0,6% en contrato indefinido)
 * cotiza hasta 135,2 UF (Res. Ex. 236 SP).
 */
export function calculateTopeImponible(
  input: TopeImponibleInput,
): TopeImponibleResult {
  const valorUF = input.valorUF ?? UF.valor;
  const sueldo = Math.max(0, input.sueldoImponible ?? 0);

  const topeAfpSaludCLP = Math.round(TOPE_IMPOSITIVO.afp_salud * valorUF);
  const topeCesantiaCLP = Math.round(
    TOPE_IMPOSITIVO.seguro_cesantia * valorUF,
  );

  const imponibleConsiderado = Math.min(sueldo, topeAfpSaludCLP);
  const excesoSobreTope = Math.max(0, sueldo - topeAfpSaludCLP);
  const imponibleCesantia = Math.min(sueldo, topeCesantiaCLP);

  const cotizacionAfp = Math.round(
    (imponibleConsiderado * AFP_OBLIGATORIA_PCT) / 100,
  );
  const cotizacionSalud = Math.round(
    (imponibleConsiderado * SALUD.fonasa.tasa) / 100,
  );
  const cotizacionCesantia = Math.round(
    (imponibleCesantia * SEGURO_CESANTIA.contrato_indefinido.trabajador) / 100,
  );

  const baseCalculo = `Tope AFP/salud = ${TOPE_IMPOSITIVO.afp_salud} UF = $${topeAfpSaludCLP.toLocaleString('es-CL')}; tope cesantía = ${TOPE_IMPOSITIVO.seguro_cesantia} UF = $${topeCesantiaCLP.toLocaleString('es-CL')} (UF $${valorUF.toLocaleString('es-CL')}). Cotizaciones sobre el sueldo topado.`;

  return {
    sueldoImponible: Math.round(sueldo),
    topeAfpSaludCLP,
    topeCesantiaCLP,
    imponibleConsideradoCLP: Math.round(imponibleConsiderado),
    excesoSobreTopeCLP: Math.round(excesoSobreTope),
    cotizacionAfpCLP: cotizacionAfp,
    cotizacionSaludCLP: cotizacionSalud,
    cotizacionCesantiaTrabajadorCLP: cotizacionCesantia,
    valorUF,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function topeImponibleToResults(
  result: TopeImponibleResult,
): CalculatorResult[] {
  return [
    {
      label: 'Tope imponible AFP y salud',
      value: result.topeAfpSaludCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Tope imponible seguro de cesantía',
      value: result.topeCesantiaCLP,
      format: 'CLP',
    },
    {
      label: 'Imponible considerado (AFP/salud)',
      value: result.imponibleConsideradoCLP,
      format: 'CLP',
    },
    {
      label: 'Exceso sobre el tope (sin cotizaciones)',
      value: result.excesoSobreTopeCLP,
      format: 'CLP',
    },
    {
      label: `Cotización AFP obligatoria (${AFP_OBLIGATORIA_PCT}%)`,
      value: result.cotizacionAfpCLP,
      format: 'CLP',
    },
    {
      label: `Cotización de salud (${SALUD.fonasa.tasa}%)`,
      value: result.cotizacionSaludCLP,
      format: 'CLP',
    },
    {
      label: `Seguro de cesantía trabajador (${SEGURO_CESANTIA.contrato_indefinido.trabajador}%, indefinido)`,
      value: result.cotizacionCesantiaTrabajadorCLP,
      format: 'CLP',
    },
  ];
}
