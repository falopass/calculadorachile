import { describe, it, expect } from 'vitest';
import { calculateUTMCLP, type UtmClpInput } from '../utm-clp';
import { UTM } from '@/lib/values/constants';

describe('calculateUTMCLP', () => {
  const valorUTMMock = UTM.valor;

  describe('conversión UTM a CLP', () => {
    it('debería convertir UTM a CLP correctamente', () => {
      const input: UtmClpInput = {
        monto: 10,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(10 * valorUTMMock);
      expect(result.direccion).toBe('utm-a-clp');
    });

    it('debería manejar monto 0', () => {
      const input: UtmClpInput = {
        monto: 0,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: UtmClpInput = {
        monto: 1.5,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(1.5 * valorUTMMock);
    });
  });

  describe('conversión CLP a UTM', () => {
    it('debería convertir CLP a UTM correctamente', () => {
      const input: UtmClpInput = {
        monto: 700000,
        direccion: 'clp-a-utm',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(700000 / valorUTMMock);
      expect(result.direccion).toBe('clp-a-utm');
    });

    it('debería manejar monto 0', () => {
      const input: UtmClpInput = {
        monto: 0,
        direccion: 'clp-a-utm',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(0);
    });

    it('debería manejar montos decimales', () => {
      const input: UtmClpInput = {
        monto: 50000,
        direccion: 'clp-a-utm',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(50000 / valorUTMMock);
    });
  });

  describe('valor UTM', () => {
    it('debería incluir el valor de UTM en el resultado', () => {
      const input: UtmClpInput = {
        monto: 100,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.valorUtm).toBe(valorUTMMock);
    });
  });

  describe('monto original', () => {
    it('debería mantener el monto original', () => {
      const input: UtmClpInput = {
        monto: 25.5,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoOriginal).toBe(25.5);
    });
  });

  describe('casos edge', () => {
    it('debería manejar valores muy grandes', () => {
      const input: UtmClpInput = {
        monto: 1000000,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(1000000 * valorUTMMock);
    });

    it('debería manejar valores muy pequeños', () => {
      const input: UtmClpInput = {
        monto: 0.001,
        direccion: 'utm-a-clp',
      };

      const result = calculateUTMCLP(input);

      expect(result.montoConvertido).toBe(0.001 * valorUTMMock);
    });
  });
});