import { describe, it, expect } from 'vitest';
import {
  calculatePesoArgentinoClp,
  pesoArgentinoClpToResults,
  isPesoArgentinoPresentableComoHoy,
  businessDaysSince,
  seoPesoArgentino,
} from '../peso-argentino-clp';
import { PESO_ARGENTINO } from '@/lib/values/constants';

describe('calculatePesoArgentinoClp', () => {
  it('ARS → CLP redondea a entero', () => {
    const r = calculatePesoArgentinoClp({
      monto: 1000,
      direccion: 'ars_a_clp',
      tasaPersonalizada: 0.63,
    });
    expect(r.resultado).toBe(630);
    expect(r.usoTasaSitio).toBe(false);
    expect(r.presentableComoHoy).toBe(false);
  });

  it('CLP → ARS con 2 decimales', () => {
    const r = calculatePesoArgentinoClp({
      monto: 6300,
      direccion: 'clp_a_ars',
      tasaPersonalizada: 0.63,
    });
    expect(r.resultado).toBe(10000);
  });

  it('tasa ≤ 0 lanza error', () => {
    expect(() =>
      calculatePesoArgentinoClp({
        monto: 100,
        direccion: 'ars_a_clp',
        tasaPersonalizada: 0,
      }),
    ).toThrow(/No hay tipo de cambio/);
  });

  it('toResults no dice «hoy» cuando el gate falla (snapshot fallback)', () => {
    // Snapshot del lote: sources.pesoArgentino === 'fallback'
    expect(PESO_ARGENTINO.fuente_snapshot).toBe('fallback');
    const r = calculatePesoArgentinoClp({
      monto: 1000,
      direccion: 'ars_a_clp',
    });
    expect(r.presentableComoHoy).toBe(false);
    expect(r.etiquetaTasa).toMatch(/Valor referencial del/i);
    expect(r.etiquetaTasa).not.toMatch(/\bhoy\b/i);
    const rows = pesoArgentinoClpToResults(r);
    expect(rows[1]?.note?.text).toMatch(/Valor referencial del/i);
  });
});

describe('E-050 gate isPesoArgentinoPresentableComoHoy', () => {
  it('fallback nunca es «hoy»', () => {
    expect(
      isPesoArgentinoPresentableComoHoy('fallback', '2026-11-09', new Date('2026-11-09T15:00:00Z')),
    ).toBe(false);
  });

  it('fuente viva + observación de hoy es presentable', () => {
    expect(
      isPesoArgentinoPresentableComoHoy('bcentral', '2026-11-09', new Date('2026-11-09T20:00:00Z')),
    ).toBe(true);
  });

  it('fuente viva + observación con más de 3 días hábiles no es «hoy»', () => {
    // Lun 09-11; 3 hábiles atrás = mié 04-11; observación 03-11 (lun) → >3
    expect(
      isPesoArgentinoPresentableComoHoy('bcentral', '2026-11-03', new Date('2026-11-09T15:00:00Z')),
    ).toBe(false);
  });

  it('fuente viva + observación dentro de 3 días hábiles sí es presentable', () => {
    // Vie 06-11 → Lun 09-11 = 1 día hábil (lun)
    expect(
      isPesoArgentinoPresentableComoHoy('bcentral', '2026-11-06', new Date('2026-11-09T15:00:00Z')),
    ).toBe(true);
  });
});

describe('businessDaysSince', () => {
  it('vie→lun cuenta 1 hábil', () => {
    expect(businessDaysSince('2026-11-06', new Date('2026-11-09T15:00:00Z'))).toBe(1);
  });
});

describe('seoPesoArgentino', () => {
  it('con fallback actual no promete valor diario de hoy', () => {
    const seo = seoPesoArgentino(new Date('2026-11-09T15:00:00Z'));
    expect(seo.seoDescription.toLowerCase()).not.toContain('hoy');
    expect(seo.seoDescription).toMatch(/referencial|valor del/i);
  });
});
