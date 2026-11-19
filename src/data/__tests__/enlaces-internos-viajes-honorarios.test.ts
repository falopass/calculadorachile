import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getArticleBySlug } from '../articles';
import { calculators } from '../calculators';
import { guiaOperacionRenta2027 } from '../guia-operacion-renta-2027';
import { getRelatedCalculators } from '@/lib/seo/related-calculators';

const newConverters = [
  'peso-colombiano-a-peso-chileno',
  'peso-mexicano-a-peso-chileno',
  'boliviano-a-peso-chileno',
];
const travelPosts = [
  'cuanto-cuesta-viajar-en-auto-verano-bencina-peajes-tag',
  'impuestos-compras-temu-aliexpress-shein-navidad',
];

describe('Enlaces internos de viajes y honorarios 2027', () => {
  const current = calculators.find((calc) => calc.slug === 'calculadora-costo-viaje')!;

  it.each(newConverters)('expone %s en relacionados visibles, artículos y llms.txt', (slug) => {
    expect(calculators.find((calc) => calc.slug === slug)?.noIndex).not.toBe(true);
    expect(calculators.some((calc) => calc.slug === slug)).toBe(true);
    expect(getRelatedCalculators(current, calculators, 6).map((calc) => calc.slug)).toContain(slug);
    for (const post of travelPosts) {
      expect(getArticleBySlug(post)!.content).toContain(`href="/calculadoras/${slug}"`);
    }
    expect(readFileSync('public/llms.txt', 'utf8')).toContain(
      `https://calculadorachile.cl/calculadoras/${slug}`,
    );
  });

  it('no devuelve enlaces inexistentes si falta el catálogo', () => {
    expect(getRelatedCalculators(current, [])).toEqual([]);
    expect(getRelatedCalculators(current, [current])).toEqual([]);
  });

  it('conserva enlaces tributarios existentes y distingue emisión de año tributario', () => {
    const guide = guiaOperacionRenta2027.sections.find((section) => section.id === 'honorarios')!.html;
    const f29 = getArticleBySlug('formulario-29-iva-mensual-plazos-2026')!.content;
    for (const content of [guide, f29]) {
      expect(content).toContain('href="/blog/boleta-honorarios-retencion-15-25-2026"');
      expect(content).toContain('href="/calculadoras/calculadora-boleta-honorarios"');
      expect(content).toContain('Ley 21.133');
      expect(content).toMatch(/16\s?%/);
    }
    expect(guide).toContain('Operación Renta 2028');
    expect(f29).toContain('desde el 1 de enero de 2027');
  });

  it.each(travelPosts)('%s solo enlaza calculadoras existentes', (slug) => {
    const content = getArticleBySlug(slug)!.content;
    for (const match of content.matchAll(/href="\/calculadoras\/([^"#?]+)"/g)) {
      expect(calculators.some((calc) => calc.slug === match[1])).toBe(true);
    }
  });
});
