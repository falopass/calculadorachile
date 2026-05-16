// ============================================
// Tests de subsidio de agua potable (Ley 18.778, DS 195/MOP)
// ----------------------------------------------
// Verifica que el subsidio cubra hasta 15 m³, el porcentaje por
// tramo del RSH y el descuento sobre la cuenta real (no sobre un
// precio inventado).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioAgua } from '../subsidio-agua';
import { SUBSIDIO_AGUA_POTABLE } from '@/lib/values/constants';

describe('calculateSubsidioAgua', () => {
  it('tramo1 cubre 60% sobre los primeros 15 m³', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 15,
      numeroPersonas: 4,
      tramo: 'tramo1',
      montoCuenta: 20_000,
    });
    expect(r.subsidioPct).toBe(SUBSIDIO_AGUA_POTABLE.tramos.tramo1);
    // 60% sobre los 15 m³ = 60% de los $20.000 (todo subsidiado)
    expect(r.montoSubsidio).toBe(12_000);
    expect(r.montoPagar).toBe(8_000);
  });

  it('tramo2: 40% sobre los primeros 15 m³', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 15,
      numeroPersonas: 3,
      tramo: 'tramo2',
      montoCuenta: 20_000,
    });
    expect(r.subsidioPct).toBe(SUBSIDIO_AGUA_POTABLE.tramos.tramo2);
    expect(r.montoSubsidio).toBe(8_000);
  });

  it('tramo3: 25% sobre los primeros 15 m³', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 15,
      numeroPersonas: 2,
      tramo: 'tramo3',
      montoCuenta: 20_000,
    });
    expect(r.subsidioPct).toBe(SUBSIDIO_AGUA_POTABLE.tramos.tramo3);
    expect(r.montoSubsidio).toBe(5_000);
  });

  it('consumo > 15 m³: solo se subsidia la fracción correspondiente a 15 m³', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 30,
      numeroPersonas: 4,
      tramo: 'tramo1',
      montoCuenta: 30_000,
    });
    // Proporción subsidiable: 15/30 = 50% de la cuenta
    // Subsidio: 60% × ($30.000 × 0.5) = $9.000
    expect(r.consumoSubsidiado).toBe(15);
    expect(r.montoSubsidio).toBe(9_000);
    expect(r.montoPagar).toBe(21_000);
  });

  it('consumo < 15 m³: el tope no aplica (se subsidia todo el consumo)', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 10,
      numeroPersonas: 2,
      tramo: 'tramo1',
      montoCuenta: 12_000,
    });
    expect(r.consumoSubsidiado).toBe(10);
  });

  it('si no se entrega montoCuenta, se estima con tarifa por m³', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 12,
      numeroPersonas: 3,
      tramo: 'tramo1',
      tarifaPorM3: 1500,
    });
    expect(r.montoSinSubsidio).toBe(12 * 1500);
  });

  it('si no se entrega cuenta ni tarifa, usa el promedio nacional', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 10,
      numeroPersonas: 3,
      tramo: 'tramo1',
    });
    expect(r.montoSinSubsidio).toBe(
      10 * SUBSIDIO_AGUA_POTABLE.tarifa_promedio_clp_m3,
    );
  });

  it('consumo 0 retorna subsidio 0', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 0,
      numeroPersonas: 2,
      tramo: 'tramo1',
      montoCuenta: 0,
    });
    expect(r.montoSubsidio).toBe(0);
    expect(r.montoPagar).toBe(0);
  });

  it('montoPagar nunca es negativo', () => {
    const r = calculateSubsidioAgua({
      consumoM3: 10,
      numeroPersonas: 3,
      tramo: 'tramo1',
      montoCuenta: 1000,
    });
    expect(r.montoPagar).toBeGreaterThanOrEqual(0);
  });
});
