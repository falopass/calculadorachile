import { describe, it, expect } from 'vitest';
import { getQuickAnswer } from '../calculator-quick-answers';
import { calculatorMethodologies } from '../calculator-methodologies';
import { calculateFiniquito } from '@/lib/calculations/finiquito';
import { formatCLP } from '@/lib/formatters';

const CTX = { uf: 41_189.24, utm: 72_151 };

describe('tabla de ejemplos del finiquito: sin gratificación', () => {
  it('el total no suma gratificación proporcional y la leyenda lo dice', () => {
    const qa = getQuickAnswer('finiquito', CTX)!;
    expect(qa.example!.caption).toContain('sin gratificación proporcional');
    expect(qa.example!.caption).not.toContain('con gratificación');
    const [sueldo, años] = [800_000, 5];
    const sinGrat = calculateFiniquito({
      ultimoSueldo: sueldo,
      añosTrabajados: años,
      mesesTrabajados: 6,
      causaTermino: 'necesidades_empresa',
      incluyeAvisoPrevio: true,
      tieneGratificacion: false,
    });
    expect(sinGrat.gratificacionProporcional).toBe(0);
    const fila = qa.example!.rows.find((r) => r[0] === formatCLP(sueldo));
    expect(fila![3]).toBe(formatCLP(sinGrat.totalFiniquito));
    // 5 años × 800.000 + 800.000 aviso + 7,5 días hábiles × 800.000/30 = 4.800.000 + 200.000
    expect(sinGrat.totalFiniquito).toBe(5_000_000);
  });
});

describe('metodología del finiquito: feriado en días corridos', () => {
  it('10 días hábiles = al menos 14 días corridos = $373.333, con fuente DT', () => {
    const ex = calculatorMethodologies.finiquito.workedExample!;
    const texto = ex.development.join(' ');
    expect(texto).toContain('al menos 14 días corridos');
    expect(texto).toContain('al menos 14 días corridos si el término es en día hábil');
    expect(texto).toContain('$373.333');
    expect(texto).toContain('https://www.dt.gob.cl/portal/1628/w3-article-60200.html');
    expect(texto).not.toContain('$266.667');
    expect(Math.round((14 / 30) * 800_000)).toBe(373_333);
    expect(ex.result).toContain('$3.573.333');
  });
});

describe('tabla de ejemplos de la UTM: indica el mes del valor', () => {
  it('con UTM fresca usa su mes', () => {
    const qa = getQuickAnswer('utm-clp', {
      ...CTX,
      utmFresca: { value: 72_440, date: '2026-11-01T03:00:00.000Z' },
    })!;
    expect(qa.example!.caption).toBe(
      'Equivalencias con UTM de $72.440 (noviembre de 2026). El valor se reajusta cada mes según el IPC.',
    );
  });

  it('con el valor de respaldo (ctx.utm) indica el mes de su fecha', () => {
    const qa = getQuickAnswer('utm-clp', {
      ...CTX,
      utmFresca: null,
      utmFecha: '2026-10-20T03:00:00.000Z',
    })!;
    expect(qa.example!.caption).toBe(
      'Equivalencias con UTM de $72.151 (octubre de 2026). El valor se reajusta cada mes según el IPC.',
    );
  });

  it('fecha solo día (normalizada a mediodía UTC) no se corre al mes anterior', () => {
    const qa = getQuickAnswer('utm-clp', { ...CTX, utmFresca: null, utmFecha: '2026-10-01T12:00:00.000Z' })!;
    expect(qa.example!.caption).toContain('(octubre de 2026)');
  });
});
