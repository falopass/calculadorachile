'use client';

// ============================================
// SiteSearch — buscador unificado client-side
// ----------------------------------------------
// Indexa calculadoras + guías + artículos del blog + categorías y
// hace match por keyword en el cliente. No hay backend: el bundle
// inicial trae el índice ya construido.
//
// Decisiones:
//   - Sin debounce: el filtro es O(n) sobre ~80 items, instantáneo.
//   - Sin Fuse.js / lunr: el costo extra (12-50 KB gzipped) no vale
//     la pena para 80 items. Usamos un scoring trivial (token match)
//     que ya entrega resultados aceptables.
//   - Mantiene el query en `?q=` cuando el componente vive en
//     /buscar (modo fullscreen) — soporta deep linking.
// ============================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  X,
  Calculator as CalculatorIcon,
  BookOpen,
  Newspaper,
  Folder,
  ArrowRight,
} from 'lucide-react';

import { calculators } from '@/data/calculators';
import { guias } from '@/data/guias';
import { articles } from '@/data/articles';
import {
  CALCULATOR_CATEGORY_LIST,
  CATEGORY_LABELS,
} from '@/lib/calculatorCategories';

type ResultKind = 'calculator' | 'guia' | 'article' | 'category';

interface SearchResult {
  kind: ResultKind;
  title: string;
  subtitle: string;
  href: string;
  /** Score relativo. Mayor = más relevante. */
  score: number;
}

/**
 * Construye el índice una sola vez. Cada entrada es un objeto con
 * el texto buscable concatenado (`haystack`) y los metadatos para
 * renderizar el resultado.
 */
function useSearchIndex() {
  return useMemo(() => {
    const entries: {
      kind: ResultKind;
      title: string;
      subtitle: string;
      href: string;
      haystack: string;
      /** Boost por tipo: las calculadoras suelen ser la intención principal. */
      boost: number;
    }[] = [];

    for (const c of calculators) {
      const cat = CATEGORY_LABELS[c.category] ?? c.category;
      entries.push({
        kind: 'calculator',
        title: c.name,
        subtitle: cat,
        href: `/calculadoras/${c.slug}`,
        haystack: [
          c.name,
          c.description,
          c.slug,
          cat,
          ...(c.keywords ?? []),
        ]
          .join(' ')
          .toLowerCase(),
        boost: 1.5,
      });
    }

    for (const g of guias) {
      entries.push({
        kind: 'guia',
        title: g.title,
        subtitle: `Guía · ${g.categoryLabel} · ${g.readingTime} min`,
        href: `/guias/${g.slug}`,
        haystack: [
          g.title,
          g.description,
          g.intent,
          g.categoryLabel,
          ...g.keywords,
        ]
          .join(' ')
          .toLowerCase(),
        boost: 1.2,
      });
    }

    for (const a of articles) {
      entries.push({
        kind: 'article',
        title: a.title,
        subtitle: `Blog · ${a.category}`,
        href: `/blog/${a.slug}`,
        haystack: [
          a.title,
          a.description,
          a.category,
          ...a.keywords,
        ]
          .join(' ')
          .toLowerCase(),
        boost: 1.0,
      });
    }

    for (const cat of CALCULATOR_CATEGORY_LIST) {
      entries.push({
        kind: 'category',
        title: cat.pluralLabel,
        subtitle: 'Categoría',
        href: `/categoria/${cat.id}`,
        haystack: [
          cat.label,
          cat.pluralLabel,
          cat.description,
          ...cat.keywords,
        ]
          .join(' ')
          .toLowerCase(),
        boost: 0.8,
      });
    }

    return entries;
  }, []);
}

/** Tokeniza una query: divide por espacios, filtra tokens triviales. */
function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // sin acentos
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

/** Igual que tokenize pero devuelve string normalizado para haystack matching. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Calcula el score de un entry contra una query.
 * - Match exacto del título: +10
 * - Cada token presente en el haystack: +1
 * - Bonus si todos los tokens están presentes: +2
 *
 * Multiplicado por boost del tipo. Devuelve 0 si ningún token matchea
 * (filtramos esos resultados antes de devolver).
 */
function scoreEntry(
  entry: ReturnType<typeof useSearchIndex>[number],
  rawQuery: string,
  tokens: string[],
): number {
  const q = normalize(rawQuery);
  if (q.length < 2) return 0;
  const haystack = entry.haystack; // ya normalizado
  const titleNorm = normalize(entry.title);

  let score = 0;
  if (titleNorm.includes(q)) score += 10;
  if (haystack.includes(q)) score += 3;

  let allTokensFound = true;
  for (const t of tokens) {
    if (haystack.includes(t)) score += 1;
    else allTokensFound = false;
  }
  if (allTokensFound && tokens.length > 1) score += 2;

  return score === 0 ? 0 : score * entry.boost;
}

/** Configuración visual por tipo de resultado. */
const KIND_META: Record<
  ResultKind,
  { label: string; icon: typeof Search; color: string }
> = {
  calculator: {
    label: 'Calculadora',
    icon: CalculatorIcon,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15',
  },
  guia: {
    label: 'Guía',
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15',
  },
  article: {
    label: 'Blog',
    icon: Newspaper,
    color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15',
  },
  category: {
    label: 'Categoría',
    icon: Folder,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15',
  },
};

