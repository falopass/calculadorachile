/**
 * Componentes creativos de vanguardia para CalculaChile
 * 
 * Estos componentes implementan:
 * - Animaciones avanzadas con GSAP y Framer Motion
 * - Efectos 3D con React Three Fiber
 * - Scroll suave con Lenis
 * - Cursor personalizado interactivo
 * - Layouts tipo Bento Grid
 * - Efectos de glassmorphism y noise
 */

import dynamic from 'next/dynamic';

export { default as CustomCursor } from './CustomCursor';
export { default as SmoothScroll } from './SmoothScroll';
export { default as BentoGrid, BentoGridMinimal } from './BentoGrid';
export { default as HeroSection } from './HeroSection';
export { default as FeaturesSection } from './FeaturesSection';

// Background3D con lazy loading ya que usa Three.js
export const Background3D = dynamic(
  () => import('./Background3D'),
  {
    ssr: false,
    loading: () => null,
  }
);
