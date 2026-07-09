import { describe, it, expect } from 'vitest';
import { coerceBool, coerceNumber } from '../input-coerce';

describe('coerceNumber', () => {
  it('pasa números finitos', () => {
    expect(coerceNumber(42)).toBe(42);
    expect(coerceNumber(0)).toBe(0);
    expect(coerceNumber(1.5)).toBe(1.5);
  });

  it('parsea strings numéricos', () => {
    expect(coerceNumber('1000')).toBe(1000);
    expect(coerceNumber('3.5')).toBe(3.5);
  });

  it('usa fallback en vacío/NaN', () => {
    expect(coerceNumber('', 7)).toBe(7);
    expect(coerceNumber(null, 3)).toBe(3);
    expect(coerceNumber(undefined, 1)).toBe(1);
    expect(coerceNumber(NaN, 9)).toBe(9);
    expect(coerceNumber('abc', 0)).toBe(0);
  });
});

describe('coerceBool', () => {
  it('acepta boolean y string true/false', () => {
    expect(coerceBool(true)).toBe(true);
    expect(coerceBool('true')).toBe(true);
    expect(coerceBool(false)).toBe(false);
    expect(coerceBool('false')).toBe(false);
  });

  it('usa fallback en valores desconocidos', () => {
    expect(coerceBool(undefined, true)).toBe(true);
    expect(coerceBool('maybe')).toBe(false);
  });
});
