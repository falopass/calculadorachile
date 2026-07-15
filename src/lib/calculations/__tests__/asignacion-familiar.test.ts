// ============================================
// Tests de asignación familiar (Ley 21.830 / DFL 150)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateAsignacionFamiliar } from '../asignacion-familiar';
import { ASIGNACION_FAMILIAR_2026 } from '@/lib/values/constants';

describe('calculateAsignacionFamiliar', () => {
  it('tramo A (ingreso promedio bajo): monto $22.601 por carga', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 500_000,
      numeroHijos: 2,
    });
    expect(r.tramo).toBe('a');
    expect(r.montoPorHijo).toBe(ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP);
    expect(r.asignacionMensual).toBe(2 * ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP);
  });

  it('tramo B (ingreso promedio medio): monto $13.870 por carga', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 800_000,
      numeroHijos: 1,
    });
    expect(r.tramo).toBe('b');
    expect(r.montoPorHijo).toBe(ASIGNACION_FAMILIAR_2026.tramoB.montoPorCargaCLP);
  });

  it('tramo C: monto reducido $4.382', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 1_200_000,
      numeroHijos: 2,
    });
    expect(r.tramo).toBe('c');
    expect(r.montoPorHijo).toBe(ASIGNACION_FAMILIAR_2026.tramoC.montoPorCargaCLP);
  });

  it('tramo D (sueldo alto): sin derecho, monto cero', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 2_000_000,
      numeroHijos: 3,
    });
    expect(r.tramo).toBe('d');
    expect(r.tieneDerecho).toBe(false);
    expect(r.asignacionMensual).toBe(0);
    expect(r.motivoSinDerecho).toBeDefined();
  });

  it('asignación anual = mensual × 12', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 500_000,
      numeroHijos: 2,
    });
    expect(r.asignacionAnual).toBe(r.asignacionMensual * 12);
  });

  it('tramo forzado se respeta', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 500_000,
      numeroHijos: 1,
      tramo: 'c',
    });
    expect(r.tramo).toBe('c');
    expect(r.montoPorHijo).toBe(ASIGNACION_FAMILIAR_2026.tramoC.montoPorCargaCLP);
  });

  it('cero hijos: asignación cero aún si hay derecho por tramo', () => {
    const r = calculateAsignacionFamiliar({
      sueldoBruto: 500_000,
      numeroHijos: 0,
    });
    expect(r.asignacionMensual).toBe(0);
  });
});
