// ============================================
// Feriado progresivo — Código del Trabajo, art. 68
// ============================================
// Regla verificada (Dirección del Trabajo, ficha 60194):
//   - Se necesitan 10 años trabajados, con uno o más empleadores,
//     continuos o no, para empezar a generar días progresivos.
//   - Después: +1 día hábil por cada 3 años NUEVOS trabajados para
//     el mismo empleador actual (los períodos de 3 años deben
//     cumplirse con el empleador que se invoca el beneficio).
//   - Los años con empleadores anteriores solo sirven para completar
//     los 10 años de base; no generan días progresivos por sí solos.
//   - La ley no fija un máximo de días progresivos.
//
// Fuentes:
// - DT, feriado progresivo:
//   https://www.dt.gob.cl/portal/1628/w3-article-60194.html
// - Código del Trabajo, art. 68:
//   https://www.bcn.cl/leychile/navegar?idNorma=207436
// ============================================

import type { CalculatorResult } from '@/types/calculator';

/** Días hábiles de feriado anual básico (art. 67). */
export const FERIADO_ANUAL_BASE = 15;
/** Días hábiles de feriado anual en Magallanes, Aysén y Palena (art. 67). */
export const FERIADO_ANUAL_BASE_AUSTRAL = 20;
/** Años trabajados necesarios para empezar a generar días progresivos. */
export const ANIOS_BASE_FERIADO_PROGRESIVO = 10;
/** Años nuevos con el empleador actual por cada día adicional. */
export const ANIOS_POR_DIA_PROGRESIVO = 3;

export interface FeriadoProgresivoInput {
  /** Años trabajados para el empleador actual. ≥ 0. */
  aniosEmpleadorActual: number;
  /**
   * Años trabajados para empleadores anteriores, acreditables con
   * cotizaciones previsionales. Cuentan solo hasta 10 para la base.
   * Default: 0.
   */
  aniosEmpleadoresAnteriores?: number;
  /**
   * Opcional. Sueldo mensual en CLP para estimar el valor por día de
   * feriado (sueldo ÷ 30) y el monto referencial de los días
   * progresivos si se indemnizan.
   */
  sueldoBruto?: number;
  /**
   * Opcional. true si el trabajo se desempeña en Magallanes, Aysén o la
   * provincia de Palena: el feriado anual básico es de 20 días hábiles
   * (art. 67) en vez de 15.
   */
  regionAustral?: boolean;
}

export interface FeriadoProgresivoResult {
  aniosEmpleadorActual: number;
  aniosEmpleadoresAnteriores: number;
  /** Años anteriores que efectivamente cuentan para la base (máx. 10). */
  aniosAnterioresContables: number;
  /** Años que aún faltan con el empleador actual para completar los 10. */
  aniosRestantesBase: number;
  /** Años con el empleador actual que ya generan días (sobre la base). */
  aniosNuevosEmpleador: number;
  /** Días hábiles adicionales por año. */
  diasProgresivos: number;
  /** Feriado anual básico aplicado (15, o 20 en zona austral). */
  feriadoAnualBase: number;
  /** feriadoAnualBase + días progresivos. */
  feriadoAnualTotal: number;
  /** Años que faltan para el próximo día progresivo (0 si cumple 3 exactos). */
  aniosParaProximoDia: number;
  /** Valor referencial por día de feriado (sueldo ÷ 30); 0 sin sueldo. */
  valorDiaFeriado: number;
  /** valorDiaFeriado × días progresivos; 0 sin sueldo o sin días. */
  montoDiasProgresivos: number;
  baseCalculo: string;
}

