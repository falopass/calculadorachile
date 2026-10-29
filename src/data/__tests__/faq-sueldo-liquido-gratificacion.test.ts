import { describe, expect, it } from 'vitest';
import { getCalculatorBySlug } from '../calculators';
import { formatCLP } from '@/lib/formatters';
import { topeGratificacion } from '@/lib/values/gratificacion-tope';

describe('FAQ sueldo líquido: gratificación', () => {
  const faq = getCalculatorBySlug('calculadora-sueldo-liquido')!.faq!;
  const item = faq.find(
    (f) => f.question === '¿La gratificación se incluye en el sueldo líquido?',
  )!;
  const tope = topeGratificacion();

  it('no dice "4.75% del sueldo mínimo"', () => {
    expect(item.answer).not.toMatch(/4[.,]75\s*%/);
  });

  it('usa 4,75 ingresos mínimos al año y los montos de la constante', () => {
    expect(item.answer).toContain('4,75 ingresos mínimos mensuales al año');
    expect(item.answer).toContain(formatCLP(tope.anual));
    expect(item.answer).toContain(formatCLP(tope.mensual));
    expect(item.answer).toContain(formatCLP(tope.imm));
  });
});
