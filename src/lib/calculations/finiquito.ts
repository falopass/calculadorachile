// ============================================
// Cálculo de Finiquito Chile
// ============================================

import {
  INDEMNIZACION,
  VACACIONES,
  GRATIFICACION,
  INGRESO_MINIMO,
  UF,
  RECARGO_ART_168,
} from '@/lib/values/constants';
import type { CalculatorResult, CalculatorResultNote } from '@/types/calculator';
import { calculateVacaciones } from './vacaciones';

/**
 * Recargos por despido injustificado (Art. 168 CdT) sobre la
 * indemnización por años de servicio. Definidos en
 * `RECARGO_ART_168` en constants.ts.
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
    /** true si el feriado se proyectó a días corridos con la fecha de término. */
    feriadoEnDiasCorridos: boolean;
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
 *
 * Aplica el tope de 90 UF mensuales (Art. 172 CdT) sobre la base de
 * cálculo antes de multiplicar por años.
 */
/**
 * Años que cuentan para la indemnización (Art. 163 inc. 2 CdT), antes del
 * tope: con menos de 1 año no hay indemnización; desde 1 año, la fracción
 * superior a 6 meses cuenta como 1 año adicional.
 *  - Años enteros + meses: se suma 1 si los meses son más de 6.
 *  - Años con decimales (la fracción ya viene incluida y no se suman los
 *    meses otra vez): parte entera + 1 si la fracción es mayor a 0,5.
 *    Ej.: 1,5 → 1; 1,8 → 2; 0,9 → 0.
 * Fuente: https://www.bcn.cl/leychile/navegar?idNorma=207436
 */
export function añosArt163SinTope(añosTrabajados: number, mesesTrabajados = 0): number {
  if (!(añosTrabajados >= 1)) return 0;
  if (Number.isInteger(añosTrabajados)) {
    return mesesTrabajados > 6 ? añosTrabajados + 1 : añosTrabajados;
  }
  const enteros = Math.floor(añosTrabajados);
  return añosTrabajados - enteros > 0.5 ? enteros + 1 : enteros;
}

/** Años indemnizables (Art. 163) con el tope de 11 años aplicado después. */
export function calcularAñosIndemnizacion(añosTrabajados: number, mesesTrabajados: number): number {
  return Math.min(añosArt163SinTope(añosTrabajados, mesesTrabajados), INDEMNIZACION.tope_años);
}

function calcularIndemnizacionAniosServicio(
  ultimoSueldo: number,
  añosTrabajados: number,
  mesesTrabajados: number,
  causaTermino: FiniquitoInput['causaTermino'],
): number {
  if (causaTermino !== 'necesidades_empresa' && causaTermino !== 'despido') {
    return 0;
  }
  // Tope 90 UF mensual (Art. 172 CdT)
  const topeMensual = INDEMNIZACION.tope_uf_mensual * UF.valor;
  const baseTopeada = Math.min(ultimoSueldo, topeMensual);
  const añosTopeados = calcularAñosIndemnizacion(añosTrabajados, mesesTrabajados);
  const diasIndemnizacion = añosTopeados * INDEMNIZACION.dias_por_año;
  const sueldoDiario = baseTopeada / 30;
  return diasIndemnizacion * sueldoDiario;
}

/**
 * Indemnización sustitutiva de aviso previo (Art. 162 CdT): 1 mes de
 * sueldo cuando el empleador no avisa con 30 días de anticipación.
 * Solo aplica para despido por necesidades de la empresa o causal
 * genérica de "despido". Tope de 90 UF (Art. 172 inciso final CdT).
 */
function calcularIndemnizacionAvisoPrevio(
  ultimoSueldo: number,
  causaTermino: FiniquitoInput['causaTermino'],
): number {
  if (causaTermino === 'necesidades_empresa' || causaTermino === 'despido') {
    // Tope 90 UF (Art. 172 inciso final CdT)
    const topeMensual = INDEMNIZACION.tope_uf_mensual * UF.valor;
    return Math.min(ultimoSueldo, topeMensual);
  }
  return 0;
}

