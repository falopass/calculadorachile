// ============================================
// Tests de sueldo docente (Carrera Docente)
// ----------------------------------------------
// Golden con valores jun-2026 (DT / CPEIP / Ley 21.806).
// El caso principal replica el ejemplo publicado en
// sueldospublicos.cl/calculadoras/docentes/ (20 h básica +
// 24 h media, 3 bienios, Avanzado, BRP título y mención).
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculateSueldoDocente,
  porcentajeBienios,
  VMHC_2026,
  TRAMO_PROGRESION_MAX,
  TRAMO_FIJO_MAX,
  BRP_2026,
} from '../sueldo-docente';

describe('porcentajeBienios', () => {
  it('0 bienios = 0%', () => {
    expect(porcentajeBienios(0)).toBe(0);
  });
  it('1 bienio = 3,38%', () => {
    expect(porcentajeBienios(1)).toBeCloseTo(3.38, 5);
  });
  it('15 bienios = tope 50%', () => {
    expect(porcentajeBienios(15)).toBe(50);
    expect(porcentajeBienios(20)).toBe(50);
  });
});

describe('calculateSueldoDocente', () => {
  it('caso golden: 20 h básica + 24 h media, 3 bienios, Avanzado, BRP completo', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 20,
      horasMedia: 24,
      tramo: 'avanzado',
      bienios: 3,
      brpTitulo: true,
      brpMencion: true,
      concentracionPrioritarios: 'ninguno',
      afp: 'habitat',
      saludTipo: 'fonasa',
      contratoIndefinido: false, // sin AFC trabajador, como el caso publicado
    });

    expect(r.haberes.rbmn).toBe(904_656); // 20×19.992 + 24×21.034
    expect(r.haberes.asignacionExperiencia).toBe(90_827); // 10,04% RBMN
    expect(r.haberes.tramoExperiencia).toBe(90_827);
    expect(r.haberes.tramoProgresion).toBe(26_228); // 131.142 × 3/15
    expect(r.haberes.tramoFijo).toBe(TRAMO_FIJO_MAX.avanzado);
    expect(r.haberes.brpTitulo).toBe(BRP_2026.titulo); // 44 h ≥ tope 30 h
    expect(r.haberes.brpMencion).toBe(BRP_2026.mencion);
    expect(r.totalHaberes).toBe(1_717_003);

    expect(r.descuentos.afp).toBe(193_506); // 11,27% Habitat
    expect(r.descuentos.salud).toBe(120_190); // 7% Fonasa
    // Impuesto con la UTM del snapshot (nov-2026): renta tributable
    // 1.403.307 × 4% − rebaja en UTM del tramo.
    expect(r.descuentos.impuesto).toBe(17_015);
    expect(r.totalDescuentos).toBe(330_711);
    expect(r.liquido).toBe(1_386_292);
  });

  it('44 h básica, Inicial, 1 bienio, sin BRP', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'inicial',
      bienios: 1,
      brpTitulo: false,
      brpMencion: false,
      concentracionPrioritarios: 'ninguno',
      afp: 'provida',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.rbmn).toBe(44 * VMHC_2026.basica); // 879.648
    expect(r.haberes.asignacionExperiencia).toBe(29_732); // 3,38%
    expect(r.haberes.tramoExperiencia).toBe(29_732);
    expect(r.haberes.tramoProgresion).toBe(1_318); // 19.774 × 1/15
    expect(r.haberes.tramoFijo).toBe(0);
    expect(r.haberes.brpTitulo).toBe(0);
    expect(r.totalHaberes).toBe(940_430);
    expect(r.liquido).toBeLessThan(r.totalHaberes);
  });

  it('sin tramo: no paga asignación de tramo pero sí experiencia', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 30,
      horasMedia: 0,
      tramo: 'sin-tramo',
      bienios: 5,
      brpTitulo: true,
      brpMencion: false,
      concentracionPrioritarios: 'ninguno',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.tramoExperiencia).toBe(0);
    expect(r.haberes.tramoProgresion).toBe(0);
    expect(r.haberes.tramoFijo).toBe(0);
    expect(r.asignacionTramo).toBe(0);
    // 16,7% de RBMN (5 bienios)
    expect(r.haberes.asignacionExperiencia).toBe(Math.round(30 * VMHC_2026.basica * 0.167));
    // BRP a tope de 30 h
    expect(r.haberes.brpTitulo).toBe(BRP_2026.titulo);
    expect(r.haberes.brpMencion).toBe(0);
  });

  it('mención sin título no paga', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'temprano',
      bienios: 4,
      brpTitulo: false,
      brpMencion: true,
      concentracionPrioritarios: 'ninguno',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.brpMencion).toBe(0);
  });

  it('alumnos prioritarios urbano ≥60%: 20% tramo + fijo', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'temprano',
      bienios: 4,
      brpTitulo: false,
      brpMencion: false,
      concentracionPrioritarios: 'urbana60',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.alumnosPrioritarios).toBe(
      Math.round(r.asignacionTramo * 0.2) + 66_128,
    );
  });

  it('prioritarios ≥80% sin tramo alto se trata como ≥60%', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'inicial',
      bienios: 2,
      brpTitulo: false,
      brpMencion: false,
      concentracionPrioritarios: 'avanzada80',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.alumnosPrioritarios).toBe(
      Math.round(r.asignacionTramo * 0.2) + 66_128,
    );
  });

  it('rural 45–60%: 10% del tramo sin fijo', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'experto2',
      bienios: 15,
      brpTitulo: false,
      brpMencion: false,
      concentracionPrioritarios: 'rural45',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.alumnosPrioritarios).toBe(Math.round(r.asignacionTramo * 0.1));
    expect(r.haberes.tramoProgresion).toBe(TRAMO_PROGRESION_MAX.experto2);
  });

  it('suma de horas mayor a 44 se topa en 44', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 30,
      horasMedia: 30,
      tramo: 'inicial',
      bienios: 0,
      brpTitulo: true,
      brpMencion: false,
      concentracionPrioritarios: 'ninguno',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.horasAplicadas).toBe(44);
    // RBMN solo paga las 44 h efectivas: 30 básica + 14 media
    expect(r.haberes.rbmn).toBe(30 * VMHC_2026.basica + 14 * VMHC_2026.media);
    // BRP topa en 30 h
    expect(r.haberes.brpTitulo).toBe(BRP_2026.titulo);
  });

  it('particular subvencionado: sin asignación de experiencia municipal (art. 84)', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'particular',
      horasBasica: 44,
      horasMedia: 0,
      tramo: 'inicial',
      bienios: 5,
      brpTitulo: true,
      brpMencion: false,
      concentracionPrioritarios: 'ninguno',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.haberes.asignacionExperiencia).toBe(0);
    // El componente de experiencia del tramo (art. 49) sí se extiende
    expect(r.haberes.tramoExperiencia).toBeGreaterThan(0);
  });

  it('0 horas produce haberes en 0 sin error', () => {
    const r = calculateSueldoDocente({
      tipoEmpleador: 'municipal',
      horasBasica: 0,
      horasMedia: 0,
      tramo: 'inicial',
      bienios: 0,
      brpTitulo: false,
      brpMencion: false,
      concentracionPrioritarios: 'ninguno',
      afp: 'capital',
      saludTipo: 'fonasa',
      contratoIndefinido: true,
    });
    expect(r.totalHaberes).toBe(0);
    expect(r.liquido).toBe(0);
  });
});
