import { describe, expect, it } from 'vitest';
import { SITE_NAME } from '@/lib/site';
import { seoOverrides } from '../seo-overrides';

describe('metadata de páginas con alta impresión y bajo CTR', () => {
  it.each([
    ['calculadora-sueldo-part-time', /20 y 30 horas/],
    ['calculadora-licencia-medica', /cuántos días me pagan/],
    ['calculadora-uf-clp', /UF a pesos/],
    ['sueldo-minimo-2026-calcular-liquido', /Sueldo mínimo Chile 2026/],
    ['calculadora-iva', /Calculadora IVA Chile/],
    ['calculadora-utm-clp', /valor mensual/],
    ['calculadora-sueldo-liquido', /sueldo líquido en Chile/],
    ['calculadora-vacaciones-proporcionales', /días y pago/],
    ['calculadora-gratificacion-legal', /Tope de gratificación/],
    ['revision-tecnica-chile-2026-calendario-patente', /calendario por patente/],
    ['calculadora-seguro-cesantia', /Simulador seguro de cesantía/],
    ['calculadora-asignacion-familiar', /tramos y montos/],
    ['calculadora-comparador-afp', /AFP más barata/],
  ] as const)('%s responde a su búsqueda y limita la longitud', (slug, intent) => {
    const { seoTitle, seoDescription } = seoOverrides[slug];
    const title = slug === 'calculadora-uf-clp' ? seoTitle : `${seoTitle} | ${SITE_NAME}`;

    expect(title).toMatch(intent);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(seoDescription.length).toBeGreaterThanOrEqual(80);
    expect(seoDescription.length).toBeLessThanOrEqual(155);
  });
});
