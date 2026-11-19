import { describe, expect, it } from 'vitest';
import { articles, getArticleBySlug } from '../articles';
import { getCalculatorBySlug } from '../calculators';

const slug = 'cuanto-dinero-llevar-viaje-verano-2027';

describe('presupuesto de viaje verano 2027', () => {
  const article = getArticleBySlug(slug)!;

  it('publica una sola entrada con alcance y fuentes explícitos', () => {
    expect(articles.filter((item) => item.slug === slug)).toHaveLength(1);
    expect(article.content).toContain('diciembre de 2026 y marzo de 2027');
    expect(article.sources.length).toBeGreaterThan(0);
    for (const source of article.sources) {
      expect(new URL(source.url).hostname).toBe('si3.bcentral.cl');
      expect(article.content).toContain(source.url);
    }
    expect(article.faq?.length).toBeGreaterThan(0);
  });

  it('enlaza los seis conversores existentes y costo de viaje sin rutas rotas', () => {
    expect(article.relatedCalculators).toHaveLength(7);
    for (const calculatorSlug of article.relatedCalculators) {
      expect(getCalculatorBySlug(calculatorSlug)).toBeDefined();
      expect(article.content).toContain(`href="/calculadoras/${calculatorSlug}"`);
    }
    for (const code of ['ARS', 'BRL', 'PEN', 'COP', 'MXN', 'BOB']) {
      expect(article.content).toContain(`(${code})`);
    }
  });

  it('usa un método sin equivalencias CLP fijas ni cifras legales sin verificar', () => {
    expect(article.content).not.toMatch(/\$|\b\d+[.,]\d+\b|\d+\s*%/);
    expect(article.content).toContain('Presupuesto pendiente =');
    expect(article.content).toContain('fecha y la procedencia');
    expect(article.content).toContain('no publica umbrales');
    expect(article.content).toContain('déjalo identificado como pendiente');
    expect(article.content).toContain('si falla tu método principal');
  });
});
