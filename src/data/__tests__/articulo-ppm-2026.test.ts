import { describe, it, expect } from 'vitest';
import { getArticleBySlug } from '../articles';
import { formatCLP } from '@/lib/formatters';
import { getRetencionHonorarios } from '@/lib/values/honorarios-anio';

const SLUG = 'ppm-2026-calcular-independientes';

describe('#32: post PPM 2026 (ppm-2026-calcular-independientes)', () => {
  const art = getArticleBySlug(SLUG)!;

  it('existe, embebe la calculadora PPM y enlaza la guía de IVA/honorarios', () => {
    expect(art).toBeDefined();
    expect(art.embedCalculatorId).toBe('ppm');
    expect(art.relatedCalculators).toContain('calculadora-ppm');
    expect(art.relatedGuia).toBe('iva-boleta-honorarios-chile');
    expect(art.content).toContain('href="/calculadoras/calculadora-ppm"');
  });

  it('el ejemplo del profesional queda fijado a 2026 (15,25%) y no cambia al recompilar', () => {
    expect(getRetencionHonorarios(2026)).toBe(15.25);
    // $12.000.000 × 15,25% = $1.830.000 anual, $152.500 mensual
    expect(art.content).toContain(formatCLP(1_830_000));
    expect(art.content).toContain(formatCLP(152_500));
    expect(art.content).toContain('15,25');
  });

  it('tasas de primera categoría se marcan como referenciales, no definitivas', () => {
    expect(art.content).toContain('1% referencial');
    expect(art.content).toContain('0,3% referencial');
    expect(art.content).toContain('0,2% referencial');
    expect(art.content).toContain('la tasa aplicable la confirma el SII');
  });

  it('plazos del F29: día 12 general y día 20 electrónico', () => {
    expect(art.content).toContain('día 12');
    expect(art.content).toContain('día 20');
  });

  it('distingue variación vs suspensión y aclara cotizaciones en la devolución', () => {
    expect(art.content).toContain('trámite distinto');
    expect(art.content).toContain('cotizaciones previsionales');
    // Las respuestas FAQ se publican como dato estructurado: mismas precisiones que el cuerpo.
    const faqVaria = art.faq?.find((f) => f.question.includes('suspender'));
    expect(faqVaria?.answer).toContain('trámites distintos');
    expect(faqVaria?.answer).toContain('mes siguiente a presentada la solicitud');
    const faqDevol = art.faq?.find((f) => f.question.includes('Qué es el PPM'));
    expect(faqDevol?.answer).toContain('cotizaciones previsionales');
  });
});
