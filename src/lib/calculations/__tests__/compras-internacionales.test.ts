import { describe, it, expect } from 'vitest';
import {
  calculateComprasInternacionales,
  comprasInternacionalesToResults,
} from '../compras-internacionales';

const base = { envioUSD: 0, seguroUSD: 0, valorDolar: 1000 };

describe('compras-internacionales', () => {
  it('ejemplo oficial de Aduanas: CIF US$1.000 → derecho 60 + IVA 201,40 = 261,40', () => {
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 900,
      envioUSD: 90,
      seguroUSD: 10,
      plataformaInscrita: true,
    });
    expect(r.regimen).toBe('sobre500');
    expect(r.valorCifUSD).toBe(1000);
    expect(r.derechoUSD).toBe(60);
    expect(r.ivaUSD).toBe(201.4);
    expect(r.totalImpuestosUSD).toBe(261.4);
    expect(r.impuestosAlLlegarUSD).toBe(261.4);
    expect(r.totalImpuestosCLP).toBe(261_400);
    expect(r.costoTotalCLP).toBe(1_261_400);
  });

  it('≤ US$500 plataforma inscrita: solo IVA 19 % cobrado al pagar, sin arancel', () => {
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 100,
      envioUSD: 20,
      plataformaInscrita: true,
    });
    expect(r.regimen).toBe('hasta500_inscrita');
    expect(r.derechoUSD).toBe(0);
    expect(r.ivaUSD).toBe(22.8);
    expect(r.ivaEnCompraUSD).toBe(22.8);
    expect(r.impuestosAlLlegarUSD).toBe(0);
  });

  it('≤ US$500 plataforma no inscrita: IVA al llegar, sin arancel', () => {
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 50,
      plataformaInscrita: false,
    });
    expect(r.regimen).toBe('hasta500_no_inscrita');
    expect(r.derechoUSD).toBe(0);
    expect(r.ivaEnCompraUSD).toBe(0);
    expect(r.impuestosAlLlegarUSD).toBe(9.5);
  });

  it('borde: US$500 exactos sigue en el régimen especial; US$500,01 pasa al general', () => {
    expect(
      calculateComprasInternacionales({ ...base, precioUSD: 500, plataformaInscrita: true })
        .regimen,
    ).toBe('hasta500_inscrita');
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 500.01,
      plataformaInscrita: true,
    });
    expect(r.regimen).toBe('sobre500');
    expect(r.derechoUSD).toBe(30);
  });

  it('sobre US$500 con trato preferencial (TLC): derecho 0 %, IVA sobre CIF', () => {
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 1000,
      plataformaInscrita: false,
      tratamientoArancel: 'preferencial',
    });
    expect(r.derechoUSD).toBe(0);
    expect(r.ivaUSD).toBe(190);
  });

  it('el tratamiento arancelario no altera compras ≤ US$500', () => {
    const r = calculateComprasInternacionales({
      ...base,
      precioUSD: 200,
      plataformaInscrita: false,
      tratamientoArancel: 'general',
    });
    expect(r.derechoUSD).toBe(0);
  });

  it('rechaza precio cero o negativo', () => {
    expect(() =>
      calculateComprasInternacionales({ ...base, precioUSD: 0, plataformaInscrita: true }),
    ).toThrow();
  });

  it('ignora flete y seguro negativos', () => {
    const r = calculateComprasInternacionales({
      precioUSD: 100,
      envioUSD: -5,
      seguroUSD: -1,
      plataformaInscrita: true,
      valorDolar: 1000,
    });
    expect(r.valorCifUSD).toBe(100);
  });

  it('results: total destacado en CLP con fuente Aduanas', () => {
    const rows = comprasInternacionalesToResults(
      calculateComprasInternacionales({ ...base, precioUSD: 100, plataformaInscrita: true }),
    );
    expect(rows[0]).toMatchObject({ value: 19_000, format: 'CLP', highlight: true });
    expect(rows[0].note?.source?.url).toContain('aduana.cl');
  });
});
