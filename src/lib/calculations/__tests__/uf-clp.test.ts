import { describe, it, expect } from 'vitest';
import { calculateUFCLP, type UFCLPInput } from '../uf-clp';
import { UF } from '@/lib/values/constants';

describe('calculateUFCLP', () => {
  const valorUFMock = UF.valor;

  describe('conversión UF a CLP', () => {
    it('debería convertir UF a CLP correctamente', () => {
      const input: UFCLPInput = {
        monto: 10,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(10 * valorUFMock);
      expect(result.direccion).toBe('uf-a-clp');
    });

    it('debería manejar monto 0', () => {
      const input: UFCLPInput = {
        monto: 0,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: UFCLPInput = {
        monto: 1.5,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(1.5 * valorUFMock);
    });
  });

  describe('conversión CLP a UF', () => {
    it('debería convertir CLP a UF correctamente', () => {
      const input: UFCLPInput = {
        monto: 400000,
        direccion: 'clp-a-uf',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(400000 / valorUFMock);
      expect(result.direccion).toBe('clp-a-uf');
    });

    it('debería manejar monto 0', () => {
      const input: UFCLPInput = {
        monto: 0,
        direccion: 'clp-a-uf',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: UFCLPInput = {
        monto: 50000,
        direccion: 'clp-a-uf',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(50000 / valorUFMock);
    });
  });

  describe('valor UF', () => {
    it('debería incluir el valor de UF en el resultado', () => {
      const input: UFCLPInput = {
        monto: 100,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.valorUF).toBe(valorUFMock);
    });

    it('usa valorUF inyectado cuando se pasa (UF en vivo)', () => {
      const artificial = 40_000;
      const result = calculateUFCLP({
        monto: 2,
        direccion: 'uf-a-clp',
        valorUF: artificial,
      });
      expect(result.valorUF).toBe(artificial);
      expect(result.montoConvertido).toBe(80_000);
    });
  });

  describe('monto original', () => {
    it('debería mantener el monto original', () => {
      const input: UFCLPInput = {
        monto: 25.5,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoOriginal).toBe(25.5);
    });
  });

  describe('casos edge', () => {
    it('debería manejar valores muy grandes', () => {
      const input: UFCLPInput = {
        monto: 1000000,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(1000000 * valorUFMock);
    });

    it('debería manejar valores muy pequeños', () => {
      const input: UFCLPInput = {
        monto: 0.001,
        direccion: 'uf-a-clp',
      };

      const result = calculateUFCLP(input);

      expect(result.montoConvertido).toBe(0.001 * valorUFMock);
    });
  });
});