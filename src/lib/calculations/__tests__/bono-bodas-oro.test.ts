// ============================================
// Tests de Bono Bodas de Oro (Ley 20.506)
// ----------------------------------------------
// Verifica los 3 requisitos legales (50 años de matrimonio, 80% más
// vulnerable RSH, ambos cónyuges vivos), el alias legacy y los
// motivos descriptivos cuando no aplica.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBonoBodasOro } from '../bono-bodas-oro';
import { BONO_BODAS_ORO } from '@/lib/values/constants';

describe('calculateBonoBodasOro', () => {
  it('cumple los 3 requisitos: paga monto completo', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: 50,
      perteneceAl80Vulnerable: true,
      ambosConyugesVivos: true,
    });
    expect(r.aplica).toBe(true);
    expect(r.montoPorConyuge).toBe(BONO_BODAS_ORO.montoPorConyugeCLP);
    expect(r.montoTotal).toBe(BONO_BODAS_ORO.montoTotalCLP);
    expect(r.motivosNoAplica).toEqual([]);
  });

  it('menos de 50 años: no aplica y reporta motivo', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: 30,
      perteneceAl80Vulnerable: true,
      ambosConyugesVivos: true,
    });
    expect(r.aplica).toBe(false);
    expect(r.cumpleAnos).toBe(false);
    expect(r.montoTotal).toBe(0);
    expect(r.motivosNoAplica.some((m) => m.includes('50'))).toBe(true);
  });

  it('no pertenece al 80% más vulnerable: no aplica', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: 55,
      perteneceAl80Vulnerable: false,
      ambosConyugesVivos: true,
    });
    expect(r.aplica).toBe(false);
    expect(r.cumpleVulnerabilidad).toBe(false);
    expect(r.montoTotal).toBe(0);
  });

  it('un cónyuge fallecido: no aplica', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: 55,
      perteneceAl80Vulnerable: true,
      ambosConyugesVivos: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.cumpleConyugesVivos).toBe(false);
    expect(r.montoTotal).toBe(0);
  });

  it('alias legacy `anosTrabajados` se interpreta como años de matrimonio', () => {
    const r = calculateBonoBodasOro({
      anosTrabajados: 50,
      perteneceAl80Vulnerable: true,
      ambosConyugesVivos: true,
    });
    expect(r.anosMatrimonio).toBe(50);
    expect(r.aplica).toBe(true);
  });

  it('múltiples requisitos no cumplidos: lista todos los motivos', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: 20,
      perteneceAl80Vulnerable: false,
      ambosConyugesVivos: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.length).toBeGreaterThanOrEqual(3);
  });

  it('valor negativo de años se acota a 0', () => {
    const r = calculateBonoBodasOro({
      anosMatrimonio: -5,
      perteneceAl80Vulnerable: true,
      ambosConyugesVivos: true,
    });
    expect(r.anosMatrimonio).toBe(0);
    expect(r.aplica).toBe(false);
  });
});
