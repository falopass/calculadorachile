import { describe, expect, it } from 'vitest';
import { getArticleBySlug } from '../articles';
import { seoOverrides } from '../seo-overrides';
import { formatCLP, formatPercentage } from '@/lib/formatters';
import { DESEMPLEO_INE, SEGURO_CESANTIA_BENEFICIOS } from '@/lib/values/constants';

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

  it('sin datos SIN VERIFICAR (5 días hábiles) ni la frase BNE antigua', () => {
    expect(article.content).not.toMatch(/cinco días hábiles|5 días hábiles/);
    expect(article.content).not.toContain('reporta mensualmente');
  });

  it('FCS: 10 meses anteriores al término (art. 25) y diez pagos en cinco años (art. 24), con fuente BCN', () => {
    expect(article.content).not.toContain('últimos 12 meses');
    expect(article.content).toContain('10 meses anteriores al término');
    expect(article.content).toContain('Ley 21.628');
    expect(article.content).toMatch(/diez pagos del Fondo Solidario en cinco años[^<]*\(Ley 19\.728, art\. 24/);
    expect(article.content).toContain('https://www.bcn.cl/leychile/navegar?idNorma=184979');
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

  it('title "qué hacer si te despiden" ≤ 60 (override y headline) y meta ≤ 155', () => {
    const o = seoOverrides['checklist-despues-despido-chile-2026'];
    expect(o.seoTitle).toBe('Qué hacer si te despiden en Chile 2026: checklist y plazos');
    expect(o.seoTitle.length).toBeLessThanOrEqual(60);
    expect(article.seoTitle).toBe(o.seoTitle);
    expect(o.seoDescription.length).toBeLessThanOrEqual(155);
    expect(article.title).toBe('Qué hacer si te despiden en Chile: checklist paso a paso 2026');
  });
});

describe('Checklist despido: respuesta directa, contexto INE y FAQ visible (brief 2026-10-29)', () => {
  const article = getArticleBySlug('checklist-despues-despido-chile-2026')!;

  it('respuesta directa de 6 pasos justo después del lead', () => {
    const lead = article.content.indexOf('class="article-lead"');
    const bloque = article.content.indexOf('<h2 id="que-hacer-si-te-despiden">');
    expect(lead).toBe(3);
    expect(bloque).toBeGreaterThan(lead);
    expect(article.content.slice(lead, bloque).match(/<\/p>/g)).toHaveLength(1);
    const pasos = article.content.slice(bloque, article.content.indexOf('</ol>', bloque));
    expect(pasos.match(/<li>/g)).toHaveLength(6);
    for (const href of [
      '/calculadoras/calculadora-finiquito',
      '/calculadoras/calculadora-indemnizacion-anos-servicio',
      '/blog/como-cobrar-seguro-cesantia-afc-2026',
      '/calculadoras/calculadora-seguro-cesantia',
    ]) {
      expect(pasos).toContain(`href="${href}"`);
    }
    expect(pasos).toContain('utm_content=cesantia_blog_resumen_buscar_trabajo');
    expect(pasos).toContain('target="_blank" rel="noopener noreferrer"');
  });

  it('callout INE desde DESEMPLEO_INE, con fecha visible y sin frases de prensa', () => {
    expect(article.content).toContain(
      `la tasa de desocupación fue ${formatPercentage(DESEMPLEO_INE.tasa)} en el trimestre ${DESEMPLEO_INE.trimestre}`,
    );
    expect(article.content).toContain('9,8%');
    expect(article.content).toContain('1.007.976 personas desocupadas');
    expect(article.content).toContain(`href="${DESEMPLEO_INE.fuente}"`);
    expect(article.content).toContain('Dato publicado el 29-10-2026');
    expect(article.content).not.toMatch(/5 años|cinco años/);
  });

  it('FAQ nuevas visibles, pero fuera del array faq (sin schema)', () => {
    expect(article.content).toContain('<h2>Preguntas frecuentes sobre el despido</h2>');
    const nuevas = [
      '¿Qué hago primero si me despiden?',
      '¿Puedo cobrar el seguro de cesantía si me autodespido?',
      '¿Qué pasa con mi Isapre si me despiden?',
    ];
    for (const q of nuevas) {
      expect(article.content).toContain(`<h3>${q}</h3>`);
      expect(article.faq?.some((f) => f.question === q)).toBe(false);
    }
    expect(article.faq).toHaveLength(4);
  });
});
