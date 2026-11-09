// ============================================
// Cálculo de Aguinaldo (Fiestas Patrias / Navidad / Escolar)
// --------------------------------------------
// FP 2026 y escolar 2026: Ley 21.806.
// Navidad: monto de referencia 2025 (no hay cifra SP 2026 publicada).
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
  /** true cuando el monto base es referencia Navidad 2025 (no 2026). */
  esReferenciaNavidad2025: boolean;
  /** Advertencia visible (privado y/o Navidad 2025). */
  advertencia?: string;
}

const NOMBRES_TIPO: Record<AguinaldoInput['tipo'], string> = {
  fiestas_patrias: 'Fiestas Patrias 2026',
  navidad: 'Navidad (referencia 2025)',
  escolar: 'Escolar 2026',
};

const NOTA_NAVIDAD_2025 =
  'Monto de referencia Navidad 2025 (Ley 21.806 modifica el art. 2 de la Ley 21.724, año 2025). El monto 2026 del sector público lo fija la ley de reajuste del sector público, aún no publicada.';

/**
 * Calcula el aguinaldo proporcional según meses trabajados.
 * Base: `AGUINALDO_2026`. Para `navidad` el monto es referencia 2025.
 */
export function calculateAguinaldo(input: AguinaldoInput): AguinaldoResult {
  const { tipo, sueldoBruto, mesesTrabajados, esSectorPublico = false } = input;

  const sueldo = Math.max(0, sueldoBruto);
  const meses = Math.max(0, Math.min(12, mesesTrabajados));

  const montoBase = AGUINALDO_2026[tipo];
  const esReferenciaNavidad2025 = tipo === 'navidad';

  const factorProporcional = meses / 12;
  const montoProporcional = Math.round(montoBase * factorProporcional);

  const partes: string[] = [];
  if (esReferenciaNavidad2025) partes.push(NOTA_NAVIDAD_2025);
  if (!esSectorPublico) {
    partes.push(
      'Los aguinaldos en el sector privado no son obligatorios por ley general; dependen de convenio colectivo o política de la empresa. El monto mostrado corresponde al sector público (Ley anual de Reajuste) o a su referencia publicada.',
    );
  }

  return {
    tipo: NOMBRES_TIPO[tipo],
    montoBase,
    factorProporcional: Math.round(factorProporcional * 1000) / 1000,
    montoProporcional,
    sueldoBruto: sueldo,
    esSectorPublico,
    esReferenciaNavidad2025,
    advertencia: partes.length ? partes.join(' ') : undefined,
  };
}

export function aguinaldoToResults(result: AguinaldoResult): CalculatorResult[] {
  const baseLabel = result.esReferenciaNavidad2025
    ? 'Monto base (referencia Navidad 2025, sector público)'
    : 'Monto Base (Sector Público)';
  const rows: CalculatorResult[] = [
    {
      label: result.esReferenciaNavidad2025
        ? 'Monto proporcional (referencia 2025)'
        : 'Monto Proporcional',
      value: result.montoProporcional,
      format: 'CLP',
      highlight: true,
      ...(result.advertencia ? { note: { text: result.advertencia } } : {}),
    },
    { label: baseLabel, value: result.montoBase, format: 'CLP' },
    { label: 'Factor Proporcional', value: result.factorProporcional, format: 'number' },
    { label: 'Sueldo Bruto', value: result.sueldoBruto, format: 'CLP' },
  ];
  return rows;
}
