import { describe, expect, it } from 'vitest';
import { getNormativeTable } from '../CalculatorNormativeTable';
import { ASIGNACION_FAMILIAR_2026 } from '@/lib/values/constants';
import { formatCLP } from '@/lib/formatters';
import { calculateAsignacionFamiliar } from '@/lib/calculations/asignacion-familiar';

const UMBRALES_ANTERIORES = ['613.626', '896.264', '1.397.778', '613626', '896264', '1397778'];

describe('CalculatorNormativeTable: asignación familiar', () => {
  const table = getNormativeTable('asignacion-familiar');
  const rendered = JSON.stringify(table);
  const t = ASIGNACION_FAMILIAR_2026;

  it('existe la tabla 2026 y no interpola umbrales anteriores a la Ley 21.830', () => {
    expect(table).toBeDefined();
    expect(table?.title).toMatch(/2026/);
    for (const viejo of UMBRALES_ANTERIORES) {
      expect(rendered).not.toContain(viejo);
    }
  });

  it('montos y topes salen de ASIGNACION_FAMILIAR_2026, con el mismo formato del quick answer', () => {
    expect(table?.rows).toEqual([
      ['Tramo A', `hasta ${formatCLP(t.tramoA.ingresoMaximoCLP)}`, formatCLP(t.tramoA.montoPorCargaCLP)],
      ['Tramo B', `hasta ${formatCLP(t.tramoB.ingresoMaximoCLP)}`, formatCLP(t.tramoB.montoPorCargaCLP)],
      ['Tramo C', `hasta ${formatCLP(t.tramoC.ingresoMaximoCLP)}`, formatCLP(t.tramoC.montoPorCargaCLP)],
      ['Tramo D', `sobre ${formatCLP(t.tramoC.ingresoMaximoCLP)}`, formatCLP(0)],
    ]);
  });

  it('los cortes coinciden con la lógica de calculateAsignacionFamiliar', () => {
    const enTopeA = calculateAsignacionFamiliar({
      sueldoBruto: t.tramoA.ingresoMaximoCLP,
      numeroHijos: 1,
    });
    const sobreA = calculateAsignacionFamiliar({
      sueldoBruto: t.tramoA.ingresoMaximoCLP + 1,
      numeroHijos: 1,
    });
    const enTopeC = calculateAsignacionFamiliar({
      sueldoBruto: t.tramoC.ingresoMaximoCLP,
      numeroHijos: 1,
    });
    const sobreC = calculateAsignacionFamiliar({
      sueldoBruto: t.tramoC.ingresoMaximoCLP + 1,
      numeroHijos: 1,
    });
    expect(enTopeA.tramo).toBe('a');
    expect(enTopeA.montoPorHijo).toBe(t.tramoA.montoPorCargaCLP);
    expect(sobreA.tramo).toBe('b');
    expect(sobreA.montoPorHijo).toBe(t.tramoB.montoPorCargaCLP);
    expect(enTopeC.tramo).toBe('c');
    expect(enTopeC.montoPorHijo).toBe(t.tramoC.montoPorCargaCLP);
    expect(sobreC.tramo).toBe('d');
    expect(sobreC.montoPorHijo).toBe(0);
    expect(sobreC.tieneDerecho).toBe(false);
  });
});
