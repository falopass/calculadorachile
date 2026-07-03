// ============================================
// Tests de cotización-independientes (Ley 21.133)
// ----------------------------------------------
// Verifica que la base imponible sea 80% de la renta bruta anual,
// con tope 90 UF mensuales, y que NO se cobre SIS al independiente.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCotizacionIndependientes } from '../cotizacion-independientes';
import { UF, AFP, TOPE_IMPOSITIVO } from '@/lib/values/constants';

describe('calculateCotizacionIndependientes', () => {
  it('base imponible mensual es 80% de la renta bruta', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    expect(r.baseImponibleMensual).toBe(800_000);
    expect(r.aplicaTopeImponible).toBe(false);
  });

  it('aplica tope de 90 UF mensuales para rentas altas', () => {
    const renta = 10_000_000; // muy sobre el tope
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: renta,
      afp: 'modelo',
      salud: 'fonasa',
    });
    const topeMensualCLP = TOPE_IMPOSITIVO.afp_salud * UF.valor;
    expect(r.aplicaTopeImponible).toBe(true);
    expect(r.baseImponibleMensual).toBe(Math.round(topeMensualCLP));
  });

  it('AFP descuenta 10% obligatorio + comisión, sin SIS', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    // Base 800.000, AFP 10% + 1.27% = 11.27%
    const esperado = Math.round(800_000 * ((10 + AFP.habitat.comision) / 100));
    expect(r.cotizacionAFP).toBe(esperado);
    // SIS NO se cobra a independientes (D.L. 3500 Art. 59).
    expect((r as unknown as { cotizacionSIS?: number }).cotizacionSIS).toBeUndefined();
  });

  it('salud cotiza 7% sobre la base imponible', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    expect(r.cotizacionSalud).toBe(56_000);
  });

  it('mutual de seguridad cotiza ~0,95% sobre la base', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    expect(r.cotizacionMutual).toBe(7_600);
  });

  it('total cotizaciones suma AFP + salud + mutual', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_500_000,
      afp: 'modelo',
      salud: 'fonasa',
    });
    expect(r.totalCotizaciones).toBe(
      r.cotizacionAFP + r.cotizacionSalud + r.cotizacionMutual,
    );
  });

  it('renta cero retorna cotizaciones cero', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 0,
      afp: 'habitat',
      salud: 'fonasa',
    });
    expect(r.totalCotizaciones).toBe(0);
  });
});
