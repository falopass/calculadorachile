import type { Config } from 'tailwindcss';

/**
 * Tailwind detecte clases por escaneo estático del código fuente.
 *
 * Nota sobre dark mode: el sitio ya no tiene dark mode (rediseño 2026).
 * Mantenemos `darkMode: 'class'` a propósito: como nada agrega la clase
 * `.dark` al <html>, las variantes `dark:` residuales (en calculadoras
 * y blog, fuera del scope de esta pasada) quedan inertes en lugar de
 * activarse por `prefers-color-scheme`. Es la opción más segura para
 * una migración incremental sin reescribir todas las clases `dark:`.
 */
export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        // heading queda como alias a Geist Sans para compatibilidad
        // con componentes que aún usan `font-heading`.
        heading: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '2rem',
        '3xl': '2.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
