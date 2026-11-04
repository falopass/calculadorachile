// Golden: Decreto 67/2018 (escala 1,0–7,0; aprobación 4,0).
import { describe, it, expect } from 'vitest';
import { calculatePromedioNotas } from '../promedio-notas';

const base = { pesos: [], redondeo: 'decima' as const, notaObjetivo: 0 };

describe('calculatePromedioNotas', () => {
  it('promedio simple (5,0 + 6,0 + 4,5) / 3 = 5,1666 → 5,2', () => {
    const r = calculatePromedioNotas({ ...base, notas: [5, 6, 4.5] });
    expect(r.promedioExacto).toBeCloseTo(5.1667, 4);
    expect(r.promedio).toBe(5.2);
    expect(r.aprueba).toBe(true);
    expect(r.notaNecesaria).toBeNull();
  });

  it('aproximación a la centésima', () => {
    const r = calculatePromedioNotas({ ...base, notas: [5, 6, 4.5], redondeo: 'centesima' });
    expect(r.promedio).toBe(5.17);
  });

  it('ponderado 30/30/40 = 5,1', () => {
    const r = calculatePromedioNotas({ ...base, notas: [5, 6, 4.5], pesos: [30, 30, 40] });
    expect(r.promedioExacto).toBe(5.1);
    expect(r.notaNecesaria).toBeNull();
  });

  it('3,95 se aproxima a 4,0 a la décima', () => {
    const r = calculatePromedioNotas({ ...base, notas: [3.9, 4.0] });
    expect(r.promedio).toBe(4.0);
    expect(r.aprueba).toBe(true);
  });

  it('3,94 queda en 3,9 y reprueba', () => {
    const r = calculatePromedioNotas({ ...base, notas: [3.88, 4.0] });
    expect(r.promedio).toBe(3.9);
    expect(r.aprueba).toBe(false);
  });

  it('nota necesaria en el 20% restante: 1,5 (ejemplo de la metodología)', () => {
    const r = calculatePromedioNotas({ ...base, notas: [5, 6, 2], pesos: [30, 30, 20] });
    expect(r.promedioExacto).toBe(4.625);
    expect(r.promedio).toBe(4.6);
    expect(r.pesoPendiente).toBe(20);
    expect(r.notaNecesaria).toBe(1.5);
  });

  it('nota necesaria con objetivo 5,5 en examen de 30%', () => {
    const r = calculatePromedioNotas({ ...base, notas: [5, 5], pesos: [35, 35], notaObjetivo: 5.5 });
    // (5,5 − 5,0 × 0,7) / 0,3 = 6,67
    expect(r.notaNecesaria).toBe(6.67);
  });

  it('ignora casillas vacías (0)', () => {
    const r = calculatePromedioNotas({ ...base, notas: [6, 0, 7, 0] });
    expect(r.cantidadNotas).toBe(2);
    expect(r.promedio).toBe(6.5);
  });

  it('errores: sin notas, nota fuera de escala, pesos > 100, peso faltante', () => {
    expect(() => calculatePromedioNotas({ ...base, notas: [] })).toThrow();
    expect(() => calculatePromedioNotas({ ...base, notas: [7.5] })).toThrow();
    expect(() => calculatePromedioNotas({ ...base, notas: [5, 6], pesos: [60, 50] })).toThrow();
    expect(() => calculatePromedioNotas({ ...base, notas: [5, 6], pesos: [60, 0] })).toThrow();
  });
});
