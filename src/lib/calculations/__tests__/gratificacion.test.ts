// ============================================
// Tests de gratificación legal (Art. 50 CdT)
// ----------------------------------------------
// El empleador paga el MENOR entre 25% mensual y tope 4,75 IMM/año
// dividido en mensual. Para sueldos altos, aplica el tope; para
// sueldos bajos, aplica el 25%.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateGratificacion } from '../gratificacion';
import { INGRESO_MINIMO, GRATIFICACION } from '@/lib/values/constants';

describe('calculateGratificacion', () => {
  const TOPE_MENSUAL =
    (INGRESO_MINIMO.mensual * GRATIFICACION.tope_475_inm) / 12;

  it('sueldo bajo: aplica 25% del bruto (menor que el tope)', () => {
    const sueldo = 600_000;
    const veinte5 = sueldo * 0.25;
    expect(veinte5).toBeLessThan(TOPE_MENSUAL);
    const r = calculateGratificacion({
      sueldoBruto: sueldo,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.metodo).toBe('25%');
    expect(r.gratificacionMensual).toBe(150_000);
  });

  it('sueldo alto: aplica tope 4,75 IMM / 12', () => {
    const sueldo = 5_000_000;
    const r = calculateGratificacion({
      sueldoBruto: sueldo,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.metodo).toBe('4.75 IMM');
    expect(r.gratificacionMensual).toBeCloseTo(TOPE_MENSUAL, 0);
  });

  it('proporcional: 6 meses recibe la mitad del anual', () => {
    const r = calculateGratificacion({
      sueldoBruto: 800_000,
      mesesTrabajados: 6,
      tipoGratificacion: 'mensual',
    });
    expect(r.gratificacionProporcional).toBe(Math.round(r.gratificacionAnual / 2));
  });

  it('tope anual coincide con 4,75 × IMM ($539.000)', () => {
    const r = calculateGratificacion({
      sueldoBruto: 1_000_000,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.topeAnual).toBe(539_000 * 4.75);
  });

  it('meses negativos se normalizan a 0', () => {
    const r = calculateGratificacion({
      sueldoBruto: 800_000,
      mesesTrabajados: -3,
      tipoGratificacion: 'mensual',
    });
    expect(r.gratificacionProporcional).toBe(0);
  });

  it('mensual × 12 = anual', () => {
    const r = calculateGratificacion({
      sueldoBruto: 600_000,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.gratificacionAnual).toBe(r.gratificacionMensual * 12);
  });
});
