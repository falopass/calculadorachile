// ============================================
// Cálculo de Vacaciones Proporcionales Chile
// ============================================

import { VACACIONES } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface VacacionesInput {
  sueldoBruto: number;
  mesesTrabajados: number;
  añosTrabajados?: number;
  diasVacacionesPendientes?: number;
}

export interface VacacionesResult {
  sueldoBruto: number;
  mesesTrabajados: number;
  diasProporcionales: number;
  diasPendientes: number;
  diasTotales: number;
  valorDia: number;
  totalVacaciones: number;
  diasProgresivos: number;
}

/**
 * Calcula los días de vacaciones progresivas (Art. 68 CdT).
 *
 * Regla legal: a partir del año 10 de servicio (ya sea con uno o más
 * empleadores), el trabajador tiene derecho a 1 día adicional de
 * feriado por cada 3 años nuevos trabajados, con tope de 5 días
 * adicionales.
 *
 * Bug histórico: la versión anterior aplicaba `floor(años / 3)` desde
 * el año 0, lo que daba 1 día adicional al cuarto año. Aquí se usa
 * la regla correcta: el primer día progresivo recién aparece a los
 * 13 años de servicio (10 + 3).
 */
function calcularDiasProgresivos(añosTrabajados: number): number {
  if (añosTrabajados < 10) return 0;

  const aniosSobre10 = añosTrabajados - 10;
  const diasProgresivos = Math.floor(aniosSobre10 / 3);

  return Math.min(diasProgresivos, VACACIONES.tope_progresivos);
}

/**
 * Calcula las vacaciones proporcionales y por días pendientes.
 *
 * Las vacaciones legales son 15 días HÁBILES (Art. 67 CdT). Para
 * efectos de pago en finiquito o renuncia, la regla práctica usada
 * por la Dirección del Trabajo es 1,25 días por mes trabajado y un
 * valor día de sueldo bruto / 30.
 *
 * Bug histórico: la versión anterior usaba `Math.round(15/12 * meses)`
 * que sobreestima los días por meses incompletos. Aquí se mantiene la
 * proporcionalidad sin redondeo intermedio para no inflar el pago.
 */
export function calculateVacaciones(input: VacacionesInput): VacacionesResult {
  const {
    sueldoBruto,
    mesesTrabajados,
    añosTrabajados = 0,
    diasVacacionesPendientes = 0,
  } = input;

  const sueldo = Math.max(0, sueldoBruto);
  const meses = Math.max(0, mesesTrabajados);
  const anios = Math.max(0, añosTrabajados);
  const pendientes = Math.max(0, diasVacacionesPendientes);

  // 1,25 días por mes (15 / 12) sin redondeo intermedio.
  const diasProporcionalesExactos = (VACACIONES.dias_anuales / 12) * meses;

  const diasProgresivos = calcularDiasProgresivos(anios);

  // Total de días con un solo redondeo final.
  const diasTotalesExactos = diasProporcionalesExactos + pendientes + diasProgresivos;

  const valorDia = sueldo / 30;
  const totalVacaciones = diasTotalesExactos * valorDia;

  return {
    sueldoBruto: sueldo,
    mesesTrabajados: meses,
    diasProporcionales: Math.round(diasProporcionalesExactos * 10) / 10,
    diasPendientes: pendientes,
    diasTotales: Math.round(diasTotalesExactos * 10) / 10,
    valorDia: Math.round(valorDia),
    totalVacaciones: Math.round(totalVacaciones),
    diasProgresivos,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function vacacionesToResults(result: VacacionesResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Total Vacaciones',
    value: result.totalVacaciones,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: `Días totales`,
    value: result.diasTotales,
    format: 'days',
  });

  results.push({
    label: 'Días proporcionales',
    value: result.diasProporcionales,
    format: 'days',
  });

  if (result.diasPendientes > 0) {
    results.push({
      label: 'Días pendientes',
      value: result.diasPendientes,
      format: 'days',
    });
  }

  if (result.diasProgresivos > 0) {
    results.push({
      label: 'Días progresivos (Art. 68 CdT)',
      value: result.diasProgresivos,
      format: 'days',
    });
  }

  results.push({
    label: 'Valor día',
    value: result.valorDia,
    format: 'CLP',
  });

  return results;
}
