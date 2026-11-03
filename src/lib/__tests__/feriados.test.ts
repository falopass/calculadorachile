// E-027: la guía publica solo fechas verificadas; la calculadora no cambia.
import { describe, it, expect } from 'vitest';
import {
  FERIADOS_2027,
  FERIADOS_NACIONALES_CALCULO,
  feriadosPublicables,
  finesDeSemanaLargos,
  diaSemana,
} from '../feriados';
import { getGuiaBySlug } from '@/data/guias';

describe('feriados 2027', () => {
  it('no publica fechas pendientes', () => {
    const pub = feriadosPublicables(FERIADOS_2027).map((f) => f.fecha);
    for (const f of ['2027-03-26', '2027-03-27', '2027-06-21']) expect(pub).not.toContain(f);
    const html = getGuiaBySlug('feriados-chile-2027')!.sections.map((s) => s.html).join('');
    expect(html).not.toMatch(/26 de marzo|27 de marzo|21 de junio|elecci/i);
  });

  it('la calculadora de vacaciones conserva todas las fechas', () => {
    for (const f of FERIADOS_2027) expect(FERIADOS_NACIONALES_CALCULO.has(f.fecha)).toBe(true);
    expect(FERIADOS_NACIONALES_CALCULO.has('2026-09-18')).toBe(true);
  });

  it('fines de semana largos con fechas verificadas', () => {
    const l = finesDeSemanaLargos(feriadosPublicables(FERIADOS_2027));
    expect(l.map((x) => x.desde)).toEqual([
      '2027-01-01', '2027-05-21', '2027-06-26', '2027-07-16', '2027-09-17', '2027-10-09', '2027-10-30',
    ]);
    expect(diaSemana('2027-09-17')).toBe('viernes');
  });

  it('irrenunciables: 1 ene, 1 may, 18 y 19 sep, 25 dic', () => {
    expect(FERIADOS_2027.filter((f) => f.irrenunciable).map((f) => f.fecha)).toEqual([
      '2027-01-01', '2027-05-01', '2027-09-18', '2027-09-19', '2027-12-25',
    ]);
  });
});
