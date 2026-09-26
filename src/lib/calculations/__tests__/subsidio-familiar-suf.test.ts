// ============================================
// Tests de Subsidio Familiar (SUF)
// ----------------------------------------------
// Golden ChileAtiende ficha 33112 (valores desde 01-05-2026,
// Ley 21.830): $22.601 por carga, $45.202 por carga con
// discapacidad. Requiere 60% más vulnerable RSH.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioFamiliarSuf } from '../subsidio-familiar-suf';

describe('calculateSubsidioFamiliarSuf', () => {
  it('2 causantes + 1 con discapacidad → $90.404 mensual / $1.084.848 anual', () => {
    const r = calculateSubsidioFamiliarSuf({
      causantes: 2,
      causantesDiscapacidad: 1,
      rsh60: true,
    });
    expect(r.aplica).toBe(true);
    expect(r.montoMensual).toBe(90404);
    expect(r.montoAnual).toBe(1084848);
    expect(r.montoCausantesComunes).toBe(45202);
    expect(r.montoCausantesDiscapacidad).toBe(45202);
  });

  it('1 causante → $22.601 mensual', () => {
    const r = calculateSubsidioFamiliarSuf({
      causantes: 1,
      causantesDiscapacidad: 0,
      rsh60: true,
    });
    expect(r.montoMensual).toBe(22601);
  });

  it('fuera del 60% RSH → no aplica', () => {
    const r = calculateSubsidioFamiliarSuf({
      causantes: 2,
      causantesDiscapacidad: 0,
      rsh60: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.montoMensual).toBe(0);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('sin causantes → no aplica', () => {
    const r = calculateSubsidioFamiliarSuf({
      causantes: 0,
      causantesDiscapacidad: 0,
      rsh60: true,
    });
    expect(r.aplica).toBe(false);
    expect(r.montoMensual).toBe(0);
  });
});
