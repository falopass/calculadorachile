'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  buildCvlistoCartaUrl,
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

  const urlOptions = {
    origen: copy.origen,
    placement,
    calculatorId: fromCalc ? calculatorId : undefined,
    experiment,
  };
  const href = buildCvlistoUrl(urlOptions);
  const cartaHref = buildCvlistoCartaUrl(urlOptions);

  const handleClick = (link: 'cv' | 'carta') => {
    trackEvents.employmentCtaClicked({
      calculatorId: trackingId,
      origin: copy.origen,
      position: placement,
      experiment,
      message: copy.title,
      link,
    });
  };

  return (
    <aside
      className={`rounded-xl border border-[var(--border)] ${
        compact ? 'p-4' : 'p-4 md:p-5'
      } ${className}`}
      aria-label="Siguiente paso: preparar CV en CVListo"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
        {copy.eyebrow}
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)] md:text-base">
        {copy.title}
      </h3>
      <p
        className={`mt-1.5 leading-relaxed text-[var(--foreground-secondary)] ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        {copy.body}
      </p>
      <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick('cv')}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] underline underline-offset-2"
        >
          {copy.ctaLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
        <a
          href={cartaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick('carta')}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] underline underline-offset-2"
        >
          Armar la carta de presentación (gratis, sin registro)
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
      <p className="mt-1 text-xs text-[var(--foreground-muted)]">
        CVListo es otro producto del creador de CalculaChile. Score ATS y 1
        optimización gratis al registrarte con Google; no inventa experiencia.
      </p>
    </aside>
  );
}
