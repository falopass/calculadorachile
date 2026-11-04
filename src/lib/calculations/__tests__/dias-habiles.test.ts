import { describe, expect, it } from 'vitest';
import { calculateDiasHabiles, diasHabilesToResults } from '../dias-habiles';

describe('calculateDiasHabiles — modo entre-fechas', () => {
  // jue 05-11-2026 → lun 09-11-2026: ventana vie 06, sáb 07, dom 08, lun 09
  it('cuenta hábiles en una semana normal sin feriados (administrativo)', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: false,
    });
    expect(r.diasHabiles).toBe(2); // vie 06 y lun 09
    expect(r.diasCorridos).toBe(4);
    expect(r.finesDeSemana).toBe(2);
    expect(r.diasInhabiles).toBe(2);
    expect(r.feriadosEnRango).toEqual([]);
    expect(r.feriadosPendientesEnRango).toEqual([]);
  });

  it('en cómputo judicial el sábado sí es hábil (CPC art. 59)', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: true,
    });
    expect(r.diasHabiles).toBe(3); // vie 06, sáb 07 y lun 09
    expect(r.diasCorridos).toBe(4);
    expect(r.finesDeSemana).toBe(1); // solo dom 08
  });

  it('no cuenta el día de inicio ni un día posterior al término', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-09', // lunes
      fechaFin: '2026-11-09',
      incluirSabados: false,
    });
    expect(r.diasHabiles).toBe(0);
    expect(r.diasCorridos).toBe(0);
  });

  it('usa modo entre-fechas por defecto', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: false,
    });
    expect(r.modo).toBe('entre-fechas');
  });
});

describe('calculateDiasHabiles — Fiestas Patrias 2026', () => {
  // mié 16-09-2026 → lun 21-09-2026: jue 17, vie 18 (feriado), sáb 19 (feriado), dom 20, lun 21
  it('descuenta los feriados del 18 y 19 de septiembre', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-09-16',
      fechaFin: '2026-09-21',
      incluirSabados: false,
    });
    expect(r.diasHabiles).toBe(2); // jue 17 y lun 21
    expect(r.diasCorridos).toBe(5);
    expect(r.feriadosEnRango).toEqual(['2026-09-18', '2026-09-19']);
    expect(r.feriadosPendientesEnRango).toEqual([]); // 2026 está verificado
    expect(r.fueraDeCoberturaFeriados).toBe(false);
  });

  it('el sábado 19 es inhábil también en judicial por ser feriado', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-09-16',
      fechaFin: '2026-09-21',
      incluirSabados: true,
    });
    expect(r.diasHabiles).toBe(2);
  });
});

describe('calculateDiasHabiles — modo sumar-dias', () => {
  // vie 06-11-2026: sáb 07 y dom 08 no cuentan (administrativo)
  it('sumar 5 hábiles desde un viernes salta el fin de semana', () => {
    const r = calculateDiasHabiles({
      modo: 'sumar-dias',
      fechaInicio: '2026-11-06',
      diasASumar: 5,
      incluirSabados: false,
    });
    expect(r.fechaVencimiento).toBe('2026-11-13'); // lun 09 → vie 13
    expect(r.diasHabiles).toBe(5);
    expect(r.diasCorridos).toBe(7);
  });

  it('sumar 10 hábiles desde un viernes llega al viernes siguiente +1', () => {
    const r = calculateDiasHabiles({
      modo: 'sumar-dias',
      fechaInicio: '2026-11-06',
      diasASumar: 10,
      incluirSabados: false,
    });
    expect(r.fechaVencimiento).toBe('2026-11-20');
    expect(r.diasCorridos).toBe(14);
  });

  it('en judicial el sábado cuenta: 5 hábiles desde viernes → jueves', () => {
    const r = calculateDiasHabiles({
      modo: 'sumar-dias',
      fechaInicio: '2026-11-06',
      diasASumar: 5,
      incluirSabados: true,
    });
    expect(r.fechaVencimiento).toBe('2026-11-12'); // sáb 07 + lun–jue
    expect(r.diasCorridos).toBe(6);
  });

  it('sumar hábiles cruzando Fiestas Patrias 2026', () => {
    const r = calculateDiasHabiles({
      modo: 'sumar-dias',
      fechaInicio: '2026-09-16', // mié
      diasASumar: 3,
      incluirSabados: false,
    });
    // jue 17 (1), vie 18 y sáb 19 feriados, dom 20, lun 21 (2), mar 22 (3)
    expect(r.fechaVencimiento).toBe('2026-09-22');
    expect(r.feriadosEnRango).toEqual(['2026-09-18', '2026-09-19']);
  });
});

