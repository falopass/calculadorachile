// ============================================
// Impuesto único con descuento de cotizaciones obligatorias
// --------------------------------------------
// La calculadora pública de impuesto único debe aplicar la tabla del SII
// sobre la renta líquida imponible (sueldo imponible − AFP − salud −
// cesantía), igual que calculateSueldoLiquido. Mismo bruto ⇒ mismo impuesto.
// Tabla noviembre 2026 (UTM $72.440, exento hasta $977.940):
// https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm
// https://www.sii.cl/valores_y_fechas/utm/utm2026.htm
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculateImpuestoSegundaCategoria,
  impuestoSegundaCategoriaToResults,
} from '../impuesto-segunda-categoria';
import { calculateSueldoLiquido } from '../sueldo-liquido';

const valorUTM = 72_440;
const valorUF = 41_215.77;

describe('impuesto único con cotizaciones (igual que sueldo líquido)', () => {
  const brutos = [553_553, 610_000, 977_940, 1_200_000, 1_500_000, 2_500_000, 4_000_000, 8_000_000];

  it.each(brutos)('bruto $%i: mismo impuesto que calculateSueldoLiquido', (bruto) => {
    const imp = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: bruto,
      mesesTrabajados: 1,
      descontarCotizaciones: true,
      valorUTM,
      valorUF,
    });
    const sl = calculateSueldoLiquido({
      sueldoBruto: bruto,
      afp: 'habitat',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
      valorUTM,
      valorUF,
    });
    expect(imp.impuestoMensual).toBe(sl.descuentos.impuesto);
  });

  it('bruto $1.500.000 (noviembre 2026): base $1.216.950, impuesto $9.560', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 1_500_000,
      descontarCotizaciones: true,
      valorUTM,
      valorUF,
    });
    expect(r.cotizaciones).toBe(283_050); // 169.050 + 105.000 + 9.000
    expect(r.baseTributable).toBe(1_216_950);
    expect(r.rentaEnUTM).toBeCloseTo(16.8, 1);
    expect(r.impuestoMensual).toBe(9_560); // 1.216.950 × 0,04 − 39.117,60
    expect(r.impuestoAnual).toBe(9_560 * 12);
  });

  it('bruto $2.500.000 (noviembre 2026): impuesto $42.012', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 2_500_000,
      descontarCotizaciones: true,
      valorUTM,
      valorUF,
    });
    expect(r.baseTributable).toBe(2_028_250);
    expect(r.impuestoMensual).toBe(42_012); // 2.028.250 × 0,04 − 39.117,60
  });

  it('bruto $610.000 queda exento', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 610_000,
      descontarCotizaciones: true,
      valorUTM,
      valorUF,
    });
    expect(r.cotizaciones).toBe(115_107);
    expect(r.impuestoMensual).toBe(0);
    expect(r.tramoAplicado).toBe('Desde 0 hasta 13.5 UTM mensuales');
  });

  it('sin descontarCotizaciones mantiene el comportamiento sobre la base entregada', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 1_216_950,
      mesesTrabajados: 1,
      valorUTM,
    });
    expect(r.cotizaciones).toBe(0);
    expect(r.impuestoMensual).toBe(9_560);
  });

  it('la etiqueta de cotizaciones refleja AFP, salud y contrato usados', () => {
    const base = { sueldoBrutoMensual: 2_000_000, valorUTM, valorUF, descontarCotizaciones: true };
    const def = calculateImpuestoSegundaCategoria(base);
    expect(def.cotizacionesDetalle).toBe('AFP Habitat 11,27%, Fonasa 7%, cesantía 0,6%');

    const alt = calculateImpuestoSegundaCategoria({
      ...base,
      afp: 'modelo',
      contratoIndefinido: false,
    });
    expect(alt.cotizacionesDetalle).toBe(
      'AFP Modelo 10,58%, Fonasa 7%, sin cesantía del trabajador (plazo fijo)',
    );
    const sl = calculateSueldoLiquido({
      sueldoBruto: 2_000_000,
      afp: 'modelo',
      saludTipo: 'fonasa',
      contratoIndefinido: false,
      valorUF,
      valorUTM,
    });
    expect(alt.impuestoMensual).toBe(sl.descuentos.impuesto);
    expect(sl.descuentos.seguroCesantia).toBe(0);
    const fila = impuestoSegundaCategoriaToResults(alt).find((x) =>
      x.label.startsWith('Cotizaciones descontadas'),
    );
    expect(fila?.label).toBe(
      'Cotizaciones descontadas (AFP Modelo 10,58%, Fonasa 7%, sin cesantía del trabajador (plazo fijo))',
    );
  });
});
