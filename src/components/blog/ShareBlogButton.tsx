'use client';

import { useCallback, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

const BLOG_PATH = '/blog';

/**
 * CTA para compartir el índice del blog (no RSS).
 * Copia la URL de /blog o usa Web Share API en móvil si está disponible.
 */
export default function ShareBlogButton() {
  const [copied, setCopied] = useState(false);

  const blogAbsoluteUrl = () =>
    typeof window !== 'undefined'
      ? `${window.location.origin}${BLOG_PATH}`
      : `https://calculadorachile.cl${BLOG_PATH}`;

  const share = useCallback(async () => {
    const url = blogAbsoluteUrl();
    const title = 'Blog de CalculaChile';
    const text =
      'Artículos sobre sueldo, finiquito, impuestos y derechos laborales en Chile.';

    // Móvil / navegadores con Web Share: sheet nativo.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // Usuario canceló o falló → copiar URL.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Último recurso: no hay clipboard; no-op silencioso.
    }
  }, []);

  return (
    <div className="mt-5 flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--color-accent-600)] transition-colors px-3.5 py-2 rounded-full border border-[var(--border)] hover:border-[var(--color-accent-500)]/40 bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
            Enlace copiado
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" aria-hidden />
            Compartir el blog
            <Link2 className="w-3 h-3 opacity-60" aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}
