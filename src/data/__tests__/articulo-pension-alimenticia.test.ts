import { describe, expect, it } from 'vitest';
import { getArticleBySlug } from '../articles';
import { calculatePensionAlimenticia } from '@/lib/calculations/pension-alimenticia';
import { formatCLP } from '@/lib/formatters';

const slug = 'pension-alimenticia-2026-ejemplo-calculo';

describe('post #38: pensión alimenticia 2026', () => {
  const article = getArticleBySlug(slug)!;

  it('registra la calculadora, la guía y las fuentes oficiales', () => {
    expect(article.embedCalculatorId).toBe('pension-alimenticia');
    expect(article.relatedCalculators).toContain('calculadora-pension-alimenticia');
    expect(article.relatedGuia).toBe('familia-pension-alimenticia-chile');
    expect(article.updatedAt).toBe('2026-11-19');
    for (const id of ['187930', '1168463', '1225354', '1214530']) {
      expect(article.sources.some((source) => source.url.includes(`idNorma=${id}`))).toBe(true);
    }
    expect(article.content).toContain('/calculadoras/calculadora-pension-alimenticia');
    expect(article.faq!.length).toBeGreaterThanOrEqual(4);
  });

  it('reproduce la función sin convertir el límite en una pensión recomendada', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000, numeroHijos: 2, tieneOtroIngreso: false,
    });
    for (const amount of [result.pisoLegalPorHijo, result.pisoLegalTotal, result.limiteGeneralIngresos]) {
      expect(article.content).toContain(formatCLP(amount));
    }
    expect(article.content).toContain('no recomienda una suma');
    expect(article.content).toContain('1 de mayo de 2026');
    expect(article.content).toContain('razones fundadas');
    expect(article.content).toContain('UTM');
    console.log('Ejemplo #38:', JSON.stringify(result));
  });

  it('explica el conflicto de ingresos bajos sin recortar automáticamente el piso', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 300_000, numeroHijos: 2, tieneOtroIngreso: false,
    });
    expect(result.pisoSuperaLimiteGeneral).toBe(true);
    expect(article.content).toContain(formatCLP(result.limiteGeneralIngresos));
    expect(article.content).toContain('no reemplaza entonces el piso por el límite');
  });

  it('mantiene contenido sustantivo y no genera valores vacíos o inválidos', () => {
    const body = article.content.split('<h2>Fuentes y fecha de revisión</h2>')[0]
      .replace(/<aside[\s\S]*?<\/aside>/g, '').replace(/<[^>]+>/g, ' ');
    expect(body.trim().split(/\s+/).length).toBeGreaterThanOrEqual(1500);
    expect(article.content).not.toMatch(/NaN|undefined|null/);
    expect(getArticleBySlug('pension-alimenticia-post-inexistente')).toBeUndefined();
  });
});
