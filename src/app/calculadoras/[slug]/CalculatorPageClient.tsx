'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AUTHOR } from '@/lib/seo/author';
import PremiumCalculatorShell from '@/components/calculator/PremiumCalculatorShell';
import SeoStructuredData from '@/components/calculator/SeoStructuredData';
import CalculatorPageLayout from '@/components/calculator/CalculatorPageLayout';
import LiveValuesSection from '@/components/calculator/LiveValuesSection';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import OfficialSources from '@/components/calculator/OfficialSources';
import CalculatorMethodology from '@/components/calculator/CalculatorMethodology';
import PremiumLoadingIndicator from '@/components/calculator/PremiumLoadingIndicator';
import { calculators } from '@/data/calculators';
import { loadCalculationFn, type CalculateFn } from '@/lib/calculations/load-calculator';
import { getRelatedCalculators } from '@/lib/seo/related-calculators';
import { useValues } from '@/lib/context/ValuesContext';

interface CalculatorPageClientProps {
  calculator: import('@/types/calculator').Calculator;
  canonicalUrl?: string;
  /** URL absoluta de la imagen OG dinámica para esta calculadora. */
  ogImageUrl?: string;
  /** URL absoluta de la guía pillar relacionada (si existe). */
  guideUrl?: string;
  /** Título de la guía pillar relacionada para mostrar en el bloque. */
  guideTitle?: string;
  /** Tiempo de lectura estimado en minutos (para mostrar en el bloque). */
  guideReadingTime?: number;
}

function buildSeoIntro(calculator: import('@/types/calculator').Calculator): string {
  const baseDesc = calculator.description.trim();
  const categoryText = (() => {
    switch (calculator.category) {
      case 'sueldo':
        return 'cálculos de sueldo y remuneraciones';
      case 'impuestos':
        return 'cálculos tributarios e impuestos chilenos';
      case 'beneficios':
        return 'cálculos de beneficios laborales y derechos del Código del Trabajo';
      case 'conversiones':
        return 'conversores entre unidades chilenas';
      case 'familia':
        return 'cálculos familiares y dependientes';
      case 'vivienda':
        return 'cálculos de vivienda y bienes raíces';
      case 'vehiculos':
        return 'cálculos vehiculares y permisos de circulación';
      case 'empresas':
        return 'cálculos para empresas y PYMEs';
      case 'pension':
        return 'cálculos previsionales y pensiones';
      case 'educacion':
        return 'cálculos educacionales y créditos';
      case 'hogar':
        return 'cálculos del hogar y servicios básicos';
      default:
        return 'cálculos chilenos';
    }
  })();
  const legalContext = calculator.faq?.[0]?.answer
    ? calculator.faq[0].answer.split('. ').slice(0, 2).join('. ').trim()
    : '';

  return `${baseDesc} Forma parte del catálogo de ${categoryText} de CalculaChile. Revisa la metodología, los supuestos, las limitaciones y las fuentes declaradas antes de usar la estimación.${legalContext ? ` ${legalContext}.` : ''}`;
}

