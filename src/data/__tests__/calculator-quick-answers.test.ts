import { afterEach, describe, it, expect, vi } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { FALLBACK_VALUES } from '@/lib/values/fallback';
import { HORAS_EXTRA, INGRESO_MINIMO, JORNADA_LEGAL, PENSION_ALIMENTOS, PERMISO_CIRCULACION, SEGURO_CESANTIA_BENEFICIOS } from '@/lib/values/constants';
import { formatCLP } from '@/lib/formatters';
import { calculators } from '../calculators';
import { calculatePensionAlimenticia } from '@/lib/calculations/pension-alimenticia';
import { calculateTrabajoEnFeriado } from '@/lib/calculations/trabajo-en-feriado';
import { calculatePermisoCirculacion } from '@/lib/calculations/permiso-circulacion';

const CTX = { uf: FALLBACK_VALUES.uf, utm: FALLBACK_VALUES.utm };

const IDS = [
  'boleta-honorarios', 'iva', 'credito-automotriz', 'vacaciones-proporcionales',
  'asignacion-familiar', 'gratificacion-legal', 'impuesto-herencia',
  'impuesto-segunda-categoria', 'sueldo-liquido', 'horas-extra',
  'indemnizacion-anos-servicio', 'finiquito', 'utm-clp', 'uf-clp',
  'contribuciones', 'credito-cae', 'patente-comercial', 'sueldo-part-time',
  'factor-hora-extra', 'tope-imponible-90-uf', 'sueldo-casa-particular',
  'prenatal-postnatal', 'licencia-medica', 'seguro-cesantia', 'semana-corrida',
  'aguinaldo', 'capacidad-credito-hipotecario', 'plusvalia',
  'compras-internacionales', 'real-brasileno-clp', 'sol-peruano-clp',
  'trabajo-en-feriado', 'valor-hora-trabajo', 'costo-viaje', 'auto-electrico-vs-bencina', 'peso-argentino-clp',
  'operacion-renta', 'permiso-circulacion', 'dias-habiles', 'pension-alimenticia',
  'peso-colombiano-clp', 'peso-mexicano-clp', 'boliviano-clp',
];

