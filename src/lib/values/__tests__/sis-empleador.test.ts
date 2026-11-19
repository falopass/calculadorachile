import { afterEach, describe, expect, it, vi } from 'vitest';
import { AFP, getSisEmpleadorSeparado } from '@/lib/values/constants';

describe('getSisEmpleadorSeparado', () => {
  afterEach(() => vi.useRealTimers());

  it.each([
    ['2026-04-01T00:00:00', 1.62],
    ['2026-06-30T23:59:59', 1.62],
    ['2026-07-01T00:00:00', 2],
    ['2026-07-31T23:59:59', 2],
    ['2026-08-01T00:00:00', 0],
    ['2027-01-01T12:00:00', 0],
  ])('%s → %s%% separado', (fecha, tasa) => {
    expect(getSisEmpleadorSeparado(new Date(fecha))).toBe(tasa);
  });

  it('sin fecha usa la fecha actual', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T12:00:00'));
    expect(getSisEmpleadorSeparado()).toBe(2);
  });

  it('conserva la referencia AFP de abril–junio para todos los consumidores', () => {
    expect(Object.values(AFP).every((afp) => afp.sis === 1.62)).toBe(true);
  });
});
