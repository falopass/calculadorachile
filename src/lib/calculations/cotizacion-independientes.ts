// ============================================
// Cálculo de Cotizaciones Independientes (Ley 21.133) Chile 2026
// Cotizaciones previsionales obligatorias para trabajadores independientes
// ============================================

import { AFP } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CotizacionIndependientesInput {
  rentaBrutaMensual: number;
  afp: keyof typeof AFP;
  salud: 'fonasa' | 'isapre';
}

export interface CotizacionIndependientesResult {
  rentaBruta: number;
  baseImponible: number;
  cotizacionAFP: number;
  cotizacionSalud: number;
  cotizacionSIS: number;
  totalCotizaciones: number;
}

/**
 * Calcula las cotizaciones previsionales obligatorias para trabajadores independientes.
 * Base imponible = 80% de la renta bruta (Ley 21.133).
 * AFP: 10% cotización + comisión variable por AFP.
 * Salud: 7% (FONASA). Isapre: mínimo 7% o plan.
 * SIS: 1.15% seguro invalidez y sobrevivencia.
 * Ley 21.133, D.L. 3500, Art. 17 y 88.
 */
export function calculateCotizacionIndependientes(
  input: CotizacionIndependientesInput
): CotizacionIndependientesResult {
  const { rentaBrutaMensual, afp, salud } = input;

  // Validar renta
  const rentaBruta = Math.max(0, rentaBrutaMensual);

  // Base imponible: 80% de la renta bruta para independientes (Ley 21.133)
  const baseImponible = Math.round(rentaBruta * 0.8);

  // Obtener datos de la AFP seleccionada
  const afpData = AFP[afp];
  if (!afpData) {
    throw new Error(`AFP "${String(afp)}" no encontrada en constantes`);
  }

  // Cotización AFP: 10% ahorro + comisión de la AFP
  const tasaAFPTotal = 10 + afpData.comision;
  const cotizacionAFP = Math.round(baseImponible * (tasaAFPTotal / 100));

  // Cotización de salud: 7% para FONASA, mínimo 7% para Isapre
  let cotizacionSalud: number;
  if (salud === 'fonasa') {
    cotizacionSalud = Math.round(baseImponible * 0.07);
  } else {
    // Isapre: mínimo 7% de la base imponible
    cotizacionSalud = Math.round(baseImponible * 0.07);
  }

  // SIS: 1.15% de la base imponible
  const cotizacionSIS = Math.round(baseImponible * (afpData.sis / 100));

  // Total cotizaciones
  const totalCotizaciones = cotizacionAFP + cotizacionSalud + cotizacionSIS;

  return {
    rentaBruta,
    baseImponible,
    cotizacionAFP,
    cotizacionSalud,
    cotizacionSIS,
    totalCotizaciones,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function cotizacionIndependientesToResults(
  result: CotizacionIndependientesResult
): CalculatorResult[] {
  return [
    { label: 'Total Cotizaciones', value: result.totalCotizaciones, format: 'CLP', highlight: true },
    { label: 'Renta Bruta', value: result.rentaBruta, format: 'CLP' },
    { label: 'Base Imponible (80%)', value: result.baseImponible, format: 'CLP' },
    { label: 'Cotización AFP', value: result.cotizacionAFP, format: 'CLP' },
    { label: 'Cotización Salud', value: result.cotizacionSalud, format: 'CLP' },
    { label: 'Cotización SIS', value: result.cotizacionSIS, format: 'CLP' },
  ];
}
