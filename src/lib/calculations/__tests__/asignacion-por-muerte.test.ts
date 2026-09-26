// ============================================
// Tests de Asignación por Muerte / Cuota Mortuoria
// ----------------------------------------------
// Golden ChileAtiende ficha 5300: IPS antiguo tope = 3 IMM no
// remuneracionales = $1.070.445; AFP/PGU/renta vitalicia = 15 UF
// (con UF $40.000 → $600.000).
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateAsignacionPorMuerte } from '../asignacion-por-muerte';
import { INGRESO_MINIMO } from '../../values/constants';

const UF = 40000;

describe('calculateAsignacionPorMuerte', () => {
  it('el tope IPS es 3 × IMM no remuneracional = $1.070.445', () => {
    expect(INGRESO_MINIMO.no_remuneracional * 3).toBe(1070445);
    const r = calculateAsignacionPorMuerte({
      regimen: 'ips-antiguo',
      gastosFunerarios: 1500000,
      valorUF: UF,
    });
    expect(r.tope).toBe(1070445);
    expect(r.reembolso).toBe(1070445);
    expect(r.diferenciaNoCubierta).toBe(429555);
  });

  it('IPS con gastos $800.000 → reembolso $800.000', () => {
    const r = calculateAsignacionPorMuerte({
      regimen: 'ips-antiguo',
      gastosFunerarios: 800000,
      valorUF: UF,
    });
    expect(r.reembolso).toBe(800000);
    expect(r.diferenciaNoCubierta).toBe(0);
  });

  it('AFP: cuota mortuoria 15 UF = $600.000 con UF $40.000', () => {
    const r = calculateAsignacionPorMuerte({
      regimen: 'afp',
      gastosFunerarios: 1500000,
      valorUF: UF,
    });
    expect(r.tope).toBe(600000);
    expect(r.reembolso).toBe(600000);
    expect(r.diferenciaNoCubierta).toBe(900000);
  });

  it('PGU: cuota mortuoria 15 UF; gastos $500.000 → $500.000', () => {
    const r = calculateAsignacionPorMuerte({
      regimen: 'pgu',
      gastosFunerarios: 500000,
      valorUF: UF,
    });
    expect(r.tope).toBe(600000);
    expect(r.reembolso).toBe(500000);
  });
});
