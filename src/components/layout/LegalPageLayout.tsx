import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { Calendar, FileText } from 'lucide-react';

export interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lastUpdated?: string;
  breadcrumbs?: { label: string; href?: string }[];
  sections?: { id: string; title: string }[];
}

/**
 * LegalPageLayout — Layout editorial para páginas legales.
 *
 * Dos columnas en desktop: contenido principal (8/9 cols) + tabla de contenidos
 * sticky (4/3 cols). Tipografía propia, sin prose genérico. Secciones navegables
 * por anclas. Fecha de actualización como badge.
 */
export default function LegalPageLayout({
  children,
  title,
  description,
  lastUpdated,
  breadcrumbs = [{ label: 'Inicio', href: '/' }, { label: title }],
  sections,
}: LegalPageLayoutProps) {
  return (
    <div className="container-base py-8 md:py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Contenido principal */}
        <article className="lg:col-span-8 xl:col-span-9">
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)]">
                <FileText className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
                {title}
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--foreground-secondary)]">
              {description}
            </p>
            {lastUpdated && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground-muted)]">
                <Calendar className="h-4 w-4" />
                <span>Actualizado el {lastUpdated}</span>
              </div>
            )}
          </header>

          <div className="space-y-10 md:space-y-12">{children}</div>
        </article>

        {/* Tabla de contenidos */}
        {sections && sections.length > 0 && (
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <nav
              aria-label="Secciones del documento"
              className="sticky top-28 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
            >
              <h2 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
                Contenido
              </h2>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-start gap-2 border-l-2 border-transparent py-1.5 pl-3 text-sm text-[var(--foreground-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <span className="transition-transform group-hover:translate-x-0.5">
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
