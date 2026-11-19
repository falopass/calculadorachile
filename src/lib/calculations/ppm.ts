// ============================================
// Cálculo de Pagos Provisionales Mensuales (PPM) Chile 2026
// ============================================

import { getRetencionHonorarios } from '@/lib/values/honorarios-anio';
import type { CalculatorResult } from '@/types/calculator';

export interface PPMInput {
  /** Ingresos brutos anuales sin IVA; para profesionales, honorarios brutos. */
  ingresosBrutosAnuales: number;
  actividad: 'profesional' | 'comercio' | 'transporte' | 'construccion';
}

export interface PPMResult {
  baseTributable: number;
  tasaPPM: number;
  ppmMensual: number;
  ppmAnual: number;
  actividad: string;
}

const TASAS_PPM: Record<Exclude<PPMInput['actividad'], 'profesional'>, number> = {
  comercio: 1,
  transporte: 0.3,
  construccion: 0.2,
};

const NOMBRES_ACTIVIDAD: Record<PPMInput['actividad'], string> = {
  profesional: 'Profesional / Independiente (2da Categoría)',
  comercio: 'Comercio (1ra Categoría)',
  transporte: 'Transporte (1ra Categoría)',
  construccion: 'Construcción (1ra Categoría)',
};

export function calculatePPM(input: PPMInput): PPMResult {
  const { ingresosBrutosAnuales, actividad } = input;

  // Base bruta sin IVA, sin deducir gastos: https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1908.htm
  const baseTributable = Math.max(0, ingresosBrutosAnuales);
  const tasaPPM = actividad === 'profesional' ? getRetencionHonorarios() : TASAS_PPM[actividad];

  const ppmAnual = Math.round(baseTributable * (tasaPPM / 100));
  const ppmMensual = Math.round(ppmAnual / 12);

  return {
    baseTributable,
    tasaPPM,
    ppmMensual,
    ppmAnual,
    actividad: NOMBRES_ACTIVIDAD[actividad],
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function ppmToResults(result: PPMResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    { label: 'PPM Mensual', value: result.ppmMensual, format: 'CLP', highlight: true },
    { label: 'PPM Anual', value: result.ppmAnual, format: 'CLP' },
    { label: 'Base Tributable', value: result.baseTributable, format: 'CLP' },
    { label: 'Tasa PPM', value: result.tasaPPM, format: 'percentage' },
  ];

  return results;
}
