// ============================================
// Catálogo central de categorías de calculadoras
// ----------------------------------------------
// Antes esta información vivía duplicada en:
//   - /calculadoras/page.tsx → CATEGORY_LABELS
//   - /guias/page.tsx → CATEGORY_CONFIG (con icono y descripción)
//   - varios sitios usaban string crudo "sueldo", "vivienda"...
//
// Ahora hay una sola fuente: este archivo. Cualquier página que
// necesite mostrar el label, la descripción o el ícono de una
// categoría de calculadoras lo importa de aquí.
//
// Lo usamos en:
//   - /calculadoras (índice)
//   - /categoria/[slug] (página por categoría — long-tail SEO)
//   - /buscar (resultados agrupados)
//   - Footer (cuando enlazamos por categoría)
// ============================================

import {
  Banknote,
  Receipt,
  Briefcase,
  Repeat,
  Users,
  Home,
  Car,
  Building2,
  Wrench,
  PiggyBank,
  GraduationCap,
  Sofa,
} from 'lucide-react';

import type { Calculator } from '@/types/calculator';

/** ID interno de cada categoría. Es la unión exhaustiva del tipo. */
export type CalculatorCategory = Calculator['category'];

export interface CalculatorCategoryConfig {
  /** ID estable usado como slug de URL (`/categoria/<id>`). */
  id: CalculatorCategory;
  /** Label corto, visible en chips y headings. */
  label: string;
  /** Plural usado en headings de página de categoría. */
  pluralLabel: string;
  /** Descripción larga para hero / metadata / schema.org `description`. */
  description: string;
  /** Lista de palabras clave SEO, complementan el slug en metadata. */
  keywords: string[];
  /** Ícono de Lucide. Coincide con la convención de /guias. */
  icon: React.ComponentType<{ className?: string }>;
  /** Tailwind: clases de gradiente Tailwind para acento del header. */
  gradient: string;
}

/**
 * Lista exhaustiva de categorías. El orden coincide con el orden
 * "natural" para humanos: laboral → tributario → familia → bienes →
 * empresas → servicios → resto.
 *
 * Nota: si en el futuro se agrega una nueva categoría a `Calculator`,
 * TypeScript exigirá agregar la entrada aquí (Record exhaustivo).
 */
export const CALCULATOR_CATEGORIES: Record<
  CalculatorCategory,
  CalculatorCategoryConfig
