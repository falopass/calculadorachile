import { describe, it, expect } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { formatCLP } from '@/lib/formatters';

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

  it('uf-clp (E-018): 20 montos, fila 1.000 UF generada y lead según frescura', () => {
    const fresca = getQuickAnswer('uf-clp', {
      ...CTX,
      ufFecha: '2026-10-29T03:00:00.000Z',
      ufFresca: true,
    })!;
    expect(fresca.h1).toBe('Conversor UF a pesos: valor de hoy y tabla de montos');
    const rows = fresca.example!.rows;
    expect(rows).toHaveLength(20);
    const fila1000 = rows.find((r) => r[0] === '1.000 UF')!;
    expect(fila1000[1]).toBe(formatCLP(Math.round(1000 * CTX.uf)));
    expect(fresca.lead.startsWith('Hoy 29-10-2026 la UF vale')).toBe(true);
    expect(fresca.example!.caption).toContain('UF del 29-10-2026');
    expect(fresca.shortAnswers).toHaveLength(3);

    const vieja = getQuickAnswer('uf-clp', { ...CTX, ufFecha: '2026-10-25T03:00:00.000Z', ufFresca: false })!;
    expect(vieja.lead).not.toContain('Hoy');
    expect(vieja.lead.startsWith('Valor de referencia: la UF del 25-10-2026')).toBe(true);

    const sinFecha = getQuickAnswer('uf-clp', CTX)!;
    expect(sinFecha.example!.caption).not.toMatch(/hoy|UF del/i);
  });

  it('devuelve null para calculadoras sin entrada', () => {
    expect(getQuickAnswer('calculadora-inexistente', CTX)).toBeNull();
  });
});
