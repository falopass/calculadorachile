import { Metadata } from 'next';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { Calendar } from 'lucide-react';

export interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lastUpdated?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

/**
 * LegalPageLayout - Layout reutilizable para páginas legales e informativas
 * 
 * Incluye breadcrumbs, título, descripción y fecha de actualización.
 * Optimizado para SEO con Schema.org.
 */
export default function LegalPageLayout({
  children,
  title,
  description,
  lastUpdated,
  breadcrumbs = [{ label: 'Inicio', href: '/' }, { label: title }],
}: LegalPageLayoutProps) {
  return (
    <div className="container-base py-8 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
            {title}
          </h1>
          <p className="text-lg text-[var(--foreground-secondary)]">
            {description}
          </p>
          {lastUpdated && (
            <div className="flex items-center gap-2 mt-4 text-sm text-[var(--foreground-muted)]">
              <Calendar className="w-4 h-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
          )}
          <div className="h-px bg-[var(--border)] mt-6" />
        </header>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-[var(--color-primary-500)] prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </article>
    </div>
  );
}
