// ============================================
// Cálculo de Subsidio por Licencia Médica Chile 2026
// (SUSESO / Dirección del Trabajo)
// ============================================

import { INGRESO_MINIMO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface LicenciaMedicaInput {
  /**
   * Promedio de la remuneración mensual NETA (imponible menos
   * cotizaciones previsionales e impuestos) de los 3 meses calendario
   * anteriores al mes de inicio de la licencia.
   */
  remuneracionNetaPromedio: number;
  /** Días de la licencia (≥ 1). */
  diasLicencia: number;
}

export interface LicenciaMedicaResult {
  remuneracionNetaPromedio: number;
  diasLicencia: number;
  /** Base diaria neta (remuneración neta / 30). */
  baseDiaria: number;
  /** Mínimo legal diario (50% del ingreso mínimo no remuneracional / 30). */
  minimoDiario: number;
  /** Monto diario a pagar (base diaria con piso en el mínimo legal). */
  montoDiario: number;
  /** Días subsidiados: si la licencia es > 10 días se pagan todos; si es ≤ 10, desde el 4° día. */
  diasPagados: number;
  /** La licencia supera 10 días → subsidio desde el primer día. */
  pagaDesdePrimerDia: boolean;
  totalSubsidio: number;
  baseCalculo: string;
}

/**
 * Estima el subsidio por incapacidad laboral (licencia médica).
 *
 * Reglas (SUSESO / DT):
 *  - Monto diario = remuneración neta mensual / 30, con un mínimo
 *    diario igual a 1/30 del 50% del ingreso mínimo para fines no
 *    remuneracionales.
 *  - Licencias de más de 10 días: se pagan desde el primer día.
 *    Licencias de 10 días o menos: se pagan desde el cuarto día.
 *  - Requisitos de elegibilidad (6 meses de afiliación y 3 meses de
 *    cotización en los 6 anteriores; 1 mes para contratados por día
 *    o turnos) no se verifican en esta estimación.
 */
export function calculateLicenciaMedica(
  input: LicenciaMedicaInput,
): LicenciaMedicaResult {
  const neta = Math.max(0, input.remuneracionNetaPromedio ?? 0);
  const dias = Math.max(0, Math.round(input.diasLicencia ?? 0));

  const baseDiaria = neta / 30;
  const minimoDiario = (INGRESO_MINIMO.no_remuneracional * 0.5) / 30;
  const montoDiario = Math.max(baseDiaria, minimoDiario);

  const pagaDesdePrimerDia = dias > 10;
  const diasPagados = pagaDesdePrimerDia ? dias : Math.max(0, dias - 3);
  const totalSubsidio = Math.round(montoDiario * diasPagados);

  const diarioFmt = Math.round(montoDiario).toLocaleString('es-CL');
  const baseCalculo =
    diasPagados > 0
      ? `$${diarioFmt} diarios × ${diasPagados} día(s) subsidiados${pagaDesdePrimerDia ? ' (licencia > 10 días: se paga desde el primer día)' : ' (licencia ≤ 10 días: se paga desde el 4° día)'}.`
      : `Licencia de ${dias} día(s): se subsidia desde el 4° día, por lo que no hay días pagados.`;

  return {
    remuneracionNetaPromedio: Math.round(neta),
    diasLicencia: dias,
    baseDiaria,
    minimoDiario,
    montoDiario,
    diasPagados,
    pagaDesdePrimerDia,
    totalSubsidio,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function licenciaMedicaToResults(
  result: LicenciaMedicaResult,
): CalculatorResult[] {
  return [
    {
      label: 'Subsidio total estimado',
      value: result.totalSubsidio,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Monto diario',
      value: Math.round(result.montoDiario),
      format: 'CLP',
    },
    {
      label: 'Días subsidiados',
      value: result.diasPagados,
      format: 'days',
    },
    {
      label: 'Días de licencia',
      value: result.diasLicencia,
      format: 'days',
    },
    {
      label: 'Mínimo legal diario',
      value: Math.round(result.minimoDiario),
      format: 'CLP',
    },
  ];
}
