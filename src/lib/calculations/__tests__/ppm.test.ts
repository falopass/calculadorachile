import { describe, it, expect } from 'vitest';
import { calculatePPM, ppmToResults, type PPMInput } from '../ppm';
import { getRetencionHonorarios } from '@/lib/values/honorarios-anio';

const actividades: PPMInput['actividad'][] = [
  'profesional', 'comercio', 'transporte', 'construccion',
];

describe('calculatePPM', () => {
  it.each(actividades)('%s: usa ingresos brutos sin deducir gastos', (actividad) => {
    for (const ingresos of [12_000_000, 100_000_000]) {
      const r = calculatePPM({ ingresosBrutosAnuales: ingresos, actividad });
      const tasas = { profesional: getRetencionHonorarios(), comercio: 1, transporte: 0.3, construccion: 0.2 };
      expect(r.baseTributable).toBe(ingresos);
      expect(r.tasaPPM).toBe(tasas[actividad]);
      expect(r.ppmAnual).toBe(Math.round(ingresos * tasas[actividad] / 100));
      expect(r.ppmMensual).toBe(Math.round(r.ppmAnual / 12));
    }
  });

  it('comercio: ejemplo de $24.000.000 anuales al 1%', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 24_000_000, actividad: 'comercio' });
    expect(r.ppmAnual).toBe(240_000);
    expect(r.ppmMensual).toBe(20_000);
    expect(ppmToResults(r)).toHaveLength(4);
  });

  it('redondea el PPM anual y luego el promedio mensual a pesos', () => {
    const r = calculatePPM({ ingresosBrutosAnuales: 12_345, actividad: 'transporte' });
    expect(r.ppmAnual).toBe(37);
    expect(r.ppmMensual).toBe(3);
  });

  it.each(actividades)('%s: ingresos cero o negativos dan PPM cero', (actividad) => {
    for (const ingresosBrutosAnuales of [0, -100]) {
      const r = calculatePPM({ ingresosBrutosAnuales, actividad });
      expect(r.baseTributable).toBe(0);
      expect(r.ppmAnual).toBe(0);
      expect(r.ppmMensual).toBe(0);
    }
  });
});
