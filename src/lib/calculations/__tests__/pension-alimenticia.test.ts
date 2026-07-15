import { describe, expect, it } from 'vitest';
import { INGRESO_MINIMO } from '@/lib/values/constants';
import { calculatePensionAlimenticia } from '../pension-alimenticia';

describe('calculatePensionAlimenticia', () => {
  it('un menor: el piso es 40% del IMM, no 40% del sueldo', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 1,
      tieneOtroIngreso: false,
    });

    expect(result.porcentajeMinimoPorHijo).toBe(40);
    expect(result.pisoLegalPorHijo).toBe(Math.round(INGRESO_MINIMO.mensual * 0.4));
    expect(result.pisoLegalTotal).toBe(result.pisoLegalPorHijo);
    expect(result.pisoLegalTotal).not.toBe(400_000);
  });

  it('dos o más menores: aplica 30% del IMM por cada uno', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 1_200_000,
      numeroHijos: 3,
      tieneOtroIngreso: false,
    });

    expect(result.porcentajeMinimoPorHijo).toBe(30);
    expect(result.pisoLegalPorHijo).toBe(Math.round(INGRESO_MINIMO.mensual * 0.3));
    expect(result.pisoLegalTotal).toBe(Math.round(INGRESO_MINIMO.mensual * 0.3 * 3));
  });

  it('muestra por separado el límite general de 50% de las rentas', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 800_000,
      numeroHijos: 2,
      tieneOtroIngreso: true,
      otroIngreso: 200_000,
    });

    expect(result.totalIngresos).toBe(1_000_000);
    expect(result.limiteGeneralIngresos).toBe(500_000);
  });

  it('advierte cuando el piso presunto supera 50% de los ingresos declarados', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 300_000,
      numeroHijos: 2,
      tieneOtroIngreso: false,
    });

    expect(result.pisoSuperaLimiteGeneral).toBe(true);
    expect(result.advertencia).toContain('tribunal');
  });

  it('ignora otro ingreso cuando la persona indica que no lo tiene', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 600_000,
      numeroHijos: 1,
      tieneOtroIngreso: false,
      otroIngreso: 900_000,
    });

    expect(result.totalIngresos).toBe(600_000);
  });

  it('cero menores produce piso cero', () => {
    const result = calculatePensionAlimenticia({
      sueldoBruto: 1_000_000,
      numeroHijos: 0,
      tieneOtroIngreso: false,
    });

    expect(result.pisoLegalTotal).toBe(0);
    expect(result.porcentajeMinimoPorHijo).toBe(0);
  });
});
