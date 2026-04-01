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
  causaTermino: 'renuncia' | 'despido' | 'mutuo_acuerdo' | 'necesidades_empresa' | 'incumplimiento' | 'vencimiento_plazo' | 'obra_faena' | 'caso_fortuito' | 'muerte_trabajador' | 'jubilacion';
  tieneGratificacion?: boolean;
  horasExtraPromedio?: number; // Promedio últ 3 meses
  bonosHabituales?: number; // Promedio últ 3 meses
  diasTrabajadosUltimoMes?: number; // Días trabajados en el mes de término
  sueldoBase?: number; // Sueldo base sin bonificaciones
}

export interface FiniquitoResult {
  ultimoSueldo: number;
  indemnizacionAniosServicio: number;
  indemnizacionAvisoPrevio: number;
  vacacionesProporcionales: number;
  gratificacionProporcional: number;
  sueldoPendiente: number;
  horasExtraPendientes: number;
  bonosPendientes: number;
  totalFiniquito: number;
  desglose: {
    añosIndemnizacion: number;
    diasVacaciones: number;
    mesesGratificacion: number;
    diasSueldoPendiente: number;
    horasExtraPendientes: number;
    bonosPendientes: number;
  };
}

/**
 * Calcula la indemnización por años de servicio según Art. 163 del Código del Trabajo
 * Aplica solo para despido por necesidades de la empresa (Art. 161 N° 1)
 */
function calcularIndemnizacionAniosServicio(
  ultimoSueldo: number,
  añosTrabajados: number,
  causaTermino: FiniquitoInput['causaTermino']
): number {
  // Solo se paga indemnización por años de servicio en caso de despido por necesidades de la empresa
  if (causaTermino !== 'necesidades_empresa' && causaTermino !== 'despido') {
    return 0;
  }
  
  // Tope de 11 años (330 días)
  const añosTopeados = Math.min(añosTrabajados, INDEMNIZACION.tope_años);
  
  // 30 días de sueldo por año
  const diasIndemnizacion = añosTopeados * INDEMNIZACION.dias_por_año;
  
  // Sueldo diario (última remuneración mensual / 30)
  const sueldoDiario = ultimoSueldo / 30;
  
  return diasIndemnizacion * sueldoDiario;
}

/**
 * Calcula la indemnización sustitutiva del aviso previo según Art. 168 del Código del Trabajo
 * Aplica cuando se despide sin dar aviso previo de 30 días
 */
function calcularIndemnizacionAvisoPrevio(
  ultimoSueldo: number,
  causaTermino: FiniquitoInput['causaTermino']
): number {
  // Se paga aviso previo en caso de despido por necesidades de la empresa
  if (causaTermino === 'necesidades_empresa' || causaTermino === 'despido') {
    return ultimoSueldo; // Equivale a 1 mes de sueldo
  }
  
  return 0;
}

/**
 * Calcula vacaciones proporcionales según Art. 171 del Código del Trabajo
 * Se pagan en todos los casos de término de contrato
 */
function calcularVacacionesProporcionales(
  ultimoSueldo: number,
  mesesTrabajados: number,
  diasPendientes: number
): number {
  // Días de vacaciones proporcionales por meses trabajados
  // 15 días hábiles anuales / 12 meses * meses trabajados
  const diasProporcionales = (VACACIONES.dias_anuales / 12) * mesesTrabajados;
  
  // Total días a pagar (proporcionales + pendientes)
  const totalDias = diasProporcionales + diasPendientes;
  
  // Sueldo diario
  const sueldoDiario = ultimoSueldo / 30;
  
  return totalDias * sueldoDiario;
}

/**
 * Calcula gratificación proporcional
 * Aplica si el contrato contempla gratificación
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
  return (gratificacionMensual / 30) * (mesesTrabajados * 30); // Convertimos meses a días
}

/**
 * Calcula sueldo pendiente del último mes
 */
