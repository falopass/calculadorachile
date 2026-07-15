import { describe, expect, it } from 'vitest';
import { calculateVacaciones } from '../vacaciones';

describe('calculateVacaciones', () => {
  it('acumula 1,25 días hábiles por mes', () => {
    const result = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 6 });
    expect(result.diasHabilesProporcionales).toBe(7.5);
  });

  it('incorpora la fracción de mes por día trabajado', () => {
    const result = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 6,
      diasTrabajadosUltimoMes: 12,
    });
    expect(result.diasHabilesProporcionales).toBe(8);
  });

  it('proyecta sábados, domingos y el feriado del 16 de julio', () => {
    const result = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 4,
      fechaTermino: '2026-07-10',
    });
    expect(result.diasHabilesTotales).toBe(5);
    expect(result.diasCorridosIndemnizables).toBe(10);
    expect(result.totalVacaciones).toBe(200_000);
  });

  it('incorpora feriados nacionales dentro de la proyección', () => {
    const result = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 4,
      fechaTermino: '2026-09-16',
    });
    expect(result.diasHabilesTotales).toBe(5);
    expect(result.diasCorridosIndemnizables).toBeGreaterThan(7);
  });

  it('suma días hábiles pendientes antes de proyectar el calendario', () => {
    const result = calculateVacaciones({
      sueldoBruto: 900_000,
      mesesTrabajados: 4,
      diasVacacionesPendientes: 2,
      fechaTermino: '2026-07-10',
    });
    expect(result.diasHabilesTotales).toBe(7);
    expect(result.diasCorridosIndemnizables).toBe(12);
  });

  it('sin fecha declara que no aplicó calendario', () => {
    const result = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 6 });
    expect(result.calendarioAplicado).toBe(false);
    expect(result.diasCorridosIndemnizables).toBe(7.5);
  });
});
