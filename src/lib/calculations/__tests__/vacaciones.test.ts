// ============================================
// Tests de vacaciones (Art. 67-68 CdT)
// ----------------------------------------------
// Verifica 1,25 día por mes, días progresivos a partir del año 13
// (10 + 3) y tope 5 días progresivos.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateVacaciones } from '../vacaciones';

describe('calculateVacaciones', () => {
  it('12 meses trabajados → 15 días proporcionales', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 12 });
    expect(r.diasProporcionales).toBe(15);
    expect(r.valorDia).toBe(20_000);
    expect(r.totalVacaciones).toBe(300_000);
  });

  it('6 meses → 7,5 días proporcionales', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 6 });
    expect(r.diasProporcionales).toBe(7.5);
  });

  it('antes de 10 años no hay días progresivos', () => {
    const r = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 12,
      añosTrabajados: 9,
    });
    expect(r.diasProgresivos).toBe(0);
  });

  it('a los 13 años aparece 1 día progresivo', () => {
    const r = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 12,
      añosTrabajados: 13,
    });
    expect(r.diasProgresivos).toBe(1);
  });

  it('a los 25 años se topea en 5 días progresivos', () => {
    const r = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 12,
      añosTrabajados: 30,
    });
    expect(r.diasProgresivos).toBe(5);
  });

  it('días pendientes suman al total', () => {
    const r = calculateVacaciones({
      sueldoBruto: 600_000,
      mesesTrabajados: 12,
      diasVacacionesPendientes: 5,
    });
    expect(r.diasPendientes).toBe(5);
    expect(r.diasTotales).toBe(20);
  });

  it('total = (días totales) × (sueldo/30)', () => {
    const r = calculateVacaciones({
      sueldoBruto: 900_000,
      mesesTrabajados: 8,
    });
    // 1.25 × 8 = 10 días, valorDía = 30.000, total = 300.000
    expect(r.totalVacaciones).toBe(300_000);
  });

  it('meses cero retorna vacaciones cero', () => {
    const r = calculateVacaciones({ sueldoBruto: 600_000, mesesTrabajados: 0 });
    expect(r.totalVacaciones).toBe(0);
    expect(r.diasProporcionales).toBe(0);
  });
});
