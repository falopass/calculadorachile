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
    const r = calculateGratificacion({
      sueldoBruto: t.umbral,
      mesesTrabajados: 12,
      tipoGratificacion: 'mensual',
    });
    expect(r.gratificacionMensual).toBe(t.mensual);
  });
  it('el umbral redondea hacia arriba: su 25% siempre llega al tope (IMM 500.001)', () => {
    const t = topeGratificacion(500_001);
    const exacto = (500_001 * 4.75) / 12;
    expect(t.umbral * 0.25).toBeGreaterThanOrEqual(exacto);
    expect((t.umbral - 1) * 0.25).toBeLessThan(exacto);
  });

  it('fecha de vigencia en texto', () => {
    expect(topeGratificacion().vigenteDesdeTexto).toBe('1 de mayo de 2026');
  });
});
