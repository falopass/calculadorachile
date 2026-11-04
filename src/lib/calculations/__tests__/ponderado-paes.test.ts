// Golden DEMRE (Admisión 2027): ejemplo oficial 848,75; tablas NEM 2027.
import { describe, it, expect } from 'vitest';
import {
  calculatePonderadoPaes,
  promedioNem,
  puntajeNem,
  puntajeRanking,
  rankingNivel,
} from '../ponderado-paes';
import { NEM_TABLAS_2027 } from '@/lib/values/nem-tablas-2027';

const pesosDemre = { nem: 15, ranking: 20, lectora: 10, m1: 35, m2: 10, electiva: 10 };

describe('tablas NEM 2027', () => {
  it('301 filas por grupo y extremos 100 / 1.000', () => {
    for (const g of ['a', 'b', 'c'] as const) {
      expect(NEM_TABLAS_2027[g]).toHaveLength(301);
      expect(puntajeNem(4, g)).toBe(100);
      expect(puntajeNem(7, g)).toBe(1000);
    }
  });
  it('controles DEMRE: 6,00 → 713/717/715; 5,50 → 572/577/574', () => {
    expect(puntajeNem(6, 'a')).toBe(713);
    expect(puntajeNem(6, 'b')).toBe(717);
    expect(puntajeNem(6, 'c')).toBe(715);
    expect(puntajeNem(5.5, 'a')).toBe(572);
    expect(puntajeNem(5.5, 'b')).toBe(577);
    expect(puntajeNem(5.5, 'c')).toBe(574);
  });
  it('promedio NEM a 2 decimales: (6,0+6,2+6,4+6,5)/4 = 6,275 → 6,28 → 793 (A)', () => {
    expect(promedioNem([6.0, 6.2, 6.4, 6.5])).toBe(6.28);
    expect(puntajeNem(6.28, 'a')).toBe(793);
  });
  it('fuera de rango lanza error', () => {
    expect(() => puntajeNem(3.99, 'a')).toThrow();
  });
});

describe('ranking (fórmula Admisión 2027)', () => {
  it('NEM ≤ PROM → igual al NEM', () => expect(rankingNivel(500, 600, 900)).toBe(500));
  it('NEM ≥ MAX → 1.000', () => expect(rankingNivel(900, 600, 900)).toBe(1000));
  it('intermedio: 600 + (750−600)(1000−600)/(900−600) = 800', () =>
    expect(rankingNivel(750, 600, 900)).toBe(800));
  it('promedio de 4 niveles', () =>
    expect(
      puntajeRanking([
        { nem: 750, prom: 600, max: 900 },
        { nem: 500, prom: 600, max: 900 },
        { nem: 900, prom: 600, max: 900 },
        { nem: 750, prom: 600, max: 900 },
      ]),
    ).toBe(775));
});

describe('calculatePonderadoPaes', () => {
  const base = {
    grupoNem: 'a' as const,
    promedioNem: 0,
    anuales: [],
    ranking: 870,
    lectora: 700,
    m1: 900,
    m2: 840,
    historia: 820,
    ciencias: 0,
    pesos: pesosDemre,
  };

  it('reproduce el ejemplo del DEMRE (NEM 825) = 848,75', () => {
    // 825 en la tabla A corresponde a un NEM 6,39.
    expect(puntajeNem(6.39, 'a')).toBe(825);
    const r = calculatePonderadoPaes({ ...base, promedioNem: 6.39 });
    expect(r.puntajeNem).toBe(825);
    expect(r.ponderado).toBe(848.75);
  });

  it('usa la electiva mayor', () => {
    const r = calculatePonderadoPaes({ ...base, promedioNem: 6.39, historia: 600, ciencias: 820 });
    expect(r.electiva).toBe(820);
    expect(r.ponderado).toBe(848.75);
  });

  it('sin ranking → ranking = NEM (marcado como asumido)', () => {
    const r = calculatePonderadoPaes({ ...base, promedioNem: 6.39, ranking: 0 });
    expect(r.rankingAsumido).toBe(true);
    expect(r.puntajeRanking).toBe(825);
    // 848,75 − 0,20 × (870 − 825) = 839,75
    expect(r.ponderado).toBe(839.75);
  });

  it('NEM desde promedios anuales', () => {
    const r = calculatePonderadoPaes({ ...base, anuales: [6.0, 6.2, 6.4, 6.5] });
    expect(r.promedioNem).toBe(6.28);
    expect(r.puntajeNem).toBe(793);
  });

  it('valida suma 100%, M2 ≥ 5% y pruebas faltantes', () => {
    expect(() =>
      calculatePonderadoPaes({ ...base, promedioNem: 6.39, pesos: { ...pesosDemre, m1: 30 } }),
    ).toThrow(/100%/);
    expect(() =>
      calculatePonderadoPaes({
        ...base,
        promedioNem: 6.39,
        pesos: { ...pesosDemre, m2: 3, m1: 42 },
      }),
    ).toThrow(/5%/);
    expect(() => calculatePonderadoPaes({ ...base, promedioNem: 6.39, m2: 0 })).toThrow(/M2/);
  });
});
