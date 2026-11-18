import { describe, expect, it } from 'vitest';
import { loadCalculationFn } from '../load-calculator';
import { calculatePrenatalPostnatal, prenatalPostnatalToResults } from '../prenatal-postnatal';

describe('prenatal-postnatal (CT arts. 195, 196, 197 bis, 201)', () => {
  it('caso base con fecha probable de parto', () => {
    const r = calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15' });
    expect(r.inicioPrenatal).toBe('2027-02-01');
    expect(r.finPrenatal).toBe('2027-03-14');
    expect(r.diasPrenatal).toBe(42);
    expect(r.inicioPostnatal).toBe('2027-03-15');
    expect(r.finPostnatal).toBe('2027-06-06');
    expect(r.inicioParental).toBe('2027-06-07');
    expect(r.finParental).toBe('2027-08-29');
    expect(r.limiteAvisoMediaJornada).toBe('2027-05-07');
    expect(r.finFuero).toBe('2028-06-06');
  });

  it('parto atrasado prorroga el prenatal hasta el día anterior', () => {
    const r = calculatePrenatalPostnatal({
      fechaProbableParto: '2027-03-15',
      fechaParto: '2027-03-20',
    });
    expect(r.diasPrenatal).toBe(47);
    expect(r.finPrenatal).toBe('2027-03-19');
    expect(r.finPostnatal).toBe('2027-06-11');
  });

  it('parto adelantado acorta el prenatal; antes de su inicio no hay prenatal', () => {
    expect(
      calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15', fechaParto: '2027-03-01' })
        .diasPrenatal,
    ).toBe(28);
    const r = calculatePrenatalPostnatal({
      fechaProbableParto: '2027-03-15',
      fechaParto: '2027-01-20',
    });
    expect(r.diasPrenatal).toBe(0);
    expect(r.finPrenatal).toBeNull();
    expect(prenatalPostnatalToResults(r)[0].value).toBe(0);
  });

  it('prematuro o bajo peso: 126 días; múltiple: +7 por hijo; concurren → el mayor', () => {
    expect(
      calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15', prematuroOBajoPeso: true })
        .diasPostnatal,
    ).toBe(126);
    expect(
      calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15', numeroHijos: 3 })
        .diasPostnatal,
    ).toBe(98);
    expect(
      calculatePrenatalPostnatal({
        fechaProbableParto: '2027-03-15',
        numeroHijos: 2,
        prematuroOBajoPeso: true,
      }).diasPostnatal,
    ).toBe(126);
  });

  it('media jornada: 126 días de postnatal parental', () => {
    const r = calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15', mediaJornada: true });
    expect(r.diasParental).toBe(126);
    expect(r.finParental).toBe('2027-10-10');
  });

  it('fuero desde postnatal que termina un 29 de febrero', () => {
    const r = calculatePrenatalPostnatal({ fechaProbableParto: '2027-12-08' });
    expect(r.finPostnatal).toBe('2028-02-29');
    expect(r.finFuero).toBe('2029-02-28');
  });

  it('rechaza fechas inválidas', () => {
    expect(() => calculatePrenatalPostnatal({ fechaProbableParto: '15-03-2027' })).toThrow();
    expect(() => calculatePrenatalPostnatal({ fechaProbableParto: '2027-02-30' })).toThrow();
    expect(() =>
      calculatePrenatalPostnatal({ fechaProbableParto: '2027-03-15', numeroHijos: 0 }),
    ).toThrow();
  });
});

