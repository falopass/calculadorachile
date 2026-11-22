import { describe, it, expect } from 'vitest';
import { calculatePorcentaje, porcentajeToResults, type PorcentajeInput } from '../porcentaje';

describe('calculatePorcentaje', () => {
  describe('porcentaje-de', () => {
    it('calcula el porcentaje de un monto (golden)', () => {
      const result = calculatePorcentaje({
        tipo: 'porcentaje-de',
        valorA: 50000,
        porcentaje: 20,
      });
      expect(result.principal).toBe(10000);
    });

    it('acepta porcentajes con decimales', () => {
      const result = calculatePorcentaje({
        tipo: 'porcentaje-de',
        valorA: 99990,
        porcentaje: 12.5,
      });
      expect(result.principal).toBe(Math.round(99990 * 0.125));
    });

    it('devuelve 0 con porcentaje 0', () => {
      const result = calculatePorcentaje({
        tipo: 'porcentaje-de',
        valorA: 50000,
        porcentaje: 0,
      });
      expect(result.indefinido).toBe(false);
      expect(result.principal).toBe(0);
    });
  });

  describe('que-porcentaje', () => {
    it('calcula qué porcentaje es A de B (golden)', () => {
      const result = calculatePorcentaje({
        tipo: 'que-porcentaje',
        valorA: 15,
        valorB: 200,
      });
      expect(result.principal).toBe(7.5);
      expect(result.porcentajeResultado).toBe(7.5);
    });

    it('devuelve indefinido cuando B es 0 o falta', () => {
      const cero = calculatePorcentaje({
        tipo: 'que-porcentaje',
        valorA: 15,
        valorB: 0,
      });
      expect(cero.indefinido).toBe(true);
      const falta = calculatePorcentaje({
        tipo: 'que-porcentaje',
        valorA: 15,
      });
      expect(falta.indefinido).toBe(true);
      const aviso = porcentajeToResults(cero);
      expect(aviso).toHaveLength(1);
      expect(aviso[0].partial).toBe(true);
    });

    it('supera el 100% cuando A > B', () => {
      const result = calculatePorcentaje({
        tipo: 'que-porcentaje',
        valorA: 300,
        valorB: 200,
      });
      expect(result.principal).toBe(150);
    });
  });

  describe('variacion', () => {
    it('calcula la variación porcentual positiva (golden)', () => {
      const result = calculatePorcentaje({
        tipo: 'variacion',
        valorA: 40000,
        valorB: 50000,
      });
      expect(result.principal).toBe(25);
      expect(result.diferencia).toBe(10000);
    });

    it('calcula la variación porcentual negativa', () => {
      const result = calculatePorcentaje({
        tipo: 'variacion',
        valorA: 50000,
        valorB: 40000,
      });
      expect(result.principal).toBe(-20);
      expect(result.diferencia).toBe(-10000);
    });

    it('devuelve indefinido cuando el valor inicial es 0 o falta B', () => {
      const cero = calculatePorcentaje({
        tipo: 'variacion',
        valorA: 0,
        valorB: 100,
      });
      expect(cero.indefinido).toBe(true);
      const falta = calculatePorcentaje({
        tipo: 'variacion',
        valorA: 100,
      });
      expect(falta.indefinido).toBe(true);
    });
  });

  describe('descuento', () => {
    it('aplica un descuento simple (golden)', () => {
      const result = calculatePorcentaje({
        tipo: 'descuento',
        valorA: 99990,
        porcentaje: 30,
      });
      expect(result.principal).toBe(Math.round(99990 * 0.7));
      expect(result.diferencia).toBe(Math.round(99990 * 0.3));
      expect(result.porcentajeResultado).toBe(30);
    });

    it('aplica dos descuentos sucesivos sin sumarlos', () => {
      const result = calculatePorcentaje({
        tipo: 'descuento',
        valorA: 100000,
        porcentaje: 20,
        descuentoAdicional: 10,
      });
      // 100.000 → 80.000 → 72.000; efectivo 28% (no 30%).
      expect(result.intermedio).toBe(80000);
      expect(result.principal).toBe(72000);
      expect(result.diferencia).toBe(28000);
      expect(result.porcentajeResultado).toBe(28);
    });

    it('mantiene precio final + ahorro = precio original con .5', () => {
      const result = calculatePorcentaje({
        tipo: 'descuento',
        valorA: 99,
        porcentaje: 50,
      });
      expect(result.principal! + result.diferencia!).toBe(99);
      // $99 con 50%: se redondea el precio final (49,5 → 50) y el ahorro se deriva (49).
      expect(result.principal).toBe(50);
      expect(result.diferencia).toBe(49);
    });

    it('un descuento del 100% deja el precio en 0', () => {
      const result = calculatePorcentaje({
        tipo: 'descuento',
        valorA: 50000,
        porcentaje: 100,
      });
      expect(result.principal).toBe(0);
    });
  });

  describe('aumento', () => {
    it('aplica un aumento porcentual (golden)', () => {
      const result = calculatePorcentaje({
        tipo: 'aumento',
        valorA: 100000,
        porcentaje: 19,
      });
      expect(result.principal).toBe(119000);
      expect(result.diferencia).toBe(19000);
    });
  });
});

describe('porcentajeToResults', () => {
  it('marca como highlight el resultado principal de cada modo', () => {
    const modos: PorcentajeInput[] = [
      { tipo: 'porcentaje-de', valorA: 1000, porcentaje: 10 },
      { tipo: 'que-porcentaje', valorA: 10, valorB: 40 },
      { tipo: 'variacion', valorA: 100, valorB: 120 },
      { tipo: 'descuento', valorA: 1000, porcentaje: 10 },
      { tipo: 'aumento', valorA: 1000, porcentaje: 10 },
    ];
    for (const input of modos) {
      const results = porcentajeToResults(calculatePorcentaje(input));
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].highlight).toBe(true);
    }
  });
});
