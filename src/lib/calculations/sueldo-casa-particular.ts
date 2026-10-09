// ============================================
// Sueldo de trabajadora de casa particular (nana) Chile 2026
// Mínimo legal según modalidad, líquido y costo del empleador
// ============================================

import {
  AFP,
  CASA_PARTICULAR,
  INGRESO_MINIMO,
  TOPE_IMPOSITIVO,
  UF,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';
import { calculateSueldoLiquido } from './sueldo-liquido';
import { calculateSueldoPartTime } from './sueldo-part-time';

export type ModalidadCasaParticular = 'puertas-afuera' | 'puertas-adentro';

export interface SueldoCasaParticularInput {
  modalidad: ModalidadCasaParticular;
  /** Horas semanales pactadas; solo aplica a puertas afuera (1–42). */
  horasSemanales?: number;
  /** Sueldo bruto mensual pactado en CLP. 0 = no informado (se usa el mínimo legal). */
  sueldoBruto?: number;
  afp: keyof typeof AFP;
  /** UF en vivo (UI). Default: snapshot. */
  valorUF?: number;
  /** UTM en vivo (UI). Default: snapshot. */
  valorUTM?: number;
  /** Mes de la remuneración, para el escalón Ley 21.735. Default: hoy. */
  fecha?: Date;
}

export interface SueldoCasaParticularResult {
  modalidad: ModalidadCasaParticular;
  horasSemanales: number;
  esJornadaParcial: boolean;
  /** Mínimo legal mensual para la modalidad y jornada. */
  minimoLegal: number;
  /** Sueldo bruto usado en el cálculo (pactado o, si no se informó, el mínimo). */
  sueldoBruto: number;
  sueldoInformado: boolean;
  cumpleMinimo: boolean;
  diferencia: number;
  descuentos: { afp: number; salud: number; impuesto: number; total: number };
  liquido: number;
  aportesEmpleador: {
    indemnizacionTodoEvento: number;
    seguroCesantia: number;
    reformaPrevisional: number;
    tasaReforma: number;
    sis: number;
    accidentesTrabajo: number;
    total: number;
  };
  costoTotalMensual: number;
  /** Pago sustitutivo si el empleador despide por desahucio sin 30 días de aviso. */
  indemnizacionSinAviso: number;
}

/**
 * Calcula el sueldo de una trabajadora de casa particular.
 *
 * - Mínimo: ingreso mínimo general (art. 44 inc. 3 CdT, aplicable por
 *   Ley 20.279). Puertas afuera con jornada parcial: mismo cálculo
 *   proporcional que `sueldo-part-time`. Puertas adentro: sin horario
 *   (art. 149), corresponde el IMM íntegro.
 * - Líquido: AFP (10% + comisión), salud 7% e impuesto único, vía
 *   `calculateSueldoLiquido` sin aporte del trabajador al seguro de
 *   cesantía (en casa particular el 3% lo paga entero el empleador).
 * - Empleador: 1,11% indemnización a todo evento (art. 163), 3% seguro
 *   de cesantía, cotización Ley 21.735 (ChileAtiende 133768), SIS si
 *   corresponde y 0,95% de accidentes del trabajo (DT).
 * - Alimentación y habitación son siempre de cargo del empleador y no
 *   se descuentan (art. 151), por eso no hay descuento por especies.
 */
export function calculateSueldoCasaParticular(
  input: SueldoCasaParticularInput,
): SueldoCasaParticularResult {
  const modalidad: ModalidadCasaParticular =
    input.modalidad === 'puertas-adentro' ? 'puertas-adentro' : 'puertas-afuera';
  const valorUF = input.valorUF ?? UF.valor;

  const partTime =
    modalidad === 'puertas-afuera'
      ? calculateSueldoPartTime({ horasSemanales: input.horasSemanales ?? 0 })
      : null;
  const horasSemanales = partTime?.horasSemanales ?? 0;
  const esJornadaParcial = partTime?.esJornadaParcial ?? false;
  const minimoLegal = partTime ? partTime.minimoLegal : INGRESO_MINIMO.mensual;

  const pactado = Math.max(0, input.sueldoBruto ?? 0);
  const sueldoInformado = pactado > 0;
  const sueldoBruto = sueldoInformado ? pactado : minimoLegal;
  const cumpleMinimo = sueldoBruto >= minimoLegal;
  const diferencia = Math.max(0, minimoLegal - sueldoBruto);

  const liquidoBase = calculateSueldoLiquido({
    sueldoBruto,
    afp: input.afp,
    saludTipo: 'fonasa',
    contratoIndefinido: false,
    valorUF,
    valorUTM: input.valorUTM,
    fecha: input.fecha,
  });

  const baseAfp = Math.min(sueldoBruto, TOPE_IMPOSITIVO.afp_salud * valorUF);
  const baseCesantia = Math.min(sueldoBruto, TOPE_IMPOSITIVO.seguro_cesantia * valorUF);
  const tasaCesantia =
    CASA_PARTICULAR.seguro_cesantia_empleador.cuenta_individual +
    CASA_PARTICULAR.seguro_cesantia_empleador.fondo_solidario;

  const indemnizacionTodoEvento = Math.round(
    baseAfp * (CASA_PARTICULAR.indemnizacion_todo_evento / 100),
  );
  const seguroCesantia = Math.round(baseCesantia * (tasaCesantia / 100));
  const { reformaPrevisional, tasaReforma, sis, mutual } = liquidoBase.aportesEmpleador;
  const totalAportes =
    indemnizacionTodoEvento + seguroCesantia + reformaPrevisional + sis + mutual;

  const { afp, salud, impuesto } = liquidoBase.descuentos;

  return {
    modalidad,
    horasSemanales,
    esJornadaParcial,
    minimoLegal,
    sueldoBruto,
    sueldoInformado,
    cumpleMinimo,
    diferencia,
    descuentos: { afp, salud, impuesto, total: afp + salud + impuesto },
    liquido: sueldoBruto - (afp + salud + impuesto),
    aportesEmpleador: {
      indemnizacionTodoEvento,
      seguroCesantia,
      reformaPrevisional,
      tasaReforma,
      sis,
      accidentesTrabajo: mutual,
      total: totalAportes,
    },
    costoTotalMensual: sueldoBruto + totalAportes,
    indemnizacionSinAviso: sueldoBruto,
  };
}

export function sueldoCasaParticularToResults(
  result: SueldoCasaParticularResult,
): CalculatorResult[] {
  const a = result.aportesEmpleador;
  const results: CalculatorResult[] = [
    { label: 'Sueldo líquido estimado', value: result.liquido, format: 'CLP', highlight: true },
    {
      label: result.esJornadaParcial
        ? 'Sueldo mínimo proporcional a la jornada'
        : 'Sueldo mínimo legal',
      value: result.minimoLegal,
      format: 'CLP',
    },
  ];

  if (result.sueldoInformado) {
    results.push({ label: 'Sueldo bruto pactado', value: result.sueldoBruto, format: 'CLP' });
    if (!result.cumpleMinimo) {
      results.push({
        label: 'Diferencia bajo el mínimo legal',
        value: result.diferencia,
        format: 'CLP',
      });
    }
  }

  results.push(
    { label: 'Descuento AFP (10% + comisión)', value: result.descuentos.afp, format: 'CLP' },
    { label: 'Descuento salud (7%)', value: result.descuentos.salud, format: 'CLP' },
  );
  if (result.descuentos.impuesto > 0) {
    results.push({ label: 'Impuesto único', value: result.descuentos.impuesto, format: 'CLP' });
  }

  results.push(
    {
      label: 'Indemnización a todo evento (1,11%, paga el empleador)',
      value: a.indemnizacionTodoEvento,
      format: 'CLP',
    },
    {
      label: 'Seguro de cesantía (3%, paga el empleador)',
      value: a.seguroCesantia,
      format: 'CLP',
    },
    {
      label: `Cotización empleador reforma de pensiones (${a.tasaReforma.toLocaleString('es-CL')}%)`,
      value: a.reformaPrevisional,
      format: 'CLP',
    },
  );
  if (a.sis > 0) {
    results.push({ label: 'SIS (paga el empleador)', value: a.sis, format: 'CLP' });
  }
  results.push(
    {
      label: 'Seguro de accidentes del trabajo (0,95%)',
      value: a.accidentesTrabajo,
      format: 'CLP',
    },
    { label: 'Costo mensual total para el empleador', value: result.costoTotalMensual, format: 'CLP' },
    {
      label: 'Pago por despido sin 30 días de aviso',
      value: result.indemnizacionSinAviso,
      format: 'CLP',
    },
  );

  return results;
}
