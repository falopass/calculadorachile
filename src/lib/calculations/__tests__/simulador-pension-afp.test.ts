import { describe, it, expect } from 'vitest';
import {
  calculateSimuladorPensionAfp,
  calcularCNU,
  simuladorPensionAfpToResults,
} from '../simulador-pension-afp';

const FECHA = new Date('2026-11-22');
const UF_TEST = 40000;

describe('calcularCNU (TM2020 + TITRP 3,67%)', () => {
  it('golden: CNU hombre 65 años en 2026', () => {
    expect(calcularCNU('hombre', 65, 2026, 0.0367)).toBeCloseTo(14.889, 2);
  });
  it('golden: CNU mujer 65 años en 2026', () => {
    expect(calcularCNU('mujer', 65, 2026, 0.0367)).toBeCloseTo(16.762, 2);
  });
  it('CNU decrece con la edad', () => {
    const h60 = calcularCNU('hombre', 60, 2026, 0.0367);
    const h65 = calcularCNU('hombre', 65, 2026, 0.0367);
    const h70 = calcularCNU('hombre', 70, 2026, 0.0367);
    expect(h60).toBeGreaterThan(h65);
    expect(h65).toBeGreaterThan(h70);
  });
});

describe('calculateSimuladorPensionAfp', () => {
  it('golden: hombre 65, $100M saldo, 240 meses cotizados', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'hombre',
      edadActual: 65,
      edadPension: 65,
      saldoAfp: 100_000_000,
      sueldoImponible: 0,
      mesesCotizados: 240,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.pensionMensual).toBe(559679);
    expect(r.pguMensual).toBe(231732);
    expect(r.bacMensual).toBe(80000);
    expect(r.cevMensual).toBe(0);
    expect(r.pensionTotal).toBe(871411);
  });

  it('golden: mujer 65, misma condición: CEV iguala la pensión del hombre', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'mujer',
      edadActual: 65,
      edadPension: 65,
      saldoAfp: 100_000_000,
      sueldoImponible: 0,
      mesesCotizados: 240,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.pensionMensual).toBe(497168);
    expect(r.cevMensual).toBe(62511);
    expect(r.pguMensual).toBe(231732);
    expect(r.bacMensual).toBe(80000);
    // La CEV hace que el total coincida con el del hombre equivalente.
    expect(r.pensionTotal).toBe(871411);
  });

  it('proyección: cotiza 30 años desde los 35 y suma aporte empleador de la reforma', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'hombre',
      edadActual: 35,
      edadPension: 65,
      saldoAfp: 20_000_000,
      sueldoImponible: 1_000_000,
      mesesCotizados: 420,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.saldoProyectado).toBe(147042164);
    expect(r.pensionMensual).toBe(769787);
    expect(r.pguMensual).toBe(250275);
    expect(r.bacMensual).toBe(100000); // tope 2,5 UF × 40.000
    expect(r.pensionTotal).toBe(1120062);
    expect(r.anioPension).toBe(2056);
  });

  it('mujer 60: sin PGU, BAC ni CEV (exigen 65)', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'mujer',
      edadActual: 60,
      edadPension: 60,
      saldoAfp: 50_000_000,
      sueldoImponible: 0,
      mesesCotizados: 120,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.pensionMensual).toBe(224283);
    expect(r.cevMensual).toBe(0);
    expect(r.pguMensual).toBe(0);
    expect(r.bacMensual).toBe(0);
    expect(r.pensionTotal).toBe(r.pensionMensual);
  });

  it('BAC no aplica con menos meses que el mínimo exigido (hombre <240)', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'hombre',
      edadActual: 65,
      edadPension: 65,
      saldoAfp: 100_000_000,
      sueldoImponible: 0,
      mesesCotizados: 100,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.bacAplica).toBe(false);
    expect(r.bacMensual).toBe(0);
  });

  it('pensión alta sin PGU (sobre tramo máximo)', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'hombre',
      edadActual: 65,
      edadPension: 65,
      saldoAfp: 400_000_000,
      sueldoImponible: 0,
      mesesCotizados: 300,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.pensionMensual).toBeGreaterThan(1_252_602);
    expect(r.pguMensual).toBe(0);
    expect(r.bacMensual).toBe(100000); // tope 2,5 UF
  });

  it('sin sueldo imponible no proyecta cotizaciones', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'hombre',
      edadActual: 40,
      edadPension: 65,
      saldoAfp: 10_000_000,
      sueldoImponible: 0,
      mesesCotizados: 0,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    expect(r.saldoProyectado).toBe(10_000_000);
  });
});

describe('simuladorPensionAfpToResults', () => {
  it('primero la pensión total destacada y componentes presentes', () => {
    const r = calculateSimuladorPensionAfp({
      sexo: 'mujer',
      edadActual: 65,
      edadPension: 65,
      saldoAfp: 100_000_000,
      sueldoImponible: 0,
      mesesCotizados: 240,
      valorUF: UF_TEST,
      fecha: FECHA,
    });
    const results = simuladorPensionAfpToResults(r);
    expect(results[0].label).toContain('Pensión total');
    expect(results[0].highlight).toBe(true);
    const labels = results.map((x) => x.label);
    expect(labels.some((l) => l.includes('CEV'))).toBe(true);
    expect(labels.some((l) => l.includes('PGU'))).toBe(true);
    expect(labels.some((l) => l.includes('BAC'))).toBe(true);
  });
});
