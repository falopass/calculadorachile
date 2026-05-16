// ============================================
// Tests de cuenta de luz BT1 (Ley 21.667)
// ----------------------------------------------
// Verifica el cobro por tramos progresivos, el recargo por tipo
// (residencial vs comercial vs industrial), el ajuste por zona
// y la suma del IVA.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateCuentaLuz } from '../cuenta-luz';
import {
  IVA,
  TARIFA_BT1_CARGO_FIJO,
  TARIFA_BT1_RECARGOS,
  TARIFA_BT1_ZONA,
} from '@/lib/values/constants';

describe('calculateCuentaLuz', () => {
  it('consumo cero solo cobra cargo fijo + IVA', () => {
    const r = calculateCuentaLuz({ consumoKWH: 0 });
    expect(r.cargoEnergia).toBe(0);
    expect(r.cargoFijo).toBe(TARIFA_BT1_CARGO_FIJO.bt1_residencial);
    expect(r.iva).toBe(Math.round(r.cargoFijo * (IVA.tasa / 100)));
  });

  it('total = subtotal + IVA 19%', () => {
    const r = calculateCuentaLuz({ consumoKWH: 250 });
    expect(r.total).toBe(r.subtotal + r.iva);
    expect(r.iva).toBeCloseTo(r.subtotal * 0.19, -1);
  });

  it('subtotal = cargo fijo + cargo energía', () => {
    const r = calculateCuentaLuz({ consumoKWH: 200 });
    expect(r.subtotal).toBe(r.cargoFijo + r.cargoEnergia);
  });

  it('aplica tramos progresivos (consumo alto paga más por kWh)', () => {
    const bajo = calculateCuentaLuz({ consumoKWH: 100 });
    const alto = calculateCuentaLuz({ consumoKWH: 500 });
    // Tarifa promedio aumenta porque entra en tramos más caros.
    expect(alto.tarifaPromedioKWH).toBeGreaterThan(bajo.tarifaPromedioKWH);
  });

  it('comercial cobra más que residencial al mismo consumo', () => {
    const res = calculateCuentaLuz({
      consumoKWH: 200,
      tipoTarifa: 'bt1_residencial',
    });
    const com = calculateCuentaLuz({
      consumoKWH: 200,
      tipoTarifa: 'bt1_comercial',
    });
    expect(com.cargoEnergia).toBeGreaterThan(res.cargoEnergia);
    expect(TARIFA_BT1_RECARGOS.bt1_comercial).toBeGreaterThan(
      TARIFA_BT1_RECARGOS.bt1_residencial,
    );
  });

  it('zona sur cobra más que zona central (factor zona)', () => {
    const central = calculateCuentaLuz({ consumoKWH: 200, zona: 'central' });
    const sur = calculateCuentaLuz({ consumoKWH: 200, zona: 'sur' });
    expect(sur.cargoEnergia).toBeGreaterThan(central.cargoEnergia);
    expect(TARIFA_BT1_ZONA.sur).toBeGreaterThan(TARIFA_BT1_ZONA.central);
  });

  it('cargo fijo industrial > comercial > residencial', () => {
    const r1 = calculateCuentaLuz({
      consumoKWH: 100,
      tipoTarifa: 'bt1_residencial',
    });
    const r2 = calculateCuentaLuz({
      consumoKWH: 100,
      tipoTarifa: 'bt1_comercial',
    });
    const r3 = calculateCuentaLuz({
      consumoKWH: 100,
      tipoTarifa: 'bt1_industrial',
    });
    expect(r2.cargoFijo).toBeGreaterThan(r1.cargoFijo);
    expect(r3.cargoFijo).toBeGreaterThan(r2.cargoFijo);
  });

  it('desgloseTramos suma el cargoEnergia total', () => {
    const r = calculateCuentaLuz({ consumoKWH: 400 });
    const sumaTramos = r.desgloseTramos.reduce(
      (acc, t) => acc + t.subtotal,
      0,
    );
    expect(sumaTramos).toBeCloseTo(r.cargoEnergia, -1);
  });

  it('consumo negativo se acota a 0', () => {
    const r = calculateCuentaLuz({ consumoKWH: -50 });
    expect(r.consumoKWH).toBe(0);
    expect(r.cargoEnergia).toBe(0);
  });
});
