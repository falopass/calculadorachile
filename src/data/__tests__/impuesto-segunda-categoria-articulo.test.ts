import { describe, expect, it } from 'vitest';
import { calculateImpuestoSegundaCategoria } from '@/lib/calculations/impuesto-segunda-categoria';
import { formatCLP } from '@/lib/formatters';
import { getArticleBySlug } from '../articles';
import { getCalculatorBySlug } from '../calculators';

const slug = 'impuesto-segunda-categoria-2026-ejemplo';
const calculatorSlug = 'calculadora-impuesto-segunda-categoria';

describe('artículo sobre el impuesto único de segunda categoría', () => {
  it('está publicado en el catálogo y enlaza la calculadora y la tabla oficial', () => {
    const article = getArticleBySlug(slug)!;
    const calculator = getCalculatorBySlug(calculatorSlug)!;

    expect(article.relatedCalculators).toContain(calculator.id);
    expect(article.content).toContain(`href="/calculadoras/${calculator.slug}"`);
    expect(article.sources.map(({ url }) => url)).toContain(
      'https://www.sii.cl/normativa_legislacion/circulares/2026/circu39.pdf',
    );
  });

  it('publica la misma base y retención que la calculadora con la UTM de noviembre de 2026', () => {
    const article = getArticleBySlug(slug)!;
    const result = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 2_000_000,
      descontarCotizaciones: true,
      valorUTM: 72_440,
    });

    expect(result).toMatchObject({
      cotizaciones: 377_400,
      baseTributable: 1_622_600,
      impuestoMensual: 25_786,
    });
    expect(article.content).toContain(
      `Base tributable:</strong> ${formatCLP(result.sueldoMensual)} − ${formatCLP(result.cotizaciones)} = ${formatCLP(result.baseTributable)}.`,
    );
    expect(article.content).toContain(
      `Impuesto mensual estimado al peso: ${formatCLP(result.impuestoMensual)}</span>`,
    );
  });
});
