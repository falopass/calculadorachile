import { describe, it, expect } from 'vitest';
import { calculateIVA, type IVAInput } from '../iva';
import { IVA } from '@/lib/values/constants';

describe('calculateIVA', () => {
  const tasaIVA = IVA.tasa / 100; // 0.19

  describe('agregar IVA', () => {
    it('debería agregar IVA correctamente', () => {
      const input: IVAInput = {
        monto: 100000,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(100000 * tasaIVA);
      expect(result.montoConIVA).toBe(100000 * (1 + tasaIVA));
      expect(result.montoSinIVA).toBe(100000);
    });

    it('debería manejar monto 0', () => {
      const input: IVAInput = {
        monto: 0,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(0);
      expect(result.montoConIVA).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: IVAInput = {
        monto: 50000.50,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.montoSinIVA).toBe(50000.50);
      expect(result.iva).toBe(50000.50 * tasaIVA);
    });
  });

  describe('quitar IVA', () => {
    it('debería quitar IVA correctamente', () => {
      const input: IVAInput = {
        monto: 119000,
        tipo: 'quitar-iva',
      };

      const result = calculateIVA(input);

      // monto / 1.19 = monto sin IVA
      expect(result.montoSinIVA).toBe(119000 / (1 + tasaIVA));
      expect(result.montoConIVA).toBe(119000);
      expect(result.iva).toBe(119000 - (119000 / (1 + tasaIVA)));
    });

    it('debería manejar monto 0', () => {
      const input: IVAInput = {
        monto: 0,
        tipo: 'quitar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(0);
      expect(result.montoSinIVA).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: IVAInput = {
        monto: 119000.50,
        tipo: 'quitar-iva',
      };

      const result = calculateIVA(input);

      expect(result.montoConIVA).toBe(119000.50);
      expect(result.iva).toBe(119000.50 - (119000.50 / (1 + tasaIVA)));
    });
  });

  describe('consistencia matemática', () => {
    it('debería mantener consistencia: monto con IVA = monto sin IVA + IVA', () => {
      const input: IVAInput = {
        monto: 100000,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.montoConIVA).toBe(result.montoSinIVA + result.iva);
    });

    it('debería mantener consistencia al quitar IVA', () => {
      const input: IVAInput = {
        monto: 119000,
        tipo: 'quitar-iva',
      };

      const result = calculateIVA(input);

      expect(result.montoConIVA).toBe(result.montoSinIVA + result.iva);
    });

    it('debería dar el mismo resultado al agregar y quitar IVA', () => {
      const monto = 100000;
      
      const agregarResult = calculateIVA({ monto, tipo: 'agregar-iva' });
      const quitarResult = calculateIVA({ monto: agregarResult.montoConIVA, tipo: 'quitar-iva' });

      expect(quitarResult.montoSinIVA).toBe(monto);
    });
  });

  describe('IVA correcto', () => {
    it('debería calcular el 19% de IVA', () => {
      const input: IVAInput = {
        monto: 1000000,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(190000);
    });
  });

  describe('monto original', () => {
    it('debería mantener el monto original', () => {
      const input: IVAInput = {
        monto: 50000,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.montoOriginal).toBe(50000);
    });
  });

  describe('casos edge', () => {
    it('debería manejar valores muy grandes', () => {
      const input: IVAInput = {
        monto: 100000000,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(100000000 * tasaIVA);
    });

    it('debería manejar valores muy pequeños', () => {
      const input: IVAInput = {
        monto: 1,
        tipo: 'agregar-iva',
      };

      const result = calculateIVA(input);

      expect(result.iva).toBe(1 * tasaIVA);
    });
  });
});