// ============================================
// Tests de indemnización por años de servicio (Art. 163 CdT)
// ----------------------------------------------
// Verifica 30 días por año, tope 11 años, tope base 90 UF.
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateIndemnizacion, indemnizacionToResults } from '../indemnizacion';
import { UF, INDEMNIZACION } from '@/lib/values/constants';

describe('calculateIndemnizacion', () => {
  it('5 años de servicio: 30 días × 5 = 150 días', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 5,
      incluyeGratificacion: false,
    });
    expect(r.añosIndemnizables).toBe(5);
    expect(r.diasIndemnizacion).toBe(150);
    expect(r.indemnizacionTotal).toBe(800_000 * 5);
  });

  it('15 años de servicio: tope 11 años (330 días)', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 15,
      incluyeGratificacion: false,
    });
    expect(r.añosIndemnizables).toBe(11);
    expect(r.diasIndemnizacion).toBe(330);
    expect(r.aplicaTope).toBe(true);
  });

  it('sueldo sobre 90 UF se topea para el cálculo', () => {
    const sueldoAlto = 100 * UF.valor; // > 90 UF
    const r = calculateIndemnizacion({
      ultimoSueldo: sueldoAlto,
      añosTrabajados: 5,
      incluyeGratificacion: false,
    });
    expect(r.aplicaTope).toBe(true);
    // Base topeada en 90 UF
    expect(r.indemnizacionTotal).toBeCloseTo(90 * UF.valor * 5, -3);
  });

  it('incluye gratificación cuando corresponde', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 800_000,
      añosTrabajados: 5,
      incluyeGratificacion: true,
      gratificacionMensual: 200_000,
    });
    expect(r.baseCalculo).toBe(1_000_000);
    expect(r.indemnizacionTotal).toBe(1_000_000 * 5);
  });

  it('valor por día = base / 30', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 900_000,
      añosTrabajados: 3,
      incluyeGratificacion: false,
    });
    expect(r.valorDia).toBe(30_000);
    expect(r.indemnizacionTotal).toBe(30_000 * 90);
  });

  it('tope expuesto en CLP coincide con 90 UF', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 1_000_000,
      añosTrabajados: 1,
      incluyeGratificacion: false,
    });
    expect(r.topeUF).toBe(INDEMNIZACION.tope_uf_mensual);
    expect(r.topeMonto).toBe(Math.round(90 * UF.valor));
  });
});

describe('indemnización: art. 163 inc. 2 (fracción > 6 meses, mínimo 1 año, tope después)', () => {
  const base = { ultimoSueldo: 1_000_000, incluyeGratificacion: false };

  it('3 años y 7 meses = 4 años (120 días)', () => {
    const r = calculateIndemnizacion({ ...base, añosTrabajados: 3, mesesTrabajados: 7 });
    expect(r.añosIndemnizables).toBe(4);
    expect(r.diasIndemnizacion).toBe(120);
    expect(r.indemnizacionTotal).toBe(4_000_000);
  });

  it('3 años y 6 meses = 3 años', () => {
    const r = calculateIndemnizacion({ ...base, añosTrabajados: 3, mesesTrabajados: 6 });
    expect(r.añosIndemnizables).toBe(3);
    expect(r.indemnizacionTotal).toBe(3_000_000);
  });

  it('menos de 1 año = 0, aunque haya más de 6 meses', () => {
    const r = calculateIndemnizacion({ ...base, añosTrabajados: 0, mesesTrabajados: 11 });
    expect(r.añosIndemnizables).toBe(0);
    expect(r.indemnizacionTotal).toBe(0);
    expect(calculateIndemnizacion({ ...base, añosTrabajados: 0.9 }).indemnizacionTotal).toBe(0);
  });

  it('años con decimales: 1,5 → 1 y 1,8 → 2', () => {
    expect(calculateIndemnizacion({ ...base, añosTrabajados: 1.5 }).añosIndemnizables).toBe(1);
    expect(calculateIndemnizacion({ ...base, añosTrabajados: 1.8 }).añosIndemnizables).toBe(2);
  });

  it('10 años y 7 meses = 11 años; 11 años y 7 meses se topea en 11 y marca tope', () => {
    expect(calculateIndemnizacion({ ...base, añosTrabajados: 10, mesesTrabajados: 7 }).añosIndemnizables).toBe(11);
    const r = calculateIndemnizacion({ ...base, añosTrabajados: 11, mesesTrabajados: 7 });
    expect(r.añosIndemnizables).toBe(11);
    expect(r.aplicaTope).toBe(true);
    expect(calculateIndemnizacion({ ...base, añosTrabajados: 10, mesesTrabajados: 7 }).aplicaTope).toBe(false);
  });
});

