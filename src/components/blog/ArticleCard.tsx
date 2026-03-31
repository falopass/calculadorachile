import Link from 'next/link';
import type { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block h-full"
      aria-label={`Leer artículo: ${article.title}`}
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-500)]/5 hover:-translate-y-1">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)]" />
        
        <div className="p-5 md:p-6 flex flex-col h-full">
          {/* Category and Date */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-600)]">
              {article.category}
            </span>
            <span className="text-xs text-[var(--foreground-muted)]">
              {formattedDate}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)] transition-colors mb-2 leading-tight line-clamp-2">
            {article.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-[var(--foreground-secondary)] line-clamp-2 mb-4 leading-relaxed flex-grow">
            {article.description}
          </p>
          
          {/* Read more link */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary-600)] group-hover:text-[var(--color-primary-500)] transition-colors mt-auto">
            Leer más
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
