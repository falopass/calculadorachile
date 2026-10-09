// ============================================
// Tests de Sueldo Trabajadora de Casa Particular
// ----------------------------------------------
// Golden con parámetros oficiales:
// - IMM $553.553 (Ley 21.830) = mínimo de casa particular (art. 44
//   inc. 3 CdT; DT ficha 98984, Ley 20.279).
// - 1,11% indemnización a todo evento (art. 163 CdT).
// - 3% seguro de cesantía de cargo del empleador (DT, minisitio casa
//   particular): $553.553 × 3% = $16.607.
// - Reforma Ley 21.735: 3,5% desde ago-2026 con SIS incluido
//   (ChileAtiende 130987 y 133768).
// - Accidentes del trabajo 0,95% (DT).
// ============================================

import { describe, it, expect } from 'vitest';
import {
  calculateSueldoCasaParticular,
  sueldoCasaParticularToResults,
} from '../sueldo-casa-particular';
import { INGRESO_MINIMO } from '@/lib/values/constants';

const OCT_2026 = new Date('2026-10-15T12:00:00');
const UF_REF = 40_000;

describe('calculateSueldoCasaParticular', () => {
  it('golden: puertas adentro con IMM $553.553, AFP Uno, octubre 2026', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-adentro',
      sueldoBruto: 553_553,
      afp: 'uno',
      valorUF: UF_REF,
      fecha: OCT_2026,
    });
    expect(r.minimoLegal).toBe(553_553);
    expect(r.cumpleMinimo).toBe(true);
    // Trabajadora: AFP 10,46% y salud 7%; no aporta a cesantía.
    expect(r.descuentos.afp).toBe(57_902);
    expect(r.descuentos.salud).toBe(38_749);
    expect(r.descuentos.impuesto).toBe(0);
    expect(r.liquido).toBe(456_902);
    // Empleador.
    expect(r.aportesEmpleador.indemnizacionTodoEvento).toBe(6_144);
    expect(r.aportesEmpleador.seguroCesantia).toBe(16_607);
    expect(r.aportesEmpleador.tasaReforma).toBe(3.5);
    expect(r.aportesEmpleador.reformaPrevisional).toBe(19_374);
    expect(r.aportesEmpleador.sis).toBe(0);
    expect(r.aportesEmpleador.accidentesTrabajo).toBe(5_259);
    expect(r.aportesEmpleador.total).toBe(47_384);
    expect(r.costoTotalMensual).toBe(600_937);
    // Desahucio sin aviso: última remuneración mensual (art. 161 inc. 2).
    expect(r.indemnizacionSinAviso).toBe(553_553);
  });

  it('puertas adentro ignora horas: siempre IMM íntegro', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-adentro',
      horasSemanales: 20,
      afp: 'uno',
      fecha: OCT_2026,
    });
    expect(r.horasSemanales).toBe(0);
    expect(r.minimoLegal).toBe(INGRESO_MINIMO.mensual);
  });

  it('puertas afuera 20 h → mínimo proporcional $263.597 y se usa si no hay sueldo', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-afuera',
      horasSemanales: 20,
      afp: 'uno',
      valorUF: UF_REF,
      fecha: OCT_2026,
    });
    expect(r.esJornadaParcial).toBe(true);
    expect(r.minimoLegal).toBe(263_597);
    expect(r.sueldoInformado).toBe(false);
    expect(r.sueldoBruto).toBe(263_597);
  });

  it('puertas afuera 36 h (jornada intermedia) → IMM íntegro', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-afuera',
      horasSemanales: 36,
      afp: 'uno',
      fecha: OCT_2026,
    });
    expect(r.minimoLegal).toBe(INGRESO_MINIMO.mensual);
  });

  it('sueldo bajo el mínimo → marca diferencia', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-afuera',
      horasSemanales: 42,
      sueldoBruto: 500_000,
      afp: 'uno',
      fecha: OCT_2026,
    });
    expect(r.cumpleMinimo).toBe(false);
    expect(r.diferencia).toBe(53_553);
  });

  it('julio 2026: reforma 1% y SIS 1,62% por separado', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-adentro',
      sueldoBruto: 600_000,
      afp: 'habitat',
      valorUF: UF_REF,
      fecha: new Date('2026-07-15T12:00:00'),
    });
    expect(r.aportesEmpleador.tasaReforma).toBe(1);
    expect(r.aportesEmpleador.reformaPrevisional).toBe(6_000);
    expect(r.aportesEmpleador.sis).toBe(9_720);
  });

  it('topes: 1,11% hasta 90 UF y cesantía hasta 135,2 UF', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-adentro',
      sueldoBruto: 4_000_000,
      afp: 'uno',
      valorUF: UF_REF,
      fecha: OCT_2026,
    });
    // 90 UF × $40.000 = $3.600.000 × 1,11%
    expect(r.aportesEmpleador.indemnizacionTodoEvento).toBe(39_960);
    // 4.000.000 < 135,2 UF ($5.408.000) → 3% del sueldo completo
    expect(r.aportesEmpleador.seguroCesantia).toBe(120_000);
    expect(r.descuentos.impuesto).toBeGreaterThan(0);
    expect(r.liquido).toBe(r.sueldoBruto - r.descuentos.total);
  });

  it('adapter: líquido destacado y sin NaN', () => {
    const r = calculateSueldoCasaParticular({
      modalidad: 'puertas-afuera',
      horasSemanales: 42,
      sueldoBruto: 600_000,
      afp: 'modelo',
      fecha: OCT_2026,
    });
    const results = sueldoCasaParticularToResults(r);
    expect(results[0]).toMatchObject({ label: 'Sueldo líquido estimado', highlight: true });
    for (const item of results) expect(Number.isFinite(item.value)).toBe(true);
  });
});
