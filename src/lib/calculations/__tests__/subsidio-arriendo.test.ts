// ============================================
// Tests del Subsidio de Arriendo — llamados 2026
// ----------------------------------------------
// Golden con UF $40.000. Regular (ficha 29888): 170 UF, tope 4,2
// UF/mes (4,9 en zonas), arriendo máx 11 UF (13 en zonas), hasta
// 8 años. Especial PM/PcD: 213 UF, cobertura 90% del arriendo.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateSubsidioArriendo } from '../subsidio-arriendo';

const UF = 40000;

const regularBase = {
  modalidad: 'regular',
  zonaNorteSurRM: false,
  integrantes: 3,
  rsh70: true,
  valorUF: UF,
};

describe('calculateSubsidioArriendo — regular', () => {
  it('arriendo $360.000 (9 UF) fuera de zona → 4,2 UF ($168.000), 40 meses', () => {
    const r = calculateSubsidioArriendo({
      ...regularBase,
      arriendoMensual: 360000,
      ingresoFamiliar: 800000,
    });
    expect(r.aplica).toBe(true);
    expect(r.subsidioMensualUF).toBe(4.2);
    expect(r.subsidioMensualCLP).toBe(168000);
    expect(r.copagoMensualCLP).toBe(192000);
    expect(r.mesesDuracion).toBe(40);
    expect(r.remanenteUF).toBe(2);
  });

  it('arriendo $480.000 (12 UF) fuera de zona → no aplica (máx 11 UF)', () => {
    const r = calculateSubsidioArriendo({
      ...regularBase,
      arriendoMensual: 480000,
      ingresoFamiliar: 800000,
    });
    expect(r.aplica).toBe(false);
    expect(r.subsidioMensualCLP).toBe(0);
  });

  it('mismo arriendo en zona → 4,9 UF ($196.000), 34 meses, remanente 3,4 UF', () => {
    const r = calculateSubsidioArriendo({
      ...regularBase,
      zonaNorteSurRM: true,
      arriendoMensual: 480000,
      ingresoFamiliar: 800000,
    });
    expect(r.aplica).toBe(true);
    expect(r.subsidioMensualUF).toBe(4.9);
    expect(r.subsidioMensualCLP).toBe(196000);
    expect(r.mesesDuracion).toBe(34);
    expect(r.remanenteUF).toBe(3.4);
  });

  it('ingreso tope: 4 integrantes suben el máximo a 33 UF', () => {
    const ok = calculateSubsidioArriendo({
      ...regularBase,
      arriendoMensual: 360000,
      ingresoFamiliar: 1280000, // 32 UF
      integrantes: 4,
    });
    expect(ok.aplica).toBe(true);
    const noOk = calculateSubsidioArriendo({
      ...regularBase,
      arriendoMensual: 360000,
      ingresoFamiliar: 1360000, // 34 UF
      integrantes: 4,
    });
    expect(noOk.aplica).toBe(false);
  });
});

describe('calculateSubsidioArriendo — especial PM/PcD', () => {
  it('arriendo $300.000 → 90% = 6,75 UF ($270.000), copago $30.000, 31 meses', () => {
    const r = calculateSubsidioArriendo({
      modalidad: 'especial-pm-pcd',
      zonaNorteSurRM: false,
      arriendoMensual: 300000,
      ingresoFamiliar: 600000, // 15 UF
      integrantes: 2,
      rsh70: true,
      valorUF: UF,
    });
    expect(r.aplica).toBe(true);
    expect(r.subsidioMensualUF).toBe(6.75);
    expect(r.subsidioMensualCLP).toBe(270000);
    expect(r.copagoMensualCLP).toBe(30000);
    expect(r.mesesDuracion).toBe(31);
  });

  it('sin 70% RSH → no aplica', () => {
    const r = calculateSubsidioArriendo({
      ...regularBase,
      arriendoMensual: 360000,
      ingresoFamiliar: 800000,
      rsh70: false,
    });
    expect(r.aplica).toBe(false);
    expect(r.motivosNoAplica.length).toBeGreaterThan(0);
  });
});
