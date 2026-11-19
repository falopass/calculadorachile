import { describe, expect, it } from 'vitest';
import { articles, getArticleBySlug } from '../articles';
import { calculators } from '../calculators';
import { getGuiaBySlug } from '../guias';

const cambioSlug = 'cambio-afp-2026-como-hacerlo';
const comparativaSlug = 'comparativa-comisiones-afp-2026';

describe('Artículo sobre el cambio de AFP', () => {
  it('publica el slug planificado una sola vez y conserva la comparativa como artículo aparte', () => {
    const cambio = getArticleBySlug(cambioSlug);

    expect(articles.filter(({ slug }) => slug === cambioSlug)).toHaveLength(1);
    expect(getArticleBySlug(comparativaSlug)?.content).toContain(`href="/blog/${cambioSlug}"`);
    expect(cambio?.content).toContain(`href="/blog/${comparativaSlug}"`);
  });

  it('enlaza al comparador del catálogo y a la guía previsional', () => {
    const cambio = getArticleBySlug(cambioSlug);
    const comparador = calculators.find(({ slug }) => slug === 'calculadora-comparador-afp');
    const guia = getGuiaBySlug('afp-pension-chile');

    expect(comparador).toBeDefined();
    expect(cambio?.relatedCalculators).toContain(comparador?.slug);
    expect(cambio?.content).toContain(`href="/calculadoras/${comparador?.slug}"`);
    expect(cambio?.relatedGuia).toBe(guia?.slug);
    expect(guia?.relatedArticles).toContain(cambioSlug);
  });
});
