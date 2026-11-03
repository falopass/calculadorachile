'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { GA_MEASUREMENT_ID, analyticsBlocked, initGA, pageview } from '@/lib/analytics';

/**
 * Componente interno: trackea pageviews en cada cambio de ruta.
 *
 * Usa `useSearchParams` para detectar también cambios en query strings.
 * Como `useSearchParams` requiere Suspense boundary durante el SSR,
 * envolvemos el cuerpo en `<Suspense fallback={null}>` desde GAProvider.
 */
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = GA_MEASUREMENT_ID;

  // El bloqueo (?noads, cookie cc_noads, bots) se evalúa en cada ruta: si la
  // visita empezó en modo sin anuncios y luego deja de estarlo, GA se
  // inicializa recién ahí. initGA es idempotente.
  useEffect(() => {
    if (!gaId || !pathname || analyticsBlocked()) return;
    initGA(gaId);
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    pageview(url);
  }, [pathname, searchParams, gaId]);

  return null;
}

export function GAProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
