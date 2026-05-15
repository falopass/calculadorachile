// ============================================
// Helpers editoriales para guías y blog
// ----------------------------------------------
// Funciones puras que generan markup HTML para los bloques visuales
// usados en el contenido de guías y artículos del blog.
//
// El markup resultante usa las clases definidas en globals.css
// (.callout, .numeric-example, .data-grid, .steps, etc.).
//
// Uso típico:
//   import { callout, numericExample } from '@/lib/seo/editorial';
//   const html = `
//     <p>...</p>
//     ${callout('legal', 'Base legal', 'Art. 163 del Código del Trabajo')}
//   `;
// ============================================

export type CalloutKind = 'info' | 'warning' | 'legal' | 'success' | 'tip' | 'error';

const CALLOUT_ICONS: Record<CalloutKind, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  legal: '⚖️',
  success: '✅',
  tip: '💡',
  error: '❌',
};

/**
 * Genera un callout con título y cuerpo. El cuerpo puede ser HTML
 * (párrafos, listas, código inline). Se usa para destacar bases
 * legales, advertencias, tips, errores comunes, etc.
 */
export function callout(
  kind: CalloutKind,
  title: string,
  bodyHtml: string,
): string {
  const icon = CALLOUT_ICONS[kind];
  return `<aside class="callout callout--${kind}"><span class="callout__icon" aria-hidden="true">${icon}</span><div class="callout__body"><strong>${escapeHtml(title)}</strong>${bodyHtml}</div></aside>`;
}

/**
 * Genera un bloque "ejemplo numérico paso a paso" con título, líneas
 * intermedias en lista y un total destacado al final.
 */
export function numericExample(
  title: string,
  steps: string[],
  total: string,
): string {
  const items = steps.map((s) => `<li>${s}</li>`).join('');
  return `<div class="numeric-example"><div class="numeric-example__title">${escapeHtml(title)}</div><ul>${items}</ul><span class="total">${total}</span></div>`;
}

/**
 * Genera una grilla de "key/value" — útil para mostrar 3-6 datos
 * rápidos (montos, tasas, plazos) de forma escaneable.
 */
export function dataGrid(items: { label: string; value: string }[]): string {
  const lis = items
    .map(
      (item) =>
        `<li><span class="data-grid__label">${escapeHtml(item.label)}</span><span class="data-grid__value">${item.value}</span></li>`,
    )
    .join('');
  return `<ul class="data-grid">${lis}</ul>`;
}

/**
 * Genera una lista ordenada con el estilo `steps` (badges numerados
 * circulares). Usar en lugar de `<ol>` cuando los pasos son
 * importantes y queremos que destaquen.
 */
export function steps(items: string[]): string {
  const lis = items.map((s) => `<li>${s}</li>`).join('');
  return `<ol class="steps">${lis}</ol>`;
}

/**
 * Escape básico para texto que se inserta en HTML. NO úsalo para
 * cuerpos que ya son HTML; sólo para los títulos / labels.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
