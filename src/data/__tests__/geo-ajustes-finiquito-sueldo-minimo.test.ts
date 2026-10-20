import { describe, it, expect } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { getArticleBySlug } from '../articles';
import { INGRESO_MINIMO } from '@/lib/values/constants';
import { formatCLP } from '@/lib/formatters';

describe('respuesta directa del finiquito: al menos un año (art. 163)', () => {
  it('incluye "y llevabas al menos un año, el finiquito incluye"', () => {
    const qa = getQuickAnswer('finiquito', { uf: 41_189.24, utm: 72_151 })!;
    expect(qa.lead.startsWith(
      'Si te despiden por necesidades de la empresa o desahucio y llevabas al menos un año, el finiquito incluye 30 días de tu última remuneración mensual por cada año trabajado',
    )).toBe(true);
    expect(qa.lead).toContain('dentro de 10 días hábiles');
  });
});

describe('post sueldo mínimo: aviso y FAQ desde INGRESO_MINIMO.mensual', () => {
  const post = getArticleBySlug('sueldo-minimo-2026-calcular-liquido')!;
  const monto = formatCLP(INGRESO_MINIMO.mensual);

  it('el aviso de arriba usa la constante', () => {
    expect(post.content.startsWith('<aside class="callout callout--info">')).toBe(true);
    const aviso = post.content.slice(0, post.content.indexOf('</aside>'));
    expect(aviso).toContain(`<strong>${monto}</strong>`);
  });

  it('las FAQ que citan el mínimo usan la constante', () => {
    const faq = post.faq!.map((f) => `${f.question} ${f.answer}`).join(' ');
    expect(faq).toContain(`es ${monto} para trabajadores mayores de 18`);
    expect(faq).toContain(`¿Desde cuándo rige el ${monto}?`);
    expect(faq).toContain(`multiplicar ${monto} por las horas semanales`);
  });

  it('no anuncia montos de 2027', () => {
    const aviso = post.content.slice(0, post.content.indexOf('</aside>'));
    expect(aviso).not.toMatch(/2027/);
  });
});
