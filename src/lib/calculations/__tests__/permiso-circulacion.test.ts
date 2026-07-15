import { describe, expect, it } from 'vitest';
import { calculatePermisoCirculacion } from '../permiso-circulacion';

describe('calculatePermisoCirculacion', () => {
  it('usa la UTM de enero de 2026', () => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: 8_000_000,
      electricoHibridoElegible: false,
    });
    expect(result.utmEneroCLP).toBe(69_751);
  });

  it('aplica el permiso mínimo oficial bajo $3.487.600', () => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: 3_000_000,
      electricoHibridoElegible: false,
    });
    expect(result.usaPermisoMinimo).toBe(true);
    expect(result.permisoTotalEstimado).toBe(34_876);
  });

  it('aplica la escala progresiva acumulativa sobre la tasación', () => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: 10_000_000,
      electricoHibridoElegible: false,
    });
    expect(result.montoEscala).toBeGreaterThan(100_000);
    expect(result.permisoTotalEstimado).toBe(result.montoEscala);
  });

  it('vehículo elegible paga 25% por la exención de 75%', () => {
    const normal = calculatePermisoCirculacion({
      valorVehiculo: 10_000_000,
      electricoHibridoElegible: false,
    });
    const elegible = calculatePermisoCirculacion({
      valorVehiculo: 10_000_000,
      electricoHibridoElegible: true,
    });
    expect(elegible.permisoTotalEstimado).toBe(
      normal.permisoTotalEstimado - Math.round(normal.permisoTotalEstimado * 0.75),
    );
  });

  it('las cuotas base suman el total anual', () => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: 7_000_000,
      electricoHibridoElegible: false,
    });
    expect(result.cuotaBase1 + result.cuotaBase2).toBe(result.permisoTotalEstimado);
  });

  it('tasación cero devuelve cero', () => {
    const result = calculatePermisoCirculacion({
      valorVehiculo: 0,
      electricoHibridoElegible: false,
    });
    expect(result.permisoTotalEstimado).toBe(0);
  });
});
