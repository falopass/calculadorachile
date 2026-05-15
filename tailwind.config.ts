import type { Config } from 'tailwindcss';

const colorTokens = [
  'emerald',
  'blue',
  'purple',
  'cyan',
  'pink',
  'orange',
  'rose',
  'slate',
  'amber',
  'indigo',
  'teal',
  'lime',
];

/**
 * Tailwind detecta clases por escaneo estático del código fuente.
 * Como las clases por categoría se construyen en strings completos
 * dentro de archivos .tsx (`bg-emerald-100 text-emerald-600 ...`),
 * el JIT debería detectarlas. Aún así dejamos un safelist mínimo
 * por seguridad para evitar regresiones invisibles si alguien
 * refactoriza esos strings.
 */
const safelist = colorTokens.flatMap((c) => [
  `text-${c}-600`,
  `dark:text-${c}-400`,
  `dark:text-${c}-300`,
  `bg-${c}-100`,
  `dark:bg-${c}-500/15`,
]);

export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist,
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
