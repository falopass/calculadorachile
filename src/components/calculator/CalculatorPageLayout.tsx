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
    <div className="min-w-0 overflow-x-clip bg-[var(--background)]">
      {/* Hero compacto y limpio del calculador */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background-secondary)]/40">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-[0.04]"
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 h-72 w-[min(700px,100%)] -translate-x-1/2 rounded-full bg-[var(--color-primary-500)]/10 blur-[100px]"
        />

        <div className="container-base relative pb-8 pt-10 md:pb-10 md:pt-14">
          {/* Breadcrumbs */}
          <nav aria-label="Migas de pan" className="mb-5 min-w-0">
            <ol className="flex max-w-full flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
              <li className="shrink-0">
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden className="shrink-0">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="shrink-0">
                <Link
                  href="/calculadoras"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Calculadoras
                </Link>
              </li>
              <li aria-hidden className="shrink-0">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="min-w-0 max-w-full break-words font-medium text-[var(--foreground)]">
                {title}
              </li>
            </ol>
          </nav>

          <h1
            className="heading-display break-words text-2xl text-[var(--foreground)] sm:text-3xl md:text-4xl"
            data-speakable="title"
          >
            {title}
          </h1>
          <p
            className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--foreground-secondary)] sm:text-base"
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
