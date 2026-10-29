import { describe, expect, it } from 'vitest';
import { topeGratificacion } from '../gratificacion-tope';
import { calculateGratificacion } from '@/lib/calculations/gratificacion';

describe('topeGratificacion (E-014)', () => {
  it('IMM $553.553 → tope anual $2.629.377, mensual $219.115, umbral $876.459', () => {
    expect(topeGratificacion(553_553)).toMatchObject({
      anual: 2_629_377,
      mensual: 219_115,
      umbral: 876_459,
    });
  });

  it('el año sale de INGRESO_MINIMO.vigente_desde', () => {
    expect(topeGratificacion().anio).toBe(2026);
  });

  it('coincide con calculateGratificacion en un sueldo sobre el tope', () => {
    const r = calculateGratificacion({
      sueldoBruto: 1_500_000,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.gratificacionMensual).toBe(topeGratificacion().mensual);
    expect(r.gratificacionAnual).toBe(topeGratificacion().anual);
  });

  it('en el umbral el 25% ya llega al tope', () => {
    const t = topeGratificacion();
    const r = calculateGratificacion({ sueldoBruto: t.umbral, mesesTrabajados: 12, tipoGratificacion: 'mensual' });
    expect(r.gratificacionMensual).toBe(t.mensual);
  });
});
