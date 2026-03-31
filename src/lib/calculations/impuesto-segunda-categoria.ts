// ============================================
// Cálculo de Impuesto de Segunda Categoría Chile 2026
// Impuesto progresivo aplicado a rentas del trabajo dependiente
// ============================================

import { IMPUESTO_SEGUNDA_CATEGORIA, UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ImpuestoSegundaCategoriaInput {
  sueldoBrutoMensual: number;
  mesesTrabajados?: number;
}

export interface ImpuestoSegundaCategoriaResult {
  sueldoAnual: number;
  rentaEnUTA: number;
  impuestoAnual: number;
  impuestoMensual: number;
  tasaEfectiva: number;
  tramoAplicado: string;
}

/**
 * Calcula el impuesto de segunda categoría sobre rentas del trabajo.
 * Base imponible anual en UTA (UTM * 12). Se aplican tramos progresivos
 * según la tabla IMPUESTO_SEGUNDA_CATEGORIA del SII.
 * Ley de Impuesto a la Renta, Art. 43 N°1.
 */
export function calculateImpuestoSegundaCategoria(
  input: ImpuestoSegundaCategoriaInput
): ImpuestoSegundaCategoriaResult {
  const {
    sueldoBrutoMensual,
    mesesTrabajados = 12,
  } = input;

  // Validar rangos
  const sueldo = Math.max(0, sueldoBrutoMensual);
  const meses = Math.max(1, Math.min(12, mesesTrabajados));

  // Renta anual bruta
  const sueldoAnual = Math.round(sueldo * meses);

  // 1 UTA = 12 UTM
  const valorUTA = UTM.valor * 12;

  // Convertir renta anual a UTA
  const rentaEnUTA = sueldoAnual / valorUTA;

  // Buscar tramo aplicable y calcular impuesto en UTA
  let impuestoUTA = 0;
  let tramoAplicado = 'Exento';

  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (rentaEnUTA > tramo.desde && rentaEnUTA <= tramo.hasta) {
      impuestoUTA = (rentaEnUTA - tramo.exento) * tramo.factor - tramo.rebaja;
      impuestoUTA = Math.max(0, impuestoUTA);

      // Etiqueta del tramo para mostrar al usuario
      const desdeFmt = tramo.desde === 0 ? '0' : tramo.desde.toString();
      const hastaFmt = tramo.hasta === Infinity ? 'más' : tramo.hasta.toString();
      tramoAplicado = `Desde ${desdeFmt} hasta ${hastaFmt} UTA`;
      break;
    }
  }

  // Convertir impuesto de UTA a CLP
  const impuestoAnual = Math.round(impuestoUTA * valorUTA);
  const impuestoMensual = Math.round(impuestoAnual / meses);

  // Tasa efectiva: impuesto anual / sueldo anual * 100
  const tasaEfectiva = sueldoAnual > 0
    ? Number(((impuestoAnual / sueldoAnual) * 100).toFixed(2))
    : 0;

  return {
    sueldoAnual,
    rentaEnUTA: Number(rentaEnUTA.toFixed(2)),
    impuestoAnual,
    impuestoMensual,
    tasaEfectiva,
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function impuestoSegundaCategoriaToResults(
  result: ImpuestoSegundaCategoriaResult
): CalculatorResult[] {
  return [
    { label: 'Impuesto Mensual', value: result.impuestoMensual, format: 'CLP', highlight: true },
    { label: 'Impuesto Anual', value: result.impuestoAnual, format: 'CLP' },
    { label: 'Sueldo Anual', value: result.sueldoAnual, format: 'CLP' },
    { label: 'Renta en UTA', value: result.rentaEnUTA, format: 'number' },
    { label: 'Tasa Efectiva', value: result.tasaEfectiva, format: 'percentage' },
  ];
}
