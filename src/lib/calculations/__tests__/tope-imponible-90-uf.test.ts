// ============================================
// Tests del Tope Imponible 90 UF
// ----------------------------------------------
// Golden con UF $41.057,20: tope AFP/salud = 90 UF = $3.695.148;
// tope cesantía = 135,2 UF = $5.550.933. Cotizaciones sobre el
// sueldo topado: AFP 10%, salud 7%, cesantía trabajador 0,6%.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateTopeImponible } from '../tope-imponible-90-uf';

const UF = 41057.2;

describe('calculateTopeImponible', () => {
  it('topes con UF $41.057,20 → $3.695.148 y $5.550.933', () => {
    const r = calculateTopeImponible({ sueldoImponible: 0, valorUF: UF });
    expect(r.topeAfpSaludCLP).toBe(3695148);
    expect(r.topeCesantiaCLP).toBe(5550933);
  });

  it('sueldo $4.000.000 → topado en AFP/salud, exceso $304.852', () => {
    const r = calculateTopeImponible({
      sueldoImponible: 4000000,
      valorUF: UF,
    });
    expect(r.imponibleConsideradoCLP).toBe(3695148);
    expect(r.excesoSobreTopeCLP).toBe(304852);
    expect(r.cotizacionAfpCLP).toBe(369515);
    expect(r.cotizacionSaludCLP).toBe(258660);
    // Cesantía: el sueldo no supera el tope de 135,2 UF
    expect(r.cotizacionCesantiaTrabajadorCLP).toBe(24000);
  });

  it('sueldo $2.000.000 → sin exceso, cotizaciones sobre el sueldo', () => {
    const r = calculateTopeImponible({
      sueldoImponible: 2000000,
      valorUF: UF,
    });
    expect(r.imponibleConsideradoCLP).toBe(2000000);
    expect(r.excesoSobreTopeCLP).toBe(0);
    expect(r.cotizacionAfpCLP).toBe(200000);
    expect(r.cotizacionSaludCLP).toBe(140000);
    expect(r.cotizacionCesantiaTrabajadorCLP).toBe(12000);
  });

  it('sueldo muy alto → cesantía también se topa a 135,2 UF', () => {
    const r = calculateTopeImponible({
      sueldoImponible: 6000000,
      valorUF: UF,
    });
    expect(r.cotizacionCesantiaTrabajadorCLP).toBe(
      Math.round(5550933 * 0.006),
    );
  });
});
