import { describe, it, expect } from 'vitest';
import { parseNumberInput } from '../parse-number-input';

describe('parseNumberInput', () => {
  it('formato chileno: miles con punto y decimal con coma', () => {
    expect(parseNumberInput('1.234.567')).toBe(1234567);
    expect(parseNumberInput('4,5')).toBe(4.5);
    expect(parseNumberInput('1.234,5')).toBe(1234.5);
  });
  it('en campos enteros "4.5" sigue siendo 45 (punto = miles)', () => {
    expect(parseNumberInput('4.5')).toBe(45);
  });
  it('en campos decimales acepta punto decimal de 1–2 dígitos', () => {
    expect(parseNumberInput('4.5', true)).toBe(4.5);
    expect(parseNumberInput('6.28', true)).toBe(6.28);
    expect(parseNumberInput('3.500', true)).toBe(3500);
    expect(parseNumberInput('4,', true)).toBe(4);
  });
  it('vacío o basura → 0', () => {
    expect(parseNumberInput('')).toBe(0);
    expect(parseNumberInput('abc')).toBe(0);
  });
  it('rechaza texto inválido solo al activar la validación estricta', () => {
    for (const value of ['½', 'texto', '2abc', '', '2,5,3']) {
      expect(parseNumberInput(value, true, true)).toBeNaN();
    }
    expect(parseNumberInput('2.0', true, true)).toBe(2);
    expect(parseNumberInput('-2.0', true, true)).toBe(-2);
    expect(parseNumberInput('2,5', true, true)).toBe(2.5);
    expect(parseNumberInput('½')).toBe(0);
  });
});
