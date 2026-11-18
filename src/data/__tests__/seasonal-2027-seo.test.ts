import { describe, expect, it } from 'vitest';
import { calculators } from '../calculators';
import { getGuiaBySlug } from '../guias';
import { seoOverrides } from '../seo-overrides';
import { getGuiaForCalculatorSlug } from '@/lib/seo/calculator-guia-map';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/site';

const mappings = [
  ['calculadora-dias-habiles', 'feriados-chile-2027'],
  ['calculadora-trabajo-en-feriado', 'feriados-chile-2027'],
  ['calculadora-operacion-renta', 'preparacion-operacion-renta-2027-checklist'],
] as const;

const seasonalPages = [
  ['calculadoras', 'calculadora-dias-habiles'],
  ['calculadoras', 'calculadora-trabajo-en-feriado'],
  ['calculadoras', 'calculadora-vacaciones-proporcionales'],
  ['guias', 'feriados-chile-2027'],
  ['guias', 'preparacion-operacion-renta-2027-checklist'],
] as const;

describe('Enlazado y CTR estacional 2027', () => {
  it.each(mappings)('%s enlaza la guía existente %s', (calculatorSlug, guiaSlug) => {
    expect(calculators.find((calc) => calc.slug === calculatorSlug)).toBeDefined();
    expect(getGuiaBySlug(guiaSlug)).toBeDefined();
    expect(getGuiaForCalculatorSlug(calculatorSlug)?.slug).toBe(guiaSlug);
  });

  it.each(['', 'calculadora-inexistente'])('no inventa enlaces para %j', (slug) => {
    expect(getGuiaForCalculatorSlug(slug)).toBeNull();
  });

  it('conserva las guías específicas de vacaciones y honorarios', () => {
    expect(getGuiaForCalculatorSlug('calculadora-vacaciones-proporcionales')?.slug).toBe(
      'vacaciones-feriado-legal-chile',
    );
    expect(getGuiaForCalculatorSlug('calculadora-boleta-honorarios')?.slug).toBe(
      'iva-boleta-honorarios-chile',
    );
  });

  it.each(seasonalPages)('%s/%s conserva slug y canonical con override móvil', (section, slug) => {
    const page =
      section === 'guias' ? getGuiaBySlug(slug) : calculators.find((calc) => calc.slug === slug);
    expect(page?.slug).toBe(slug);
    const override = seoOverrides[slug];
    expect(override).toBeDefined();
    expect(override.seoTitle.length).toBeGreaterThan(0);
    expect(override.seoTitle.length).toBeLessThanOrEqual(58);
    expect(override.seoTitle).not.toContain('CalculaChile');
    expect(override.seoDescription.trim().length).toBeGreaterThan(0);
    const path = `/${section}/${page!.slug}`;
    const metadata = buildPageMetadata({
      path,
      title: override.seoTitle,
      description: override.seoDescription,
    });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/${section}/${slug}`);
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/${section}/${slug}`);
  });

  it('distingue el año tributario de las rentas y no promete devoluciones con fecha', () => {
    const override = seoOverrides['preparacion-operacion-renta-2027-checklist'];
    expect(override.seoTitle).toContain('2027');
    expect(override.seoDescription).toContain('ingresos de 2026');
    expect(override.seoDescription).toContain('aún pendientes');
    expect(seoOverrides['feriados-chile-2027'].seoTitle).toContain('2027');
  });
});
