import { describe, expect, it } from 'vitest';
import { calculateSubsidioAgua } from '../subsidio-agua';

describe('calculateSubsidioAgua', () => {
  it('régimen general usa el porcentaje asignado y un máximo de 13 m³', () => {
    const result = calculateSubsidioAgua({
      consumoM3: 13,
      numeroPersonas: 4,
      montoCuenta: 20_000,
      porcentajeAsignado: 60,
      seguridadesYOportunidades: false,
    });
    expect(result.topeM3).toBe(13);
    expect(result.subsidioPct).toBe(60);
    expect(result.montoSubsidioEstimado).toBe(12_000);
  });

  it('acota el porcentaje general al rango oficial de 25% a 85%', () => {
    const bajo = calculateSubsidioAgua({
      consumoM3: 10,
      numeroPersonas: 2,
      montoCuenta: 10_000,
      porcentajeAsignado: 5,
      seguridadesYOportunidades: false,
    });
    const alto = calculateSubsidioAgua({
      consumoM3: 10,
      numeroPersonas: 2,
      montoCuenta: 10_000,
      porcentajeAsignado: 99,
      seguridadesYOportunidades: false,
    });
    expect(bajo.subsidioPct).toBe(25);
    expect(alto.subsidioPct).toBe(85);
  });

  it('Seguridades y Oportunidades cubre 100% hasta 15 m³', () => {
    const result = calculateSubsidioAgua({
      consumoM3: 15,
      numeroPersonas: 3,
      montoCuenta: 18_000,
      porcentajeAsignado: 25,
      seguridadesYOportunidades: true,
    });
    expect(result.topeM3).toBe(15);
    expect(result.subsidioPct).toBe(100);
    expect(result.montoPagarEstimado).toBe(0);
  });

  it('sobre el tope solo estima la fracción cubierta', () => {
    const result = calculateSubsidioAgua({
      consumoM3: 26,
      numeroPersonas: 4,
      montoCuenta: 26_000,
      porcentajeAsignado: 50,
      seguridadesYOportunidades: false,
    });
    expect(result.consumoSubsidiado).toBe(13);
    expect(result.montoSubsidioEstimado).toBe(6_500);
    expect(result.montoPagarEstimado).toBe(19_500);
  });

  it('consumo cero no genera subsidio', () => {
    const result = calculateSubsidioAgua({
      consumoM3: 0,
      numeroPersonas: 1,
      montoCuenta: 10_000,
      porcentajeAsignado: 50,
      seguridadesYOportunidades: false,
    });
    expect(result.montoSubsidioEstimado).toBe(0);
    expect(result.montoPagarEstimado).toBe(10_000);
  });
});
