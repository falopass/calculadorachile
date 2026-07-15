import { describe, expect, it } from 'vitest';
import { JORNADA_LEGAL } from '@/lib/values/constants';
import { calculateHorasExtra } from '../horas-extra';

describe('calculateHorasExtra', () => {
  it('usa 42 horas como jornada vigente desde abril de 2026', () => {
    const result = calculateHorasExtra({ sueldoBruto: 1_000_000, horasExtra: 0 });
    expect(result.jornadaSemanal).toBe(JORNADA_LEGAL.actual);
  });

  it('aplica la fórmula mensual de la DT', () => {
    const result = calculateHorasExtra({
      sueldoBruto: 1_000_000,
      horasExtra: 1,
      jornadaSemanal: 42,
    });
    const horaOrdinaria = ((1_000_000 / 30) * 28) / (42 * 4);
    expect(result.valorHoraNormal).toBe(Math.round(horaOrdinaria));
    expect(result.valorHoraExtra).toBe(Math.round(horaOrdinaria * 1.5));
    expect(result.valorHoraExtra).toBe(8_333);
  });

  it('el recargo mínimo es 50%', () => {
    const result = calculateHorasExtra({
      sueldoBruto: 800_000,
      horasExtra: 2,
      recargoPersonalizado: 20,
    });
    expect(result.recargo).toBe(50);
  });

  it('acepta un pacto más favorable', () => {
    const result = calculateHorasExtra({
      sueldoBruto: 800_000,
      horasExtra: 2,
      recargoPersonalizado: 75,
    });
    expect(result.recargo).toBe(75);
  });

  it('suma las horas extra al sueldo base', () => {
    const result = calculateHorasExtra({ sueldoBruto: 1_000_000, horasExtra: 4 });
    expect(result.totalAPagar).toBe(1_000_000 + result.totalHorasExtra);
  });

  it('usa el promedio declarado para remuneración variable', () => {
    const result = calculateHorasExtra({
      sueldoBruto: 800_000,
      horasExtra: 1,
      sueldoVariable: true,
      sueldoPromedio3Meses: 1_200_000,
    });
    expect(result.sueldoBaseCalculo).toBe(1_200_000);
  });

  it('solo expone el máximo diario de dos horas', () => {
    const result = calculateHorasExtra({
      sueldoBruto: 800_000,
      horasExtra: 0,
      mostrarTopeLegal: true,
    });
    expect(result.topeLegalDiario).toBe(2);
    expect(result).not.toHaveProperty('topeLegal.horasSemanal');
  });
});
