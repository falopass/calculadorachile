// ============================================
// Tests de gastos comunes (estimador, Ley 21.442)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateGastosComunes } from '../gastos-comunes';
import { GASTOS_COMUNES_REFERENCIALES } from '@/lib/values/constants';

describe('calculateGastosComunes', () => {
  it('superficie 50 m² con valor default ($15.000): $750.000 base', () => {
    const r = calculateGastosComunes({ superficieM2: 50 });
    expect(r.gastoBaseM2).toBe(50 * GASTOS_COMUNES_REFERENCIALES.precio_m2_clp);
  });

  it('valorM2 personalizado se respeta', () => {
    const r = calculateGastosComunes({ superficieM2: 60, valorM2: 12_000 });
    expect(r.gastoBaseM2).toBe(720_000);
  });

  it('estacionamientos suman al total', () => {
    const sin = calculateGastosComunes({ superficieM2: 60 });
    const con = calculateGastosComunes({
      superficieM2: 60,
      incluyeEstacionamiento: true,
      estacionamientos: 2,
    });
    expect(con.gastoEstacionamiento).toBe(
      2 * GASTOS_COMUNES_REFERENCIALES.estacionamiento_clp,
    );
    expect(con.totalMensual).toBeGreaterThan(sin.totalMensual);
  });

  it('extras (piscina + gimnasio + conserje) suman correctamente', () => {
    const r = calculateGastosComunes({
      superficieM2: 50,
      tienePiscina: true,
      tieneGimnasio: true,
      tieneConserje: true,
    });
    const esperado =
      GASTOS_COMUNES_REFERENCIALES.piscina_clp +
      GASTOS_COMUNES_REFERENCIALES.gimnasio_clp +
      GASTOS_COMUNES_REFERENCIALES.conserje_24h_clp;
    expect(r.gastoExtras).toBe(esperado);
  });

  it('total anual = total mensual × 12', () => {
    const r = calculateGastosComunes({
      superficieM2: 80,
      tienePiscina: true,
      tieneConserje: true,
    });
    expect(r.totalAnual).toBe(r.totalMensual * 12);
  });

  it('sin amenities ni estacionamiento: solo gasto por m²', () => {
    const r = calculateGastosComunes({ superficieM2: 70 });
    expect(r.gastoExtras).toBe(0);
    expect(r.gastoEstacionamiento).toBe(0);
    expect(r.totalMensual).toBe(r.gastoBaseM2);
  });

  it('avis legal hace referencia a Ley 21.442', () => {
    const r = calculateGastosComunes({ superficieM2: 50 });
    expect(r.aviso).toContain('21.442');
  });
});
