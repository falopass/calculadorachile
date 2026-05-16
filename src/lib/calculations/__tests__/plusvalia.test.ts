// ============================================
// Tests de plusvalía inmobiliaria (Art. 17 N°8 LIR, Ley 21.210)
// ----------------------------------------------
// Verifica exención 8.000 UF para vivienda habitacional, tasa 10%
// para no habitacional o exceso, y tratamiento de mejoras.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePlusvalia } from '../plusvalia';
import { UF } from '@/lib/values/constants';

describe('calculatePlusvalia', () => {
  it('vivienda habitacional con ganancia bajo 8.000 UF queda exenta', () => {
    const r = calculatePlusvalia({
      precioCompra: 200_000_000,
      precioVenta: 250_000_000,
      anosTenencia: 5,
      esViviendaHabitual: true,
    });
    expect(r.gananciaNeta).toBe(50_000_000);
    expect(r.exento).toBe(true);
    expect(r.impuestoPlusvalia).toBe(0);
  });

  it('vivienda habitacional con ganancia sobre 8.000 UF tributa el exceso al 10%', () => {
    const exencionCLP = 8000 * UF.valor;
    const ganancia = exencionCLP + 50_000_000;
    const r = calculatePlusvalia({
      precioCompra: 100_000_000,
      precioVenta: 100_000_000 + ganancia,
      anosTenencia: 8,
      esViviendaHabitual: true,
    });
    expect(r.exento).toBe(false);
    expect(r.exencionAplicada).toBe(Math.round(exencionCLP));
    expect(r.baseImponible).toBeCloseTo(50_000_000, -3);
    expect(r.impuestoPlusvalia).toBeCloseTo(5_000_000, -3);
    expect(r.tasaPlusvalia).toBe(10);
  });

  it('inmueble no habitacional tributa 10% sin exención', () => {
    const r = calculatePlusvalia({
      precioCompra: 100_000_000,
      precioVenta: 130_000_000,
      anosTenencia: 3,
      esViviendaHabitual: false,
    });
    expect(r.exencionAplicada).toBe(0);
    expect(r.gananciaNeta).toBe(30_000_000);
    expect(r.baseImponible).toBe(30_000_000);
    expect(r.impuestoPlusvalia).toBe(3_000_000);
  });

  it('mejoras se descuentan de la ganancia neta', () => {
    const r = calculatePlusvalia({
      precioCompra: 100_000_000,
      precioVenta: 150_000_000,
      anosTenencia: 5,
      mejoras: 10_000_000,
      esViviendaHabitual: false,
    });
    expect(r.gananciaNeta).toBe(40_000_000);
    expect(r.impuestoPlusvalia).toBe(4_000_000);
  });

  it('venta a pérdida no genera impuesto', () => {
    const r = calculatePlusvalia({
      precioCompra: 200_000_000,
      precioVenta: 180_000_000,
      anosTenencia: 4,
      esViviendaHabitual: false,
    });
    expect(r.gananciaNeta).toBeLessThan(0);
    expect(r.impuestoPlusvalia).toBe(0);
    expect(r.exento).toBe(true);
  });

  it('años de tenencia NO modifican la tasa (Ley 21.210)', () => {
    const r1 = calculatePlusvalia({
      precioCompra: 100_000_000,
      precioVenta: 130_000_000,
      anosTenencia: 1,
      esViviendaHabitual: false,
    });
    const r10 = calculatePlusvalia({
      precioCompra: 100_000_000,
      precioVenta: 130_000_000,
      anosTenencia: 10,
      esViviendaHabitual: false,
    });
    expect(r1.impuestoPlusvalia).toBe(r10.impuestoPlusvalia);
  });
});
