// ============================================
// Cálculo de Pagos Provisionales Mensuales (PPM) Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { UTM } from '@/lib/values/constants';

export interface PPMInput {
  /**
   * Ingresos brutos del período. Para profesionales = honorarios brutos.
   * Para 1ra categoría = ingresos por ventas/servicios.
   */
  ingresosBrutosAnuales: number;
  /**
   * Gastos efectivos del período. Si no se entregan, profesionales
   * 2da categoría usan presunción 30% (Art. 50 LIR), tope 15 UTA.
   * Comercio/transporte/construcción no tienen presunción genérica;
   * deben declarar gastos reales.
   */
  gastosPresuntos?: number;
  actividad: 'profesional' | 'comercio' | 'transporte' | 'construccion';
}

export interface PPMResult {
  baseTributable: number;
  tasaPPM: number;
  ppmMensual: number;
  ppmAnual: number;
  actividad: string;
  /** Indica si se aplicó la presunción 30% Art. 50 LIR. */
  aplicoPresuncionGastos: boolean;
  /** Tope de la presunción en CLP (15 UTA). */
  topePresuncionCLP: number;
}

/**
 * Tasas de PPM por tipo de actividad.
 *
 * Para profesionales 2da categoría la tasa de PPM coincide con la
 * retención de honorarios establecida por la Ley 21.578 (calendario
 * 14,5% en 2025 → 17% en 2028). En 2026 es 15,25%.
 *
 * Para 1ra categoría las tasas iniciales son las que el SII fija al
 * inicio de actividades; luego se recalculan trimestralmente según
 * la diferencia con el impuesto del año anterior. Estas son
 * tasas iniciales referenciales:
 *   - Comercio: 1%
 *   - Transporte: 0,3%
 *   - Construcción: 0,2%
 *
 * Base legal: Art. 84 LIR (1ra categoría) y Art. 88 LIR + Ley
 * 21.578 (retención honorarios = PPM 2da categoría).
 */
const TASAS_PPM: Record<PPMInput['actividad'], number> = {
  profesional: 15.25,
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

/**
 * Tope de la presunción 30% para profesionales 2da categoría.
 * Art. 50 inciso 3° LIR: "no podrá deducirse más del 30% con tope
 * de 15 UTA por concepto de gastos presuntos".
 */
const TOPE_PRESUNCION_UTA = 15;

/**
 * Calcula los Pagos Provisionales Mensuales (PPM).
 *
 * Bug histórico:
 *  - Tasa profesionales era 10% (calendario antiguo). Ley 21.578
 *    actualiza a 14,5%/15,25%/16%/17% entre 2025-2028.
 *  - Se aplicaba "deducción estándar 10%" para comercio/transporte/
 *    construcción que no existe en la ley. Se elimina: si no se
 *    entregan gastos, se usa la base bruta directa.
 *  - Profesionales: presunción 30% solo se aplica si no se declaran
 *    gastos efectivos, y queda topeada en 15 UTA.
 *
 * Base legal: Art. 50, 84 y 88 LIR; Ley 21.578.
 */
export function calculatePPM(input: PPMInput): PPMResult {
  const { ingresosBrutosAnuales, gastosPresuntos, actividad } = input;

  const ingresos = Math.max(0, ingresosBrutosAnuales);

  // Tope presunción 15 UTA (solo aplica a profesionales)
  const valorUTA = UTM.valor * 12;
  const topePresuncionCLP = TOPE_PRESUNCION_UTA * valorUTA;

  // Cálculo de gastos según actividad
  let gastos: number;
  let aplicoPresuncionGastos = false;

  if (gastosPresuntos !== undefined && gastosPresuntos >= 0) {
    // Gastos efectivos declarados por el usuario
    gastos = Math.min(gastosPresuntos, ingresos);
  } else if (actividad === 'profesional') {
    // Profesionales: presunción 30%, tope 15 UTA (Art. 50 LIR)
    const presuncion30 = ingresos * 0.3;
    gastos = Math.min(presuncion30, topePresuncionCLP);
    aplicoPresuncionGastos = true;
  } else {
    // 1ra categoría sin gastos declarados: base bruta directa
    // (no existe presunción genérica del 10% en la ley).
    gastos = 0;
  }

  const baseTributable = Math.max(0, ingresos - gastos);
  const tasaPPM = TASAS_PPM[actividad];

  const ppmAnual = Math.round(baseTributable * (tasaPPM / 100));
  const ppmMensual = Math.round(ppmAnual / 12);

  return {
    baseTributable,
    tasaPPM,
    ppmMensual,
    ppmAnual,
    actividad: NOMBRES_ACTIVIDAD[actividad],
    aplicoPresuncionGastos,
    topePresuncionCLP: Math.round(topePresuncionCLP),
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

  if (result.aplicoPresuncionGastos) {
    results.push({
      label: 'Tope Presunción 15 UTA (Art. 50 LIR)',
      value: result.topePresuncionCLP,
      format: 'CLP',
    });
  }

  return results;
}
