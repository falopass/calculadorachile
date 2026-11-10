import { afterEach, describe, it, expect, vi } from 'vitest';

/**
 * El snapshot diario puede traer `fallback` o `bcentral` según la fuente
 * válida del día. Estas pruebas no leen `snapshot.json`: usan un fixture
 * mutable para aislar ambos caminos.
 */
const { pesoFixture, resetPesoFixture } = vi.hoisted(() => {
  const base = {
    valor: 0.63,
    fecha_actualizacion: '2026-11-09',
    fuente_snapshot: 'fallback',
    serie: 'F072.CLP.ARS.N.O.D' as const,
    referencial: true as const,
    fuente:
      'https://si3.bcentral.cl/siete/ES/Siete/Cuadro/CAP_TIPO_CAMBIO/MN_TIPO_CAMBIO4/TCB_520_TIPO_CAMBIO_NOMINAL?idSerie=F072.CLP.ARS.N.O.D',
  };
  const pesoFixture = { ...base };
  return {
    pesoFixture,
    resetPesoFixture() {
      Object.assign(pesoFixture, base);
    },
  };
});

vi.mock('@/lib/values/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/values/constants')>();
  return { ...actual, PESO_ARGENTINO: pesoFixture };
});

import {
  calculatePesoArgentinoClp,
  pesoArgentinoClpToResults,
  isPesoArgentinoPresentableComoHoy,
  businessDaysSince,
  seoPesoArgentino,
} from '../peso-argentino-clp';

afterEach(() => {
  resetPesoFixture();
});

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
    pesoFixture.fuente_snapshot = 'fallback';
    pesoFixture.fecha_actualizacion = '2026-11-09';
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

  it('toResults no dice «hoy» cuando bcentral tiene observación vencida', () => {
    pesoFixture.fuente_snapshot = 'bcentral';
    // Lun 03-11 frente a «hoy» 10-11 (mar) supera 3 días hábiles.
    pesoFixture.fecha_actualizacion = '2026-11-03';
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

  it('con bcentral y observación reciente el gate pasa y la etiqueta no usa «hoy»', () => {
    pesoFixture.fuente_snapshot = 'bcentral';
    pesoFixture.fecha_actualizacion = '2026-11-10';
    const r = calculatePesoArgentinoClp({
      monto: 1000,
      direccion: 'ars_a_clp',
    });
    expect(r.presentableComoHoy).toBe(true);
    expect(r.etiquetaTasa).toMatch(/observación reciente/i);
    expect(r.etiquetaTasa).not.toMatch(/\bhoy\b/i);
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
  it('con fallback no promete valor diario de hoy', () => {
    pesoFixture.fuente_snapshot = 'fallback';
    pesoFixture.fecha_actualizacion = '2026-11-09';
    const seo = seoPesoArgentino(new Date('2026-11-09T15:00:00Z'));
    expect(seo.seoDescription.toLowerCase()).not.toContain('hoy');
    expect(seo.seoTitle.toLowerCase()).not.toContain('hoy');
    expect(seo.seoDescription).toMatch(/referencial|valor del/i);
  });

  it('con bcentral y observación vencida no promete valor diario de hoy', () => {
    pesoFixture.fuente_snapshot = 'bcentral';
    pesoFixture.fecha_actualizacion = '2026-11-03';
    const seo = seoPesoArgentino(new Date('2026-11-09T15:00:00Z'));
    expect(seo.seoDescription.toLowerCase()).not.toContain('hoy');
    expect(seo.seoTitle.toLowerCase()).not.toContain('hoy');
    expect(seo.seoDescription).toMatch(/referencial|valor del/i);
  });

  it('con bcentral y observación reciente tampoco usa «hoy» en title/meta', () => {
    pesoFixture.fuente_snapshot = 'bcentral';
    pesoFixture.fecha_actualizacion = '2026-11-09';
    const seo = seoPesoArgentino(new Date('2026-11-09T20:00:00Z'));
    expect(seo.seoDescription.toLowerCase()).not.toContain('hoy');
    expect(seo.seoTitle.toLowerCase()).not.toContain('hoy');
    expect(seo.seoDescription).toMatch(/tipo de cambio nominal del Banco Central/i);
  });
});
