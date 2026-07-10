// ============================================
// Tests de contribuciones (impuesto territorial)
// ----------------------------------------------
// Verifica tasas por destino y exención habitacional bajo 225,96 UTM.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateContribuciones } from '../contribuciones';
import { UTM, CONTRIBUCIONES_BIENES_RAICES } from '@/lib/values/constants';

describe('calculateContribuciones', () => {
  it('habitacional aplica descuento 0,025 puntos sobre la tasa', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 100_000_000,
      destino: 'habitacional',
    });
    const tasaEsperada =
      CONTRIBUCIONES_BIENES_RAICES.tasas_anuales.habitacional -
      CONTRIBUCIONES_BIENES_RAICES.descuento_habitacional;
    // El módulo redondea a 2 decimales, así que la tolerancia debe ser ≤0.01.
    expect(r.tasaAnual).toBeCloseTo(tasaEsperada, 1);
    expect(r.tasaAnual).toBeLessThan(
      CONTRIBUCIONES_BIENES_RAICES.tasas_anuales.habitacional,
    );
  });

  it('exención habitacional bajo 225,96 UTM da contribución cero', () => {
    const avaluoExento = Math.floor(100 * UTM.valor); // 100 UTM, claramente bajo el tope
    const r = calculateContribuciones({
      avaluoFiscal: avaluoExento,
      destino: 'habitacional',
    });
    expect(r.exento).toBe(true);
    expect(r.contribucionAnual).toBe(0);
    expect(r.contribucionSemestral).toBe(0);
    expect(r.contribucionCuota).toBe(0);
  });

  it('cuota es anual / 4 y semestre anual / 2', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 100_000_000,
      destino: 'comercial',
    });
    expect(r.contribucionAnual).toBe(1_200_000);
    expect(r.contribucionSemestral).toBe(600_000);
    expect(r.contribucionCuota).toBe(300_000);
    expect(r.umbralExencionCLP).toBeGreaterThan(0);
  });

  it('habitacional sobre 225,96 UTM paga contribuciones', () => {
    const avaluoSobreTope = Math.ceil(300 * UTM.valor);
    const r = calculateContribuciones({
      avaluoFiscal: avaluoSobreTope,
      destino: 'habitacional',
    });
    expect(r.exento).toBe(false);
    expect(r.contribucionAnual).toBeGreaterThan(0);
  });

  it('comercial paga 1,2% sin descuento habitacional', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 100_000_000,
      destino: 'comercial',
    });
    expect(r.tasaAnual).toBe(1.2);
    expect(r.contribucionAnual).toBe(1_200_000);
    expect(r.contribucionSemestral).toBe(600_000);
    expect(r.exento).toBe(false);
  });

  it('sitio eriado paga la tasa más alta (2%)', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 50_000_000,
      destino: 'sitio_eriado',
    });
    expect(r.tasaAnual).toBe(2.0);
    expect(r.contribucionAnual).toBe(1_000_000);
  });

  it('agrario paga 0,5% sin descuento habitacional', () => {
    const r = calculateContribuciones({
      avaluoFiscal: 200_000_000,
      destino: 'agrario',
    });
    expect(r.tasaAnual).toBe(0.5);
    expect(r.contribucionAnual).toBe(1_000_000);
  });

  it('avalúo cero retorna contribución cero', () => {
    const r = calculateContribuciones({ avaluoFiscal: 0, destino: 'comercial' });
    expect(r.contribucionAnual).toBe(0);
  });
});
