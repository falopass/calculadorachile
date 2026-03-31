import { describe, it, expect } from 'vitest';
import { calculateCreditoHipotecario, type CreditoHipotecarioInput } from '../credito-hipotecario';

describe('calculateCreditoHipotecario', () => {
  const inputBase: CreditoHipotecarioInput = {
    montoUF: 2000,
    plazoAnos: 20,
    tasaAnual: 4.5,
    pieUF: 200,
  };

  describe('cálculo básico del dividendo', () => {
    it('debería calcular el dividendo mensual correctamente', () => {
      const result = calculateCreditoHipotecario(inputBase);
      expect(result.dividendoMensualUF).toBeGreaterThan(0);
      expect(result.dividendoMensualCLP).toBeGreaterThan(0);
    });

    it('debería calcular el monto a financiar correctamente', () => {
      const result = calculateCreditoHipotecario(inputBase);
      expect(result.montoFinanciarUF).toBe(1800); // 2000 - 200
    });

    it('debería calcular el plazo en meses', () => {
      const result = calculateCreditoHipotecario(inputBase);
      expect(result.plazoMeses).toBe(240); // 20 años * 12 meses
    });
  });

  describe('con pie', () => {
    it('debería manejar crédito sin pie', () => {
      const input = { ...inputBase, pieUF: 0 };
      const result = calculateCreditoHipotecario(input);
      expect(result.montoFinanciarUF).toBe(2000);
      expect(result.pieUF).toBe(0);
    });

    it('debería manejar diferentes montos de pie', () => {
      const input = { ...inputBase, pieUF: 500 };
      const result = calculateCreditoHipotecario(input);
      expect(result.montoFinanciarUF).toBe(1500);
      expect(result.pieUF).toBe(500);
    });
  });

  describe('tasa de interés', () => {
    it('debería manejar tasa 0% (sin intereses)', () => {
      const input = { ...inputBase, tasaAnual: 0 };
      const result = calculateCreditoHipotecario(input);
      // Sin intereses, el dividendo es el capital / meses
      expect(result.dividendoMensualUF).toBe(1800 / 240);
      expect(result.totalInteresesUF).toBe(0);
    });

    it('debería manejar tasa alta', () => {
      const input = { ...inputBase, tasaAnual: 10 };
      const result = calculateCreditoHipotecario(input);
      expect(result.dividendoMensualUF).toBeGreaterThan(inputBase.montoUF / inputBase.plazoAnos / 12);
    });
  });

  describe('totales y costos', () => {
    it('debería calcular el total pagado correctamente', () => {
      const result = calculateCreditoHipotecario(inputBase);
      const esperado = result.dividendoMensualUF * result.plazoMeses;
      expect(result.totalPagoUF).toBeCloseTo(esperado, 2);
    });

    it('debería calcular los intereses totales', () => {
      const result = calculateCreditoHipotecario(inputBase);
      const intereses = result.totalPagoUF - result.montoFinanciarUF;
      expect(result.totalInteresesUF).toBeCloseTo(intereses, 2);
    });

    it('debería calcular el costo total (multiplicador)', () => {
      const result = calculateCreditoHipotecario(inputBase);
      expect(result.costoTotal).toBeGreaterThan(1);
      // El costo total debería ser totalPago / montoFinanciar
      expect(result.costoTotal).toBeCloseTo(result.totalPagoUF / result.montoFinanciarUF, 2);
    });
  });

  describe('conversiones a CLP', () => {
    it('debería convertir el dividendo a CLP', () => {
      const result = calculateCreditoHipotecario(inputBase);
      const esperado = result.dividendoMensualUF * result.valorUF;
      expect(result.dividendoMensualCLP).toBeCloseTo(esperado, 0);
    });

    it('debería incluir el valor de UF en el resultado', () => {
      const result = calculateCreditoHipotecario(inputBase);
      expect(result.valorUF).toBeGreaterThan(0);
    });
  });

  describe('validaciones', () => {
    it('debería lanzar error para monto negativo', () => {
      const input = { ...inputBase, montoUF: -100 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para plazo menor a 1 año', () => {
      const input = { ...inputBase, plazoAnos: 0 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para plazo mayor a 50 años', () => {
      const input = { ...inputBase, plazoAnos: 51 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para tasa negativa', () => {
      const input = { ...inputBase, tasaAnual: -1 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para tasa mayor a 100%', () => {
      const input = { ...inputBase, tasaAnual: 101 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para pie negativo', () => {
      const input = { ...inputBase, pieUF: -50 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });

    it('debería lanzar error para pie igual al monto', () => {
      const input = { ...inputBase, pieUF: 2000 };
      expect(() => calculateCreditoHipotecario(input)).toThrow();
    });
  });

  describe('casos edge', () => {
    it('debería manejar plazo de 1 año', () => {
      const input = { ...inputBase, plazoAnos: 1, pieUF: 0 };
      const result = calculateCreditoHipotecario(input);
      expect(result.plazoMeses).toBe(12);
    });

    it('debería manejar plazo de 30 años', () => {
      const input = { ...inputBase, plazoAnos: 30 };
      const result = calculateCreditoHipotecario(input);
      expect(result.plazoMeses).toBe(360);
    });

    it('debería manejar monto pequeño', () => {
      const input = { ...inputBase, montoUF: 100, pieUF: 10 };
      const result = calculateCreditoHipotecario(input);
      expect(result.dividendoMensualUF).toBeGreaterThan(0);
    });
  });
});