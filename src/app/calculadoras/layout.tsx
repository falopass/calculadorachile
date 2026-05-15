import type { ReactNode } from 'react';
import { ValuesProvider } from '@/lib/context/ValuesContext';

/**
 * Layout para todas las páginas bajo /calculadoras.
 *
 * Sólo expone el ValuesProvider (UF/UTM/dólar en vivo) a las páginas
 * que realmente lo necesitan. Esto evita peticiones innecesarias
 * a /api/values desde rutas como blog, legales o FAQ.
 *
 * No agrega chrome (Header/Footer) — cada página decide cuál usar.
 */
export default function CalculadorasLayout({ children }: { children: ReactNode }) {
  return <ValuesProvider>{children}</ValuesProvider>;
}
