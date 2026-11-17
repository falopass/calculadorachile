import { describe, expect, it } from 'vitest';
import { calculateImpuestoHerencia } from '../impuesto-herencia';

// UTM fija para golden: $70.000 → UTA $840.000.
const UTM_T = 70_000;
const UTA = UTM_T * 12;
/** Tabla SII en UTM (tasa y deducción fija) para contrastar la escala marginal. */
function tablaSII(afectoUTM: number): number {
  const t: Array<[number, number, number]> = [
    [960, 0.01, 0],
    [1920, 0.025, 14.4],
    [3840, 0.05, 62.4],
    [5760, 0.075, 158.4],
    [7680, 0.1, 302.4],
    [9600, 0.15, 686.4],
    [14400, 0.2, 1166.4],
    [Infinity, 0.25, 1886.4],
  ];
  const [, tasa, ded] = t.find(([hasta]) => afectoUTM <= hasta)!;
  return afectoUTM * tasa - ded;
}

describe('impuesto-herencia (Ley 16.271 art. 2)', () => {
  it('hijo con asignación bajo la exención de 50 UTA no paga', () => {
    const r = calculateImpuestoHerencia({
      asignacionLiquida: 50 * UTA,
      parentesco: 'directo',
      valorUTM: UTM_T,
    });
    expect(r.impuestoCLP).toBe(0);
    expect(r.exentoCLP).toBe(42_000_000);
  });

  it('hijo con 300 UTA: 250 UTA afectas', () => {
    const r = calculateImpuestoHerencia({
      asignacionLiquida: 300 * UTA,
      parentesco: 'directo',
      valorUTM: UTM_T,
    });
    // 80×1 % + 80×2,5 % + 90×5 % = 0,8 + 2 + 4,5 = 7,3 UTA = 87,6 UTM
    expect(r.impuestoUTM).toBe(87.6);
    expect(r.impuestoCLP).toBe(6_132_000);
    expect(r.impuestoUTM).toBeCloseTo(tablaSII(250 * 12), 6);
  });

  it('coincide con la tabla SII de deducción fija en cada tramo', () => {
    for (const uta of [10, 120, 200, 400, 600, 700, 1000, 2000]) {
      const r = calculateImpuestoHerencia({
        asignacionLiquida: uta * UTA,
        parentesco: 'otro',
        valorUTM: UTM_T,
      });
      expect(r.impuestoEscalaUTM).toBeCloseTo(tablaSII(uta * 12), 2);
    }
  });

  it('hermano: exención 5 UTA y recargo 20 %', () => {
    const r = calculateImpuestoHerencia({
      asignacionLiquida: 105 * UTA,
      parentesco: 'colateral',
      valorUTM: UTM_T,
    });
    // 100 UTA afectas: 80×1 % + 20×2,5 % = 1,3 UTA = 15,6 UTM; ×1,2 = 18,72 UTM
    expect(r.impuestoUTM).toBe(18.72);
    expect(r.impuestoCLP).toBe(1_310_400);
  });

  it('sin parentesco: sin exención y recargo 40 %', () => {
    const r = calculateImpuestoHerencia({
      asignacionLiquida: 40 * UTA,
      parentesco: 'otro',
      valorUTM: UTM_T,
    });
    expect(r.exentoCLP).toBe(0);
    expect(r.impuestoUTM).toBe(6.72); // 40 × 1 % = 0,4 UTA = 4,8 UTM × 1,4
  });

  it('discapacidad: rebaja 30 % con tope de 8.000 UF', () => {
    const r = calculateImpuestoHerencia({
      asignacionLiquida: 300 * UTA,
      parentesco: 'directo',
      discapacidad: true,
      valorUTM: UTM_T,
      valorUF: 40_000,
    });
    expect(r.impuestoUTM).toBe(61.32);
    const grande = calculateImpuestoHerencia({
      asignacionLiquida: 1e12,
      parentesco: 'directo',
      discapacidad: true,
      valorUTM: UTM_T,
      valorUF: 40_000,
    });
    expect(grande.rebajaUTM).toBeCloseTo((8000 * 40_000) / UTM_T, 2);
  });

  it('rechaza montos negativos', () => {
    expect(() =>
      calculateImpuestoHerencia({ asignacionLiquida: -1, parentesco: 'directo' }),
    ).toThrow();
  });
});
