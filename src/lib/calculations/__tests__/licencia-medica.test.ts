// ============================================
// Tests de Subsidio por Licencia Médica
// ----------------------------------------------
// Golden SUSESO/DT: monto diario = remuneración neta / 30 con
// mínimo diario = 50% del ingreso mínimo no remuneracional / 30
// (356.815 × 0,5 / 30 = 5.946,92). Licencias > 10 días se pagan
// desde el primer día; ≤ 10 días desde el cuarto día.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateLicenciaMedica } from '../licencia-medica';
import { INGRESO_MINIMO } from '@/lib/values/constants';

describe('calculateLicenciaMedica', () => {
  it('$900.000 netos, 15 días → paga desde el 1° día, total $450.000', () => {
    const r = calculateLicenciaMedica({
      remuneracionNetaPromedio: 900000,
      diasLicencia: 15,
    });
    expect(r.montoDiario).toBe(30000);
    expect(r.diasPagados).toBe(15);
    expect(r.pagaDesdePrimerDia).toBe(true);
    expect(r.totalSubsidio).toBe(450000);
  });

  it('$900.000 netos, 7 días → 4 días subsidiados, total $120.000', () => {
    const r = calculateLicenciaMedica({
      remuneracionNetaPromedio: 900000,
      diasLicencia: 7,
    });
    expect(r.diasPagados).toBe(4);
    expect(r.totalSubsidio).toBe(120000);
  });

  it('$900.000 netos, 3 días → sin días subsidiados', () => {
    const r = calculateLicenciaMedica({
      remuneracionNetaPromedio: 900000,
      diasLicencia: 3,
    });
    expect(r.diasPagados).toBe(0);
    expect(r.totalSubsidio).toBe(0);
  });

  it('$100.000 netos, 20 días → aplica el mínimo legal diario', () => {
    const r = calculateLicenciaMedica({
      remuneracionNetaPromedio: 100000,
      diasLicencia: 20,
    });
    const minDiario = (INGRESO_MINIMO.no_remuneracional * 0.5) / 30;
    expect(r.montoDiario).toBeCloseTo(minDiario, 6);
    expect(r.diasPagados).toBe(20);
    expect(r.totalSubsidio).toBe(Math.round(minDiario * 20));
    expect(r.totalSubsidio).toBe(118938);
  });

  it('exactamente 10 días sigue pagando desde el 4° día', () => {
    const r = calculateLicenciaMedica({
      remuneracionNetaPromedio: 900000,
      diasLicencia: 10,
    });
    expect(r.pagaDesdePrimerDia).toBe(false);
    expect(r.diasPagados).toBe(7);
  });
});
