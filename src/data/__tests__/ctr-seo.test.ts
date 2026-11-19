import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateMetadata as blogMetadata } from '@/app/blog/[slug]/page';
import { generateMetadata as calculatorMetadata } from '@/app/calculadoras/[slug]/page';
import { getCurrentValues, type CurrentValues } from '@/lib/api/current-values';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { seoOverrides } from '../seo-overrides';

vi.mock('@/lib/api/current-values', () => ({ getCurrentValues: vi.fn() }));
vi.mock('@/app/calculadoras/[slug]/CalculatorPageClient', () => ({ default: () => null }));
vi.mock('@/components/calculator/EmbeddedCalculator', () => ({ default: () => null }));

afterEach(() => {
  vi.mocked(getCurrentValues).mockReset();
  vi.useRealTimers();
});

function indicatorValues(date: string): CurrentValues {
  return {
    values: {
      uf: 40901.94,
      utm: 72440,
      dolar: { observado: 0, venta: 0 },
      euro: 0,
      updatedAt: date,
      source: 'bcentral',
      freshness: {
        uf: 'bcentral',
        utm: 'bcentral',
        dolarObservado: 'fallback',
        dolarVenta: 'fallback',
        euro: 'fallback',
      },
    },
    dates: { uf: date, utm: date },
    indicatorSources: { uf: 'bcentral', utm: 'bcentral', dolar: 'fallback' },
  };
}

describe('metadata de páginas con alta impresión y bajo CTR', () => {
  it.each([
    ['calculadora-sueldo-part-time', /20 y 30 horas/],
    ['calculadora-licencia-medica', /cuántos días me pagan/],
    ['calculadora-uf-clp', /UF a pesos/],
    ['sueldo-minimo-2026-calcular-liquido', /Sueldo mínimo Chile 2026/],
    ['calculadora-iva', /Calculadora IVA Chile/],
    ['calculadora-utm-clp', /valor mensual/],
    ['calculadora-sueldo-liquido', /sueldo líquido en Chile/],
    ['calculadora-vacaciones-proporcionales', /días y pago/],
    ['calculadora-gratificacion-legal', /Tope de gratificación/],
    ['revision-tecnica-chile-2026-calendario-patente', /calendario por patente/],
    ['calculadora-seguro-cesantia', /Simulador seguro de cesantía/],
    ['calculadora-asignacion-familiar', /tramos y montos/],
    ['calculadora-comparador-afp', /AFP más barata/],
  ] as const)('%s conserva su canonical e indexación', async (slug, intent) => {
    const isCalculator = slug.startsWith('calculadora-');
    vi.mocked(getCurrentValues).mockRejectedValue(new Error('Sin conexión a indicadores'));
    const metadata = await (isCalculator ? calculatorMetadata : blogMetadata)({
      params: Promise.resolve({ slug }),
    });
    const title =
      typeof metadata.title === 'object' && metadata.title && 'absolute' in metadata.title
        ? metadata.title.absolute
        : `${metadata.title} | ${SITE_NAME}`;

    expect(title).toMatch(intent);
    expect(title?.length).toBeLessThanOrEqual(60);
    expect(metadata.description).toBe(seoOverrides[slug].seoDescription);
    expect(metadata.description?.length).toBeGreaterThanOrEqual(80);
    expect(metadata.description?.length).toBeLessThanOrEqual(155);
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/${isCalculator ? 'calculadoras' : 'blog'}/${slug}`,
    );
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});

describe('metadata de indicadores en vivo', () => {
  it.each([
    ['2026-11-19T03:00:00Z', 'Valor UF hoy: $40.901,94 (19-11-2026) | UF a pesos'],
    ['2026-11-19T02:59:59Z', 'Valor UF: $40.901,94 (18-11-2026) | UF a pesos'],
  ])('UF observada a las %s se etiqueta según el día de Santiago', async (date, title) => {
    vi.setSystemTime(new Date('2026-11-19T03:05:00Z'));
    vi.mocked(getCurrentValues).mockResolvedValue(indicatorValues(date));
    const slug = 'calculadora-uf-clp';

    const metadata = await calculatorMetadata({ params: Promise.resolve({ slug }) });

    expect(metadata.title).toEqual({ absolute: title });
    expect(metadata.description).toBe(seoOverrides[slug].seoDescription);
  });

  it('UTM de noviembre deja de ser fresca al entrar diciembre en Santiago', async () => {
    vi.setSystemTime(new Date('2026-12-01T02:59:59Z'));
    vi.mocked(getCurrentValues).mockResolvedValue(indicatorValues('2026-11-01T12:00:00Z'));
    const slug = 'calculadora-utm-clp';
    const params = Promise.resolve({ slug });

    const november = await calculatorMetadata({ params });
    expect(november.title).toBe('UTM de noviembre 2026: $72.440 (SII)');
    expect(november.description).toContain('Diciembre: $72.802.');
    expect(november.description?.length).toBeLessThanOrEqual(155);

    vi.setSystemTime(new Date('2026-12-01T03:00:00Z'));
    const december = await calculatorMetadata({ params });
    expect(december.title).toBe(seoOverrides[slug].seoTitle);
    expect(december.description).toBe(seoOverrides[slug].seoDescription);
  });
});
