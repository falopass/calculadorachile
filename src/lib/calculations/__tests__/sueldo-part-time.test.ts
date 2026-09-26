// ============================================
// Tests de Sueldo Part-Time
// ----------------------------------------------
// Golden DT (art. 161 Cod. del Trabajo / ficha 60136): jornada
// parcial ≤ 30 h → IMM proporcional (IMM × h / 42); jornada
// intermedia (>30 y <42 h) → IMM íntegro. IMM $553.553.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSueldoPartTime } from '../sueldo-part-time';
import { INGRESO_MINIMO } from '@/lib/values/constants';

describe('calculateSueldoPartTime', () => {
  it('30 h → IMM proporcional $395.395', () => {
    const r = calculateSueldoPartTime({ horasSemanales: 30 });
    expect(r.esJornadaParcial).toBe(true);
    expect(r.minimoLegal).toBe(395395);
  });

  it('20 h → IMM proporcional $263.597', () => {
    const r = calculateSueldoPartTime({ horasSemanales: 20 });
    expect(r.minimoLegal).toBe(263597);
  });

  it('36 h (jornada intermedia) → IMM íntegro $553.553', () => {
    const r = calculateSueldoPartTime({ horasSemanales: 36 });
    expect(r.esJornadaIntermedia).toBe(true);
    expect(r.minimoLegal).toBe(INGRESO_MINIMO.mensual);
  });

  it('42 h → IMM íntegro $553.553', () => {
    const r = calculateSueldoPartTime({ horasSemanales: 42 });
    expect(r.minimoLegal).toBe(553553);
  });

  it('valor hora de 30 h al mínimo proporcional → $3.075', () => {
    const r = calculateSueldoPartTime({ horasSemanales: 30 });
    expect(r.valorHora).toBe(Math.round((395395 * 28) / (30 * 4 * 30)));
    expect(r.valorHora).toBe(3075);
  });

  it('20 h con sueldo pactado $250.000 → bajo el mínimo, diferencia $13.597', () => {
    const r = calculateSueldoPartTime({
      horasSemanales: 20,
      sueldoPactado: 250000,
    });
    expect(r.cumpleMinimo).toBe(false);
    expect(r.diferencia).toBe(13597);
  });

  it('sueldo pactado sobre el mínimo → cumple', () => {
    const r = calculateSueldoPartTime({
      horasSemanales: 20,
      sueldoPactado: 300000,
    });
    expect(r.cumpleMinimo).toBe(true);
    expect(r.diferencia).toBe(0);
  });
});
