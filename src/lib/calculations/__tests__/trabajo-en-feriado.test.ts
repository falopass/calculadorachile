import { describe, expect, it } from 'vitest';
import { calculateTrabajoEnFeriado } from '../trabajo-en-feriado';

describe('calculateTrabajoEnFeriado', () => {
  it('paga 8 h con recargo de 50% usando la fórmula DT (42 h = sueldo ÷ 180)', () => {
    const r = calculateTrabajoEnFeriado({
      sueldoBruto: 900_000,
      jornadaSemanal: 42,
      horasTrabajadas: 8,
      compensaConDescanso: false,
    });
    expect(r.valorDia).toBe(30_000);
    expect(r.valorHora).toBe(5_000);
    expect(r.valorHoraConRecargo).toBe(7_500);
    expect(r.totalAPagar).toBe(60_000);
    expect(r.diasDescanso).toBe(0);
  });

  it('por defecto compensa con un día de descanso y sin pago adicional', () => {
    const r = calculateTrabajoEnFeriado({ sueldoBruto: 900_000, horasTrabajadas: 8 });
    expect(r.compensaConDescanso).toBe(true);
    expect(r.totalAPagar).toBe(0);
    expect(r.diasDescanso).toBe(1);
    expect(r.montoConRecargo).toBe(60_000);
  });

  it('eleva un recargo inferior al 50% al mínimo legal', () => {
    const r = calculateTrabajoEnFeriado({
      sueldoBruto: 900_000,
      jornadaSemanal: 42,
      horasTrabajadas: 1,
      recargo: 20,
      compensaConDescanso: false,
    });
    expect(r.recargo).toBe(50);
    expect(r.totalAPagar).toBe(7_500);
  });

  it('acepta un recargo pactado mayor (100%)', () => {
    const r = calculateTrabajoEnFeriado({
      sueldoBruto: 900_000,
      jornadaSemanal: 42,
      horasTrabajadas: 8,
      recargo: 100,
      compensaConDescanso: false,
    });
    expect(r.valorHoraConRecargo).toBe(10_000);
    expect(r.totalAPagar).toBe(80_000);
  });

  it('usa la jornada informada (44 h)', () => {
    const r = calculateTrabajoEnFeriado({
      sueldoBruto: 800_000,
      jornadaSemanal: 44,
      horasTrabajadas: 1,
      compensaConDescanso: false,
    });
    expect(r.valorHora).toBe(Math.round(((800_000 / 30) * 28) / 176));
  });

  it('sin horas trabajadas no genera pago ni descanso', () => {
    const r = calculateTrabajoEnFeriado({ sueldoBruto: -5, horasTrabajadas: -2 });
    expect(r.totalAPagar).toBe(0);
    expect(r.montoConRecargo).toBe(0);
    expect(r.diasDescanso).toBe(0);
  });
});