describe('calculateDiasHabiles — feriados 2027 pendientes', () => {
  // jue 25-03-2027 → mar 30-03-2027: vie 26 y sáb 27 feriados pendientes, dom 28, lun 29, mar 30
  it('detecta Viernes Santo y Sábado Santo 2027 como pendientes', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2027-03-25',
      fechaFin: '2027-03-30',
      incluirSabados: false,
    });
    expect(r.diasHabiles).toBe(2); // lun 29 y mar 30
    expect(r.feriadosPendientesEnRango).toEqual(['2027-03-26', '2027-03-27']);
    expect(r.feriadosEnRango).toEqual(['2027-03-26', '2027-03-27']);
  });

  it('detecta el Día Nacional de los Pueblos Indígenas 2027 como pendiente', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2027-06-18', // viernes
      fechaFin: '2027-06-22', // martes
      incluirSabados: false,
    });
    // sáb 19, dom 20, lun 21 (feriado pendiente), mar 22
    expect(r.feriadosPendientesEnRango).toEqual(['2027-06-21']);
    expect(r.diasHabiles).toBe(1);
  });

  it('diasHabilesToResults emite aviso explícito cuando hay pendientes', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2027-03-25',
      fechaFin: '2027-03-30',
      incluirSabados: false,
    });
    const results = diasHabilesToResults(r);
    const conAviso = results.find((x) => x.note?.text.includes('sin fecha oficial confirmada'));
    expect(conAviso).toBeDefined();
    expect(conAviso?.note?.text).toContain('2027-03-26');
    expect(conAviso?.note?.source?.url).toContain('bcn.cl');
  });

  it('diasHabilesToResults no emite aviso de pendientes sin ellos', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: false,
    });
    const results = diasHabilesToResults(r);
    expect(results.every((x) => !x.note?.text.includes('sin fecha oficial'))).toBe(true);
  });
});

describe('calculateDiasHabiles — validación', () => {
  const base = { incluirSabados: false };

  it('rechaza fecha de inicio inválida', () => {
    for (const fechaInicio of ['no-fecha', '2026-13-40', '2026-02-30', '05/11/2026', '']) {
      expect(() =>
        calculateDiasHabiles({ ...base, fechaInicio, fechaFin: '2026-11-09' }),
      ).toThrow();
    }
  });

  it('rechaza fechaFin inválida o ausente en entre-fechas', () => {
    expect(() =>
      calculateDiasHabiles({ ...base, fechaInicio: '2026-11-05', fechaFin: '2026-11-32' }),
    ).toThrow();
    expect(() => calculateDiasHabiles({ ...base, fechaInicio: '2026-11-05' })).toThrow();
  });

  it('rechaza fechaFin anterior a fechaInicio', () => {
    expect(() =>
      calculateDiasHabiles({
        ...base,
        fechaInicio: '2026-11-09',
        fechaFin: '2026-11-05',
      }),
    ).toThrow(/fecha de término/);
  });

  it('rechaza diasASumar inválido en sumar-dias', () => {
    for (const diasASumar of [undefined, 0, -3, 2.5]) {
      expect(() =>
        calculateDiasHabiles({ ...base, modo: 'sumar-dias', fechaInicio: '2026-11-06', diasASumar }),
      ).toThrow();
    }
  });
});

describe('diasHabilesToResults — formato', () => {
  it('entre-fechas destaca días hábiles y cita la Ley 19.880', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: false,
    });
    const results = diasHabilesToResults(r);
    expect(results[0].label).toBe('Días hábiles');
    expect(results[0].value).toBe(2);
    expect(results[0].highlight).toBe(true);
    expect(results[0].note?.source?.url).toContain('idNorma=210676');
  });

  it('sumar-dias entrega la fecha de vencimiento en el label', () => {
    const r = calculateDiasHabiles({
      modo: 'sumar-dias',
      fechaInicio: '2026-11-06',
      diasASumar: 5,
      incluirSabados: false,
    });
    const results = diasHabilesToResults(r);
    expect(results[0].label).toContain('13-11-2026');
    expect(results[0].label).toContain('viernes');
  });

  it('en judicial la nota explica que el sábado es hábil y cita el CPC', () => {
    const r = calculateDiasHabiles({
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-09',
      incluirSabados: true,
    });
    const results = diasHabilesToResults(r);
    expect(results[0].note?.text).toContain('sábado es día hábil');
    expect(results[0].note?.source?.url).toContain('idNorma=22740');
  });
});
