import { describe, expect, it } from 'vitest';
import {
  calculateSemanaCorrida,
  contarFestivosSemana,
  semanaCorridaToResults,
  DT_SEMANA_CORRIDA_URL,
} from '../semana-corrida';

describe('calculateSemanaCorrida', () => {
  it('golden: $100.000 en 5 días con 1 domingo → semana corrida $20.000', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 100_000,
      diasDebioTrabajar: 5,
      domingosYFestivos: 1,
    });
    expect(r.promedioDiario).toBe(20_000);
    expect(r.semanaCorrida).toBe(20_000);
    expect(r.totalVariableConCorrida).toBe(120_000);
  });

  it('golden: semana con festivo, $80.000 en 4 días con 1 domingo y 1 festivo → $40.000', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 80_000,
      diasDebioTrabajar: 4,
      domingosYFestivos: 2,
    });
    expect(r.promedioDiario).toBe(20_000);
    expect(r.semanaCorrida).toBe(40_000);
    expect(r.totalVariableConCorrida).toBe(120_000);
  });

  it('jornada de 6 días: $120.000 en 6 días con 1 domingo → $20.000', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 120_000,
      diasDebioTrabajar: 6,
      domingosYFestivos: 1,
    });
    expect(r.promedioDiario).toBe(20_000);
    expect(r.semanaCorrida).toBe(20_000);
  });

  it('aplica los defaults: 5 días y 1 domingo', () => {
    const r = calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000 });
    expect(r.diasDebioTrabajar).toBe(5);
    expect(r.domingosYFestivos).toBe(1);
    expect(r.semanaCorrida).toBe(20_000);
  });

  it('sin variable la semana corrida es $0', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 0,
      diasDebioTrabajar: 5,
      domingosYFestivos: 2,
    });
    expect(r.semanaCorrida).toBe(0);
    expect(r.totalVariableConCorrida).toBe(0);
  });

  it('redondea al peso cuando el promedio no es entero', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 100_000,
      diasDebioTrabajar: 6,
      domingosYFestivos: 1,
    });
    // 100.000 / 6 = 16.666,67 → $16.667
    expect(r.semanaCorrida).toBe(16_667);
  });

  it('con semanasMes: 4 estima el total del mes multiplicando semanas iguales', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 100_000,
      diasDebioTrabajar: 5,
      domingosYFestivos: 1,
      semanasMes: 4,
    });
    expect(r.semanaCorridaMensualEstimada).toBe(80_000);
    expect(r.variableMensualEstimada).toBe(400_000);
    expect(r.totalVariableMensualEstimado).toBe(480_000);
  });

  it('el sueldo base solo se informa: no entra al promedio ni a la semana corrida', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 100_000,
      diasDebioTrabajar: 5,
      domingosYFestivos: 1,
      sueldoBaseSemanalOpcional: 200_000,
    });
    expect(r.semanaCorrida).toBe(20_000);
    expect(r.sueldoBaseSemanal).toBe(200_000);
    expect(r.totalSemanalEstimado).toBe(320_000);
  });

  it('rechaza días fuera del rango 1–6', () => {
    expect(() =>
      calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000, diasDebioTrabajar: 0 }),
    ).toThrow();
    expect(() =>
      calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000, diasDebioTrabajar: 7 }),
    ).toThrow();
  });

  it('rechaza montos negativos', () => {
    expect(() =>
      calculateSemanaCorrida({ remuneracionVariableSemanal: -50_000, diasDebioTrabajar: 5 }),
    ).toThrow();
    expect(() =>
      calculateSemanaCorrida({
        remuneracionVariableSemanal: 100_000,
        diasDebioTrabajar: 5,
        domingosYFestivos: -1,
      }),
    ).toThrow();
  });

  it('rechaza semanasMes fuera del rango 1–5', () => {
    expect(() =>
      calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000, semanasMes: 6 }),
    ).toThrow();
  });
});

describe('contarFestivosSemana', () => {
  it('semana de Fiestas Patrias 2026 (lun 14-09): cuenta 18 y 19 → 2', () => {
    expect(contarFestivosSemana('2026-09-14')).toBe(2);
  });

  it('semana del 1 de mayo 2026 (lun 27-04): cuenta vie 01-05 → 1', () => {
    expect(contarFestivosSemana('2026-04-27')).toBe(1);
  });

  it('semana sin feriados → 0', () => {
    expect(contarFestivosSemana('2026-02-02')).toBe(0);
  });

  it('no duplica un feriado que cae domingo (01-11-2026 es domingo y feriado)', () => {
    // Semana lun 26-10 al dom 01-11: feriados sáb 31-10 y dom 01-11.
    // El domingo no se cuenta: solo el sábado 31 → 1.
    expect(contarFestivosSemana('2026-10-26')).toBe(1);
  });

  it('fecha inválida o ausente → 0', () => {
    expect(contarFestivosSemana()).toBe(0);
    expect(contarFestivosSemana('14-09-2026')).toBe(0);
    expect(contarFestivosSemana('')).toBe(0);
  });
});

describe('semanaCorridaToResults', () => {
  it('destaca la semana corrida con fuente de la DT', () => {
    const r = calculateSemanaCorrida({
      remuneracionVariableSemanal: 100_000,
      diasDebioTrabajar: 5,
      domingosYFestivos: 1,
    });
    const rows = semanaCorridaToResults(r);
    expect(rows[0].label).toBe('Semana corrida');
    expect(rows[0].value).toBe(20_000);
    expect(rows[0].highlight).toBe(true);
    expect(rows[0].note?.source?.url).toBe(DT_SEMANA_CORRIDA_URL);
  });

  it('agrega filas mensuales solo cuando semanasMes > 1', () => {
    const semanal = semanaCorridaToResults(
      calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000 }),
    );
    expect(semanal.some((r) => r.label.includes('semanas'))).toBe(false);

    const mensual = semanaCorridaToResults(
      calculateSemanaCorrida({ remuneracionVariableSemanal: 100_000, semanasMes: 4 }),
    );
    expect(mensual.some((r) => r.label === 'Semana corrida estimada en 4 semanas')).toBe(true);
  });
});
