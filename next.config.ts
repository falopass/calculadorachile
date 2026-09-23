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

  async redirects() {
    return [
      {
        source: '/blog/tope-imponible-89-9-uf-explicado',
        destination: '/blog/tope-imponible-2026',
        permanent: true,
      },
      {
        source: '/blog/guia-horas-extra-chile',
        destination: '/blog/horas-extra-jornada-42-horas-chile-2026',
        permanent: true,
      },
      {
        source: '/blog/vacaciones-proporcionales-guia',
        destination: '/calculadoras/calculadora-vacaciones-proporcionales',
        permanent: true,
      },
      {
        source: '/blog/como-calcular-finiquito-chile',
        destination: '/guias/finiquito-laboral-chile',
        permanent: true,
      },
      {
        source: '/blog/boleta-honorarios-completo',
        destination: '/guias/iva-boleta-honorarios-chile',
        permanent: true,
      },
      {
        source: '/blog/guia-iva-chile-2026',
        destination: '/calculadoras/calculadora-iva',
        permanent: true,
      },
      // URLs antiguas sin prefijo "calculadora-" (verificadas 404 el 2026-09-23).
      {
        source: '/calculadoras/patente-comercial',
        destination: '/calculadoras/calculadora-patente-comercial',
        permanent: true,
      },
      {
        source: '/calculadoras/patente-comercial-municipal',
        destination: '/calculadoras/calculadora-patente-comercial',
        permanent: true,
      },
      {
        source: '/calculadoras/costo-notaria',
        destination: '/calculadoras/calculadora-costo-notaria',
        permanent: true,
      },
      {
        source: '/calculadoras/costo-costo-notaria',
        destination: '/calculadoras/calculadora-costo-notaria',
        permanent: true,
      },
      {
        source: '/calculadoras/sueldo-liquido',
        destination: '/calculadoras/calculadora-sueldo-liquido',
        permanent: true,
      },
      {
        source: '/calculadoras/credito-automotriz',
        destination: '/calculadoras/calculadora-credito-automotriz',
        permanent: true,
      },
      {
        source: '/calculadoras/costo-empleado-pyme',
        destination: '/calculadoras/calculadora-costo-empleado-pyme',
        permanent: true,
      },
      // Renombres de artículos (verificados 404 el 2026-09-23).
      {
        source: '/blog/aguinaldo-fiestas-patrias-pensionados-sector-publico',
        destination: '/blog/aguinaldo-fiestas-patrias-2026-pensionados-sector-publico',
        permanent: true,
      },
      {
        source: '/blog/sueldo-2026-sueldo-minimo-liquido-calculo',
        destination: '/blog/sueldo-minimo-2026-calcular-liquido',
        permanent: true,
      },
      // Artículos consolidados en guías/calculadoras (contenido fusionado).
      {
        source: '/blog/diferencia-sueldo-bruto-liquido',
        destination: '/guias/sueldo-liquido-chile',
        permanent: true,
      },
      {
        source: '/blog/como-funciona-gratificacion-legal',
        destination: '/calculadoras/calculadora-gratificacion-legal',
        permanent: true,
      },
      {
        source: '/blog/calcular-indemnizacion-por-anos',
        destination: '/calculadoras/calculadora-indemnizacion-anos-servicio',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
