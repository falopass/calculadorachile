// ============================================
// Tests de subsidio habitacional MINVU
// Inputs en UF (sin doble conversión).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioHabitacional } from '../subsidio-habitacional';
import {
  SUBSIDIO_HABITACIONAL,
  SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF,
  UF,
} from '@/lib/values/constants';

describe('calculateSubsidioHabitacional', () => {
  describe('unidades UF', () => {
    it('trata valorPropiedad y ahorro como UF (no divide por UF.valor)', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 600,
        ahorroUF: 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.valorPropiedadUF).toBe(600);
      expect(r.ahorroUF).toBe(15);
      expect(r.subsidioCLP).toBe(Math.round(r.subsidioBaseUF * UF.valor));
    });

    it('sin tipoSubsidio no crashea y reporta error', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 1000,
        ahorroUF: 50,
        tramo: 'tramo1',
      });
      expect(r.cumpleRequisitos).toBe(false);
      expect(r.subsidioBaseUF).toBe(0);
      expect(r.errores.some((e) => e.toLowerCase().includes('tipo'))).toBe(true);
    });
  });

  describe('DS49 (Fondo Solidario)', () => {
    // ChileAtiende ficha 37960: base desde 314 UF + premio al ahorro
    // de 1,5 UF por UF adicional sobre 10 UF, tope 30 UF. Igual en
    // cualquier tramo.
    it('ahorro 10 UF: subsidio base 314 UF sin premio', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 600,
        ahorroUF: 10,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.premioAhorroUF).toBe(0);
      expect(r.subsidioBaseUF).toBe(314);
    });

    it('ahorro 20 UF: 314 + 15 = 329 UF', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 600,
        ahorroUF: 20,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.premioAhorroUF).toBe(15);
      expect(r.subsidioBaseUF).toBe(329);
    });

    it('ahorro 40 UF: premio topeado en 30 → 344 UF', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 600,
        ahorroUF: 40,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.premioAhorroUF).toBe(30);
      expect(r.subsidioBaseUF).toBe(344);
    });

    it('la fórmula DS49 no depende del tramo', () => {
      const t1 = calculateSubsidioHabitacional({
        valorPropiedadUF: 500,
        ahorroUF: 20,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      const t2 = calculateSubsidioHabitacional({
        valorPropiedadUF: 500,
        ahorroUF: 20,
        tipoSubsidio: 'ds49',
        tramo: 'tramo2',
      });
      expect(t2.subsidioBaseUF).toBe(t1.subsidioBaseUF);
    });
  });

  describe('DS01 (Sectores Medios)', () => {
    it('tramo2 tope propiedad 1.600 UF (ChileAtiende)', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 1500,
        ahorroUF: 40,
        tipoSubsidio: 'ds01',
        tramo: 'tramo2',
      });
      expect(r.montoMaximoPropiedadUF).toBe(1600);
      expect(r.ahorroRequeridoUF).toBe(40);
    });

    it('tramo3 existe con tope 2.200 UF', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 2000,
        ahorroUF: 80,
        tipoSubsidio: 'ds01',
        tramo: 'tramo3',
      });
      expect(r.montoMaximoPropiedadUF).toBe(2200);
      expect(r.subsidioBaseUF).toBe(SUBSIDIO_HABITACIONAL.ds01.tramo3!.subsidioMaximoUF);
    });

    it('zona extrema sube tope T2 a 1.800 UF', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 1700,
        ahorroUF: 40,
        tipoSubsidio: 'ds01',
        tramo: 'tramo2',
        esZonaExtrema: true,
      });
      expect(r.montoMaximoPropiedadUF).toBe(1800);
    });
  });

  describe('DS19 (Integración Social)', () => {
    // Res. Ex. MINVU N°700 (06-05-2026): subsidio base y precio máximo
    // por segmento; zonas extremas con valores propios.
    const ds19 = (
      tramo: 'tramo1' | 'tramo2' | 'tramo3',
      esZonaExtrema = false,
      valorPropiedadUF = 500,
    ) =>
      calculateSubsidioHabitacional({
        valorPropiedadUF,
        ahorroUF: 100,
        tipoSubsidio: 'ds19',
        tramo,
        esZonaExtrema,
      });

    it('tramo1: 1.200 UF general / 1.700 UF extrema, tope 1.500 / 2.000', () => {
      expect(ds19('tramo1').subsidioBaseUF).toBe(1200);
      expect(ds19('tramo1').montoMaximoPropiedadUF).toBe(1500);
      expect(ds19('tramo1', true).subsidioBaseUF).toBe(1700);
      expect(ds19('tramo1', true).montoMaximoPropiedadUF).toBe(2000);
    });

    it('tramo2: 425 UF general / 537,5 UF extrema, tope 1.800 / 2.400', () => {
      expect(ds19('tramo2').subsidioBaseUF).toBe(425);
      expect(ds19('tramo2').montoMaximoPropiedadUF).toBe(1800);
      expect(ds19('tramo2', true).subsidioBaseUF).toBe(537.5);
      expect(ds19('tramo2', true).montoMaximoPropiedadUF).toBe(2400);
    });

    it('tramo3: 350 UF general / 500 UF extrema, tope 2.800 / 4.000', () => {
      expect(ds19('tramo3').subsidioBaseUF).toBe(350);
      expect(ds19('tramo3').montoMaximoPropiedadUF).toBe(2800);
      expect(ds19('tramo3', true).subsidioBaseUF).toBe(500);
      expect(ds19('tramo3', true).montoMaximoPropiedadUF).toBe(4000);
    });

    it('propiedad sobre el tope DS19 reporta error', () => {
      const r = ds19('tramo1', false, 1600);
      expect(r.cumpleRequisitos).toBe(false);
      expect(r.errores.some((e) => e.toLowerCase().includes('tope'))).toBe(true);
      // En zona extrema el tope T1 sube a 2.000: la misma vivienda calza.
      const extrema = ds19('tramo1', true, 1600);
      expect(extrema.errores.some((e) => e.toLowerCase().includes('tope'))).toBe(false);
    });
  });

  it('ahorro insuficiente reporta error y NO cumple requisitos', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedadUF: 600,
      ahorroUF: 1,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.errores.some((e) => e.includes('Ahorro'))).toBe(true);
  });

  it('propiedad sobre el tope reporta error', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedadUF: 5000,
      ahorroUF: 50,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.errores.some((e) => e.toLowerCase().includes('tope'))).toBe(true);
  });

  it('cumple los 3 criterios: cumpleRequisitos = true', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedadUF: 400,
      ahorroUF: SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF.ds49.tramo1,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(true);
    expect(r.errores).toEqual([]);
  });

  it('subsidio en CLP = subsidioBaseUF × valor UF', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedadUF: 600,
      ahorroUF: 15,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.subsidioCLP).toBe(Math.round(r.subsidioBaseUF * UF.valor));
  });

  it('déficit nunca negativo', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedadUF: 100,
      ahorroUF: 200,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.deficitUF).toBeGreaterThanOrEqual(0);
  });
});
