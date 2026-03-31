import Link from 'next/link';
import { 
  Calculator, 
  Heart, 
  ExternalLink,
  Mail,
  Globe,
  Shield,
  Scale,
  FileText,
  BookOpen,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

/**
 * Footer - Pie de página moderno con diseño premium
 * 
 * Incluye:
 * - Logo y descripción
 * - Links organizados por categoría
 * - Información legal
 * - Efectos visuales modernos
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    calculadoras: [
      { href: '/calculadoras/sueldo-liquido', label: 'Sueldo Líquido' },
      { href: '/calculadoras/finiquito', label: 'Finiquito' },
      { href: '/calculadoras/uf-clp', label: 'Conversor UF' },
      { href: '/calculadoras/iva', label: 'IVA' },
      { href: '/calculadoras/horas-extra', label: 'Horas Extra' },
      { href: '/calculadoras/vacaciones', label: 'Vacaciones' },
    ],
    recursos: [
      { href: '/blog', label: 'Blog', icon: BookOpen },
      { href: '/guias', label: 'Guías', icon: BookOpen },
      { href: '/faq', label: 'Preguntas Frecuentes', icon: HelpCircle },
      { href: '/contacto', label: 'Contacto', icon: MessageCircle },
    ],
    legales: [
      { href: '/privacidad', label: 'Política de Privacidad', icon: Shield },
      { href: '/terminos', label: 'Términos de Uso', icon: Scale },
      { href: '/cookies', label: 'Política de Cookies', icon: FileText },
    ],
  };

  return (
    <footer className="relative bg-[var(--background-secondary)] border-t border-[var(--border)]" role="contentinfo">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-[150px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent-500)] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      <div className="container-base relative">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-5" aria-label="CalculaChile - Inicio">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-gradient">Calcula</span>
                  <span className="text-[var(--foreground)]">Chile</span>
                </span>
              </div>
            </Link>
            
            <p className="text-[var(--foreground-secondary)] text-sm leading-relaxed mb-6 max-w-xs">
              Calculadoras laborales y financieras para trabajadores chilenos.
              Herramientas gratuitas, actualizadas y fáciles de usar.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://twitter.com/calculachile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Twitter"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/calculachile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/calculachile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://calculachile.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Calculadoras Column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[var(--color-primary-500)]" />
              Calculadoras
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.calculadoras.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--color-primary-500)] transition-colors text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-primary-500)] group-hover:w-full transition-all duration-200" />
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos Column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--color-primary-500)]" />
              Recursos
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--color-primary-500)] transition-colors text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-primary-500)] group-hover:w-full transition-all duration-200" />
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--color-primary-500)]" />
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legales.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--color-primary-500)] transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-primary-500)] group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <p className="text-sm font-medium text-[var(--foreground)] mb-1.5">
                ¿Actualizaciones?
              </p>
              <p className="text-xs text-[var(--foreground-muted)] mb-3">
                Recibe avisos cuando actualicemos valores o agreguemos nuevas calculadoras.
              </p>
              <Link
                href="/newsletter"
                className="btn-secondary text-xs w-full justify-center"
              >
                <Mail className="w-3.5 h-3.5" />
                Suscribirse
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--foreground-muted)] text-center sm:text-left">
              © {currentYear} CalculaChile.cl — Todos los derechos reservados
            </p>
            
            <div className="flex items-center gap-1.5 text-sm text-[var(--foreground-muted)]">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-[var(--color-error-500)] fill-current animate-pulse-soft" />
              <span>en Chile 🇨🇱</span>
            </div>

            <p className="text-xs text-[var(--foreground-muted)] text-center sm:text-right max-w-md">
              Los valores mostrados son referenciales. Consulta con un profesional para decisiones financieras.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Iconos SVG personalizados para redes sociales
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