export function calculateFeriadoProgresivo(input: FeriadoProgresivoInput): FeriadoProgresivoResult {
  const aniosActual = Math.max(0, input.aniosEmpleadorActual ?? 0);
  const aniosAnteriores = Math.max(0, input.aniosEmpleadoresAnteriores ?? 0);
  const sueldo = Math.max(0, input.sueldoBruto ?? 0);

  const aniosAnterioresContables = Math.min(ANIOS_BASE_FERIADO_PROGRESIVO, aniosAnteriores);
  const aniosRestantesBase = Math.max(0, ANIOS_BASE_FERIADO_PROGRESIVO - aniosAnterioresContables);
  // Se redondea a nanosegundos: con años decimales la resta puede dejar
  // un tramo completo apenas bajo el entero (p.ej. 8,1 + 4,9 → 2,9999…).
  const aniosNuevosEmpleador = Math.max(
    0,
    Math.round((aniosActual - aniosRestantesBase) * 1e9) / 1e9,
  );
  const diasProgresivos = Math.floor(aniosNuevosEmpleador / ANIOS_POR_DIA_PROGRESIVO);
  const feriadoAnualBase = input.regionAustral ? FERIADO_ANUAL_BASE_AUSTRAL : FERIADO_ANUAL_BASE;
  const feriadoAnualTotal = feriadoAnualBase + diasProgresivos;

  // Si aún falta para la base de 10 años, el próximo día exige además
  // completar un período de 3 años nuevos con el empleador actual.
  const aniosPendientesBase = Math.max(
    0,
    ANIOS_BASE_FERIADO_PROGRESIVO - aniosAnterioresContables - aniosActual,
  );
  const resto = aniosNuevosEmpleador % ANIOS_POR_DIA_PROGRESIVO;
  const aniosParaProximoDia =
    aniosPendientesBase > 0
      ? aniosPendientesBase + ANIOS_POR_DIA_PROGRESIVO
      : resto === 0
        ? ANIOS_POR_DIA_PROGRESIVO
        : ANIOS_POR_DIA_PROGRESIVO - resto;

  const valorDiaFeriado = sueldo > 0 ? Math.round(sueldo / 30) : 0;
  // Referencial: se conservan los decimales hasta el total, como en
  // vacaciones.ts (art. 71).
  const montoDiasProgresivos = Math.round((sueldo / 30) * diasProgresivos);

  const baseCalculo =
    aniosNuevosEmpleador <= 0
      ? `Años contables hacia la base de ${ANIOS_BASE_FERIADO_PROGRESIVO}: ${formatAnios(aniosAnterioresContables)} anteriores + ${formatAnios(aniosActual)} actuales; faltan ${formatAnios(Math.max(0, ANIOS_BASE_FERIADO_PROGRESIVO - aniosAnterioresContables - aniosActual))} para el primer día progresivo.`
      : `Base de ${ANIOS_BASE_FERIADO_PROGRESIVO} años: ${formatAnios(aniosAnterioresContables)} anteriores + ${formatAnios(Math.min(aniosActual, aniosRestantesBase))} actuales. Años nuevos con el empleador: ${formatAnios(aniosNuevosEmpleador)} ÷ ${ANIOS_POR_DIA_PROGRESIVO} = ${diasProgresivos} día${diasProgresivos === 1 ? '' : 's'} progresivo${diasProgresivos === 1 ? '' : 's'}.`;

  return {
    aniosEmpleadorActual: aniosActual,
    aniosEmpleadoresAnteriores: aniosAnteriores,
    aniosAnterioresContables,
    aniosRestantesBase,
    aniosNuevosEmpleador,
    diasProgresivos,
    feriadoAnualBase,
    feriadoAnualTotal,
    aniosParaProximoDia,
    valorDiaFeriado,
    montoDiasProgresivos,
    baseCalculo,
  };
}

function formatAnios(n: number): string {
  const redondeado = Math.round(n * 10) / 10;
  return redondeado.toLocaleString('es-CL', { maximumFractionDigits: 1 });
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function feriadoProgresivoToResults(result: FeriadoProgresivoResult): CalculatorResult[] {
  const out: CalculatorResult[] = [
    {
      label: 'Días de feriado progresivo por año',
      value: result.diasProgresivos,
      format: 'days',
      highlight: true,
    },
    {
      label: `Feriado anual total (${result.feriadoAnualBase} + progresivos)`,
      value: result.feriadoAnualTotal,
      format: 'days',
    },
    {
      label: 'Años para el próximo día progresivo',
      value: result.aniosParaProximoDia,
      format: 'number',
    },
  ];
  if (result.valorDiaFeriado > 0) {
    out.push(
      {
        label: 'Valor por día de feriado (sueldo ÷ 30)',
        value: result.valorDiaFeriado,
        format: 'CLP',
      },
      {
        label: 'Referencial por días progresivos',
        value: result.montoDiasProgresivos,
        format: 'CLP',
        highlight: result.diasProgresivos > 0,
      },
    );
  }
  return out;
}
