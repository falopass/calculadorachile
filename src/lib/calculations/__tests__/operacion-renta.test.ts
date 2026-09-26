// ============================================
// Tests de Operación Renta para independientes
// ----------------------------------------------
// Verifica la deducción de gastos/cotizaciones/APV, la aplicación
// de la tabla 2026 en UTA y la retención sugerida según el
// calendario Ley 21.133.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateOperacionRenta } from '../operacion-renta';
import {
  IMPUESTO_SEGUNDA_CATEGORIA_2026,
  RETENCION_HONORARIOS_CALENDARIO,
  UTM,
} from '@/lib/values/constants';

const UTA = UTM.valor * 12;

describe('calculateOperacionRenta', () => {
  it('renta tributable = bruta − gastos − cotizaciones − APV', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: 20_000_000,
      gastosAnuales: 2_000_000,
      cotizacionesObligatorias: 1_500_000,
      ahorroPrevisional: 500_000,
    });
    expect(r.rentaTributable).toBe(16_000_000);
  });

  it('renta tributable nunca queda negativa', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: 5_000_000,
      gastosAnuales: 8_000_000, // gastos > ingresos
      cotizacionesObligatorias: 0,
    });
    expect(r.rentaTributable).toBeGreaterThanOrEqual(0);
  });

  it('renta bajo 13,5 UTA cae en el primer tramo (impuesto 0)', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: Math.round(UTA * 13), // 13 UTA, exento
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    expect(r.impuesto).toBe(0);
    // El primer tramo (0–13,5 UTA) tiene tasa 0 → tramo aplicado válido.
    expect(r.tramoAplicado).toContain('UTA');
  });

  it('renta de 20 UTA paga 0,26 UTA (tramo 4%, rebaja 0,54)', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: Math.round(UTA * 20),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    // 20 × 0,04 − 0,54 = 0,26 UTA
    expect(r.impuesto).toBe(Math.round(0.26 * UTA));
    expect(r.tramoAplicado).toContain('UTA');
  });

  it('renta de 100 UTA paga 12,6 UTA (tramo 30,4%, rebaja 17,8)', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: Math.round(UTA * 100),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    // 100 × 0,304 − 17,8 = 12,6 UTA
    expect(r.impuesto).toBe(Math.round((100 * 0.304 - 17.8) * UTA));
  });

  it('mayor renta paga impuesto progresivamente mayor', () => {
    const bajo = calculateOperacionRenta({
      ingresosAnuales: Math.round(UTA * 20),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    const alto = calculateOperacionRenta({
      ingresosAnuales: Math.round(UTA * 100),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    expect(alto.tasaEfectiva).toBeGreaterThan(bajo.tasaEfectiva);
  });

  it('tabla UTA oficial AT2026 (art. 52 LIR, SII personas naturales)', () => {
    expect(IMPUESTO_SEGUNDA_CATEGORIA_2026.tramos).toEqual([
      { limiteInferiorUTA: 0, limiteSuperiorUTA: 13.5, tasa: 0, factor: 0 },
      { limiteInferiorUTA: 13.5, limiteSuperiorUTA: 30, tasa: 0.04, factor: 0.54 },
      { limiteInferiorUTA: 30, limiteSuperiorUTA: 50, tasa: 0.08, factor: 1.74 },
      { limiteInferiorUTA: 50, limiteSuperiorUTA: 70, tasa: 0.135, factor: 4.49 },
      { limiteInferiorUTA: 70, limiteSuperiorUTA: 90, tasa: 0.23, factor: 11.14 },
      { limiteInferiorUTA: 90, limiteSuperiorUTA: 120, tasa: 0.304, factor: 17.8 },
      { limiteInferiorUTA: 120, limiteSuperiorUTA: 310, tasa: 0.35, factor: 23.32 },
      { limiteInferiorUTA: 310, limiteSuperiorUTA: Infinity, tasa: 0.4, factor: 38.82 },
    ]);
  });

  it('retención sugerida usa la tasa del año vigente del calendario', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: 12_000_000,
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    const aniosCalendario = Object.keys(RETENCION_HONORARIOS_CALENDARIO).map(Number);
    expect(aniosCalendario).toContain(r.anioRetencion);
    expect(r.tasaRetencion).toBe(
      RETENCION_HONORARIOS_CALENDARIO[
        r.anioRetencion as keyof typeof RETENCION_HONORARIOS_CALENDARIO
      ],
    );
    expect(r.retencionSugerida).toBe(
      Math.round(12_000_000 * (r.tasaRetencion / 100)),
    );
  });

  it('valores negativos se acotan a 0', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: -1_000_000,
      gastosAnuales: -500_000,
      cotizacionesObligatorias: -100_000,
      ahorroPrevisional: -50_000,
    });
    expect(r.rentaBruta).toBe(0);
    expect(r.rentaTributable).toBe(0);
    expect(r.impuesto).toBe(0);
  });

  it('gastos no pueden exceder los ingresos', () => {
    const r = calculateOperacionRenta({
      ingresosAnuales: 1_000_000,
      gastosAnuales: 5_000_000,
      cotizacionesObligatorias: 0,
    });
    expect(r.gastosDeducidos).toBe(1_000_000);
  });
});
