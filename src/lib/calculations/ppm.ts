// ============================================
// Cálculo de Pagos Provisionales Mensuales (PPM) Chile 2026
// Pagos a cuenta del impuesto a la renta para contribuyentes de 1ª categoría
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface PPMInput {
  ingresosBrutosAnuales: number;
  gastosPresuntos?: number;
  actividad: 'profesional' | 'comercio' | 'transporte' | 'construccion';
}

export interface PPMResult {
  baseTributable: number;
  tasaPPM: number;
  ppmMensual: number;
  ppmAnual: number;
  actividad: string;
}

/**
 * Tasas de PPM por tipo de actividad según SII.
 * Profesionales: 10%, Comercio: 1%, Transporte: 0.5%, Construcción: 0.2%.
 * Art. 84 Ley de Impuesto a la Renta y Resoluciones del SII.
 */
const TASAS_PPM: Record<PPMInput['actividad'], number> = {
  profesional: 10,
  comercio: 1,
  transporte: 0.5,
  construccion: 0.2,
};

const NOMBRES_ACTIVIDAD: Record<PPMInput['actividad'], string> = {
  profesional: 'Profesional / Independiente',
  comercio: 'Comercio',
  transporte: 'Transporte',
  construccion: 'Construcción',
};

/**
 * Calcula los Pagos Provisionales Mensuales (PPM).
 * La base tributable se obtiene restando los gastos presuntos a los ingresos brutos.
 * Si no se indican gastos, se aplica deducción estándar: 30% para profesionales, 10% otros.
 * Art. 84 Ley de Impuesto a la Renta.
 */
export function calculatePPM(input: PPMInput): PPMResult {
  const {
    ingresosBrutosAnuales,
    gastosPresuntos,
    actividad,
  } = input;

  // Validar ingresos
  const ingresos = Math.max(0, ingresosBrutosAnuales);

  // Gastos presuntos: si no se proporcionan, usar deducción estándar
  let gastos: number;
  if (gastosPresuntos !== undefined && gastosPresuntos >= 0) {
    gastos = gastosPresuntos;
  } else {
    const porcentajeDeduccion = actividad === 'profesional' ? 0.3 : 0.1;
    gastos = Math.round(ingresos * porcentajeDeduccion);
  }

  // Base tributable
  const baseTributable = Math.max(0, ingresos - gastos);

  // Tasa PPM según actividad
  const tasaPPM = TASAS_PPM[actividad];

  // PPM anual y mensual
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
  return [
    { label: 'PPM Mensual', value: result.ppmMensual, format: 'CLP', highlight: true },
    { label: 'PPM Anual', value: result.ppmAnual, format: 'CLP' },
    { label: 'Base Tributable', value: result.baseTributable, format: 'CLP' },
    { label: 'Tasa PPM', value: result.tasaPPM, format: 'percentage' },
  ];
}
