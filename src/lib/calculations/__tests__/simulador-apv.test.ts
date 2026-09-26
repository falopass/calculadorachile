// ============================================
// Tests del simulador APV (Régimen B, Art. 42 bis LIR)
// ----------------------------------------------
// Verifica VF de anualidad, tope 600 UF anual y aplicación de tasa
// marginal sobre el aporte deducible.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSimuladorAPV } from '../simulador-apv';
import { UF, UTM } from '@/lib/values/constants';

describe('calculateSimuladorAPV', () => {
  it('rentabilidad cero: ahorro = total aportado', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 1_500_000,
      montoMensualAPV: 100_000,
      rentabilidadAnual: 0,
      anosAhorro: 10,
    });
    expect(r.totalAportado).toBe(12_000_000);
    expect(r.ahorroAcumulado).toBe(12_000_000);
    expect(r.rendimientoGanado).toBe(0);
  });

  it('rentabilidad positiva genera rendimientos', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 1_500_000,
      montoMensualAPV: 100_000,
      rentabilidadAnual: 5,
      anosAhorro: 10,
    });
    expect(r.rendimientoGanado).toBeGreaterThan(0);
    expect(r.ahorroAcumulado).toBeGreaterThan(r.totalAportado);
  });

  it('aporte sobre 600 UF anual marca aportaTopeUF', () => {
    const aporteMensualSobreTope = (600 * UF.valor) / 12 + 50_000;
    const r = calculateSimuladorAPV({
      sueldoBruto: 5_000_000,
      montoMensualAPV: aporteMensualSobreTope,
      rentabilidadAnual: 4,
      anosAhorro: 5,
    });
    expect(r.aportaTopeUF).toBe(true);
  });

  it('aporte bajo 600 UF anual NO supera el tope', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 1_000_000,
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 5,
    });
    expect(r.aportaTopeUF).toBe(false);
  });

  it('tasa marginal 0% para renta anual de 13 UTA (exento)', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 13 * UTM.valor, // renta anual = 13 UTA < 13,5 UTA
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 10,
    });
    expect(r.tasaMarginal).toBe(0);
  });

  it('tasa marginal 4% para renta anual de 20 UTA', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 20 * UTM.valor, // renta anual = 20 UTA → tramo 13,5–30
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 10,
    });
    expect(r.tasaMarginal).toBe(4);
  });

  it('tasa marginal 30,4% para renta anual de 100 UTA', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 100 * UTM.valor, // renta anual = 100 UTA → tramo 90–120
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 10,
    });
    expect(r.tasaMarginal).toBe(30.4);
  });

  it('beneficio tributario crece con la tasa marginal', () => {
    const sueldoBajo = calculateSimuladorAPV({
      sueldoBruto: 800_000,
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 10,
    });
    const sueldoAlto = calculateSimuladorAPV({
      sueldoBruto: 5_000_000,
      montoMensualAPV: 50_000,
      rentabilidadAnual: 4,
      anosAhorro: 10,
    });
    expect(sueldoAlto.tasaMarginal).toBeGreaterThanOrEqual(sueldoBajo.tasaMarginal);
    expect(sueldoAlto.beneficioTributarioAnual).toBeGreaterThanOrEqual(
      sueldoBajo.beneficioTributarioAnual,
    );
  });

  it('beneficio total = anual × años', () => {
    const r = calculateSimuladorAPV({
      sueldoBruto: 2_000_000,
      montoMensualAPV: 80_000,
      rentabilidadAnual: 4,
      anosAhorro: 12,
    });
    expect(r.totalBeneficioTributario).toBe(r.beneficioTributarioAnual * 12);
  });
});
