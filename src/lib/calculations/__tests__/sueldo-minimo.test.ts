import { describe, expect, it } from 'vitest';
import {
  calculateSueldoMinimo,
  sueldoMinimoToResults,
} from '../sueldo-minimo';
import { INGRESO_MINIMO, JORNADA_LEGAL } from '@/lib/values/constants';

describe('calculateSueldoMinimo', () => {
  it('jornada completa: bruto igual al IMM general vigente', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: JORNADA_LEGAL.actual,
      tipoIngreso: 'general',
    });
    expect(r.bruto).toBe(INGRESO_MINIMO.mensual);
    expect(r.esJornadaParcial).toBe(false);
  });

  it('jornada parcial de 30 h: mínimo proporcional IMM × 30 / 42', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 30,
      tipoIngreso: 'general',
    });
    expect(r.esJornadaParcial).toBe(true);
    expect(r.bruto).toBe(Math.round((INGRESO_MINIMO.mensual * 30) / 42));
  });

  it('jornada intermedia (31–41 h): corresponde el IMM íntegro', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 40,
      tipoIngreso: 'general',
    });
    expect(r.esJornadaIntermedia).toBe(true);
    expect(r.bruto).toBe(INGRESO_MINIMO.mensual);
  });

  it('líquido estimado descuenta 10% AFP + 7% salud + 0,6% AFC', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'general',
    });
    expect(r.liquidoEstimado).toBe(Math.round(INGRESO_MINIMO.mensual * 0.824));
  });

  it('tipos: menor18/mayor65, no remuneracional, zona extrema y jornal', () => {
    const menor = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'menor18-mayor65',
    });
    expect(menor.bruto).toBe(INGRESO_MINIMO.menor_18_mayor_65);

    const noRem = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'no-remuneracional',
    });
    expect(noRem.bruto).toBe(INGRESO_MINIMO.no_remuneracional);

    const zona = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'zona-extrema',
    });
    expect(zona.bruto).toBe(INGRESO_MINIMO.zona_extrema);

    const jornal = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'jornal',
    });
    expect(jornal.bruto).toBe(INGRESO_MINIMO.jornal);
    expect(jornal.liquidoEstimado).toBeNull();
  });

  it('valor hora referencial coincide con la hora legal del IMM a 42 h', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'general',
    });
    expect(r.valorHora).toBe(Math.round(INGRESO_MINIMO.hora));
  });

  it('sin líquido cuando el input lo desactiva', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 42,
      tipoIngreso: 'general',
      incluirLiquidoEstimado: false,
    });
    expect(r.liquidoEstimado).toBeNull();
  });

  it('toResults destaca el bruto y muestra el líquido', () => {
    const r = calculateSueldoMinimo({
      horasSemanales: 20,
      tipoIngreso: 'general',
    });
    const results = sueldoMinimoToResults(r);
    expect(results[0].highlight).toBe(true);
    expect(results.find((x) => x.label === 'Líquido estimado')?.value).toBe(
      r.liquidoEstimado,
    );
  });
});
