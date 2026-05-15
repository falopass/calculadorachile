'use client';

// ============================================
// ReadingProgress — barra fina de progreso de lectura
// ----------------------------------------------
// Barra horizontal sticky en el top del viewport que muestra qué
// porcentaje del artículo ha scrolleado el usuario. Sutil pero
// efectiva como feedback visual en artículos largos.
// ============================================

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = window.scrollY / docHeight;
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 z-40 pointer-events-none"
      style={{
        background: `linear-gradient(90deg, var(--color-primary-500) ${progress * 100}%, transparent ${progress * 100}%)`,
        transition: 'background 80ms linear',
      }}
    />
  );
}
