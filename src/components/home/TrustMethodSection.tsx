import Link from 'next/link';
import { BookOpenCheck, FileSearch, ShieldCheck } from 'lucide-react';

const commitments = [
  {
    icon: FileSearch,
    title: 'Fuente antes que atajo',
    body: 'Cada cálculo y artículo indica su fuente oficial, fecha de revisión, supuestos y límites. Si una regla cambia, la referencia no se reemplaza por una cifra sin respaldo.',
  },
  {
    icon: BookOpenCheck,
    title: 'Método visible',
    body: 'Las calculadoras explican qué datos usan y cómo se obtiene la estimación. Los artículos separan la regla general de los casos que requieren revisar documentos o una institución pública.',
  },
  {
    icon: ShieldCheck,
    title: 'Independencia y correcciones',
    body: 'CalculaChile no es un sitio del Estado ni reemplaza a SII, IPS, AFP o la Dirección del Trabajo. Si detectas un error, existe un canal público para reportarlo y corregirlo.',
  },
];

export default function TrustMethodSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="container-base py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            Criterio editorial
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-3xl">
            Herramientas referenciales con método, fuentes y límites visibles
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--foreground-secondary)]">
            Una estimación útil no es solo un número: debe permitirte revisar de dónde sale, en qué
            casos deja de aplicar y qué institución confirma el trámite real.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {commitments.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                {body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium">
          <Link href="/metodologia" className="text-[var(--accent)] hover:underline">
            Cómo verificamos y corregimos el contenido
          </Link>
          <Link
            href="/acerca-de"
            className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:underline"
          >
            Quién está detrás de CalculaChile
          </Link>
        </div>
      </div>
    </section>
  );
}
