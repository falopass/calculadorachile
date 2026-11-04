// ============================================
// Tests de la Calculadora de IPC (serie INE base 2023=100)
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateIPC, ipcToResults } from '../ipc';
import {
  IPC_PERIODOS,
  IPC_SERIE_2023,
  IPC_ULTIMO_MES,
  variacionIpcEntreMeses,
} from '@/lib/values/ipc-serie';

describe('IPC_SERIE_2023', () => {
  it('tiene el último mes publicado como último período ordenado', () => {
    expect(IPC_ULTIMO_MES).toBe('2026-09');
    expect(IPC_PERIODOS[IPC_PERIODOS.length - 1].value).toBe(IPC_ULTIMO_MES);
    expect(IPC_PERIODOS[IPC_PERIODOS.length - 1].label).toBe('Septiembre 2026');
    expect(IPC_SERIE_2023[IPC_ULTIMO_MES]).toBe(113.59);
  });
});

describe('variacionIpcEntreMeses', () => {
  it('devuelve índices, factor y variación exacta y redondeada', () => {
    const v = variacionIpcEntreMeses('2025-09', '2026-09');
    expect(v.indiceInicial).toBe(109.14);
    expect(v.indiceFinal).toBe(113.59);
    expect(v.factor).toBeCloseTo(113.59 / 109.14, 8);
    expect(v.variacionExactaPct).toBeCloseTo((113.59 / 109.14 - 1) * 100, 8);
    expect(v.variacionRedondeadaPct).toBe(4.1);
  });

  it('lanza error si un mes no existe en la serie', () => {
    expect(() => variacionIpcEntreMeses('2020-01', '2026-09')).toThrow();
    expect(() => variacionIpcEntreMeses('2025-09', '2026-10')).toThrow();
  });
});

describe('calculateIPC', () => {
  it('variación a 12 meses: sep-2025 (109,14) → sep-2026 (113,59)', () => {
    const r = calculateIPC({
      monto: 100_000,
      mesInicial: '2025-09',
      mesFinal: '2026-09',
    });
    expect(r.indiceInicial).toBe(109.14);
    expect(r.indiceFinal).toBe(113.59);
    expect(r.factor).toBeCloseTo(113.59 / 109.14, 8);
    // (113,59 / 109,14 − 1) × 100 = 4,0773…% → 4,08% exacta, 4,1% INE
    expect(r.variacionPct).toBe(4.08);
    expect(r.variacionIne1Decimal).toBe(4.1);
    expect(r.montoReajustado).toBe(104_077);
    expect(r.diferencia).toBe(4_077);
  });

  it('variación acumulada 2026: dic-2025 (109,26) → sep-2026 (113,59)', () => {
    const r = calculateIPC({
      monto: 100_000,
      mesInicial: '2025-12',
      mesFinal: '2026-09',
    });
    // = 3,963…% → 3,96% exacta, 4,0% INE
    expect(r.variacionPct).toBe(3.96);
    expect(r.variacionIne1Decimal).toBe(4);
    expect(r.montoReajustado).toBe(Math.round(100_000 * (113.59 / 109.26)));
  });

  it('variación mensual: ago-2026 (113,15) → sep-2026 (113,59)', () => {
    const r = calculateIPC({
      monto: 100_000,
      mesInicial: '2026-08',
      mesFinal: '2026-09',
    });
    // = 0,3888…% → 0,39% exacta, 0,4% INE
    expect(r.variacionPct).toBe(0.39);
    expect(r.variacionIne1Decimal).toBe(0.4);
  });

  it('ejemplo INE: feb-2026 (109,70) → mar-2026 (110,75)', () => {
    const r = calculateIPC({
      monto: 500_000,
      mesInicial: '2026-02',
      mesFinal: '2026-03',
    });
    // = 0,9571…% → 0,96% exacta, 1,0% INE
    expect(r.variacionPct).toBe(0.96);
    expect(r.variacionIne1Decimal).toBe(1);
    expect(r.montoReajustado).toBe(Math.round(500_000 * (110.75 / 109.7)));
  });

  it('monto 0: entrega variación e índices con reajuste 0', () => {
    const r = calculateIPC({
      monto: 0,
      mesInicial: '2025-09',
      mesFinal: '2026-09',
    });
    expect(r.variacionIne1Decimal).toBe(4.1);
    expect(r.indiceInicial).toBe(109.14);
    expect(r.indiceFinal).toBe(113.59);
    expect(r.montoReajustado).toBe(0);
    expect(r.diferencia).toBe(0);
  });

  it('lanza error con meses fuera de la serie', () => {
    expect(() =>
      calculateIPC({ monto: 100_000, mesInicial: '2020-01', mesFinal: '2026-09' }),
    ).toThrow();
    expect(() =>
      calculateIPC({ monto: 100_000, mesInicial: '2025-09', mesFinal: '2026-10' }),
    ).toThrow();
  });
});

describe('ipcToResults', () => {
  it('expone monto reajustado y variación destacados con fuente INE', () => {
    const rows = ipcToResults(
      calculateIPC({ monto: 100_000, mesInicial: '2025-09', mesFinal: '2026-09' }),
    );
    const reajustado = rows.find((r) => r.label === 'Monto Reajustado');
    const variacion = rows.find((r) => r.label === 'Variación IPC del período');
    expect(reajustado?.value).toBe(104_077);
    expect(reajustado?.highlight).toBe(true);
    expect(variacion?.value).toBe(4.1);
    expect(variacion?.note?.source?.url).toBe('https://calculadoraipc.ine.cl/');
  });
});
