// Fix 03-11-2026 (Devin Review de #68): la respuesta rápida de indemnización
// y su tope de 90 UF usan la UF del día (misma fuente que la calculadora de
// UF) y el snapshot solo como respaldo, mostrando la fecha de la UF usada.
import { describe, it, expect } from 'vitest';
import type { CurrentValues } from '@/lib/api/current-values';
import { getQuickAnswer } from '@/data/calculator-quick-answers';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { formatCLP } from '@/lib/formatters';
import { LIVE_UF_QUICK_ANSWER_SLUGS, ufParaRespuestaRapida } from '../quick-answer-uf';

function liveCon(uf: number, fecha: string, source: 'bcentral' | 'mindicador'): CurrentValues {
  return {
    values: {
      uf,
      utm: FALLBACK_VALUES.utm,
      dolar: { ...FALLBACK_VALUES.dolar },
      euro: FALLBACK_VALUES.euro,
      updatedAt: '2026-11-03T15:00:00.000Z',
      source,
      freshness: { uf: source, utm: source, dolarObservado: source, dolarVenta: source, euro: source },
    },
    dates: { uf: fecha },
    indicatorSources: { uf: source, utm: source, dolar: source },
  };
}

describe('UF del día en la respuesta rápida de indemnización', () => {
  it('la página de indemnización pide la UF en vivo', () => {
    expect(LIVE_UF_QUICK_ANSWER_SLUGS.has('calculadora-indemnizacion-anos-servicio')).toBe(true);
  });

  it('con dato en vivo usa esa UF y su fecha en el tope de 90 UF', () => {
    const uf = 40_123.45;
    const ctx = { ...ufParaRespuestaRapida(liveCon(uf, '2026-11-03T12:00:00.000Z', 'bcentral')), utm: FALLBACK_VALUES.utm };
    expect(ctx.uf).toBe(uf);
    const qa = getQuickAnswer('indemnizacion-anos-servicio', ctx)!;
    expect(qa.lead).toContain(`${formatCLP(Math.round(90 * uf))} con la UF del 03-11-2026`);
  });

  it('si la fuente en vivo falla usa el snapshot y muestra la fecha del snapshot', () => {
    const r = ufParaRespuestaRapida(null);
    expect(r).toEqual({ uf: FALLBACK_VALUES.uf, ufFecha: FALLBACK_VALUES.asOf });
    const qa = getQuickAnswer('indemnizacion-anos-servicio', { ...r, utm: FALLBACK_VALUES.utm })!;
    expect(qa.lead).toContain(formatCLP(Math.round(90 * FALLBACK_VALUES.uf)));
    expect(qa.lead).toMatch(/con la UF del \d{2}-\d{2}-\d{4}/);
  });
});
