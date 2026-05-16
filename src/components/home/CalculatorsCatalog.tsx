'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Calculator } from '@/types/calculator';
import CalculatorCard from './CalculatorCard';

interface Group {
  category: Calculator['category'];
  label: string;
  items: Calculator[];
}

interface CalculatorsCatalogProps {
  groups: Group[];
}

/**
 * Catálogo filtrable de calculadoras.
 *
 * Cliente porque maneja búsqueda y filtro por categoría.
 * Recibe los datos ya agrupados desde el Server Component padre,
 * así no enviamos lógica de agrupación al cliente.
 */
export default function CalculatorsCatalog({ groups }: CalculatorsCatalogProps) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<Calculator['category'] | 'all'>('all');

  // Hash inicial: /calculadoras#sueldo selecciona la categoría
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Calculator['category'];
    if (hash && groups.some((g) => g.category === hash)) {
      setActiveCat(hash);
    }
  }, [groups]);

  const total = useMemo(
    () => groups.reduce((sum, g) => sum + g.items.length, 0),
    [groups],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    return groups
      .map((g) => {
        if (activeCat !== 'all' && g.category !== activeCat) {
          return { ...g, items: [] };
        }
        if (!normalizedQuery) return g;
        const items = g.items.filter((c) => {
          const haystack = `${c.name} ${c.description} ${c.keywords?.join(' ') ?? ''}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        });
        return { ...g, items };
      })
      .filter((g) => g.items.length > 0);
  }, [groups, activeCat, normalizedQuery]);

  const filteredCount = visibleGroups.reduce((s, g) => s + g.items.length, 0);

  return (
    <section className="container-base py-10 md:py-12">
      {/* Toolbar */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)] pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar entre ${total} calculadoras…`}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-10 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 transition-colors"
            aria-label="Buscar calculadoras"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCat('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              activeCat === 'all'
                ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                : 'bg-[var(--surface)] text-[var(--foreground-secondary)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]'
            }`}
          >
            Todas · {total}
          </button>
          {groups.map((g) => (
            <button
              key={g.category}
              type="button"
              onClick={() => setActiveCat(g.category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeCat === g.category
                  ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                  : 'bg-[var(--surface)] text-[var(--foreground-secondary)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]'
              }`}
            >
              {g.label} · {g.items.length}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(normalizedQuery || activeCat !== 'all') && (
          <p className="text-sm text-[var(--foreground-muted)]">
            {filteredCount === 0
              ? 'Sin resultados'
              : `${filteredCount} ${filteredCount === 1 ? 'resultado' : 'resultados'}`}
          </p>
        )}
      </div>

      {/* Empty state */}
      {visibleGroups.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-[var(--foreground-secondary)]">
            No encontramos calculadoras con ese filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveCat('all');
            }}
            className="mt-4 btn-secondary text-sm"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {visibleGroups.map((g) => (
            <div key={g.category} id={g.category} className="scroll-mt-24">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  {g.label}
                  <span className="ml-2 text-sm font-normal text-[var(--foreground-muted)]">
                    {g.items.length}
                  </span>
                </h2>
                {/*
                  Link a la página de categoría dedicada (/categoria/<id>).
                  Le da una salida natural al usuario que quiere ver SOLO
                  esa categoría, y refuerza el linking interno hacia las
                  landing pages long-tail.
                */}
                <a
                  href={`/categoria/${g.category}`}
                  className="text-xs font-medium text-[var(--color-primary-600)] hover:underline whitespace-nowrap"
                >
                  Ver categoría →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {g.items.map((calc, i) => (
                  <CalculatorCard key={calc.id} calculator={calc} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
