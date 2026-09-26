// ============================================
// Tests de Subsidio Unificado de Empleo (Ley 21.808)
// ----------------------------------------------
// Golden con IMM del subsidio $529.000 (art. 4 N°3), PV primer
// año 10% trabajador / 20% empresa, tramos 1,25 y 2,25 IMM, piso
// trabajador 2,5% IMM ($13.225). Vigente desde 01-10-2026.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioUnificadoEmpleo } from '../subsidio-unificado-empleo';

const baseInput = {
  grupoPrioritario: 'joven-18-24' as const,
  desempleoPrevio: true,
  rsh40: true,
};

describe('calculateSubsidioUnificadoEmpleo — montos', () => {
  it('RB $500.000 (≤ 1,25 IMM) → trabajador $50.000 / empresa $100.000', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 500000,
    });
    expect(r.aporteTrabajador).toBe(50000);
    expect(r.aporteEmpresa).toBe(100000);
  });

  it('RB $600.000 → trabajador $52.900 (tope 1 IMM) / empresa $120.000', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 600000,
    });
    expect(r.aporteTrabajador).toBe(52900);
    expect(r.aporteEmpresa).toBe(120000);
  });

  it('RB $900.000 (tramo decreciente) → trabajador $29.025 / empresa $72.563', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 900000,
    });
    expect(r.aporteTrabajador).toBe(29025);
    expect(r.aporteEmpresa).toBe(72563);
  });

  it('RB $1.150.000 → piso trabajador $13.225 / empresa $10.063', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 1150000,
    });
    // fórmula da 4.025, el piso lo sube a 13.225
    expect(r.aporteTrabajador).toBe(13225);
    expect(r.aporteEmpresa).toBe(10063);
  });

  it('RB $1.200.000 (> 2,25 IMM) → sin subsidio', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 1200000,
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.aporteTrabajador).toBe(0);
    expect(r.aporteEmpresa).toBe(0);
  });
});

describe('calculateSubsidioUnificadoEmpleo — requisitos', () => {
  it('persona con discapacidad: 15 meses y no exige RSH 40%', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      rentaBruta: 500000,
      grupoPrioritario: 'discapacidad',
      desempleoPrevio: true,
      rsh40: false,
    });
    expect(r.cumpleRequisitos).toBe(true);
    expect(r.duracionMeses).toBe(15);
    expect(r.totalEstimadoTrabajador).toBe(50000 * 15);
  });

  it('grupo ninguno → no aplica', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      grupoPrioritario: 'ninguno',
      rentaBruta: 500000,
    });
    expect(r.cumpleRequisitos).toBe(false);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('sin desempleo previo → no aplica', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      desempleoPrevio: false,
      rentaBruta: 500000,
    });
    expect(r.cumpleRequisitos).toBe(false);
  });

  it('sin RSH 40% (no PcD) → no aplica', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rsh40: false,
      rentaBruta: 500000,
    });
    expect(r.cumpleRequisitos).toBe(false);
  });

  it('pago provisional es el 90% y dura 12 meses por defecto', () => {
    const r = calculateSubsidioUnificadoEmpleo({
      ...baseInput,
      rentaBruta: 500000,
    });
    expect(r.duracionMeses).toBe(12);
    expect(r.pagoProvisionalMensual).toBe(45000);
    expect(r.totalEstimadoTrabajador).toBe(600000);
  });
});
