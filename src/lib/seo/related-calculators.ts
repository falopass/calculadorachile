// ============================================
// Related calculators — clusters de dinero / SEO
// ----------------------------------------------
// Prioriza páginas con impresiones GSC o clusters
// temáticos (más pageviews internos → más AdSense).
// ============================================

import type { Calculator } from '@/types/calculator';

/**
 * Relacionados explícitos por slug (orden = prioridad de link).
 * Fuente: GSC 24h jul-2026 + clusters editoriales.
 */
const RELATED_BY_SLUG: Record<string, string[]> = {
  // Tributario (IVA sangra imp sin clic)
  'calculadora-iva': [
    'calculadora-boleta-honorarios',
    'calculadora-utm-clp',
    'calculadora-ppm',
    'calculadora-operacion-renta',
    'calculadora-patente-comercial',
  ],
  'calculadora-boleta-honorarios': [
    'calculadora-sueldo-liquido',
    'calculadora-iva',
    'calculadora-cotizacion-independientes',
    'calculadora-impuesto-segunda-categoria',
    'calculadora-ppm',
  ],
  'calculadora-ppm': [
    'calculadora-iva',
    'calculadora-boleta-honorarios',
    'calculadora-operacion-renta',
  ],
  'calculadora-operacion-renta': [
    'calculadora-boleta-honorarios',
    'calculadora-iva',
    'calculadora-ppm',
    'calculadora-impuesto-segunda-categoria',
  ],

  // Educación / CAE (alta búsqueda)
  'calculadora-credito-cae': [
    'calculadora-uf-clp',
    'calculadora-credito-hipotecario',
    'calculadora-sueldo-liquido',
    'calculadora-simulador-apv',
  ],

  // Empresas / patente (top clics)
  'calculadora-patente-comercial': [
    'calculadora-iva',
    'calculadora-costo-empleado-pyme',
    'calculadora-contribuciones',
    'calculadora-ppm',
    'calculadora-boleta-honorarios',
  ],
  'calculadora-costo-empleado-pyme': [
    'calculadora-sueldo-liquido',
    'calculadora-patente-comercial',
    'calculadora-gratificacion-legal',
    'calculadora-finiquito',
  ],

  // Laboral (clúster embudo: 5 links fuertes + puente cesantía vía page)
  'calculadora-sueldo-liquido': [
    'calculadora-finiquito',
    'calculadora-horas-extra',
    'calculadora-boleta-honorarios',
    'calculadora-impuesto-segunda-categoria',
    'calculadora-gratificacion-legal',
  ],
  'calculadora-finiquito': [
    'calculadora-sueldo-liquido',
    'calculadora-vacaciones-proporcionales',
    'calculadora-indemnizacion-anos-servicio',
    'calculadora-gratificacion-legal',
    'calculadora-horas-extra',
  ],
  'calculadora-vacaciones-proporcionales': [
    'calculadora-finiquito',
    'calculadora-sueldo-liquido',
    'calculadora-indemnizacion-anos-servicio',
    'calculadora-horas-extra',
    'calculadora-gratificacion-legal',
  ],
  'calculadora-horas-extra': [
    'calculadora-sueldo-liquido',
    'calculadora-finiquito',
    'calculadora-gratificacion-legal',
    'calculadora-vacaciones-proporcionales',
    'calculadora-costo-empleado-pyme',
  ],
  'calculadora-gratificacion-legal': [
    'calculadora-sueldo-liquido',
    'calculadora-finiquito',
    'calculadora-costo-empleado-pyme',
    'calculadora-horas-extra',
    'calculadora-vacaciones-proporcionales',
  ],
  'calculadora-indemnizacion-anos-servicio': [
    'calculadora-finiquito',
    'calculadora-vacaciones-proporcionales',
    'calculadora-sueldo-liquido',
    'calculadora-horas-extra',
    'calculadora-gratificacion-legal',
  ],
  'calculadora-impuesto-segunda-categoria': [
    'calculadora-sueldo-liquido',
    'calculadora-boleta-honorarios',
    'calculadora-comparador-afp',
    'calculadora-operacion-renta',
  ],
  'calculadora-comparador-afp': [
    'calculadora-sueldo-liquido',
    'calculadora-simulador-apv',
    'calculadora-pgu',
  ],

  // Vehículos
  'calculadora-permiso-circulacion': [
    'calculadora-multas-transito',
    'calculadora-costo-tag',
    'calculadora-credito-automotriz',
  ],
  'calculadora-multas-transito': [
    'calculadora-permiso-circulacion',
    'calculadora-utm-clp',
    'calculadora-costo-tag',
  ],
  'calculadora-credito-automotriz': [
    'calculadora-permiso-circulacion',
    'calculadora-credito-hipotecario',
    'calculadora-costo-tag',
  ],
  'calculadora-costo-tag': [
    'calculadora-permiso-circulacion',
    'calculadora-multas-transito',
    'calculadora-credito-automotriz',
  ],

  // Vivienda
  'calculadora-credito-hipotecario': [
    'calculadora-uf-clp',
    'calculadora-subsidio-habitacional',
    'calculadora-contribuciones',
    'calculadora-costo-notaria',
  ],
  'calculadora-contribuciones': [
    'calculadora-credito-hipotecario',
    'calculadora-plusvalia',
    'calculadora-utm-clp',
  ],
  'calculadora-subsidio-habitacional': [
    'calculadora-credito-hipotecario',
    'calculadora-uf-clp',
    'calculadora-contribuciones',
  ],

  // Conversores
  'calculadora-uf-clp': [
    'calculadora-utm-clp',
    'calculadora-credito-hipotecario',
    'calculadora-iva',
  ],
  'calculadora-utm-clp': [
    'calculadora-uf-clp',
    'calculadora-multas-transito',
    'calculadora-patente-comercial',
  ],
};

/** Slugs “money” para rellenar si faltan slots (GSC + monedas). */
const MONEY_FILLER = [
  'calculadora-iva',
  'calculadora-credito-cae',
  'calculadora-patente-comercial',
  'calculadora-sueldo-liquido',
  'calculadora-vacaciones-proporcionales',
  'calculadora-finiquito',
  'calculadora-permiso-circulacion',
  'calculadora-multas-transito',
  'calculadora-credito-automotriz',
  'calculadora-contribuciones',
];

/**
 * Devuelve hasta `limit` calculadoras relacionadas.
 * 1) Mapa explícito por slug
 * 2) Misma categoría
 * 3) Relleno con páginas de alto tráfico
 */
export function getRelatedCalculators(
  current: Calculator,
  all: Calculator[],
  limit = 6,
): Calculator[] {
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const seen = new Set<string>([current.slug]);
  const out: Calculator[] = [];

  const push = (slug: string) => {
    if (seen.has(slug) || out.length >= limit) return;
    const c = bySlug.get(slug);
    if (!c || c.noIndex) return;
    seen.add(slug);
    out.push(c);
  };

  for (const slug of RELATED_BY_SLUG[current.slug] ?? []) {
    push(slug);
  }

  for (const c of all) {
    if (c.category === current.category) push(c.slug);
  }

  for (const slug of MONEY_FILLER) {
    push(slug);
  }

  return out.slice(0, limit);
}
