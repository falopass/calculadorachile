// ============================================
// Tests de comparador AFP
// ----------------------------------------------
// Verifica que la AFP más barata sea Uno, que las comparaciones
// respeten el tope imponible y que el ahorro sea consistente.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateComparadorAFP } from '../comparador-afp';
import { AFP, UF, TOPE_IMPOSITIVO } from '@/lib/values/constants';

describe('calculateComparadorAFP', () => {
  it('AFP Uno (0,46%) es la más barata en 2026', () => {
    const r = calculateComparadorAFP({
      sueldoBruto: 1_000_000,
      afpActual: 'habitat',
      anosPension: 30,
    });
    expect(r.mejorAFP).toBe(AFP.uno.nombre);
  });

  it('desglose ordenado por costo anual creciente', () => {
    const r = calculateComparadorAFP({
      sueldoBruto: 1_500_000,
      afpActual: 'capital',
      anosPension: 20,
    });
    for (let i = 1; i < r.desgloseAFP.length; i++) {
      expect(r.desgloseAFP[i].costoAnual).toBeGreaterThanOrEqual(
        r.desgloseAFP[i - 1].costoAnual,
      );
    }
  });

  it('aplica tope imponible 90 UF para sueldos altos', () => {
    const sueldoTop = 10_000_000;
    const topeCLP = TOPE_IMPOSITIVO.afp_salud * UF.valor;
    const r = calculateComparadorAFP({
      sueldoBruto: sueldoTop,
      afpActual: 'habitat',
      anosPension: 1,
    });
    // Costo anual con tope = topeCLP × comisión × 12
    const esperadoHabitat = topeCLP * (AFP.habitat.comision / 100) * 12;
    expect(r.costoAnualActual).toBeCloseTo(esperadoHabitat, -1);
  });

  it('ahorro total = ahorro anual × años', () => {
    const r = calculateComparadorAFP({
      sueldoBruto: 1_000_000,
      afpActual: 'provida',
      anosPension: 25,
    });
    expect(r.ahorroTotalPeriodo).toBe(r.ahorroAnual * r.anosPension);
  });

  it('si el usuario ya está en la más barata, ahorro es cero', () => {
    const r = calculateComparadorAFP({
      sueldoBruto: 800_000,
      afpActual: 'uno',
      anosPension: 10,
    });
    expect(r.ahorroAnual).toBe(0);
    expect(r.ahorroTotalPeriodo).toBe(0);
  });

  it('todas las 7 AFP están en el desglose', () => {
    const r = calculateComparadorAFP({
      sueldoBruto: 1_000_000,
      afpActual: 'habitat',
      anosPension: 10,
    });
    expect(r.desgloseAFP).toHaveLength(7);
  });
});
