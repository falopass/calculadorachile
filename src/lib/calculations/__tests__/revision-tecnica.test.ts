import { describe, expect, it } from 'vitest';
import {
  calculateRevisionTecnica,
  revisionTecnicaToResults,
} from '../revision-tecnica';

describe('calculateRevisionTecnica', () => {
  it('devuelve noviembre para patente terminada en 8', () => {
    const r = calculateRevisionTecnica({
      patente: 'AB-CD-18',
      tipoVehiculo: 'particular-anual',
    });
    expect(r.digito).toBe(8);
    expect(r.mes).toBe('noviembre');
    expect(r.mesAdelanto).toBe('octubre');
  });

  it('devuelve enero para dígito 9 y adelanto en diciembre', () => {
    const r = calculateRevisionTecnica({
      patente: 'ghjk29',
      tipoVehiculo: 'particular-anual',
    });
    expect(r.digito).toBe(9);
    expect(r.mes).toBe('enero');
    expect(r.mesAdelanto).toBe('diciembre del año anterior');
  });

  it('devuelve febrero para dígito 0 y abril para dígito 1', () => {
    const d0 = calculateRevisionTecnica({
      patente: 'WX-1230',
      tipoVehiculo: 'particular-anual',
    });
    expect(d0.mes).toBe('febrero');
    const d1 = calculateRevisionTecnica({
      patente: 'WX-1231',
      tipoVehiculo: 'particular-anual',
    });
    expect(d1.mes).toBe('abril');
    expect(d1.mesAdelanto).toBe('marzo');
  });

  it('cubre los 10 dígitos sin dejar marzo ni diciembre como mes propio', () => {
    const meses = new Set<string>();
    for (let d = 0; d <= 9; d++) {
      const r = calculateRevisionTecnica({
        patente: `AA${d}`,
        tipoVehiculo: 'particular-anual',
      });
      expect(r.mes).toBeTruthy();
      meses.add(r.mes!);
    }
    expect(meses).not.toContain('marzo');
    expect(meses).not.toContain('diciembre');
    expect(meses.size).toBe(10);
  });

  it('marca error con patente vacía o sin dígito final', () => {
    expect(
      calculateRevisionTecnica({ patente: '', tipoVehiculo: 'particular-anual' })
        .error,
    ).toBe('vacio');
    expect(
      calculateRevisionTecnica({
        patente: 'AB-CD',
        tipoVehiculo: 'particular-anual',
      }).error,
    ).toBe('sin-digito');
  });

  it('vehículo nuevo agrega aviso de 36-48 meses', () => {
    const r = calculateRevisionTecnica({
      patente: 'PK-RT-78',
      tipoVehiculo: 'vehiculo-nuevo',
    });
    const results = revisionTecnicaToResults(r);
    expect(results.some((x) => x.textValue?.includes('36 y 48 meses'))).toBe(
      true,
    );
  });

  it('el resultado principal muestra el mes en texto destacado', () => {
    const r = calculateRevisionTecnica({
      patente: 'BB-45-43',
      tipoVehiculo: 'particular-anual',
    });
    const results = revisionTecnicaToResults(r);
    const mes = results.find((x) => x.label === 'Mes que te corresponde');
    expect(mes?.textValue).toBe('junio');
    expect(mes?.highlight).toBe(true);
  });
});
