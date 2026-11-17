import { describe, expect, it } from 'vitest';
import { calculateValorHoraTrabajo } from '../valor-hora-trabajo';

describe('calculateValorHoraTrabajo', () => {
  it('golden DT: $800.000 con 42 h → día $26.667, hora $4.444, extra $6.667', () => {
    const r = calculateValorHoraTrabajo({ sueldoBruto: 800_000, jornadaSemanal: 42 });
    expect(r.valorDia).toBe(26_667);
    expect(r.valorHora).toBe(4_444);
    expect(r.valorHoraExtra).toBe(6_667);
  });

  it('usa 42 h por defecto (sueldo ÷ 180)', () => {
    expect(calculateValorHoraTrabajo({ sueldoBruto: 900_000 }).valorHora).toBe(5_000);
  });

  it('con 44 h divide por 176 horas', () => {
    const r = calculateValorHoraTrabajo({ sueldoBruto: 880_000, jornadaSemanal: 44 });
    expect(r.valorHora).toBe(Math.round(((880_000 / 30) * 28) / 176));
  });

  it('sueldo negativo o cero entrega cero', () => {
    const r = calculateValorHoraTrabajo({ sueldoBruto: -1 });
    expect(r).toMatchObject({ valorDia: 0, valorHora: 0, valorHoraExtra: 0 });
  });
});
