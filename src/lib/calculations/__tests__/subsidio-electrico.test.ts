// ============================================
// Tests de Subsidio Eléctrico — 5ª convocatoria
// ----------------------------------------------
// Golden ChileAtiende ficha 124375 / VUS 381: jul–dic 2026 en
// 6 cuotas desde septiembre. 1 integrante $17.346 ($2.891);
// 2–3 $22.548 ($3.758); 4+ $31.224 ($5.204).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioElectrico } from '../subsidio-electrico';

const baseInput = {
  rsh40: true,
  electrodependiente: false,
  alDiaPago: true,
};

describe('calculateSubsidioElectrico', () => {
  it('1 integrante → $17.346 semestral / $2.891 por cuota', () => {
    const r = calculateSubsidioElectrico({ ...baseInput, integrantes: 1 });
    expect(r.aplica).toBe(true);
    expect(r.montoSemestral).toBe(17346);
    expect(r.cuotaMensual).toBe(2891);
    expect(r.numeroCuotas).toBe(6);
  });

  it('3 integrantes → $22.548 / $3.758', () => {
    const r = calculateSubsidioElectrico({ ...baseInput, integrantes: 3 });
    expect(r.montoSemestral).toBe(22548);
    expect(r.cuotaMensual).toBe(3758);
  });

  it('5 integrantes → $31.224 / $5.204', () => {
    const r = calculateSubsidioElectrico({ ...baseInput, integrantes: 5 });
    expect(r.montoSemestral).toBe(31224);
    expect(r.cuotaMensual).toBe(5204);
  });

  it('electrodependiente accede sin 40% RSH', () => {
    const r = calculateSubsidioElectrico({
      integrantes: 2,
      rsh40: false,
      electrodependiente: true,
      alDiaPago: true,
    });
    expect(r.aplica).toBe(true);
    expect(r.montoSemestral).toBe(22548);
  });

  it('no estar al día en el pago → no aplica', () => {
    const r = calculateSubsidioElectrico({
      ...baseInput,
      integrantes: 2,
      alDiaPago: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.montoSemestral).toBe(0);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('sin 40% RSH ni electrodependiente → no aplica', () => {
    const r = calculateSubsidioElectrico({
      integrantes: 2,
      rsh40: false,
      electrodependiente: false,
      alDiaPago: true,
    });
    expect(r.aplica).toBe(false);
    expect(r.montoSemestral).toBe(0);
  });
});
