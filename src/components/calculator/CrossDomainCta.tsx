'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import {
  buildCvlistoUrl,
  getCvlistoCtaCopy,
  getCvlistoCtaCopyByOrigen,
  isCvlistoCtaCalculator,
  type CvlistoOrigen,
  type CvlistoPlacement,
} from '@/lib/cvlisto';
import { trackEvents } from '@/lib/analytics';

export interface CrossDomainCtaProps {
  /** ID de calculadora (allowlist laboral). */
  calculatorId?: string;
  /** Origen manual para guías/blog cuando no hay calc. */
  origen?: CvlistoOrigen | string;
  /**
   * Identificador de página de contenido para analytics
   * (ej. `blog:checklist-despido`, `guia:finiquito-laboral-chile`).
   */
  contentId?: string;
  placement?: CvlistoPlacement;
  /** Variante A/B opcional */
  experiment?: string;
  className?: string;
  /** Variante visual más compacta para footers de artículo */
  compact?: boolean;
}

/**
 * CTA contextual hacia CVListo (calculadoras laborales, guías y blog).
 */
export default function CrossDomainCta({
  calculatorId,
  origen: origenProp,
  contentId,
  placement = 'after_result',
  experiment,
  className = '',
  compact = false,
}: CrossDomainCtaProps) {
  const viewedRef = useRef(false);

  const fromCalc = calculatorId && isCvlistoCtaCalculator(calculatorId);
  const copy = fromCalc
    ? getCvlistoCtaCopy(calculatorId)
    : origenProp
      ? getCvlistoCtaCopyByOrigen(origenProp)
      : null;

  const trackingId =
    calculatorId && fromCalc
      ? calculatorId
      : contentId || (origenProp ? `content:${origenProp}` : 'content');

  useEffect(() => {
    if (!copy || viewedRef.current) return;
    viewedRef.current = true;
    trackEvents.employmentCtaViewed({
      calculatorId: trackingId,
      origin: copy.origen,
      position: placement,
      message: copy.title,
    });
  }, [copy, trackingId, placement]);

  if (!copy) {
    return null;
  }

  const href = buildCvlistoUrl({
    origen: copy.origen,
    placement,
    calculatorId: fromCalc ? calculatorId : undefined,
    experiment,
  });

  const handleClick = () => {
    trackEvents.employmentCtaClicked({
      calculatorId: trackingId,
      origin: copy.origen,
      position: placement,
      experiment,
      message: copy.title,
    });
  };

  return (
    <aside
      className={`rounded-2xl border border-[var(--color-primary-500)]/20 bg-gradient-to-br from-[var(--color-primary-500)]/[0.07] to-[var(--color-primary-500)]/[0.02] ${
        compact ? 'p-4 md:p-5' : 'p-5 md:p-6'
      } ${className}`}
      aria-label="Siguiente paso: preparar CV en CVListo"
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`flex flex-none items-center justify-center rounded-xl bg-[var(--color-primary-500)]/10 ${
            compact ? 'h-9 w-9' : 'h-10 w-10'
          }`}
        >
          <FileText
            className={`text-[var(--color-primary-600)] ${compact ? 'h-4 w-4' : 'h-5 w-5'}`}
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
            {copy.eyebrow}
          </p>
          <h3
            className={`mt-1 font-semibold leading-snug text-[var(--foreground)] ${
              compact ? 'text-sm md:text-base' : 'text-base md:text-lg'
            }`}
          >
            {copy.title}
          </h3>
          <p
            className={`mt-1.5 leading-relaxed text-[var(--foreground-secondary)] ${
              compact ? 'text-xs md:text-sm' : 'text-sm'
            }`}
          >
            {copy.body}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="btn-primary mt-3.5 inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold"
          >
            {copy.ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-2 text-xs text-[var(--foreground-muted)]">
            CVListo (cvlisto.cl) · Google · Sin tarjeta · No inventa experiencia
          </p>
        </div>
      </div>
    </aside>
  );
}
