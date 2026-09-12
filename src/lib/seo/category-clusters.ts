import type { Calculator } from '@/types/calculator';
import { calculators } from '@/data/calculators';
import { CALCULATOR_CATEGORIES } from '@/lib/calculatorCategories';
import { getGuiaForCalculator } from '@/lib/seo/calculator-guia-map';

export interface ClusterLink {
  href: string;
  label: string;
  desc?: string;
  badge?: string;
}

/**
 * Enlaces específicos curados para calculadoras de alta intención.
 * Concentran link equity en clusters temáticos clave (Laboral, Finiquito, Cesantía, Honorarios vs Contrato).
 */
const SPECIFIC_CLUSTER_MAP: Record<string, ClusterLink[]> = {
  finiquito: [
    { href: '/cesantia', label: 'Hub cesantía', desc: 'Checklist post-despido y plazos DT', badge: 'Hub' },
    {
      href: '/blog/seguro-cesantia-finiquito-2026-afc',
      label: 'Seguro de Cesantía y finiquito',
      desc: 'Giros AFC vs indemnización',
    },
    {
      href: '/blog/checklist-despues-despido-chile-2026',
      label: 'Checklist después del despido',
      desc: 'Qué hacer en los primeros 10 días',
    },
    { href: '/guias/finiquito-laboral-chile', label: 'Guía de finiquito', desc: 'Causales legales y cálculo paso a paso' },
    {
      href: '/calculadoras/calculadora-indemnizacion-anos-servicio',
      label: 'Indemnización por años',
      desc: 'Tope legal 90 UF y 11 años',
    },
    {
      href: '/calculadoras/calculadora-vacaciones-proporcionales',
      label: 'Vacaciones proporcionales',
      desc: 'Días hábiles en el finiquito',
    },
  ],
  'indemnizacion-anos-servicio': [
    { href: '/cesantia', label: 'Hub cesantía', desc: 'Recursos para cesantes en Chile' },
    { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito completo', desc: 'Cálculo integral con vacaciones' },
    {
      href: '/blog/seguro-cesantia-finiquito-2026-afc',
      label: 'Seguro de Cesantía AFC',
      desc: 'Compatibilidad con indemnizaciones',
    },
    { href: '/guias/finiquito-laboral-chile', label: 'Guía finiquito', desc: 'Aspectos legales DT' },
    {
      href: '/calculadoras/calculadora-vacaciones-proporcionales',
      label: 'Vacaciones proporcionales',
      desc: 'Cálculo de días pendientes',
    },
  ],
  'vacaciones-proporcionales': [
    { href: '/cesantia', label: 'Hub cesantía', desc: 'Gestión de finiquito y derechos' },
    { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito completo', desc: 'Incluye aviso previo y años' },
    {
      href: '/calculadoras/calculadora-indemnizacion-anos-servicio',
      label: 'Indemnización por años',
      desc: 'Tope 90 UF',
    },
    { href: '/guias/finiquito-laboral-chile', label: 'Guía finiquito', desc: 'Normativa DT feriado proporcional' },
    { href: '/calculadoras/calculadora-sueldo-liquido', label: 'Sueldo líquido', desc: 'Base para el valor día' },
  ],
  'sueldo-liquido': [
    { href: '/guias/sueldo-liquido-chile', label: 'Guía sueldo líquido', desc: 'Descuentos previsionales e IUSC' },
    {
      href: '/calculadoras/calculadora-boleta-honorarios',
      label: 'Boleta de honorarios',
      desc: 'Comparar contrato vs honorarios',
    },
    {
      href: '/calculadoras/calculadora-horas-extra',
      label: 'Horas extra',
      desc: 'Jornada 42 horas (Ley 40 Horas)',
    },
    {
      href: '/calculadoras/calculadora-gratificacion-legal',
      label: 'Gratificación legal',
      desc: 'Tope 4,75 IMM ($553.553)',
    },
    {
      href: '/calculadoras/calculadora-comparador-afp',
      label: 'Comparador de AFP',
      desc: 'Comisiones 2026 desde 0,46%',
    },
    {
      href: '/calculadoras/calculadora-impuesto-segunda-categoria',
      label: 'Impuesto 2.ª categoría',
      desc: 'Tramos mensuales en UTM',
    },
  ],
  'boleta-honorarios': [
    {
      href: '/guias/iva-boleta-honorarios-chile',
      label: 'Guía boleta e IVA',
      desc: 'Retención 15,25% y obligaciones SII',
    },
    {
      href: '/calculadoras/calculadora-sueldo-liquido',
      label: 'Sueldo líquido (contrato)',
      desc: 'Comparar con régimen dependiente',
    },
    {
      href: '/calculadoras/calculadora-cotizacion-independientes',
      label: 'Cotización independientes',
      desc: 'Operación Renta: total o parcial',
    },
    {
      href: '/calculadoras/calculadora-impuesto-segunda-categoria',
      label: 'Impuesto 2.ª categoría',
      desc: 'Tramos tributarios',
    },
    {
      href: '/calculadoras/calculadora-ppm',
      label: 'Cálculo de PPM',
      desc: 'Tasa mensual según régimen',
    },
    {
      href: '/calculadoras/calculadora-iva',
      label: 'Calculadora IVA 19%',
      desc: 'Neto a bruto y facturación',
    },
  ],
  'horas-extra': [
    { href: '/guias/sueldo-liquido-chile', label: 'Guía sueldo líquido', desc: 'Conceptos de remuneración imponible' },
    { href: '/calculadoras/calculadora-sueldo-liquido', label: 'Sueldo líquido', desc: 'Calcular sueldo base' },
    { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito', desc: 'Promedio de horas extraordinarias' },
    {
      href: '/blog/horas-extra-jornada-42-horas-chile-2026',
      label: 'Jornada 42 horas 2026',
      desc: 'Factores oficiales y Ley 21.561',
    },
  ],
  iva: [
    { href: '/guias/iva-boleta-honorarios-chile', label: 'Guía tributaria IVA', desc: 'DL 825 y tasa 19%' },
    { href: '/calculadoras/calculadora-boleta-honorarios', label: 'Boleta de honorarios', desc: 'Retención 15,25%' },
    { href: '/calculadoras/calculadora-ppm', label: 'Cálculo de PPM', desc: 'Pago mensual F29' },
    { href: '/calculadoras/calculadora-patente-comercial', label: 'Patente comercial', desc: 'Capital Propio y tasas' },
  ],
  'patente-comercial': [
    { href: '/calculadoras/calculadora-costo-empleado-pyme', label: 'Costo empleado PYME', desc: 'Cotización 3,5% y seguros' },
    { href: '/calculadoras/calculadora-iva', label: 'Calculadora IVA 19%', desc: 'Facturación y ventas netas' },
    { href: '/calculadoras/calculadora-ppm', label: 'Cálculo de PPM', desc: 'Tasa Pro Pyme 0,2%' },
    { href: '/calculadoras/calculadora-boleta-honorarios', label: 'Boleta de honorarios', desc: 'Retenciones y prestadores' },
  ],
  'credito-hipotecario': [
    { href: '/guias/credito-hipotecario-chile', label: 'Guía hipotecaria Chile', desc: 'Tasas, dividendos y gastos operacionales' },
    { href: '/calculadoras/calculadora-subsidio-habitacional', label: 'Subsidio habitacional', desc: 'DS1, DS49 y DS19 MINVU' },
    { href: '/calculadoras/calculadora-contribuciones', label: 'Contribuciones', desc: 'Avalúo fiscal SII y cuotas' },
    { href: '/calculadoras/calculadora-reajuste-arriendo', label: 'Reajuste de arriendo', desc: 'Variación por UF o IPC' },
    { href: '/calculadoras/calculadora-uf-clp', label: 'UF a Pesos hoy', desc: 'Valor oficial Banco Central' },
  ],
};

/**
 * Genera enlaces de clúster semántico para CUALQUIER calculadora.
 * Si tiene enlaces curados en `SPECIFIC_CLUSTER_MAP`, los usa.
 * Si no, genera dinámicamente enlaces a calculadoras de la misma categoría,
 * a la guía pillar de la categoría y al índice de la categoría.
 */
export function getCategoryClusterLinks(calculator: Calculator): ClusterLink[] {
  // 1. Si existe mapa curado específico, usarlo
  if (SPECIFIC_CLUSTER_MAP[calculator.id]) {
    return SPECIFIC_CLUSTER_MAP[calculator.id];
  }

  const links: ClusterLink[] = [];

  // 2. Guía pillar asociada (si existe)
  const guia = getGuiaForCalculator(calculator);
  if (guia) {
    links.push({
      href: `/guias/${guia.slug}`,
      label: `Guía: ${guia.title.split(':')[0]}`,
      desc: guia.intent,
      badge: 'Guía',
    });
  }

  // 3. Calculadoras hermanas de la misma categoría
  const siblings = calculators
    .filter((c) => c.category === calculator.category && c.id !== calculator.id)
    .slice(0, 4);

  for (const sibling of siblings) {
    links.push({
      href: `/calculadoras/${sibling.slug}`,
      label: sibling.name,
      desc: sibling.description.slice(0, 55) + '…',
    });
  }

  // 4. Enlace a la página de categoría
  const categoryConfig = CALCULATOR_CATEGORIES[calculator.category];
  if (categoryConfig) {
    links.push({
      href: `/categoria/${calculator.category}`,
      label: `Ver todas en ${categoryConfig.label}`,
      desc: categoryConfig.description.slice(0, 60) + '…',
      badge: 'Categoría',
    });
  }

  return links;
}
