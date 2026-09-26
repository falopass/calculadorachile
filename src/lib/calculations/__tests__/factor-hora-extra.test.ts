// ============================================
// Tests de Factor de Hora Extra
// ----------------------------------------------
// Golden DT ficha 95182: hora ordinaria = sueldo/30 × 28 /
// (4 × jornada); hora extra = ×1,5. Con 42 h el factor es
// 0,0083333 (sueldo × 0,0083333 = valor hora extra).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateFactorHoraExtra } from '../factor-hora-extra';

describe('calculateFactorHoraExtra', () => {
  it('jornada 42 h → factor 0,0083333', () => {
    const r = calculateFactorHoraExtra({ sueldoBase: 1000000 });
    expect(r.jornadaSemanal).toBe(42);
    expect(r.factor).toBe(0.0083333);
  });

  it('jornada 44 h → factor 0,0079545', () => {
    const r = calculateFactorHoraExtra({
      sueldoBase: 1000000,
      jornadaSemanal: 44,
    });
    expect(r.factor).toBe(0.0079545);
  });

  it('jornada 40 h → factor 0,00875', () => {
    const r = calculateFactorHoraExtra({
      sueldoBase: 1000000,
      jornadaSemanal: 40,
    });
    expect(r.factor).toBe(0.00875);
  });

  it('sueldo $1.000.000, 42 h, 10 horas extra → hora extra $8.333, total $83.333', () => {
    const r = calculateFactorHoraExtra({
      sueldoBase: 1000000,
      jornadaSemanal: 42,
      horasExtra: 10,
    });
    expect(r.valorHoraOrdinaria).toBe(5556); // round(5555,55)
    expect(r.valorHoraExtra).toBe(8333);
    expect(r.totalHorasExtra).toBe(83333);
  });

  it('sin horas extra → total 0 pero factor y valores se muestran', () => {
    const r = calculateFactorHoraExtra({ sueldoBase: 900000 });
    expect(r.totalHorasExtra).toBe(0);
    expect(r.valorHoraExtra).toBeGreaterThan(0);
  });
});
