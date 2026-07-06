import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { calculators } from '@/data/calculators';
import {
  CALCULATOR_CATEGORY_LIST,
  type CalculatorCategory,
} from '@/lib/calculatorCategories';
import type { Calculator } from '@/types/calculator';

/**
 * CategoryCatalog — Bloque 3 de la home.
 *
 * Catálogo denso por categoría: las 12 categorías en grilla de 3
 * columnas (desktop) / 1 (mobile). Cada categoría lista los links
 * reales a sus calculadoras — el usuario ve las 39 calculadoras sin
 * scroll infinito.
 *
 * Server Component: todo el cómputo (agrupación) se hace en build time.
 * Iconos Lucide monocromos en muted, no cuadrados con fondo pastel.
 * Las categorías vacías o con <2 items se muestran igual.
 */
export default function CategoryCatalog() {
  const grouped = calculators.reduce<Record<CalculatorCategory, Calculator[]>>(
    (acc, calc) => {
      (acc[calc.category] ??= []).push(calc);
      return acc;
    },
    {} as Record<CalculatorCategory, Calculator[]>,
  );

  return (
    <section className="container-base py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-3xl">
            Catálogo por categoría
          </h2>
          <p className="mt-2 text-sm text-[var(--foreground-secondary)]">
            Todas las calculadoras disponibles, agrupadas por tema.
          </p>
        </div>
        <span className="hidden text-sm text-[var(--foreground-muted)] md:inline">
          {calculators.length} calculadoras
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CALCULATOR_CATEGORY_LIST.map((category) => {
          const Icon = category.icon;
          const items = grouped[category.id] ?? [];

          return (
            <section
              key={category.id}
              className="group/card flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--border-strong)]"
              aria-label={category.label}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] transition-transform duration-300 group-hover/card:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      {category.label}
                    </h3>
                    <span className="inline-flex h-6 items-center rounded-full bg-[var(--surface-muted)] px-2.5 text-xs font-semibold text-[var(--foreground-muted)]">
                      {items.length}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">
                    {items.length === 1 ? '1 calculadora' : `${items.length} calculadoras`}
                  </p>
                </div>
              </div>

              {/* Contenido: destacado si hay 1 item, lista si hay más */}
              {items.length === 1 ? (
                <div className="mt-4 flex flex-col">
                  <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    {items[0].description}
                  </p>
                  <Link
                    href={`/calculadoras/${items[0].slug}`}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
                  >
                    Abrir calculadora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="my-4 h-px bg-[var(--border)]" />
                  <ul className="space-y-0.5">
                    {items.length === 0 ? (
                      <li className="py-2 text-sm text-[var(--foreground-muted)]">
                        Sin calculadoras publicadas todavía.
                      </li>
                    ) : (
                      items.map((calc) => (
                        <li key={calc.id}>
                          <Link
                            href={`/calculadoras/${calc.slug}`}
                            className="group/link flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-[var(--foreground-secondary)] transition-all duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--accent)] hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-0"
                          >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--foreground-muted)] transition-colors group-hover/link:bg-[var(--accent)]" />
                            <span className="truncate">{calc.name}</span>
                            <ChevronRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-[var(--accent)] opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
