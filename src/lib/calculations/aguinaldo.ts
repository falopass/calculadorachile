// ============================================
// Cálculo de Aguinaldo (Fiestas Patrias / Navidad / Escolar) Chile 2026
// ============================================

import { AGUINALDO_2026 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface AguinaldoInput {
  tipo: 'fiestas_patrias' | 'navidad' | 'escolar';
  /**
   * Sueldo bruto del trabajador (informativo). El monto del aguinaldo
   * lo fija la Ley anual de Reajuste del Sector Público — no depende
   * del sueldo individual.
   */
  sueldoBruto: number;
  /** Meses trabajados en el año. Si es 0, no hay aguinaldo. */
  mesesTrabajados: number;
  /**
   * Si es false (default), aclara que el monto es referencial al
   * sector público y que en el sector privado depende del convenio
   * colectivo o liberalidad del empleador.
   */
  esSectorPublico?: boolean;
}

export interface AguinaldoResult {
  tipo: string;
  montoBase: number;
  factorProporcional: number;
  montoProporcional: number;
  sueldoBruto: number;
  esSectorPublico: boolean;
  /** Advertencia para sector privado. */
  advertencia?: string;
}

const NOMBRES_TIPO: Record<AguinaldoInput['tipo'], string> = {
  fiestas_patrias: 'Fiestas Patrias',
  navidad: 'Navidad',
  escolar: 'Escolar',
};

/**
 * Calcula el aguinaldo proporcional según meses trabajados.
 *
 * Bugs históricos:
 *  - mesesTrabajados=0 se forzaba a 1 silenciosamente, mostrando un
 *    monto que no corresponde. Ahora retorna 0 explícitamente.
 *  - factorProporcional se redondeaba a 2 decimales en string
 *    (`.toFixed(2)`) y luego se multiplicaba, distorsionando montos.
 *  - No advertía que los montos son del sector público (Ley anual
 *    de Reajuste). En el sector privado depende del contrato.
 *
 * Base legal: Ley anual de Reajuste del Sector Público.
 */
export function calculateAguinaldo(input: AguinaldoInput): AguinaldoResult {
  const { tipo, sueldoBruto, mesesTrabajados, esSectorPublico = false } = input;

  const sueldo = Math.max(0, sueldoBruto);
  const meses = Math.max(0, Math.min(12, mesesTrabajados));

  const montoBase = AGUINALDO_2026[tipo];

  // Factor exacto sin redondeo intermedio.
  const factorProporcional = meses / 12;
  const montoProporcional = Math.round(montoBase * factorProporcional);

  const advertencia = esSectorPublico
    ? undefined
    : 'Los aguinaldos en el sector privado no son obligatorios por ley general; dependen de convenio colectivo o política de la empresa. El monto mostrado corresponde al sector público (Ley anual de Reajuste).';

  return {
    tipo: NOMBRES_TIPO[tipo],
    montoBase,
    factorProporcional: Math.round(factorProporcional * 1000) / 1000,
    montoProporcional,
    sueldoBruto: sueldo,
    esSectorPublico,
    advertencia,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function aguinaldoToResults(result: AguinaldoResult): CalculatorResult[] {
  return [
    { label: 'Monto Proporcional', value: result.montoProporcional, format: 'CLP', highlight: true },
    { label: 'Monto Base (Sector Público)', value: result.montoBase, format: 'CLP' },
    { label: 'Factor Proporcional', value: result.factorProporcional, format: 'number' },
    { label: 'Sueldo Bruto', value: result.sueldoBruto, format: 'CLP' },
  ];
}
