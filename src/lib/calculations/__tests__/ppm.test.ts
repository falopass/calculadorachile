// ============================================
// Tests de PPM (Pagos Provisionales Mensuales)
// ----------------------------------------------
// Verifica el calendario Ley 21.578 para profesionales y la presunción
// 30% Art. 50 LIR con tope 15 UTA.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculatePPM } from '../ppm';
import { UTM, RETENCION_HONORARIOS_CALENDARIO, PPM_PRESUNCION } from '@/lib/values/constants';

describe('calculatePPM', () => {
  it('profesional: aplica presunción 30% si no se entregan gastos', () => {
    const ingresos = 12_000_000; // 12M anuales
    const r = calculatePPM({ ingresosBrutosAnuales: ingresos, actividad: 'profesional' });
    expect(r.aplicoPresuncionGastos).toBe(true);
    // Base = 12M - 30% = 8.4M (bajo tope 15 UTA)
    expect(r.baseTributable).toBe(ingresos * 0.7);
  });

  it('profesional: presunción topeada en 15 UTA para rentas altas', () => {
    // 1 UTA = 12 UTM ≈ $847.056. 15 UTA ≈ $12.7M. Para que la presunción
    // se tope, ingresos×30% > tope → ingresos > tope/0.3 ≈ $42M.
    const ingresos = 100_000_000;
    const r = calculatePPM({ ingresosBrutosAnuales: ingresos, actividad: 'profesional' });
    const topeUTA = PPM_PRESUNCION.tope_uta * (UTM.valor * 12);
    expect(r.aplicoPresuncionGastos).toBe(true);
    expect(r.topePresuncionCLP).toBe(Math.round(topeUTA));
    // Base no puede ser menor que (ingresos - tope)
    expect(r.baseTributable).toBe(ingresos - topeUTA);
  });

  it('profesional: tasa coincide con calendario Ley 21.578 año vigente', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 1_000_000, actividad: 'profesional' });
    const aniosCal = Object.keys(RETENCION_HONORARIOS_CALENDARIO).map(Number);
    const min = Math.min(...aniosCal);
    const max = Math.max(...aniosCal);
    expect(r.tasaPPM).toBeGreaterThanOrEqual(
      RETENCION_HONORARIOS_CALENDARIO[min as keyof typeof RETENCION_HONORARIOS_CALENDARIO],
    );
    expect(r.tasaPPM).toBeLessThanOrEqual(
      RETENCION_HONORARIOS_CALENDARIO[max as keyof typeof RETENCION_HONORARIOS_CALENDARIO],
    );
  });

  it('comercio: 1% sobre ingresos brutos sin presunción', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 24_000_000, actividad: 'comercio' });
    expect(r.tasaPPM).toBe(1);
    expect(r.baseTributable).toBe(24_000_000);
    expect(r.ppmAnual).toBe(240_000);
    expect(r.ppmMensual).toBe(20_000);
    expect(r.aplicoPresuncionGastos).toBe(false);
  });

  it('transporte: 0,3% sobre ingresos', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 24_000_000, actividad: 'transporte' });
    expect(r.tasaPPM).toBe(0.3);
    expect(r.ppmAnual).toBe(72_000);
  });

  it('construcción: 0,2% sobre ingresos', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 24_000_000, actividad: 'construccion' });
    expect(r.tasaPPM).toBe(0.2);
    expect(r.ppmAnual).toBe(48_000);
  });

  it('gastos efectivos sustituyen la presunción', () => {
    const r = calculatePPM({
      ingresosBrutosAnuales: 12_000_000,
      gastosPresuntos: 5_000_000,
      actividad: 'profesional',
    });
    expect(r.baseTributable).toBe(7_000_000);
    expect(r.aplicoPresuncionGastos).toBe(false);
  });

  it('ingresos cero retorna PPM cero', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 0, actividad: 'profesional' });
    expect(r.ppmAnual).toBe(0);
    expect(r.ppmMensual).toBe(0);
  });
});
