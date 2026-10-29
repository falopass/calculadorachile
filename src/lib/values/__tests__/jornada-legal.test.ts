import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  JORNADA_LEGAL,
  fechaISOChile,
  getJornadaLegalVigente,
  getProximoCambioJornada,
  getTramoJornadaLegal,
} from '@/lib/values/constants';
import { calculateSueldoPartTime } from '@/lib/calculations/sueldo-part-time';

// Ley 21.561, art. 1.º transitorio: 44 h desde 26-04-2024, 42 h desde
// 26-04-2026, 40 h desde 26-04-2028 (DT w3-article-129225).
describe('getJornadaLegalVigente (calendario Ley 21.561)', () => {
  it('29-10-2026 → 42 h (vigente)', () => {
    expect(getJornadaLegalVigente(new Date('2026-10-29T12:00:00-03:00'))).toBe(42);
  });

  it('25-04-2026 → 44 h; 26-04-2026 → 42 h', () => {
    expect(getJornadaLegalVigente(new Date('2026-04-25T23:59:00-04:00'))).toBe(44);
    expect(getJornadaLegalVigente(new Date('2026-04-26T00:00:00-04:00'))).toBe(42);
  });

  it('25-04-2028 → 42 h; 26-04-2028 → 40 h', () => {
    expect(getJornadaLegalVigente(new Date('2028-04-25T23:59:00-04:00'))).toBe(42);
    expect(getJornadaLegalVigente(new Date('2028-04-26T00:00:00-04:00'))).toBe(40);
  });

  it('usa la fecha de Chile, no la UTC del servidor', () => {
    // 26-04-2028 01:00 UTC = 25-04-2028 21:00 en Santiago (UTC-4): sigue 42.
    const d = new Date('2028-04-26T01:00:00Z');
    expect(fechaISOChile(d)).toBe('2028-04-25');
    expect(getJornadaLegalVigente(d)).toBe(42);
  });

  it('después de 2028 se mantiene en 40 h', () => {
    expect(getJornadaLegalVigente(new Date('2035-01-01T12:00:00-03:00'))).toBe(40);
  });

  it('tramo vigente y próximo cambio al 29-10-2026', () => {
    const hoy = new Date('2026-10-29T12:00:00-03:00');
    expect(getTramoJornadaLegal(hoy)).toEqual({ vigenteDesde: '2026-04-26', horas: 42 });
    expect(getProximoCambioJornada(hoy)).toEqual({ vigenteDesde: '2028-04-26', horas: 40 });
    expect(getProximoCambioJornada(new Date('2028-05-01T12:00:00-04:00'))).toBeNull();
  });

  it('el calendario está ordenado y sin fechas repetidas', () => {
    const fechas = JORNADA_LEGAL.calendario.map((t) => t.vigenteDesde);
    expect([...fechas].sort()).toEqual(fechas);
    expect(new Set(fechas).size).toBe(fechas.length);
  });
});

describe('JORNADA_LEGAL.actual sigue al calendario', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('hoy (29-10-2026) → 42', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-29T12:00:00-03:00'));
    expect(JORNADA_LEGAL.actual).toBe(42);
  });

  it('desde el 26-04-2028 → 40, y el part time divide por 40', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2028-04-26T12:00:00-04:00'));
    expect(JORNADA_LEGAL.actual).toBe(40);
    // Solo se prueba el divisor: el IMM de 2028 lo fija otra ley.
    const r = calculateSueldoPartTime({ horasSemanales: 20 });
    expect(r.baseCalculo).toContain('/ 40 h');
  });
});
