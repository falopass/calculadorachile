// ============================================
// Tests de Feriado Progresivo
// ----------------------------------------------
// Golden art. 68 CT + DT 60194: 10 años base (cualquier
// empleador) + 1 día por cada 3 años nuevos con el
// empleador actual. Años anteriores cuentan hasta 10.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateFeriadoProgresivo } from '../feriado-progresivo';

describe('calculateFeriadoProgresivo', () => {
  it('10 años anteriores + 6 actuales → 2 días progresivos (17 totales)', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 6,
      aniosEmpleadoresAnteriores: 10,
    });
    expect(r.diasProgresivos).toBe(2);
    expect(r.feriadoAnualTotal).toBe(17);
    expect(r.aniosParaProximoDia).toBe(3);
  });

  it('0 años anteriores + 13 actuales → 1 día progresivo (13 - 10 = 3)', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 13,
      aniosEmpleadoresAnteriores: 0,
    });
    expect(r.diasProgresivos).toBe(1);
    expect(r.feriadoAnualTotal).toBe(16);
  });

  it('5 años anteriores + 8 actuales → 1 día (base se completa con 5 actuales)', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 8,
      aniosEmpleadoresAnteriores: 5,
    });
    expect(r.diasProgresivos).toBe(1);
    expect(r.aniosNuevosEmpleador).toBe(3);
  });

  it('años anteriores sobre 10 se truncan a 10 contables', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 3,
      aniosEmpleadoresAnteriores: 25,
    });
    expect(r.aniosAnterioresContables).toBe(10);
    expect(r.diasProgresivos).toBe(1);
  });

  it('no llega a los 10 años → 0 días progresivos', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 4,
      aniosEmpleadoresAnteriores: 3,
    });
    expect(r.diasProgresivos).toBe(0);
    expect(r.feriadoAnualTotal).toBe(15);
    // Faltan 3 para la base + 3 años nuevos = 6 para el primer día.
    expect(r.aniosParaProximoDia).toBe(6);
  });

  it('justo 10 años actuales, sin anteriores → 0 días (base apenas cumplida)', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 10,
      aniosEmpleadoresAnteriores: 0,
    });
    expect(r.diasProgresivos).toBe(0);
    expect(r.aniosParaProximoDia).toBe(3);
  });

  it('años fraccionados: 10 anteriores + 8,4 actuales → 2 días, faltan 0,6', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 8.4,
      aniosEmpleadoresAnteriores: 10,
    });
    expect(r.diasProgresivos).toBe(2);
    expect(r.aniosParaProximoDia).toBeCloseTo(0.6);
  });

  it('con sueldo $900.000 → valor día $30.000; 2 días = $60.000', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 6,
      aniosEmpleadoresAnteriores: 10,
      sueldoBruto: 900000,
    });
    expect(r.valorDiaFeriado).toBe(30000);
    expect(r.montoDiasProgresivos).toBe(60000);
  });

  it('tramo completo con decimales: 8,2 anteriores + 4,8 actuales → 1 día', () => {
    // Sin el redondeo a 1e-9 la resta da 2,9999… y floor entrega 0.
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 4.8,
      aniosEmpleadoresAnteriores: 8.2,
    });
    expect(r.diasProgresivos).toBe(1);
  });

  it('zona austral: base de 20 días en vez de 15', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 13,
      regionAustral: true,
    });
    expect(r.diasProgresivos).toBe(1);
    expect(r.feriadoAnualBase).toBe(20);
    expect(r.feriadoAnualTotal).toBe(21);
  });

  it('monto referencial conserva decimales hasta el total', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: 6,
      aniosEmpleadoresAnteriores: 10,
      sueldoBruto: 900010,
    });
    expect(r.montoDiasProgresivos).toBe(60001);
  });

  it('inputs negativos se tratan como 0', () => {
    const r = calculateFeriadoProgresivo({
      aniosEmpleadorActual: -5,
      aniosEmpleadoresAnteriores: -2,
    });
    expect(r.diasProgresivos).toBe(0);
    expect(r.aniosEmpleadorActual).toBe(0);
  });
});