function CalculatorLoadingState({
  calculator,
}: {
  calculator: import('@/types/calculator').Calculator;
}) {
  const essentialInputs = calculator.inputs
    .filter((input) => input.required || input.defaultValue !== undefined)
    .slice(0, 4);

  return (
    <section
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-8 md:px-6 md:py-10"
      aria-label={`Preparando ${calculator.name}`}
      aria-live="polite"
    >
      <PremiumLoadingIndicator
        isLoading={true}
        message="Preparando calculadora..."
        variant="spinner"
      />

      <div className="mx-auto mt-2 max-w-2xl border-t border-[var(--border)] pt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
          Antes de calcular
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
          Datos que esta herramienta te pedirá
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
          La calculadora se habilita en esta misma página. Puedes preparar los antecedentes y
          revisar abajo las fuentes, supuestos y limitaciones de la estimación.
        </p>
        {essentialInputs.length > 0 && (
          <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Datos principales">
            {essentialInputs.map((input) => (
              <li
                key={input.id}
                className="rounded-full border border-[var(--border)] bg-[var(--background-secondary)] px-3 py-1.5 text-xs text-[var(--foreground-secondary)]"
              >
                {input.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <noscript>
        <p>
          Esta herramienta necesita JavaScript para realizar el cálculo. Aun así, puedes revisar la
          metodología y las fuentes oficiales publicadas en esta página.
        </p>
      </noscript>
    </section>
  );
}

function CalculatorReferenceContent({
  calculator,
}: {
  calculator: import('@/types/calculator').Calculator;
}) {
  return (
    <>
      {calculator.methodology && <CalculatorMethodology methodology={calculator.methodology} />}

      {calculator.sources && calculator.sources.length > 0 && (
        <OfficialSources sources={calculator.sources} className="mt-8 md:mt-10" />
      )}

      <p className="mt-4 text-xs text-[var(--foreground-muted)]">
        Revisado por{' '}
        <Link
          href="/acerca-de"
          className="font-medium text-[var(--color-primary-600)] hover:underline"
        >
          {AUTHOR.name}
        </Link>{' '}
        ·{' '}
        <Link
          href="/metodologia#reportar-correccion"
          className="font-medium text-[var(--color-primary-600)] hover:underline"
        >
          Reportar un dato o fuente que requiera revisión
        </Link>
      </p>
    </>
  );
}

export default function CalculatorPageClient({
  calculator,
  canonicalUrl,
  ogImageUrl,
  guideUrl,
  guideTitle,
  guideReadingTime,
}: CalculatorPageClientProps) {
  const { uf, utm } = useValues();
  const [calculateFn, setCalculateFn] = useState<CalculateFn | null>(null);
  const [missing, setMissing] = useState(false);

  // Al cambiar de calculadora, limpia el fn para mostrar skeleton (no al
  // refrescar UF: ahí se intercambia el adapter en caliente).
  useEffect(() => {
    setCalculateFn(null);
    setMissing(false);
  }, [calculator.id]);

  // Carga perezosa del módulo + inyección de UF/UTM en vivo.
  useEffect(() => {
    let cancelled = false;

    loadCalculationFn(calculator.id, {
      valorUF: uf > 0 ? uf : undefined,
      valorUTM: utm > 0 ? utm : undefined,
    })
      .then((fn) => {
        if (cancelled) return;
        if (fn) {
          setCalculateFn(() => fn);
          setMissing(false);
        } else {
          setCalculateFn(null);
          setMissing(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setCalculateFn(null);
        setMissing(true);
      });

    return () => {
      cancelled = true;
    };
  }, [calculator.id, uf, utm]);

  const seoIntroText = buildSeoIntro(calculator);

  if (missing) {
    return (
      <CalculatorPageLayout
        title={calculator.name}
        description={calculator.description}
        calculatorId={calculator.id}
        lastReviewed={calculator.lastReviewed}
      >
        {canonicalUrl && (
          <SeoStructuredData
            calculator={calculator}
            url={canonicalUrl}
            imageUrl={ogImageUrl}
            guideUrl={guideUrl}
          />
        )}

        <section className="rounded-2xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-warning-100)]">
            <svg
              className="w-8 h-8 text-[var(--color-warning-600)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            No pudimos cargar la herramienta en este momento
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[var(--foreground-secondary)]">
            Intenta recargar la página. Mientras lo resolvemos, puedes revisar cómo funciona esta
            estimación, sus fuentes oficiales y sus limitaciones antes de tomar una decisión.
          </p>
          <Link
            href="/metodologia#reportar-correccion"
            className="mt-5 inline-flex text-sm font-semibold text-[var(--color-primary-700)] hover:underline"
          >
            Informar un problema con esta calculadora
          </Link>
        </section>

        <CalculatorReferenceContent calculator={calculator} />
      </CalculatorPageLayout>
    );
  }

  return (
    <CalculatorPageLayout
      title={calculator.name}
      description={calculator.description}
      calculatorId={calculator.id}
      lastReviewed={calculator.lastReviewed}
    >
      {canonicalUrl && (
        <SeoStructuredData
          calculator={calculator}
          url={canonicalUrl}
          imageUrl={ogImageUrl}
          guideUrl={guideUrl}
        />
      )}

      {!calculateFn ? (
        <CalculatorLoadingState calculator={calculator} />
      ) : (
        <PremiumCalculatorShell calculator={calculator} calculateFn={calculateFn} />
      )}

      <CalculatorReferenceContent calculator={calculator} />

      <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-[var(--foreground)] mb-4">
            <svg
              className="w-5 h-5 text-[var(--color-primary-500)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Sobre {calculator.name.toLowerCase()}
          </h2>
          <p className="text-sm md:text-base text-[var(--foreground-secondary)] leading-relaxed">
            {seoIntroText}
          </p>
          <p className="mt-3 text-sm md:text-base text-[var(--foreground-secondary)] leading-relaxed">
            Ingresa los datos solicitados arriba y los resultados se mostrarán automáticamente, sin
            necesidad de hacer clic en ningún botón.
          </p>
          <LiveValuesSection />
        </section>

        {calculator.faq && calculator.faq.length > 0 && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7">
            <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-[var(--foreground)] mb-4">
              <svg
                className="w-5 h-5 text-[var(--color-primary-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Preguntas frecuentes
            </h2>
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {calculator.faq.slice(0, 5).map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            {calculator.faq.length > 5 && (
              <details className="mt-4 pt-4 border-t border-[var(--border)]">
                <summary className="cursor-pointer text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]">
                  Ver más preguntas ({calculator.faq.length - 5})
                </summary>
                <div className="mt-4 space-y-4">
                  {calculator.faq.slice(5).map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </section>
        )}
      </div>

      {/* Enlazado interno laboral (hub + clúster cesantía / contrato vs honorarios) */}
      {(() => {
        type LaborLink = { href: string; label: string; desc?: string };
        const byId: Record<string, LaborLink[]> = {
          finiquito: [
            { href: '/cesantia', label: 'Hub cesantía', desc: 'Checklist post-despido' },
            {
              href: '/blog/seguro-cesantia-finiquito-2026-afc',
              label: 'Seguro de Cesantía y finiquito',
            },
            {
              href: '/blog/checklist-despues-despido-chile-2026',
              label: 'Checklist después del despido',
            },
            { href: '/guias/finiquito-laboral-chile', label: 'Guía de finiquito' },
            {
              href: '/calculadoras/calculadora-indemnizacion-anos-servicio',
              label: 'Indemnización por años',
            },
          ],
          'indemnizacion-anos-servicio': [
            { href: '/cesantia', label: 'Hub cesantía' },
            { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito completo' },
            {
              href: '/blog/seguro-cesantia-finiquito-2026-afc',
              label: 'Seguro de Cesantía',
            },
            { href: '/guias/finiquito-laboral-chile', label: 'Guía finiquito' },
          ],
          'vacaciones-proporcionales': [
            { href: '/cesantia', label: 'Hub cesantía' },
            { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito' },
            {
              href: '/calculadoras/calculadora-indemnizacion-anos-servicio',
              label: 'Indemnización',
            },
            { href: '/guias/finiquito-laboral-chile', label: 'Guía finiquito' },
          ],
          'sueldo-liquido': [
            { href: '/guias/sueldo-liquido-chile', label: 'Guía sueldo líquido' },
            {
              href: '/calculadoras/calculadora-boleta-honorarios',
              label: 'Boleta de honorarios',
              desc: 'Comparar contrato vs honorarios',
            },
            {
              href: '/calculadoras/calculadora-finiquito',
              label: 'Finiquito',
            },
            {
              href: '/calculadoras/calculadora-horas-extra',
              label: 'Horas extra',
            },
          ],
          'boleta-honorarios': [
            {
              href: '/guias/iva-boleta-honorarios-chile',
              label: 'Guía boleta e IVA',
            },
            {
              href: '/calculadoras/calculadora-sueldo-liquido',
              label: 'Sueldo líquido (contrato)',
              desc: 'Comparar con dependiente',
            },
            {
              href: '/calculadoras/calculadora-cotizacion-independientes',
              label: 'Cotización independientes',
            },
            {
              href: '/calculadoras/calculadora-impuesto-segunda-categoria',
              label: 'Impuesto 2.ª categoría',
            },
          ],
          'horas-extra': [
            { href: '/guias/sueldo-liquido-chile', label: 'Guía sueldo líquido' },
            { href: '/calculadoras/calculadora-sueldo-liquido', label: 'Sueldo líquido' },
            { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito' },
          ],
        };
        const links = byId[calculator.id];
        if (!links?.length) return null;
        return (
          <section className="mt-8 md:mt-10" aria-label="Enlaces del clúster laboral">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
              Sigue en el clúster laboral
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-all hover:border-[var(--color-primary-500)]/30"
                  >
                    <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-600)]">
                      {item.label}
                    </span>
                    {item.desc ? (
                      <span className="mt-0.5 block text-xs text-[var(--foreground-secondary)]">
                        {item.desc}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}

      {guideUrl && guideTitle && (
        <section className="mt-8 md:mt-10">
          <a
            href={guideUrl}
            className="group block rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--color-primary-500)]/5 to-[var(--color-primary-500)]/[0.02] hover:from-[var(--color-primary-500)]/10 hover:to-[var(--color-primary-500)]/5 hover:border-[var(--color-primary-500)]/30 transition-all p-6 md:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[var(--color-primary-500)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-primary-600)] mb-1">
                  Guía completa
                </p>
                <h2 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-1.5 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
                  {guideTitle}
                </h2>
                <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  Lee la guía completa con fórmulas, ejemplos numéricos en pesos chilenos y bases
                  legales citadas.
                  {guideReadingTime ? ` Tiempo estimado: ${guideReadingTime} minutos.` : ''}
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <svg
                  className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--color-primary-500)] group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </a>
        </section>
      )}

      {(() => {
        const related = getRelatedCalculators(calculator, calculators, 6);
        if (related.length === 0) return null;
        return <RelatedCalculators calculators={related} title="También te puede interesar" />;
      })()}
    </CalculatorPageLayout>
  );
}
