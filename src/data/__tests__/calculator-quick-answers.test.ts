import { afterEach, describe, it, expect, vi } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { INGRESO_MINIMO, JORNADA_LEGAL } from '@/lib/values/constants';
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
    expect(vieja.example!.caption).not.toContain('Banco Central');
    expect(fresca.example!.caption).toContain('(Banco Central de Chile)');

    const sinFecha = getQuickAnswer('uf-clp', CTX)!;
    expect(sinFecha.example!.caption).not.toMatch(/hoy|UF del/i);
  });

  it('gratificación (E-014): tope generado, fila del umbral y sin montos escritos a mano', () => {
    const qa = getQuickAnswer('gratificacion-legal', CTX)!;
    expect(qa.h1).toBe('Calculadora de gratificación legal y tope 2026 (4,75 IMM)');
    expect(qa.lead).toContain('$2.629.377');
    expect(qa.lead).toContain('$219.115');
    expect(qa.lead).toContain('$876.459');
    const rows = qa.example!.rows;
    expect(rows.map((r) => r[0])).toEqual(['$553.553', '$800.000', '$876.459', '$1.500.000']);
    expect(rows[2]).toEqual(['$876.459', '$219.115', '$2.629.377', '4.75 IMM']);
    expect(qa.shortAnswers?.length).toBe(3);
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

  describe('sueldo-part-time: tabla de jornadas', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('filas 18, 20, 25, 30, 36 y la jornada vigente; 4 columnas', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      expect(qa.example!.headers).toHaveLength(4);
      expect(qa.example!.rows.map((r) => r[0])).toEqual([
        '18 horas',
        '20 horas',
        '25 horas',
        '30 horas',
        '36 horas',
        `${JORNADA_LEGAL.actual} horas`,
      ]);
    });

    it('20 h → mínimo proporcional (IMM × 20 ÷ jornada vigente)', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row = qa.example!.rows.find((r) => r[0] === '20 horas')!;
      expect(row[1]).toBe('Parcial: mínimo proporcional');
      expect(row[2]).toBe(formatCLP(Math.round((INGRESO_MINIMO.mensual * 20) / JORNADA_LEGAL.actual)));
    });

    it('36 h → jornada intermedia con IMM íntegro (no proporcional)', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row = qa.example!.rows.find((r) => r[0] === '36 horas')!;
      expect(row[1]).toBe('Intermedia: mínimo íntegro');
      expect(row[2]).toBe(formatCLP(INGRESO_MINIMO.mensual));
    });

    it('con IMM $553.553 al 29-10-2026: 20 h = $263.597 y caption con 42 h vigentes', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-10-29T12:00:00-03:00'));
      if (INGRESO_MINIMO.mensual !== 553_553) return; // cambia con el IMM 2027
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row20 = qa.example!.rows.find((r) => r[0] === '20 horas')!;
      expect(row20[2]).toBe('$263.597');
      expect(qa.example!.rows.at(-1)).toEqual(['42 horas', 'Completa (vigente)', '$553.553', '$3.075']);
      expect(qa.example!.caption).toContain('42 horas desde el 26 de abril de 2026');
      expect(qa.example!.caption).toContain('baja a 40 horas el 26 de abril de 2028');
      expect(qa.example!.caption).toContain('hasta 41 horas');
    });

    it('desde el 26-04-2028 la última fila es 40 h y no hay "próximo cambio"', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2028-04-26T12:00:00-04:00'));
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      expect(qa.example!.rows.at(-1)![0]).toBe('40 horas');
      expect(qa.example!.caption).not.toContain('baja a');
      expect(qa.example!.caption).toContain('hasta 39 horas');
    });
  });
});
