// ============================================
// Tests de reajuste de arriendo (Ley 18.101 / 21.461)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateReajusteArriendo } from '../reajuste-arriendo';
import { UF } from '@/lib/values/constants';

describe('calculateReajusteArriendo', () => {
  it('arriendo en UF NO recibe IPC adicional (la UF ya se reajusta)', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 20,
      arriendoEnUF: true,
      variacionIPC: 5,
      mesesDesdeUltimoReajuste: 12,
    });
    expect(r.factorReajuste).toBe(1);
    expect(r.nuevoArriendoUF).toBeCloseTo(20, 1);
    expect(r.motivoSinReajuste).toBeDefined();
  });

  it('arriendo en CLP con IPC anual 5%, 12+ meses: aplica 5% completo', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: 5,
      mesesDesdeUltimoReajuste: 12,
    });
    expect(r.factorReajuste).toBeCloseTo(1.05, 4);
    expect(r.nuevoArriendoCLP).toBe(525_000);
    expect(r.incrementoMensual).toBe(25_000);
  });

  it('CLP, 6 meses: prorrateo lineal del IPC (50%)', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: 6,
      mesesDesdeUltimoReajuste: 6,
    });
    // Factor = 1 + 6% × 6/12 = 1.03
    expect(r.factorReajuste).toBeCloseTo(1.03, 4);
    expect(r.nuevoArriendoCLP).toBe(515_000);
  });

  it('CLP, 0 meses: factor = 1, sin reajuste', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: 5,
      mesesDesdeUltimoReajuste: 0,
    });
    expect(r.factorReajuste).toBe(1);
    expect(r.incrementoMensual).toBe(0);
  });

  it('arriendo en UF muestra equivalente en CLP usando UF actual', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 15,
      arriendoEnUF: true,
      variacionIPC: 0,
      mesesDesdeUltimoReajuste: 12,
    });
    expect(r.arriendoActual).toBeCloseTo(15 * UF.valor, 0);
  });

  it('IPC negativo (deflación) reduce el arriendo proporcionalmente', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: -2,
      mesesDesdeUltimoReajuste: 12,
    });
    expect(r.nuevoArriendoCLP).toBe(490_000);
    expect(r.incrementoPorcentual).toBeCloseTo(-2, 1);
  });

  it('con mesInicial + mesFinal usa la serie oficial INE en vez del prorrateo (sep-2025 → sep-2026)', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: 6, // se ignora: la serie INE manda
      mesesDesdeUltimoReajuste: 12,
      mesInicial: '2025-09',
      mesFinal: '2026-09',
    });
    // INE: 113,59 / 109,14 = 1,0407733… → 4,08% (4,1% publicado)
    const factorIne = 113.59 / 109.14;
    expect(r.factorReajuste).toBeCloseTo(factorIne, 4);
    expect(r.nuevoArriendoCLP).toBe(Math.round(500_000 * factorIne)); // 520.387
    expect(r.variacionIPC).toBeCloseTo((factorIne - 1) * 100, 1);
    expect(r.mesInicial).toBe('2025-09');
    expect(r.mesFinal).toBe('2026-09');
    expect(r.indiceIpcInicial).toBe(109.14);
    expect(r.indiceIpcFinal).toBe(113.59);
    // El prorrateo lineal de 6% habría dado 530.000: el INE difiere.
    expect(r.nuevoArriendoCLP).not.toBe(530_000);
  });

  it('serie INE a 6 meses reales (mar-2026 → sep-2026) difiere del prorrateo lineal', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 500_000,
      arriendoEnUF: false,
      variacionIPC: 5, // hipotético anual → prorrateo daría 1,025
      mesesDesdeUltimoReajuste: 6,
      mesInicial: '2026-03',
      mesFinal: '2026-09',
    });
    // INE: 113,59 / 110,75 = 1,025643… → 2,56%
    // Prorrateo lineal: 1 + 5% × 6/12 = 1,025 → 512.500
    const factorIne = 113.59 / 110.75;
    expect(r.factorReajuste).toBeCloseTo(factorIne, 4);
    expect(r.nuevoArriendoCLP).toBe(Math.round(500_000 * factorIne)); // 512.822
    expect(r.factorReajuste).not.toBeCloseTo(1.025, 4);
    expect(r.incrementoMensual).toBe(Math.round(500_000 * factorIne) - 500_000);
  });

  it('arriendo en UF ignora la serie INE: la UF ya se reajusta sola', () => {
    const r = calculateReajusteArriendo({
      arriendoActual: 20,
      arriendoEnUF: true,
      variacionIPC: 5,
      mesesDesdeUltimoReajuste: 12,
      mesInicial: '2025-09',
      mesFinal: '2026-09',
    });
    expect(r.factorReajuste).toBe(1);
    expect(r.motivoSinReajuste).toBeDefined();
    expect(r.indiceIpcInicial).toBeUndefined();
  });
});
