'use client';

import { ReactNode, memo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LastReviewed from './LastReviewed';

interface CalculatorPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  /** Reservado para uso futuro (ej. analytics scoping). */
  calculatorId: string;
  /** Fecha ISO (YYYY-MM-DD) de la última revisión de fórmulas/constantes. */
  lastReviewed?: string;
}

/**
 * Layout para una página de calculadora.
 *
 * Contenedor neutro que respeta los design tokens (`--background`,
 * `--surface`, etc.). Sin gradientes ni blobs decorativos: la
 * estética la pone el shell de la calculadora, no el fondo.
 */
const CalculatorPageLayout = memo(function CalculatorPageLayout({
  children,
  title,
  description,
  lastReviewed,
}: CalculatorPageLayoutProps) {
  return (
    <div className="bg-[var(--background)]">
      {/* Hero compacto y limpio del calculador */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background-secondary)]/40">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-[0.04]"
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[var(--color-primary-500)]/10 blur-[100px]"
        />

        <div className="container-base relative pt-10 pb-8 md:pt-14 md:pb-10">
          {/* Breadcrumbs */}
          <nav aria-label="Migas de pan" className="mb-5">
            <ol className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link
                  href="/calculadoras"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Calculadoras
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-[var(--foreground)] font-medium truncate max-w-[40ch]">
                {title}
              </li>
            </ol>
          </nav>

          <h1
            className="heading-display text-3xl md:text-4xl text-[var(--foreground)]"
            data-speakable="title"
          >
            {title}
          </h1>
          <p
            className="mt-2 text-base text-[var(--foreground-secondary)] max-w-3xl leading-relaxed"
            data-speakable="description"
          >
            {description}
          </p>
          {lastReviewed && (
            <LastReviewed date={lastReviewed} className="mt-3 block" />
          )}
        </div>
      </section>

      {/* Contenido (shell + FAQ + secciones) */}
      <div className="container-base py-8 md:py-10">{children}</div>
    </div>
  );
});

export default CalculatorPageLayout;
