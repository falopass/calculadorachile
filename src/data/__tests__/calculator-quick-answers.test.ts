import { describe, it, expect } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

const CTX = { uf: FALLBACK_VALUES.uf, utm: FALLBACK_VALUES.utm };

const IDS = [
  'iva',
  'credito-automotriz',
  'vacaciones-proporcionales',
  'asignacion-familiar',
  'gratificacion-legal',
  'impuesto-segunda-categoria',
  'sueldo-liquido',
  'horas-extra',
  'finiquito',
  'utm-clp',
  'uf-clp',
];

describe('getQuickAnswer', () => {
  it('IVA: neto 100.000 → IVA 19.000 y total 119.000', () => {
    const qa = getQuickAnswer('iva', CTX);
    expect(qa).not.toBeNull();
    const row = qa!.example!.rows.find((r) => r[0] === '$100.000');
    expect(row).toEqual(['$100.000', '$19.000', '$119.000']);
  });

  it('cada entrada tiene lead no vacío y filas no vacías', () => {
    for (const id of IDS) {
      const qa = getQuickAnswer(id, CTX);
      expect(qa, `falta quick answer para ${id}`).not.toBeNull();
      expect(qa!.lead.trim().length).toBeGreaterThan(0);
      if (qa!.example) {
        expect(qa!.example.rows.length).toBeGreaterThan(0);
        for (const row of qa!.example.rows) {
          expect(row.length).toBe(qa!.example!.headers.length);
          for (const cell of row) {
            expect(cell.trim().length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('ninguna celda contiene "NaN" ni "undefined"', () => {
    for (const id of IDS) {
      const qa = getQuickAnswer(id, CTX);
      const cells = [
        qa?.lead,
        qa?.h1,
        ...(qa?.example?.headers ?? []),
        ...(qa?.example?.rows.flat() ?? []),
      ];
      for (const cell of cells) {
        expect(cell, `${id} contiene NaN/undefined`).not.toMatch(/NaN|undefined/);
      }
    }
  });

  it('devuelve null para calculadoras sin entrada', () => {
    expect(getQuickAnswer('calculadora-inexistente', CTX)).toBeNull();
  });
});
