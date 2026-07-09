'use client';

import { useCallback, useState } from 'react';
import { Check, Copy, ExternalLink, Rss } from 'lucide-react';

const FEED_PATH = '/blog/feed.xml';

/**
 * CTA de suscripción RSS usable por humanos.
 *
 * El enlace plano a `feed.xml` “funciona” técnicamente, pero en el
 * navegador solo muestra XML y parece roto. Aquí ofrecemos:
 * 1) Abrir el feed en Feedly (flujo de suscripción real)
 * 2) Copiar la URL del feed (otros lectores)
 * 3) Ver el XML (power users)
 */
export default function RssSubscribeButton() {
  const [copied, setCopied] = useState(false);

  const feedAbsoluteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${FEED_PATH}`
      : FEED_PATH;

  const feedlyUrl = `https://feedly.com/i/subscription/feed/${encodeURIComponent(
    typeof window !== 'undefined'
      ? `${window.location.origin}${FEED_PATH}`
      : `https://calculadorachile.cl${FEED_PATH}`,
  )}`;

  const copyFeedUrl = useCallback(async () => {
    try {
      const url =
        typeof window !== 'undefined'
          ? `${window.location.origin}${FEED_PATH}`
          : FEED_PATH;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: seleccionar no es trivial; al menos abrir el feed.
      window.open(FEED_PATH, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <div className="mt-5 flex flex-col items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={feedlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] transition-colors px-3.5 py-2 rounded-full shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
        >
          <Rss className="w-3.5 h-3.5" aria-hidden />
          Suscribir en Feedly
          <ExternalLink className="w-3 h-3 opacity-80" aria-hidden />
        </a>
        <button
          type="button"
          onClick={copyFeedUrl}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--color-accent-600)] transition-colors px-3 py-2 rounded-full border border-[var(--border)] hover:border-[var(--color-accent-500)]/40 bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              URL copiada
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden />
              Copiar URL del feed
            </>
          )}
        </button>
      </div>
      <a
        href={FEED_PATH}
        className="text-[11px] text-[var(--foreground-muted)] hover:text-[var(--color-accent-600)] underline-offset-2 hover:underline"
        title={feedAbsoluteUrl}
      >
        Ver feed XML
      </a>
    </div>
  );
}
