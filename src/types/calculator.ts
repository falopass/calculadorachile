// ============================================
// Tipos compartidos para calculadoras
// ============================================

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'boolean';
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
}