interface SiteSearchProps {
  /**
   * - 'overlay': abre un dropdown bajo el input (uso en Header).
   * - 'page': renderiza inline una lista grande (uso en /buscar).
   */
  variant?: 'overlay' | 'page';
  /** Tope de resultados visibles. */
  maxResults?: number;
  /** Placeholder del input. */
  placeholder?: string;
  /**
   * Si true, sincroniza la query con `?q=` en la URL. Sólo lo
   * activamos en /buscar para soportar deep linking; el overlay
   * no toca la URL.
   */
  syncWithUrl?: boolean;
  /** Autofocus al montar (útil cuando el overlay aparece). */
  autoFocus?: boolean;
}

export default function SiteSearch({
  variant = 'page',
  maxResults = 20,
  placeholder = 'Buscar calculadoras, guías o artículos…',
  syncWithUrl = false,
  autoFocus = false,
}: SiteSearchProps) {
  const index = useSearchIndex();
  const router = useRouter();
  const params = useSearchParams();

  const initialQuery = syncWithUrl ? params.get('q') ?? '' : '';
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sincronizar input → URL (sólo en /buscar)
  useEffect(() => {
    if (!syncWithUrl) return;
    const sp = new URLSearchParams(window.location.search);
    if (query) sp.set('q', query);
    else sp.delete('q');
    const newUrl = `${window.location.pathname}${sp.toString() ? `?${sp}` : ''}`;
    // replaceState para no llenar el history en cada keystroke
    window.history.replaceState(null, '', newUrl);
  }, [query, syncWithUrl]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const tokens = useMemo(() => tokenize(query), [query]);
  const results: SearchResult[] = useMemo(() => {
    if (query.trim().length < 2) return [];
    return index
      .map((entry) => {
        const score = scoreEntry(entry, query, tokens);
        if (score <= 0) return null;
        return {
          kind: entry.kind,
          title: entry.title,
          subtitle: entry.subtitle,
          href: entry.href,
          score,
        };
      })
      .filter((r): r is SearchResult => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }, [query, tokens, index, maxResults]);

  // Agrupa resultados por tipo (sólo en variant 'page').
  const grouped = useMemo(() => {
    if (variant !== 'page') return null;
    return results.reduce<Record<ResultKind, SearchResult[]>>(
      (acc, r) => {
        (acc[r.kind] ??= []).push(r);
        return acc;
      },
      {} as Record<ResultKind, SearchResult[]>,
    );
  }, [results, variant]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En modo overlay, "Enter" lleva a /buscar?q=…
    if (variant === 'overlay' && query.trim().length >= 2) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} role="search">
        <div className="relative">
          <Search
            aria-hidden
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)] pointer-events-none"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // Damos tiempo a que el click en un resultado se procese
              // antes de cerrar el overlay.
              setTimeout(() => setOpen(false), 200);
            }}
            placeholder={placeholder}
            aria-label="Buscar en CalculaChile"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-10 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* Overlay (Header / inline) */}
      {variant === 'overlay' && open && query.trim().length >= 2 && (
        <div className="absolute z-50 left-0 right-0 mt-2 max-h-[60vh] overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-[var(--foreground-muted)]">
              Sin resultados para «{query}»
            </div>
          ) : (
            <>
              <ul className="py-1">
                {results.slice(0, 8).map((r) => {
                  const meta = KIND_META[r.kind];
                  const Icon = meta.icon;
                  return (
                    <li key={`${r.kind}:${r.href}`}>
                      <Link
                        href={r.href}
                        onMouseDown={() => setQuery('')}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--background-secondary)] transition-colors"
                      >
                        <span
                          className={`inline-grid flex-shrink-0 h-8 w-8 place-items-center rounded-md ${meta.color}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-[var(--foreground)] truncate">
                            {r.title}
                          </span>
                          <span className="block text-xs text-[var(--foreground-muted)] truncate">
                            {r.subtitle}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={`/buscar?q=${encodeURIComponent(query.trim())}`}
                onMouseDown={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-[var(--color-primary-600)] hover:bg-[var(--background-secondary)] border-t border-[var(--border)] transition-colors"
              >
                Ver todos los resultados ({results.length})
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>
      )}

      {/* Page (resultados inline agrupados) */}
      {variant === 'page' && (
        <div className="mt-8">
          {query.trim().length < 2 ? (
            <p className="text-sm text-[var(--foreground-muted)]">
              Escribe al menos 2 caracteres para buscar.
            </p>
          ) : results.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-[var(--foreground-secondary)] mb-2">
                No encontramos resultados para «{query}».
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">
                Prueba con palabras más cortas o revisa el catálogo completo de
                calculadoras.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="text-sm text-[var(--foreground-muted)]">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para «{query}»
              </p>
              {(['calculator', 'guia', 'article', 'category'] as ResultKind[]).map(
                (kind) => {
                  const list = grouped?.[kind];
                  if (!list || list.length === 0) return null;
                  const meta = KIND_META[kind];
                  const Icon = meta.icon;
                  return (
                    <section key={kind}>
                      <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] mb-3">
                        <span
                          className={`inline-grid h-7 w-7 place-items-center rounded-md ${meta.color}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {meta.label}s
                        <span className="text-xs font-normal text-[var(--foreground-muted)]">
                          ({list.length})
                        </span>
                      </h2>
                      <ul className="space-y-1.5">
                        {list.map((r) => (
                          <li key={r.href}>
                            <Link
                              href={r.href}
                              className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--color-primary-500)]/40 hover:shadow-sm transition-all"
                            >
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors line-clamp-1">
                                  {r.title}
                                </span>
                                <span className="block text-xs text-[var(--foreground-muted)] line-clamp-1">
                                  {r.subtitle}
                                </span>
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-[var(--foreground-muted)] flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                },
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
