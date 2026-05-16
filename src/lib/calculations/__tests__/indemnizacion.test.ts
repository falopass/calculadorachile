// ============================================
// Tests de indemnización por años de servicio (Art. 163 CdT)
// ----------------------------------------------
// Verifica 30 días por año, tope 11 años, tope base 90 UF.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateIndemnizacion } from '../indemnizacion';
import { UF, INDEMNIZACION } from '@/lib/values/constants';

describe('calculateIndemnizacion', () => {
  it('5 años de servicio: 30 días × 5 = 150 días', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 5,
      incluyeGratificacion: false,
    });
    expect(r.añosIndemnizables).toBe(5);
    expect(r.diasIndemnizacion).toBe(150);
    expect(r.indemnizacionTotal).toBe(800_000 * 5);
  });

  it('15 años de servicio: tope 11 años (330 días)', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 15,
      incluyeGratificacion: false,
    });
    expect(r.añosIndemnizables).toBe(11);
    expect(r.diasIndemnizacion).toBe(330);
    expect(r.aplicaTope).toBe(true);
  });

  it('sueldo sobre 90 UF se topea para el cálculo', () => {
    const sueldoAlto = 100 * UF.valor; // > 90 UF
    const r = calculateIndemnizacion({
      ultimoSueldo: sueldoAlto,
      añosTrabajados: 5,
      incluyeGratificacion: false,
    });
    expect(r.aplicaTope).toBe(true);
    // Base topeada en 90 UF
    expect(r.indemnizacionTotal).toBeCloseTo(90 * UF.valor * 5, -3);
  });

  it('incluye gratificación cuando corresponde', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 5,
      incluyeGratificacion: true,
      gratificacionMensual: 200_000,
    });
    expect(r.baseCalculo).toBe(1_000_000);
    expect(r.indemnizacionTotal).toBe(1_000_000 * 5);
  });

  it('valor por día = base / 30', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 900_000,
      añosTrabajados: 3,
      incluyeGratificacion: false,
    });
    expect(r.valorDia).toBe(30_000);
    expect(r.indemnizacionTotal).toBe(30_000 * 90);
  });

  it('tope expuesto en CLP coincide con 90 UF', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 1_000_000,
      añosTrabajados: 1,
      incluyeGratificacion: false,
    });
    expect(r.topeUF).toBe(INDEMNIZACION.tope_uf_mensual);
    expect(r.topeMonto).toBe(Math.round(90 * UF.valor));
  });
});
