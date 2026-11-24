// ============================================
// Cálculo de Renta Líquida Imponible (Chile)
// ----------------------------------------------
// Renta líquida = remuneración imponible − cotizaciones
// obligatorias del trabajador (AFP + salud + seguro de cesantía).
// Es la base sobre la que se aplica el Impuesto Único de Segunda
// Categoría (art. 42 N°1 LIR; tabla mensual del SII) y la que se
// declara en Operación Renta.
// Reutiliza el motor de sueldo líquido: mismas fuentes, topes en UF
// (90 UF) y tabla IUSC en UTM. No introduce fórmulas nuevas.
// ============================================

import { calculateSueldoLiquido, type SueldoLiquidoInput } from './sueldo-liquido';
import type { CalculatorResult } from '@/types/calculator';

export type RentaLiquidaInput = SueldoLiquidoInput;

export interface RentaLiquidaResult {
  /** Remuneración imponible mensual (haberes afectos a cotizaciones). */
  totalImponible: number;
  /** Cotizaciones obligatorias del trabajador: AFP + salud + cesantía. */
  cotizacionesObligatorias: number;
  descuentoAfp: number;
  descuentoSalud: number;
  descuentoCesantia: number;
  /** Renta líquida imponible del mes (base del IUSC). */
  rentaLiquidaMensual: number;
  /** Renta líquida anual proyectada: mensual × 12, si todas las remuneraciones fueran iguales. */
  rentaLiquidaAnual: number;
  /** IUSC mensual estimado sobre la renta líquida (tramos SII en UTM). */
  impuestoSegundaCategoria: number;
  /** Líquido a pagar referencial (renta líquida − impuesto, más no imponibles). */
  sueldoLiquidoAPagar: number;
}

export function calculateRentaLiquida(input: RentaLiquidaInput): RentaLiquidaResult {
  const r = calculateSueldoLiquido(input);
  // Cotizaciones deducibles: salud usa `saludTributable` (lo cotizado,
  // topado a 6,3 UF); el exceso de un plan Isapre sobre ese tope no baja
  // la renta líquida imponible.
  const cotizaciones =
    r.descuentos.afp + r.descuentos.saludTributable + r.descuentos.seguroCesantia;
  // Renta líquida desde montos ya redondeados: el desglose visible
  // (imponible − cotizaciones) cuadra al peso con el resultado.
  const rentaLiquidaMensual =
    Math.round(r.totalIngresosImponibles) - Math.round(cotizaciones);
  return {
    totalImponible: Math.round(r.totalIngresosImponibles),
    cotizacionesObligatorias: Math.round(cotizaciones),
    descuentoAfp: r.descuentos.afp,
    descuentoSalud: r.descuentos.saludTributable,
    descuentoCesantia: r.descuentos.seguroCesantia,
    rentaLiquidaMensual,
    rentaLiquidaAnual: rentaLiquidaMensual * 12,
    impuestoSegundaCategoria: r.descuentos.impuesto,
    sueldoLiquidoAPagar: r.liquido,
  };
}

export function rentaLiquidaToResults(result: RentaLiquidaResult): CalculatorResult[] {
  return [
    {
      label: 'Renta líquida imponible mensual',
      value: result.rentaLiquidaMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Renta líquida anual proyectada (×12)',
      value: result.rentaLiquidaAnual,
      format: 'CLP',
    },
    { label: 'Remuneración imponible', value: result.totalImponible, format: 'CLP' },
    {
      label: 'Cotizaciones obligatorias',
      value: result.cotizacionesObligatorias,
      format: 'CLP',
    },
    { label: 'AFP (10% + comisión)', value: result.descuentoAfp, format: 'CLP' },
    { label: 'Salud (7%)', value: result.descuentoSalud, format: 'CLP' },
    { label: 'Seguro de cesantía', value: result.descuentoCesantia, format: 'CLP' },
    {
      label: 'Impuesto 2ª Categoría (mensual)',
      value: result.impuestoSegundaCategoria,
      format: 'CLP',
    },
    {
      label: 'Líquido a pagar (referencia)',
      value: result.sueldoLiquidoAPagar,
      format: 'CLP',
    },
  ];
}
