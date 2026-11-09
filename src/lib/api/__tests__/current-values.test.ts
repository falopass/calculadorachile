import { describe, it, expect } from 'vitest';
import { fechaIndicadorSantiago, normalizeIndicatorDate } from '../current-values';
import {
  isLiveValueFresh,
  buildLiveValueTitle,
} from '@/lib/seo/live-value-title';

const NOW = new Date('2026-09-23T16:00:00.000Z'); // 23-09 12:00 Santiago

describe('normalizeIndicatorDate', () => {
  it('fecha BCentral "solo día" → mediodía UTC del mismo día', () => {
    expect(normalizeIndicatorDate('2026-09-23')).toBe(
      '2026-09-23T12:00:00.000Z',
    );
    expect(normalizeIndicatorDate('2026-09-01')).toBe(
      '2026-09-01T12:00:00.000Z',
    );
  });

  it('instante ISO de Mindicador queda sin cambios', () => {
    expect(normalizeIndicatorDate('2026-09-23T03:00:00.000Z')).toBe(
      '2026-09-23T03:00:00.000Z',
    );
  });

  it('null/undefined → undefined', () => {
    expect(normalizeIndicatorDate(null)).toBeUndefined();
    expect(normalizeIndicatorDate(undefined)).toBeUndefined();
    expect(normalizeIndicatorDate('')).toBeUndefined();
  });
});

describe('fecha normalizada + vigencia/título', () => {
  it('UF "2026-09-23" (BCentral) se interpreta como 23-09, no 22-09', () => {
    const fecha = normalizeIndicatorDate('2026-09-23')!;
    expect(
      isLiveValueFresh(
        'uf',
        { value: 40999.93, source: 'bcentral', date: fecha },
        NOW,
      ),
    ).toBe(true);
    expect(buildLiveValueTitle('uf', 40999.93, new Date(fecha), NOW)).toBe(
      'UF hoy 23-09-2026: $40.999,93 | Tabla UF a pesos',
    );
  });

  it('UTM "2026-09-01" (BCentral) sigue siendo septiembre en Santiago → fresco', () => {
    const fecha = normalizeIndicatorDate('2026-09-01')!;
    expect(
      isLiveValueFresh(
        'utm',
        { value: 71721, source: 'bcentral', date: fecha },
        NOW,
      ),
    ).toBe(true);
    expect(buildLiveValueTitle('utm', 71721, new Date(fecha), NOW)).toBe(
      'UTM septiembre 2026: $71.721 y conversión a pesos',
    );
  });

  it('sin normalizar, "2026-09-01" cae en agosto en Santiago (regresión documentada)', () => {
    // Demuestra el bug que corrige normalizeIndicatorDate.
    expect(
      isLiveValueFresh(
        'utm',
        { value: 71721, source: 'bcentral', date: '2026-09-01' },
        NOW,
      ),
    ).toBe(false);
  });
});

// Fix 03-11-2026 (#70): /api/values informa el día de la UF para que el
// formulario de indemnización no la atribuya a "hoy".

describe('fechaIndicadorSantiago', () => {
  it('BCentral "solo día" normalizado conserva el día', () => {
    expect(fechaIndicadorSantiago(normalizeIndicatorDate('2026-11-03'))).toBe('2026-11-03');
  });
  it('instante de Mindicador (03:00Z) es el mismo día en Santiago', () => {
    expect(fechaIndicadorSantiago('2026-11-03T03:00:00.000Z')).toBe('2026-11-03');
  });
  it('UF atrasada de Mindicador conserva su propio día, no el de hoy', () => {
    expect(fechaIndicadorSantiago('2026-11-07T03:00:00.000Z')).toBe('2026-11-07');
  });
  it('sin fecha o inválida → undefined', () => {
    expect(fechaIndicadorSantiago(undefined)).toBeUndefined();
    expect(fechaIndicadorSantiago('x')).toBeUndefined();
  });
});
