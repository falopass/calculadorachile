// ============================================
// Tests de costo-empleado (PYME)
// ----------------------------------------------
// Verifica que NO se duplique el 10% AFP ni el 7% salud como aporte
// del empleador (D.L. 3500 Art. 17, Ley 20.255). El empleador solo
// aporta SIS, seguro de cesantía y mutual de seguridad.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCostoEmpleado } from '../costo-empleado';
import { AFP, MUTUAL, SEGURO_CESANTIA } from '@/lib/values/constants';

const baseInput = {
  sueldoBruto: 1_000_000,
  afp: 'habitat' as keyof typeof AFP,
  saludTipo: 'fonasa' as const,
  contratoIndefinido: true,
  gratificacionIncluida: false,
  horasExtra: 0,
  montoHorasExtra: 0,
};

describe('calculateCostoEmpleado', () => {
  it('aportes del empleador NO incluyen 10% AFP ni 7% salud', () => {
    const r = calculateCostoEmpleado(baseInput);
    // Aportes empleador esperados sobre $1M: SIS 1,15% + cesantía 2,4% + mutual 0,95%
    const esperado =
      1_000_000 *
      ((AFP.habitat.sis +
        SEGURO_CESANTIA.contrato_indefinido.empleador +
        MUTUAL.total_referencial) /
        100);
    const totalAportes =
      r.aportesEmpleador.sis +
      r.aportesEmpleador.seguroCesantia +
      r.aportesEmpleador.mutual;
    expect(totalAportes).toBeCloseTo(esperado, 0);
    // El costo total NO debe incluir AFP/salud del trabajador.
    expect(r.costoTotalMensual).toBe(1_000_000 + totalAportes);
  });

  it('descuenta correctamente AFP (10% + comisión) y salud 7% al trabajador', () => {
    const r = calculateCostoEmpleado(baseInput);
    expect(r.descuentosLegales.afp).toBe(
      Math.round(1_000_000 * ((10 + AFP.habitat.comision) / 100)),
    );
    expect(r.descuentosLegales.salud).toBe(70_000);
    expect(r.descuentosLegales.seguroCesantia).toBe(6_000);
  });

  it('contrato a plazo fijo: trabajador no aporta cesantía, empleador aporta 3%', () => {
    const r = calculateCostoEmpleado({ ...baseInput, contratoIndefinido: false });
    expect(r.descuentosLegales.seguroCesantia).toBe(0);
    expect(r.aportesEmpleador.seguroCesantia).toBe(30_000);
  });

  it('gratificación incluida agrega 25% al total de haberes', () => {
    const r = calculateCostoEmpleado({ ...baseInput, gratificacionIncluida: true });
    expect(r.gratificacion).toBe(250_000);
    expect(r.totalHaberes).toBe(1_250_000);
  });

  it('horas extra suman al costo total mensual', () => {
    const r = calculateCostoEmpleado({
      ...baseInput,
      horasExtra: 10,
      montoHorasExtra: 8_000,
    });
    // El bloque mensual = haberes + aportes + horasExtra
    expect(r.costoTotalMensual).toBeGreaterThan(1_000_000 + 80_000);
  });

  it('factor previsional ronda 1.04-1.06 para sueldo bajo el tope', () => {
    const r = calculateCostoEmpleado(baseInput);
    expect(r.factorPrevisional).toBeGreaterThan(1.03);
    expect(r.factorPrevisional).toBeLessThan(1.07);
  });
});
