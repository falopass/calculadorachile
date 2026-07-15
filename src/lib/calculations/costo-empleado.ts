// ============================================
// Costo mensual de contratación para empleadores 2026
// ============================================

import {
  AFP,
  AFP_OBLIGATORIA_PCT,
  GRATIFICACION,
  INGRESO_MINIMO,
  MUTUAL,
  SALUD,
  SEGURO_CESANTIA,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type PeriodoCotizacionEmpleador = 'hasta_julio_2026' | 'desde_agosto_2026';

export interface CostoEmpleadoInput {
  sueldoBruto: number;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  contratoIndefinido: boolean;
  agregarGratificacion: boolean;
  periodoCotizacion: PeriodoCotizacionEmpleador;
}

export interface CostoEmpleadoResult {
  sueldoBruto: number;
  gratificacion: number;
  totalHaberesImponibles: number;
  periodoCotizacion: PeriodoCotizacionEmpleador;
  descuentosTrabajador: { afp: number; salud: number; seguroCesantia: number };
  aportesEmpleador: {
    pensionReforma: number;
    sisSeparado: number;
    seguroCesantia: number;
    mutual: number;
  };
  costoTotalMensual: number;
  costoTotalAnual: number;
  factorCosto: number;
}

/**
 * Entre agosto de 2025 y julio de 2026, el empleador paga 1% por la reforma
 * previsional y el SIS vigente por separado (1,62% desde abril de 2026).
 * Desde remuneraciones de agosto de 2026, la carga previsional total es 3,5%:
 * 1% ya vigente más 2,5% destinado al FAPP, que incluye el financiamiento SIS.
 */
export function calculateCostoEmpleado(input: CostoEmpleadoInput): CostoEmpleadoResult {
  const sueldoBruto = Math.max(0, input.sueldoBruto);
  const topeGratificacionMensual = (INGRESO_MINIMO.mensual * 4.75) / 12;
  const gratificacion = input.agregarGratificacion
    ? Math.min(sueldoBruto * (GRATIFICACION.porcentaje / 100), topeGratificacionMensual)
    : 0;
  const totalHaberesImponibles = sueldoBruto + gratificacion;
  const afp = AFP[input.afp] ?? AFP.uno;

  const descuentoAFP =
    totalHaberesImponibles * ((AFP_OBLIGATORIA_PCT + afp.comision) / 100);
  const tasaSalud =
    input.saludTipo === 'fonasa' ? SALUD.fonasa.tasa : SALUD.isapre.tasa_minima;
  const descuentoSalud = totalHaberesImponibles * (tasaSalud / 100);
  const descuentoCesantia = input.contratoIndefinido
    ? totalHaberesImponibles * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100)
    : 0;

  const desdeAgosto = input.periodoCotizacion === 'desde_agosto_2026';
  const pensionReforma = totalHaberesImponibles * ((desdeAgosto ? 3.5 : 1) / 100);
  const sisSeparado = desdeAgosto ? 0 : totalHaberesImponibles * (afp.sis / 100);
  const seguroCesantia = input.contratoIndefinido
    ? totalHaberesImponibles * (SEGURO_CESANTIA.contrato_indefinido.empleador / 100)
    : totalHaberesImponibles * (SEGURO_CESANTIA.contrato_plazo_fijo.empleador / 100);
  const mutual = totalHaberesImponibles * (MUTUAL.total_referencial / 100);
  const costoTotalMensual =
    totalHaberesImponibles + pensionReforma + sisSeparado + seguroCesantia + mutual;

  return {
    sueldoBruto: Math.round(sueldoBruto),
    gratificacion: Math.round(gratificacion),
    totalHaberesImponibles: Math.round(totalHaberesImponibles),
    periodoCotizacion: input.periodoCotizacion,
    descuentosTrabajador: {
      afp: Math.round(descuentoAFP),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(descuentoCesantia),
    },
    aportesEmpleador: {
      pensionReforma: Math.round(pensionReforma),
      sisSeparado: Math.round(sisSeparado),
      seguroCesantia: Math.round(seguroCesantia),
      mutual: Math.round(mutual),
    },
    costoTotalMensual: Math.round(costoTotalMensual),
    costoTotalAnual: Math.round(costoTotalMensual * 12),
    factorCosto: sueldoBruto > 0 ? Math.round((costoTotalMensual / sueldoBruto) * 100) / 100 : 0,
  };
}

export function costoEmpleadoToResults(result: CostoEmpleadoResult): CalculatorResult[] {
  const aportes = result.aportesEmpleador;
  return [
    { label: 'Costo mensual estimado', value: result.costoTotalMensual, format: 'CLP', highlight: true },
    { label: 'Costo anual estimado', value: result.costoTotalAnual, format: 'CLP' },
    { label: 'Haberes imponibles', value: result.totalHaberesImponibles, format: 'CLP' },
    { label: 'Gratificación agregada', value: result.gratificacion, format: 'CLP' },
    { label: 'Cotización previsional del empleador', value: aportes.pensionReforma, format: 'CLP' },
    { label: 'SIS separado', value: aportes.sisSeparado, format: 'CLP' },
    { label: 'Seguro de cesantía del empleador', value: aportes.seguroCesantia, format: 'CLP' },
    { label: 'Mutual de seguridad estimada', value: aportes.mutual, format: 'CLP' },
    { label: 'Factor costo / sueldo', value: result.factorCosto, format: 'number' },
  ];
}
