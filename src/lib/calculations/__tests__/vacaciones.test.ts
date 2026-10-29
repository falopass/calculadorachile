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


describe('fracción de día según DT ORD. 826/13 (E-017)', () => {
  it('ejemplo del ORD. 826/13: 3 meses con término el martes 03-11-2026 → 5,75 corridos', () => {
    const r = calculateVacaciones({ sueldoBruto: 800_000, mesesTrabajados: 3, fechaTermino: '2026-11-03' });
    // mié 4, jue 5, vie 6 (3 hábiles); la fracción 0,75 pasa al lunes 9: se pagan sáb 7 y dom 8
    expect(r.diasHabilesTotales).toBe(3.75);
    expect(r.diasCorridosIndemnizables).toBe(5.75);
  });

  it('6 meses con término el lunes 30-11-2026 → 7,5 hábiles, 10,5 corridos, $280.000', () => {
    const r = calculateVacaciones({ sueldoBruto: 800_000, mesesTrabajados: 6, fechaTermino: '2026-11-30' });
    expect(r.diasHabilesTotales).toBe(7.5);
    expect(r.diasCorridosIndemnizables).toBe(10.5);
    expect(r.totalVacaciones).toBe(280_000);
  });

  it('11 meses con término el 30-11-2026 → 20,75 corridos, $553.333', () => {
    const r = calculateVacaciones({ sueldoBruto: 800_000, mesesTrabajados: 11, fechaTermino: '2026-11-30' });
    // 13 hábiles llegan al vie 18-12; la fracción 0,75 pasa al lun 21: se pagan sáb 19 y dom 20
    expect(r.diasCorridosIndemnizables).toBe(20.75);
    expect(r.totalVacaciones).toBe(553_333);
  });

  it('7 meses con término el 30-11-2026 → 13,75 corridos (fracción antes del fin de semana)', () => {
    const r = calculateVacaciones({ sueldoBruto: 800_000, mesesTrabajados: 7, fechaTermino: '2026-11-30' });
    expect(r.diasCorridosIndemnizables).toBe(13.75);
  });

  it('6 meses con término el 31-12-2026 → 12,5 corridos', () => {
    const r = calculateVacaciones({ sueldoBruto: 800_000, mesesTrabajados: 6, fechaTermino: '2026-12-31' });
    expect(r.diasCorridosIndemnizables).toBe(12.5);
    expect(r.totalVacaciones).toBe(333_333);
  });

  it('sin fracción no agrega días inhábiles al final', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 8, fechaTermino: '2026-11-30' });
    expect(r.diasCorridosIndemnizables).toBe(15);
    expect(r.totalVacaciones).toBe(300_000);
  });
});
