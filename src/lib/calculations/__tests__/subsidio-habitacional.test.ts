// ============================================
// Tests de subsidio habitacional MINVU
// ----------------------------------------------
// Verifica los 3 subsidios (DS49, DS01, DS19), el ahorro mínimo
// requerido por tramo y el manejo de errores (DS01 sin tramo3).
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
  describe('DS49 (Fondo Solidario)', () => {
    it('tramo1 entrega el subsidio máximo del decreto', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedad: UF.valor * 600, // 600 UF
        ahorro: UF.valor * 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      expect(r.subsidioBaseUF).toBe(
        SUBSIDIO_HABITACIONAL.ds49.tramo1.subsidioMaximoUF,
      );
    });

    it('tramo2 entrega menos subsidio que tramo1 (a mayor ingreso, menor apoyo)', () => {
      const t1 = calculateSubsidioHabitacional({
        valorPropiedad: UF.valor * 500,
        ahorro: UF.valor * 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo1',
      });
      const t2 = calculateSubsidioHabitacional({
        valorPropiedad: UF.valor * 500,
        ahorro: UF.valor * 15,
        tipoSubsidio: 'ds49',
        tramo: 'tramo2',
      });
      expect(t2.subsidioBaseUF).toBeLessThan(t1.subsidioBaseUF);
    });
  });

  describe('DS01 (Sectores Medios)', () => {
    it('tramo3 NO existe en DS01: reporta error y cae al tramo 2', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedad: UF.valor * 1500,
        ahorro: UF.valor * 50,
        tipoSubsidio: 'ds01',
        tramo: 'tramo3',
      });
      expect(r.errores.length).toBeGreaterThan(0);
      expect(r.errores.some((e) => e.includes('tramo 3'))).toBe(true);
      expect(r.cumpleRequisitos).toBe(false);
    });
  });

  describe('DS19 (Integración Social)', () => {
    it('usa la tabla DS19 con tope de propiedad propio', () => {
      const r = calculateSubsidioHabitacional({
        valorPropiedad: UF.valor * 2000,
        ahorro: UF.valor * 100,
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
      valorPropiedad: UF.valor * 600,
      ahorro: UF.valor * 1, // muy bajo
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.errores.some((e) => e.includes('Ahorro'))).toBe(true);
  });

  it('propiedad sobre el tope reporta error', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedad: UF.valor * 5000, // demasiado cara para DS49
      ahorro: UF.valor * 50,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.errores.some((e) => e.toLowerCase().includes('tope'))).toBe(true);
  });

  it('cumple los 3 criterios: cumpleRequisitos = true', () => {
    const ahorroMin =
      SUBSIDIO_HABITACIONAL_AHORRO_MINIMO_UF.ds49.tramo1 * UF.valor;
    const r = calculateSubsidioHabitacional({
      // DS49 tope propiedad: 450 UF → usamos 400 UF (válido).
      valorPropiedad: UF.valor * 400,
      ahorro: ahorroMin,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.cumpleRequisitos).toBe(true);
    expect(r.errores).toEqual([]);
  });

  it('subsidio en CLP = subsidioBaseUF × valor UF', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedad: UF.valor * 600,
      ahorro: UF.valor * 15,
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.subsidioCLP).toBe(Math.round(r.subsidioBaseUF * UF.valor));
  });

  it('déficit = propiedad − subsidio − ahorro (nunca negativo)', () => {
    const r = calculateSubsidioHabitacional({
      valorPropiedad: UF.valor * 100,
      ahorro: UF.valor * 200, // mucho ahorro
      tipoSubsidio: 'ds49',
      tramo: 'tramo1',
    });
    expect(r.deficitUF).toBeGreaterThanOrEqual(0);
  });
});
