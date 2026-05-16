// ============================================
// Tests de permiso de circulación
// ----------------------------------------------
// Verifica la tabla SII progresiva por tramos UTM, descuento por
// antigüedad ≥20 años, descuento moto/taxi 50% y prorrateo de
// primera inscripción.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePermisoCirculacion } from '../permiso-circulacion';

describe('calculatePermisoCirculacion', () => {
  it('automóvil tasación baja paga ~1% del valor', () => {
    const r = calculatePermisoCirculacion({
      valorVehiculo: 3_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 3,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    expect(r.tasaEfectiva).toBeGreaterThan(0.9);
    expect(r.tasaEfectiva).toBeLessThan(1.2);
  });

  it('motocicleta paga 50% de la tarifa de auto', () => {
    const auto = calculatePermisoCirculacion({
      valorVehiculo: 5_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    const moto = calculatePermisoCirculacion({
      valorVehiculo: 5_000_000,
      tipoVehiculo: 'motocicleta',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    expect(moto.permisoTotal).toBe(Math.round(auto.permisoTotal / 2));
  });

  it('vehículo ≥20 años recibe 50% descuento por antigüedad', () => {
    const nuevo = calculatePermisoCirculacion({
      valorVehiculo: 8_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 5,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    const antiguo = calculatePermisoCirculacion({
      valorVehiculo: 8_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 25,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    expect(antiguo.factorAntiguedad).toBe(0.5);
    expect(antiguo.permisoTotal).toBeCloseTo(Math.round(nuevo.permisoTotal / 2), -2);
  });

  it('progresividad: tasación alta paga tasa marginal mayor', () => {
    const bajo = calculatePermisoCirculacion({
      valorVehiculo: 2_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    const alto = calculatePermisoCirculacion({
      valorVehiculo: 30_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    expect(alto.tasaEfectiva).toBeGreaterThan(bajo.tasaEfectiva);
  });

  it('primera vez prorratea el permiso por meses restantes', () => {
    const completo = calculatePermisoCirculacion({
      valorVehiculo: 5_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    const seisMeses = calculatePermisoCirculacion({
      valorVehiculo: 5_000_000,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: true,
      mesesRestantes: 6,
    });
    expect(seisMeses.permisoTotal).toBe(Math.round(completo.permisoTotal / 2));
    expect(seisMeses.prorrateoPrimeraVez).toBeGreaterThan(0);
  });

  it('valor cero retorna permiso cero', () => {
    const r = calculatePermisoCirculacion({
      valorVehiculo: 0,
      tipoVehiculo: 'automovil',
      antiguedadVehiculo: 0,
      esZonaCarga: false,
      esPrimeraVez: false,
    });
    expect(r.permisoTotal).toBe(0);
  });
});
