// ============================================
// Tests de Bono Bodas de Oro (Ley 20.506)
// ----------------------------------------------
// Golden montos ChileAtiende ficha 5369: $463.166 ($231.583 por
// cónyuge) hasta 30-sep-2026; $482.295 ($241.147) desde 1-oct-2026.
// Elegibilidad: 50 años exactos de matrimonio (plazo de un año),
// 80% vulnerable RSH, convivencia sin separación, residencia 4/5
// años y regla de viudez dentro del plazo.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBonoBodasOro } from '../bono-bodas-oro';

const baseInput = {
  anosMatrimonio: 50,
  perteneceAl80Vulnerable: true,
  convivenSinSeparacion: true,
  residencia4de5: true,
  situacionConyuges: 'ambos-vivos' as const,
};

describe('calculateBonoBodasOro', () => {
  it('antes del 1-oct-2026 paga $463.166 total / $231.583 por cónyuge', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      fecha: new Date('2026-09-30T12:00:00'),
    });
    expect(r.aplica).toBe(true);
    expect(r.montoPorConyuge).toBe(231583);
    expect(r.montoTotal).toBe(463166);
    expect(r.montoVigenteDesde).toBe('2025-10-01');
    expect(r.motivosNoAplica).toEqual([]);
  });

  it('desde el 1-oct-2026 paga $482.295 total / $241.147 por cónyuge', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(true);
    expect(r.montoPorConyuge).toBe(241147);
    expect(r.montoTotal).toBe(482295);
    expect(r.montoVigenteDesde).toBe('2026-10-01');
  });

  it('menos de 50 años de matrimonio: no aplica', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      anosMatrimonio: 49,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('50'))).toBe(true);
  });

  it('51 años o más: el plazo de un año venció', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      anosMatrimonio: 51,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('plazo'))).toBe(true);
  });

  it('no pertenece al 80% vulnerable RSH: no aplica', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      perteneceAl80Vulnerable: false,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('RSH'))).toBe(true);
  });

  it('sin convivencia / separados: no aplica', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      convivenSinSeparacion: false,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('separados'))).toBe(true);
  });

  it('sin residencia 4 de los últimos 5 años: no aplica', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      residencia4de5: false,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('residencia'))).toBe(true);
  });

  it('viudez dentro del plazo: aplica y puede optar a la parte del cónyuge', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      situacionConyuges: 'viudez-en-plazo',
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(true);
    expect(r.montoTotal).toBe(482295);
    expect(r.montoPorConyuge).toBe(241147);
    expect(r.parteConyugeFallecido).toBe(241147);
  });

  it('viudez fuera del plazo: no aplica', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      situacionConyuges: 'viudez-fuera-plazo',
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.parteConyugeFallecido).toBe(0);
  });

  it('múltiples requisitos no cumplidos: lista todos los motivos', () => {
    const r = calculateBonoBodasOro({
      ...baseInput,
      anosMatrimonio: 20,
      perteneceAl80Vulnerable: false,
      convivenSinSeparacion: false,
      fecha: new Date('2026-10-01T12:00:00'),
    });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.length).toBeGreaterThanOrEqual(3);
  });
});
