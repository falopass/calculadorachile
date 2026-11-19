import { describe, it, expect } from 'vitest';
import { getArticleBySlug } from '../articles';
import { formatCLP } from '@/lib/formatters';
import { APV_REGIMEN_B, IMPUESTO_SEGUNDA_CATEGORIA_2026, UF, UTM } from '@/lib/values/constants';

const SLUG = 'apv-2026-simulador-ahorro-tributario';

describe('#23: post APV 2026 y beneficio tributario', () => {
  const art = getArticleBySlug(SLUG)!;

  it('existe, embebe el simulador APV y enlaza la guía de AFP', () => {
    expect(art).toBeDefined();
    expect(art.embedCalculatorId).toBe('simulador-apv');
    expect(art.relatedCalculators).toContain('calculadora-simulador-apv');
    expect(art.relatedGuia).toBe('afp-pension-chile');
    expect(art.content).toContain('href="/calculadoras/calculadora-simulador-apv"');
  });

  it('topes en pesos desde UF y UTM vigentes (600 UF, 50 UF, 6 UTM, 40 UTM)', () => {
    expect(APV_REGIMEN_B.tope_uf_anual).toBe(600);
    expect(art.content).toContain(formatCLP(Math.round(600 * UF.valor)));
    expect(art.content).toContain(formatCLP(Math.round(50 * UF.valor)));
    expect(art.content).toContain(formatCLP(Math.round(6 * UTM.valor)));
    expect(art.content).toContain(formatCLP(Math.round(40 * UTM.valor)));
  });

  it('tabla por tramo: régimen B = aporte × tasa marginal; régimen A = 15% con tope 6 UTM', () => {
    const aporte = 1_000_000;
    const bonificacion = Math.min(aporte * 0.15, Math.round(6 * UTM.valor));
    expect(bonificacion).toBe(150_000); // $1.000.000 queda bajo el tope de 6 UTM
    for (const { tasa } of IMPUESTO_SEGUNDA_CATEGORIA_2026.tramos) {
      expect(art.content).toContain(
        `<td>${formatCLP(Math.round(aporte * tasa))}</td><td>${formatCLP(bonificacion)}</td></tr>`,
      );
    }
    expect(art.content).toContain('<td>Exento</td><td>$0</td><td>$150.000</td>');
    expect(art.content).toContain('<td>23%</td><td>$230.000</td><td>$150.000</td>');
    expect(art.content).toContain('<td>13,5%</td><td>$135.000</td><td>$150.000</td>');
  });

  it('cita las fuentes oficiales del cálculo', () => {
    const urls = (art.sources ?? []).map((s) => s.url);
    expect(urls).toContain('https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf');
    expect(urls).toContain('https://www.bcn.cl/leychile/navegar?idNorma=7147');
    expect(urls).toContain('https://www.bcn.cl/leychile/navegar?idNorma=6368');
  });
});
