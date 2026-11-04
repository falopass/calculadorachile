// ============================================
// Tests de la calculadora de Interés Compuesto
// ----------------------------------------------
// Verifica el valor futuro con y sin aportes periódicos,
// las frecuencias de capitalización, la tasa 0% y las
// validaciones de inputs.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateInteresCompuesto } from '../interes-compuesto';

describe('calculateInteresCompuesto', () => {
  it('golden: $1.000.000 al 10% anual, capitalización anual, 2 años → $1.210.000', () => {
    const r = calculateInteresCompuesto({
      capitalInicial: 1_000_000,
      tasaAnual: 10,
      anos: 2,
      frecuencia: 'anual',
    });
    expect(r.montoFinal).toBe(1_210_000);
    expect(r.gananciaIntereses).toBe(210_000);
    expect(r.totalAportado).toBe(1_000_000);
    expect(r.totalAportes).toBe(0);
    expect(r.rentabilidadTotalPct).toBe(21);
  });

  it('capitalización mensual rinde más que anual con la misma tasa nominal', () => {
    const anual = calculateInteresCompuesto({
      capitalInicial: 1_000_000,
      tasaAnual: 12,
      anos: 1,
      frecuencia: 'anual',
    });
    const mensual = calculateInteresCompuesto({
      capitalInicial: 1_000_000,
      tasaAnual: 12,
      anos: 1,
      frecuencia: 'mensual',
    });
    expect(anual.montoFinal).toBe(1_120_000);
    // (1 + 0,12/12)^12 = 1,01^12 ≈ 1,12682503 → $1.126.825
    expect(mensual.montoFinal).toBe(1_126_825);
    expect(mensual.montoFinal).toBeGreaterThan(anual.montoFinal);
  });

  it('golden con aportes: $500.000 + $50.000 mensual al 6% nominal mensual por 1 año', () => {
    const r = calculateInteresCompuesto({
      capitalInicial: 500_000,
      tasaAnual: 6,
      anos: 1,
      frecuencia: 'mensual',
      aporteMensual: 50_000,
    });
    // i = 0,005; N = 12; 1,005^12 ≈ 1,0616778
    // Capital: 500.000 × 1,0616778 ≈ 530.839
    // Aportes: 50.000 × ((1,0616778 − 1) / 0,005) ≈ 616.778
    expect(r.montoFinal).toBe(1_147_617);
    expect(r.totalAportes).toBe(600_000);
    expect(r.totalAportado).toBe(1_100_000);
    expect(r.gananciaIntereses).toBe(47_617);
    expect(r.rentabilidadTotalPct).toBeCloseTo(4.33, 2);
  });

  it('capitalización trimestral agrupa el aporte mensual ×3 por período', () => {
    const r = calculateInteresCompuesto({
      capitalInicial: 1_000_000,
      tasaAnual: 8,
      anos: 1,
      frecuencia: 'trimestral',
      aporteMensual: 10_000,
    });
    // m = 4 → i = 0,02; N = 4; A = 10.000 × 3 = 30.000
    // 1,02^4 = 1,08243216 → capital 1.082.432,16
    // Aportes: 30.000 × (0,08243216 / 0,02) = 123.648,24
    expect(r.aportePorPeriodo).toBe(30_000);
    expect(r.periodosTotales).toBe(4);
    expect(r.totalAportes).toBe(120_000);
    expect(r.montoFinal).toBe(1_206_080);
  });

  it('tasa 0%: el monto final es la suma de lo aportado', () => {
    const r = calculateInteresCompuesto({
      capitalInicial: 100_000,
      tasaAnual: 0,
      anos: 2,
      frecuencia: 'mensual',
      aporteMensual: 50_000,
    });
    expect(r.montoFinal).toBe(1_300_000); // 100.000 + 50.000 × 24
    expect(r.gananciaIntereses).toBe(0);
    expect(r.rentabilidadTotalPct).toBe(0);
  });

  it('capitalización semestral usa m = 2', () => {
    const r = calculateInteresCompuesto({
      capitalInicial: 1_000_000,
      tasaAnual: 10,
      anos: 1,
      frecuencia: 'semestral',
    });
    // i = 0,05; N = 2 → 1,05^2 = 1,1025
    expect(r.periodosTotales).toBe(2);
    expect(r.montoFinal).toBe(1_102_500);
  });

  it('rechaza capital inicial negativo', () => {
    expect(() =>
      calculateInteresCompuesto({
        capitalInicial: -100_000,
        tasaAnual: 10,
        anos: 1,
        frecuencia: 'anual',
      }),
    ).toThrow(/capital inicial/i);
  });

  it('rechaza plazo 0 o negativo', () => {
    expect(() =>
      calculateInteresCompuesto({
        capitalInicial: 1_000_000,
        tasaAnual: 10,
        anos: 0,
        frecuencia: 'anual',
      }),
    ).toThrow(/plazo/i);
  });

  it('rechaza tasa anual fuera de rango o aporte negativo', () => {
    expect(() =>
      calculateInteresCompuesto({
        capitalInicial: 1_000_000,
        tasaAnual: 150,
        anos: 1,
        frecuencia: 'anual',
      }),
    ).toThrow(/tasa/i);
    expect(() =>
      calculateInteresCompuesto({
        capitalInicial: 1_000_000,
        tasaAnual: 5,
        anos: 1,
        frecuencia: 'anual',
        aporteMensual: -10_000,
      }),
    ).toThrow(/aporte/i);
  });
});
