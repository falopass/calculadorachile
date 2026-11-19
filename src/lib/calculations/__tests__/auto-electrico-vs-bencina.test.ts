import { describe, expect, it } from 'vitest';
import {
  calculateAutoElectricoVsBencina,
  autoElectricoVsBencinaToResults,
} from '../auto-electrico-vs-bencina';
import { loadCalculationFn } from '../load-calculator';

const input = {
  kmMensuales: 1000,
  rendimientoKmL: 10,
  precioBencina: 1200,
  consumoKwh100km: 20,
  precioKwh: 200,
};

describe('calculateAutoElectricoVsBencina', () => {
  it('golden ilustrativo: 120 y 40 pesos/km; ahorro mensual 80.000', () => {
    expect(calculateAutoElectricoVsBencina(input)).toEqual({
      costoKmBencina: 120,
      costoKmElectrico: 40,
      costoMensualBencina: 120000,
      costoMensualElectrico: 40000,
      ahorroMensual: 80000,
      ahorroAnual: 960000,
      porcentajeAhorro: 66.7,
    });
  });

  it('conserva diferencias negativas: eléctrico más caro', () => {
    const result = calculateAutoElectricoVsBencina({ ...input, precioKwh: 800 });
    expect(result.ahorroMensual).toBe(-40000);
    expect(result.ahorroAnual).toBe(-480000);
    expect(result.porcentajeAhorro).toBe(-33.3);
    const rows = autoElectricoVsBencinaToResults(result);
    expect(rows[0]).toMatchObject({
      highlight: true,
      value: -40000,
      label: 'Diferencia mensual (bencina − eléctrico)',
    });
    expect(rows[0].note?.text).toContain('Negativa');
  });

  it('redondea solo al final, incluso por km y al anualizar', () => {
    const result = calculateAutoElectricoVsBencina({
      kmMensuales: 3,
      rendimientoKmL: 3,
      precioBencina: 100,
      consumoKwh100km: 1,
      precioKwh: 10,
    });
    expect(result.costoKmBencina).toBe(33);
    expect(result.costoKmElectrico).toBe(0);
    expect(result.costoMensualBencina).toBe(100);
    expect(result.ahorroMensual).toBe(100);
    expect(result.ahorroAnual).toBe(1196);
    expect(result.porcentajeAhorro).toBe(99.7);
  });

  it('sin recorrido no hay gasto ni ahorro; el costo unitario sigue disponible', () => {
    expect(calculateAutoElectricoVsBencina({ ...input, kmMensuales: 0 })).toEqual({
      costoKmBencina: 120,
      costoKmElectrico: 40,
      costoMensualBencina: 0,
      costoMensualElectrico: 0,
      ahorroMensual: 0,
      ahorroAnual: 0,
      porcentajeAhorro: 0,
    });
  });

  it.each([0, -10])(
    'rendimiento %s no divide por cero ni elimina el costo eléctrico',
    (rendimientoKmL) => {
      const result = calculateAutoElectricoVsBencina({ ...input, rendimientoKmL });
      expect(result.costoKmBencina).toBe(0);
      expect(result.ahorroMensual).toBe(-40000);
      expect(result.porcentajeAhorro).toBe(0);
    },
  );

  it.each([0, -1])('valores %s se tratan como cero', (value) => {
    const result = calculateAutoElectricoVsBencina({
      kmMensuales: value,
      rendimientoKmL: value,
      precioBencina: value,
      consumoKwh100km: value,
      precioKwh: value,
    });
    expect(Object.values(result)).toEqual([0, 0, 0, 0, 0, 0, 0]);
  });

  it('costos iguales no producen ahorro', () => {
    expect(calculateAutoElectricoVsBencina({ ...input, precioKwh: 600 }).ahorroMensual).toBe(0);
  });

  it('conecta todos los inputs y admite entradas vacías', async () => {
    const calculate = (await loadCalculationFn('auto-electrico-vs-bencina'))!;
    expect(calculate(input)).toEqual(
      autoElectricoVsBencinaToResults(calculateAutoElectricoVsBencina(input)),
    );
    expect(calculate({}).every((row) => row.value === 0)).toBe(true);
    for (const key of Object.keys(input) as (keyof typeof input)[]) {
      expect(calculate({ ...input, [key]: input[key] * 2 })).not.toEqual(calculate(input));
    }
  });
});
