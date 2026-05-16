// ============================================
// Búsqueda — /buscar
// ----------------------------------------------
// Página dedicada al buscador interno. Indexa todas las
// calculadoras, guías, artículos del blog y categorías y filtra
// 100% client-side (no hay backend, no hay analytics tracker en
// la query).
//
// Soporta deep linking: `/buscar?q=sueldo` precarga el input con
// el query y muestra los resultados.
//
// SEO:
//   - `noIndex` porque la página no aporta contenido único
//     indexable (es un buscador). Sí queremos que esté disponible
//     a humanos (link en Header), pero no llenar el índice de
//     Google con páginas vacías.
// ============================================

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Search } from 'lucide-react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import SiteSearch from '@/components/search/SiteSearch';
import { buildPageMetadata } from '@/lib/seo/metadata';

const PAGE_TITLE = 'Buscar en CalculaChile';
const PAGE_DESC =
  'Busca entre todas las calculadoras, guías y artículos del blog de CalculaChile.';

export const metadata: Metadata = buildPageMetadata({
  path: '/buscar',
  title: PAGE_TITLE,
  description: PAGE_DESC,
  // No indexamos páginas de búsqueda porque el contenido depende
  // del query y no aportan valor único al índice de Google.
  noIndex: true,
});

/**
 * Skeleton del buscador mientras Suspense resuelve `useSearchParams`.
 * Sin esto, `next build` falla con
 * "useSearchParams() should be wrapped in a suspense boundary".
 */
function SearchSkeleton() {
  return (
    <div className="w-full">
      <div className="relative">
        <Search
          aria-hidden
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)] pointer-events-none"
        />
        <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-10 text-sm text-[var(--foreground-muted)]">
          Cargando buscador…
        </div>
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <div className="container-base py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Buscar' },
        ]}
      />

      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-primary-500)]/10 mb-3">
            <Search className="w-5 h-5 text-[var(--color-primary-500)]" />
          </div>
          <h1 className="heading-display text-3xl md:text-4xl text-[var(--foreground)] mb-2">
            {PAGE_TITLE}
          </h1>
          <p className="text-base text-[var(--foreground-secondary)] leading-relaxed">
            Busca entre nuestras calculadoras, guías profundas y artículos del
            blog. Los resultados se filtran a medida que escribes.
          </p>
        </header>

        <Suspense fallback={<SearchSkeleton />}>
          <SiteSearch
            variant="page"
            syncWithUrl
            // eslint-disable-next-line jsx-a11y/no-autofocus -- intencional: la única función de la página es buscar; el foco automático es la UX esperada.
            autoFocus
            placeholder="Ej. sueldo líquido, finiquito, IVA, UF…"
          />
        </Suspense>
      </div>
    </div>
  );
}
