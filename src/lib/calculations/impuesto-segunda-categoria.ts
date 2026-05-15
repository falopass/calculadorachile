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
  sueldoMensual: number;
  sueldoAnual: number;
  rentaEnUTM: number;
  impuestoMensual: number;
  impuestoAnual: number;
  tasaEfectiva: number;
  tramoAplicado: string;
}

/**
 * Calcula el impuesto de segunda categoría sobre rentas del trabajo.
 *
 * Bug histórico: la versión anterior expresaba la base como `rentaEnUTA`
 * (sueldoAnual / valorUTA) y la comparaba contra los tramos de
 * IMPUESTO_SEGUNDA_CATEGORIA. Esa tabla en `constants.ts` está en UTM
 * mensual (verificable en `sueldo-liquido.ts`, que la usa como UTM
 * mensual). Aplicarla sobre UTA subestima el impuesto en ~12×.
 *
 * Fix: calcular el impuesto MENSUAL con la tabla mensual y multiplicar
 * por los meses trabajados para obtener el anual. Es la misma forma en
 * que la calculadora de sueldo líquido aplica la tabla.
 *
 * Base legal: Art. 43 N°1 LIR.
 */
export function calculateImpuestoSegundaCategoria(
  input: ImpuestoSegundaCategoriaInput,
): ImpuestoSegundaCategoriaResult {
  const { sueldoBrutoMensual, mesesTrabajados = 12 } = input;

  const sueldo = Math.max(0, sueldoBrutoMensual);
  const meses = Math.max(1, Math.min(12, mesesTrabajados));

  const valorUTM = UTM.valor;
  const rentaEnUTM = valorUTM > 0 ? sueldo / valorUTM : 0;

  // Buscar tramo aplicable (tabla mensual en UTM)
  let impuestoUTM = 0;
  let tramoAplicado = 'Exento';

  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (rentaEnUTM > tramo.desde && rentaEnUTM <= tramo.hasta) {
      impuestoUTM = rentaEnUTM * tramo.factor - tramo.rebaja;
      impuestoUTM = Math.max(0, impuestoUTM);

      const desdeFmt = tramo.desde === 0 ? '0' : tramo.desde.toString();
      const hastaFmt = tramo.hasta === Infinity ? 'más' : tramo.hasta.toString();
      tramoAplicado = `Desde ${desdeFmt} hasta ${hastaFmt} UTM mensuales`;
      break;
    }
  }

  // Convertir a CLP
  const impuestoMensual = Math.max(0, Math.round(impuestoUTM * valorUTM));
  const impuestoAnual = impuestoMensual * meses;
  const sueldoAnual = Math.round(sueldo * meses);

  const tasaEfectiva =
    sueldoAnual > 0 ? Number(((impuestoAnual / sueldoAnual) * 100).toFixed(2)) : 0;

  return {
    sueldoMensual: Math.round(sueldo),
    sueldoAnual,
    rentaEnUTM: Number(rentaEnUTM.toFixed(2)),
    impuestoMensual,
    impuestoAnual,
    tasaEfectiva,
    tramoAplicado,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function impuestoSegundaCategoriaToResults(
  result: ImpuestoSegundaCategoriaResult,
): CalculatorResult[] {
  return [
    { label: 'Impuesto Mensual', value: result.impuestoMensual, format: 'CLP', highlight: true },
    { label: 'Impuesto Anual', value: result.impuestoAnual, format: 'CLP' },
    { label: 'Sueldo Mensual', value: result.sueldoMensual, format: 'CLP' },
    { label: 'Sueldo Anual', value: result.sueldoAnual, format: 'CLP' },
    { label: 'Renta en UTM (mensual)', value: result.rentaEnUTM, format: 'number' },
    { label: 'Tasa Efectiva', value: result.tasaEfectiva, format: 'percentage' },
  ];
}
