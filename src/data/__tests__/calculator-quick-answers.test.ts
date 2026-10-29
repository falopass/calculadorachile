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
  'sueldo-part-time',
  'factor-hora-extra',
  'tope-imponible-90-uf',
  'sueldo-casa-particular',
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

  it('vacaciones (E-017): tabla de 1 a 11 meses; 6 meses = 10,5 corridos y $280.000', () => {
    const qa = getQuickAnswer('vacaciones-proporcionales', CTX)!;
    const rows = qa.example!.rows;
    expect(rows.length).toBe(11);
    expect(rows.map((r) => Number(r[0]))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const seis = rows.find((r) => r[0] === '6')!;
    expect(seis).toContain('10,5');
    expect(seis).toContain('$280.000');
    expect(rows.find((r) => r[0] === '11')).toContain('20,75');
    expect(qa.shortAnswers?.length).toBe(3);
    expect(qa.lead).toContain('$280.000');
  });

  it('devuelve null para calculadoras sin entrada', () => {
    expect(getQuickAnswer('calculadora-inexistente', CTX)).toBeNull();
  });
});
