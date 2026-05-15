import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="section">
      <div className="container-base">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] px-6 py-16 md:px-12 md:py-20 text-center">
          <div
            aria-hidden
            className="absolute inset-0 bg-grid opacity-10"
          />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-white/20 blur-[100px]"
          />
          <div className="relative">
            <h2 className="heading-display text-3xl md:text-5xl text-white">
              Calcula lo que necesitas. Ahora.
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/80 max-w-xl mx-auto">
              Más de 40 herramientas listas para usar. Sin login. Sin pagos. Sin esperas.
            </p>
            <div className="mt-8">
              <Link
                href="/calculadoras"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary-700)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Ver todas las calculadoras
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
