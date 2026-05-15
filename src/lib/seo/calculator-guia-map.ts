// ============================================
// Mapping calculadora → guía pillar relacionada
// ----------------------------------------------
// Cada calculadora puede apuntar a una guía pillar (de /guias) que
// la cubre con detalle. Sirve para:
//   1. Linking interno calculadora → guía (mejora crawl y SEO topical
//      authority).
//   2. Schema mainEntity / isPartOf en JSON-LD.
//   3. Tarjeta visual "Lee la guía completa" en la página de la
//      calculadora.
//
// Si una calculadora no tiene guía dedicada, se cae a la guía de su
// categoría (ver `getGuiaForCalculator`).
// ============================================

import { calculators } from '@/data/calculators';
import { guias, type Guia } from '@/data/guias';
import type { Calculator } from '@/types/calculator';

/**
 * Mapeo explícito calculadora.slug → guía.slug para los casos
 * donde la calculadora tiene una guía pillar específica que la
 * cubre. Los casos no listados se resuelven por categoría.
 *
 * Cada entrada está revisada para asegurar que la guía realmente
 * trata el tema de la calculadora.
 */
const EXPLICIT_MAP: Record<string, string> = {
  // Sueldo
  'calculadora-sueldo-liquido': 'sueldo-liquido-chile',
  'calculadora-impuesto-segunda-categoria': 'sueldo-liquido-chile',
  'calculadora-comparador-afp': 'sueldo-liquido-chile',

  // Beneficios laborales / finiquito
  'calculadora-finiquito': 'finiquito-laboral-chile',
  'calculadora-indemnizacion-anos-servicio': 'finiquito-laboral-chile',
  'calculadora-vacaciones-proporcionales': 'finiquito-laboral-chile',
  'calculadora-gratificacion-legal': 'finiquito-laboral-chile',
  'calculadora-horas-extra': 'finiquito-laboral-chile',

  // Conversores e indicadores
  'calculadora-uf-clp': 'uf-utm-indicadores-chile',
  'calculadora-utm-clp': 'uf-utm-indicadores-chile',
  'calculadora-conversor-divisas': 'uf-utm-indicadores-chile',

  // Tributario
  'calculadora-iva': 'iva-boleta-honorarios-chile',
  'calculadora-boleta-honorarios': 'iva-boleta-honorarios-chile',
  'calculadora-operacion-renta': 'iva-boleta-honorarios-chile',
  'calculadora-ppm': 'iva-boleta-honorarios-chile',
};

/**
 * Mapeo fallback por categoría → slug de guía. Cuando una calculadora
 * no aparece en EXPLICIT_MAP, se intenta este mapeo.
 *
 * Los slugs aquí deben existir en `guias`. Si una categoría no tiene
 * guía dedicada, simplemente se omite y `getGuiaForCalculator`
 * devolverá `null`.
 */
const CATEGORY_FALLBACK: Partial<Record<Calculator['category'], string>> = {
  sueldo: 'sueldo-liquido-chile',
  beneficios: 'finiquito-laboral-chile',
  conversiones: 'uf-utm-indicadores-chile',
  impuestos: 'iva-boleta-honorarios-chile',
  // vivienda, vehiculos, pension, familia, empresas, etc. caerán a
  // `null` si su guía aún no existe. Es válido — el bloque "Lee la
  // guía" simplemente no se renderiza.
};

/**
 * Devuelve la guía pillar relacionada con una calculadora, o `null`
 * si no hay match.
 *
 * Resolución en cascada:
 *   1. EXPLICIT_MAP por slug exacto.
 *   2. CATEGORY_FALLBACK por categoría.
 *   3. `null`.
 */
export function getGuiaForCalculator(calc: Calculator): Guia | null {
  const explicitSlug = EXPLICIT_MAP[calc.slug];
  if (explicitSlug) {
    const found = guias.find((g) => g.slug === explicitSlug);
    if (found) return found;
  }
  const categorySlug = CATEGORY_FALLBACK[calc.category];
  if (categorySlug) {
    const found = guias.find((g) => g.slug === categorySlug);
    if (found) return found;
  }
  return null;
}

/**
 * Versión por slug de calculadora (útil cuando solo se tiene el slug).
 */
export function getGuiaForCalculatorSlug(slug: string): Guia | null {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return null;
  return getGuiaForCalculator(calc);
}
