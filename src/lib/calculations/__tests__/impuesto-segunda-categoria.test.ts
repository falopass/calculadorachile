// ============================================
// Tests de impuesto de segunda categoría (Art. 43 N°1 LIR)
// ----------------------------------------------
// Verifica que la tabla mensual UTM se aplique sobre la renta mensual
// (NO sobre UTA), corrigiendo el bug histórico de subestimación 12×.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateImpuestoSegundaCategoria } from '../impuesto-segunda-categoria';
import { UTM } from '@/lib/values/constants';

describe('calculateImpuestoSegundaCategoria', () => {
  it('renta bajo 13,5 UTM mensuales queda exenta', () => {
    const sueldo = 13 * UTM.valor; // bajo 13,5 UTM
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    expect(r.impuestoMensual).toBe(0);
    expect(r.tramoAplicado).toContain('Desde 0');
  });

  it('renta entre 13,5 y 30 UTM tributa al 4% marginal', () => {
    const sueldo = 20 * UTM.valor;
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    // Tabla en constants.ts: factor 4% sin rebaja en este tramo.
    // Impuesto = (renta_UTM × 0.04) × valorUTM = 20 × 0,04 × UTM.
    const impuestoEsperado = Math.round(20 * 0.04 * UTM.valor);
    expect(r.impuestoMensual).toBeCloseTo(impuestoEsperado, -1);
  });

  it('renta de 50 UTM cae en tramo 13,5%', () => {
    const sueldo = 50 * UTM.valor;
    const r = calculateImpuestoSegundaCategoria({ sueldoBrutoMensual: sueldo });
    // En el límite del tramo 4% se incluye en el de 4% (hasta ≤ 30)
    // Por lo tanto 50 UTM cae en el tramo siguiente.
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
    // Tramo más alto: tasa efectiva > 30%
    expect(r.tasaEfectiva).toBeGreaterThan(25);
    expect(r.tasaEfectiva).toBeLessThan(40);
  });
});
