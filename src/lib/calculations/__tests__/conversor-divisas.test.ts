// ============================================
// Tests de conversor de divisas USD/EUR
// ----------------------------------------------
// Verifica que use las tasas reales del snapshot del BCCh y que
// permita override con `tasaPersonalizada`.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateConversorDivisas } from '../conversor-divisas';
import { DOLAR, EURO } from '@/lib/values/constants';

describe('calculateConversorDivisas', () => {
  it('USD → CLP usa la tasa del snapshot DOLAR.observado', () => {
    const r = calculateConversorDivisas({
      monto: 100,
      moneda: 'usd',
      direccion: 'a_clp',
    });
    expect(r.tasaCambio).toBeCloseTo(DOLAR.observado, 0);
    expect(r.resultado).toBe(Math.round(100 * DOLAR.observado));
    expect(r.resultadoEnCLP).toBe(true);
  });

  it('CLP → USD invierte la operación', () => {
    const r = calculateConversorDivisas({
      monto: 1_000_000,
      moneda: 'usd',
      direccion: 'desde_clp',
    });
    expect(r.resultado).toBeCloseTo(1_000_000 / DOLAR.observado, 1);
    expect(r.resultadoEnCLP).toBe(false);
  });

  it('EUR → CLP usa la tasa del snapshot EURO.valor', () => {
    const r = calculateConversorDivisas({
      monto: 50,
      moneda: 'eur',
      direccion: 'a_clp',
    });
    expect(r.tasaCambio).toBeCloseTo(EURO.valor, 0);
    expect(r.resultado).toBe(Math.round(50 * EURO.valor));
  });

  it('tasa personalizada anula los valores del snapshot', () => {
    const r = calculateConversorDivisas({
      monto: 100,
      moneda: 'usd',
      direccion: 'a_clp',
      tasaPersonalizada: 1000,
    });
    expect(r.tasaCambio).toBe(1000);
    expect(r.resultado).toBe(100_000);
  });

  it('monto negativo se acota a 0', () => {
    const r = calculateConversorDivisas({
      monto: -500,
      moneda: 'usd',
      direccion: 'a_clp',
    });
    expect(r.monto).toBe(0);
    expect(r.resultado).toBe(0);
  });

  it('tasa personalizada inválida (≤0) cae al snapshot', () => {
    const r = calculateConversorDivisas({
      monto: 100,
      moneda: 'usd',
      direccion: 'a_clp',
      tasaPersonalizada: 0,
    });
    expect(r.tasaCambio).toBeCloseTo(DOLAR.observado, 0);
  });

  it('dirección a_clp marca resultadoEnCLP=true; desde_clp=false', () => {
    const aClp = calculateConversorDivisas({
      monto: 1,
      moneda: 'usd',
      direccion: 'a_clp',
    });
    const desdeClp = calculateConversorDivisas({
      monto: 1000,
      moneda: 'usd',
      direccion: 'desde_clp',
    });
    expect(aClp.resultadoEnCLP).toBe(true);
    expect(desdeClp.resultadoEnCLP).toBe(false);
  });
});
