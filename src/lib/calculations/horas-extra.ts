// ============================================
// Cálculo de Horas Extra Chile
// ============================================

import { HORAS_EXTRA, INGRESO_MINIMO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface HorasExtraInput {
  sueldoBruto: number;
  horasExtra: number;
  esDomingoFestivo?: boolean;
  jornadaSemanal?: 40 | 44 | 45; // Jornada semanal personalizable
  recargoPersonalizado?: number; // Recargo personalizable (default 50%)
  sueldoVariable?: boolean; // Si se usa sueldo variable
  sueldoPromedio3Meses?: number; // Sueldo promedio últimos 3 meses
  horasExtraNocturnas?: number; // Horas extra nocturnas
  horasExtraFestivos?: number; // Horas extra en días festivos
  calcularImpactoCotizaciones?: boolean; // Calcular impacto en cotizaciones previsionales
  mostrarTopeLegal?: boolean; // Mostrar información sobre topes legales
}

export interface HorasExtraResult {
  sueldoBruto: number;
  horasExtra: number;
  valorHoraNormal: number;
  valorHoraExtra: number;
  recargo: number;
  totalHorasExtra: number;
  totalAPagar: number;
  horasNocturnas?: number;
  horasFestivas?: number;
  impactoCotizaciones?: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    total: number;
  };
  topeLegal?: {
    horasDiarias: number;
    horasSemanal: number;
  };
  jornadaSemanal: number;
}

/**
 * Calcula el valor de una hora de trabajo
 */
function calcularValorHora(sueldoBruto: number): number {
  // Jornada legal: 45 horas semanales
  // Promedio mensual: 45 * 52 / 12 = 195 horas mensuales
  return sueldoBruto / 195;
}

/**
 * Calcula las horas extra
 */
