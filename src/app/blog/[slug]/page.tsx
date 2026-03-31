import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles, getArticleBySlug } from '@/data/articles';

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Artículo no encontrado' };
  }

  return {
    title: `${article.title} | CalculaChile`,
    description: article.description,
    keywords: article.keywords.join(', '),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-[var(--foreground-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary-600)] transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[var(--color-primary-600)] transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)]">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mt-3 mb-3">
            {article.title}
          </h1>
          <p className="text-[var(--foreground-secondary)]">
            {article.description}
          </p>
          <p className="text-sm text-[var(--foreground-muted)] mt-2">
            Publicado el {new Date(article.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[var(--foreground)]
            prose-p:text-[var(--foreground-secondary)]
            prose-strong:text-[var(--foreground)]
            prose-a:text-[var(--color-primary-600)]
            prose-a:no-underline hover:prose-a:underline
            prose-li:text-[var(--foreground-secondary)]
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related calculators */}
        {article.relatedCalculators.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Calculadoras Relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {article.relatedCalculators.map((slug) => (
                <Link
                  key={slug}
                  href={`/calculadoras/${slug}`}
                  className="flex items-center gap-2 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                >
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {slug.replace(/calculadora-/g, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="text-xs text-[var(--color-primary-600)] ml-auto">Calcular</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-primary-600)] hover:underline"
          >
            &larr; Volver al Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
