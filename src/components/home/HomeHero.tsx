import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import LiveValuesStrip from './LiveValuesStrip';
import { calculators } from '@/data/calculators';

/**
 * Hero principal del sitio.
 *
 * Server Component (SEO-friendly) con una sola "isla" cliente
 * (LiveValuesStrip) para los valores en vivo de UF/UTM/dólar.
 */
export default function HomeHero() {
  const total = calculators.length;

  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-[0.04]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-[var(--color-primary-50)] to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[var(--color-primary-500)]/10 blur-[120px]"
      />

      <div className="container-base pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--foreground-secondary)] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary-500)]" />
            <span>Valores oficiales 2026 actualizados</span>
          </div>

          {/* Headline */}
          <h1 className="heading-display mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-[var(--foreground)]">Calculadoras de </span>
            <span className="text-gradient">Chile</span>
            <span className="text-[var(--foreground)]">,<br className="hidden sm:block" /> claras y precisas.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--foreground-secondary)] max-w-2xl mx-auto">
            {total}+ herramientas para sueldo líquido, finiquito, UF, IVA, créditos y
            más. Gratis, sin registro, con valores actualizados y resultados al instante.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/calculadoras" className="btn-primary px-5 py-3 text-base">
              Explorar calculadoras
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/calculadoras/calculadora-sueldo-liquido"
              className="btn-secondary px-5 py-3 text-base"
            >
              Calcular sueldo líquido
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Datos del Banco Central · 100% gratis · Sin registro
          </p>
        </div>

        {/* Live values strip */}
        <div className="mt-12 md:mt-16 mx-auto max-w-4xl">
          <LiveValuesStrip />
        </div>
      </div>
    </section>
  );
}
