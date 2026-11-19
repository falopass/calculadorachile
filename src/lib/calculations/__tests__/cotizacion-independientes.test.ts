// ============================================
// Tests de cotización-independientes (Ley 21.133)
// ----------------------------------------------
// Verifica que la base imponible sea 80% de la renta bruta anual,
// con tope 90 UF mensuales, y que el SIS se cobre con la tasa del año
// tributario (SP: 1,49% AT2026; SII: 1,50% AT2025).
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculateCotizacionIndependientes,
  cotizacionIndependientesToResults,
} from '../cotizacion-independientes';
import {
  UF,
  AFP,
  TOPE_IMPOSITIVO,
  getTasaSISIndependientes,
} from '@/lib/values/constants';

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

  it('AFP descuenta 10% obligatorio + comisión', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    // Base 800.000, AFP 10% + 1.27% = 11.27%
    const esperado = Math.round(800_000 * ((10 + AFP.habitat.comision) / 100));
    expect(r.cotizacionAFP).toBe(esperado);
  });

  it('SIS usa por defecto la última tasa publicada (AT2026: 1,49%)', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    // 800.000 × 1,49% = 11.920
    expect(r.tasaSIS).toBe(1.49);
    expect(r.anioTributarioSIS).toBe(2026);
    expect(r.cotizacionSIS).toBe(11_920);
  });

  it('SIS AT2025 coincide con el ejemplo del SII (1,50% sobre la base)', () => {
    // SII, ejemplo "Pamela" Operación Renta 2025: honorarios $3.000.000
    // anuales → base $2.400.000, SIS $36.000 (= $3.000 mensuales).
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 250_000,
      afp: 'habitat',
      salud: 'fonasa',
      anioTributario: 2025,
    });
    expect(r.tasaSIS).toBe(1.5);
    expect(r.cotizacionSIS * 12).toBe(36_000);
  });

  it('SIS para un año sin tasa publicada usa la última publicada', () => {
    expect(getTasaSISIndependientes(2027)).toEqual({ tasa: 1.49, anioAplicado: 2026 });
    expect(getTasaSISIndependientes(2020)).toEqual({ tasa: 1.5, anioAplicado: 2025 });
  });

  it('SIS respeta el tope imponible', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 10_000_000,
      afp: 'modelo',
      salud: 'fonasa',
    });
    const topeMensualCLP = TOPE_IMPOSITIVO.afp_salud * UF.valor;
    expect(r.cotizacionSIS).toBe(Math.round(topeMensualCLP * 0.0149));
  });

  it('resultados muestran la línea SIS con tasa y año tributario', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_000_000,
      afp: 'habitat',
      salud: 'fonasa',
    });
    const fila = cotizacionIndependientesToResults(r).find((x) => x.label.includes('SIS'));
    expect(fila?.label).toBe('Seguro de Invalidez y Sobrevivencia (SIS 1,49%, AT2026)');
    expect(fila?.value).toBe(11_920);
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

  it('total cotizaciones suma AFP + salud + SIS + mutual', () => {
    const r = calculateCotizacionIndependientes({
      rentaBrutaMensual: 1_500_000,
      afp: 'modelo',
      salud: 'fonasa',
    });
    expect(r.totalCotizaciones).toBe(
      r.cotizacionAFP + r.cotizacionSalud + r.cotizacionSIS + r.cotizacionMutual,
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
