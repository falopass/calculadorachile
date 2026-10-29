// ============================================
// Cálculo de Impuesto de Segunda Categoría Chile 2026
// Impuesto progresivo aplicado a rentas del trabajo dependiente
// ============================================

import { AFP, IMPUESTO_SEGUNDA_CATEGORIA, UTM } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';
import { calculateSueldoLiquido } from './sueldo-liquido';

export interface ImpuestoSegundaCategoriaInput {
  sueldoBrutoMensual: number;
  mesesTrabajados?: number;
  /** UTM en vivo (UI/tests). Default: snapshot `UTM.valor`. */
  valorUTM?: number;
  /**
   * Si es true, `sueldoBrutoMensual` es el sueldo imponible bruto y antes de
   * aplicar la tabla se descuentan las cotizaciones obligatorias del
   * trabajador (AFP, salud y cesantía) con la misma lógica y topes de
   * `calculateSueldoLiquido`. Si es false (default), `sueldoBrutoMensual` se
   * trata como la renta líquida imponible ya calculada.
   * La calculadora pública y sus respuestas rápidas usan `true`.
   */
  descontarCotizaciones?: boolean;
  /** AFP para las cotizaciones. Default: 'habitat' (referencia de las guías). */
  afp?: keyof typeof AFP;
  /** Sistema de salud. Default: 'fonasa' (7%). */
  saludTipo?: 'fonasa' | 'isapre';
  /** Contrato indefinido (cesantía 0,6% trabajador). Default: true. */
  contratoIndefinido?: boolean;
  /** UF en vivo para los topes imponibles. Default: snapshot `UF.valor`. */
  valorUF?: number;
}

export interface ImpuestoSegundaCategoriaResult {
  sueldoMensual: number;
  sueldoAnual: number;
  /** Cotizaciones obligatorias descontadas (AFP + salud + cesantía). 0 si no se descuentan. */
  cotizaciones: number;
  /** Renta líquida imponible mensual sobre la que se aplica la tabla. */
  baseTributable: number;
  /** Base tributable expresada en UTM del mes. */
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

  const valorUTM = input.valorUTM ?? UTM.valor;

  // Renta líquida imponible: sueldo imponible menos cotizaciones obligatorias
  // (SII: la tabla se aplica sobre la "renta líquida imponible"). Se reutiliza
  // calculateSueldoLiquido para que ambas calculadoras den el mismo impuesto.
  let cotizaciones = 0;
  let impuestoSueldoLiquido: number | null = null;
  if (input.descontarCotizaciones) {
    const sl = calculateSueldoLiquido({
      sueldoBruto: sueldo,
      afp: input.afp ?? 'habitat',
      saludTipo: input.saludTipo ?? 'fonasa',
      contratoIndefinido: input.contratoIndefinido ?? true,
      valorUF: input.valorUF,
      valorUTM,
    });
    cotizaciones = sl.descuentos.afp + sl.descuentos.salud + sl.descuentos.seguroCesantia;
    impuestoSueldoLiquido = sl.descuentos.impuesto;
  }
  const baseTributable = Math.max(0, sueldo - cotizaciones);
  const rentaEnUTM = valorUTM > 0 ? baseTributable / valorUTM : 0;

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

  // Convertir a CLP. Con cotizaciones, el monto es exactamente el de
  // calculateSueldoLiquido (evita diferencias de $1 por redondeo).
  const impuestoMensual =
    impuestoSueldoLiquido ?? Math.max(0, Math.round(impuestoUTM * valorUTM));
  const impuestoAnual = impuestoMensual * meses;
  const sueldoAnual = Math.round(sueldo * meses);

  const tasaEfectiva =
    sueldoAnual > 0 ? Number(((impuestoAnual / sueldoAnual) * 100).toFixed(2)) : 0;

  return {
    sueldoMensual: Math.round(sueldo),
    sueldoAnual,
    cotizaciones: Math.round(cotizaciones),
    baseTributable: Math.round(baseTributable),
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
  const r: CalculatorResult[] = [
    { label: 'Impuesto Mensual', value: result.impuestoMensual, format: 'CLP', highlight: true },
    { label: 'Impuesto Anual', value: result.impuestoAnual, format: 'CLP' },
    { label: 'Sueldo Mensual', value: result.sueldoMensual, format: 'CLP' },
  ];
  if (result.cotizaciones > 0) {
    r.push(
      {
        label: 'Cotizaciones descontadas (AFP Habitat, Fonasa 7%, cesantía 0,6%)',
        value: result.cotizaciones,
        format: 'CLP',
      },
      { label: 'Base tributable mensual', value: result.baseTributable, format: 'CLP' },
    );
  }
  r.push(
    { label: 'Sueldo Anual', value: result.sueldoAnual, format: 'CLP' },
    { label: 'Base tributable en UTM (mensual)', value: result.rentaEnUTM, format: 'number' },
    { label: 'Tasa Efectiva', value: result.tasaEfectiva, format: 'percentage' },
  );
  return r;
}
