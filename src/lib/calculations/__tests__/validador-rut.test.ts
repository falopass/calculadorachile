import { describe, it, expect } from 'vitest';
import {
  calcularDigitoVerificador,
  formatearRut,
  validateRut,
  validadorRutToResults,
} from '../validador-rut';

describe('calcularDigitoVerificador', () => {
  it('calcula dígitos conocidos (golden)', () => {
    // Pares cuerpo → dígito verificados con el algoritmo módulo 11.
    const casos: [string, string][] = [
      ['12345678', '5'],
      ['11111111', '1'],
      ['22222222', '2'],
      ['7654321', '6'],
      ['99999999', '9'],
      ['1', '9'],
      ['999999999', '6'],
    ];
    for (const [cuerpo, dv] of casos) {
      expect(calcularDigitoVerificador(cuerpo), cuerpo).toBe(dv);
    }
  });

  it('genera dígito K cuando corresponde', () => {
    expect(calcularDigitoVerificador('10000013')).toBe('K');
  });
});

describe('formatearRut', () => {
  it('agrega puntos de miles y guion', () => {
    expect(formatearRut('12345678', '5')).toBe('12.345.678-5');
    expect(formatearRut('7654321', '6')).toBe('7.654.321-6');
    expect(formatearRut('999999999', '6')).toBe('999.999.999-6');
  });
});

describe('validateRut', () => {
  it('acepta RUT válido con puntos y guion', () => {
    const r = validateRut({ rut: '12.345.678-5' });
    expect(r.parseable).toBe(true);
    expect(r.esValido).toBe(true);
    expect(r.digitoEsperado).toBe('5');
    expect(r.rutFormateado).toBe('12.345.678-5');
  });

  it('acepta RUT válido sin puntos y sin guion', () => {
    const r = validateRut({ rut: '123456785' });
    expect(r.parseable).toBe(true);
    expect(r.esValido).toBe(true);
  });

  it('acepta dígito K en minúscula y con guion', () => {
    const r = validateRut({ rut: '10.000.013-k' });
    expect(r.parseable).toBe(true);
    expect(r.esValido).toBe(true);
    expect(r.digitoEsperado).toBe('K');
    expect(r.rutFormateado).toBe('10.000.013-K');
  });

  it('rechaza dígito verificador incorrecto pero informa el esperado', () => {
    const r = validateRut({ rut: '12.345.678-9' });
    expect(r.parseable).toBe(true);
    expect(r.esValido).toBe(false);
    expect(r.digitoIngresado).toBe('9');
    expect(r.digitoEsperado).toBe('5');
  });

  it('tolera espacios', () => {
    const r = validateRut({ rut: ' 12.345.678-5 ' });
    expect(r.parseable).toBe(true);
    expect(r.esValido).toBe(true);
  });

  it('rechaza entrada vacía', () => {
    const r = validateRut({ rut: '   ' });
    expect(r.parseable).toBe(false);
    expect(r.error).toBe('vacio');
  });

  it('rechaza letras distintas de K', () => {
    const r = validateRut({ rut: '12.345.67A-5' });
    expect(r.parseable).toBe(false);
    expect(r.error).toBe('formato');
  });

  it('rechaza cuerpo demasiado corto', () => {
    const r = validateRut({ rut: '123456-5' });
    expect(r.parseable).toBe(false);
    expect(r.error).toBe('largo');
  });

  it('rechaza cuerpo demasiado largo', () => {
    const r = validateRut({ rut: '1234567890-5' });
    expect(r.parseable).toBe(false);
    expect(r.error).toBe('largo');
  });
});

describe('validadorRutToResults', () => {
  it('destaca RUT válido e incluye dígito y formato', () => {
    const rows = validadorRutToResults(validateRut({ rut: '12.345.678-5' }));
    expect(rows[0].highlight).toBe(true);
    expect(rows[0].textValue).toBe('RUT válido');
    expect(rows.map((r) => r.textValue)).toContain('5');
    expect(rows.map((r) => r.textValue)).toContain('12.345.678-5');
  });

  it('en RUT inválido explica el dígito esperado', () => {
    const rows = validadorRutToResults(validateRut({ rut: '12.345.678-9' }));
    expect(rows[0].textValue).toBe('RUT inválido');
    expect(rows[0].note?.text).toContain('5');
  });

  it('con entrada no interpretable devuelve solo el mensaje de error', () => {
    const rows = validadorRutToResults(validateRut({ rut: 'abc' }));
    expect(rows).toHaveLength(1);
    expect(rows[0].highlight).toBe(true);
    expect(rows[0].textValue).toContain('Formato');
  });
});
