// ============================================
// Cálculo de Finiquito Chile
// ============================================

import { INDEMNIZACION, VACACIONES, GRATIFICACION, INGRESO_MINIMO, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface FiniquitoInput {
  ultimoSueldo: number;
  añosTrabajados: number;
  mesesTrabajados?: number;
  diasVacacionesPendientes?: number;
  causaTermino: 'renuncia' | 'despido' | 'mutuo_acuerdo';
  tieneGratificacion?: boolean;
}

export interface FiniquitoResult {
  ultimoSueldo: number;
  indemnizacion: number;
  vacacionesProporcionales: number;
  gratificacionProporcional: number;
  totalFiniquito: number;
  desglose: {
    añosIndemnizacion: number;
    diasVacaciones: number;
    mesesGratificacion: number;
  };
}

/**
 * Calcula la indemnización por años de servicio
 * Solo aplica para despido (no para renuncia ni mutuo acuerdo)
 */
function calcularIndemnizacion(
  ultimoSueldo: number,
  añosTrabajados: number,
  causaTermino: FiniquitoInput['causaTermino']
): number {
  // Solo se paga indemnización en caso de despido
  if (causaTermino !== 'despido') {
    return 0;
  }
  
  // Tope de 11 años
  const añosTopeados = Math.min(añosTrabajados, INDEMNIZACION.tope_años);
  
  // 30 días de sueldo por año
  const diasIndemnizacion = añosTopeados * INDEMNIZACION.dias_por_año;
  
  // Sueldo diario
  const sueldoDiario = ultimoSueldo / 30;
  
  return diasIndemnizacion * sueldoDiario;
}

/**
 * Calcula vacaciones proporcionales
 */
function calcularVacacionesProporcionales(
  ultimoSueldo: number,
  mesesTrabajados: number,
  diasPendientes: number
): number {
  // Días de vacaciones proporcionales por meses trabajados
  const diasProporcionales = (VACACIONES.dias_anuales / 12) * mesesTrabajados;
  
  // Total días a pagar
  const totalDias = diasProporcionales + diasPendientes;
  
  // Sueldo diario
  const sueldoDiario = ultimoSueldo / 30;
  
  return totalDias * sueldoDiario;
}

/**
 * Calcula gratificación proporcional
 */
function calcularGratificacionProporcional(
  ultimoSueldo: number,
  mesesTrabajados: number,
  tieneGratificacion: boolean
): number {
  if (!tieneGratificacion) {
    return 0;
  }
  
  // Gratificación mensual (25% del sueldo, tope 4.75 IMM)
  const gratificacionMensual = Math.min(
    ultimoSueldo * (GRATIFICACION.porcentaje / 100),
    (INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm) / 12
  );
  
  // Proporcional a meses trabajados
  return (gratificacionMensual / 30) * mesesTrabajados;
}

/**
 * Calcula el finiquito completo
 */
export function calculateFiniquito(input: FiniquitoInput): FiniquitoResult {
  const {
    ultimoSueldo,
    añosTrabajados,
    mesesTrabajados = 0,
    diasVacacionesPendientes = 0,
    causaTermino,
    tieneGratificacion = true,
  } = input;
  
  // Calcular cada componente
  const indemnizacion = calcularIndemnizacion(ultimoSueldo, añosTrabajados, causaTermino);
  const vacacionesProporcionales = calcularVacacionesProporcionales(
    ultimoSueldo,
    mesesTrabajados,
    diasVacacionesPendientes
  );
  const gratificacionProporcional = calcularGratificacionProporcional(
    ultimoSueldo,
    mesesTrabajados,
    tieneGratificacion
  );
  
  // Total finiquito
  const totalFiniquito = indemnizacion + vacacionesProporcionales + gratificacionProporcional;
  
  return {
    ultimoSueldo,
    indemnizacion: Math.round(indemnizacion),
    vacacionesProporcionales: Math.round(vacacionesProporcionales),
    gratificacionProporcional: Math.round(gratificacionProporcional),
    totalFiniquito: Math.round(totalFiniquito),
    desglose: {
      añosIndemnizacion: Math.min(añosTrabajados, INDEMNIZACION.tope_años),
      diasVacaciones: Math.round((VACACIONES.dias_anuales / 12) * mesesTrabajados + diasVacacionesPendientes),
      mesesGratificacion: mesesTrabajados,
    },
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function finiquitoToResults(result: FiniquitoResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  // Resultado principal
  results.push({
    label: 'Total Finiquito',
    value: result.totalFiniquito,
    format: 'CLP',
    highlight: true,
  });
  
  // Desglose
  if (result.indemnizacion > 0) {
    results.push({
      label: `Indemnización (${result.desglose.añosIndemnizacion} años)`,
      value: result.indemnizacion,
      format: 'CLP',
    });
  }
  
  results.push({
    label: `Vacaciones (${result.desglose.diasVacaciones} días)`,
    value: result.vacacionesProporcionales,
    format: 'CLP',
  });
  
  if (result.gratificacionProporcional > 0) {
    results.push({
      label: 'Gratificación Proporcional',
      value: result.gratificacionProporcional,
      format: 'CLP',
    });
  }
  
  results.push({
    label: 'Último Sueldo Bruto',
    value: result.ultimoSueldo,
    format: 'CLP',
  });
  
  return results;
}
