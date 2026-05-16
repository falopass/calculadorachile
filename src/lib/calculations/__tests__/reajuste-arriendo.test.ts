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
});
