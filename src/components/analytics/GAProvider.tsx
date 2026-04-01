'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { initGA, pageview } from '@/lib/analytics';

export function GAProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (gaId) {
      initGA(gaId);
    }
  }, [gaId]);

  useEffect(() => {
    if (gaId && pathname) {
      const url = pathname + (searchParams?.toString() || '');
      pageview(url);
    }
  }, [pathname, searchParams, gaId]);

  return <>{children}</>;
}