// ============================================
// Tests de PGU (Ley 21.419)
// ----------------------------------------------
// Verifica monto base por edad, sin factor por años cotizados, y
// reducción lineal entre tramos.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePGU } from '../pgu';
import { PGU_2026 } from '@/lib/values/constants';

describe('calculatePGU', () => {
  it('menor de 65 años: estimación PGU cero', () => {
    const r = calculatePGU({
      pensionActual: 0,
      anosCotizados: 20,
      esHombre: true,
      edad: 64,
    });
    expect(r.cumpleEdadMinima).toBe(false);
    expect(r.pguMensual).toBe(0);
  });

  it('70 años, sin pensión base: PGU completa', () => {
    const r = calculatePGU({
      pensionActual: 0,
      anosCotizados: 0,
      esHombre: true,
      edad: 70,
      // Umbral 82 vigente hasta ago-2026: 70 < 82 → monto base.
      fecha: new Date('2026-08-15T12:00:00'),
    });
    expect(r.pguMensual).toBe(PGU_2026.montoMaximo65a81CLP);
    expect(r.pensionTotal).toBe(PGU_2026.montoMaximo65a81CLP);
  });

  it('82+ años antes de sep-2026: PGU mayorada', () => {
    const r = calculatePGU({
      pensionActual: 200_000,
      anosCotizados: 0,
      esHombre: false,
      edad: 85,
      fecha: new Date('2026-08-15T12:00:00'),
    });
    expect(r.pguBase).toBe(PGU_2026.montoMaximo82MasCLP);
  });

  it('pensión base sobre tramo superior: PGU = 0', () => {
    const r = calculatePGU({
      pensionActual: PGU_2026.tramos[1].ingresoMaximoCLP + 100_000,
      anosCotizados: 25,
      esHombre: true,
      edad: 70,
    });
    expect(r.pguMensual).toBe(0);
  });

  it('reducción lineal en el tramo intermedio', () => {
    const punto =
      (PGU_2026.tramos[0].ingresoMaximoCLP + PGU_2026.tramos[1].ingresoMaximoCLP) / 2;
    const r = calculatePGU({
      pensionActual: punto,
      anosCotizados: 20,
      esHombre: true,
      edad: 70,
      fecha: new Date('2026-08-15T12:00:00'),
    });
    // En el punto medio del tramo intermedio, PGU debe ser ~50% del base.
    expect(r.pguMensual).toBeCloseTo(PGU_2026.montoMaximo65a81CLP / 2, -3);
  });

  it('años cotizados NO modifican el monto (Ley 21.419 no contributiva)', () => {
    const r0 = calculatePGU({
      pensionActual: 0,
      anosCotizados: 0,
      esHombre: true,
      edad: 70,
    });
    const r30 = calculatePGU({
      pensionActual: 0,
      anosCotizados: 30,
      esHombre: true,
      edad: 70,
    });
    expect(r0.pguMensual).toBe(r30.pguMensual);
  });

  it('esContributiva siempre es false', () => {
    const r = calculatePGU({
      pensionActual: 100_000,
      anosCotizados: 15,
      esHombre: true,
    });
    expect(r.esContributiva).toBe(false);
  });

  it('pensión total = pensión actual + PGU', () => {
    const r = calculatePGU({
      pensionActual: 300_000,
      anosCotizados: 10,
      esHombre: true,
      edad: 68,
    });
    expect(r.pensionTotal).toBe(r.pensionActual + r.pguMensual);
  });

  // Calendario del monto máximo (Ley 21.735, ChileAtiende ficha 130457):
  // 82 desde sep-2025 → 75 desde sep-2026 → 65 desde sep-2027.
  describe('edad umbral del monto máximo según fecha', () => {
    const base = { pensionActual: 0, anosCotizados: 0, esHombre: true };

    it('oct-2026 (umbral 75): 75 y 78 reciben el máximo; 74 y 70 no', () => {
      const fecha = new Date('2026-10-15T12:00:00');
      expect(calculatePGU({ ...base, edad: 78, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo82MasCLP,
      );
      expect(calculatePGU({ ...base, edad: 75, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo82MasCLP,
      );
      expect(calculatePGU({ ...base, edad: 74, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo65a81CLP,
      );
      expect(calculatePGU({ ...base, edad: 70, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo65a81CLP,
      );
    });

    it('ago-2026 (umbral 82): 78 recibe base; 82 el máximo', () => {
      const fecha = new Date('2026-08-15T12:00:00');
      expect(calculatePGU({ ...base, edad: 78, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo65a81CLP,
      );
      expect(calculatePGU({ ...base, edad: 82, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo82MasCLP,
      );
    });

    it('sep-2027 (umbral 65): 70 recibe el máximo', () => {
      const fecha = new Date('2027-09-15T12:00:00');
      expect(calculatePGU({ ...base, edad: 70, fecha }).pguBase).toBe(
        PGU_2026.montoMaximo82MasCLP,
      );
    });
  });
});
