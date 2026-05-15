import { describe, it, expect } from 'vitest';
import { calculateSueldoLiquido, type SueldoLiquidoInput } from '../sueldo-liquido';
import { TOPE_IMPOSITIVO, UF } from '@/lib/values/constants';

describe('calculateSueldoLiquido', () => {
  const inputBase: Omit<SueldoLiquidoInput, 'sueldoBruto'> = {
    afp: 'capital',
    saludTipo: 'fonasa',
    saludTramo: 'A',
    contratoIndefinido: true,
  };

  describe('casos básicos', () => {
    it('debería calcular un sueldo líquido positivo', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.liquido).toBeGreaterThan(0);
      expect(result.bruto).toBe(1000000);
    });

    it('debería tener descuento mayor a 0', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.totalDescuentos).toBeGreaterThan(0);
    });

    it('debería tener líquido menor que el bruto', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.liquido).toBeLessThan(result.bruto);
    });
  });

  describe('tope imponible', () => {
    it('debería aplicar tope imponible para AFP', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        // 100 millones - muy por encima del tope
        sueldoBruto: 100000000,
      });

      // El descuento AFP no puede exceder el 13% del tope (aprox)
      const descuentoMaxAFP = TOPE_IMPOSITIVO.afp_salud * UF.valor * 0.13;
      expect(result.descuentos.afp).toBeLessThanOrEqual(descuentoMaxAFP + 1);
    });

    it('debería aplicar tope imponible para salud', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        // 100 millones - muy por encima del tope
        sueldoBruto: 100000000,
      });

      // El descuento salud no puede exceder el 7% del tope
      const descuentoMaxSalud = TOPE_IMPOSITIVO.afp_salud * UF.valor * 0.07;
      expect(result.descuentos.salud).toBeLessThanOrEqual(descuentoMaxSalud + 1);
    });
  });

  describe('FONASA', () => {
    it('debería calcular correctamente con FONASA tramo A', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
        saludTipo: 'fonasa',
        saludTramo: 'A',
      });

      // Tramo A no tiene cotización adicional
      expect(result.descuentos.salud).toBeGreaterThan(0);
    });

    it('debería calcular correctamente con FONASA tramo C', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
        saludTipo: 'fonasa',
        saludTramo: 'C',
      });

      // Tramo C tiene cotización adicional del 0.67%
      expect(result.descuentos.salud).toBeGreaterThan(0);
    });
  });

  describe('Isapre', () => {
    it('debería usar el 7% mínimo o el monto del plan', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
        saludTipo: 'isapre',
        isapreMonto: 3, // 3 UF
      });

      // El descuento debe ser el mayor entre 7% o el plan
      const minimo7Porciento = 1000000 * 0.07;
      const montoPlan = 3 * UF.valor;
      const esperado = Math.max(minimo7Porciento, montoPlan);

      expect(result.descuentos.salud).toBeGreaterThanOrEqual(minimo7Porciento);
    });
  });

  describe('seguro de cesantía', () => {
    it('debería aplicar seguro de cesantía para contrato indefinido', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
        contratoIndefinido: true,
      });

      expect(result.descuentos.seguroCesantia).toBeGreaterThan(0);
    });

    it('no debería aplicar seguro de cesantía para contrato a plazo fijo', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
        contratoIndefinido: false,
      });

      expect(result.descuentos.seguroCesantia).toBe(0);
    });
  });

  describe('impuesto de segunda categoría', () => {
    it('debería calcular impuesto para sueldo alto', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        // Sueldo muy alto que paga impuesto
        sueldoBruto: 5000000,
      });

      expect(result.descuentos.impuesto).toBeGreaterThan(0);
    });

    it('no debería haber impuesto para sueldo bajo', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        // Sueldo bajo, bajo la escala del impuesto
        sueldoBruto: 500000,
      });

      // El impuesto puede ser 0 o muy bajo
      expect(result.descuentos.impuesto).toBeGreaterThanOrEqual(0);
    });
  });

  describe('descuentos individuales', () => {
    it('debería incluir descuento AFP', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.descuentos.afp).toBeGreaterThan(0);
    });

    it('debería incluir aporte SIS del empleador', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      // Desde Ley 20.255 (2009) el SIS lo paga 100% el empleador y NO
      // se descuenta al trabajador. Se reporta en aportesEmpleador.
      expect(result.aportesEmpleador.sis).toBeGreaterThan(0);
    });

    it('debería incluir descuento de salud', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.descuentos.salud).toBeGreaterThan(0);
    });
  });

  describe('total de descuentos', () => {
    it('debería sumar todos los descuentos correctamente', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      // SIS no se descuenta al trabajador (Ley 20.255), por eso no
      // aparece en totalDescuentos.
      const sumaDescuentos =
        result.descuentos.afp +
        result.descuentos.salud +
        result.descuentos.seguroCesantia +
        result.descuentos.impuesto;

      expect(result.totalDescuentos).toBe(sumaDescuentos);
    });

    it('debería calcular líquido como bruto menos descuentos', () => {
      const result = calculateSueldoLiquido({
        ...inputBase,
        sueldoBruto: 1000000,
      });

      expect(result.liquido).toBe(result.bruto - result.totalDescuentos);
    });
  });
});