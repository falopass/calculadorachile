'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { initGA, pageview } from '@/lib/analytics';

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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (gaId) initGA(gaId);
  }, [gaId]);

  useEffect(() => {
    if (!gaId || !pathname) return;
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
