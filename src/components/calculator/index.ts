// Barrel de componentes de calculadora.
//
// Importante: el archivo CalculatorShell.tsx legacy fue removido.
// El runtime usa exclusivamente PremiumCalculatorShell. Si necesitas
// la versión "premium" pero con otro nombre, importa directamente
// desde './PremiumCalculatorShell'.

// Inputs / fields
export { default as InputField } from './InputField';
export { default as PremiumInputField } from './PremiumInputField';
export { default as SelectField } from './SelectField';

// Output / results
export { default as ResultCard } from './ResultCard';
export { default as PremiumResultCard } from './PremiumResultCard';
export { default as ResultChart } from './ResultChart';
export { default as PremiumResultChart } from './PremiumResultChart';
export { default as ResultSkeleton } from './ResultSkeleton';
export { default as EmptyState } from './EmptyState';

// Shells (premium es el activo en /calculadoras)
export { default as PremiumCalculatorShell } from './PremiumCalculatorShell';

// FAQ (FAQ es el clásico, EnhancedFAQ se usa en páginas de calculadoras)
export { default as FAQ } from './FAQ';
export { default as EnhancedFAQ } from './EnhancedFAQ';

// Auxiliares
export { default as LegalNote } from './LegalNote';
export { default as AnimatedNumber } from './AnimatedNumber';
export { default as ExportMenu } from './ExportMenu';
export { default as HistoryPanel } from './HistoryPanel';
export { default as RelatedCalculators } from './RelatedCalculators';
export { default as ScenarioComparator } from './ScenarioComparator';
export { default as AmortizationTable } from './AmortizationTable';
export { default as PremiumLoadingIndicator } from './PremiumLoadingIndicator';
export {
  default as PremiumAnimationWrapper,
  PremiumStaggerContainer,
  PremiumFloatingElement,
} from './PremiumAnimationWrapper';

// Types
export type { InputFieldProps } from './InputField';
export type { SelectFieldProps, SelectOption } from './SelectField';
export type { ResultCardProps } from './ResultCard';
export type { FAQProps, FAQItem } from './FAQ';
export type { LegalNoteProps } from './LegalNote';
export type {
  ScenarioComparatorProps,
  ScenarioInput,
  ScenarioResult,
  Scenario,
} from './ScenarioComparator';
export type { AmortizationTableProps, AmortizationRow } from './AmortizationTable';
