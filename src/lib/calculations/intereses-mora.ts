// ============================================
// Cálculo de Intereses por Mora Laboral Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface InteresesMoraInput {
  montoDeuda: number;
  diasMora: number;
  fechaInicio?: string; // YYYY-MM-DD (reservado para cálculo dinámico futuro)
}

export interface InteresesMoraResult {
  montoDeuda: number;
  tasaMora: number;
  diasMora: number;
  interesGenerado: number;
  totalAPagar: number;
  recargoPorcentual: number;
}

/**
 * Tasa Máxima Convencional (TMC) aproximada para mora laboral
 *
 * El interés por mora en obligaciones laborales se calcula sobre la base
 * del interés máximo convencional (TMC + spread). Para montos superiores
 * a 200 UF se utiliza la TMC de operaciones no reajustables en UF,
 * actualmente en torno al 8,5% anual.
 *
 * Base legal: Art. 12 Ley 18.010, Art. 8 Ley 19.983,
 *             Art. 63 Código del Trabajo.
 */
const TASA_MORA_ANUAL = 8.5; // TMC aproximada para montos > 200 UF

/**
 * Calcula los intereses por mora laboral
 *
 * Fórmula: Interés = Monto deuda * (Tasa anual / 100) * (Días mora / 365)
 *
 * @param input - Datos para el cálculo de intereses moratorios
 * @returns Desglose completo de los intereses generados
 */
export function calculateInteresesMora(input: InteresesMoraInput): InteresesMoraResult {
  const { montoDeuda, diasMora } = input;

  // Validar rangos
  const deudaValida = Math.max(0, montoDeuda);
  const diasValidos = Math.max(0, diasMora);

  // Cálculo del interés proporcional
  const interesGenerado = deudaValida * (TASA_MORA_ANUAL / 100) * (diasValidos / 365);

  // Total a pagar (deuda + intereses)
  const totalAPagar = deudaValida + interesGenerado;

  // Recargo porcentual respecto a la deuda original
  const recargoPorcentual = deudaValida > 0
    ? (interesGenerado / deudaValida) * 100
    : 0;

  return {
    montoDeuda: Math.round(deudaValida),
    tasaMora: TASA_MORA_ANUAL,
    diasMora: diasValidos,
    interesGenerado: Math.round(interesGenerado),
    totalAPagar: Math.round(totalAPagar),
    recargoPorcentual: Math.round(recargoPorcentual * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function interesesMoraToResults(result: InteresesMoraResult): CalculatorResult[] {
  return [
    {
      label: 'Total a Pagar',
      value: result.totalAPagar,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Intereses Generados',
      value: result.interesGenerado,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto Deuda Original',
      value: result.montoDeuda,
      format: 'CLP',
    },
    {
      label: 'Tasa de Mora Anual',
      value: result.tasaMora,
      format: 'percentage',
    },
    {
      label: 'Días de Mora',
      value: result.diasMora,
      format: 'days',
    },
    {
      label: 'Recargo Porcentual',
      value: result.recargoPorcentual,
      format: 'percentage',
    },
  ];
}
