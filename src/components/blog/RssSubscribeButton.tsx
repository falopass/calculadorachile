'use client';

import { useCallback, useState } from 'react';
import { Check, Copy, Rss } from 'lucide-react';

const FEED_PATH = '/blog/feed.xml';

/**
 * CTA del feed RSS del blog.
 *
 * Importante: CalculaChile no usa ni necesita cuenta Feedly.
 * El sitio solo publica un archivo XML público (`/blog/feed.xml`).
 * La persona se “suscribe” en su propio lector (o copiando la URL).
 *
 * UX:
 * 1) Copiar URL del feed (acción principal, sin servicios de terceros)
 * 2) Enlace al XML por si quieren verlo o pegarlo en un lector
 */
export default function RssSubscribeButton() {
  const [copied, setCopied] = useState(false);

  const absoluteFeedUrl = () =>
    typeof window !== 'undefined'
      ? `${window.location.origin}${FEED_PATH}`
      : `https://calculadorachile.cl${FEED_PATH}`;

  const copyFeedUrl = useCallback(async () => {
    const url = absoluteFeedUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si el navegador bloquea clipboard, al menos abrir el feed.
      window.open(FEED_PATH, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <div className="mt-5 flex flex-col items-center gap-2 max-w-md mx-auto">
      <button
        type="button"
        onClick={copyFeedUrl}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] transition-colors px-3.5 py-2 rounded-full shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" aria-hidden />
            URL del feed copiada
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" aria-hidden />
            Copiar enlace RSS del blog
          </>
        )}
      </button>
      <p className="text-[11px] leading-snug text-center text-[var(--foreground-muted)] px-2">
        No hace falta cuenta en CalculaChile. Pega la URL en un lector RSS
        (Feedly, Inoreader, NetNewsWire, etc.) o{' '}
        <a
          href={FEED_PATH}
          className="underline underline-offset-2 hover:text-[var(--color-accent-600)]"
        >
          ábrela aquí
        </a>
        .
      </p>
      <span className="inline-flex items-center gap-1 text-[10px] text-[var(--foreground-muted)]">
        <Rss className="w-3 h-3" aria-hidden />
        Feed: <code className="font-mono text-[10px]">{FEED_PATH}</code>
      </span>
    </div>
  );
}
