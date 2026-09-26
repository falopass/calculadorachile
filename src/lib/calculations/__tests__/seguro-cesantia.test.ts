// ============================================
// Tests de Seguro de Cesantía (Ley 19.728)
// ----------------------------------------------
// Golden CIC (ficha 62932): 70/60/45/40/35/30…% del promedio,
// máx. 13 pagos hasta agotar saldo. Golden FCS (ficha 36646,
// Res. Ex. N°383 vigente al 28-02-2027): 5 pagos con mínimos y
// máximos; el saldo CIC financia primero.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSeguroCesantia } from '../seguro-cesantia';

const elegibleFCS = {
  cotizaciones: 24,
  ultimas3Continuas: true,
  causalFCS: true,
};

describe('calculateSeguroCesantia — FCS', () => {
  it('indefinido, promedio $1.000.000, saldo 0 → 5 pagos FCS exactos', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 1000000,
      saldoCIC: 0,
      ...elegibleFCS,
    });
    expect(r.pagos.map((p) => p.total)).toEqual([
      700000, 600000, 450000, 400000, 350000,
    ]);
    expect(r.totalEstimado).toBe(2500000);
    expect(r.pagos.every((p) => p.desdeCIC === 0)).toBe(true);
  });

  it('indefinido, promedio $2.000.000 → topes máximos FCS', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 2000000,
      saldoCIC: 0,
      ...elegibleFCS,
    });
    expect(r.pagos.map((p) => p.total)).toEqual([
      1004003, 860574, 645429, 573718, 502002,
    ]);
  });

  it('indefinido, promedio $300.000 → pisos mínimos FCS', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 300000,
      saldoCIC: 0,
      ...elegibleFCS,
    });
    expect(r.pagos.map((p) => p.total)).toEqual([
      301201, 258171, 193629, 172115, 150602,
    ]);
  });

  it('plazo fijo, promedio $1.000.000 → 60/40/35/30/30%', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'plazo-fijo',
      remuneracionPromedio: 1000000,
      saldoCIC: 0,
      ...elegibleFCS,
    });
    expect(r.pagos.map((p) => p.total)).toEqual([
      600000, 400000, 350000, 300000, 300000,
    ]);
  });

  it('saldo CIC de $1.000.000 no cubre 5 pagos → FCS complementa desde el saldo', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 1000000,
      saldoCIC: 1000000,
      ...elegibleFCS,
    });
    expect(r.cicCubre5Pagos).toBe(false);
    expect(r.pagos).toHaveLength(5);
    expect(r.pagos[0]).toEqual({
      numero: 1,
      total: 700000,
      desdeCIC: 700000,
      desdeFCS: 0,
    });
    expect(r.pagos[1]).toEqual({
      numero: 2,
      total: 600000,
      desdeCIC: 300000,
      desdeFCS: 300000,
    });
    expect(r.pagos[2].desdeFCS).toBe(450000);
    expect(r.saldoRestanteCIC).toBe(0);
  });
});

describe('calculateSeguroCesantia — solo CIC', () => {
  it('indefinido, promedio $1.000.000, saldo $5.000.000 → 13 pagos, saldo restante $100.000', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 1000000,
      cotizaciones: 24,
      ultimas3Continuas: true,
      causalFCS: false,
      saldoCIC: 5000000,
    });
    expect(r.pagos).toHaveLength(13);
    expect(r.pagos.map((p) => p.total)).toEqual([
      700000, 600000, 450000, 400000, 350000, 300000, 300000, 300000,
      300000, 300000, 300000, 300000, 300000,
    ]);
    expect(r.saldoRestanteCIC).toBe(100000);
  });

  it('sin causal FCS ni saldo informado → solo primer pago estimado', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 1000000,
      cotizaciones: 24,
      ultimas3Continuas: false,
      causalFCS: false,
      saldoCIC: 0,
    });
    expect(r.aplica).toBe(true);
    expect(r.esEstimacionSinSaldo).toBe(true);
    expect(r.pagos).toHaveLength(1);
    expect(r.pagos[0].total).toBe(700000);
  });
});

describe('calculateSeguroCesantia — requisitos', () => {
  it('indefinido con 5 cotizaciones no cumple el mínimo CIC de 10', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 800000,
      cotizaciones: 5,
      ultimas3Continuas: true,
      causalFCS: true,
      saldoCIC: 0,
    });
    expect(r.cumpleCIC).toBe(false);
    expect(r.cumpleFCS).toBe(false);
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('plazo fijo con 5 cotizaciones sí cumple el mínimo CIC', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'plazo-fijo',
      remuneracionPromedio: 800000,
      cotizaciones: 5,
      ultimas3Continuas: true,
      causalFCS: false,
      saldoCIC: 0,
    });
    expect(r.cumpleCIC).toBe(true);
  });
});
