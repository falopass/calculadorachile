// ============================================
// Tests de costo notaría (DFL 292/1931 + DL 3475)
// ----------------------------------------------
// Verifica las tasas progresivas de compraventa, los mínimos por
// tipo, la exención de timbres en compraventa y el cobro de
// timbres en hipoteca.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCostoNotaria } from '../costo-notaria';
import { ARANCEL_NOTARIOS, UTM } from '@/lib/values/constants';

describe('calculateCostoNotaria', () => {
  describe('compraventa de inmuebles', () => {
    it('aplica la tasa progresiva 0,5% en el primer tramo', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 100_000_000,
        tipo: 'compraventa',
      });
      // 0,5% × 100M = 500.000 (sobre el mínimo, no se acota)
      expect(r.costoNotarial).toBe(500_000);
    });

    it('está EXENTA del impuesto de timbres', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 200_000_000,
        tipo: 'compraventa',
      });
      expect(r.impuestoTimbres).toBe(0);
    });

    it('respeta el costo mínimo notarial', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 1_000_000,
        tipo: 'compraventa',
      });
      expect(r.costoNotarial).toBe(ARANCEL_NOTARIOS.costo_minimo_clp);
    });

    it('respeta el costo máximo notarial', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 10_000_000_000, // valor exorbitante
        tipo: 'compraventa',
      });
      expect(r.costoNotarial).toBe(ARANCEL_NOTARIOS.costo_maximo_clp);
    });
  });

  describe('hipoteca', () => {
    it('aplica el impuesto de timbres 0,8% (DL 3475)', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 100_000_000,
        tipo: 'hipoteca',
      });
      // 0,8% × 100M = 800.000
      expect(r.impuestoTimbres).toBe(800_000);
    });

    it('respeta el mínimo de hipoteca', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 1_000_000,
        tipo: 'hipoteca',
      });
      expect(r.costoNotarial).toBe(ARANCEL_NOTARIOS.hipoteca_minimo_clp);
    });
  });

  describe('donación', () => {
    it('cobra 0,4% notarial sin impuesto de timbres', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 100_000_000,
        tipo: 'donacion',
      });
      expect(r.costoNotarial).toBe(400_000);
      expect(r.impuestoTimbres).toBe(0);
    });
  });

  describe('testamento', () => {
    it('cobra tarifa fija de 2 UTM', () => {
      const r = calculateCostoNotaria({
        valorPropiedad: 0,
        tipo: 'testamento',
      });
      expect(r.costoNotarial).toBe(Math.round(2 * UTM.valor));
      expect(r.impuestoTimbres).toBe(0);
    });
  });

  it('derechos registrales tienen un piso mínimo', () => {
    const r = calculateCostoNotaria({
      valorPropiedad: 1_000_000,
      tipo: 'compraventa',
    });
    expect(r.derechosRegistrales).toBe(
      ARANCEL_NOTARIOS.derechos_registrales_minimo_clp,
    );
  });

  it('costoTotal = costoNotarial + derechosRegistrales + impuestoTimbres', () => {
    const r = calculateCostoNotaria({
      valorPropiedad: 100_000_000,
      tipo: 'hipoteca',
    });
    expect(r.costoTotal).toBe(
      r.costoNotarial + r.derechosRegistrales + r.impuestoTimbres,
    );
  });

  it('notaríaAdicional aplica recargo sobre costo notarial', () => {
    const sin = calculateCostoNotaria({
      valorPropiedad: 100_000_000,
      tipo: 'compraventa',
    });
    const con = calculateCostoNotaria({
      valorPropiedad: 100_000_000,
      tipo: 'compraventa',
      notariaAdicional: true,
    });
    expect(con.costoNotarial).toBeGreaterThan(sin.costoNotarial);
  });
});
