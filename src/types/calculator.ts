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
}
