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

  it('saldo entre la suma CIC y la suma FCS sí activa el FCS (art. 24 c)', () => {
    // promedio $300.000: 5 pagos CIC = 750.000 pero 5 pagos FCS = 1.075.718.
    // Un saldo de $900.000 cubriría los 5 giros CIC y antes negaba el FCS;
    // la ley lo compara contra los montos del Fondo, con pisos y topes.
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 300000,
      saldoCIC: 900000,
      ...elegibleFCS,
    });
    expect(r.cicCubre5Pagos).toBe(false);
    expect(r.pagos.map((p) => p.total)).toEqual([
      301201, 258171, 193629, 172115, 150602,
    ]);
    expect(r.pagos[0].desdeCIC).toBe(301201);
    expect(r.pagos.reduce((acc, p) => acc + p.desdeFCS, 0)).toBe(175718);
    expect(r.saldoRestanteCIC).toBe(0);
  });

  it('saldo que cubre los 5 pagos FCS no activa el Fondo', () => {
    // promedio $2.000.000: 5 pagos FCS = 3.085.726 (topes); saldo mayor → solo CIC.
    const r = calculateSeguroCesantia({
      tipoContrato: 'indefinido',
      remuneracionPromedio: 2000000,
      saldoCIC: 4000000,
      ...elegibleFCS,
    });
    expect(r.cicCubre5Pagos).toBe(true);
    expect(r.pagos.every((p) => p.desdeFCS === 0)).toBe(true);
    expect(r.pagos[0].total).toBe(1400000);
  });

  it('plazo fijo: el FCS usa el promedio de las últimas 10 remuneraciones (art. 25)', () => {
    const r = calculateSeguroCesantia({
      tipoContrato: 'plazo-fijo',
      remuneracionPromedio: 400000, // promedio últimas 5 (base CIC)
      remuneracionPromedioFCS: 1000000, // promedio últimas 10 (base FCS)
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
