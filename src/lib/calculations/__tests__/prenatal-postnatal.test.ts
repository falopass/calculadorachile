import { describe, expect, it } from 'vitest';
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
