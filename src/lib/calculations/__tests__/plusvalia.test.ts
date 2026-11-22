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

  it('cupo vitalicio usado en ventas anteriores reduce la exención (Art. 17 N°8 letra b)', () => {
    // El cupo de 8.000 UF es acumulado durante toda la vida: si ya se
    // exentaron 6.500 UF en ventas previas, solo quedan 1.500 UF.
    const ganancia = 2200 * UF.valor; // 2.200 UF como en el ejemplo del SII
    const r = calculatePlusvalia({
      precioCompra: 0,
      precioVenta: ganancia,
      anosTenencia: 2,
      esViviendaHabitual: true,
      cupoExentoUsadoUF: 6500,
    });
    expect(r.exencionDisponibleUF).toBe(1500);
    expect(r.exento).toBe(false);
    expect(r.exencionAplicada).toBe(Math.round(1500 * UF.valor));
    expect(r.baseImponible).toBe(Math.round(700 * UF.valor));
    expect(r.impuestoPlusvalia).toBe(Math.round(700 * UF.valor * 0.1));
  });

  it('cupo vitalicio agotado deja la ganancia completa gravada al 10%', () => {
    const r = calculatePlusvalia({
      precioCompra: 0,
      precioVenta: 50_000_000,
      anosTenencia: 5,
      esViviendaHabitual: true,
      cupoExentoUsadoUF: 8000,
    });
    expect(r.exencionDisponibleUF).toBe(0);
    expect(r.exencionAplicada).toBe(0);
    expect(r.baseImponible).toBe(50_000_000);
    expect(r.impuestoPlusvalia).toBe(5_000_000);
  });

  it('cupo usado sobre 8.000 UF se trunca al tope (nunca negativo)', () => {
    const r = calculatePlusvalia({
      precioCompra: 0,
      precioVenta: 50_000_000,
      anosTenencia: 5,
      esViviendaHabitual: true,
      cupoExentoUsadoUF: 9000,
    });
    expect(r.exencionDisponibleUF).toBe(0);
    expect(r.cupoExentoUsadoUF).toBe(8000);
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
