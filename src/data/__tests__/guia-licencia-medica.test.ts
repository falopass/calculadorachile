import { describe, expect, it } from 'vitest';
import { getGuiaBySlug } from '../guias';
import { seoOverrides } from '../seo-overrides';
import { getGuiaForCalculator } from '@/lib/seo/calculator-guia-map';
import { calculators } from '../calculators';

const guia = getGuiaBySlug('licencia-medica-chile')!;
const html = guia.sections.map((s) => s.html).join('\n');

describe('E-023/E-025: guía licencia médica', () => {
  it('existe con H1, title y meta del brief 10-11', () => {
    expect(guia).toBeDefined();
    expect(guia.title).toBe(
      'Licencia médica en Chile 2026: quién paga, desde qué día y cómo se cobra',
    );
    const o = seoOverrides['licencia-medica-chile'];
    expect(o.seoTitle).toBe('Licencia médica en Chile: quién paga, plazos y cómo cobrar');
    expect(o.seoTitle.length).toBe(58);
    expect(o.seoDescription.length).toBe(144);
  });

  it('montos calculados desde el repo (sin NaN ni plantillas sin evaluar)', () => {
    expect(html).not.toContain('NaN');
    expect(html).not.toContain('${');
    expect(html).toContain('$30.000');
    expect(html).toContain('$210.000');
    expect(html).toContain('$450.000');
    expect(html).toContain('$5.947');
    expect(html).toContain('$356.815');
  });

  it('respeta lo que NO debe decir', () => {
    expect(html).not.toContain('95312');
    expect(html).not.toMatch(/UTM/);
    expect(html).not.toMatch(/\b5 días hábiles/);
    expect(html).not.toMatch(/art(ículo|\.)\s*1(59|60)\b/);
    expect(html).not.toMatch(/te multan/i);
    expect(html).not.toMatch(/cvlisto/i);
    expect(html).not.toMatch(/FAQPage/i);
  });

  it('secciones E-025, fecha 10-11 y un solo enlace a finiquito', () => {
    const ids = guia.sections.map((s) => s.id);
    expect(ids).toContain('despido-con-licencia');
    expect(ids).toContain('trabajar-con-licencia');
    expect(ids).toContain('contrato-durante-licencia');
    expect(ids).toContain('preguntas-frecuentes');
    expect(html.match(/\/calculadoras\/calculadora-finiquito"/g)).toHaveLength(1);
    expect(html).toContain('Actualizado el 10 de noviembre de 2026');
    expect(html).toContain('Alcance YMYL');
  });

  it('conserva el criterio de licencias continuadas (Vigía 18:49)', () => {
    expect(html).toMatch(/sin solución de continuidad/);
    expect(html).toMatch(/mismo diagnóstico o cuadro clínico/);
    expect(html).toMatch(/funcionarios públicos/);
    expect(html).not.toMatch(/se rechaza toda licencia emitida el mismo día del término o después(?! que no es continuación)/);
  });

  it('la calculadora de licencia apunta a la guía', () => {
    const calc = calculators.find((c) => c.slug === 'calculadora-licencia-medica')!;
    expect(getGuiaForCalculator(calc)?.slug).toBe('licencia-medica-chile');
  });
});
