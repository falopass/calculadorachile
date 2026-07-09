'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs - Migas de pan visuales accesibles
 *
 * Sólo renderiza la navegación visual (`<nav>` con `aria-label`).
 * El JSON-LD `BreadcrumbList` se inyecta DESDE LAS PÁGINAS usando
 * el helper `breadcrumbSchema()` y el componente `<JsonLd />`. Antes
 * este componente emitía su propio `<script type="application/ld+json">`
 * y se duplicaba con el de las páginas, ensuciando la validación.
 *
 * Si ves una página que necesita migas pero NO tiene el schema,
 * agrégalo en la página igual que las demás:
 *   <JsonLd data={breadcrumbSchema([...])} />
 *
 * @example
 * <Breadcrumbs items={[
 *   { label: 'Inicio', href: '/' },
 *   { label: 'Calculadoras', href: '/calculadoras' },
 *   { label: 'Sueldo Líquido' },
 * ]} />
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Migas de pan" className="mb-6 min-w-0 max-w-full">
      <ol className="flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {/* Home icon */}
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-[var(--foreground-muted)] transition-colors hover:text-[var(--color-primary-500)]"
            aria-label="Ir al inicio"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex min-w-0 max-w-full items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--foreground-muted)]" />

              {isLast ? (
                <span
                  className="min-w-0 break-words font-medium leading-snug text-[var(--foreground)]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="shrink-0 text-[var(--foreground-muted)] transition-colors hover:text-[var(--color-primary-500)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--foreground-muted)]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
