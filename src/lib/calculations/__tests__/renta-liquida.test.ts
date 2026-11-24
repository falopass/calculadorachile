import { describe, it, expect } from 'vitest';
import { calculateRentaLiquida, rentaLiquidaToResults } from '../renta-liquida';
import { loadCalculationFn } from '../load-calculator';
import { getCalculatorBySlug } from '@/data/calculators';
import { AFP, AFP_OBLIGATORIA_PCT, SALUD, SEGURO_CESANTIA, TOPE_IMPOSITIVO, IMPUESTO_SEGUNDA_CATEGORIA } from '@/lib/values/constants';

const opciones = {
  afp: 'capital' as const,
  saludTipo: 'fonasa' as const,
  contratoIndefinido: true,
  valorUF: 40_000,
  valorUTM: 71_721,
};

describe('calculateRentaLiquida', () => {
  it('golden $1.000.000 Capital FONASA: renta líquida = imponible − cotizaciones, exenta de IUSC', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 1_000_000, ...opciones });
    const afp = Math.round(1_000_000 * ((AFP_OBLIGATORIA_PCT + AFP.capital.comision) / 100)); // 114.400
    const salud = Math.round(1_000_000 * (SALUD.fonasa.tasa / 100)); // 70.000
    const cesantia = Math.round(1_000_000 * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100)); // 6.000
    expect(r.descuentoAfp).toBe(afp);
    expect(r.descuentoSalud).toBe(salud);
    expect(r.descuentoCesantia).toBe(cesantia);
    expect(r.cotizacionesObligatorias).toBe(190_400);
    expect(r.rentaLiquidaMensual).toBe(809_600);
    expect(r.rentaLiquidaAnual).toBe(809_600 * 12);
    expect(r.impuestoSegundaCategoria).toBe(0); // < 13,5 UTM
    expect(r.sueldoLiquidoAPagar).toBe(809_600);
  });

  it('golden $3.000.000: tramo 8% del IUSC sobre la renta líquida', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 3_000_000, ...opciones });
    // 3.000.000 < tope 90 UF (3.600.000): base completa.
    expect(r.rentaLiquidaMensual).toBe(3_000_000 - 343_200 - 210_000 - 18_000);
    expect(r.rentaLiquidaMensual).toBe(2_428_800);
    // IUSC: (0,08 × base) − 1,74 UTM = 194.304 − 124.794,54
    expect(r.impuestoSegundaCategoria).toBe(Math.round(0.08 * 2_428_800 - 1.74 * 71_721));
    expect(r.impuestoSegundaCategoria).toBe(69_509);
  });

  it('tope 90 UF: la renta líquida usa la base topada', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 10_000_000, ...opciones });
    const tope = TOPE_IMPOSITIVO.afp_salud * opciones.valorUF; // 3.600.000
    const afp = Math.round(tope * ((AFP_OBLIGATORIA_PCT + AFP.capital.comision) / 100));
    const salud = Math.round(tope * 0.07);
    const cesantiaTope = TOPE_IMPOSITIVO.seguro_cesantia * opciones.valorUF;
    const cesantia = Math.round(cesantiaTope * 0.006);
    expect(r.cotizacionesObligatorias).toBe(afp + salud + cesantia);
    expect(r.rentaLiquidaMensual).toBe(10_000_000 - afp - salud - cesantia);
  });

  it('plazo fijo: sin seguro de cesantía del trabajador', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 1_000_000, ...opciones, contratoIndefinido: false });
    expect(r.descuentoCesantia).toBe(0);
    expect(r.rentaLiquidaMensual).toBe(1_000_000 - 114_400 - 70_000);
  });

  it('isapre plan > 7%: solo el 7% reduce la renta líquida; el exceso sale del líquido a pagar', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 1_000_000, ...opciones, saludTipo: 'isapre', isapreMonto: 5 });
    // Plan 5 UF = $200.000 se paga, pero la renta líquida deduce solo 7%.
    expect(r.descuentoSalud).toBe(70_000);
    expect(r.cotizacionesObligatorias).toBe(190_400);
    expect(r.rentaLiquidaMensual).toBe(809_600);
    expect(r.sueldoLiquidoAPagar).toBe(809_600 - (200_000 - 70_000));
  });

  it('bruto 0: todo en cero', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 0, ...opciones });
    expect(r.rentaLiquidaMensual).toBe(0);
    expect(r.rentaLiquidaAnual).toBe(0);
    expect(r.impuestoSegundaCategoria).toBe(0);
  });

  it('toResults destaca la renta líquida mensual', () => {
    const r = calculateRentaLiquida({ sueldoBruto: 1_000_000, ...opciones });
    const results = rentaLiquidaToResults(r);
    const destacado = results.find((x) => x.highlight)!;
    expect(destacado.label).toBe('Renta líquida imponible mensual');
    expect(destacado.value).toBe(809_600);
  });

  it('adapter del loader usa los ids del catálogo y los valores en vivo', async () => {
    const calc = getCalculatorBySlug('calculadora-renta-liquida')!;
    const fn = (await loadCalculationFn(calc.id, opciones))!;
    const results = fn({ sueldoBruto: '1000000', afp: 'capital', saludTipo: 'fonasa', isapreMonto: '0', contratoIndefinido: true });
    expect(results.find((x) => x.highlight)?.value).toBe(809_600);

    // Sobre el tope 90 UF y con IUSC: si el adapter omitiera la UF o la UTM
    // inyectadas, estos valores no cuadran.
    const overTope = fn({ sueldoBruto: '10000000', afp: 'capital', saludTipo: 'fonasa', isapreMonto: '0', contratoIndefinido: true });
    const tope = TOPE_IMPOSITIVO.afp_salud * opciones.valorUF; // 3.600.000
    const afp = Math.round(tope * ((AFP_OBLIGATORIA_PCT + AFP.capital.comision) / 100));
    const salud = Math.round(tope * (SALUD.fonasa.tasa / 100));
    const cesantia = Math.round(TOPE_IMPOSITIVO.seguro_cesantia * opciones.valorUF * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100));
    const rentaLiquida = 10_000_000 - afp - salud - cesantia;
    const baseUTM = rentaLiquida / opciones.valorUTM;
    const tramo = IMPUESTO_SEGUNDA_CATEGORIA.tramos.find((t) => baseUTM > t.desde && baseUTM <= t.hasta)!;
    const impuesto = Math.round(Math.max(0, baseUTM * tramo.factor - tramo.rebaja) * opciones.valorUTM);
    expect(impuesto).toBeGreaterThan(0);
    expect(overTope.find((x) => x.highlight)?.value).toBe(rentaLiquida);
    expect(overTope.find((x) => x.label === 'Impuesto 2ª Categoría (mensual)')?.value).toBe(impuesto);
  });
});
