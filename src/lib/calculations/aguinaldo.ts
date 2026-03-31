// ============================================
// Cálculo de Aguinaldo (Fiestas Patrias / Navidad / Escolar) Chile 2026
// Beneficio adicional para trabajadores del sector público y algunos privados
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface AguinaldoInput {
  tipo: 'fiestas_patrias' | 'navidad' | 'escolar';
  sueldoBruto: number;
  mesesTrabajados: number;
}

export interface AguinaldoResult {
  tipo: string;
  montoBase: number;
  factorProporcional: number;
  montoProporcional: number;
  sueldoBruto: number;
}

/**
 * Montos base de aguinaldo según tipo (valores de referencia 2026).
 * Fiestas Patrias: ~$35.000, Navidad: ~$35.000, Escolar: ~$20.000.
 * Sector público: regulado por ley y decretos supremos.
 * Sector privado: depende de negociación colectiva o contrato individual.
 */
const MONTOS_BASE: Record<AguinaldoInput['tipo'], number> = {
  fiestas_patrias: 35000,
  navidad: 35000,
  escolar: 20000,
};

const NOMBRES_TIPO: Record<AguinaldoInput['tipo'], string> = {
  fiestas_patrias: 'Fiestas Patrias',
  navidad: 'Navidad',
  escolar: 'Escolar',
};

/**
 * Calcula el aguinaldo proporcional según meses trabajados.
 * Si trabajó menos de 12 meses, el monto se reduce proporcionalmente.
 * Sector público: monto fijo anual regulado.
 * Sector privado: puede variar según contrato o convenio colectivo.
 */
export function calculateAguinaldo(input: AguinaldoInput): AguinaldoResult {
  const { tipo, sueldoBruto, mesesTrabajados } = input;

  // Validar rangos
  const sueldo = Math.max(0, sueldoBruto);
  const meses = Math.max(1, Math.min(12, mesesTrabajados));

  // Monto base según tipo de aguinaldo
  const montoBase = MONTOS_BASE[tipo];

  // Factor proporcional (meses trabajados / 12)
  const factorProporcional = Number((meses / 12).toFixed(2));

  // Monto proporcional
  const montoProporcional = Math.round(montoBase * factorProporcional);

  return {
    tipo: NOMBRES_TIPO[tipo],
    montoBase,
    factorProporcional,
    montoProporcional,
    sueldoBruto: sueldo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function aguinaldoToResults(result: AguinaldoResult): CalculatorResult[] {
  return [
    { label: 'Monto Proporcional', value: result.montoProporcional, format: 'CLP', highlight: true },
    { label: 'Monto Base', value: result.montoBase, format: 'CLP' },
    { label: 'Factor Proporcional', value: result.factorProporcional, format: 'percentage' },
    { label: 'Sueldo Bruto', value: result.sueldoBruto, format: 'CLP' },
  ];
}
