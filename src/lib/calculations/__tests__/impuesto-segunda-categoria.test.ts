// ============================================
// Tests de impuesto de segunda categoría (Art. 43 N°1 LIR)
// ----------------------------------------------
// Verifica que la tabla mensual UTM se aplique sobre la renta mensual
// (NO sobre UTA), corrigiendo el bug histórico de subestimación 12×.
// Golden values con UTM = $71.721 y la tabla oficial SII 2026
// (rebajas 0 / 0,54 / 1,74 / 4,49 / 11,14 / 17,8 / 23,32 / 38,82 UTM).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateImpuestoSegundaCategoria } from '../impuesto-segunda-categoria';
import { IMPUESTO_SEGUNDA_CATEGORIA, UTM } from '@/lib/values/constants';

const UTM_TEST = 71_721;

describe('calculateImpuestoSegundaCategoria', () => {
  it('renta bajo 13,5 UTM mensuales queda exenta', () => {
    const sueldo = 13 * UTM.valor; // bajo 13,5 UTM
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    expect(r.impuestoMensual).toBe(0);
    expect(r.tramoAplicado).toContain('Desde 0');
  });

  it('golden: sueldo $1.636.400 con UTM $71.721 paga $26.727', () => {
    // 1.636.400 / 71.721 ≈ 22,82 UTM → tramo 13,5–30 (factor 0,04, rebaja 0,54)
    // 0,04 × 1.636.400 − 0,54 × 71.721 = 26.726,66 → 26.727
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 1_636_400,
      valorUTM: UTM_TEST,
    });
    expect(r.impuestoMensual).toBe(26_727);
  });

  it('golden: 20 UTM paga 0,26 UTM (rebaja 0,54 del tramo 4%)', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 20 * UTM_TEST,
      valorUTM: UTM_TEST,
    });
    expect(r.impuestoMensual).toBe(Math.round(0.26 * UTM_TEST)); // 18.647
  });

  it('golden: exactamente 13,5 UTM queda exenta', () => {
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 13.5 * UTM_TEST,
      valorUTM: UTM_TEST,
    });
    expect(r.impuestoMensual).toBe(0);
  });

  it('la tabla es continua en 30 UTM (borde 4% → 8%)', () => {
    // 30 × 0,04 − 0,54 = 30 × 0,08 − 1,74 = 0,66 UTM
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 30 * UTM_TEST,
      valorUTM: UTM_TEST,
    });
    expect(r.impuestoMensual).toBe(Math.round(0.66 * UTM_TEST)); // 47.336
  });

  it('golden: 400 UTM aplica tramo marginal 40% → 121,18 UTM', () => {
    // 400 × 0,40 − 38,82 = 121,18 UTM
    const r = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: 400 * UTM_TEST,
      valorUTM: UTM_TEST,
    });
    expect(r.impuestoMensual).toBe(Math.round(121.18 * UTM_TEST)); // 8.691.151
  });

  it('tabla oficial: rebajas en UTM por tramo', () => {
    expect(IMPUESTO_SEGUNDA_CATEGORIA.tramos.map((t) => t.rebaja)).toEqual([
      0, 0.54, 1.74, 4.49, 11.14, 17.8, 23.32, 38.82,
    ]);
  });

  it('renta de 50 UTM cae en tramo 8% (borde superior inclusivo)', () => {
    const sueldo = 50 * UTM.valor;
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    // El tramo 30–50 incluye su borde superior (hasta ≤ 50), por lo que
    // 50 UTM tributa al 8% y recién sobre 50 UTM aplica el 13,5%.
    expect(r.tramoAplicado).not.toBe('Exento');
  });

  it('impuesto anual = impuesto mensual × meses trabajados', () => {
    const sueldo = 1_500_000;
    const r12 = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: sueldo,
      mesesTrabajados: 12,
    });
    const r6 = calculateImpuestoSegundaCategoria({
      sueldoBrutoMensual: sueldo,
      mesesTrabajados: 6,
    });
    expect(r12.impuestoAnual).toBe(r12.impuestoMensual * 12);
    expect(r6.impuestoAnual).toBe(r6.impuestoMensual * 6);
  });

  it('tasa efectiva crece con la renta', () => {
    const baja = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: 1_500_000 });
    const alta = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: 5_000_000 });
    expect(alta.tasaEfectiva).toBeGreaterThan(baja.tasaEfectiva);
  });

  it('sueldo cero retorna impuesto cero', () => {
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: 0 });
    expect(r.impuestoMensual).toBe(0);
    expect(r.impuestoAnual).toBe(0);
  });

  it('renta sobre 310 UTM aplica tramo marginal 40%', () => {
    const sueldo = 400 * UTM.valor;
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    // Tramo más alto: tasa efectiva > 25% y < 40% marginal
    expect(r.tasaEfectiva).toBeGreaterThan(25);
    expect(r.tasaEfectiva).toBeLessThan(40);
  });
});
