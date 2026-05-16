// ============================================
// Tests de Operación Renta para independientes
// ----------------------------------------------
// Verifica la deducción de gastos/cotizaciones/APV, la aplicación
// de la tabla 2026 en UTA y la retención sugerida según el
// calendario Ley 21.578.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateOperacionRenta } from '../operacion-renta';
import { RETENCION_HONORARIOS_CALENDARIO, UTM } from '@/lib/values/constants';

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

  it('renta bajo 8 UTA cae en el primer tramo (impuesto 0)', () => {
    const valorUTA = UTM.valor * 12;
    const r = calculateOperacionRenta({
      ingresosAnuales: Math.round(valorUTA * 5), // 5 UTA, exento
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    expect(r.impuesto).toBe(0);
    // El primer tramo (0–8 UTA) tiene tasa 0 → tramo aplicado válido.
    expect(r.tramoAplicado).toContain('UTA');
  });

  it('renta sobre 8 UTA paga impuesto > 0', () => {
    const valorUTA = UTM.valor * 12;
    const r = calculateOperacionRenta({
      ingresosAnuales: Math.round(valorUTA * 12), // 12 UTA, tramo 8-16
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    expect(r.impuesto).toBeGreaterThan(0);
    expect(r.tramoAplicado).toContain('UTA');
  });

  it('mayor renta paga impuesto progresivamente mayor', () => {
    const valorUTA = UTM.valor * 12;
    const bajo = calculateOperacionRenta({
      ingresosAnuales: Math.round(valorUTA * 12),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    const alto = calculateOperacionRenta({
      ingresosAnuales: Math.round(valorUTA * 30),
      gastosAnuales: 0,
      cotizacionesObligatorias: 0,
    });
    expect(alto.tasaEfectiva).toBeGreaterThan(bajo.tasaEfectiva);
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
