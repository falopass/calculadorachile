import type { Metadata, Viewport } from "next";
import { Inter, Syne, DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { ValuesProvider } from "@/lib/context/ValuesContext";
import { GAProvider } from '@/components/analytics/GAProvider';

// Fuentes para el rediseño cinematográfico
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"]
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculadorachile.cl'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "CalculaChile - Calculadoras Laborales para Chile",
    template: "%s | CalculaChile",
  },
  description: "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.",
  keywords: ["calculadora chile", "sueldo líquido", "finiquito", "UF", "IVA", "UTM", "impuestos chile"],
  authors: [{ name: "CalculaChile" }],
  creator: "CalculaChile",
  publisher: "CalculaChile",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXX',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "CalculaChile",
    title: "CalculaChile - Calculadoras Laborales para Chile",
    description: "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculaChile - Calculadoras Financieras de Chile' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculaChile - Calculadoras Laborales para Chile",
    description: "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculaChile - Calculadoras Financieras de Chile' }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} ${dmSans.variable} ${playfair.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID !== 'ca-pub-XXXXXXX' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col font-body bg-[#0F172A] text-white overflow-x-hidden">
        <ValuesProvider>
          <ToastProvider>
            <GAProvider>
              <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
                {children}
              </main>
            </GAProvider>
          </ToastProvider>
        </ValuesProvider>
      </body>
    </html>
  );
}
