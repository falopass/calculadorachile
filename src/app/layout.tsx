import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLinks from '@/components/ui/SkipLinks';
import { ToastProvider } from '@/components/ui/Toast';
import { GAProvider } from '@/components/analytics/GAProvider';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';

// Solo dos familias: Inter (UI/body) + Syne (display/headings).
// Pesos mínimos para reducir payload de fuentes ~70%.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['600', '700'],
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
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Anti-FOUC: aplica el tema antes de la primera pintura.
// Lee la preferencia explícita del usuario (localStorage) o, si está
// en 'system'/no hay valor, sigue al sistema operativo (prefers-color-scheme).
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var pref = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
    var sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = pref === 'dark' || (pref === 'system' && sysDark);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = pref;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const adsenseEnabled = adsenseId && adsenseId !== 'ca-pub-XXXXXXX';

  return (
    <html
      lang="es-CL"
      className={`${inter.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {adsenseEnabled && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        className="min-h-screen flex flex-col"
      >
        {/*
          Schemas globales: Organization + WebSite con SearchAction.
          Se inyectan en el body (no head) porque <script type="application/ld+json">
          es válido en cualquier parte del documento, y así no compite
          con el theme-init synchronous script en el head.
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
