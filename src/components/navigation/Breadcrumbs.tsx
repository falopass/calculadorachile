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
    <nav aria-label="Migas de pan" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        {/* Home icon */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-[var(--foreground-muted)] hover:text-[var(--color-primary-500)] transition-colors"
            aria-label="Ir al inicio"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {/* Separator */}
              <ChevronRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />

              {/* Item */}
              {isLast ? (
                <span
                  className="text-[var(--foreground)] font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-[var(--foreground-muted)] hover:text-[var(--color-primary-500)] transition-colors"
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