/**
 * Feriado proporcional (Art. 73 CdT). Reutiliza el cálculo de la
 * calculadora de vacaciones proporcionales: con fecha de término, los días
 * hábiles se proyectan desde el día siguiente al término y se suman los
 * sábados, domingos y feriados nacionales que caen en el período
 * (DT: https://www.dt.gob.cl/portal/1628/w3-article-60200.html). Sin fecha
 * válida, se pagan los días hábiles sin proyectar.
 */
/** Acepta solo fechas AAAA-MM-DD que existen en el calendario (rechaza 2026-02-30). */
function fechaTerminoValida(fecha?: string): string | undefined {
  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return undefined;
  const d = new Date(`${fecha}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === fecha ? fecha : undefined;
}

function calcularVacacionesProporcionales(
  ultimoSueldo: number,
  mesesTrabajados: number,
  diasPendientes: number,
  fechaTermino?: string,
) {
  return calculateVacaciones({
    sueldoBruto: ultimoSueldo,
    mesesTrabajados,
    diasVacacionesPendientes: diasPendientes,
    fechaTermino: fechaTerminoValida(fechaTermino),
  });
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
  if (pct >= RECARGO_ART_168.aplicacion_indebida) return 100;
  if (pct >= RECARGO_ART_168.falta_probidad) return 80;
  if (pct >= RECARGO_ART_168.causal_no_demostrada) return 50;
  if (pct >= RECARGO_ART_168.necesidades_empresa) return 30;
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
    mesesTrabajados,
    causaTermino,
  );

  // Aviso previo opt-in (Art. 162).
  const indemnizacionAvisoPrevio = incluyeAvisoPrevio
    ? calcularIndemnizacionAvisoPrevio(sueldoBaseCalculo, causaTermino)
    : 0;

  // Vacaciones (Art. 67) + posibles días adicionales por convenio.
  const feriado = calcularVacacionesProporcionales(
    sueldoBaseCalculo,
    mesesTrabajados,
    diasVacacionesPendientes + diasAdicionalesConvenio,
    fechaTermino,
  );
  const vacacionesProporcionales = feriado.totalVacaciones;

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
      añosIndemnizacion: calcularAñosIndemnizacion(añosTrabajados, mesesTrabajados),
      diasVacaciones: feriado.calendarioAplicado
        ? feriado.diasCorridosIndemnizables
        : Math.round(
            (VACACIONES.dias_anuales / 12) * mesesTrabajados +
              diasVacacionesPendientes +
              diasAdicionalesConvenio,
          ),
      feriadoEnDiasCorridos: feriado.calendarioAplicado,
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
 * Nota que acompaña al feriado proporcional cuando no se ingresó fecha de
 * término y el monto queda en días hábiles (aprobada por Diego, 20-10-2026).
 */
export const NOTA_FERIADO_DIAS_HABILES: CalculatorResultNote = {
  text:
    'Este monto está en días hábiles. La Dirección del Trabajo ordena contarlos desde el día siguiente al término y sumar sábados, domingos y festivos, así que el monto real es mayor. Calcula el exacto en la ',
  linkText: 'calculadora de vacaciones proporcionales',
  href: '/calculadoras/calculadora-vacaciones-proporcionales',
  textAfter: '.',
  source: {
    name: 'Dirección del Trabajo',
    url: 'https://www.dt.gob.cl/portal/1628/w3-article-60200.html',
  },
};

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
    label: `Vacaciones proporcionales (${String(result.desglose.diasVacaciones).replace('.', ',')} días${
      result.desglose.feriadoEnDiasCorridos ? ' corridos' : ''
    })`,
    value: result.vacacionesProporcionales,
    format: 'CLP',
    ...(result.desglose.feriadoEnDiasCorridos ? {} : { note: NOTA_FERIADO_DIAS_HABILES }),
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
