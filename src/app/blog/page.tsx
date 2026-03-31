import { Metadata } from 'next';
import { articles } from '@/data/articles';
import ArticleCard from '@/components/blog/ArticleCard';

export const metadata: Metadata = {
  title: 'Blog de Finanzas y Legislación Laboral Chile | CalculaChile',
  description: 'Artículos y guías sobre legislación laboral, impuestos, vivienda y finanzas personales en Chile. Actualizado 2026.',
  keywords: ['blog finanzas Chile', 'guía laboral Chile', 'impuestos Chile', 'derechos trabajadores Chile'],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[var(--color-primary-600)]/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)] text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Blog
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
              Finanzas y Legislación en Chile
            </h1>
            <p className="text-base md:text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
              Guías y artículos prácticos sobre legislación laboral, impuestos, vivienda y finanzas personales.
              Todo en lenguaje simple y con ejemplos en pesos chilenos.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--background-secondary)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              No hay artículos disponibles
            </h3>
            <p className="text-[var(--foreground-secondary)]">
              Pronto publicaremos nuevo contenido. ¡Vuelve pronto!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
