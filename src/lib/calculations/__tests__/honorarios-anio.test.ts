import { afterEach, describe, expect, it, vi } from 'vitest';
import { contextoHonorarios, getRetencionHonorarios } from '@/lib/values/honorarios-anio';
import { calculateBoletaHonorarios } from '../boleta-honorarios';
import { calculatePPM } from '../ppm';
import { calculateOperacionRenta } from '../operacion-renta';

afterEach(() => vi.useRealTimers());

describe('calendario SII de honorarios', () => {
  it.each([[2023, 13], [2024, 13.75], [2025, 14.5], [2026, 15.25], [2027, 16], [2028, 17], [2029, 17], [2050, 17]])('%i aplica %s%%', (year, rate) => {
    expect(getRetencionHonorarios(year)).toBe(rate);
  });

  it('cambia al llegar la medianoche en Chile, no en UTC', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-01T02:59:59Z'));
    expect(getRetencionHonorarios()).toBe(15.25);
    expect(calculatePPM({ ingresosBrutosAnuales: 1_000_000, actividad: 'profesional' }).tasaPPM).toBe(15.25);
    vi.setSystemTime(new Date('2027-01-01T03:00:00Z'));
    expect(getRetencionHonorarios()).toBe(16);
    expect(contextoHonorarios().anio).toBe(2027);
    const boleta = calculateBoletaHonorarios({ montoBruto: 1_000_000 });
    expect(boleta.retencion).toBe(160_000);
    expect(boleta.montoLiquido).toBe(840_000);
    const ppm = calculatePPM({ ingresosBrutosAnuales: 1_000_000, actividad: 'profesional' });
    expect(ppm.tasaPPM).toBe(16);
    expect(ppm.ppmAnual).toBe(160_000);
    const renta = calculateOperacionRenta({ ingresosAnuales: 1_000_000, gastosAnuales: 0, cotizacionesObligatorias: 0 });
    expect(renta.anioRetencion).toBe(2027);
    expect(renta.retencionSugerida).toBe(160_000);
  });

  it('2027: cálculo inverso y entradas vacías o negativas', () => {
    expect(calculateBoletaHonorarios({ montoBruto: 840_000, ano: 2027, modo: 'liquido-a-bruto' }).montoBruto).toBe(1_000_000);
    for (const montoBruto of [0, -100]) {
      const result = calculateBoletaHonorarios({ montoBruto, ano: 2027 });
      expect(result.retencion).toBe(0);
      expect(result.montoLiquido).toBe(0);
    }
    expect(calculateBoletaHonorarios({ montoBruto: 1_000_000, ano: 2035 }).retencion).toBe(170_000);
  });
});
