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

  // Vivienda (nueva guía pillar)
  'calculadora-credito-hipotecario': 'credito-hipotecario-chile',
  'calculadora-subsidio-habitacional': 'comprar-vivienda-chile',
  'calculadora-contribuciones': 'comprar-vivienda-chile',
  'calculadora-costo-notaria': 'comprar-vivienda-chile',
  'calculadora-plusvalia': 'comprar-vivienda-chile',
  'calculadora-reajuste-arriendo': 'comprar-vivienda-chile',
  'calculadora-gastos-comunes': 'comprar-vivienda-chile',

  // Vehículos (nueva guía pillar)
  'calculadora-permiso-circulacion': 'vehiculos-chile-permiso-multas',
  'calculadora-multas-transito': 'vehiculos-chile-permiso-multas',
  'calculadora-costo-tag': 'vehiculos-chile-permiso-multas',
  'calculadora-credito-automotriz': 'vehiculos-chile-permiso-multas',
  'calculadora-patente-comercial': 'vehiculos-chile-permiso-multas',

  // Familia (nueva guía pillar)
  'calculadora-pension-alimenticia': 'familia-pension-alimenticia-chile',
  'calculadora-asignacion-familiar': 'familia-pension-alimenticia-chile',
  'calculadora-subsidio-agua': 'familia-pension-alimenticia-chile',
  'calculadora-bono-bodas-oro': 'familia-pension-alimenticia-chile',
  'calculadora-aguinaldo': 'familia-pension-alimenticia-chile',

  // Pensiones / previsional
  'calculadora-simulador-apv': 'afp-pension-chile',
  'calculadora-pgu': 'afp-pension-chile',
  'calculadora-cotizacion-independientes': 'afp-pension-chile',

  // Educación (nueva guía pillar)
  'calculadora-credito-cae': 'credito-cae-educacion-chile',
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
  vivienda: 'comprar-vivienda-chile',
  vehiculos: 'vehiculos-chile-permiso-multas',
  familia: 'familia-pension-alimenticia-chile',
  pension: 'afp-pension-chile',
  educacion: 'credito-cae-educacion-chile',
  // empresas, hogar, servicios → sin guía pillar dedicada todavía.
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
