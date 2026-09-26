'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calculator as CalculatorIcon, ArrowRight } from 'lucide-react';
import { discoverableCalculators } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';

/**
 * SearchHero - Bloque 2 de la home.
 *
 * Buscador alineado a la izquierda con título propio ("¿Qué necesitas
 * calcular?"), input + botón "Buscar" en una sola fila, dropdown de
 * sugerencias posicionado absoluto bajo el input y una frase de enlaces
 * directos a las calculadoras más buscadas.
 *
 * Client island: maneja query, foco y navegación.
 */

/** Destacados home: prioriza URLs con impresiones GSC / intención de cobro AdSense. */
const quickSlugs = [
  'calculadora-iva',
  'calculadora-credito-cae',
  'calculadora-patente-comercial',
  'calculadora-sueldo-liquido',
  'calculadora-vacaciones-proporcionales',
  'calculadora-permiso-circulacion',
  'calculadora-finiquito',
  'calculadora-multas-transito',
];

/** Frase en lenguaje natural para la línea de enlaces, por slug. */
const quickPhrases: Record<string, string> = {
  'calculadora-iva': 'el IVA de un monto',
  'calculadora-credito-cae': 'la cuota del CAE',
  'calculadora-patente-comercial': 'la patente comercial',
  'calculadora-sueldo-liquido': 'cuánto te queda líquido',
  'calculadora-vacaciones-proporcionales': 'tus vacaciones proporcionales',
  'calculadora-permiso-circulacion': 'el permiso de circulación',
  'calculadora-finiquito': 'tu finiquito',
  'calculadora-multas-transito': 'una multa de tránsito',
};

export default function SearchHero() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const quickLinks = useMemo(
    () =>
      quickSlugs
        .map((slug) => discoverableCalculators.find((c) => c.slug === slug))
        .filter((c): c is Calculator => Boolean(c)),
    [],
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return discoverableCalculators
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
    <section
      aria-labelledby="home-search-heading"
      className="border-b border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="container-base py-8 md:py-10">
        <div className="max-w-3xl">
          <h2
            id="home-search-heading"
            className="text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-2xl"
          >
            ¿Qué necesitas calcular?
          </h2>
          <p className="mt-1 text-sm text-[var(--foreground-secondary)]">
            Escribe el nombre de la calculadora o lo que quieres saber.
          </p>

          <form onSubmit={onSubmit} role="search" className="mt-4 flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--foreground-muted)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 160)}
                placeholder="Por ejemplo, sueldo líquido"
                aria-labelledby="home-search-heading"
                className="h-12 w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] pl-11 pr-4 text-base text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/10 sm:h-14"
              />

              {/* Dropdown de sugerencias: absoluto bajo el input */}
              {focused && (suggestions.length > 0 || query.trim().length >= 2) && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
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
            </div>

            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-[var(--accent)] px-5 font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:h-14 sm:px-6"
            >
              Buscar
            </button>
          </form>

          {/* Enlaces directos en lenguaje natural */}
          <p className="mt-4 text-sm leading-7 text-[var(--foreground-secondary)]">
            También puedes calcular{' '}
            {quickLinks.map((calc, i) => (
              <span key={calc.id}>
                {i > 0 && (i === quickLinks.length - 1 ? ' o ' : ', ')}
                <Link
                  href={`/calculadoras/${calc.slug}`}
                  className="rounded-sm font-medium text-[var(--foreground)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {quickPhrases[calc.slug]}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
