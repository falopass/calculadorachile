import Link from 'next/link';
import { Calculator, Heart } from 'lucide-react';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site';

const footerLinks = {
  calculadoras: {
    title: 'Calculadoras',
    links: [
      { href: '/calculadoras/calculadora-sueldo-liquido', label: 'Sueldo Líquido' },
      { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito' },
      { href: '/calculadoras/calculadora-uf-clp', label: 'Conversor UF' },
      { href: '/calculadoras/calculadora-iva', label: 'IVA' },
      { href: '/calculadoras/calculadora-horas-extra', label: 'Horas Extra' },
      { href: '/calculadoras', label: 'Ver todas →' },
    ],
  },
  recursos: {
    title: 'Recursos',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/guias', label: 'Guías' },
      { href: '/faq', label: 'Preguntas frecuentes' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { href: '/privacidad', label: 'Privacidad' },
      { href: '/terminos', label: 'Términos' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
};

const social = [
  {
    href: 'https://twitter.com/calculachile',
    label: 'Twitter / X',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/falopass/calculadorachile',
    label: 'GitHub',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/company/calculachile',
    label: 'LinkedIn',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24 border-t border-[var(--border)] bg-[var(--background-secondary)]"
      role="contentinfo"
    >
      <div className="container-base py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group mb-4"
              aria-label={`${SITE_NAME} - Inicio`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white shadow-sm">
                <Calculator className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-base font-bold tracking-tight">
                <span className="text-[var(--foreground)]">Calcula</span>
                <span className="text-gradient">Chile</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed max-w-xs">
              Calculadoras laborales, tributarias y financieras para Chile. Gratis,
              precisas y actualizadas.
            </p>
            <div className="flex items-center gap-1.5 mt-5">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-8 w-8 place-items-center rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Calculadoras column */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              {footerLinks.calculadoras.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.calculadoras.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              {footerLinks.recursos.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.recursos.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              {footerLinks.legal.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              Contacto
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--foreground-muted)]">
            © {year} {SITE_NAME}. Hecho con{' '}
            <Heart className="inline h-3 w-3 text-[var(--color-error-500)] fill-current align-text-bottom" />{' '}
            en Chile.
          </p>
          <p className="text-xs text-[var(--foreground-muted)] text-center sm:text-right">
            Los valores son referenciales. Consulta con un profesional para decisiones formales.
          </p>
        </div>
      </div>
    </footer>
  );
}
