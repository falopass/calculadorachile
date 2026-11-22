// ============================================
// Tests del Beneficio por Años Cotizados (BAC)
// ----------------------------------------------
// Golden ChileAtiende ficha 130450: 0,1 UF por cada 12 meses
// cotizados, tope 2,5 UF (25 años), máximo 300 meses computables,
// 65+ años, mínimos 240 meses hombres / 120 mujeres (escalón NCG 350
// hasta 180 en ene-2036). UF de prueba fija: $40.000.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBeneficioAnosCotizados } from '../beneficio-anos-cotizados';

const UF_PRUEBA = 40000;

const baseInput = {
  sexo: 'hombre' as const,
  edad: 70,
  mesesCotizados: 240,
  pensionadoAfp: true,
  pensionRetiroCapredenaDipreca: false,
  valorUF: UF_PRUEBA,
  fecha: new Date('2026-11-22T12:00:00'),
};

describe('calculateBeneficioAnosCotizados', () => {
  it('hombre con 240 meses (20 años): 2 UF mensuales', () => {
    const r = calculateBeneficioAnosCotizados(baseInput);
    expect(r.aplica).toBe(true);
    expect(r.anosComputables).toBe(20);
    expect(r.beneficioUF).toBeCloseTo(2.0);
    expect(r.beneficioCLP).toBe(80000); // 2 UF × $40.000
    expect(r.mesesMinimosExigidos).toBe(240);
    expect(r.motivosNoAplica).toEqual([]);
  });

  it('mujer con 120 meses antes de 2028: 1 UF mensual', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      sexo: 'mujer',
      mesesCotizados: 120,
      fecha: new Date('2027-12-31T12:00:00'),
    });
    expect(r.aplica).toBe(true);
    expect(r.anosComputables).toBe(10);
    expect(r.beneficioUF).toBeCloseTo(1.0);
    expect(r.beneficioCLP).toBe(40000);
  });

  it('aplica el tope de 2,5 UF y el máximo de 300 meses', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      mesesCotizados: 400,
    });
    expect(r.aplica).toBe(true);
    expect(r.mesesComputables).toBe(300);
    expect(r.anosComputables).toBe(25);
    expect(r.beneficioUF).toBeCloseTo(2.5);
    expect(r.beneficioCLP).toBe(100000);
    expect(r.baseCalculo).toContain('300 meses');
  });

  it('los meses que no completan un año pagan proporcional (NCG 350)', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      mesesCotizados: 246, // 20 años + 6 meses
    });
    expect(r.aplica).toBe(true);
    expect(r.anosComputables).toBeCloseTo(20.5);
    expect(r.beneficioUF).toBeCloseTo(2.05);
    expect(r.beneficioCLP).toBe(82000); // 2,05 UF × $40.000
  });

  it('hombre con menos de 240 meses: no aplica', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      mesesCotizados: 239,
    });
    expect(r.aplica).toBe(false);
    expect(r.beneficioCLP).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('240'))).toBe(true);
  });

  it('mujer con 120 meses desde ene-2028: ya no aplica (exige 132)', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      sexo: 'mujer',
      mesesCotizados: 120,
      fecha: new Date('2028-01-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.mesesMinimosExigidos).toBe(132);
    expect(r.motivosNoAplica.some((m) => m.includes('132'))).toBe(true);
  });

  it('mujer con 180 meses desde ene-2036: aplica con 15 años', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      sexo: 'mujer',
      mesesCotizados: 180,
      fecha: new Date('2036-01-01T12:00:00'),
    });
    expect(r.aplica).toBe(true);
    expect(r.mesesMinimosExigidos).toBe(180);
    expect(r.beneficioUF).toBeCloseTo(1.5);
  });

  it('menor de 65 años: no aplica', () => {
    const r = calculateBeneficioAnosCotizados({ ...baseInput, edad: 64 });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.some((m) => m.includes('65'))).toBe(true);
  });

  it('no pensionado en AFP/seguros: no aplica', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      pensionadoAfp: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.some((m) => m.includes('AFP'))).toBe(true);
  });

  it('pensión de retiro Capredena/Dipreca: no aplica', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      pensionRetiroCapredenaDipreca: true,
    });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.some((m) => m.includes('Capredena'))).toBe(true);
  });

  it('sin valorUF inyectado usa el respaldo local', () => {
    const r = calculateBeneficioAnosCotizados({
      ...baseInput,
      valorUF: undefined,
    });
    expect(r.aplica).toBe(true);
    expect(r.valorUF).toBeGreaterThan(0);
    expect(r.beneficioCLP).toBe(Math.round(r.beneficioUF * r.valorUF));
  });
});
