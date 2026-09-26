// ============================================
// Tests del estimador de Becas y Gratuidad (admisión 2027)
// ----------------------------------------------
// Golden portal beneficiosestudiantiles.cl: gratuidad 60%; BB y
// BJGM 70% con PAES ≥510 (PACE exime); BEA 80% con top 10% NEM;
// BNM 70% técnica NEM ≥5,0; BNM II 50% primer año.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateBecasGratuidad } from '../becas-gratuidad';

const base = {
  nivelSocioeconomico: '50',
  tipoCarrera: 'universitaria',
  institucionGratuidad: false,
  puntajePaes: 0,
  nem: 0,
  top10: false,
  pace: false,
  primerAno: false,
};

describe('calculateBecasGratuidad', () => {
  it('hasta 60%, universitaria adscrita, PAES 600 → gratuidad + BB + BJGM', () => {
    const r = calculateBecasGratuidad({
      ...base,
      nivelSocioeconomico: '60',
      institucionGratuidad: true,
      puntajePaes: 600,
    });
    expect(r.cumpleGratuidad).toBe(true);
    expect(r.cumpleBicentenario).toBe(true);
    expect(r.cumpleJuanGomezMillas).toBe(true);
    expect(r.mayorTopeBecaCLP).toBe(1150000);
  });

  it('61–70%, técnica, NEM 5,5, no adscrita → solo BNM $600.000', () => {
    const r = calculateBecasGratuidad({
      ...base,
      nivelSocioeconomico: '70',
      tipoCarrera: 'tecnica',
      nem: 5.5,
    });
    expect(r.cumpleNuevoMilenio).toBe(true);
    expect(r.cumpleJuanGomezMillas).toBe(false); // PAES 0 y sin PACE
    expect(r.cumpleGratuidad).toBe(false);
    expect(r.mayorTopeBecaCLP).toBe(600000);
  });

  it('hasta 50%, técnica, primer año, NEM 5,2 → BNM + BNM II ($860.000)', () => {
    const r = calculateBecasGratuidad({
      ...base,
      tipoCarrera: 'tecnica',
      nem: 5.2,
      primerAno: true,
    });
    expect(r.cumpleNuevoMilenio).toBe(true);
    expect(r.cumpleNuevoMilenioII).toBe(true);
    expect(r.mayorTopeBecaCLP).toBe(860000);
  });

  it('71–80% con top 10% NEM → solo BEA $1.150.000', () => {
    const r = calculateBecasGratuidad({
      ...base,
      nivelSocioeconomico: '80',
      top10: true,
    });
    expect(r.cumpleExcelenciaAcademica).toBe(true);
    expect(r.mayorTopeBecaCLP).toBe(1150000);
  });

  it('más del 80% → sin beneficios', () => {
    const r = calculateBecasGratuidad({
      ...base,
      nivelSocioeconomico: '90',
      institucionGratuidad: true,
      puntajePaes: 800,
      top10: true,
    });
    expect(r.beneficios).toHaveLength(0);
    expect(r.mayorTopeBecaCLP).toBe(0);
  });

  it('PACE exime del puntaje PAES en BB/BJGM', () => {
    const r = calculateBecasGratuidad({
      ...base,
      nivelSocioeconomico: '70',
      pace: true,
    });
    expect(r.cumpleBicentenario).toBe(true);
    expect(r.cumpleJuanGomezMillas).toBe(true);
  });
});
