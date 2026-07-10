// ============================================
// Tests de Crédito con Aval del Estado (Ley 20.027 / reforma 2022)
// ----------------------------------------------
// Verifica la tasa fija legal del 2% por defecto, la garantía
// estatal del 90% y el aviso de transición a FES.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCreditoCAE } from '../credito-cae';
import { CREDITO_CAE } from '@/lib/values/constants';

describe('calculateCreditoCAE', () => {
  it('por defecto usa la tasa fija legal del 2% (reforma 2022)', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      plazoMeses: 240,
      tieneGarantiaEstatal: true,
    });
    expect(r.tasaAnual).toBe(CREDITO_CAE.tasa_anual_legal);
  });

  it('garantía estatal cubre el 90% del monto', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      plazoMeses: 240,
      tieneGarantiaEstatal: true,
    });
    expect(r.montoGarantiaEstatal).toBe(9_000_000);
  });

  it('sin garantía estatal: monto garantizado = 0', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      plazoMeses: 240,
      tieneGarantiaEstatal: false,
    });
    expect(r.montoGarantiaEstatal).toBe(0);
  });

  it('dividendo > 0 con tasa positiva', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      plazoMeses: 240,
      tieneGarantiaEstatal: true,
    });
    expect(r.dividendoMensual).toBeGreaterThan(0);
    expect(r.totalIntereses).toBeGreaterThan(0);
  });

  it('totalPago ≈ dividendoMensual × plazoMeses (con redondeo)', () => {
    const r = calculateCreditoCAE({
      montoCredito: 8_000_000,
      plazoMeses: 120,
      tieneGarantiaEstatal: true,
    });
    // El cálculo interno usa la cuota sin redondear, luego redondea
    // dividendoMensual y totalPago por separado, así que la
    // multiplicación post-redondeo puede diferir hasta plazoMeses centavos.
    expect(r.totalPago).toBeCloseTo(r.dividendoMensual * r.plazoMeses, -2);
  });

  it('costoCredito = totalPago / monto (multiplicador)', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      plazoMeses: 240,
      tieneGarantiaEstatal: true,
    });
    expect(r.costoCredito).toBe(
      Math.round((r.totalPago / r.montoCredito) * 100) / 100,
    );
    expect(r.costoCredito).toBeGreaterThan(1);
  });

  it('meses de gracia retrasan el n.º de mes de la 1.ª cuota', () => {
    const r = calculateCreditoCAE({
      montoCredito: 5_000_000,
      plazoMeses: 120,
      tieneGarantiaEstatal: true,
      mesesGracia: 18,
    });
    expect(r.mesesGracia).toBe(18);
    expect(r.mesPrimeraCuota).toBe(19);
    expect(r.dividendoUF).toBeGreaterThan(0);
    expect(r.dividendoAnual).toBe(r.dividendoMensual * 12);
  });

  it('con ingreso bruto compara cuota PMT vs tope 10%', () => {
    const r = calculateCreditoCAE({
      montoCredito: 15_000_000,
      plazoMeses: 180,
      tieneGarantiaEstatal: true,
      ingresoMensualBruto: 1_000_000,
    });
    expect(r.topeDiezPctIngreso).toBe(100_000);
    expect(r.cuotaSobreIngresoPct).toBeGreaterThan(0);
    expect(r.avisoCobranza).toContain('TGR');
  });

  it('aviso menciona FES / Ingresa (no es estado de cuenta)', () => {
    const r = calculateCreditoCAE({
      montoCredito: 5_000_000,
      plazoMeses: 120,
      tieneGarantiaEstatal: true,
    });
    expect(r.aviso).toContain('FES');
  });

  it('tasa personalizada anula la tasa legal', () => {
    const r = calculateCreditoCAE({
      montoCredito: 10_000_000,
      tasaAnual: 5,
      plazoMeses: 240,
      tieneGarantiaEstatal: true,
    });
    expect(r.tasaAnual).toBe(5);
  });

  it('plazo se redondea y se acota a >= 1', () => {
    const r = calculateCreditoCAE({
      montoCredito: 1_000_000,
      plazoMeses: 0,
      tieneGarantiaEstatal: true,
    });
    expect(r.plazoMeses).toBe(1);
  });
});
