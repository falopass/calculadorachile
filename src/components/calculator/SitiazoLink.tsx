'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  buildSitiazoUrl,
  getSitiazoCtaCopy,
  isSitiazoCtaCalculator,
  type SitiazoPlacement,
} from '@/lib/sitiazo';
import { trackEvents } from '@/lib/analytics';

export interface SitiazoLinkProps {
  /** ID de calculadora (allowlist pyme) que define el copy. */
  calculatorId: string;
  placement?: SitiazoPlacement;
  /** ID de contenido para analytics/utm (ej. `blog_<slug>`, `guia_<slug>`). */
  contentId?: string;
  className?: string;
}

/**
 * CTA contextual hacia Sitiazo (calculadoras de pymes y contenido asociado).
 * Mismo estilo "nota silenciosa" que CrossDomainCta.
 */
export default function SitiazoLink({
  calculatorId,
  placement = 'after_result',
  contentId,
  className = '',
}: SitiazoLinkProps) {
  const viewedRef = useRef(false);

  const copy = isSitiazoCtaCalculator(calculatorId)
    ? getSitiazoCtaCopy(calculatorId)
    : null;

  const trackingId = contentId ?? calculatorId;

  useEffect(() => {
    if (!copy || viewedRef.current) return;
    viewedRef.current = true;
    trackEvents.pymeCtaViewed({
      calculatorId: trackingId,
      position: placement,
    });
  }, [copy, trackingId, placement]);

  if (!copy) {
    return null;
  }

  const href = buildSitiazoUrl(trackingId, placement);

  const handleClick = () => {
    trackEvents.pymeCtaClicked({
      calculatorId: trackingId,
      position: placement,
    });
  };

  return (
    <aside
      className={`rounded-xl border border-[var(--border)] p-4 md:p-5 ${className}`}
      aria-label="Siguiente paso: página web para tu pyme en Sitiazo"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
        Siguiente paso · presencia web
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)] md:text-base">
        {copy.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground-secondary)]">
        {copy.body}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] underline underline-offset-2"
      >
        {copy.ctaLabel}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
      <p className="mt-1 text-xs text-[var(--foreground-muted)]">
        Sitiazo es otro producto del creador de CalculaChile.
      </p>
    </aside>
  );
}
