// ============================================
// Tipos compartidos para calculadoras
// ============================================

/**
 * Unidad explícita de un input numérico.
 *
 * Antes el shell deducía la unidad del label haciendo
 * `label.includes('sueldo')`, `label.includes('UF')`, etc. Era
 * frágil y agregaba 60 keywords hardcoded. Ahora cada input
 * declara su unidad explícitamente.
 */
export type CalculatorInputUnit =
  | 'CLP'
  | 'UF'
  | 'UTM'
  | 'percent'
  | 'years'
  | 'months'
  | 'days'
  | 'kWh'
  | 'count' // cantidad sin unidad (ej. nº de hijos)
  | 'm2'
  | 'm3';

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'boolean';
  /** Unidad de medida (sólo para inputs numéricos). */
  unit?: CalculatorInputUnit;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
  /** Tooltip de ayuda contextual para campos complejos */
  tooltip?: string;
}

export interface CalculatorResult {
  label: string;
  value: number;
  format: 'CLP' | 'UF' | 'UTM' | 'percentage' | 'days' | 'number';
  highlight?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: 'sueldo' | 'impuestos' | 'beneficios' | 'conversiones' | 'familia' | 'vivienda' | 'vehiculos' | 'empresas' | 'servicios' | 'pension' | 'educacion' | 'hogar';
  inputs: CalculatorInput[];
  icon?: string;
  /** Preguntas frecuentes para SEO y usuarios */
  faq?: FAQItem[];
  /** Keywords para metadata SEO */
  keywords?: string[];
  /** Para destacar calculadoras en la home */
  featured: boolean;
  /** Para organizar por prioridad: 1 (core), 2 (nicho), 3 (complementarias) */
  phase: 1 | 2 | 3;
  /**
   * Título SEO opcional que reemplaza al generado por defecto
   * (`<name> — Calculadora gratuita 2026`) en `<title>` y OG. Útil
   * para subir CTR en calculadoras con tracción real sin alterar
   * el H1 visible. Si se omite, se usa el título generado.
   */
  seoTitle?: string;
  /**
   * Descripción SEO opcional que reemplaza a `description` en meta
   * y OG. Si se omite, se usa `description` (enriquecida si es
   * corta, según la lógica existente en generateMetadata).
   */
  seoDescription?: string;
  /**
   * Marca la calculadora como `noindex, follow` (no indexable pero
   * el link equity fluye). Se usa para excluir calculadoras delgadas
   * del índice de Google durante la revisión de AdSense sin romper
   * la ruta. También se excluyen del sitemap.
   */
  noIndex?: boolean;
  /**
   * Fecha de la última revisión de fórmulas/constantes en formato
   * ISO (YYYY-MM-DD). Se muestra como texto visible al usuario
   * ("Actualizado: julio de 2026") y refuerza la señal E-E-A-T de
   * contenido actualizado. Debe reflejar un review real, no la fecha
   * del deploy.
   */
  lastReviewed?: string;
  /**
   * Fuentes oficiales (SII, DT, BCentral, SPensiones, etc.) que
   * respaldan las fórmulas y constantes usadas en el cálculo. Se
   * muestran como enlaces salientes en la página de la calculadora
   * para reforzar la señal E-E-A-T (YMYL). Máximo 4, priorizar por
   * relevancia al cálculo específico. Las URLs deben apuntar a la
   * sub-página específica cuando exista, no a la home institucional.
   */
  sources?: Array<{
    name: string;
    url: string;
    note?: string;
  }>;
}
