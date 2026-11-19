import { describe, expect, it } from 'vitest';
import {
  calculateDiasAdministrativos,
  diasAdministrativosToResults,
} from '../dias-administrativos';
import { loadCalculationFn } from '../load-calculator';
import { getCalculatorBySlug } from '@/data/calculators';

const base = { diasCompletosUsados: 0, mediosDiasUsados: 0 };

describe('calculateDiasAdministrativos', () => {
  it('entrega el cupo completo sin uso ni solicitud', () => {
    expect(calculateDiasAdministrativos(base)).toEqual({
      diasUsados: 0,
      diasDisponibles: 6,
      advertencias: [],
    });
  });

  it('suma días completos y medios días sin redondear', () => {
    expect(
      calculateDiasAdministrativos({ diasCompletosUsados: 2, mediosDiasUsados: 3 }),
    ).toMatchObject({ diasUsados: 3.5, diasDisponibles: 2.5 });
  });

  it('agota exactamente el cupo con días completos o medios días', () => {
    for (const input of [
      { diasCompletosUsados: 6, mediosDiasUsados: 0 },
      { diasCompletosUsados: 0, mediosDiasUsados: 12 },
    ]) {
      expect(calculateDiasAdministrativos(input)).toMatchObject({
        diasUsados: 6,
        diasDisponibles: 0,
        advertencias: [],
      });
    }
  });

  it('advierte uso sobre el cupo, sin saldo negativo ni solicitud admisible', () => {
    const result = calculateDiasAdministrativos({
      diasCompletosUsados: 6,
      mediosDiasUsados: 1,
      diasSolicitados: 0.5,
    });
    expect(result).toMatchObject({
      diasUsados: 6.5,
      diasDisponibles: 0,
      solicitudCabe: false,
      diasRestantes: 0,
    });
    expect(result.advertencias).toHaveLength(1);
    expect(diasAdministrativosToResults(result)[0].note?.text).toContain('supera el cupo');
  });

  it.each([
    [0, true, 2.5],
    [0.5, true, 2],
    [2.5, true, 0],
    [3, false, 0],
    [6.5, false, 0],
  ])('evalúa solicitud de %s días', (diasSolicitados, solicitudCabe, diasRestantes) => {
    expect(
      calculateDiasAdministrativos({
        diasCompletosUsados: 2,
        mediosDiasUsados: 3,
        diasSolicitados,
      }),
    ).toMatchObject({ solicitudCabe, diasRestantes });
  });

  it.each([-1, 0.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1])(
    'rechaza uso inválido %s en ambos campos',
    (value) => {
      expect(() => calculateDiasAdministrativos({ ...base, diasCompletosUsados: value })).toThrow();
      expect(() => calculateDiasAdministrativos({ ...base, mediosDiasUsados: value })).toThrow();
    },
  );

  it('rechaza uso fuera de precisión entera segura', () => {
    expect(() =>
      calculateDiasAdministrativos({ ...base, diasCompletosUsados: Number.MAX_SAFE_INTEGER }),
    ).toThrow();
  });

  it.each([-0.5, 0.25, NaN, Infinity, Number.MAX_SAFE_INTEGER])(
    'rechaza solicitud inválida %s',
    (diasSolicitados) => {
      expect(() => calculateDiasAdministrativos({ ...base, diasSolicitados })).toThrow();
    },
  );

  it('adapta saldo sin solicitud y solicitud cubierta o no cubierta con fuentes', () => {
    const sinSolicitud = diasAdministrativosToResults(calculateDiasAdministrativos(base));
    expect(sinSolicitud).toHaveLength(2);
    expect(sinSolicitud[1]).toMatchObject({ value: 6, highlight: true, format: 'days' });
    expect(sinSolicitud[1].note?.source?.url).toContain('idNorma=236392');
    expect(sinSolicitud[1].note?.text).toContain('puede concederlo o denegarlo');
    for (const diasSolicitados of [0.5, 7]) {
      const rows = diasAdministrativosToResults(
        calculateDiasAdministrativos({ ...base, diasSolicitados }),
      );
      expect(rows).toHaveLength(4);
      expect(rows[2].label).toContain(diasSolicitados < 6 ? 'no implica autorización' : 'no cabe');
      expect(rows[3].value).toBe(diasSolicitados < 6 ? 5.5 : 0);
    }
  });

  it('conecta todos los inputs del catálogo y conserva la solicitud opcional', async () => {
    const calculator = getCalculatorBySlug('calculadora-dias-administrativos')!;
    expect(calculator.methodology).toBeDefined();
    expect(calculator.sources).toHaveLength(2);
    const calculate = (await loadCalculationFn(calculator.id))!;
    const defaults = Object.fromEntries(
      calculator.inputs.map((input) => [input.id, input.defaultValue]),
    );
    expect(calculate(defaults)).toHaveLength(2);
    expect(
      calculate({
        ...defaults,
        diasCompletosUsados: '2',
        mediosDiasUsados: '3',
        diasSolicitados: '2,5',
      }).map((r) => r.value),
    ).toEqual([3.5, 2.5, 2.5, 0]);
    expect(calculate({ ...defaults, diasSolicitados: '0' })).toHaveLength(4);
    expect(() => calculate({ ...defaults, diasCompletosUsados: 'inválido' })).toThrow();
    expect(() => calculate({ ...defaults, diasSolicitados: '0,25' })).toThrow();
    expect(() => calculate({})).toThrow();
  });
});
