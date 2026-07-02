// Barrel de componentes de calculadora.
//
// Importante: el archivo CalculatorShell.tsx legacy fue removido.
// El runtime usa exclusivamente PremiumCalculatorShell. Si necesitas
// la versión "premium" pero con otro nombre, importa directamente
// desde './PremiumCalculatorShell'.

// Inputs / fields
export { default as PremiumInputField } from './PremiumInputField';
export { default as SelectField } from './SelectField';

// Output / results
export { default as PremiumResultCard } from './PremiumResultCard';
export { default as PremiumResultChart } from './PremiumResultChart';
export { default as EmptyState } from './EmptyState';

// Shells (premium es el activo en /calculadoras)
export { default as PremiumCalculatorShell } from './PremiumCalculatorShell';

// FAQ (FAQ es el clásico, EnhancedFAQ se usa en páginas de calculadoras)
export { default as FAQ } from './FAQ';
export { default as EnhancedFAQ } from './EnhancedFAQ';

// Auxiliares
export { default as LegalNote } from './LegalNote';
export { default as ExportMenu } from './ExportMenu';
export { default as HistoryPanel } from './HistoryPanel';
export { default as RelatedCalculators } from './RelatedCalculators';
export { default as PremiumLoadingIndicator } from './PremiumLoadingIndicator';

// Types
export type { SelectFieldProps, SelectOption } from './SelectField';
export type { FAQProps, FAQItem } from './FAQ';
export type { LegalNoteProps } from './LegalNote';