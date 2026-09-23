// ============================================
// Tests de contribuciones (impuesto territorial)
// ----------------------------------------------
// Golden cases del ejemplo oficial de la guía SII
// "guía para calcular contribución" (parámetros 2022)
// más casos con los parámetros vigentes del
// 2º semestre 2026.
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculateContribuciones,
  type ContribucionesParams,
} from '../contribuciones';
import { CONTRIBUCIONES_BIENES_RAICES } from '@/lib/values/constants';

// Parámetros del ejemplo oficial SII (guía PDF 2022).
const PARAMS_2022: ContribucionesParams = {
  vigencia: '2022-01-01',
  periodoLabel: '1er semestre 2022',
  exencionHabitacional: 47_360_490,
  umbralCambioTasa: 169_144_585,
  tasaHabitacionalBaja: 0.893,
  tasaGeneral: 1.042,
  sobretasaFiscal: 0.025,
};

describe('calculateContribuciones — golden SII (guía 2022)', () => {
  it('casa avalúo $179.793.163 → $1.201.152 anual', () => {
    // Ejemplo oficial: umbral se compara contra el avalúo TOTAL.
    const r = calculateContribuciones(
      { avaluoFiscal: 179_793_163, destino: 'habitacional' },
      PARAMS_2022,
    );
    expect(r.netaTramoBajo).toBe(1_087_532);
    expect(r.netaTramoAlto).toBe(110_958);
    expect(r.sobretasaFiscal).toBe(2_662);
    expect(r.contribucionAnual).toBe(1_201_152);
    expect(r.contribucionCuota).toBe(300_288);
  });

  it('negocio avalúo $100.000.000 → $1.067.000 anual', () => {
    const r = calculateContribuciones(
      { avaluoFiscal: 100_000_000, destino: 'comercial' },
      PARAMS_2022,
    );
    expect(r.netaTramoAlto).toBe(1_042_000);
    expect(r.sobretasaFiscal).toBe(25_000);
    expect(r.contribucionAnual).toBe(1_067_000);
  });

  it('eriazо urbano avalúo $100.000.000 → $2.109.000 anual', () => {
    const r = calculateContribuciones(
      { avaluoFiscal: 100_000_000, destino: 'sitio_eriado' },
      PARAMS_2022,
    );
    expect(r.netaTramoAlto).toBe(1_042_000);
    expect(r.sobretasaFiscal).toBe(25_000);
    expect(r.sobretasaSitio).toBe(1_042_000);
    expect(r.contribucionAnual).toBe(2_109_000);
  });
});

describe('calculateContribuciones — parámetros 2º semestre 2026', () => {
  const P = CONTRIBUCIONES_BIENES_RAICES;

  it('habitacional con avalúo = exención queda exento', () => {
    const r = calculateContribuciones({
      avaluoFiscal: P.exencionHabitacional,
      destino: 'habitacional',
    });
    expect(r.exento).toBe(true);
    expect(r.contribucionAnual).toBe(0);
    expect(r.contribucionCuota).toBe(0);
    expect(r.contribucionSemestral).toBe(0);
  });

  it('habitacional $100.000.000 → $341.916 anual', () => {
    // (100.000.000 − 61.711.570) × 0,893% = 38.288.430 × 0,893% = 341.916
    const r = calculateContribuciones({
      avaluoFiscal: 100_000_000,
      destino: 'habitacional',
    });
    expect(r.exento).toBe(false);
    expect(r.netaTramoBajo).toBe(341_916);
    expect(r.netaTramoAlto).toBe(0);
    expect(r.sobretasaFiscal).toBe(0);
    expect(r.contribucionAnual).toBe(341_916);
    expect(r.avaluoAfecto).toBe(38_288_430);
    expect(r.exencionAplicada).toBe(61_711_570);
  });

  it('habitacional exactamente en el umbral no paga sobretasa', () => {
    const r = calculateContribuciones({
      avaluoFiscal: P.umbralCambioTasa,
      destino: 'habitacional',
    });
    expect(r.netaTramoAlto).toBe(0);
    expect(r.sobretasaFiscal).toBe(0);
    expect(r.contribucionAnual).toBe(r.netaTramoBajo);
    expect(r.contribucionAnual).toBeGreaterThan(0);
  });

  it('cuota es anual/4 redondeada y semestre anual/2', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 100_000_000,
      destino: 'habitacional',
    });
    expect(r.contribucionCuota).toBe(Math.round(r.contribucionAnual / 4));
    expect(r.contribucionSemestral).toBe(Math.round(r.contribucionAnual / 2));
  });

  it('comercial no aplica exención', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 50_000_000,
      destino: 'comercial',
    });
    expect(r.exento).toBe(false);
    expect(r.exencionAplicada).toBe(0);
    expect(r.contribucionAnual).toBe(
      Math.round(50_000_000 * 0.01042) + Math.round(50_000_000 * 0.00025),
    );
  });

  it('avalúo cero retorna contribución cero', () => {
    const r = calculateContribuciones({ avaluoFiscal: 0, destino: 'comercial' });
    expect(r.contribucionAnual).toBe(0);
    expect(r.contribucionCuota).toBe(0);
  });
});
