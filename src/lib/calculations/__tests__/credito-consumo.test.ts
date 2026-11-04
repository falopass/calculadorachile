// ============================================
// Tests de Simulador de Crédito de Consumo (E-041)
// ----------------------------------------------
// Cuota francesa + comparación con la Tasa Máxima
// Convencional (TMC) del snapshot CMF vigente
// (Certificado N° 10/2026, Ley 18.010).
// ============================================

import { describe, it, expect } from 'vitest';
import { UF } from '@/lib/values/constants';
import { calculateCreditoConsumo } from '../credito-consumo';

describe('calculateCreditoConsumo', () => {
  it('cuota francesa exacta: $1.000.000 al 1,5% mensual a 12 meses', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 1_000_000,
      tasaMensual: 1.5,
      plazoMeses: 12,
      valorUF: 40_000,
    });
    // C = P·i / (1 − (1+i)^(−n)) = 91.679,98… → 91.680
    expect(r.cuotaMensual).toBe(91_680);
    expect(r.totalCuotas).toBe(91_680 * 12);
    expect(r.totalIntereses).toBe(91_680 * 12 - 1_000_000);
    // Tasa anual nominal lineal = 1,5 × 12
    expect(r.tasaAnual).toBe(18);
  });

  it('tasa 0% reparte el capital en cuotas iguales sin intereses', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 1_200_000,
      tasaMensual: 0,
      plazoMeses: 12,
      valorUF: 40_000,
    });
    expect(r.cuotaMensual).toBe(100_000);
    expect(r.totalIntereses).toBe(0);
    expect(r.costoTotal).toBe(1_200_000);
  });

  it('gastos operacionales suman al costo total sin alterar la cuota', () => {
    const sin = calculateCreditoConsumo({
      montoCredito: 1_000_000,
      tasaMensual: 1.5,
      plazoMeses: 12,
      valorUF: 40_000,
    });
    const con = calculateCreditoConsumo({
      montoCredito: 1_000_000,
      tasaMensual: 1.5,
      plazoMeses: 12,
      gastosOperacionales: 50_000,
      valorUF: 40_000,
    });
    expect(con.cuotaMensual).toBe(sin.cuotaMensual);
    expect(con.costoTotal).toBe(sin.totalCuotas + 50_000);
  });

  it('tramo TMC ≤ 50 UF usa la TMC de menor monto (41,02% anual)', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 1_000_000, // 25 UF
      tasaMensual: 1.5,
      plazoMeses: 12,
      valorUF: 40_000,
    });
    expect(r.montoUF).toBe(25);
    expect(r.tramoTMC).toBe('no_reajustables_menor_50uf_mayor_90d');
    expect(r.tmcAnualTramo).toBe(41.02);
    expect(r.tmcMensualTramo).toBe(3.42);
  });

  it('tramo TMC > 50 y ≤ 200 UF (34,02% anual)', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 4_000_000, // 100 UF
      tasaMensual: 1.5,
      plazoMeses: 24,
      valorUF: 40_000,
    });
    expect(r.montoUF).toBe(100);
    expect(r.tramoTMC).toBe('no_reajustables_50_200uf_mayor_90d');
    expect(r.tmcAnualTramo).toBe(34.02);
    expect(r.tmcMensualTramo).toBe(2.84);
  });

  it('tramo TMC > 200 y ≤ 5.000 UF (30,03% anual)', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 10_000_000, // 250 UF
      tasaMensual: 1.5,
      plazoMeses: 36,
      valorUF: 40_000,
    });
    expect(r.montoUF).toBe(250);
    expect(r.tramoTMC).toBe('no_reajustables_mayor_200uf_menor_5000uf_mayor_90d');
    expect(r.tmcAnualTramo).toBe(30.03);
    expect(r.tmcMensualTramo).toBe(2.5);
  });

  it('tramo TMC > 5.000 UF a ≥ 90 días (10,05% anual) y a < 90 días (8,16%)', () => {
    const largo = calculateCreditoConsumo({
      montoCredito: 240_000_000, // 6.000 UF
      tasaMensual: 1.5,
      plazoMeses: 60,
      valorUF: 40_000,
    });
    expect(largo.tramoTMC).toBe('no_reajustables_mayor_5000uf_mayor_90d');
    expect(largo.tmcAnualTramo).toBe(10.05);
    expect(largo.tmcMensualTramo).toBe(0.84);

    const corto = calculateCreditoConsumo({
      montoCredito: 240_000_000, // 6.000 UF
      tasaMensual: 1.5,
      plazoMeses: 2, // < 90 días
      valorUF: 40_000,
    });
    expect(corto.tramoTMC).toBe('no_reajustables_mayor_5000uf_menor_90d');
    expect(corto.tmcAnualTramo).toBe(8.16);
  });

  it('detecta tasa anual nominal que supera la TMC del tramo', () => {
    const usura = calculateCreditoConsumo({
      montoCredito: 1_000_000, // 25 UF → TMC 41,02%
      tasaMensual: 5, // anual nominal 60%
      plazoMeses: 12,
      valorUF: 40_000,
    });
    expect(usura.tasaAnual).toBe(60);
    expect(usura.superaTMC).toBe(true);

    const dentro = calculateCreditoConsumo({
      montoCredito: 1_000_000,
      tasaMensual: 2, // anual nominal 24% < 41,02%
      plazoMeses: 12,
      valorUF: 40_000,
    });
    expect(dentro.superaTMC).toBe(false);
  });

  it('sin valorUF usa el snapshot local (UF.valor)', () => {
    const r = calculateCreditoConsumo({
      montoCredito: 1_000_000,
      tasaMensual: 1.5,
      plazoMeses: 12,
    });
    expect(r.valorUF).toBe(UF.valor);
    expect(r.montoUF).toBe(Math.round((1_000_000 / UF.valor) * 100) / 100);
  });
});
