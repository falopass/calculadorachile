import type { NextConfig } from 'next';

/**
 * Headers de seguridad estándar.
 *
 * Notas:
 * - No agregamos CSP estricta porque el sitio carga AdSense, GA y fuentes
 *   de Google. Una CSP requeriría una lista cuidadosa de orígenes.
 * - X-Frame-Options=DENY previene clickjacking.
 * - Strict-Transport-Security activa HSTS (Vercel ya lo hace, pero
 *   redundante no hace daño y es útil en otros hostings).
 */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sólo añadir orígenes externos cuando se usen explícitamente.
    // El proyecto actualmente sólo sirve imágenes locales desde /public.
    remotePatterns: [],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
