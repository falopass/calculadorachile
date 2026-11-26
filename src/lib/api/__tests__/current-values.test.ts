import { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from 'next/constants';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { fechaIndicadorSantiago, getCurrentValues, normalizeIndicatorDate } from '../current-values';
import { fetchAllCurrentValues } from '../bcentral';
import { fetchMindicadorValores } from '../mindicador';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import {
  isLiveValueFresh,
  buildLiveValueTitle,
} from '@/lib/seo/live-value-title';

const NOW = new Date('2026-09-23T16:00:00.000Z'); // 23-09 12:00 Santiago

vi.mock('../bcentral', () => ({ fetchAllCurrentValues: vi.fn() }));
vi.mock('../mindicador', () => ({ fetchMindicadorValores: vi.fn() }));

const mockBucketGet = vi.fn();
const mockBucketPut = vi.fn();
vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({
    env: { NEXT_INC_CACHE_R2_BUCKET: { get: mockBucketGet, put: mockBucketPut } },
    ctx: { waitUntil: (p: Promise<unknown>) => void p },
  }),
}));

describe('getCurrentValues', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('usa el snapshot sin consultar proveedores durante el prerender del build', async () => {
    vi.stubEnv('NEXT_PHASE', PHASE_PRODUCTION_BUILD);

    const current = await getCurrentValues({ live: true });

    expect(fetchAllCurrentValues).not.toHaveBeenCalled();
    expect(fetchMindicadorValores).not.toHaveBeenCalled();
    expect(current.values).toMatchObject({
      uf: FALLBACK_VALUES.uf,
      utm: FALLBACK_VALUES.utm,
      dolar: FALLBACK_VALUES.dolar,
      euro: FALLBACK_VALUES.euro,
      source: 'fallback',
    });
    expect(current.indicatorSources).toEqual({ uf: 'fallback', utm: 'fallback', dolar: 'fallback' });
  });

  it('sin `live`, un render estático ISR usa el snapshot sin llamar proveedores', async () => {
    vi.stubEnv('NEXT_PHASE', PHASE_PRODUCTION_SERVER);
    mockBucketGet.mockResolvedValue(null);

    const current = await getCurrentValues();

    expect(fetchAllCurrentValues).not.toHaveBeenCalled();
    expect(fetchMindicadorValores).not.toHaveBeenCalled();
    expect(current.values.source).toBe('fallback');
  });

  it('sin `live`, un render ISR sirve los últimos valores vivos guardados en R2', async () => {
    vi.stubEnv('NEXT_PHASE', PHASE_PRODUCTION_SERVER);
    mockBucketGet.mockResolvedValue({
      json: async () => ({
        values: {
          uf: 40999.93,
          utm: 71721,
          dolar: { observado: 999.5, venta: 1005.99 },
          euro: 1100.1,
          updatedAt: new Date().toISOString(),
          ufFecha: '2026-09-23',
          source: 'bcentral',
          freshness: {
            uf: 'bcentral',
            utm: 'bcentral',
            dolarObservado: 'bcentral',
            dolarVenta: 'mindicador',
            euro: 'bcentral',
          },
        },
        dates: { uf: '2026-09-23T12:00:00.000Z' },
        indicatorSources: { uf: 'bcentral', utm: 'bcentral', dolar: 'bcentral' },
      }),
    });

    const current = await getCurrentValues();

    expect(fetchAllCurrentValues).not.toHaveBeenCalled();
    expect(fetchMindicadorValores).not.toHaveBeenCalled();
    expect(current.values).toMatchObject({ uf: 40999.93, source: 'bcentral' });
  });

  it('conserva los proveedores y su prioridad al ejecutar el servidor', async () => {
    vi.stubEnv('NEXT_PHASE', PHASE_PRODUCTION_SERVER);
    vi.mocked(fetchAllCurrentValues).mockResolvedValue({
      uf: 40999.93,
      utm: null,
      dolar: { observado: null, venta: null },
      euro: null,
      fechas: { uf: '2026-09-23', utm: null, dolar: null },
    });
    vi.mocked(fetchMindicadorValores).mockResolvedValue({
      uf: 40901.94,
      utm: 71721,
      dolar: null,
      euro: null,
      asOf: NOW.toISOString(),
      fechas: { uf: NOW.toISOString(), utm: NOW.toISOString(), dolar: null },
    });

    const current = await getCurrentValues({ live: true });

    expect(current.values).toMatchObject({ uf: 40999.93, utm: 71721, dolar: FALLBACK_VALUES.dolar });
    expect(current.indicatorSources).toEqual({ uf: 'bcentral', utm: 'mindicador', dolar: 'fallback' });
  });

  it('persiste una respuesta mixta y no sobrescribe con todo respaldo', async () => {
    vi.stubEnv('NEXT_PHASE', PHASE_PRODUCTION_SERVER);

    // Respuesta mixta (algún campo vivo) → sí se persiste en R2.
    vi.mocked(fetchAllCurrentValues).mockResolvedValueOnce({
      uf: 40999.93,
      utm: null,
      dolar: { observado: null, venta: null },
      euro: null,
      fechas: { uf: '2026-09-23', utm: null, dolar: null },
    });
    vi.mocked(fetchMindicadorValores).mockResolvedValueOnce(null);
    await getCurrentValues({ live: true });
    expect(mockBucketPut).toHaveBeenCalledTimes(1);
    expect(mockBucketPut.mock.calls[0][0]).toBe('app-values/last-live.json');

    // Todas las fuentes caídas → no pisa los últimos valores reales.
    vi.mocked(fetchAllCurrentValues).mockResolvedValueOnce(null);
    vi.mocked(fetchMindicadorValores).mockResolvedValueOnce(null);
    const degraded = await getCurrentValues({ live: true });
    expect(degraded.values.source).toBe('fallback');
    expect(mockBucketPut).toHaveBeenCalledTimes(1);
  });
});

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
      'Valor UF hoy: $40.999,93 (23-09-2026) | UF a pesos',
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
      'UTM de septiembre 2026: $71.721 (SII)',
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
