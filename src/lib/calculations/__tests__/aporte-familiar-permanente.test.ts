// ============================================
// Tests de Aporte Familiar Permanente 2026
// ----------------------------------------------
// Golden ChileAtiende ficha 38913: $66.834 por cada carga con
// derecho a SUF/AF/Maternal al 31-12-2025, o por el grupo familiar
// en Chile Solidario/SSyOO. En ambos casos solo por carga. Madre
// con SUF suma un aporte propio. Plazo de cobro: 9 meses.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateAporteFamiliarPermanente } from '../aporte-familiar-permanente';

describe('calculateAporteFamiliarPermanente', () => {
  it('2 cargas + grupo SSyOO: solo por carga → $133.668', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 2,
      grupoSSyOO: true,
      madreSUF: false,
    });
    expect(r.aplica).toBe(true);
    expect(r.numeroAportes).toBe(2);
    expect(r.totalCLP).toBe(133668);
    expect(r.montoPorAporte).toBe(66834);
  });

  it('0 cargas + grupo SSyOO: un aporte por el grupo → $66.834', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 0,
      grupoSSyOO: true,
      madreSUF: false,
    });
    expect(r.aplica).toBe(true);
    expect(r.numeroAportes).toBe(1);
    expect(r.totalCLP).toBe(66834);
  });

  it('3 cargas sin SSyOO → $200.502', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 3,
      grupoSSyOO: false,
      madreSUF: false,
    });
    expect(r.totalCLP).toBe(200502);
  });

  it('2 cargas + madre SUF: aporte propio adicional → $200.502', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 2,
      grupoSSyOO: false,
      madreSUF: true,
    });
    expect(r.aplica).toBe(true);
    expect(r.numeroAportes).toBe(3);
    expect(r.totalCLP).toBe(200502);
  });

  it('0 cargas y sin SSyOO: no aplica', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 0,
      grupoSSyOO: false,
      madreSUF: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.totalCLP).toBe(0);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });

  it('plazo de cobro: 9 meses', () => {
    const r = calculateAporteFamiliarPermanente({
      cargas: 1,
      grupoSSyOO: false,
      madreSUF: false,
    });
    expect(r.plazoCobroMeses).toBe(9);
  });
});
