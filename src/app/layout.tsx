import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { ValuesProvider } from "@/lib/context/ValuesContext";

// Fuente Inter optimizada
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "CalculaChile",
    title: "CalculaChile - Calculadoras Laborales para Chile",
    description: "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculaChile - Calculadoras Laborales para Chile",
    description: "Calculadoras de sueldo líquido, finiquito, UF, IVA y más. Herramientas gratuitas para trabajadores chilenos.",
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
    <html lang="es" className={inter.variable} suppressHydrationWarning>
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
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ValuesProvider>
          <ToastProvider>
            <Header />
            <main id="main-content" className="flex-grow pt-16 md:pt-20" role="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </ValuesProvider>
      </body>
    </html>
  );
}
