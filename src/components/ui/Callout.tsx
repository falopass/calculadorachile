// ============================================
// Callout — bloque destacado reusable
// ----------------------------------------------
// Componente React para destacar notas, tips, advertencias y bases
// legales dentro de páginas TSX (a diferencia del helper
// `callout()` de `@/lib/seo/editorial.ts`, que devuelve HTML
// serializado para incrustar en `dangerouslySetInnerHTML` de las
// guías y artículos del blog).
//
// Comparte estilos con el HTML de las guías a través de las clases
// `.callout` y `.callout--<kind>` definidas en globals.css. Esto
// garantiza que un callout escrito como JSX en /acerca-de, /faq o
// /privacidad se ve exactamente igual que uno escrito como HTML
// dentro del contenido de una guía.
//
// Uso:
//
//   <Callout kind="legal" title="Art. 161 del Código del Trabajo">
//     Ejemplo de cuerpo con <strong>énfasis</strong> y enlaces.
//   </Callout>
// ============================================

import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { CALLOUT_ICONS, type CalloutKind } from '@/lib/seo/editorial';

export type { CalloutKind };

interface CalloutProps {
  /** Variante visual del callout. */
  kind?: CalloutKind;
  /** Título destacado en negrita. Opcional. */
  title?: string;
  /** Cuerpo del callout (puede ser string, JSX o múltiples nodos). */
  children: ReactNode;
  /** Clases Tailwind extra. */
  className?: string;
  /**
   * Si `true`, no agrega el icono. Útil cuando el callout vive
   * dentro de un componente que ya tiene su propia iconografía.
   */
  hideIcon?: boolean;
}

/**
 * Callout reusable para páginas TSX. Aprovecha los mismos estilos
 * (.callout / .callout--<kind>) que el HTML de guías y blog,
 * por lo que la apariencia visual es 100% consistente.
 *
 * Nota: las clases `.callout` están definidas dentro de `.prose` en
 * globals.css. Para que funcionen fuera de un contenedor `prose`,
 * el componente las prefija con `prose` para reutilizar los estilos
 * sin tocar globals.
 */
export default function Callout({
  kind = 'info',
  title,
  children,
  className,
  hideIcon = false,
}: CalloutProps) {
  return (
    // El wrapper `prose` activa los estilos `.prose .callout` que ya
    // existen en globals.css. `prose-sm` evita los márgenes grandes
    // por defecto cuando el componente se usa en flujos densos.
    <aside
      className={clsx(
        'prose prose-sm max-w-none',
        'callout',
        `callout--${kind}`,
        className,
      )}
    >
      {!hideIcon && (
        <span className="callout__icon" aria-hidden="true">
          {CALLOUT_ICONS[kind]}
        </span>
      )}
      <div className="callout__body">
        {title && <strong>{title}</strong>}
        {children}
      </div>
    </aside>
  );
}
