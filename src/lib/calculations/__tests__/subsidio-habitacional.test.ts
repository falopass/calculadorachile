// ============================================
// Tests de subsidio habitacional MINVU
// Inputs en UF (sin doble conversión).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioHabitacional } from '../subsidio-habitacional';
import {
  SUBSIDIO_HABITACIONAL,
  SUBSIDIO_HABITACIONAL_DS19,
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
    it('tramo1 entrega el subsidio máximo del decreto', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 600,
        ahorroUF: 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.subsidioBaseUF).toBe(SUBSIDIO_HABITACIONAL.ds49.tramo1.subsidioMaximoUF);
    });

    it('tramo2 entrega menos subsidio que tramo1', () => {
      const t1 = calculateSubsidioHabitacional({
        valorPropiedadUF: 500,
        ahorroUF: 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      const t2 = calculateSubsidioHabitacional({
        valorPropiedadUF: 500,
        ahorroUF: 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo2',
      });
      expect(t2.subsidioBaseUF).toBeLessThan(t1.subsidioBaseUF);
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
    it('usa la tabla DS19 con tope de propiedad propio', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedadUF: 2000,
        ahorroUF: 100,
        tipoSubsidio: 'ds19',
        tramo: 'tramo1',
      });
      expect(r.montoMaximoPropiedadUF).toBe(
        SUBSIDIO_HABITACIONAL_DS19.monto_max_propiedad_uf,
      );
      expect(r.subsidioBaseUF).toBe(
        SUBSIDIO_HABITACIONAL_DS19.tramos.tramo1.subsidioMaximoUF,
      );
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
