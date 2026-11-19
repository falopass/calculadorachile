import { describe, expect, it } from 'vitest';
import { AFP, INGRESO_MINIMO } from '@/lib/values/constants';
import { calculateCostoEmpleado } from '../costo-empleado';
import { loadCalculationFn } from '../load-calculator';
import { calculators } from '@/data/calculators';

const baseInput = {
  sueldoBruto: 1_000_000,
  afp: 'habitat' as keyof typeof AFP,
  saludTipo: 'fonasa' as const,
  contratoIndefinido: true,
  agregarGratificacion: false,
  periodoCotizacion: 'hasta_julio_2026' as const,
};

describe('calculateCostoEmpleado', () => {
  it('el selector conserva el valor legado y expone julio por separado', () => {
    const periodo = calculators
      .find((calculator) => calculator.id === 'costo-empleado-pyme')!
      .inputs.find((input) => input.id === 'periodoCotizacion')!;
    expect(periodo.defaultValue).toBe('hasta_julio_2026');
    expect(periodo.options).toEqual([
      { value: 'hasta_julio_2026', label: 'Agosto 2025–junio 2026: 1% + SIS 1,62%' },
      { value: 'julio_2026', label: 'Julio 2026: 1% + SIS 2,00%' },
      { value: 'desde_agosto_2026', label: 'Desde agosto 2026: 3,5% total con SIS incluido' },
    ]);
  });

  it.each([
    ['hasta_julio_2026', 16_200],
    ['julio_2026', 20_000],
    ['desde_agosto_2026', 0],
  ])('el adapter respeta el SIS del período %s', async (periodoCotizacion, sis) => {
    const calculate = await loadCalculationFn('costo-empleado-pyme');
    const results = calculate!({ ...baseInput, periodoCotizacion });
    expect(results.find((result) => result.label === 'SIS separado')?.value).toBe(sis);
  });

  it('sin remuneración no cobra SIS ni reforma', () => {
    const result = calculateCostoEmpleado({ ...baseInput, sueldoBruto: 0 });
    expect(result.aportesEmpleador.sisSeparado).toBe(0);
    expect(result.aportesEmpleador.pensionReforma).toBe(0);
    expect(result.costoTotalMensual).toBe(0);
  });

  it.each([
    ['hasta_julio_2026', 10_000, 16_200],
    ['julio_2026', 10_000, 20_000],
    ['desde_agosto_2026', 35_000, 0],
  ] as const)('%s aplica reforma %s y SIS separado %s', (periodoCotizacion, reforma, sis) => {
    const result = calculateCostoEmpleado({
      ...baseInput,
      periodoCotizacion,
    });
    expect(result.periodoCotizacion).toBe(periodoCotizacion);
    expect(result.aportesEmpleador.pensionReforma).toBe(reforma);
    expect(result.aportesEmpleador.sisSeparado).toBe(sis);
  });

  it('no suma AFP ni salud del trabajador al costo del empleador', () => {
    const result = calculateCostoEmpleado(baseInput);
    const aportes = Object.values(result.aportesEmpleador).reduce((a, b) => a + b, 0);
    expect(result.costoTotalMensual).toBe(result.totalHaberesImponibles + aportes);
    expect(result.descuentosTrabajador.salud).toBe(70_000);
  });

  it('contrato a plazo no descuenta cesantía al trabajador y empleador aporta 3%', () => {
    const result = calculateCostoEmpleado({ ...baseInput, contratoIndefinido: false });
    expect(result.descuentosTrabajador.seguroCesantia).toBe(0);
    expect(result.aportesEmpleador.seguroCesantia).toBe(30_000);
  });

  it('gratificación del artículo 50 respeta el tope mensual', () => {
    const result = calculateCostoEmpleado({
      ...baseInput,
      sueldoBruto: 3_000_000,
      agregarGratificacion: true,
    });
    expect(result.gratificacion).toBe(Math.round((INGRESO_MINIMO.mensual * 4.75) / 12));
  });

  it('el período desde agosto aumenta el costo sin duplicar componentes', () => {
    const antes = calculateCostoEmpleado({ ...baseInput, periodoCotizacion: 'julio_2026' });
    const despues = calculateCostoEmpleado({
      ...baseInput,
      periodoCotizacion: 'desde_agosto_2026',
    });
    expect(despues.costoTotalMensual).toBeGreaterThan(antes.costoTotalMensual);
    expect(despues.costoTotalMensual - antes.costoTotalMensual).toBe(5_000);
  });
});
