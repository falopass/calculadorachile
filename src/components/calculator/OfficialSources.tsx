// ============================================
// OfficialSources — bloque "Fuentes oficiales"
// ----------------------------------------------
// Renderiza enlaces salientes a las fuentes primarias
// (SII, DT, BCentral, SPensiones, etc.) que respaldan
// el cálculo. Refuerza E-E-A-T en contenido YMYL.
//
// Los enlaces usan target="_blank" + rel="noopener" (sin
// nofollow): Google debe seguirlos para reconocer la
// autoridad de las fuentes citadas.
// ============================================

import { memo } from 'react';

interface OfficialSource {
  name: string;
  url: string;
  note?: string;
}

interface OfficialSourcesProps {
  sources: OfficialSource[];
  className?: string;
}

const OfficialSources = memo(function OfficialSources({
  sources,
  className = '',
}: OfficialSourcesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7 ${className}`}
      aria-label="Fuentes oficiales"
    >
      <h2 className="text-lg md:text-xl font-medium text-[var(--foreground)] mb-4">
        Fuentes oficiales
      </h2>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener"
              className="text-sm font-medium text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline"
            >
              {source.name}
            </a>
            {source.note && (
              <p className="text-sm text-[var(--foreground-secondary)] mt-0.5">
                {source.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
});

export default OfficialSources;
