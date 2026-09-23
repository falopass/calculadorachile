import { describe, it, expect } from 'vitest';
import { pickLatestNotFuture } from '../bcentral';

describe('pickLatestNotFuture', () => {
  const values = [
    { fecha: '2026-09-21', valor: 40800.0 },
    { fecha: '2026-09-22', valor: 40850.5 },
    { fecha: '2026-09-23', valor: 40900.0 },
    { fecha: '2026-09-24', valor: 40910.0 },
    { fecha: '2026-09-25', valor: 40920.0 },
  ];

  it('ignora observaciones con fecha posterior a hoy (UF publicada por adelantado)', () => {
    expect(pickLatestNotFuture(values, '2026-09-23')).toEqual({
      fecha: '2026-09-23',
      valor: 40900.0,
    });
  });

  it('incluye la observación del propio día', () => {
    expect(pickLatestNotFuture(values, '2026-09-24')).toEqual({
      fecha: '2026-09-24',
      valor: 40910.0,
    });
  });

  it('toma la última cuando ninguna es futura', () => {
    expect(pickLatestNotFuture(values, '2026-09-30')).toEqual({
      fecha: '2026-09-25',
      valor: 40920.0,
    });
  });

  it('devuelve null si todas las observaciones son futuras o la lista está vacía', () => {
    expect(pickLatestNotFuture(values, '2026-09-20')).toBeNull();
    expect(pickLatestNotFuture([], '2026-09-23')).toBeNull();
  });

  it('descarta observaciones con valor no numérico', () => {
    const bad = [
      { fecha: '2026-09-22', valor: 40850.5 },
      { fecha: '2026-09-23', valor: NaN },
    ];
    expect(pickLatestNotFuture(bad, '2026-09-23')).toEqual({
      fecha: '2026-09-22',
      valor: 40850.5,
    });
  });
});
