'use client';

import { usePathname } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { initGA, pageview } from '@/lib/analytics';

// Componente interno que usa useSearchParams (requiere Suspense)
function AnalyticsTracker() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (gaId) {
      initGA(gaId);
    }
  }, [gaId]);

  useEffect(() => {
    if (gaId && pathname) {
      // Usamos window.location.search en lugar de useSearchParams para evitar el Suspense
      const url = pathname + (typeof window !== 'undefined' ? window.location.search : '');
      pageview(url);
    }
  }, [pathname, gaId]);

  return null;
}

export function GAProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
      {children}
    </Suspense>
  );
}