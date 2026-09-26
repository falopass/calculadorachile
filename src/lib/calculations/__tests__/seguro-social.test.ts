// ============================================
// Tests del calendario de aporte empleador (Ley 21.735)
// ----------------------------------------------
// Golden ChileAtiende ficha 130987: 1,0% ago-2025 → jul-2026 con
// SIS separado; 3,5% desde ago-2026 con SIS incluido; sube cada
// 1° de agosto hasta 8,5% en 2033.
// ============================================

import { describe, it, expect } from 'vitest';
import {
  getEscalonSeguroSocialPrevisional,
  getSeguroSocialPrevisionalVigente,
} from '@/lib/values/constants';

describe('getEscalonSeguroSocialPrevisional', () => {
  it('antes del primer escalón (2024): tasa 0 sin SIS incluido', () => {
    expect(getEscalonSeguroSocialPrevisional(new Date('2024-01-01'))).toEqual({
      tasa: 0,
      incluyeSIS: false,
    });
  });

  it('julio 2026: 1,0% y SIS se paga por separado', () => {
    expect(getEscalonSeguroSocialPrevisional(new Date('2026-07-31'))).toEqual({
      tasa: 1.0,
      incluyeSIS: false,
    });
  });

  it('agosto 2026: 3,5% con SIS incluido', () => {
    expect(getEscalonSeguroSocialPrevisional(new Date('2026-08-01'))).toEqual({
      tasa: 3.5,
      incluyeSIS: true,
    });
  });

  it('agosto 2033 en adelante: tasa máxima 8,5%', () => {
    expect(getEscalonSeguroSocialPrevisional(new Date('2033-08-01'))).toEqual({
      tasa: 8.5,
      incluyeSIS: true,
    });
    expect(getEscalonSeguroSocialPrevisional(new Date('2034-06-15'))).toEqual({
      tasa: 8.5,
      incluyeSIS: true,
    });
  });

  it('escalón intermedio: julio 2028 sigue en 4,25% (sube cada agosto)', () => {
    expect(getEscalonSeguroSocialPrevisional(new Date('2028-07-15'))).toEqual({
      tasa: 4.25,
      incluyeSIS: true,
    });
    expect(getEscalonSeguroSocialPrevisional(new Date('2028-08-01'))).toEqual({
      tasa: 5.0,
      incluyeSIS: true,
    });
  });
});

describe('getSeguroSocialPrevisionalVigente', () => {
  it('devuelve solo la tasa del escalón vigente', () => {
    expect(getSeguroSocialPrevisionalVigente(new Date('2026-07-31'))).toBe(1.0);
    expect(getSeguroSocialPrevisionalVigente(new Date('2026-08-01'))).toBe(3.5);
  });
});
