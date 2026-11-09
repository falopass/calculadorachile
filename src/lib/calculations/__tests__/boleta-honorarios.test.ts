// ============================================
// Tests de boleta de honorarios (Ley 21.133 — calendario retención)
// ----------------------------------------------
// Verifica calendario de tasas 2025-2028, que no hay exención (E-028),
// y que líquido = bruto - retención (sin doble descuento).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBoletaHonorarios, boletaHonorariosToResults } from '../boleta-honorarios';
import { UTM, RETENCION_HONORARIOS_CALENDARIO } from '@/lib/values/constants';
import { anioEnCalendario, contextoHonorarios } from '@/lib/values/honorarios-anio';

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

  it('E-028: sin exención de 10 UTM — montos bajos también retienen', () => {
    const bajo10UTM = Math.floor(10 * UTM.valor) - 1;
    const r = calculateBoletaHonorarios({ montoBruto: bajo10UTM, ano: 2026 });
    expect(r.retencion).toBe(Math.round(bajo10UTM * 0.1525));
    const r100 = calculateBoletaHonorarios({ montoBruto: 100_000, ano: 2026 });
    expect(r100.retencion).toBe(15_250);
    expect(r100.montoLiquido).toBe(84_750);
    const r500 = calculateBoletaHonorarios({ montoBruto: 500_000, ano: 2027 });
    expect(r500.retencion).toBe(80_000);
    expect(r500.montoLiquido).toBe(420_000);
  });

  it('E-028: líquido a bruto = líquido ÷ (1 − tasa)', () => {
    const tasa = RETENCION_HONORARIOS_CALENDARIO[2027] / 100;
    expect(Math.round(84_000 / (1 - tasa))).toBe(100_000);
  });

  it('E-028/E-053: año por fecha en Chile (nov–dic → dual + selector del año siguiente)', () => {
    // 15-11-2026 12:00 Chile — E-053 activa modo cambio desde noviembre
    const nov = contextoHonorarios(new Date('2026-11-15T15:00:00Z'));
    expect(nov.anio).toBe(2026);
    expect(nov.anioSelector).toBe(2027);
    expect(nov.modoCambioDeAnio).toBe(true);
    // 01-12-2026 00:30 Chile (todavía 01-12 03:30 UTC)
    const dic = contextoHonorarios(new Date('2026-12-01T03:30:00Z'));
    expect(dic.modoCambioDeAnio).toBe(true);
    expect(dic.anioSelector).toBe(2027);
    // 31-12-2026 22:00 Chile = 01-01-2027 01:00 UTC: sigue siendo 2026 en Chile
    const fin = contextoHonorarios(new Date('2027-01-01T01:00:00Z'));
    expect(fin.anio).toBe(2026);
    // 2027: tasa 16%
    const ene = contextoHonorarios(new Date('2027-01-10T15:00:00Z'));
    expect(ene.anio).toBe(2027);
    expect(ene.tasa).toBe(16);
    expect(ene.modoCambioDeAnio).toBe(false);
    // dic-2028: no hay 2029 en el calendario → sin modo cambio de año
    const dic28 = contextoHonorarios(new Date('2028-12-10T15:00:00Z'));
    expect(dic28.modoCambioDeAnio).toBe(false);
    expect(dic28.anioSelector).toBe(2028);
    expect(anioEnCalendario(2031)).toBe(2028);
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
    expect(a.montoLiquido).toBe(b.montoLiquido);
    expect(a.mostrarDesglose).toBe(false);
    expect(b.mostrarDesglose).toBe(true);
  });
});

describe('calculateBoletaHonorarios — modo liquido-a-bruto (E-039)', () => {
  it('2026 (15,25%): líquido $84.750 → bruto $100.000', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 84_750,
      ano: 2026,
      modo: 'liquido-a-bruto',
    });
    expect(r.modo).toBe('liquido-a-bruto');
    expect(r.tasaRetencion).toBe(15.25);
    expect(r.montoBruto).toBe(100_000);
    expect(r.retencion).toBe(15_250);
    expect(r.montoLiquido).toBe(84_750);
  });

  it('2027 (16%): líquido $84.000 → bruto $100.000', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 84_000,
      ano: 2027,
      modo: 'liquido-a-bruto',
    });
    expect(r.tasaRetencion).toBe(16);
    expect(r.montoBruto).toBe(100_000);
    expect(r.retencion).toBe(16_000);
    expect(r.montoLiquido).toBe(84_000);
  });

  it('ida y vuelta: bruto calculado devuelve el líquido original ±$1', () => {
    for (const ano of [2026, 2027] as const) {
      for (const liquido of [50_000, 84_000, 84_750, 123_456, 500_000, 999_999, 1_234_567]) {
        const ida = calculateBoletaHonorarios({
          montoBruto: liquido,
          ano,
          modo: 'liquido-a-bruto',
        });
        const vuelta = calculateBoletaHonorarios({ montoBruto: ida.montoBruto, ano });
        expect(Math.abs(vuelta.montoLiquido - liquido)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('sin retención automática el bruto a emitir es el monto ingresado', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 100_000,
      ano: 2027,
      modo: 'liquido-a-bruto',
      retencionAutomatica: false,
    });
    expect(r.montoBruto).toBe(100_000);
    expect(r.retencion).toBe(0);
    expect(r.montoLiquido).toBe(100_000);
  });

  it('toResults destaca el bruto a emitir y conserva la etiqueta de retención', () => {
    const r = calculateBoletaHonorarios({
      montoBruto: 84_000,
      ano: 2027,
      modo: 'liquido-a-bruto',
    });
    const results = boletaHonorariosToResults(r);
    expect(results[0].label).toBe('Monto Bruto (a emitir en la boleta)');
    expect(results[0].highlight).toBe(true);
    expect(results[0].value).toBe(100_000);
    expect(results[1].label).toBe('Monto Líquido (a recibir)');
    expect(results[1].value).toBe(84_000);
    expect(results[2].label).toBe('Retención 2027 (16%)');
  });
});
