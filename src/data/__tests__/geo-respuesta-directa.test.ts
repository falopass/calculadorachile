import { describe, it, expect } from 'vitest';
import { getQuickAnswer, buildUTMLeadParts } from '../calculator-quick-answers';
import { SUELDO_MINIMO_RESPUESTA_DIRECTA, getArticleBySlug } from '../articles';
import { FALLBACK_VALUES } from '@/lib/values/fallback';

const CTX = { uf: FALLBACK_VALUES.uf, utm: FALLBACK_VALUES.utm };

describe('E-016 respuesta directa: UTM', () => {
  it('con UTM fresca de octubre 2026 muestra monto, mes, último día y UTA', () => {
    const qa = getQuickAnswer('utm-clp', {
      ...CTX,
      utmFresca: { value: 72_151, date: '2026-10-01T03:00:00.000Z' },
    });
    expect(qa!.lead).toBe(
      'Una UTM vale $72.151 en octubre de 2026: es el valor que fija el SII y rige del 1 al 31 de octubre. Se reajusta cada mes según el IPC, y 12 UTM forman 1 UTA ($865.812).',
    );
    expect(qa!.leadParts).toContainEqual({
      text: 'SII',
      href: 'https://www.sii.cl/valores_y_fechas/utm/utm2026.htm',
    });
  });

  it('noviembre 2026: rige del 1 al 30 y UTA $869.280', () => {
    const lead = buildUTMLeadParts({ value: 72_440, date: '2026-11-01T03:00:00.000Z' })
      .map((p) => (typeof p === 'string' ? p : p.text))
      .join('');
    expect(lead).toContain('$72.440 en noviembre de 2026');
    expect(lead).toContain('del 1 al 30 de noviembre');
    expect(lead).toContain('1 UTA ($869.280)');
  });

  it('sin UTM fresca no muestra ningún monto (ni snapshot ni fallback)', () => {
    const qa = getQuickAnswer('utm-clp', { ...CTX, utmFresca: null });
    expect(qa!.lead).not.toMatch(/\$\s?\d/);
    expect(qa!.lead).toContain('SII');
    expect(qa!.lead).toContain('12 UTM forman 1 UTA');
  });

  it('ejemplo incluye 0,5 y 3 UTM con el valor fresco', () => {
    const qa = getQuickAnswer('utm-clp', {
      ...CTX,
      utmFresca: { value: 72_151, date: '2026-10-01T03:00:00.000Z' },
    });
    expect(qa!.example!.rows).toContainEqual(['0,5 UTM', '$36.076']);
    expect(qa!.example!.rows).toContainEqual(['3 UTM', '$216.453']);
    expect(qa!.example!.rows).toContainEqual(['12 UTM (1 UTA)', '$865.812']);
  });
});

describe('E-016 respuesta directa: finiquito', () => {
  it('lead con constantes de indemnización y fuentes', () => {
    const qa = getQuickAnswer('finiquito', CTX);
    expect(qa!.lead).toContain('máximo 11 años y con una base de hasta 90 UF');
    expect(qa!.lead).toContain('dentro de 10 días hábiles');
    expect(qa!.lead).not.toMatch(/\$\s?\d/);
    expect(qa!.shortAnswers).toHaveLength(3);
    for (const sa of qa!.shortAnswers!) expect(sa.sources.length).toBeGreaterThan(0);
  });
});

describe('E-016 respuesta directa: sueldo mínimo', () => {
  it('interpola IMM, fecha y líquidos de la calculadora', () => {
    expect(SUELDO_MINIMO_RESPUESTA_DIRECTA).toContain('<strong>$553.553 brutos al mes</strong>');
    expect(SUELDO_MINIMO_RESPUESTA_DIRECTA).toContain('desde el 1 de mayo de 2026');
    expect(SUELDO_MINIMO_RESPUESTA_DIRECTA).toContain('Ley 21.830, Dirección del Trabajo');
    expect(SUELDO_MINIMO_RESPUESTA_DIRECTA).toContain(
      'quedan entre <strong>$448.101</strong> y <strong>$453.581</strong> líquidos',
    );
    expect(SUELDO_MINIMO_RESPUESTA_DIRECTA).not.toMatch(/2027/);
    const art = getArticleBySlug('sueldo-minimo-2026-calcular-liquido');
    expect(art!.content).toContain(SUELDO_MINIMO_RESPUESTA_DIRECTA);
  });
});
