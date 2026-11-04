// Escala lineal 1,0–7,0 con aprobación 4,0 (Decreto 67/2018, art. 8).
import { describe, it, expect } from 'vitest';
import { calculateNotaEscala } from '../nota-minima-escala';

describe('calculateNotaEscala', () => {
  it('60 pts al 60%: 45 pts → 5,125 → 5,1; aprobación con 36', () => {
    const r = calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 45 });
    expect(r.notaExacta).toBe(5.125);
    expect(r.nota).toBe(5.1);
    expect(r.puntajeAprobacion).toBe(36);
    expect(r.porcentajeLogro).toBe(75);
    expect(r.aprueba).toBe(true);
  });

  it('justo el puntaje de aprobación → 4,0', () => {
    expect(calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 36 }).nota).toBe(4);
  });

  it('bajo la aprobación: 18 de 60 → 1 + 3 × 18/36 = 2,5', () => {
    expect(calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 18 }).nota).toBe(2.5);
  });

  it('extremos: 0 → 1,0 y máximo → 7,0', () => {
    expect(calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 0 }).nota).toBe(1);
    expect(calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 60 }).nota).toBe(7);
  });

  it('exigencia 50%: 100 pts, 75 → 5,5', () => {
    const r = calculateNotaEscala({ puntajeMaximo: 100, puntajeObtenido: 75, exigencia: 50 });
    expect(r.nota).toBe(5.5);
    expect(r.puntajeAprobacion).toBe(50);
  });

  it('errores: obtenido > máximo, exigencia > 100', () => {
    expect(() => calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 61 })).toThrow();
    expect(() => calculateNotaEscala({ puntajeMaximo: 60, puntajeObtenido: 30, exigencia: 120 })).toThrow();
  });
});
