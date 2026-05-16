// ============================================
// Tests de intereses por mora laboral
// ----------------------------------------------
// Verifica reajuste IPC + interés simple sobre monto reajustado
// (Art. 63 CdT, Ley 18.010).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateInteresesMora } from '../intereses-mora';
import { TMC_2026_MAYO } from '@/lib/values/constants';

describe('calculateInteresesMora', () => {
  it('sin reajuste IPC ni días, retorna deuda original', () => {
    const r = calculateInteresesMora({ montoDeuda: 1_000_000, diasMora: 0 });
    expect(r.totalAPagar).toBe(1_000_000);
    expect(r.interesGenerado).toBe(0);
    expect(r.reajusteIPC).toBe(0);
  });

  it('aplica IPC sobre el capital antes de calcular intereses', () => {
    const r = calculateInteresesMora({
      montoDeuda: 1_000_000,
      diasMora: 0,
      ipcAcumulado: 4,
    });
    expect(r.reajusteIPC).toBe(40_000);
    expect(r.montoReajustado).toBe(1_040_000);
  });

  it('interés simple anual: 365 días con TMC 9,5% retorna ~9,5% del reajustado', () => {
    const r = calculateInteresesMora({
      montoDeuda: 1_000_000,
      diasMora: 365,
      tasaAnualPersonalizada: 9.5,
      ipcAcumulado: 0,
    });
    expect(r.interesGenerado).toBeCloseTo(95_000, -2);
    expect(r.totalAPagar).toBeCloseTo(1_095_000, -2);
  });

  it('por defecto usa TMC vigente para no reajustables > 200 UF', () => {
    const r = calculateInteresesMora({ montoDeuda: 1_000_000, diasMora: 365 });
    expect(r.tasaMora).toBe(TMC_2026_MAYO.no_reajustables_mayor_200uf);
  });

  it('mora de 6 meses con TMC 9,5%: interés ≈ 4,75% del reajustado', () => {
    const r = calculateInteresesMora({
      montoDeuda: 2_000_000,
      diasMora: 182,
      tasaAnualPersonalizada: 9.5,
    });
    // 2_000_000 × 9.5% × 182/365 ≈ 94.745
    expect(r.interesGenerado).toBeCloseTo(94_739, -2);
  });

  it('combina IPC y mora para cálculo correcto', () => {
    const r = calculateInteresesMora({
      montoDeuda: 1_000_000,
      diasMora: 365,
      tasaAnualPersonalizada: 10,
      ipcAcumulado: 5,
    });
    // Reajustado: 1.050.000. Interés: 1.050.000 × 10% × 1 = 105.000
    expect(r.montoReajustado).toBe(1_050_000);
    expect(r.interesGenerado).toBeCloseTo(105_000, -2);
    expect(r.totalAPagar).toBeCloseTo(1_155_000, -2);
  });

  it('recargo porcentual total mide bien el costo de la mora', () => {
    const r = calculateInteresesMora({
      montoDeuda: 1_000_000,
      diasMora: 730,
      tasaAnualPersonalizada: 10,
      ipcAcumulado: 0,
    });
    // 2 años de interés simple al 10% ≈ 20% recargo
    expect(r.recargoPorcentual).toBeCloseTo(20, 0);
  });
});
