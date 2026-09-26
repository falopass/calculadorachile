// ============================================
// Tests del Bono $30.000 por hijo (Ley 21.840)
// ----------------------------------------------
// Golden ChileAtiende ficha 144481: $30.000 por niño, automático
// y único. 80% RSH para niños ≤13 al 01-06-2026 y nacidos entre
// 02-06-2026 y 15-03-2027 (pago posterior); cuidado alternativo
// familiar sin exigencia de vulnerabilidad.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBono30MilPorHijo } from '../bono-30-mil-por-hijo';

describe('calculateBono30MilPorHijo', () => {
  it('2 niños con 80% RSH → $60.000', () => {
    const r = calculateBono30MilPorHijo({
      ninos: 2,
      rsh80: true,
      nacidosEnPeriodo: 0,
      cuidadoAlternativo: 0,
    });
    expect(r.aplica).toBe(true);
    expect(r.total).toBe(60000);
  });

  it('2 niños + 1 nacido en el período → $90.000 ($30.000 posterior)', () => {
    const r = calculateBono30MilPorHijo({
      ninos: 2,
      rsh80: true,
      nacidosEnPeriodo: 1,
      cuidadoAlternativo: 0,
    });
    expect(r.total).toBe(90000);
    expect(r.montoPagoPosterior).toBe(30000);
  });

  it('sin 80% RSH pero con cuidado alternativo → $30.000', () => {
    const r = calculateBono30MilPorHijo({
      ninos: 0,
      rsh80: false,
      nacidosEnPeriodo: 0,
      cuidadoAlternativo: 1,
    });
    expect(r.aplica).toBe(true);
    expect(r.total).toBe(30000);
  });

  it('sin 80% RSH y sin cuidado alternativo → $0', () => {
    const r = calculateBono30MilPorHijo({
      ninos: 2,
      rsh80: false,
      nacidosEnPeriodo: 0,
      cuidadoAlternativo: 0,
    });
    expect(r.aplica).toBe(false);
    expect(r.total).toBe(0);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('los nacidos en el período sin RSH no cuentan', () => {
    const r = calculateBono30MilPorHijo({
      ninos: 0,
      rsh80: false,
      nacidosEnPeriodo: 1,
      cuidadoAlternativo: 0,
    });
    expect(r.aplica).toBe(false);
    expect(r.total).toBe(0);
  });
});
