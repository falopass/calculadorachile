import { describe, expect, it } from 'vitest';
import { buildCvlistoCartaUrl } from '../cvlisto';
import {
  buildSitiazoUrl,
  isSitiazoCtaCalculator,
} from '../sitiazo';

describe('buildCvlistoCartaUrl', () => {
  it('apunta a la herramienta de carta con UTMs y sufijo _carta', () => {
    const url = new URL(
      buildCvlistoCartaUrl({
        origen: 'finiquito',
        placement: 'after_result',
        calculatorId: 'finiquito',
      }),
    );
    expect(url.origin).toBe('https://cvlisto.cl');
    expect(url.pathname).toBe('/herramientas/carta-presentacion');
    expect(url.searchParams.get('utm_source')).toBe('calculachile');
    expect(url.searchParams.get('utm_medium')).toBe('referral');
    expect(url.searchParams.get('utm_campaign')).toBe('ecosistema_laboral');
    expect(url.searchParams.get('utm_content')).toBe(
      'finiquito_after_result_carta',
    );
    expect(url.searchParams.get('origen')).toBe('finiquito');
  });
});

describe('buildSitiazoUrl', () => {
  it('construye la URL de sitiazo.cl con UTMs de ecosistema pymes', () => {
    const url = new URL(buildSitiazoUrl('patente-comercial'));
    expect(url.origin).toBe('https://sitiazo.cl');
    expect(url.searchParams.get('utm_source')).toBe('calculachile');
    expect(url.searchParams.get('utm_medium')).toBe('referral');
    expect(url.searchParams.get('utm_campaign')).toBe('ecosistema_pymes');
    expect(url.searchParams.get('utm_content')).toBe(
      'patente-comercial_after_result',
    );
  });

  it('usa el placement en utm_content', () => {
    const url = new URL(buildSitiazoUrl('iva', 'after_result'));
    expect(url.searchParams.get('utm_content')).toBe('iva_after_result');
  });

  it('acepta contentId de blog/guía como clave', () => {
    const url = new URL(
      buildSitiazoUrl('blog_patente-comercial-2027-calcular', 'blog_footer'),
    );
    expect(url.searchParams.get('utm_content')).toBe(
      'blog_patente-comercial-2027-calcular_blog_footer',
    );
  });
});

describe('isSitiazoCtaCalculator', () => {
  it('reconoce las calculadoras pyme', () => {
    expect(isSitiazoCtaCalculator('patente-comercial')).toBe(true);
    expect(isSitiazoCtaCalculator('iva')).toBe(true);
  });

  it('rechaza calculadoras fuera de la allowlist', () => {
    expect(isSitiazoCtaCalculator('finiquito')).toBe(false);
    expect(isSitiazoCtaCalculator('')).toBe(false);
  });
});
