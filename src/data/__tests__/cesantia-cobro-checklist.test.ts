import { describe, expect, it } from 'vitest';
import { getArticleBySlug } from '../articles';
import { seoOverrides } from '../seo-overrides';
import { formatCLP } from '@/lib/formatters';
import { SEGURO_CESANTIA_BENEFICIOS } from '@/lib/values/constants';

const FCS = SEGURO_CESANTIA_BENEFICIOS.fcs;

describe('E-021: cómo cobrar el seguro de cesantía', () => {
  const article = getArticleBySlug('como-cobrar-seguro-cesantia-afc-2026')!;

  it('title y meta solo en seo-overrides, meta ≤ 155', () => {
    expect(article.seoTitle).toBeUndefined();
    expect(article.seoDescription).toBeUndefined();
    const o = seoOverrides['como-cobrar-seguro-cesantia-afc-2026'];
    expect(o.seoTitle).toBe('Cómo cobrar el seguro de cesantía 2026: pasos y cuándo pagan');
    expect(o.seoDescription.length).toBeLessThanOrEqual(155);
  });

  it('sin datos SIN VERIFICAR (5 días hábiles, diez pagos) ni la frase BNE antigua', () => {
    expect(article.content).not.toMatch(/cinco días hábiles|5 días hábiles/);
    expect(article.content).not.toContain('diez pagos');
    expect(article.content).not.toContain('reporta mensualmente');
  });

  it('respuesta directa con la regla del jueves y tabla FCS desde la constante', () => {
    expect(article.content.indexOf('jueves')).toBeLessThan(600);
    expect(article.content).toContain(formatCLP(FCS.indefinido.minimos[0]));
    expect(article.content).toContain(formatCLP(FCS.indefinido.maximos[0]));
    expect(article.content).toContain(formatCLP(FCS.plazoFijo.minimos[0]));
    expect(article.content).toContain('28 de febrero de 2027');
    expect(article.content).not.toContain('quedo-cesante-o-esta-cobrando-su-seguro');
  });

  it('un solo enlace a la calculadora de finiquito en el cuerpo', () => {
    expect(article.content.match(/\/calculadoras\/calculadora-finiquito"/g)).toHaveLength(1);
  });
});

describe('E-024: checklist después del despido', () => {
  const article = getArticleBySlug('checklist-despues-despido-chile-2026')!;

  it('corrige 96 horas y quita los 5 días hábiles', () => {
    expect(article.content).not.toContain('completar el currículum dentro de las 96 horas');
    expect(article.content).toContain('activar tu cuenta dentro de 96 horas');
    expect(article.content).not.toMatch(/cinco días hábiles/);
  });

  it('sección BNE/OMIL/SENCE con enlace CVListo construido por el helper', () => {
    expect(article.content).toContain('<h2>Dónde buscar trabajo: BNE, OMIL y SENCE</h2>');
    expect(article.content).toContain(
      'href="https://cvlisto.cl/buscar-trabajo-chile?origen=cesantia&utm_source=calculachile',
    );
    expect(article.content).toContain('rel="noopener noreferrer"');
    expect(article.content).not.toContain('ofertas?mostrar=empleo');
  });

  it('title sin cambios; meta nueva ≤ 155', () => {
    const o = seoOverrides['checklist-despues-despido-chile-2026'];
    expect(o.seoTitle).toBe('Checklist despido Chile 2026: finiquito, AFC y CV');
    expect(o.seoDescription.length).toBeLessThanOrEqual(155);
  });
});
