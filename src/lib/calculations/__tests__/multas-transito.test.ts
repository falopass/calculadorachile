// ============================================
// Tests de multas de tránsito (Ley 18.290)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateMultasTransito } from '../multas-transito';
import { UTM, MULTA_TRANSITO_UTM } from '@/lib/values/constants';

describe('calculateMultasTransito', () => {
  it('multa leve = 0,5 UTM convertida a CLP', () => {
    const r = calculateMultasTransito({ tipoMulta: 'leve' });
    expect(r.montoUTM).toBe(MULTA_TRANSITO_UTM.leve);
    expect(r.montoCLP).toBe(Math.round(0.5 * UTM.valor));
  });

  it('multa gravísima por alcohol = 12 UTM (Ley Emilia)', () => {
    const r = calculateMultasTransito({ tipoMulta: 'gravisima_alcohol' });
    expect(r.montoUTM).toBe(12);
  });

  it('reincidencia agrega 50% de recargo', () => {
    const sin = calculateMultasTransito({ tipoMulta: 'grave', esReincidente: false });
    const con = calculateMultasTransito({ tipoMulta: 'grave', esReincidente: true });
    expect(con.recargoReincidencia).toBeCloseTo(sin.montoCLP * 0.5, 0);
    expect(con.montoCLP).toBeCloseTo(sin.montoCLP * 1.5, -1);
  });

  it('cantidad de multas multiplica el total', () => {
    const r = calculateMultasTransito({ tipoMulta: 'menos_grave', cantidadMultas: 3 });
    expect(r.totalCLP).toBeCloseTo(r.montoCLP * 3, -1);
    expect(r.cantidadMultas).toBe(3);
  });

  it('cantidad menor a 1 se normaliza a 1', () => {
    const r = calculateMultasTransito({ tipoMulta: 'leve', cantidadMultas: 0 });
    expect(r.cantidadMultas).toBe(1);
  });

  it('orden de gravedad: leve < menos_grave < grave < gravisima < gravisima_alcohol', () => {
    const ord = ['leve', 'menos_grave', 'grave', 'gravisima', 'gravisima_alcohol'] as const;
    const valores = ord.map((t) => calculateMultasTransito({ tipoMulta: t }).montoUTM);
    for (let i = 1; i < valores.length; i++) {
      expect(valores[i]).toBeGreaterThanOrEqual(valores[i - 1]);
    }
  });
});
