import { afterEach, describe, it, expect, vi } from 'vitest';

/** Fixtures mutables: no leen `snapshot.json` (aíslan fallback vs bcentral). */
const { brl, pen, cop, mxn, bob, reset } = vi.hoisted(() => {
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
  const baseCop = mk(0.3, 'F072.CLP.COP.N.O.D');
  const baseMxn = mk(54.14, 'F072.CLP.MXN.N.O.D');
  const baseBob = mk(85.19, 'F072.CLP.BOL.N.O.D');
  const cop = { ...baseCop };
  const mxn = { ...baseMxn };
  const bob = { ...baseBob };
  const brl = { ...baseBrl };
  const pen = { ...basePen };
  return {
    brl,
    pen,
    cop,
    mxn,
    bob,
    reset() {
      Object.assign(brl, baseBrl);
      Object.assign(pen, basePen);
      Object.assign(cop, baseCop);
      Object.assign(mxn, baseMxn);
      Object.assign(bob, baseBob);
    },
  };
});

vi.mock('@/lib/values/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/values/constants')>();
  return { ...actual, REAL_BRASILENO: brl, SOL_PERUANO: pen, PESO_COLOMBIANO: cop, PESO_MEXICANO: mxn, BOLIVIANO: bob };
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

describe.each([
  { codigo: 'COP' as const, fixture: cop, esperado: 30, inverso: 333.33, serie: 'COP' },
  { codigo: 'MXN' as const, fixture: mxn, esperado: 5414, inverso: 1.85, serie: 'MXN' },
  { codigo: 'BOB' as const, fixture: bob, esperado: 8519, inverso: 1.17, serie: 'BOL' },
])('$codigo ↔ CLP', ({ codigo, fixture, esperado, inverso, serie }) => {
  it('golden en ambas direcciones con redondeo explícito', () => {
    expect(calculateDivisaViajeClp({ codigo, monto: 100, aClp: true }, MIE_18).resultado).toBe(esperado);
    expect(calculateDivisaViajeClp({ codigo, monto: 100, aClp: false }, MIE_18).resultado).toBe(inverso);
  });

  it('cero y montos negativos no generan dinero', () => {
    for (const monto of [0, -10]) {
      for (const aClp of [true, false]) {
        expect(calculateDivisaViajeClp({ codigo, monto, aClp }).resultado).toBe(0);
      }
    }
  });

  it('sin dato muestra error y nunca se presenta como hoy', () => {
    fixture.valor = 0;
    fixture.fuente_snapshot = 'unknown';
    expect(isDivisaViajePresentableComoHoy(codigo, MIE_18)).toBe(false);
    expect(() => calculateDivisaViajeClp({ codigo, monto: 100, aClp: true })).toThrow(/No hay tipo de cambio/);
  });

  it('rechaza tasa personalizada no positiva', () => {
    for (const tasaPersonalizada of [0, -1, Number.NaN]) {
      expect(() => calculateDivisaViajeClp({ codigo, monto: 100, aClp: true, tasaPersonalizada })).toThrow();
    }
  });

  it('distingue fuente reciente, vencida y respaldo en resultados y SEO', () => {
    fixture.fuente_snapshot = 'bcentral';
    expect(isDivisaViajePresentableComoHoy(codigo, MIE_18)).toBe(true);
    expect(isDivisaViajePresentableComoHoy(codigo, LUN_23)).toBe(false);
    for (const fuente of ['unknown', 'fallback']) {
      fixture.fuente_snapshot = fuente;
      const result = calculateDivisaViajeClp({ codigo, monto: 100, aClp: true }, MIE_18);
      expect(result.presentableComoHoy).toBe(false);
      expect(result.etiquetaTasa).toContain('17-11-2026');
      expect(seoDivisaViaje(codigo, MIE_18).seoDescription).toContain('valor del 17-11-2026');
      expect(divisaViajeClpToResults(result)[1].note?.source?.url).toContain(`F072.CLP.${serie}.N.O.D`);
    }
  });

  it('permite tasa personalizada sin atribuirla al BCCh', () => {
    const result = calculateDivisaViajeClp({ codigo, monto: 10, aClp: true, tasaPersonalizada: 2 }, MIE_18);
    expect(result.resultado).toBe(20);
    expect(result.usoTasaSitio).toBe(false);
    expect(result.presentableComoHoy).toBe(false);
    expect(result.etiquetaTasa).toContain('no es la del Banco Central');
  });
});

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