> = {
  sueldo: {
    id: 'sueldo',
    label: 'Sueldo y remuneraciones',
    pluralLabel: 'Calculadoras de sueldo',
    description:
      'Calcula tu sueldo líquido, horas extra, gratificación y descuentos legales. Con AFP, salud y seguro de cesantía actualizados a 2026.',
    keywords: [
      'calculadora sueldo chile',
      'calculadora sueldo líquido',
      'horas extra chile',
      'gratificación legal',
      'descuentos AFP salud',
    ],
    icon: Banknote,
    gradient: 'from-[var(--color-primary-500)] to-[var(--color-primary-600)]',
  },
  impuestos: {
    id: 'impuestos',
    label: 'Impuestos',
    pluralLabel: 'Calculadoras de impuestos',
    description:
      'Calcula IVA, retención de honorarios, impuesto único de segunda categoría, operación renta y otras herramientas tributarias para Chile 2026.',
    keywords: [
      'calculadora IVA',
      'calculadora honorarios',
      'impuesto segunda categoría',
      'operación renta',
      'retención SII',
    ],
    icon: Receipt,
    gradient: 'from-[var(--color-error-500)] to-[var(--color-error-600)]',
  },
  beneficios: {
    id: 'beneficios',
    label: 'Beneficios laborales',
    pluralLabel: 'Calculadoras de beneficios laborales',
    description:
      'Indemnización por años de servicio, finiquito, vacaciones proporcionales, fuero maternal y subsidios laborales en Chile.',
    keywords: [
      'calculadora finiquito',
      'indemnización años de servicio',
      'vacaciones proporcionales',
      'fuero maternal',
      'subsidio empleo joven',
    ],
    icon: Briefcase,
    gradient: 'from-[var(--color-warning-500)] to-[var(--color-warning-600)]',
  },
  conversiones: {
    id: 'conversiones',
    label: 'Conversores',
    pluralLabel: 'Conversores y unidades',
    description:
      'Convierte UF a CLP, UTM a CLP, dólar y euro a peso chileno con valores oficiales del Banco Central actualizados a diario.',
    keywords: [
      'UF a pesos',
      'UTM a pesos',
      'dólar a peso chileno',
      'euro a peso chileno',
      'conversor UF UTM',
    ],
    icon: Repeat,
    gradient: 'from-[var(--color-success-500)] to-[var(--color-success-600)]',
  },
  familia: {
    id: 'familia',
    label: 'Familia',
    pluralLabel: 'Calculadoras de familia',
    description:
      'Pensión de alimentos, asignación familiar, aguinaldos y subsidios para familias en Chile 2026.',
    keywords: [
      'pensión alimentos chile',
      'asignación familiar',
      'aguinaldo fiestas patrias',
      'subsidio familiar',
    ],
    icon: Users,
    gradient: 'from-pink-500 to-rose-600',
  },
  vivienda: {
    id: 'vivienda',
    label: 'Vivienda',
    pluralLabel: 'Calculadoras de vivienda',
    description:
      'Crédito hipotecario, dividendo, contribuciones, reajuste de arriendo en UF y subsidios habitacionales en Chile.',
    keywords: [
      'crédito hipotecario chile',
      'dividendo hipotecario',
      'contribuciones bienes raíces',
      'reajuste arriendo UF',
      'subsidio DS1',
    ],
    icon: Home,
    gradient: 'from-blue-500 to-indigo-600',
  },
  vehiculos: {
    id: 'vehiculos',
    label: 'Vehículos',
    pluralLabel: 'Calculadoras de vehículos',
    description:
      'Permiso de circulación, multas de tránsito, TAG, costo total de un crédito automotriz y otros gastos del auto en Chile.',
    keywords: [
      'permiso de circulación',
      'multas de tránsito',
      'TAG autopistas',
      'crédito automotriz',
      'tasación auto',
    ],
    icon: Car,
    gradient: 'from-cyan-500 to-blue-600',
  },
  empresas: {
    id: 'empresas',
    label: 'Empresas y PYMEs',
    pluralLabel: 'Calculadoras para empresas',
    description:
      'Costo total empleador, patente comercial, PPM, régimen 14D y herramientas para gestión de PYMEs en Chile.',
    keywords: [
      'costo empleador chile',
      'patente comercial',
      'PPM PYME',
      'régimen 14D',
      'iniciación de actividades',
    ],
    icon: Building2,
    gradient: 'from-slate-500 to-gray-700',
  },
  servicios: {
    id: 'servicios',
    label: 'Servicios y trámites',
    pluralLabel: 'Calculadoras de servicios y trámites',
    description:
      'Cálculos rápidos para trámites: notarías, registro civil, impuestos de timbres y otros servicios en Chile.',
    keywords: [
      'notarías chile',
      'impuesto de timbres',
      'trámites registro civil',
      'aranceles',
    ],
    icon: Wrench,
    gradient: 'from-amber-500 to-orange-600',
  },
  pension: {
    id: 'pension',
    label: 'Pensiones',
    pluralLabel: 'Calculadoras de pensiones',
    description:
      'Pensión Garantizada Universal (PGU), AFP, ahorro previsional voluntario (APV) y la reforma previsional Ley 21.735.',
    keywords: [
      'pensión PGU',
      'AFP cotizaciones',
      'APV chile',
      'reforma previsional 21735',
      'jubilación chile',
    ],
    icon: PiggyBank,
    gradient: 'from-emerald-500 to-teal-600',
  },
  educacion: {
    id: 'educacion',
    label: 'Educación',
    pluralLabel: 'Calculadoras de educación',
    description:
      'Crédito con Aval del Estado (CAE), gratuidad, becas y financiamiento educacional en Chile.',
    keywords: [
      'CAE chile',
      'gratuidad universitaria',
      'beca bicentenario',
      'arancel referencia',
    ],
    icon: GraduationCap,
    gradient: 'from-violet-500 to-purple-600',
  },
  hogar: {
    id: 'hogar',
    label: 'Hogar',
    pluralLabel: 'Calculadoras del hogar',
    description:
      'Cuenta de luz, agua, gas, internet y otros costos del hogar chileno con cargos fijos y variables actualizados.',
    keywords: [
      'cuenta luz chile',
      'cuenta agua chile',
      'cuenta gas',
      'consumo internet',
    ],
    icon: Sofa,
    gradient: 'from-orange-500 to-red-500',
  },
};

/** Lista ordenada (mismo orden que el Record) — útil para `.map()`. */
export const CALCULATOR_CATEGORY_LIST: CalculatorCategoryConfig[] =
  Object.values(CALCULATOR_CATEGORIES);

/**
 * Obtiene la config de una categoría por su id (slug). Devuelve
 * `undefined` si el slug no corresponde a una categoría conocida.
 */
export function getCalculatorCategory(
  id: string,
): CalculatorCategoryConfig | undefined {
  return CALCULATOR_CATEGORIES[id as CalculatorCategory];
}

/** Mapping legacy `Record<id, label>` para compatibilidad con código viejo. */
export const CATEGORY_LABELS: Record<CalculatorCategory, string> =
  Object.fromEntries(
    CALCULATOR_CATEGORY_LIST.map((c) => [c.id, c.label]),
  ) as Record<CalculatorCategory, string>;
