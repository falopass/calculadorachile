import { describe, expect, it } from 'vitest';
import { AFP, INGRESO_MINIMO } from '@/lib/values/constants';
import { calculateCostoEmpleado } from '../costo-empleado';

const baseInput = {
  sueldoBruto: 1_000_000,
  afp: 'habitat' as keyof typeof AFP,
  saludTipo: 'fonasa' as const,
  contratoIndefinido: true,
  agregarGratificacion: false,
  periodoCotizacion: 'hasta_julio_2026' as const,
};

describe('calculateCostoEmpleado', () => {
  it('hasta julio suma 1% de reforma y SIS 1,62% por separado', () => {
    const result = calculateCostoEmpleado(baseInput);
    expect(result.aportesEmpleador.pensionReforma).toBe(10_000);
    expect(result.aportesEmpleador.sisSeparado).toBe(16_200);
  });

  it('desde agosto usa 3,5% total y no duplica SIS', () => {
    const result = calculateCostoEmpleado({
      ...baseInput,
      periodoCotizacion: 'desde_agosto_2026',
    });
    expect(result.aportesEmpleador.pensionReforma).toBe(35_000);
    expect(result.aportesEmpleador.sisSeparado).toBe(0);
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
    expect(result.gratificacion).toBe(
      Math.round((INGRESO_MINIMO.mensual * 4.75) / 12),
    );
  });

  it('el período desde agosto aumenta el costo sin duplicar componentes', () => {
    const antes = calculateCostoEmpleado(baseInput);
    const despues = calculateCostoEmpleado({
      ...baseInput,
      periodoCotizacion: 'desde_agosto_2026',
    });
    expect(despues.costoTotalMensual).toBeGreaterThan(antes.costoTotalMensual);
    expect(despues.costoTotalMensual - antes.costoTotalMensual).toBe(8_800);
  });
});
