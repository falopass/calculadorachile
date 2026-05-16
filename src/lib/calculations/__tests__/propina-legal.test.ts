// ============================================
// Tests de propina sugerida (Ley 20.918)
// ----------------------------------------------
// Verifica el desglose cuando el monto incluye propina, el
// agregado cuando no, y que la propina NO sea declarada como
// obligatoria.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePropinaLegal } from '../propina-legal';

describe('calculatePropinaLegal', () => {
  it('agrega 10% al consumo cuando NO incluye propina', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 10_000,
      incluyePropina: false,
    });
    expect(r.consumo).toBe(10_000);
    expect(r.propina).toBe(1_000);
    expect(r.total).toBe(11_000);
  });

  it('desglosa cuando el monto incluye propina', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 11_000,
      incluyePropina: true,
    });
    expect(r.total).toBe(11_000);
    expect(r.consumo).toBe(10_000);
    expect(r.propina).toBe(1_000);
  });

  it('porcentaje custom (15%) se aplica correctamente', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 20_000,
      incluyePropina: false,
      porcentajePropina: 15,
    });
    expect(r.propina).toBe(3_000);
    expect(r.total).toBe(23_000);
    expect(r.porcentaje).toBe(15);
  });

  it('porcentaje 0 retorna propina 0', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 10_000,
      incluyePropina: false,
      porcentajePropina: 0,
    });
    expect(r.propina).toBe(0);
    expect(r.total).toBe(10_000);
  });

  it('NUNCA marca la propina como obligatoria', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 10_000,
      incluyePropina: false,
    });
    expect(r.esObligatoria).toBe(false);
  });

  it('monto negativo se acota a 0', () => {
    const r = calculatePropinaLegal({
      montoConsumo: -500,
      incluyePropina: false,
    });
    expect(r.consumo).toBe(0);
    expect(r.propina).toBe(0);
    expect(r.total).toBe(0);
  });

  it('porcentaje > 100 se topa a 100', () => {
    const r = calculatePropinaLegal({
      montoConsumo: 10_000,
      incluyePropina: false,
      porcentajePropina: 150,
    });
    expect(r.porcentaje).toBe(100);
  });
});