describe('getQuickAnswer', () => {
  it('limita las respuestas a las existentes y las ocho prioritarias', () => {
    for (const calculator of calculators.filter((calculator) => !IDS.includes(calculator.id))) {
      expect(getQuickAnswer(calculator.id, CTX), calculator.id).toBeNull();
    }
  });

  it('no agrega respuestas a calculadoras no indexables', () => {
    for (const calculator of calculators.filter((calculator) => calculator.noIndex)) {
      expect(getQuickAnswer(calculator.id, CTX), calculator.id).toBeNull();
    }
  });

  it.each(['', 'constructor', '__proto__'])('sin entrada válida (%s) devuelve null', (id) => {
    expect(getQuickAnswer(id, CTX)).toBeNull();
  });

  it('recargos y permiso usan las mismas constantes que los módulos', () => {
    const feriado = calculateTrabajoEnFeriado({ sueldoBruto: INGRESO_MINIMO.mensual, horasTrabajadas: 1 });
    expect(feriado.recargo).toBe(HORAS_EXTRA.recargo_normal);
    for (const id of ['trabajo-en-feriado', 'valor-hora-trabajo']) {
      expect(getQuickAnswer(id, CTX)!.lead).toContain(`${feriado.recargo}%`);
    }
    const permiso = calculatePermisoCirculacion({ valorVehiculo: 0, electricoHibridoElegible: false });
    expect(permiso.utmEneroCLP).toBe(PERMISO_CIRCULACION.utmEneroCLP);
    expect(getQuickAnswer('permiso-circulacion', CTX)!.lead).toContain(formatCLP(permiso.utmEneroCLP));
  });

  it('pisos de alimentos coinciden con constantes y módulo, no con un porcentaje del sueldo', () => {
    const lead = getQuickAnswer('pension-alimenticia', CTX)!.lead;
    for (const numeroHijos of [1, 2]) {
      const pension = calculatePensionAlimenticia({ sueldoBruto: 0, numeroHijos, tieneOtroIngreso: false });
      const porcentaje = numeroHijos === 1
        ? PENSION_ALIMENTOS.minimo_imm_un_hijo
        : PENSION_ALIMENTOS.minimo_imm_dos_o_mas_por_hijo;
      expect(pension.porcentajeMinimoPorHijo).toBe(porcentaje);
      expect(lead).toContain(`${porcentaje}%`);
    }
    expect(lead).toContain(`${PENSION_ALIMENTOS.limite_general_ingreso}%`);
    expect(lead).toContain('No es un porcentaje del sueldo');
    expect(lead).toContain('excepciones fundadas');
  });

  it('semana-corrida: 150.000 en 5 días con 1 domingo → $30.000', () => {
    expect(getQuickAnswer('semana-corrida', CTX)!.lead).toContain('corresponden $30.000');
  });

  it('aguinaldo y plusvalía: cifras desde constantes', () => {
    expect(getQuickAnswer('aguinaldo', CTX)!.lead).toContain('$29.055 más $16.415 por carga');
    expect(getQuickAnswer('plusvalia', CTX)!.lead).toContain('8.000 UF');
  });

  it('IVA: neto 100.000 → IVA 19.000 y total 119.000', () => {
    const qa = getQuickAnswer('iva', CTX);
    expect(qa).not.toBeNull();
    const row = qa!.example!.rows.find((r) => r[0] === '$100.000');
    expect(row).toEqual(['$100.000', '$19.000', '$119.000']);
  });

  it('cada entrada tiene lead no vacío y filas no vacías', () => {
    for (const id of IDS) {
      const qa = getQuickAnswer(id, CTX);
      expect(qa, `falta quick answer para ${id}`).not.toBeNull();
      expect(qa!.lead.trim().length).toBeGreaterThan(0);
      if (qa!.example) {
        expect(qa!.example.rows.length).toBeGreaterThan(0);
        for (const row of qa!.example.rows) {
          expect(row.length).toBe(qa!.example!.headers.length);
          for (const cell of row) {
            expect(cell.trim().length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('ninguna celda contiene "NaN" ni "undefined"', () => {
    for (const id of IDS) {
      const qa = getQuickAnswer(id, CTX);
      const cells = [
        qa?.lead,
        // h1 es opcional (seguro-cesantia mantiene calculator.name).
        ...(qa?.h1 !== undefined ? [qa.h1] : []),
        ...(qa?.shortAnswers?.flatMap((a) => [a.question, a.answer]) ?? []),
        ...(qa?.example?.headers ?? []),
        ...(qa?.example?.rows.flat() ?? []),
      ];
      for (const cell of cells) {
        expect(cell, `${id} contiene NaN/undefined`).not.toMatch(/NaN|undefined/);
      }
    }
  });

  it('uf-clp (E-018): 20 montos, fila 1.000 UF generada y lead según frescura', () => {
    const fresca = getQuickAnswer('uf-clp', {
      ...CTX,
      ufFecha: '2026-10-29T03:00:00.000Z',
      ufFresca: true,
    })!;
    expect(fresca.h1).toBe('Conversor UF a pesos: valor de hoy y tabla de montos');
    const rows = fresca.example!.rows;
    expect(rows).toHaveLength(20);
    const fila1000 = rows.find((r) => r[0] === '1.000 UF')!;
    expect(fila1000[1]).toBe(formatCLP(Math.round(1000 * CTX.uf)));
    expect(fresca.lead.startsWith('Hoy 29-10-2026 la UF vale')).toBe(true);
    expect(fresca.example!.caption).toContain('UF del 29-10-2026');
    expect(fresca.shortAnswers).toHaveLength(3);

    const vieja = getQuickAnswer('uf-clp', { ...CTX, ufFecha: '2026-10-25T03:00:00.000Z', ufFresca: false })!;
    expect(vieja.lead).not.toContain('Hoy');
    expect(vieja.lead.startsWith('Valor de referencia: la UF del 25-10-2026')).toBe(true);
    expect(vieja.example!.caption).not.toContain('Banco Central');
    expect(fresca.example!.caption).toContain('(Banco Central de Chile)');

    const sinFecha = getQuickAnswer('uf-clp', CTX)!;
    expect(sinFecha.example!.caption).not.toMatch(/hoy|UF del/i);
  });

  it('gratificación (E-014): tope generado, fila del umbral y sin montos escritos a mano', () => {
    const qa = getQuickAnswer('gratificacion-legal', CTX)!;
    expect(qa.h1).toBe('Calculadora de gratificación legal y tope 2026 (4,75 IMM)');
    expect(qa.lead).toContain('$2.629.377');
    expect(qa.lead).toContain('$219.115');
    expect(qa.lead).toContain('$876.459');
    const rows = qa.example!.rows;
    expect(rows.map((r) => r[0])).toEqual(['$553.553', '$800.000', '$876.459', '$1.500.000']);
    expect(rows[2]).toEqual(['$876.459', '$219.115', '$2.629.377', '4.75 IMM']);
    expect(qa.shortAnswers?.length).toBe(3);
  });

  it('vacaciones (E-017): tabla de 1 a 11 meses; 6 meses = 10,5 corridos y $280.000', () => {
    const qa = getQuickAnswer('vacaciones-proporcionales', CTX)!;
    const rows = qa.example!.rows;
    expect(rows.length).toBe(11);
    expect(rows.map((r) => Number(r[0]))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const seis = rows.find((r) => r[0] === '6')!;
    expect(seis).toContain('10,5');
    expect(seis).toContain('$280.000');
    expect(rows.find((r) => r[0] === '11')).toContain('20,75');
    expect(qa.shortAnswers?.length).toBe(3);
    expect(qa.lead).toContain('$280.000');
  });

  it('devuelve null para calculadoras sin entrada', () => {
    expect(getQuickAnswer('calculadora-inexistente', CTX)).toBeNull();
  });

  describe('sueldo-part-time: tabla de jornadas', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('filas 18, 20, 25, 30, 36 y la jornada vigente; 4 columnas', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      expect(qa.example!.headers).toHaveLength(4);
      expect(qa.example!.rows.map((r) => r[0])).toEqual([
        '18 horas',
        '20 horas',
        '25 horas',
        '30 horas',
        '36 horas',
        `${JORNADA_LEGAL.actual} horas`,
      ]);
    });

    it('20 h → mínimo proporcional (IMM × 20 ÷ jornada vigente)', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row = qa.example!.rows.find((r) => r[0] === '20 horas')!;
      expect(row[1]).toBe('Parcial: mínimo proporcional');
      expect(row[2]).toBe(formatCLP(Math.round((INGRESO_MINIMO.mensual * 20) / JORNADA_LEGAL.actual)));
    });

    it('36 h → jornada intermedia con IMM íntegro (no proporcional)', () => {
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row = qa.example!.rows.find((r) => r[0] === '36 horas')!;
      expect(row[1]).toBe('Intermedia: mínimo íntegro');
      expect(row[2]).toBe(formatCLP(INGRESO_MINIMO.mensual));
    });

    it('con IMM $553.553 al 29-10-2026: 20 h = $263.597 y caption con 42 h vigentes', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-10-29T12:00:00-03:00'));
      if (INGRESO_MINIMO.mensual !== 553_553) return; // cambia con el IMM 2027
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      const row20 = qa.example!.rows.find((r) => r[0] === '20 horas')!;
      expect(row20[2]).toBe('$263.597');
      expect(qa.example!.rows.at(-1)).toEqual(['42 horas', 'Completa (vigente)', '$553.553', '$3.075']);
      expect(qa.example!.caption).toContain('42 horas desde el 26 de abril de 2026');
      expect(qa.example!.caption).toContain('baja a 40 horas el 26 de abril de 2028');
      expect(qa.example!.caption).toContain('hasta 41 horas');
    });

    it('desde el 26-04-2028 la última fila es 40 h y no hay "próximo cambio"', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2028-04-26T12:00:00-04:00'));
      const qa = getQuickAnswer('sueldo-part-time', CTX)!;
      expect(qa.example!.rows.at(-1)![0]).toBe('40 horas');
      expect(qa.example!.caption).not.toContain('baja a');
      expect(qa.example!.caption).toContain('hasta 39 horas');
    });
  });

  describe('licencia-medica: tabla de 1 a 15 días (E-020)', () => {
    it('15 filas; 1 a 3 días sin pago; 10 días → 7 pagados; 11 → 11', () => {
      const qa = getQuickAnswer('licencia-medica', CTX)!;
      const rows = qa.example!.rows;
      expect(rows).toHaveLength(15);
      expect(rows.slice(0, 3).map((r) => r[1])).toEqual(['0', '0', '0']);
      expect(rows[0]).toEqual(['1 día', '0', '$0']);
      expect(rows[3]).toEqual(['4 días', '1', '$30.000']);
      expect(rows[9]).toEqual(['10 días', '7', '$210.000']);
      expect(rows[10]).toEqual(['11 días', '11', '$330.000']);
      expect(rows[14]).toEqual(['15 días', '15', '$450.000']);
      expect(qa.example!.caption).toContain('Con 10 días te pagan 7; con 11, te pagan 11.');
    });

    it('h1 propio y lead con fuentes DT y SUSESO', () => {
      const qa = getQuickAnswer('licencia-medica', CTX)!;
      expect(qa.h1).toBe('Calculadora de licencia médica: cuánto y cuántos días te pagan');
      const hrefs = (qa.leadParts ?? []).flatMap((p) => (typeof p === 'string' ? [] : [p.href]));
      expect(hrefs.some((h) => h.includes('dt.gob.cl'))).toBe(true);
      expect(hrefs.some((h) => h.includes('suseso.gob.cl'))).toBe(true);
      expect(hrefs.join(' ')).not.toContain('95312');
    });
  });

  describe('seguro-cesantia: ejemplo $800.000 (E-022)', () => {
    it('no define h1 (se mantiene calculator.name)', () => {
      expect(getQuickAnswer('seguro-cesantia', CTX)!.h1).toBeUndefined();
    });

    it('5 giros generados con la constante, dentro de mínimos y máximos', () => {
      const qa = getQuickAnswer('seguro-cesantia', CTX)!;
      const rows = qa.example!.rows;
      expect(rows).toHaveLength(SEGURO_CESANTIA_BENEFICIOS.fcs.pagos);
      expect(rows[0]).toEqual(['1.º', '70% · $560.000', '60% · $480.000']);
      expect(rows.map((r) => r[1])).toEqual([
        '70% · $560.000',
        '60% · $480.000',
        '45% · $360.000',
        '40% · $320.000',
        '35% · $280.000',
      ]);
      expect(rows.map((r) => r[2])).toEqual([
        '60% · $480.000',
        '40% · $320.000',
        '35% · $280.000',
        '30% · $240.000',
        '30% · $240.000',
      ]);
      expect(qa.example!.caption).toContain('28 de febrero de 2027');
    });

    it('respuesta corta del primer pago con fuente AFC', () => {
      const qa = getQuickAnswer('seguro-cesantia', CTX)!;
      expect(qa.shortAnswers![0].answer).toContain('jueves');
      expect(qa.shortAnswers![0].sources[0].href).toContain('afc.cl');
      expect(qa.lead).not.toMatch(/cinco días hábiles|5 días hábiles/);
    });
  });
});