function calcularSueldoPendiente(
  ultimoSueldo: number,
  diasTrabajadosUltimoMes: number
): number {
  if (!diasTrabajadosUltimoMes || diasTrabajadosUltimoMes <= 0) {
    return 0;
  }
  
  // Sueldo diario
  const sueldoDiario = ultimoSueldo / 30;
  
  return sueldoDiario * diasTrabajadosUltimoMes;
}

/**
 * Calcula horas extras pendientes
 */
function calcularHorasExtraPendientes(horasExtraPromedio: number): number {
  return horasExtraPromedio || 0;
}

/**
 * Calcula bonos pendientes
 */
function calcularBonosPendientes(bonosHabituales: number): number {
  return bonosHabituales || 0;
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
    horasExtraPromedio = 0,
    bonosHabituales = 0,
    diasTrabajadosUltimoMes = 0,
  } = input;
  
  // Calcular cada componente
  const indemnizacionAniosServicio = calcularIndemnizacionAniosServicio(ultimoSueldo, añosTrabajados, causaTermino);
  const indemnizacionAvisoPrevio = calcularIndemnizacionAvisoPrevio(ultimoSueldo, causaTermino);
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
  const sueldoPendiente = calcularSueldoPendiente(ultimoSueldo, diasTrabajadosUltimoMes);
  const horasExtraPendientes = calcularHorasExtraPendientes(horasExtraPromedio);
  const bonosPendientes = calcularBonosPendientes(bonosHabituales);
  
  // Total finiquito
  const totalFiniquito = indemnizacionAniosServicio + indemnizacionAvisoPrevio + vacacionesProporcionales + 
                          gratificacionProporcional + sueldoPendiente + horasExtraPendientes + bonosPendientes;
  
  return {
    ultimoSueldo,
    indemnizacionAniosServicio: Math.round(indemnizacionAniosServicio),
    indemnizacionAvisoPrevio: Math.round(indemnizacionAvisoPrevio),
    vacacionesProporcionales: Math.round(vacacionesProporcionales),
    gratificacionProporcional: Math.round(gratificacionProporcional),
    sueldoPendiente: Math.round(sueldoPendiente),
    horasExtraPendientes: Math.round(horasExtraPendientes),
    bonosPendientes: Math.round(bonosPendientes),
    totalFiniquito: Math.round(totalFiniquito),
    desglose: {
      añosIndemnizacion: Math.min(añosTrabajados, INDEMNIZACION.tope_años),
      diasVacaciones: Math.round((VACACIONES.dias_anuales / 12) * mesesTrabajados + diasVacacionesPendientes),
      mesesGratificacion: mesesTrabajados,
      diasSueldoPendiente: diasTrabajadosUltimoMes,
      horasExtraPendientes: horasExtraPromedio,
      bonosPendientes: bonosHabituales,
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
  if (result.indemnizacionAniosServicio > 0) {
    results.push({
      label: `Indemnización por años de servicio (${result.desglose.añosIndemnizacion} años)`,
      value: result.indemnizacionAniosServicio,
      format: 'CLP',
    });
  }
  
  if (result.indemnizacionAvisoPrevio > 0) {
    results.push({
      label: 'Indemnización sustitutiva del aviso previo',
      value: result.indemnizacionAvisoPrevio,
      format: 'CLP',
    });
  }
  
  results.push({
    label: `Vacaciones proporcionales (${result.desglose.diasVacaciones} días)`,
    value: result.vacacionesProporcionales,
    format: 'CLP',
  });
  
  if (result.gratificacionProporcional > 0) {
    results.push({
      label: 'Gratificación proporcional',
      value: result.gratificacionProporcional,
      format: 'CLP',
    });
  }
  
  if (result.sueldoPendiente > 0) {
    results.push({
      label: `Sueldo pendiente (${result.desglose.diasSueldoPendiente} días)`,
      value: result.sueldoPendiente,
      format: 'CLP',
    });
  }
  
  if (result.horasExtraPendientes > 0) {
    results.push({
      label: 'Horas extra pendientes',
      value: result.horasExtraPendientes,
      format: 'CLP',
    });
  }
  
  if (result.bonosPendientes > 0) {
    results.push({
      label: 'Bonos pendientes',
      value: result.bonosPendientes,
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
