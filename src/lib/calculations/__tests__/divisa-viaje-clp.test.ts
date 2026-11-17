import { afterEach, describe, it, expect, vi } from 'vitest';

/** Fixtures mutables: no leen `snapshot.json` (aíslan fallback vs bcentral). */
const { brl, pen, reset } = vi.hoisted(() => {
  const mk = (valor: number, serie: string) => ({
    valor,
    fecha_actualizacion: '2026-11-17',
    fuente_snapshot: 'fallback',
    serie,
    referencial: true as const,
    fuente: `https://si3.bcentral.cl/x?idSerie=${serie}`,
  });
  const baseBrl = mk(173.21, 'F072.CLP.BRL.N.O.D');
  const basePen = mk(293.2, 'F072.CLP.PEN.N.O.D');
  const brl = { ...baseBrl };
  const pen = { ...basePen };
  return {
    brl,
    pen,
    reset() {
      Object.assign(brl, baseBrl);
      Object.assign(pen, basePen);
    },
  };
});

vi.mock('@/lib/values/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/values/constants')>();
  return { ...actual, REAL_BRASILENO: brl, SOL_PERUANO: pen };
});

import {
  calculateDivisaViajeClp,
  divisaViajeClpToResults,
  isDivisaViajePresentableComoHoy,
  seoDivisaViaje,
} from '../divisa-viaje-clp';

const MIE_18 = new Date('2026-11-18T15:00:00-03:00');
const LUN_23 = new Date('2026-11-23T15:00:00-03:00');

afterEach(reset);

describe('divisa-viaje-clp', () => {
  it('golden BRL→CLP: 100 reales × 173,21 = $17.321', () => {
    const r = calculateDivisaViajeClp({ codigo: 'BRL', monto: 100, aClp: true }, MIE_18);
    expect(r.resultado).toBe(17_321);
    expect(r.resultadoEnCLP).toBe(true);
    expect(r.tasaCambio).toBe(173.21);
  });

  it('golden CLP→PEN: $100.000 / 293,2 = 341,06 soles', () => {
    const r = calculateDivisaViajeClp({ codigo: 'PEN', monto: 100_000, aClp: false }, MIE_18);
    expect(r.resultado).toBe(341.06);
    expect(r.resultadoEnCLP).toBe(false);
  });

  it('fallback nunca es «hoy», aunque la fecha sea reciente', () => {
    const r = calculateDivisaViajeClp({ codigo: 'BRL', monto: 1, aClp: true }, MIE_18);
    expect(r.presentableComoHoy).toBe(false);
    expect(r.etiquetaTasa).toContain('Valor referencial del 17-11-2026');
    expect(seoDivisaViaje('BRL', MIE_18).seoDescription).toContain('valor del 17-11-2026');
  });

  it('bcentral reciente (≤3 días hábiles) sí es presentable', () => {
    brl.fuente_snapshot = 'bcentral';
    expect(isDivisaViajePresentableComoHoy('BRL', MIE_18)).toBe(true);
    expect(seoDivisaViaje('BRL', MIE_18).seoDescription).not.toContain('valor del');
  });

  it('bcentral vencido (>3 días hábiles) no es presentable', () => {
    brl.fuente_snapshot = 'bcentral';
    expect(isDivisaViajePresentableComoHoy('BRL', LUN_23)).toBe(false);
  });

  it('unknown (cron sin dato) no es presentable', () => {
    pen.fuente_snapshot = 'unknown';
    expect(isDivisaViajePresentableComoHoy('PEN', MIE_18)).toBe(false);
  });

  it('tasa personalizada: se usa y no se atribuye al BCCh', () => {
    brl.fuente_snapshot = 'bcentral';
    const r = calculateDivisaViajeClp(
      { codigo: 'BRL', monto: 10, aClp: true, tasaPersonalizada: 180 },
      MIE_18,
    );
    expect(r.resultado).toBe(1800);
    expect(r.usoTasaSitio).toBe(false);
    expect(r.presentableComoHoy).toBe(false);
  });

  it('sin tasa válida lanza error (tasa personalizada 0 o snapshot vacío)', () => {
    expect(() =>
      calculateDivisaViajeClp({ codigo: 'BRL', monto: 10, aClp: true, tasaPersonalizada: 0 }),
    ).toThrow(/BRL\/CLP/);
    pen.valor = 0;
    expect(() => calculateDivisaViajeClp({ codigo: 'PEN', monto: 10, aClp: true })).toThrow();
  });

  it('monto negativo se trata como 0', () => {
    expect(calculateDivisaViajeClp({ codigo: 'BRL', monto: -5, aClp: true }).resultado).toBe(0);
  });

  it('results incluyen la serie oficial como fuente', () => {
    const rows = divisaViajeClpToResults(
      calculateDivisaViajeClp({ codigo: 'PEN', monto: 1, aClp: true }),
    );
    expect(rows[1].label).toBe('Tipo de cambio usado (CLP por 1 PEN)');
    expect(rows[1].note?.source?.url).toContain('F072.CLP.PEN.N.O.D');
  });
});