describe('Subsidio maternal (DFL 44, arts. 8, 16 y 17)', () => {
  const fechas = { fechaProbableParto: '2027-03-15' };
  const subsidio = { promedioReciente: 900_000, promedioHistorico: 600_000, ipcAcumulado: 5 };
  // Ley 21.830, art. 3: https://www.bcn.cl/leychile/navegar?idNorma=1225354
  const calendario = [{ vigente_desde: '2026-05-01', no_remuneracional: 356_815 }];

  // SUSESO, Dictamen 64773-2015: https://www-cloud.suseso.cl/612/w3-article-39153.html
  it('aplica la variación del IPC antes del incremento del 10% cuando manda el tope', () => {
    expect(calculatePrenatalPostnatal({ ...fechas, subsidio }, calendario).subsidio).toEqual({
      diarioInicial: 23_100,
      prenatal: 970_200,
      postnatal: 1_940_400,
      parental: 1_940_400,
      total: 4_851_000,
    });
  });

  // SUSESO, Dictamen 71654-2024: https://www-cloud.suseso.cl/612/w3-article-729675.html
  it('usa la base reciente cuando es menor y no redondea el diario antes de multiplicar', () => {
    const r = calculatePrenatalPostnatal(
      {
        fechaProbableParto: '2024-04-17', // Prenatal: 06-03-2024.
        subsidio: {
          promedioReciente: 6_536_315 / 3,
          promedioHistorico: 2_300_000, // Supuesto: el tope no limita el caso.
          ipcAcumulado: 0,
        },
      },
      [{ vigente_desde: '2024-01-01', no_remuneracional: 296_511 }],
    );
    expect(r.subsidio?.diarioInicial).toBe(72_626);
    expect(r.subsidio?.postnatal).toBe(6_100_561);
    expect(prenatalPostnatalToResults(r).find((row) => row.highlight)?.format).toBe('CLP');
  });

  // CT art. 197 bis y SUSESO, Dictamen 22123-2012:
  // https://www-cloud.suseso.cl/612/w3-article-37294.html
  it('estima el parental a media jornada por 126 días, sin sumar remuneración', () => {
    const r = calculatePrenatalPostnatal({ ...fechas, subsidio, mediaJornada: true }, calendario);
    expect(r.subsidio?.parental).toBe(1_455_300);
    expect(r.subsidio?.total).toBe(4_365_900);
  });

  it.each([0, 270_000])(
    'respeta el mínimo a media jornada con promedio histórico %i',
    (promedioHistorico) => {
      const r = calculatePrenatalPostnatal(
        {
          ...fechas,
          subsidio: { ...subsidio, promedioHistorico, ipcAcumulado: 0 },
          mediaJornada: true,
        },
        calendario,
      );
      expect(r.subsidio?.parental).toBe(749_312);
      if (promedioHistorico === 0) expect(r.subsidio?.prenatal).toBe(249_771);
    },
  );

  // SUSESO, Dictamen 2088-2022: https://www-cloud.suseso.cl/612/w3-article-681549.html
  it('aplica un mínimo nuevo solamente a los días desde su vigencia', () => {
    const r = calculatePrenatalPostnatal(
      {
        ...fechas,
        subsidio: { ...subsidio, promedioHistorico: 0 },
      },
      [...calendario, { vigente_desde: '2027-03-01', no_remuneracional: 360_000 }],
    );
    expect(r.subsidio?.diarioInicial).toBe(5_947);
    expect(r.subsidio?.prenatal).toBe(250_514); // 28 días con el piso anterior + 14 con el nuevo.
    expect(r.subsidio?.postnatal).toBe(504_000);
  });

  it('si el parto antecede al prenatal, toma el mes del parto como primera licencia', () => {
    const r = calculatePrenatalPostnatal(
      { ...fechas, fechaParto: '2027-01-20', subsidio },
      calendario,
    );
    expect(r.subsidio?.prenatal).toBe(0);
    expect(
      prenatalPostnatalToResults(r).find((row) => row.format === 'days')?.note?.text,
    ).toContain('07/2026 a 12/2026');
  });

  it('no aplica un piso moderno a fechas fuera del calendario', () => {
    const r = calculatePrenatalPostnatal({ fechaProbableParto: '2026-05-15', subsidio }, calendario);
    expect(r.subsidio).toBeUndefined();
    expect(r.avisoSubsidio).toContain('No contamos con el ingreso mínimo');
    expect(r.inicioPrenatal).toBe('2026-04-03');
  });

  it('conecta el formulario: fechas solas, pesos chilenos, IPC firmado y entradas incompletas', async () => {
    const calcular = (await loadCalculationFn('prenatal-postnatal'))!;
    expect(calcular(fechas).every((row) => row.format === 'days')).toBe(true);
    expect(
      calcular({
        ...fechas,
        promedioReciente: '900.000',
        promedioHistorico: '600.000',
        ipcAcumulado: '-2,5',
      })[0],
    ).toMatchObject({ format: 'CLP', value: 4_504_500 }); // 21.450 diarios × 210 días.
    expect(
      calcular({ ...fechas, promedioReciente: '900000', promedioHistorico: '0' })[0].format,
    ).toBe('CLP');
    const sinTope = calcular({ ...fechas, promedioReciente: '900000', ipcAcumulado: '0' });
    expect(sinTope.every((row) => row.format === 'days')).toBe(true);
    expect(sinTope[0].note?.text).toContain('promedio neto para el tope');
    const sinIpc = calcular({ ...fechas, promedioReciente: '900000', promedioHistorico: '600000' });
    expect(sinIpc.every((row) => row.format === 'days')).toBe(true);
    expect(sinIpc[0].note?.text).toContain('variación acumulada del IPC');
    expect(sinIpc[0].note?.text).toContain('promedio reciente, 08/2026 a 01/2027');
  });

  it('conserva la precisión de promedios con decimales en formato chileno', async () => {
    const calcular = (await loadCalculationFn('prenatal-postnatal'))!;
    const ingresos = { promedioReciente: '1.000.000,33', promedioHistorico: '2.000.000,33' };
    expect(calcular({ ...fechas, ...ingresos, ipcAcumulado: '0' })[0]).toMatchObject({
      format: 'CLP',
      value: 7_000_002,
    });
    expect(calcular({
      ...fechas,
      promedioReciente: '1000000.33',
      promedioHistorico: '2000000.33',
      ipcAcumulado: '0',
    })[0]).toMatchObject({ format: 'CLP', value: 7_000_002 });
    expect(
      calcular({ ...fechas, ...ingresos, promedioReciente: '1.00,33', ipcAcumulado: '0' })[0].format,
    ).toBe('days');
    const milesIncompletos = calcular({
      ...fechas, ...ingresos, promedioHistorico: '600.00', ipcAcumulado: '0',
    });
    expect(milesIncompletos[0]).toMatchObject({
      format: 'days',
      note: { text: expect.stringContaining('Usa coma para los decimales') },
    });
  });

  it('redondea hacia arriba un postnatal que termina exactamente en medio peso', () => {
    const r = calculatePrenatalPostnatal({
      ...fechas,
      prematuroOBajoPeso: true,
      subsidio: { ...subsidio, promedioReciente: 491_522.50 },
    }, calendario);
    expect(r.diasPostnatal).toBe(126);
    expect(r.subsidio?.postnatal).toBe(2_064_395);
  });
});
