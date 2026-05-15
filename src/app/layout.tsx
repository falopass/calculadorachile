import type { Metadata, Viewport } from "next";
import { Inter, Syne, DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SkipLinks from "@/components/ui/SkipLinks";
import { ToastProvider } from "@/components/ui/Toast";
import { GAProvider } from "@/components/analytics/GAProvider";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// ────────────────────────────────────────────────
// Fuentes (subsetting + reducción de pesos)
// ────────────────────────────────────────────────
// Solo cargamos los pesos efectivamente usados. Cada peso adicional
// añade ~25-40 KB a la primera renderización.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["500", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
  style: ["italic", "normal"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "600"],
});

const SITE_DESCRIPTION =
  "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.";

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} - Calculadoras Financieras de Chile`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: `${SITE_NAME} - Calculadoras Laborales para Chile`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "calculadora chile",
    "sueldo líquido",
    "finiquito",
    "UF",
    "IVA",
    "UTM",
    "impuestos chile",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID &&
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID !== "ca-pub-XXXXXXX"
    ? {
        other: {
          "google-adsense-account":
            process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID,
        },
      }
    : {}),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Calculadoras Laborales para Chile`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Calculadoras Laborales para Chile`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Script anti-FOUC: aplica el tema antes de la primera pintura.
// Se ejecuta sin React, leyendo localStorage o prefers-color-scheme.
const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const adsenseEnabled = adsenseId && adsenseId !== "ca-pub-XXXXXXX";

  return (
    <html
      lang="es"
      className={`${inter.variable} ${syne.variable} ${dmSans.variable} ${playfair.variable} ${jetbrains.variable}`}
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
      <body className="antialiased min-h-screen flex flex-col font-body bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
        <SkipLinks />
        <ToastProvider>
          <GAProvider>
            <main
              id="main-content"
              className="flex-grow"
              role="main"
              tabIndex={-1}
            >
              {children}
            </main>
          </GAProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
