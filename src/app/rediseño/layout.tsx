import { Metadata } from 'next';
import { Syne, DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rediseño Cinematográfico | CalculaChile',
  description: 'Versión experimental del rediseño cinematográfico de CalculaChile',
};

export default function RediseñoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      className={`${syne.variable} ${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased font-body bg-[#0F172A] text-white">
        {children}
      </body>
    </html>
  );
}