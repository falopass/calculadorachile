import { describe, expect, it } from 'vitest';
import { calculateCapacidadCreditoHipotecario } from '../capacidad-credito-hipotecario';
import { calculateCreditoHipotecario } from '../credito-hipotecario';

const base = { ingresoMensual: 2_000_000, tasaAnual: 4.5, plazoAnos: 25, valorUF: 40_000 };

describe('capacidad-credito-hipotecario', () => {
  it('golden: $2.000.000, 25 %, 4,5 %, 25 años, UF $40.000', () => {
    const r = calculateCapacidadCreditoHipotecario(base);
    expect(r.dividendoMaximoCLP).toBe(500_000);
    expect(r.dividendoMaximoUF).toBe(12.5);
    // VP de 300 cuotas de 12,5 UF al 0,375 % mensual = 2.248,879 UF (truncado a 2.248,87)
    expect(r.creditoMaximoUF).toBe(2248.87);
    expect(r.valorViviendaUF).toBeCloseTo(r.creditoMaximoUF / 0.8, 1);
    expect(r.pieNecesarioUF).toBeCloseTo(r.valorViviendaUF - r.creditoMaximoUF, 2);
  });

  it('el dividendo del crédito máximo no supera el margen (ida y vuelta con credito-hipotecario)', () => {
    const r = calculateCapacidadCreditoHipotecario(base);
    const ida = calculateCreditoHipotecario({
      montoUF: r.creditoMaximoUF,
      plazoAnos: 25,
      tasaAnual: 4.5,
      valorUF: 40_000,
    });
    expect(ida.dividendoMensualCLP).toBeLessThanOrEqual(500_000);
    expect(ida.dividendoMensualCLP).toBeGreaterThan(499_990);
  });

  it('porcentaje editable y otras deudas reducen el margen', () => {
    expect(
      calculateCapacidadCreditoHipotecario({ ...base, porcentajeDividendo: 30 }).dividendoMaximoCLP,
    ).toBe(600_000);
    expect(
      calculateCapacidadCreditoHipotecario({ ...base, otrasDeudasMensuales: 100_000 })
        .dividendoMaximoCLP,
    ).toBe(400_000);
  });

  it('tasa 0 %: crédito = dividendo × meses', () => {
    expect(calculateCapacidadCreditoHipotecario({ ...base, tasaAnual: 0 }).creditoMaximoUF).toBe(
      3750,
    );
  });

  it('financiamiento 90 % baja el pie necesario', () => {
    const r = calculateCapacidadCreditoHipotecario({ ...base, porcentajeFinanciamiento: 90 });
    expect(r.pieNecesarioUF / r.valorViviendaUF).toBeCloseTo(0.1, 3);
  });

  it('valida entradas', () => {
    expect(() => calculateCapacidadCreditoHipotecario({ ...base, ingresoMensual: 0 })).toThrow();
    expect(() =>
      calculateCapacidadCreditoHipotecario({ ...base, otrasDeudasMensuales: 600_000 }),
    ).toThrow();
    expect(() => calculateCapacidadCreditoHipotecario({ ...base, plazoAnos: 25.5 })).toThrow();
    expect(() =>
      calculateCapacidadCreditoHipotecario({ ...base, porcentajeDividendo: 0 }),
    ).toThrow();
  });
});
