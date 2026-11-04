// ============================================
// Tests de puntaje NEM y ranking — Admisión 2027 (E-036)
// --------------------------------------------
// Golden: promedios 6,2/6,3/6,3/6,3 (grupo A) → NEM 6,28 → puntaje 793
// según la tabla oficial DEMRE. Ranking: fórmula
// Ri = PROM + (NEM − PROM)(1000 − PROM)/(MAX − PROM).
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculatePuntajeNemRanking,
  puntajeNemRankingToResults,
} from '../puntaje-nem-ranking';
import { puntajeNem, rankingNivel } from '../ponderado-paes';

describe('calculatePuntajeNemRanking', () => {
  it('golden: 6,2/6,3/6,3/6,3 en grupo A da NEM 6,28 y puntaje 793; sin colegio ranking = NEM (conservador)', () => {
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.2,
      prom2: 6.3,
      prom3: 6.3,
      prom4: 6.3,
    });
    expect(r.promedioNem).toBe(6.28);
    expect(r.puntajeNem).toBe(793);
    expect(r.puntajeRanking).toBe(793);
    expect(r.rankingConservador).toBe(true);
  });

  it('promedia solo los niveles ingresados (0 = casilla vacía)', () => {
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.2,
      prom2: 0,
      prom3: 6.4,
      prom4: 0,
    });
    expect(r.nivelesIngresados).toBe(2);
    expect(r.promedioNem).toBe(6.3);
    expect(r.puntajeNem).toBe(puntajeNem(6.3, 'a'));
  });

  it('con datos del colegio en puntaje aplica la fórmula DEMRE por nivel', () => {
    // Fórmula: Ri = 600 + (750 − 600)(1000 − 600)/(900 − 600) = 800.
    expect(rankingNivel(750, 600, 900)).toBe(800);

    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.28,
      prom2: 0,
      prom3: 0,
      prom4: 0,
      promColegio: 600,
      maxColegio: 900,
    });
    expect(r.rankingConservador).toBe(false);
    expect(r.puntajePromColegio).toBe(600);
    expect(r.puntajeMaxColegio).toBe(900);
    // Nivel: puntajeNem(6,28) = 793 → 600 + 193·400/300 = 857,33.
    expect(r.puntajeRanking).toBeCloseTo(857.33, 2);
  });

  it('con datos del colegio como notas los convierte a puntaje con la tabla NEM', () => {
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.28,
      prom2: 0,
      prom3: 0,
      prom4: 0,
      promColegio: 5.5,
      maxColegio: 6.8,
    });
    expect(r.rankingConservador).toBe(false);
    expect(r.puntajePromColegio).toBe(puntajeNem(5.5, 'a')); // 572
    expect(r.puntajeMaxColegio).toBe(puntajeNem(6.8, 'a')); // 942
    // Nivel 793: 572 + (793 − 572)(1000 − 572)/(942 − 572) = 827,64.
    expect(r.puntajeRanking).toBeCloseTo(827.64, 2);
  });

  it('NEM de nivel ≥ MAX del colegio lleva ese nivel a 1.000', () => {
    expect(rankingNivel(900, 600, 900)).toBe(1000);
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.8,
      prom2: 6.8,
      prom3: 6.8,
      prom4: 6.8,
      promColegio: 5.5,
      maxColegio: 6.8,
    });
    // puntajeNem(6,8) = 942 = MAX → cada nivel llega a 1.000.
    expect(r.puntajeRanking).toBe(1000);
  });

  it('NEM de nivel ≤ PROM del colegio conserva el NEM de ese nivel', () => {
    expect(rankingNivel(500, 600, 900)).toBe(500);
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 5.0,
      prom2: 5.0,
      prom3: 5.0,
      prom4: 5.0,
      promColegio: 600,
      maxColegio: 900,
    });
    expect(r.puntajeRanking).toBe(puntajeNem(5.0, 'a')); // 415
  });

  it('si MAX no supera a PROM (o falta un dato) cae en estimación conservadora', () => {
    const invertido = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.5,
      prom2: 0,
      prom3: 0,
      prom4: 0,
      promColegio: 6.5,
      maxColegio: 6.4,
    });
    expect(invertido.rankingConservador).toBe(true);
    expect(invertido.puntajeRanking).toBe(invertido.puntajeNem);

    const incompleto = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.5,
      prom2: 0,
      prom3: 0,
      prom4: 0,
      promColegio: 5.5,
    });
    expect(incompleto.rankingConservador).toBe(true);
  });

  it('rechaza promedios fuera de 4,0–7,0 y exige al menos uno', () => {
    expect(() =>
      calculatePuntajeNemRanking({ grupoNem: 'a', prom1: 3.9, prom2: 6, prom3: 6, prom4: 6 }),
    ).toThrow(/4,0 y 7,0/);
    expect(() =>
      calculatePuntajeNemRanking({ grupoNem: 'a', prom1: 7.1, prom2: 6, prom3: 6, prom4: 6 }),
    ).toThrow(/4,0 y 7,0/);
    expect(() =>
      calculatePuntajeNemRanking({ grupoNem: 'a', prom1: 0, prom2: 0, prom3: 0, prom4: 0 }),
    ).toThrow(/al menos/);
  });

  it('toResults destaca el ranking y declara la estimación conservadora', () => {
    const r = calculatePuntajeNemRanking({
      grupoNem: 'a',
      prom1: 6.2,
      prom2: 6.3,
      prom3: 6.3,
      prom4: 6.3,
    });
    const results = puntajeNemRankingToResults(r);
    expect(results[0].highlight).toBe(true);
    expect(results[0].value).toBe(793);
    expect(results[0].label).toMatch(/conservadora/i);
    expect(results[0].note?.text).toMatch(/no es el ranking oficial/i);
  });
});
