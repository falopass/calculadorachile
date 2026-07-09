// ============================================
// Tests de boleta de honorarios (Ley 21.133 — calendario retención)
// ----------------------------------------------
// Verifica calendario de tasas 2025-2028, exención bajo 10 UTM,
// y que líquido = bruto - retención (sin doble descuento).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBoletaHonorarios } from '../boleta-honorarios';
import { UTM, RETENCION_HONORARIOS_CALENDARIO } from '@/lib/values/constants';

describe('calculateBoletaHonorarios', () => {
  it('2026: aplica retención 15,25%', () => {
    const r = calculateBoletaHonorarios({ montoBruto: 1_000_000, ano: 2026 });
    expect(r.tasaRetencion).toBe(RETENCION_HONORARIOS_CALENDARIO[2026]);
    expect(r.retencion).toBe(152_500);
    expect(r.montoLiquido).toBe(1_000_000 - 152_500);
  });

  it('calendario completo Ley 21.133: 14,5/15,25/16/17 entre 2025-2028', () => {
    const tasas = [2025, 2026, 2027, 2028].map(
      (a) => calculateBoletaHonorarios({ montoBruto: 1_000_000, ano: a as 2025 | 2026 | 2027 | 2028 }).tasaRetencion,
    );
    expect(tasas).toEqual([14.5, 15.25, 16, 17]);
  });

  it('exento: monto bajo 10 UTM no retiene', () => {
    const limiteCLP = Math.floor(10 * UTM.valor) - 1;
    const r = calculateBoletaHonorarios({
      montoBruto: limiteCLP,
      ano: 2026,
    });
    expect(r.exento).toBe(true);
    expect(r.retencion).toBe(0);
    expect(r.montoLiquido).toBe(limiteCLP);
  });

  it('NO descuenta cotizaciones adicionales fuera de la retención', () => {
    const monto = 2_000_000;
    const r = calculateBoletaHonorarios({ montoBruto: monto, ano: 2026 });
    // Líquido debe ser exactamente bruto - retención (sin más descuentos)
    expect(r.montoLiquido).toBe(monto - r.retencion);
  });

  it('PPM asociado equivale al componente impuesto-renta de la retención', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 1_000_000,
      ano: 2026,
      calcularPPM: true,
    });
    // Para 2026 el componente "impuesto_renta" es 10% sobre el bruto.
    expect(r.ppmAsociado).toBe(100_000);
  });

  it('costo empleador (mandante) sin gross-up = monto bruto', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 1_000_000,
      ano: 2026,
      calcularCostoEmpleador: true,
    });
    expect(r.costoEmpleador).toBe(1_000_000);
  });

  it('moneda UF expone el equivalente UF', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 800_000,
      ano: 2026,
      moneda: 'UF',
    });
    expect(r.montoUF).toBeDefined();
    expect(r.montoUF!).toBeGreaterThan(0);
  });

  it('desglose retención suma aproximadamente la tasa total', () => {
    const r = calculateBoletaHonorarios({ montoBruto: 1_000_000, ano: 2026 });
    const sumaDesglose =
      r.desgloseRetencion.impuestoRenta +
      r.desgloseRetencion.afp +
      r.desgloseRetencion.salud +
      r.desgloseRetencion.seguroInvalidezSobrevivencia +
      r.desgloseRetencion.accidentesTrabajo;
    // Debe coincidir con la retención (15,25% del bruto), tolerancia $200 por redondeos.
    expect(sumaDesglose).toBeCloseTo(r.retencion, -2);
  });

  it('desgloseCotizaciones solo controla UI, no el líquido', () => {
    // Monto sobre 10 UTM para no estar exento
    const monto = 1_000_000;
    const a = calculateBoletaHonorarios({
      montoBruto: monto,
      ano: 2026,
      desgloseCotizaciones: false,
    });
    const b = calculateBoletaHonorarios({
      montoBruto: monto,
      ano: 2026,
      desgloseCotizaciones: true,
    });
    expect(a.exento).toBe(false);
    expect(a.montoLiquido).toBe(b.montoLiquido);
    expect(a.mostrarDesglose).toBe(false);
    expect(b.mostrarDesglose).toBe(true);
  });
});
