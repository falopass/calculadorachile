import { describe, it, expect } from 'vitest';
import { getArticleBySlug } from '../articles';
import { INGRESO_MINIMO, JORNADA_LEGAL } from '@/lib/values/constants';

const SLUG = 'part-time-20-horas-sueldo-liquido';

describe('E-019: post part time de 20 horas', () => {
  const art = getArticleBySlug(SLUG)!;

  it('existe y embebe la calculadora part time', () => {
    expect(art).toBeDefined();
    expect(art.embedCalculatorId).toBe('sueldo-part-time');
  });

  it('montos desde partTime20() con IMM $553.553 y jornada de 42 h', () => {
    if (INGRESO_MINIMO.mensual !== 553_553 || JORNADA_LEGAL.actual !== 42) return; // cambia con el IMM 2027
    const lead = art.content.split('</p>')[0];
    for (const monto of ['$263.597', '$213.382', '$215.991', '$266.727', '$269.989']) {
      expect(lead).toContain(monto);
    }
    expect(art.seoTitle).toBe('Cuánto gana un part time de 20 horas (2026)');
    // Ejemplo con AFP Uno y gratificación, y tabla de las 7 AFP.
    expect(art.content).toContain('$65.899');
    expect(art.content).toContain('$329.496');
    expect(art.content).toContain('−$34.465');
    expect(art.content).toContain('−$23.065');
    expect(art.content).toContain('−$1.977');
    expect(art.content).toContain(
      '<tr><td>Uno (0,46%)</td><td>$215.991</td><td>$269.989</td></tr>',
    );
    expect(art.content).toContain(
      '<tr><td>ProVida (1,45%)</td><td>$213.382</td><td>$266.727</td></tr>',
    );
    expect(art.content).toContain('$1.252.084');
    expect(art.content).toContain('$104.340');
    expect(art.content).toContain('$417.361');
    expect(art.content).toContain('$271.966');
    expect(art.content).toContain('$217.573');
    expect(art.content).toContain(
      '42 horas semanales desde el 26 de abril de 2026</strong>, y baja a 40 horas el 26 de abril de 2028',
    );
    expect(art.faq!.map((f) => f.answer).join(' ')).toContain('$276.777');
  });

  it('tabla con las 7 AFP ordenadas por comisión', () => {
    const filas = art.content.match(/<tr><td>[^<]+ \(\d,\d{2}%\)<\/td>/g) ?? [];
    expect(filas).toHaveLength(7);
  });

  it('title ≤ 60, description ≤ 155 y sin NaN/undefined', () => {
    expect(art.seoTitle!.length).toBeLessThanOrEqual(60);
    expect(art.seoDescription!.length).toBeLessThanOrEqual(155);
    const todo = JSON.stringify(art);
    expect(todo).not.toContain('NaN');
    expect(todo).not.toContain('undefined');
    expect(todo).not.toContain('null');
  });

  it('no usa el proporcional de 36 horas ($474.474)', () => {
    expect(art.content).not.toContain('$474.474');
  });

  it('el post de 30 horas enlaza a este post', () => {
    const p30 = getArticleBySlug('sueldo-part-time-30-horas-2026-minimo-proporcional')!;
    expect(p30.content).toContain(`<a href="/blog/${SLUG}">20 horas al mínimo proporcional</a>`);
  });
});
