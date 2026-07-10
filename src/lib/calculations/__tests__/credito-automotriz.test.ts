// ============================================
// Tests de crédito automotriz (Ley 18.010 / 19.496 / 20.555)
// ----------------------------------------------
// Verifica el cálculo de cuota francesa (PMT), el seguro mensual
// opcional y la CAE estimada incluyendo gastos asociados.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCreditoAutomotriz } from '../credito-automotriz';

describe('calculateCreditoAutomotriz', () => {
  it('monto a financiar = valor vehículo - pie', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 15_000_000,
      pie: 3_000_000,
      tasaAnual: 12,
      plazoMeses: 48,
    });
    expect(r.montoFinanciar).toBe(12_000_000);
    expect(r.piePorcentaje).toBe(20);
  });

  it('tasa 0% reparte el monto en cuotas iguales', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 12_000_000,
      pie: 0,
      tasaAnual: 0,
      plazoMeses: 12,
    });
    expect(r.dividendoMensual).toBe(1_000_000);
    expect(r.totalIntereses).toBe(0);
  });

  it('tasa positiva genera intereses > 0', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 12_000_000,
      pie: 2_000_000,
      tasaAnual: 12,
      plazoMeses: 36,
    });
    expect(r.totalIntereses).toBeGreaterThan(0);
    expect(r.totalPago).toBeGreaterThan(r.montoFinanciar);
  });

  it('seguro opcional suma al dividendo total', () => {
    const sin = calculateCreditoAutomotriz({
      valorVehiculo: 15_000_000,
      pie: 3_000_000,
      tasaAnual: 12,
      plazoMeses: 48,
      incluyeSeguro: false,
    });
    const con = calculateCreditoAutomotriz({
      valorVehiculo: 15_000_000,
      pie: 3_000_000,
      tasaAnual: 12,
      plazoMeses: 48,
      incluyeSeguro: true,
    });
    expect(con.seguroMensual).toBeGreaterThan(0);
    expect(sin.seguroMensual).toBe(0);
    expect(con.dividendoConSeguro).toBeGreaterThan(sin.dividendoConSeguro);
  });

  it('CAE incluye gastos asociados sobre la tasa nominal', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 12_000_000,
      pie: 0,
      tasaAnual: 10,
      plazoMeses: 24,
      gastosAsociadosPct: 4,
    });
    // CAE > tasa nominal porque incorpora gastos prorrateados
    expect(r.caeAproximada).toBeGreaterThan(10);
  });

  it('pie no puede exceder el valor del vehículo', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 10_000_000,
      pie: 50_000_000, // exorbitante
      tasaAnual: 10,
      plazoMeses: 24,
    });
    expect(r.pie).toBe(10_000_000);
    expect(r.montoFinanciar).toBe(0);
    expect(r.dividendoMensual).toBe(0);
  });

  it('plazo se redondea a entero positivo', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 10_000_000,
      pie: 2_000_000,
      tasaAnual: 12,
      plazoMeses: 36.7,
    });
    expect(r.plazoMeses).toBe(37);
  });

  it('totalPago ≈ dividendoMensual × plazo', () => {
    const r = calculateCreditoAutomotriz({
      valorVehiculo: 15_000_000,
      pie: 3_000_000,
      tasaAnual: 10,
      plazoMeses: 48,
    });
    expect(r.totalPago).toBe(r.dividendoMensual * r.plazoMeses);
  });
});
