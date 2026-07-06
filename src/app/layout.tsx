import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLinks from '@/components/ui/SkipLinks';
import { ToastProvider } from '@/components/ui/Toast';
import { GAProvider } from '@/components/analytics/GAProvider';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';

// Dos familias: Geist Sans (UI/body/headings) + Geist Mono (números
// protagonistas: UF hoy, resultado destacado). Pesos mínimos para
// reducir payload de fuentes.
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500'],
});

const SITE_DESCRIPTION =
  'Calculadoras laborales, tributarias y financieras para Chile. Sueldo líquido, finiquito, UF, UTM, IVA, créditos hipotecarios y más. Gratis, precisas y actualizadas a 2026.';

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} - Calculadoras de Chile`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/site.webmanifest',
  title: {
    default: `${SITE_NAME} — Calculadoras de Sueldo, Finiquito y UF para Chile`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'calculadora chile',
    'calculadora sueldo líquido',
    'calculadora finiquito',
    'calculadora UF',
    'calculadora UTM',
    'calculadora IVA',
    'calculadora crédito hipotecario',
    'calculadora boleta de honorarios',
    'calculadora horas extra',
    'calculadora vacaciones proporcionales',
    'calculadora indemnización años de servicio',
    'calculadora gratificación legal',
    'calculadora reajuste arriendo',
    'calculadora permiso de circulación',
    'AFP Chile',
    'FONASA Isapre',
    'descuentos legales sueldo',
    'impuesto segunda categoría',
    'tope imponible UF',
    'Código del Trabajo',
    'SII',
    'Dirección del Trabajo',
    'pesos chilenos CLP',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  // Hreflang explícito apuntando a la versión es-CL. Aunque el sitio
  // sólo tiene un idioma, declararlo permite a Google asociar el
  // contenido al país y mejora el targeting geográfico para Chile.
  alternates: {
    canonical: '/',
    languages: {
      'es-CL': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  // Meta geo (region/placename/ICBM): no son señales primarias de
  // ranking pero sí señales de contexto que algunos crawlers usan
  // (Bing, DuckDuckGo, agregadores locales) para SEO local.
  // Coordenadas del centro de Santiago (-33.45, -70.66).
  other: {
    'geo.region': 'CL',
    'geo.placename': 'Chile',
    'geo.position': '-33.45;-70.66',
    'ICBM': '-33.45, -70.66',
    ...(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID &&
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID !== 'ca-pub-XXXXXXX'
      ? { 'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID }
      : {}),
  },
  icons: {
    // Set único generado para CalculaChile. No usamos más variantes
    // light/dark: el favicon nuevo ya viene con su propio fondo.
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Calculadoras de Chile`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Calculadoras de Chile`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#faf8f3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const adsenseEnabled = adsenseId && adsenseId !== 'ca-pub-XXXXXXX';

  return (
    <html lang="es-CL" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/*
          OpenSearch — permite que el usuario añada CalculaChile a la
          barra de búsqueda del navegador (Firefox, Chromium-based,
          Safari mobile). El navegador descubre el descriptor desde
          este `<link>` y ofrece "Buscar en CalculaChile" en el menú
          contextual de la barra de direcciones.
        */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title={SITE_NAME}
          href="/opensearch.xml"
        />
        {/*
          RSS feed del blog. Los clientes RSS y los lectores tipo
          Feedly descubren la URL automáticamente desde este
          `<link rel="alternate">`. También Google News usa esto
          como pista de feed de publicación.
        */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} - Blog`}
          href="/blog/feed.xml"
        />
        {adsenseEnabled && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        {/*
          Schemas globales: Organization + WebSite con SearchAction.
          Se inyectan en el body (no head) para no competir con los
          scripts de head (OpenSearch, RSS, AdSense).
        */}
        <JsonLd id="root-org" data={organizationSchema()} />
        <JsonLd id="root-site" data={websiteSchema()} />

        <SkipLinks />
        <ToastProvider>
          <GAProvider>
            <Header />
            <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </GAProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
