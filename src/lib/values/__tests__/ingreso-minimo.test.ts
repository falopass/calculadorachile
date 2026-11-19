import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CALENDARIO_INGRESO_MINIMO,
  INGRESO_MINIMO,
  SALUD,
  getIngresoMinimoVigente,
} from '@/lib/values/constants';

// Ley 21.830 art. 1: $553.553 desde 01-05-2026; reajuste IPC desde 01-01-2027
// con decreto de Hacienda (art. 6). El monto 2027 aún no está publicado.
describe('getIngresoMinimoVigente (calendario Ley 21.830)', () => {
  afterEach(() => vi.restoreAllMocks());

  it('conserva los umbrales Fonasa vigentes al peso', () => {
    vi.spyOn(INGRESO_MINIMO, 'mensual', 'get').mockReturnValue(553553);
    expect(SALUD.fonasa.tramos.b.ingresoMaximoCLP).toBe(553553);
    expect(SALUD.fonasa.tramos.c.ingresoMinimoCLP).toBe(553554);
    expect(SALUD.fonasa.tramos.c.ingresoMaximoCLP).toBe(808187);
    expect(SALUD.fonasa.tramos.d.ingresoMinimoCLP).toBe(808188);
  });

  it('Fonasa sigue el IMM sin dejar huecos entre tramos', () => {
    vi.spyOn(INGRESO_MINIMO, 'mensual', 'get').mockReturnValue(600001);
    expect(SALUD.fonasa.tramos.b.ingresoMaximoCLP).toBe(600001);
    expect(SALUD.fonasa.tramos.c.ingresoMinimoCLP).toBe(600002);
    expect(SALUD.fonasa.tramos.c.ingresoMaximoCLP).toBe(876001);
    expect(SALUD.fonasa.tramos.d.ingresoMinimoCLP).toBe(876002);
  });

  it('17-11-2026 → $553.553 desde 01-05-2026', () => {
    const t = getIngresoMinimoVigente(new Date('2026-11-17T12:00:00-03:00'));
    expect(t).toMatchObject({
      mensual: 553553,
      vigente_desde: '2026-05-01',
      ley: '21.830',
      menor_18_mayor_65: 412938,
      no_remuneracional: 356815,
    });
  });

  it('INGRESO_MINIMO expone el tramo vigente con los mismos campos', () => {
    const t = getIngresoMinimoVigente();
    expect(INGRESO_MINIMO.mensual).toBe(t.mensual);
    expect(INGRESO_MINIMO.vigente_desde).toBe(t.vigente_desde);
    expect(INGRESO_MINIMO.hora).toBe(t.hora);
    expect(INGRESO_MINIMO.zona_extrema).toBe(t.zona_extrema);
  });

  it('calendario ordenado y con campos coherentes', () => {
    for (let i = 0; i < CALENDARIO_INGRESO_MINIMO.length; i++) {
      const t = CALENDARIO_INGRESO_MINIMO[i];
      if (i > 0)
        expect(t.vigente_desde > CALENDARIO_INGRESO_MINIMO[i - 1].vigente_desde).toBe(true);
      expect(t.jornal).toBe(Math.round(t.mensual / 20));
      expect(t.zona_extrema).toBe(Math.round(t.mensual * 1.06));
    }
  });

  it('usa la fecha de Chile: 01-01-2027 01:00 UTC aún es 31-12-2026 en Santiago', () => {
    const utc = getIngresoMinimoVigente(new Date('2027-01-01T01:00:00Z'));
    const chile = getIngresoMinimoVigente(new Date('2026-12-31T22:00:00-03:00'));
    expect(utc).toBe(chile);
  });
});
