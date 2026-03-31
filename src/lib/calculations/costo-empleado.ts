// ============================================
// Cálculo de Costo Total Empleado para PYME Chile 2026
// ============================================

import { AFP, SALUD, SEGURO_CESANTIA, GRATIFICACION, INGRESO_MINIMO, UF } from '@/lib/values/constants';
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
    sis: number;
  },
  aportesEmpleador: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    sis: number;
  },
  costoTotalMensual: number;
  costoTotalAnual: number;
  factorPrecacional: number;
}

/**
 * Calcula el costo total de un empleado para la empresa (coto empleador)
 * 
 * Incluye todos los descuentos legales y beneficios que debe pagar el empleador
 * además del sueldo bruto:
 * - AFP: 10% + comisión (varía por AFP)
 * - Salud: 7% (FONASA o Isapre)
 * - Seguro de Cesantía: 2.4% (empleador, contrato indefinido)
 * - SIS: 1.15% (empleador, * - Gratificación: hasta 25% o 4.75% del sueldo mínimo anual
 * 
 * @param input - Datos para el cálculo
 * @returns Desglose completo del costo empleado
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
  
  const valorUF = UF.valor;
  
  // Calcular gratificación si está incluida
  const gratificacion = gratificacionIncluida
    ? sueldoBruto * (GRATIFICACION.porcentaje / 100)
    : 0;
  
  // Calcular total haberes (sueldo + gratificación)
  const totalHaberes = sueldoBruto + gratificacion;
  
  // Descuentos legales (aportes del trabajador)
  const afpData = AFP[afp];
  const descuentoAFP = totalHaberes * (10 / 100); // 10% cotización
  const descuentoSIS = totalHaberes * (afpData.sis / 100); // SIS
  
  
  // Salud
  let descuentoSalud: number;
  if (saludTipo === 'fonasa') {
    descuentoSalud = totalHaberes * (SALUD.fonasa.tasa / 100);
  } else {
    // Isapre: mínimo 7% del total haberes
    descuentoSalud = totalHaberes * 0.07;
  }
  
  // Seguro de cesantía (aporte del trabajador)
  const descuentoSeguroCesantia = contratoIndefinido
    ? totalHaberes * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100)
    : 0;
  
  // Total descuentos legales del trabajador
  const totalDescuentosTrabajador = descuentoAFP + descuentoSalud + descuentoSeguroCesantia;
  
  // Aportes del empleador (adicionales a los descuentos del trabajador)
  const aporteAFP = totalHaberes * (10 / 100); // 10% cotización
  const aporteSIS = totalHaberes * (afpData.sis / 100); // SIS (lo paga el empleador)
  const aporteSeguroCesantia = contratoIndefinido
    ? totalHaberes * (SEGURO_CESANTIA.contrato_indefinido.empleador / 100)
    : totalHaberes * (SEGURO_CESANTIA.contrato_plazo_fijo.empleador / 100);
  
  // Total aportes empleador
  const totalAportesEmpleador = aporteAFP + aporteSIS + aporteSeguroCesantia;
  
  // Horas extra (si las hay)
  const pagoHorasExtra = horasExtra * montoHorasExtra;
  
  // Costo total mensual para la empresa
  const costoTotalMensual = totalHaberes + totalAportesEmpleador + pagoHorasExtra;
  
  // Costo total anual
  const costoTotalAnual = costoTotalMensual * 12;
  
  // Factor previsional (cuántas veces el sueldo bruto)
  const factorPrecacional = costoTotalMensual / sueldoBruto;
  
  return {
    sueldoBruto,
    gratificacion: Math.round(gratificacion),
    totalHaberes: Math.round(totalHaberes),
    descuentosLegales: {
      afp: Math.round(descuentoAFP),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(descuentoSeguroCesantia),
      sis: Math.round(descuentoSIS),
    },
    aportesEmpleador: {
      afp: Math.round(aporteAFP),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(aporteSeguroCesantia),
      sis: Math.round(aporteSIS),
    },
    costoTotalMensual: Math.round(costoTotalMensual),
    costoTotalAnual: Math.round(costoTotalAnual),
    factorPrecacional: Math.round(factorPrecacional * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function costoEmpleadoToResults(result: CostoEmpleadoResult): CalculatorResult[] {
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
      label: 'Factor Previsional',
      value: result.factorPrecacional,
      format: 'percentage',
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
      label: 'Desc. Legal Trabajador',
      value: result.descuentosLegales.afp + result.descuentosLegales.salud + result.descuentosLegales.seguroCesantia,
      format: 'CLP',
    },
    {
      label: 'Aportes Empleador',
      value: result.aportesEmpleador.afp + result.aportesEmpleador.salud + result.aportesEmpleador.seguroCesantia,
      format: 'CLP',
    },
  ];
}
