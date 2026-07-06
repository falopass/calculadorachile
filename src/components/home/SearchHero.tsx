'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calculator as CalculatorIcon, ArrowRight, TrendingUp } from 'lucide-react';
import { calculators } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';

/**
 * SearchHero — Bloque 2 de la home.
 *
 * Buscador prominente centrado + chips de calculadoras top en una sola fila
 * scrollable. Al hacer focus en el input, muestra sugerencias filtradas.
 *
 * Client island: maneja query, foco y navegación.
 */

const quickSlugs = [
  'calculadora-patente-comercial',
  'calculadora-credito-cae',
  'calculadora-subsidio-habitacional',
  'calculadora-costo-tag',
  'calculadora-sueldo-liquido',
  'calculadora-finiquito',
];

export default function SearchHero() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const quickLinks = useMemo(
    () =>
      quickSlugs
        .map((slug) => calculators.find((c) => c.slug === slug))
        .filter((c): c is Calculator => Boolean(c)),
    [],
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return calculators
      .filter((c) => {
        const haystack = `${c.name} ${c.description} ${c.keywords?.join(' ') ?? ''}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length >= 2) {
      router.push(`/buscar?q=${encodeURIComponent(q)}`);
      setFocused(false);
    }
  };

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="container-base py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={onSubmit} role="search" className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--foreground-muted)]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 160)}
              placeholder="Busca tu calculadora…"
              aria-label="Buscar calculadora"
              className="w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] py-5 pl-14 pr-36 text-lg text-[var(--foreground)] shadow-sm placeholder:text-[var(--foreground-muted)] transition-shadow focus:border-[var(--accent)] focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/10"
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <kbd
                aria-hidden
                className="hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-2 py-1 text-xs font-mono font-medium text-[var(--foreground-muted)] md:inline-flex"
              >
                /
              </kbd>
              <button
                type="submit"
                aria-label="Buscar"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Dropdown de sugerencias */}
          {focused && (
            <div className="relative z-20 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
              {suggestions.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto py-2">
                  {suggestions.map((calc) => (
                    <li key={calc.id}>
                      <Link
                        href={`/calculadoras/${calc.slug}`}
                        className="group flex items-start gap-3 px-5 py-3 transition-colors hover:bg-[var(--surface-muted)]"
                      >
                        <div className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-muted)] text-[var(--accent)]">
                          <CalculatorIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                            {calc.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--foreground-muted)] line-clamp-1">
                            {calc.description}
                          </span>
                        </div>
                        <ArrowRight className="mt-1.5 h-4 w-4 flex-shrink-0 text-[var(--foreground-muted)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)] group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : query.trim().length >= 2 ? (
                <div className="px-5 py-4 text-sm text-[var(--foreground-muted)]">
                  No encontramos calculadoras para “{query.trim()}”. Presiona{' '}
                  <strong>Enter</strong> para buscar en todo el sitio.
                </div>
              ) : null}
            </div>
          )}

          {/* Chips en una sola fila */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
              <TrendingUp className="h-3.5 w-3.5" />
              Más buscados
            </div>
            <div className="relative -mx-4 md:-mx-6 lg:-mx-8">
              {/* Fades laterales */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-2 w-6 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent md:hidden" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-6 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent md:hidden" />
              <div className="flex items-center justify-start gap-2 overflow-x-auto px-4 pb-2 md:justify-center md:overflow-visible md:px-6 lg:px-8 no-scrollbar">
                {quickLinks.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculadoras/${calc.slug}`}
                    className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-[13px] font-medium text-[var(--foreground-secondary)] shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)]"
                  >
                    {calc.name.replace(' 2026', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
