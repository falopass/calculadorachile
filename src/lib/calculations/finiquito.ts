// ============================================
// Cálculo de Finiquito Chile
// ============================================

import { INDEMNIZACION, VACACIONES, GRATIFICACION, INGRESO_MINIMO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

/**
 * Recargos por despido injustificado (Art. 168 CdT) sobre la
 * indemnización por años de servicio:
 *
 *   - Necesidades de la empresa (Art. 161): +30%
 *   - Falta de probidad / vías de hecho (Art. 160): +80%
 *   - Causales no demostradas (Art. 159 N°4): +50%
 *   - Aplicación indebida del Art. 161: +100%
 *
 * El recargo va sobre la indemnización por años, NO sobre el sueldo.
 */
export type RecargoArt168 = 0 | 30 | 50 | 80 | 100;

export interface FiniquitoInput {
  ultimoSueldo: number;
  añosTrabajados: number;
  mesesTrabajados?: number;
  diasVacacionesPendientes?: number;
  causaTermino:
    | 'renuncia'
    | 'despido'
    | 'mutuo_acuerdo'
    | 'necesidades_empresa'
    | 'incumplimiento'
    | 'vencimiento_plazo'
    | 'obra_faena'
    | 'caso_fortuito'
    | 'muerte_trabajador'
    | 'jubilacion';
  tieneGratificacion?: boolean;
  horasExtraPromedio?: number;
  bonosHabituales?: number;
  diasTrabajadosUltimoMes?: number;
  sueldoBase?: number;
  fechaInicio?: string;
  fechaTermino?: string;
  sueldoVariablePromedio?: number;
  /**
   * Si el despido fue sin aviso previo de 30 días, se debe pagar la
   * indemnización sustitutiva (1 mes de sueldo). Por defecto FALSE
   * (asume que el empleador sí avisó).
   */
  incluyeAvisoPrevio?: boolean;
  /**
   * Recargo Art. 168 sobre la indemnización por años de servicio
   * cuando el juez declara el despido injustificado.
   * Valores válidos: 0 | 30 | 50 | 80 | 100. Por defecto 0.
   */
  recargoArt168Pct?: RecargoArt168;
  mostrarDesgloseFormulas?: boolean;
  tipoContrato?: 'indefinido' | 'plazo_fijo' | 'obra_faena';
  vacacionesAniosAnteriores?: number;
  sueldoPromedio?: number;
  diasAdicionalesConvenio?: number;
}

export interface FiniquitoResult {
  ultimoSueldo: number;
  /** Indemnización por años de servicio (Art. 163 CdT). */
  indemnizacion: number;
  /** Compatibilidad con el campo histórico. */
  indemnizacionAniosServicio: number;
  indemnizacionAvisoPrevio: number;
  vacacionesProporcionales: number;
  vacacionesPendientesAniosAnteriores: number;
  gratificacionProporcional: number;
  sueldoPendiente: number;
  horasExtraPendientes: number;
  bonosPendientes: number;
  /** Recargo Art. 168 (porcentaje sobre la indemnización por años). */
  multaArt168: number;
  recargoArt168Pct: number;
  diasTrabajados: number;
  totalFiniquito: number;
  desglose: {
    añosIndemnizacion: number;
    diasVacaciones: number;
    diasVacacionesAniosAnteriores: number;
    mesesGratificacion: number;
    diasSueldoPendiente: number;
    horasExtraPendientes: number;
    bonosPendientes: number;
    diasTrabajados: number;
    fechaInicio: string;
    fechaTermino: string;
    antiguedadExacta: string;
  };
}

/**
 * Indemnización por años de servicio (Art. 163 CdT). Aplica solo en
 * caso de despido por necesidades de la empresa (causal Art. 161 N°1).
 * Algunas calculadoras también aceptan 'despido' genérico.
 */
function calcularIndemnizacionAniosServicio(
  ultimoSueldo: number,
  añosTrabajados: number,
  causaTermino: FiniquitoInput['causaTermino'],
): number {
  if (causaTermino !== 'necesidades_empresa' && causaTermino !== 'despido') {
    return 0;
  }
  const añosTopeados = Math.min(añosTrabajados, INDEMNIZACION.tope_años);
  const diasIndemnizacion = añosTopeados * INDEMNIZACION.dias_por_año;
  const sueldoDiario = ultimoSueldo / 30;
  return diasIndemnizacion * sueldoDiario;
}

/**
 * Indemnización sustitutiva de aviso previo (Art. 162 CdT): 1 mes de
 * sueldo cuando el empleador no avisa con 30 días de anticipación.
 * Solo aplica para despido por necesidades de la empresa o causal
 * genérica de "despido".
 */
function calcularIndemnizacionAvisoPrevio(
  ultimoSueldo: number,
  causaTermino: FiniquitoInput['causaTermino'],
): number {
  if (causaTermino === 'necesidades_empresa' || causaTermino === 'despido') {
    return ultimoSueldo;
  }
  return 0;
}

function calcularVacacionesProporcionales(
  ultimoSueldo: number,
  mesesTrabajados: number,
  diasPendientes: number,
): number {
  const diasProporcionales = (VACACIONES.dias_anuales / 12) * mesesTrabajados;
  const totalDias = diasProporcionales + diasPendientes;
  const sueldoDiario = ultimoSueldo / 30;
  return totalDias * sueldoDiario;
}

/**
 * Gratificación proporcional. La gratificación legal es ANUAL (25%
 * del sueldo o tope 4,75 IMM, lo menor — Art. 50 CdT). Al término
 * del contrato se paga proporcional a los meses trabajados del año.
 */
function calcularGratificacionProporcional(
  ultimoSueldo: number,
  mesesTrabajados: number,
  tieneGratificacion: boolean,
): number {
  if (!tieneGratificacion || mesesTrabajados <= 0) return 0;
  const topeAnual = INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm;
  const gratificacionAnualPorPorcentaje =
    ultimoSueldo * 12 * (GRATIFICACION.porcentaje / 100);
  const gratificacionAnual = Math.min(gratificacionAnualPorPorcentaje, topeAnual);
  const meses = Math.min(mesesTrabajados, 12);
  return (gratificacionAnual / 12) * meses;
}

function calcularSueldoPendiente(
  ultimoSueldo: number,
  diasTrabajadosUltimoMes: number,
): number {
  if (!diasTrabajadosUltimoMes || diasTrabajadosUltimoMes <= 0) return 0;
  const sueldoDiario = ultimoSueldo / 30;
  return sueldoDiario * diasTrabajadosUltimoMes;
}

function clampRecargo(pct: number): RecargoArt168 {
  if (pct >= 100) return 100;
  if (pct >= 80) return 80;
  if (pct >= 50) return 50;
  if (pct >= 30) return 30;
  return 0;
}

/**
 * Calcula el finiquito completo.
 *
 * Bugs históricos corregidos:
 *  - `multaArt168` era `sueldo × 50%` constante, lo que no corresponde
 *    al Art. 168 CdT. Ahora es un recargo (30/50/80/100%) opcional
 *    sobre la indemnización por años de servicio, opt-in vía
 *    `recargoArt168Pct`.
 *  - `incluyeAvisoPrevio` venía con default `true`, sobreestimando el
 *    finiquito en 1 mes para todos los casos en que el empleador sí
 *    avisó. Ahora el default es `false` (opt-in).
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
    fechaInicio,
    fechaTermino,
    incluyeAvisoPrevio = false,
    recargoArt168Pct = 0,
    vacacionesAniosAnteriores = 0,
    sueldoPromedio = 0,
    diasAdicionalesConvenio = 0,
  } = input;

  const sueldoBaseCalculo = sueldoPromedio > 0 ? sueldoPromedio : ultimoSueldo;

  // Indemnización por años de servicio (Art. 163).
  const indemnizacion = calcularIndemnizacionAniosServicio(
    sueldoBaseCalculo,
    añosTrabajados,
    causaTermino,
  );

  // Aviso previo opt-in (Art. 162).
  const indemnizacionAvisoPrevio = incluyeAvisoPrevio
    ? calcularIndemnizacionAvisoPrevio(sueldoBaseCalculo, causaTermino)
    : 0;

  // Vacaciones (Art. 67) + posibles días adicionales por convenio.
  const vacacionesProporcionales = calcularVacacionesProporcionales(
    sueldoBaseCalculo,
    mesesTrabajados,
    diasVacacionesPendientes + diasAdicionalesConvenio,
  );

  const gratificacionProporcional = calcularGratificacionProporcional(
    sueldoBaseCalculo,
    mesesTrabajados,
    tieneGratificacion,
  );

  const sueldoPendiente = calcularSueldoPendiente(
    sueldoBaseCalculo,
    diasTrabajadosUltimoMes,
  );

  const horasExtraPendientes = horasExtraPromedio || 0;
  const bonosPendientes = bonosHabituales || 0;

  // Recargo Art. 168 sobre la indemnización por años (no sobre el sueldo).
  const recargoPct = clampRecargo(recargoArt168Pct);
  const multaArt168 = indemnizacion * (recargoPct / 100);

  const vacacionesPendientesAniosAnteriores =
    (vacacionesAniosAnteriores || 0) * (sueldoBaseCalculo / 30);

  const totalFiniquito =
    indemnizacion +
    indemnizacionAvisoPrevio +
    vacacionesProporcionales +
    gratificacionProporcional +
    sueldoPendiente +
    horasExtraPendientes +
    bonosPendientes +
    multaArt168 +
    vacacionesPendientesAniosAnteriores;

  let antiguedadExacta = `${añosTrabajados} años`;
  if (mesesTrabajados > 0) {
    antiguedadExacta += ` y ${mesesTrabajados} meses`;
  }

  const indemnizacionRedondeada = Math.round(indemnizacion);

  return {
    ultimoSueldo: sueldoBaseCalculo,
    indemnizacion: indemnizacionRedondeada,
    indemnizacionAniosServicio: indemnizacionRedondeada,
    indemnizacionAvisoPrevio: Math.round(indemnizacionAvisoPrevio),
    vacacionesProporcionales: Math.round(vacacionesProporcionales),
    vacacionesPendientesAniosAnteriores: Math.round(vacacionesPendientesAniosAnteriores),
    gratificacionProporcional: Math.round(gratificacionProporcional),
    sueldoPendiente: Math.round(sueldoPendiente),
    horasExtraPendientes: Math.round(horasExtraPendientes),
    bonosPendientes: Math.round(bonosPendientes),
    multaArt168: Math.round(multaArt168),
    recargoArt168Pct: recargoPct,
    diasTrabajados: diasTrabajadosUltimoMes,
    totalFiniquito: Math.round(totalFiniquito),
    desglose: {
      añosIndemnizacion: Math.min(añosTrabajados, INDEMNIZACION.tope_años),
      diasVacaciones: Math.round(
        (VACACIONES.dias_anuales / 12) * mesesTrabajados +
          diasVacacionesPendientes +
          diasAdicionalesConvenio,
      ),
      diasVacacionesAniosAnteriores: vacacionesAniosAnteriores || 0,
      mesesGratificacion: mesesTrabajados,
      diasSueldoPendiente: diasTrabajadosUltimoMes,
      horasExtraPendientes: horasExtraPromedio,
      bonosPendientes: bonosHabituales,
      diasTrabajados: diasTrabajadosUltimoMes,
      fechaInicio: fechaInicio || '',
      fechaTermino: fechaTermino || '',
      antiguedadExacta,
    },
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function finiquitoToResults(result: FiniquitoResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Total Finiquito',
    value: result.totalFiniquito,
    format: 'CLP',
    highlight: true,
  });

  if (result.indemnizacion > 0) {
    results.push({
      label: `Indemnización por años de servicio (${result.desglose.añosIndemnizacion} años)`,
      value: result.indemnizacion,
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

  if (result.vacacionesPendientesAniosAnteriores > 0) {
    results.push({
      label: `Vacaciones pendientes años anteriores (${result.desglose.diasVacacionesAniosAnteriores} días)`,
      value: result.vacacionesPendientesAniosAnteriores,
      format: 'CLP',
    });
  }

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

  if (result.multaArt168 > 0) {
    results.push({
      label: `Recargo Art. 168 (+${result.recargoArt168Pct}% sobre indemnización)`,
      value: result.multaArt168,
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
