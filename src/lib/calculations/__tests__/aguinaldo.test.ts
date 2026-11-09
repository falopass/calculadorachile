import { describe, it, expect } from 'vitest';
import { calculateAguinaldo, aguinaldoToResults } from '../aguinaldo';
import { AGUINALDO_2026 } from '@/lib/values/constants';

describe('calculateAguinaldo', () => {
  it('12 meses FP 2026 pagan el monto base completo', () => {
    const r = calculateAguinaldo({
      tipo: 'fiestas_patrias',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    expect(r.montoBase).toBe(AGUINALDO_2026.fiestas_patrias);
    expect(r.montoProporcional).toBe(AGUINALDO_2026.fiestas_patrias);
    expect(r.esReferenciaNavidad2025).toBe(false);
    expect(r.advertencia).toBeUndefined();
  });

  it('Navidad usa referencia 2025 y advierte que 2026 SP no está publicada', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    expect(AGUINALDO_2026.navidad_es_referencia_2025).toBe(true);
    expect(r.montoBase).toBe(AGUINALDO_2026.navidad);
    expect(r.esReferenciaNavidad2025).toBe(true);
    expect(r.tipo).toContain('referencia 2025');
    expect(r.advertencia).toMatch(/referencia Navidad 2025/i);
    expect(r.advertencia).toMatch(/aún no publicada/i);
    expect(r.advertencia).not.toMatch(/Navidad 2026 del sector público es \$/);
  });

  it('6 meses Navidad pagan ~50% de la referencia 2025', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 800_000,
      mesesTrabajados: 6,
      esSectorPublico: true,
    });
    expect(r.montoProporcional).toBe(Math.round(AGUINALDO_2026.navidad * 0.5));
  });

  it('0 meses pagan $0', () => {
    const r = calculateAguinaldo({
      tipo: 'escolar',
      sueldoBruto: 600_000,
      mesesTrabajados: 0,
      esSectorPublico: true,
    });
    expect(r.montoProporcional).toBe(0);
  });

  it('escolar 2026 usa AGUINALDO_2026.escolar', () => {
    const r = calculateAguinaldo({
      tipo: 'escolar',
      sueldoBruto: 0,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    expect(r.montoBase).toBe(AGUINALDO_2026.escolar);
    expect(r.esReferenciaNavidad2025).toBe(false);
  });

  it('toResults etiqueta la base Navidad como referencia 2025', () => {
    const r = calculateAguinaldo({
      tipo: 'navidad',
      sueldoBruto: 0,
      mesesTrabajados: 12,
      esSectorPublico: true,
    });
    const rows = aguinaldoToResults(r);
    expect(rows.some((x) => /referencia Navidad 2025/i.test(x.label))).toBe(true);
  });

  it('sector privado incluye advertencia', () => {
    const r = calculateAguinaldo({
      tipo: 'fiestas_patrias',
      sueldoBruto: 800_000,
      mesesTrabajados: 12,
      esSectorPublico: false,
    });
    expect(r.advertencia).toMatch(/sector privado/i);
  });
});
