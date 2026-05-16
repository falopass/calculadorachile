// ============================================
// Tests de horas extra (Art. 32 CdT)
// ----------------------------------------------
// Verifica recargo legal 50%, 100% para domingo/festivo, default
// jornada vigente (Ley 21.561) y tope diario 2h.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateHorasExtra } from '../horas-extra';
import { JORNADA_LEGAL, HORAS_EXTRA, SEMANAS_POR_MES } from '@/lib/values/constants';

describe('calculateHorasExtra', () => {
  it('default usa jornada vigente (42h en 2026)', () => {
    const r = calculateHorasExtra({ sueldoBruto: 1_000_000, horasExtra: 0 });
    expect(r.jornadaSemanal).toBe(JORNADA_LEGAL.actual);
  });

  it('valor hora normal = sueldo / (jornada × 4,33)', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 0,
      jornadaSemanal: 44,
    });
    const esperado = Math.round(1_000_000 / (44 * SEMANAS_POR_MES));
    expect(r.valorHoraNormal).toBe(esperado);
  });

  it('hora extra día normal aplica recargo 50%', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 1,
      jornadaSemanal: 44,
    });
    const valorHora = 1_000_000 / (44 * SEMANAS_POR_MES);
    expect(r.recargo).toBe(50);
    expect(r.valorHoraExtra).toBe(Math.round(valorHora * 1.5));
  });

  it('domingo/festivo aplica recargo 100%', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 1,
      esDomingoFestivo: true,
      jornadaSemanal: 44,
    });
    expect(r.recargo).toBe(HORAS_EXTRA.recargo_domingo);
  });

  it('horas extra festivos suman al total', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 5,
      horasExtraFestivos: 3,
      jornadaSemanal: 44,
    });
    expect(r.totalHorasExtra).toBeGreaterThan(0);
    expect(r.horasFestivas).toBe(3);
  });

  it('total a pagar = sueldo + horas extra', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 4,
      jornadaSemanal: 44,
    });
    expect(r.totalAPagar).toBe(1_000_000 + r.totalHorasExtra);
  });

  it('impacto cotizaciones se calcula sobre el monto de horas extra', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 10,
      jornadaSemanal: 44,
      calcularImpactoCotizaciones: true,
    });
    expect(r.impactoCotizaciones).toBeDefined();
    expect(r.impactoCotizaciones!.afp).toBeCloseTo(r.totalHorasExtra * 0.1, -1);
    expect(r.impactoCotizaciones!.salud).toBeCloseTo(r.totalHorasExtra * 0.07, -1);
  });

  it('tope legal: 2 horas diarias (Art. 31 CdT)', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 0,
      mostrarTopeLegal: true,
    });
    expect(r.topeLegal).toBeDefined();
    expect(r.topeLegal!.horasDiarias).toBe(2);
  });

  it('sueldo variable usa promedio 3 meses cuando es mayor', () => {
    const r = calculateHorasExtra({
      sueldoBruto: 800_000,
      horasExtra: 5,
      sueldoVariable: true,
      sueldoPromedio3Meses: 1_200_000,
      jornadaSemanal: 44,
    });
    // Valor hora se calcula sobre $1.200.000
    const esperado = Math.round(1_200_000 / (44 * SEMANAS_POR_MES));
    expect(r.valorHoraNormal).toBe(esperado);
  });
});
