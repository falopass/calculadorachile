import { describe, expect, it } from 'vitest';
import { calculateCostoViaje } from '../costo-viaje';

describe('calculateCostoViaje', () => {
  it('golden: 450 km, 12,5 km/l, $1.300/l, peajes $12.000, 3 pasajeros, solo ida', () => {
    const r = calculateCostoViaje({
      distanciaKm: 450,
      rendimientoKmL: 12.5,
      precioCombustible: 1_300,
      peajes: 12_000,
      pasajeros: 3,
      idaYVuelta: false,
    });
    expect(r.litros).toBe(36);
    expect(r.costoCombustible).toBe(46_800);
    expect(r.costoTotal).toBe(58_800);
    expect(r.costoPorPasajero).toBe(19_600);
    expect(r.costoPorKm).toBe(131);
  });

  it('ida y vuelta duplica distancia, combustible y peajes', () => {
    const r = calculateCostoViaje({
      distanciaKm: 450,
      rendimientoKmL: 12.5,
      precioCombustible: 1_300,
      peajes: 12_000,
      pasajeros: 3,
      idaYVuelta: true,
    });
    expect(r.distanciaTotal).toBe(900);
    expect(r.litros).toBe(72);
    expect(r.costoCombustible).toBe(93_600);
    expect(r.costoPeajes).toBe(24_000);
    expect(r.costoTotal).toBe(117_600);
    expect(r.costoPorPasajero).toBe(39_200);
  });

  it('redondea litros a un decimal y pesos al entero', () => {
    const r = calculateCostoViaje({
      distanciaKm: 100,
      rendimientoKmL: 13,
      precioCombustible: 1_257,
    });
    expect(r.litros).toBe(7.7);
    expect(r.costoCombustible).toBe(Math.round((100 / 13) * 1_257));
    expect(r.pasajeros).toBe(1);
  });

  it('rendimiento cero o valores negativos no generan costo de combustible', () => {
    const r = calculateCostoViaje({
      distanciaKm: 100,
      rendimientoKmL: 0,
      precioCombustible: 1_300,
      peajes: -5,
      pasajeros: 0,
    });
    expect(r.litros).toBe(0);
    expect(r.costoTotal).toBe(0);
    expect(r.pasajeros).toBe(1);
  });
});
