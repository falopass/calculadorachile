// ============================================
// Tests de aguinaldo (sector público)
// ----------------------------------------------
// Verifica el prorrateo por meses trabajados, los montos por tipo
// y la advertencia para sector privado.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateAguinaldo } from '../aguinaldo';
import { AGUINALDO_2026 } from '@/lib/values/constants';

describe('calculateAguinaldo', () => {
  it('12 meses trabajados pagan el monto base completo', () => {
    const r = calculateAguinaldo({
      tipo: 'fiestas_patrias',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    expect(r.montoBase).toBe(AGUINALDO_2026.fiestas_patrias);
    expect(r.montoProporcional).toBe(AGUINALDO_2026.fiestas_patrias);
    expect(r.factorProporcional).toBe(1);
  });

  it('6 meses trabajados pagan ~50% del monto base', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 800_000,
      mesesTrabajados: 6,
      esSectorPublico: true,
    });
    expect(r.montoProporcional).toBe(Math.round(AGUINALDO_2026.navidad * 0.5));
  });

  it('0 meses trabajados pagan $0 (no se fuerza a 1 mes silenciosamente)', () => {
    const r = calculateAguinaldo({
      tipo: 'escolar',
      sueldoBruto: 600_000,
      mesesTrabajados: 0,
      esSectorPublico: true,
    });
    expect(r.montoProporcional).toBe(0);
    expect(r.factorProporcional).toBe(0);
  });

  it('meses negativos se acotan a 0', () => {
    const r = calculateAguinaldo({
      tipo: 'fiestas_patrias',
      sueldoBruto: 600_000,
      mesesTrabajados: -3,
    });
    expect(r.montoProporcional).toBe(0);
  });

  it('meses > 12 se topan a 12', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 600_000,
      mesesTrabajados: 18,
    });
    expect(r.factorProporcional).toBe(1);
    expect(r.montoProporcional).toBe(AGUINALDO_2026.navidad);
  });

  it('sector privado incluye advertencia (no es legalmente obligatorio)', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: false,
    });
    expect(r.advertencia).toBeDefined();
    expect(r.advertencia).toContain('sector privado');
  });

  it('sector público NO incluye advertencia', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    expect(r.advertencia).toBeUndefined();
  });

  it('cada tipo de aguinaldo retorna su nombre legible', () => {
    const fp = calculateAguinaldo({
      tipo: 'fiestas_patrias',
      sueldoBruto: 0,
      mesesTrabajados: 12,
    });
    const nv = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 0,
      mesesTrabajados: 12,
    });
    const ec = calculateAguinaldo({
      tipo: 'escolar',
      sueldoBruto: 0,
      mesesTrabajados: 12,
    });
    expect(fp.tipo).toBe('Fiestas Patrias');
    expect(nv.tipo).toBe('Navidad');
    expect(ec.tipo).toBe('Escolar');
  });
});
