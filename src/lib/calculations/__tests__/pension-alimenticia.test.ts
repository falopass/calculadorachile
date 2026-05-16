// ============================================
// Tests de pensión alimenticia (Ley 14.908)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePensionAlimenticia } from '../pension-alimenticia';

describe('calculatePensionAlimenticia', () => {
  it('1 hijo: 40% del ingreso', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 1,
      tieneOtroIngreso: false,
    });
    expect(r.porcentajeAplicable).toBe(40);
    expect(r.pensionSugerida).toBe(400_000);
  });

  it('2 hijos: 30% × 2 = 60% (sin tope)', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 800_000,
      numeroHijos: 2,
      tieneOtroIngreso: false,
    });
    // Sin tope, sería 60%, pero hay tope 50% → debe aplicarse
    expect(r.topeAplicado).toBe(true);
    expect(r.pensionSugerida).toBe(400_000); // 50% × 800.000
  });

  it('tope 50% del ingreso del alimentante', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 3,
      tieneOtroIngreso: false,
    });
    expect(r.topeAplicado).toBe(true);
    expect(r.pensionSugerida).toBeLessThanOrEqual(r.topeMaximo);
    expect(r.topeMaximo).toBe(500_000);
  });

  it('mínimo legal: 40% IMM primer hijo + 30% IMM por adicional', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 600_000,
      numeroHijos: 2,
      tieneOtroIngreso: false,
    });
    // 40% × 539.000 + 30% × 539.000 = 215.600 + 161.700 = 377.300
    expect(r.minimoLegal).toBe(Math.round(539_000 * 0.4 + 539_000 * 0.3));
  });

  it('otro ingreso suma a la base', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 600_000,
      numeroHijos: 1,
      tieneOtroIngreso: true,
      otroIngreso: 400_000,
    });
    expect(r.totalIngresos).toBe(1_000_000);
    expect(r.pensionSugerida).toBe(400_000);
  });

  it('cero hijos: pensión cero', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 0,
      tieneOtroIngreso: false,
    });
    expect(r.pensionSugerida).toBe(0);
    expect(r.tramoAplicado).toBe('Sin hijos');
  });

  it('pensión por hijo distribuye proporcionalmente', () => {
    const r = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 2,
      tieneOtroIngreso: false,
    });
    expect(r.pensionPorHijo).toBe(Math.round(r.pensionSugerida / 2));
  });
});
