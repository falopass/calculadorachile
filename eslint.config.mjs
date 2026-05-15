// ESLint 9 flat config para Next.js 15.
// Usamos FlatCompat para reutilizar las presets clásicas de Next y a11y.

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsx-a11y/recommended',
  ),
  {
    rules: {
      // a11y: warnings, no errores (no queremos romper builds por estos)
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',

      // Limpieza progresiva: warnings, no errores
      'react/no-unescaped-entities': 'warn',
      'prefer-const': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // Permitir _ como prefijo para variables intencionalmente sin usar
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'next-env.d.ts',
      'coverage/**',
      'scripts/**',
    ],
  },
];

export default config;
