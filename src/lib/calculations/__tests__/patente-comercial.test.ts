// ============================================
// Tests de patente comercial (DL 3063 Art. 24)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePatenteComercial } from '../patente-comercial';
import { UTM } from '@/lib/values/constants';

describe('calculatePatenteComercial', () => {
  it('Santiago aplica 0,5% sobre el capital propio tributario', () => {
    const r = calculatePatenteComercial({
      capitalInvertido: 50_000_000,
      actividad: 'comercio',
      comuna: 'santiago',
    });
    expect(r.tasaComunal).toBe(0.5);
    expect(r.aplicaTope).toBe('normal');
    expect(r.patenteAnual).toBe(250_000);
    expect(r.patenteSemestral).toBe(125_000);
  });

  it('capital muy bajo dispara el mínimo legal de 1 UTM anual', () => {
    const r = calculatePatenteComercial({
      capitalInvertido: 100_000,
      actividad: 'comercio',
      comuna: 'otra',
    });
    expect(r.aplicaTope).toBe('minimo');
    expect(r.patenteAnual).toBe(Math.round(UTM.valor));
  });

  it('capital muy alto se topea en 8.000 UTM anual', () => {
    const r = calculatePatenteComercial({
      capitalInvertido: 1_000_000_000_000, // 1 billón → claramente sobre el tope
      actividad: 'industria',
      comuna: 'las_condes',
    });
    expect(r.aplicaTope).toBe('maximo');
    expect(r.patenteAnual).toBe(Math.round(8_000 * UTM.valor));
  });

  it('Las Condes (0,35%) cobra menos que Santiago (0,5%) para el mismo capital', () => {
    const sant = calculatePatenteComercial({
      capitalInvertido: 100_000_000,
      actividad: 'servicios',
      comuna: 'santiago',
    });
    const lc = calculatePatenteComercial({
      capitalInvertido: 100_000_000,
      actividad: 'servicios',
      comuna: 'las_condes',
    });
    expect(lc.patenteAnual).toBeLessThan(sant.patenteAnual);
  });

  it('patente semestral = anual / 2', () => {
    const r = calculatePatenteComercial({
      capitalInvertido: 80_000_000,
      actividad: 'servicios',
      comuna: 'providencia',
    });
    expect(r.patenteSemestral).toBe(Math.round(r.patenteAnual / 2));
  });
});
