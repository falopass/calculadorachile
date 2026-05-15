// ============================================
// Cálculo de Costo Total Empleado para PYME Chile 2026
// ============================================

import { AFP, SALUD, SEGURO_CESANTIA, GRATIFICACION } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface CostoEmpleadoInput {
  sueldoBruto: number;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  contratoIndefinido: boolean;
  gratificacionIncluida: boolean;
  horasExtra: number;
  montoHorasExtra: number;
}

export interface CostoEmpleadoResult {
  sueldoBruto: number;
  gratificacion: number;
  totalHaberes: number;
  descuentosLegales: {
    afp: number;
    salud: number;
    seguroCesantia: number;
  };
  aportesEmpleador: {
    seguroCesantia: number;
    sis: number;
    mutual: number;
  };
  costoTotalMensual: number;
  costoTotalAnual: number;
  factorPrevisional: number;
}

/**
 * Tasa de mutual de seguridad (Ley 16.744). Cotización básica fija
 * del 0,90% + cotización adicional variable según giro (0% a 3,4%).
 * Se usa el mínimo legal como aproximación razonable.
 */
const MUTUAL_TASA = 0.95;

/**
 * Calcula el costo total de un empleado para la empresa.
 *
 * Bug histórico: la versión anterior duplicaba el 10% de AFP (lo
 * descontaba al trabajador y lo sumaba como aporte del empleador),
 * y duplicaba el 7% de salud al sumarlo como aporte empleador.
 * Ambos descuentos los paga íntegramente el trabajador. El empleador
 * sólo aporta SIS, seguro de cesantía y mutual de seguridad.
 *
 * Bases legales:
 *  - 10% AFP del trabajador: D.L. 3500 Art. 17.
 *  - SIS lo paga el empleador: Ley 20.255.
 *  - Mutual de seguridad: Ley 16.744.
 *  - Seguro de cesantía: Ley 19.728.
 *
 * @param input Datos para el cálculo.
 * @returns Desglose completo del costo empleador.
 */
export function calculateCostoEmpleado(input: CostoEmpleadoInput): CostoEmpleadoResult {
  const {
    sueldoBruto,
    afp,
    saludTipo,
    contratoIndefinido,
    gratificacionIncluida,
    horasExtra,
    montoHorasExtra,
  } = input;

  // Gratificación legal mensualizada (tope 4,75 IMM/12 ya considerado en
  // la calculadora de gratificación). Aquí se usa el 25% directo si el
  // empleador la incluye en el sueldo. El detalle exacto vive en
  // calculations/gratificacion.ts.
  const gratificacion = gratificacionIncluida
    ? sueldoBruto * (GRATIFICACION.porcentaje / 100)
    : 0;

  const totalHaberes = sueldoBruto + gratificacion;

  // ---------- Descuentos del trabajador ----------
  const afpData = AFP[afp];
  // 10% obligatorio + comisión variable (esta última también la paga el trabajador)
  const descuentoAFP = totalHaberes * (10 / 100 + afpData.comision / 100);

  let descuentoSalud: number;
  if (saludTipo === 'fonasa') {
    descuentoSalud = totalHaberes * (SALUD.fonasa.tasa / 100);
  } else {
    descuentoSalud = totalHaberes * 0.07;
  }

  const descuentoSeguroCesantia = contratoIndefinido
    ? totalHaberes * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100)
    : 0;

  // ---------- Aportes del empleador ----------
  // El empleador paga SIS, seguro de cesantía empleador y mutual.
  // NO paga el 10% AFP ni el 7% salud (esos son del trabajador).
  const aporteSIS = totalHaberes * (afpData.sis / 100);
  const aporteSeguroCesantia = contratoIndefinido
    ? totalHaberes * (SEGURO_CESANTIA.contrato_indefinido.empleador / 100)
    : totalHaberes * (SEGURO_CESANTIA.contrato_plazo_fijo.empleador / 100);
  const aporteMutual = totalHaberes * (MUTUAL_TASA / 100);

  const totalAportesEmpleador = aporteSIS + aporteSeguroCesantia + aporteMutual;

  // Horas extra (pagadas además del sueldo bruto)
  const pagoHorasExtra = horasExtra * montoHorasExtra;

  // Costo mensual: sueldo bruto + gratificación + aportes empleador + horas extra
  const costoTotalMensual = totalHaberes + totalAportesEmpleador + pagoHorasExtra;
  const costoTotalAnual = costoTotalMensual * 12;

  const factorPrevisional = sueldoBruto > 0 ? costoTotalMensual / sueldoBruto : 0;

  return {
    sueldoBruto,
    gratificacion: Math.round(gratificacion),
    totalHaberes: Math.round(totalHaberes),
    descuentosLegales: {
      afp: Math.round(descuentoAFP),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(descuentoSeguroCesantia),
    },
    aportesEmpleador: {
      seguroCesantia: Math.round(aporteSeguroCesantia),
      sis: Math.round(aporteSIS),
      mutual: Math.round(aporteMutual),
    },
    costoTotalMensual: Math.round(costoTotalMensual),
    costoTotalAnual: Math.round(costoTotalAnual),
    factorPrevisional: Math.round(factorPrevisional * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function costoEmpleadoToResults(result: CostoEmpleadoResult): CalculatorResult[] {
  const totalAportes =
    result.aportesEmpleador.sis +
    result.aportesEmpleador.seguroCesantia +
    result.aportesEmpleador.mutual;

  return [
    {
      label: 'Costo Total Mensual',
      value: result.costoTotalMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Costo Total Anual',
      value: result.costoTotalAnual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Factor Previsional (costo / sueldo)',
      value: result.factorPrevisional,
      format: 'number',
    },
    {
      label: 'Sueldo Bruto',
      value: result.sueldoBruto,
      format: 'CLP',
    },
    {
      label: 'Gratificación',
      value: result.gratificacion,
      format: 'CLP',
    },
    {
      label: 'Total Haberes',
      value: result.totalHaberes,
      format: 'CLP',
    },
    {
      label: 'Aportes Empleador (SIS + Cesantía + Mutual)',
      value: totalAportes,
      format: 'CLP',
    },
    {
      label: 'SIS Empleador',
      value: result.aportesEmpleador.sis,
      format: 'CLP',
    },
    {
      label: 'Seguro Cesantía Empleador',
      value: result.aportesEmpleador.seguroCesantia,
      format: 'CLP',
    },
    {
      label: 'Mutual de Seguridad',
      value: result.aportesEmpleador.mutual,
      format: 'CLP',
    },
  ];
}