export function calculateHorasExtra(input: HorasExtraInput): HorasExtraResult {
  const {
    sueldoBruto,
    horasExtra,
    esDomingoFestivo = false,
    jornadaSemanal = 45,
    recargoPersonalizado,
    sueldoVariable = false,
    sueldoPromedio3Meses = 0,
    horasExtraNocturnas = 0,
    horasExtraFestivos = 0,
    calcularImpactoCotizaciones = false,
    mostrarTopeLegal = false
  } = input;
  
  // Usar sueldo promedio si está disponible y se indica que es variable
  const sueldoBase = sueldoVariable && sueldoPromedio3Meses > 0 ? sueldoPromedio3Meses : sueldoBruto;
  
  // Calcular valor hora normal basado en la jornada semanal
  // Jornada semanal * semanas promedio por mes (4.33)
  const horasMensuales = jornadaSemanal * 4.33;
  const valorHoraNormal = sueldoBase / horasMensuales;
  
  // Recargo según día o personalizado
  const recargoPorcentaje = recargoPersonalizado !== undefined
    ? recargoPersonalizado
    : (esDomingoFestivo
      ? HORAS_EXTRA.recargo_domingo
      : HORAS_EXTRA.recargo_normal);
  
  // Valor hora con recargo
  const valorHoraExtra = valorHoraNormal * (1 + recargoPorcentaje / 100);
  
  // Total a pagar por horas extra regulares
  const totalHorasExtra = valorHoraExtra * horasExtra;
  
  // Total a pagar por horas extra nocturnas (si aplica)
  let totalHorasExtraNocturnas = 0;
  if (horasExtraNocturnas > 0) {
    // Recargo adicional para horas nocturnas (25% adicional según ley)
    const valorHoraExtraNocturna = valorHoraNormal * (1 + (recargoPorcentaje + 25) / 100);
    totalHorasExtraNocturnas = valorHoraExtraNocturna * horasExtraNocturnas;
  }
  
  // Total a pagar por horas extra en festivos (si aplica)
  let totalHorasExtraFestivos = 0;
  if (horasExtraFestivos > 0) {
    // Recargo del 100% para festivos
    const valorHoraExtraFestivo = valorHoraNormal * (1 + 100 / 100); // 100% de recargo
    totalHorasExtraFestivos = valorHoraExtraFestivo * horasExtraFestivos;
  }
  
  // Total de todas las horas extra
  const totalTodasHorasExtra = totalHorasExtra + totalHorasExtraNocturnas + totalHorasExtraFestivos;
  
  // Total incluyendo sueldo base
  const totalAPagar = sueldoBase + totalTodasHorasExtra;
  
  // Calcular impacto en cotizaciones si aplica
  let impactoCotizaciones = undefined;
  if (calcularImpactoCotizaciones) {
    // Las horas extra también están afectas a cotizaciones previsionales
    impactoCotizaciones = {
      afp: totalTodasHorasExtra * 0.10, // 10% AFP
      salud: totalTodasHorasExtra * 0.07, // 7% salud
      seguroCesantia: totalTodasHorasExtra * 0.006, // 0.6% seguro de cesantía
      total: totalTodasHorasExtra * (0.10 + 0.07 + 0.006) // Total cotizaciones
    };
  }
  
  // Información sobre topes legales si se solicita
  const topeLegal = mostrarTopeLegal ? {
    horasDiarias: 2, // Máximo 2 horas extra diarias
    horasSemanal: 10 // Máximo 10 horas extra semanales
  } : undefined;
  
  return {
    sueldoBruto: sueldoBase,
    horasExtra,
    valorHoraNormal: Math.round(valorHoraNormal),
    valorHoraExtra: Math.round(valorHoraExtra),
    recargo: recargoPorcentaje,
    totalHorasExtra: Math.round(totalTodasHorasExtra),
    totalAPagar: Math.round(totalAPagar),
    horasNocturnas: horasExtraNocturnas > 0 ? horasExtraNocturnas : undefined,
    horasFestivas: horasExtraFestivos > 0 ? horasExtraFestivos : undefined,
    impactoCotizaciones: calcularImpactoCotizaciones ? impactoCotizaciones : undefined,
    topeLegal: mostrarTopeLegal ? topeLegal : undefined,
    jornadaSemanal
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function horasExtraToResults(result: HorasExtraResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  results.push({
    label: 'Total a Pagar',
    value: result.totalAPagar,
    format: 'CLP',
    highlight: true,
  });
  
  results.push({
    label: 'Sueldo Bruto',
    value: result.sueldoBruto,
    format: 'CLP',
  });
  
  results.push({
    label: `Pago por ${result.horasExtra} hrs extra`,
    value: result.totalHorasExtra,
    format: 'CLP',
  });
  
  results.push({
    label: 'Valor hora normal',
    value: result.valorHoraNormal,
    format: 'CLP',
  });
  
  results.push({
    label: `Valor hora extra (+${result.recargo}%)`,
    value: result.valorHoraExtra,
    format: 'CLP',
  });
  
  // Incluir horas nocturnas si aplica
  if (result.horasNocturnas !== undefined && result.horasNocturnas > 0) {
    results.push({
      label: `Horas extra nocturnas (${result.horasNocturnas})`,
      value: result.horasNocturnas,
      format: 'number',
    });
  }
  
  // Incluir horas festivas si aplica
  if (result.horasFestivas !== undefined && result.horasFestivas > 0) {
    results.push({
      label: `Horas extra festivas (${result.horasFestivas})`,
      value: result.horasFestivas,
      format: 'number',
    });
  }
  
  // Incluir impacto en cotizaciones si aplica
  if (result.impactoCotizaciones) {
    results.push({
      label: 'Impacto en Cotizaciones Prev.',
      value: result.impactoCotizaciones.total,
      format: 'CLP',
    });
    
    results.push({
      label: 'Cotización AFP (10%)',
      value: result.impactoCotizaciones.afp,
      format: 'CLP',
    });
    
    results.push({
      label: 'Cotización Salud (7%)',
      value: result.impactoCotizaciones.salud,
      format: 'CLP',
    });
    
    results.push({
      label: 'Seguro Cesantía (0.6%)',
      value: result.impactoCotizaciones.seguroCesantia,
      format: 'CLP',
    });
  }
  
  // Incluir información de topes legales si aplica
  if (result.topeLegal) {
    results.push({
      label: 'Tope Legal Horas Extra Diarias',
      value: result.topeLegal.horasDiarias,
      format: 'number',
    });
    
    results.push({
      label: 'Tope Legal Horas Extra Semanales',
      value: result.topeLegal.horasSemanal,
      format: 'number',
    });
  }
  
  results.push({
    label: `Jornada Semanal (hrs)`,
    value: result.jornadaSemanal,
    format: 'number',
  });
  
  return results;
}
