// ============================================
// Tests del simulador de Depósito a Plazo (DAP)
// ----------------------------------------------
// Verifica el prorrateo de la tasa (base 30 días mensual,
// base 360 días anual), la capitalización por renovaciones,
// la conversión CLP ↔ UF y las validaciones de inputs.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateDepositoAPlazo } from '../deposito-a-plazo';

const UF_TEST = 39_000;

describe('calculateDepositoAPlazo', () => {
  it('golden: $1.000.000 a 30 días con tasa mensual 0,5% → interés $5.000', () => {
    const r = calculateDepositoAPlazo({
      monto: 1_000_000,
      moneda: 'CLP',
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual',
      plazoDias: 30,
    });
    expect(r.interesesGanadosCLP).toBe(5_000);
    expect(r.montoFinalCLP).toBe(1_005_000);
    expect(r.tasaEfectivaTotalPct).toBe(0.5);
    expect(r.periodos).toBe(1);
  });

  it('golden: $1.000.000 a 60 días con tasa mensual 0,5% → interés $10.000', () => {
    const r = calculateDepositoAPlazo({
      monto: 1_000_000,
      moneda: 'CLP',
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual',
      plazoDias: 60,
    });
    // 0,5% × (60/30) = 1% efectivo del período
    expect(r.interesesGanadosCLP).toBe(10_000);
    expect(r.montoFinalCLP).toBe(1_010_000);
    expect(r.tasaEfectivaTotalPct).toBe(1);
  });

  it('tasa anual se prorratea en base 360 días', () => {
    const r = calculateDepositoAPlazo({
      monto: 1_000_000,
      moneda: 'CLP',
      tasaPeriodo: 3.6,
      tipoTasa: 'anual',
      plazoDias: 30,
    });
    // 3,6% × (30/360) = 0,3% efectivo del período
    expect(r.interesesGanadosCLP).toBe(3_000);
    expect(r.montoFinalCLP).toBe(1_003_000);
    expect(r.tasaEfectivaTotalPct).toBeCloseTo(0.3, 5);
  });

  it('renovable: cada renovación capitaliza los intereses del período', () => {
    const r = calculateDepositoAPlazo({
      monto: 1_000_000,
      moneda: 'CLP',
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual',
      plazoDias: 30,
      renovaciones: 1,
    });
    // factor = 1,005^2 = 1,010025 → final $1.010.025
    expect(r.montoFinalCLP).toBe(1_010_025);
    expect(r.interesesGanadosCLP).toBe(10_025);
    expect(r.periodos).toBe(2);
    expect(r.plazoTotalDias).toBe(60);
    expect(r.tasaEfectivaTotalPct).toBeCloseTo(1.0025, 4);
  });

  it('depósito en UF convierte a CLP con el valor UF entregado', () => {
    const r = calculateDepositoAPlazo({
      monto: 100,
      moneda: 'UF',
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual',
      plazoDias: 30,
      valorUF: UF_TEST,
    });
    expect(r.montoInicialCLP).toBe(3_900_000);
    expect(r.interesesGanadosCLP).toBe(19_500);
    expect(r.montoFinalCLP).toBe(3_919_500);
    expect(r.montoInicialUF).toBe(100);
    expect(r.montoFinalUF).toBeCloseTo(100.5, 2);
    expect(r.interesesGanadosUF).toBeCloseTo(0.5, 2);
  });

  it('depósito en CLP también reporta los equivalentes en UF', () => {
    const r = calculateDepositoAPlazo({
      monto: 3_900_000,
      moneda: 'CLP',
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual',
      plazoDias: 30,
      valorUF: UF_TEST,
    });
    expect(r.montoInicialUF).toBe(100);
    expect(r.montoFinalUF).toBeCloseTo(100.5, 2);
    expect(r.interesesGanadosUF).toBeCloseTo(0.5, 2);
  });

  it('tasa 0%: el monto final es el monto inicial', () => {
    const r = calculateDepositoAPlazo({
      monto: 1_000_000,
      moneda: 'CLP',
      tasaPeriodo: 0,
      tipoTasa: 'mensual',
      plazoDias: 90,
      renovaciones: 2,
    });
    expect(r.montoFinalCLP).toBe(1_000_000);
    expect(r.interesesGanadosCLP).toBe(0);
    expect(r.tasaEfectivaTotalPct).toBe(0);
  });

  it('rechaza monto 0 o negativo', () => {
    expect(() =>
      calculateDepositoAPlazo({
        monto: 0,
        moneda: 'CLP',
        tasaPeriodo: 0.5,
        tipoTasa: 'mensual',
        plazoDias: 30,
      }),
    ).toThrow(/monto/i);
  });

  it('rechaza plazo menor a 7 días', () => {
    expect(() =>
      calculateDepositoAPlazo({
        monto: 1_000_000,
        moneda: 'CLP',
        tasaPeriodo: 0.5,
        tipoTasa: 'mensual',
        plazoDias: 5,
      }),
    ).toThrow(/7 días/i);
  });

  it('rechaza renovaciones negativas o decimales', () => {
    const base = {
      monto: 1_000_000,
      moneda: 'CLP' as const,
      tasaPeriodo: 0.5,
      tipoTasa: 'mensual' as const,
      plazoDias: 30,
    };
    expect(() =>
      calculateDepositoAPlazo({ ...base, renovaciones: -1 }),
    ).toThrow(/renovaciones/i);
    expect(() =>
      calculateDepositoAPlazo({ ...base, renovaciones: 0.5 }),
    ).toThrow(/renovaciones/i);
  });
});
