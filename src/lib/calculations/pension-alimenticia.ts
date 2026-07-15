// ============================================
// Referencia legal de pensión de alimentos en Chile
// ============================================

import { INGRESO_MINIMO, PENSION_ALIMENTOS } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface PensionAlimenticiaInput {
  sueldoBruto: number;
  numeroHijos: number;
  tieneOtroIngreso: boolean;
  otroIngreso?: number;
}

export interface PensionAlimenticiaResult {
  sueldoBruto: number;
  totalIngresos: number;
  numeroHijos: number;
  ingresoMinimoVigente: number;
  porcentajeMinimoPorHijo: number;
  pisoLegalPorHijo: number;
  pisoLegalTotal: number;
  limiteGeneralIngresos: number;
  pisoSuperaLimiteGeneral: boolean;
  advertencia: string;
}

/**
 * Entrega dos referencias distintas de la Ley 14.908; no fija ni recomienda
 * una pensión concreta:
 *
 * - Art. 3: piso presunto para menores de edad. Si se pide alimentos para un
 *   menor, el mínimo es 40% del IMM. Si son dos o más menores, es 30% del IMM
 *   por cada uno. El juez puede rebajarlo si se acredita falta de medios.
 * - Art. 7: como regla general, el total no puede exceder 50% de las rentas
 *   del alimentante, pero el tribunal puede superar ese límite por razones
 *   fundadas y atendiendo al interés superior del niño, niña o adolescente.
 *
 * Las necesidades, los cuidados, el patrimonio y la capacidad económica no
 * pueden inferirse solo desde el sueldo. Por eso esta función evita el antiguo
 * “40% del sueldo” presentado erróneamente como pensión sugerida.
 */
export function calculatePensionAlimenticia(
  input: PensionAlimenticiaInput,
): PensionAlimenticiaResult {
  const sueldo = Math.max(0, input.sueldoBruto);
  const otroIngreso = input.tieneOtroIngreso ? Math.max(0, input.otroIngreso ?? 0) : 0;
  const hijos = Math.max(0, Math.round(input.numeroHijos));
  const totalIngresos = sueldo + otroIngreso;
  const imm = INGRESO_MINIMO.mensual;

  const porcentajeMinimoPorHijo =
    hijos === 1
      ? PENSION_ALIMENTOS.minimo_imm_un_hijo
      : hijos >= 2
        ? PENSION_ALIMENTOS.minimo_imm_dos_o_mas_por_hijo
        : 0;
  const pisoLegalPorHijo = imm * (porcentajeMinimoPorHijo / 100);
  const pisoLegalTotal = pisoLegalPorHijo * hijos;
  const limiteGeneralIngresos =
    totalIngresos * (PENSION_ALIMENTOS.limite_general_ingreso / 100);

  return {
    sueldoBruto: Math.round(sueldo),
    totalIngresos: Math.round(totalIngresos),
    numeroHijos: hijos,
    ingresoMinimoVigente: imm,
    porcentajeMinimoPorHijo,
    pisoLegalPorHijo: Math.round(pisoLegalPorHijo),
    pisoLegalTotal: Math.round(pisoLegalTotal),
    limiteGeneralIngresos: Math.round(limiteGeneralIngresos),
    pisoSuperaLimiteGeneral: hijos > 0 && pisoLegalTotal > limiteGeneralIngresos,
    advertencia:
      'Esta referencia no reemplaza una resolución judicial. El tribunal fija el monto según las necesidades del alimentario y la capacidad económica de las partes; puede rebajar el piso si se acredita falta de medios o superar el 50% por razones fundadas.',
  };
}

export function pensionAlimenticiaToResults(
  result: PensionAlimenticiaResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Piso legal total referencial',
      value: result.pisoLegalTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: `Piso por cada menor (${result.porcentajeMinimoPorHijo}% del IMM)`,
      value: result.pisoLegalPorHijo,
      format: 'CLP',
    },
    {
      label: 'Límite general: 50% de ingresos',
      value: result.limiteGeneralIngresos,
      format: 'CLP',
    },
    { label: 'Ingreso mínimo usado', value: result.ingresoMinimoVigente, format: 'CLP' },
    { label: 'Número de menores', value: result.numeroHijos, format: 'number' },
    { label: 'Ingresos declarados', value: result.totalIngresos, format: 'CLP' },
  ];

  if (result.pisoSuperaLimiteGeneral) {
    results.push({
      label: 'Requiere evaluación judicial de capacidad de pago',
      value: 1,
      format: 'number',
    });
  }

  return results;
}
