'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Schema.org structured data */
  schemaData?: unknown;
}

/**
 * Breadcrumbs - Migas de pan con Schema.org para SEO
 * 
 * Muestra la ruta de navegación actual.
 * Incluye JSON-LD structured data para Google.
 * 
 * @example
 * <Breadcrumbs items={[
 *   { label: 'Inicio', href: '/' },
 *   { label: 'Calculadoras', href: '/#calculadoras' },
 *   { label: 'Sueldo Líquido' },
 * ]} />
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generar Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: absoluteUrl(item.href) }),
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visual Breadcrumbs */}
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
                  <span className="text-[var(--foreground)] font-medium" aria-current="page">
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
    </>
  );
}
