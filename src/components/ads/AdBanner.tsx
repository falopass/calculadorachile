'use client';

import { useEffect } from 'react';

/**
 * Props del componente AdBanner
 *
 * @property slot - ID del slot de AdSense (data-ad-slot)
 * @property format - Formato del anuncio: auto, horizontal, vertical o rectangle
 * @property className - Clases CSS opcionales para estilizar el contenedor
 */
interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * AdBanner - Componente de banner publicitario de Google AdSense
 *
 * En produccion renderiza el tag <ins> de AdSense y ejecuta el push
 * para cargar el anuncio. En desarrollo muestra un placeholder gris
 * para no afectar el diseno ni generar impresiones falsas.
 */
export default function AdBanner({
  slot,
  format = 'auto',
  className = '',
}: AdBannerProps) {
  // Push de AdSense: se ejecuta solo en produccion y en el navegador
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error al cargar anuncio de AdSense:', error);
    }
  }, []);

  // En desarrollo mostramos un placeholder para maquetar
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`flex items-center justify-center rounded border-2 border-dashed border-[var(--border)] bg-[var(--background-secondary)] text-sm text-[var(--foreground-muted)] ${className}`}
        style={{ minHeight: '90px' }}
      >
        Espacio publicitario
      </div>
    );
  }

  // En produccion renderizamos el tag de AdSense
  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
