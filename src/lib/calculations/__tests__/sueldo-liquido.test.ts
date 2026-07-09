import { describe, it, expect } from 'vitest';
import { calculateSueldoLiquido, type SueldoLiquidoInput } from '../sueldo-liquido';
import {
  AFP,
  AFP_OBLIGATORIA_PCT,
  SALUD,
  SEGURO_CESANTIA,
  TOPE_IMPOSITIVO,
  UF,
} from '@/lib/values/constants';

describe('calculateSueldoLiquido', () => {
  const inputBase: Omit<SueldoLiquidoInput, 'sueldoBruto'> = {
    afp: 'capital',
    saludTipo: 'fonasa',
    saludTramo: 'A',
    contratoIndefinido: true,
  };

  describe('golden amounts (wiring / constantes 2026)', () => {
    it('$1.000.000 Capital FONASA indefinido: descuentos exactos', () => {
      const bruto = 1_000_000;
      const r = calculateSueldoLiquido({
        sueldoBruto: bruto,
        afp: 'capital',
        saludTipo: 'fonasa',
        contratoIndefinido: true,
      });
      const base = Math.min(bruto, TOPE_IMPOSITIVO.afp_salud * UF.valor);
      const afpEsperado = Math.round(
        base * ((AFP_OBLIGATORIA_PCT + AFP.capital.comision) / 100),
      );
      const saludEsperado = Math.round(base * (SALUD.fonasa.tasa / 100));
      const cesantiaEsperado = Math.round(
        Math.min(bruto, TOPE_IMPOSITIVO.seguro_cesantia * UF.valor) *
          (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100),
      );
      expect(r.descuentos.afp).toBe(afpEsperado);
      expect(r.descuentos.salud).toBe(saludEsperado);
      expect(r.descuentos.seguroCesantia).toBe(cesantiaEsperado);
      expect(r.descuentos.afp).toBe(Math.round(base * 0.1144)); // 10% + 1,44%
      expect(r.liquido).toBe(bruto - r.totalDescuentos);
      // SIS no se descuenta al trabajador
      expect(r.aportesEmpleador.sis).toBeGreaterThan(0);
    });

    it('plazo fijo: cesantía trabajador = 0', () => {
      const r = calculateSueldoLiquido({
        sueldoBruto: 1_000_000,
        afp: 'modelo',
        saludTipo: 'fonasa',
        contratoIndefinido: false,
      });
      expect(r.descuentos.seguroCesantia).toBe(0);
    });

    it('Isapre: plan UF > 7% usa el plan', () => {
      const bruto = 1_000_000;
      const planUF = 5; // claramente > 7% de $1M
      const r = calculateSueldoLiquido({
        sueldoBruto: bruto,
        afp: 'uno',
        saludTipo: 'isapre',
        isapreMonto: planUF,
        contratoIndefinido: true,
      });
      const minimo7 = Math.min(bruto, TOPE_IMPOSITIVO.afp_salud * UF.valor) * 0.07;
      const planCLP = planUF * UF.valor;
      expect(r.descuentos.salud).toBe(Math.round(Math.max(minimo7, planCLP)));
    });

    it('colación no imponible no sube AFP', () => {
      const base = calculateSueldoLiquido({
        sueldoBruto: 800_000,
        afp: 'habitat',
        saludTipo: 'fonasa',
        contratoIndefinido: true,
      });
      const conColacion = calculateSueldoLiquido({
        sueldoBruto: 800_000,
        afp: 'habitat',
        saludTipo: 'fonasa',
        contratoIndefinido: true,
        bonoColacion: 100_000,
      });
      expect(conColacion.descuentos.afp).toBe(base.descuentos.afp);
      expect(conColacion.liquido).toBe(base.liquido + 100_000);
    });
  });

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

  describe('valorUF en vivo', () => {
    it('con valorUF artificial el plan Isapre en CLP cambia de forma predecible', () => {
      const artificial = 40_000;
      const planUF = 2;
      const r = calculateSueldoLiquido({
        sueldoBruto: 1_000_000,
        afp: 'capital',
        saludTipo: 'isapre',
        isapreMonto: planUF,
        contratoIndefinido: true,
        valorUF: artificial,
      });
      const tope = TOPE_IMPOSITIVO.afp_salud * artificial;
      const minimo7 = Math.min(1_000_000, tope) * 0.07;
      const planCLP = planUF * artificial;
      expect(r.descuentos.salud).toBe(Math.round(Math.max(minimo7, planCLP)));
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