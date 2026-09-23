import { describe, it, expect } from 'vitest';
import {
  isLiveValueFresh,
  buildLiveValueTitle,
} from '../live-value-title';

// "Ahora" de referencia: 23-09-2026 12:00 en America/Santiago (UTC-4 en sept).
const NOW = new Date('2026-09-23T16:00:00.000Z');

describe('isLiveValueFresh', () => {
  it('UTM del mismo mes es fresco', () => {
    expect(
      isLiveValueFresh(
        'utm',
        { value: 71721, source: 'bcentral', date: '2026-09-01T12:00:00.000Z' },
        NOW,
      ),
    ).toBe(true);
  });

  it('UTM del mes anterior no es fresco', () => {
    expect(
      isLiveValueFresh(
        'utm',
        { value: 71721, source: 'bcentral', date: '2026-08-01T03:00:00.000Z' },
        NOW,
      ),
    ).toBe(false);
  });

  it('UF de hace 49 horas no es fresca', () => {
    const ufDate = new Date(NOW.getTime() - 49 * 60 * 60 * 1000);
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40901.94, source: 'mindicador', date: ufDate.toISOString() },
        NOW,
      ),
    ).toBe(false);
  });

  it('UF de hace 24 horas sí es fresca', () => {
    const ufDate = new Date(NOW.getTime() - 24 * 60 * 60 * 1000);
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40901.94, source: 'mindicador', date: ufDate.toISOString() },
        NOW,
      ),
    ).toBe(true);
  });

  it("source 'fallback' nunca es fresco", () => {
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40901.94, source: 'fallback', date: NOW.toISOString() },
        NOW,
      ),
    ).toBe(false);
  });

  it('valor <= 0 o fecha inválida no son frescos', () => {
    expect(
      isLiveValueFresh(
        'uf',
        { value: 0, source: 'bcentral', date: NOW.toISOString() },
        NOW,
      ),
    ).toBe(false);
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40901.94, source: 'bcentral', date: 'no-es-fecha' },
        NOW,
      ),
    ).toBe(false);
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40901.94, source: 'bcentral' },
        NOW,
      ),
    ).toBe(false);
  });

  it('dólar de hace 80 horas (fin de semana) sigue fresco', () => {
    const dolarDate = new Date(NOW.getTime() - 80 * 60 * 60 * 1000);
    expect(
      isLiveValueFresh(
        'dolar',
        { value: 937.17, source: 'mindicador', date: dolarDate.toISOString() },
        NOW,
      ),
    ).toBe(true);
  });
});

describe('buildLiveValueTitle', () => {
  it('UTM: mes en español y formato CLP sin decimales', () => {
    const title = buildLiveValueTitle(
      'utm',
      71721,
      new Date('2026-09-01T12:00:00.000Z'),
      NOW,
    );
    expect(title).toBe('UTM septiembre 2026: $71.721 | UTM a pesos');
  });

  it('UF: fecha dd-mm-aaaa y dos decimales es-CL', () => {
    const title = buildLiveValueTitle(
      'uf',
      40901.94,
      new Date('2026-09-23T03:00:00.000Z'),
      NOW,
    );
    expect(title).toBe('UF hoy 23-09-2026: $40.901,94 | UF a pesos');
  });

  it('dólar: fecha dd-mm-aaaa y dos decimales es-CL', () => {
    const title = buildLiveValueTitle(
      'dolar',
      5906,
      new Date('2026-09-23T03:00:00.000Z'),
      NOW,
    );
    expect(title).toBe('Dólar hoy 23-09-2026: $5.906,00 | Dólar a pesos');
  });
});