describe('E-026: causal, aviso previo y recargos', () => {
  const base = { ultimoSueldo: 900_000, añosTrabajados: 5, mesesTrabajados: 7, incluyeGratificacion: false };

  it('art. 161 con aviso: solo años de servicio', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art161', avisoPrevio30Dias: true });
    expect(r.indemnizacionTotal).toBe(5_400_000);
    expect(r.indemnizacionAvisoPrevio).toBe(0);
    expect(r.recargoMonto).toBe(0);
    expect(r.totalAPagar).toBe(5_400_000);
    expect(r.correspondePorLey).toBe(true);
  });

  it('art. 161 sin aviso: suma un mes de sustitutiva', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art161', avisoPrevio30Dias: false });
    expect(r.indemnizacionAvisoPrevio).toBe(900_000);
    expect(r.totalAPagar).toBe(6_300_000);
  });

  it('sustitutiva con tope de 90 UF', () => {
    const r = calculateIndemnizacion({
      ultimoSueldo: 6_000_000,
      añosTrabajados: 3,
      incluyeGratificacion: false,
      avisoPrevio30Dias: false,
      valorUF: 40_000,
    });
    expect(r.indemnizacionAvisoPrevio).toBe(INDEMNIZACION.tope_uf_mensual * 40_000);
  });

  it('art. 159 o 160 sin sentencia: no corresponde por ley', () => {
    for (const causal of ['art159', 'art160'] as const) {
      const r = calculateIndemnizacion({ ...base, causal });
      expect(r.correspondePorLey).toBe(false);
      expect(r.totalAPagar).toBe(0);
    }
  });

  it('art. 161 con sentencia: recargo 30% sobre años', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art161', simularSentencia: true, recargoPct: 30 });
    expect(r.recargoMonto).toBe(1_620_000);
    expect(r.totalAPagar).toBe(5_400_000 + 1_620_000);
  });

  it('art. 160 injustificado: recargo 80%, sustitutiva incluida', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art160', simularSentencia: true, recargoPct: 80 });
    expect(r.recargoPct).toBe(80);
    expect(r.indemnizacionAvisoPrevio).toBe(900_000);
    expect(r.totalAPagar).toBe(5_400_000 + 900_000 + 5_400_000 * 0.8);
  });

  it('recargo no permitido para la causal se corrige', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art161', simularSentencia: true, recargoPct: 100 });
    expect(r.recargoPct).toBe(30);
  });

  it('autodespido (art. 171) con la sentencia simulada usa 50% u 80%', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art171', simularSentencia: true, recargoPct: 50 });
    expect(r.requiereSentencia).toBe(true);
    expect(r.recargoPct).toBe(50);
    expect(r.indemnizacionAvisoPrevio).toBe(900_000);
  });

  it('otras remuneraciones mensuales entran en la base (colación, movilización)', () => {
    const r = calculateIndemnizacion({ ...base, otrasRemuneracionesMensuales: 100_000 });
    expect(r.indemnizacionTotal).toBe(1_000_000 * 6);
  });
});


describe('fix 03-11-2026 (Devin Review de #68)', () => {
  const base = { ultimoSueldo: 900_000, añosTrabajados: 5, mesesTrabajados: 7, incluyeGratificacion: false };

  it('art. 171 sin simular la sentencia: no asume que el juez da la razón; muestra la base y el aviso', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art171', simularSentencia: false, recargoPct: 80 });
    expect(r.pendienteSentencia).toBe(true);
    expect(r.correspondePorLey).toBe(false);
    expect(r.recargoPct).toBe(0);
    expect(r.recargoMonto).toBe(0);
    expect(r.indemnizacionAvisoPrevio).toBe(0);
    expect(r.indemnizacionTotal).toBe(0);
    expect(r.totalAPagar).toBe(0);
    const rows = indemnizacionToResults(r);
    expect(rows[0].highlight).toBe(true);
    expect(rows[0].value).toBe(900_000);
    expect(rows[0].note?.text).toMatch(/depende de lo que resuelva el juez/);
    expect(rows.some((x) => /Recargo|Total si el juez/.test(x.label))).toBe(false);

    // Con la simulación encendida sí calcula sustitutiva + años + recargo.
    const s = calculateIndemnizacion({ ...base, causal: 'art171', simularSentencia: true, recargoPct: 80 });
    expect(s.pendienteSentencia).toBe(false);
    expect(s.totalAPagar).toBe(5_400_000 + 900_000 + 5_400_000 * 0.8);
  });

  it('renuncia (art. 159 N° 2): $0 aun simulando sentencia, sin sustitutiva ni recargo, con explicación', () => {
    for (const simularSentencia of [false, true]) {
      const r = calculateIndemnizacion({
        ...base,
        causal: 'renuncia',
        simularSentencia,
        avisoPrevio30Dias: false,
        recargoPct: 50,
      });
      expect(r.totalAPagar).toBe(0);
      expect(r.indemnizacionTotal).toBe(0);
      expect(r.indemnizacionAvisoPrevio).toBe(0);
      expect(r.recargoMonto).toBe(0);
      expect(r.recargoPct).toBe(0);
      const rows = indemnizacionToResults(r);
      expect(rows).toHaveLength(1);
      expect(rows[0].value).toBe(0);
      expect(rows[0].note?.text).toMatch(/renuncia \(art\. 159 N° 2\) no da derecho/i);
    }
  });

  it('mutuo acuerdo, fin de plazo y fin de obra (art. 159 N° 1, 4 y 5): sin sentencia no hay recargo del art. 168', () => {
    const r = calculateIndemnizacion({ ...base, causal: 'art159', simularSentencia: false, recargoPct: 50 });
    expect(r.recargoPct).toBe(0);
    expect(r.recargoMonto).toBe(0);
    expect(r.totalAPagar).toBe(0);
    // Solo si un juez declara injustificada la causal del art. 159 corre el 50% (art. 168 letra b).
    const s = calculateIndemnizacion({ ...base, causal: 'art159', simularSentencia: true, recargoPct: 80 });
    expect(s.recargoPct).toBe(50);
  });

  it('tope de 90 UF con la UF inyectada y su fecha; sin UF en vivo usa el snapshot con su fecha', () => {
    const r = calculateIndemnizacion({ ...base, valorUF: 40_000, ufFecha: '2026-11-03' });
    expect(r.topeMonto).toBe(90 * 40_000);
    const tope = indemnizacionToResults(r).find((x) => x.label.startsWith('Tope'));
    expect(tope?.label).toBe('Tope (90 UF, UF del 03-11-2026)');
    expect(tope?.value).toBe(3_600_000);

    const snap = calculateIndemnizacion({ ...base });
    expect(snap.topeMonto).toBe(Math.round(90 * UF.valor));
    expect(snap.ufFecha).toBe(UF.fecha_actualizacion);
  });
});
