import { describe, expect, it } from 'vitest';
import { calculateCostoTag } from '../costo-tag';

describe('calculateCostoTag', () => {
  it('multiplica la tarifa declarada por las pasadas del mes', () => {
    const result = calculateCostoTag({ tarifaPorPaso: 1_250, pasadasMes: 20 });
    expect(result.costoVariableMensual).toBe(25_000);
    expect(result.costoMensual).toBe(25_000);
  });

  it('suma cargos fijos y otros cargos separados', () => {
    const result = calculateCostoTag({
      tarifaPorPaso: 1_000,
      pasadasMes: 10,
      cargoFijoMensual: 700,
      otrosCargosMensuales: 2_300,
    });
    expect(result.costoMensual).toBe(13_000);
  });

  it('proyecta doce meses sin inventar descuentos o recargos', () => {
    const result = calculateCostoTag({ tarifaPorPaso: 2_000, pasadasMes: 8 });
    expect(result.costoAnual).toBe(result.costoMensual * 12);
  });

  it('normaliza entradas negativas a cero', () => {
    const result = calculateCostoTag({
      tarifaPorPaso: -1,
      pasadasMes: -4,
      cargoFijoMensual: -2,
    });
    expect(result.costoMensual).toBe(0);
  });
});
