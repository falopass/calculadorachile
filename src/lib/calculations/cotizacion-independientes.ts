// ============================================
// Cálculo de Cotizaciones Independientes (Ley 21.133) Chile 2026
// ============================================

import {
  AFP,
  AFP_OBLIGATORIA_PCT,
  UF,
  TOPE_IMPOSITIVO,
  MUTUAL,
  SALUD,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CotizacionIndependientesInput {
  rentaBrutaMensual: number;
  afp: keyof typeof AFP;
  salud: 'fonasa' | 'isapre';
}

export interface CotizacionIndependientesResult {
  rentaBruta: number;
  baseImponibleAnual: number;
  baseImponibleMensual: number;
  cotizacionAFP: number;
  cotizacionSalud: number;
  cotizacionMutual: number;
  totalCotizaciones: number;
  topeImponibleMensual: number;
  aplicaTopeImponible: boolean;
}

/**
 * Tope imponible para trabajadores independientes (Ley 21.133).
 * Es el mismo tope general AFP/Salud (89,9 UF en 2026).
 *
 * Fuente: `TOPE_IMPOSITIVO.afp_salud` en constants.ts.
 * Se ajusta anualmente por la Superintendencia de Pensiones según
 * la variación real de las remuneraciones (Art. 16 D.L. 3500).
 */
const TOPE_IMPONIBLE_UF = TOPE_IMPOSITIVO.afp_salud;

/**
 * Mutual de seguridad: tasa básica + adicional promedio.
 * Definido en `MUTUAL` en constants.ts (Ley 16.744).
 */
const MUTUAL_TASA = MUTUAL.total_referencial;

/**
 * Calcula las cotizaciones previsionales obligatorias para
 * trabajadores independientes que emiten boletas de honorarios.
 *
 * Bugs históricos corregidos:
 *  - SIS no se cobra a independientes: el SIS es seguro de
 *    invalidez/sobrevivencia que solo cubre a trabajadores
 *    dependientes (D.L. 3500 Art. 59). Los independientes pagan
 *    íntegramente el 10% a su cuenta individual.
 *  - El tope imponible para independientes es el mismo tope
 *    general (87,8 UF en 2026), no se mantenía actualizado.
 *  - Se agrega cotización de mutualidad (Ley 16.744) que sí
 *    aplica a independientes.
 *
 * Base imponible anual = 80% de la renta bruta anual gravable
 * (Ley 21.133 Art. 89 D.L. 3500).
 *
 * Base legal: Ley 21.133, D.L. 3500 Art. 89 y 92 F.
 */
export function calculateCotizacionIndependientes(
  input: CotizacionIndependientesInput,
): CotizacionIndependientesResult {
  const { rentaBrutaMensual, afp, salud } = input;

  void salud; // Tasa de salud es 7% para FONASA e Isapre mínimo.

  const rentaBruta = Math.max(0, rentaBrutaMensual);

  // Base imponible: 80% de la renta bruta (Ley 21.133)
  const baseAnualSinTope = rentaBruta * 12 * 0.8;

  // Tope mensual en CLP
  const topeImponibleMensual = TOPE_IMPONIBLE_UF * UF.valor;
  const topeAnual = topeImponibleMensual * 12;

  const baseImponibleAnual = Math.min(baseAnualSinTope, topeAnual);
  const baseImponibleMensual = baseImponibleAnual / 12;
  const aplicaTopeImponible = baseAnualSinTope > topeAnual;

  // AFP: 10% obligatorio + comisión variable (sin SIS para indep,
  // D.L. 3500 Art. 59).
  const afpData = AFP[afp];
  if (!afpData) {
    throw new Error(`AFP "${String(afp)}" no encontrada`);
  }
  const cotizacionAFP = Math.round(
    baseImponibleMensual * ((AFP_OBLIGATORIA_PCT + afpData.comision) / 100),
  );

  // Salud: 7% (FONASA o Isapre, mínimo legal).
  const cotizacionSalud = Math.round(
    baseImponibleMensual * (SALUD.fonasa.tasa / 100),
  );

  // Mutual de seguridad (Ley 16.744): 0,9% mínimo
  const cotizacionMutual = Math.round(baseImponibleMensual * (MUTUAL_TASA / 100));

  const totalCotizaciones = cotizacionAFP + cotizacionSalud + cotizacionMutual;

  return {
    rentaBruta: Math.round(rentaBruta),
    baseImponibleAnual: Math.round(baseImponibleAnual),
    baseImponibleMensual: Math.round(baseImponibleMensual),
    cotizacionAFP,
    cotizacionSalud,
    cotizacionMutual,
    totalCotizaciones,
    topeImponibleMensual: Math.round(topeImponibleMensual),
    aplicaTopeImponible,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function cotizacionIndependientesToResults(
  result: CotizacionIndependientesResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    { label: 'Total Cotizaciones', value: result.totalCotizaciones, format: 'CLP', highlight: true },
    { label: 'Renta Bruta Mensual', value: result.rentaBruta, format: 'CLP' },
    { label: 'Base Imponible Mensual (80%)', value: result.baseImponibleMensual, format: 'CLP' },
    { label: 'Cotización AFP (10% + comisión)', value: result.cotizacionAFP, format: 'CLP' },
    { label: 'Cotización Salud (7%)', value: result.cotizacionSalud, format: 'CLP' },
    { label: 'Mutual de Seguridad (0,9%)', value: result.cotizacionMutual, format: 'CLP' },
  ];

  if (result.aplicaTopeImponible) {
    results.push({
      label: `Tope Imponible Mensual (${TOPE_IMPONIBLE_UF} UF)`,
      value: result.topeImponibleMensual,
      format: 'CLP',
    });
  }

  return results;
}
