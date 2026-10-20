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

describe('feriados nacionales 2027 (Vigía YMYL, BCN, 20-10-2026)', () => {
  it('Semana Santa: término jue 25-03-2027, 5 días hábiles → 8 corridos (vie 26 y sáb 27 feriados)', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 4, fechaTermino: '2027-03-25' });
    // 26 (feriado), 27 (feriado), 28 (dom), 29, 30, 31-03, 01-04, 02-04
    expect(r.diasCorridosIndemnizables).toBe(8);
    expect(r.totalVacaciones).toBe(160_000);
  });

  it('Fiestas Patrias: término jue 16-09-2027, 5 días hábiles → 8 corridos (vie 17 feriado adicional)', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 4, fechaTermino: '2027-09-16' });
    // 17 (feriado), 18, 19, 20, 21, 22, 23, 24
    expect(r.diasCorridosIndemnizables).toBe(8);
    expect(r.totalVacaciones).toBe(160_000);
  });

  it('Fiestas Patrias con 10 días hábiles: término vie 10-09-2027 → 17 corridos', () => {
    const r = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 4,
      diasVacacionesPendientes: 5,
      fechaTermino: '2027-09-10',
    });
    // 11-12 fin de semana, 13-16 (4), 17 feriado, 18-19, 20-24 (9), 25-26, 27 (10)
    expect(r.diasHabilesTotales).toBe(10);
    expect(r.diasCorridosIndemnizables).toBe(17);
    expect(r.totalVacaciones).toBe(340_000);
  });

  it('Encuentro de Dos Mundos trasladado al lun 11-10-2027: término vie 08-10-2027, 5 hábiles → 10 corridos', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 4, fechaTermino: '2027-10-08' });
    expect(r.diasCorridosIndemnizables).toBe(10);
    expect(r.totalVacaciones).toBe(200_000);
  });
});

