import Link from 'next/link';
import { Calculator, BookOpen, Layers, ArrowUpRight } from 'lucide-react';
import { SITE_NAME } from '@/lib/site';

const footerLinks = {
  calculadoras: {
    title: 'Calculadoras',
    icon: Calculator,
    links: [
      { href: '/calculadoras/calculadora-iva', label: 'IVA 19%' },
      { href: '/calculadoras/calculadora-credito-cae', label: 'Simulador CAE' },
      { href: '/calculadoras/calculadora-patente-comercial', label: 'Patente comercial' },
      { href: '/calculadoras/calculadora-sueldo-liquido', label: 'Sueldo líquido' },
      { href: '/calculadoras/calculadora-vacaciones-proporcionales', label: 'Vacaciones proporcionales' },
      { href: '/calculadoras/calculadora-permiso-circulacion', label: 'Permiso de circulación' },
      { href: '/calculadoras/calculadora-finiquito', label: 'Finiquito' },
    ],
    viewAll: { href: '/calculadoras', label: 'Ver las 39 calculadoras' },
  },
  guias: {
    title: 'Guías',
    icon: BookOpen,
    links: [
      { href: '/guias/sueldo-liquido-chile', label: 'Sueldo líquido en Chile' },
      { href: '/guias/finiquito-laboral-chile', label: 'Finiquito laboral paso a paso' },
      { href: '/guias/uf-utm-indicadores-chile', label: 'UF, UTM e IPC' },
      { href: '/guias/afp-pension-chile', label: 'AFP y pensión en Chile' },
      { href: '/guias/credito-hipotecario-chile', label: 'Crédito hipotecario' },
    ],
    viewAll: { href: '/guias', label: 'Ver todas las guías' },
  },
  recursos: {
    title: 'Recursos',
    icon: Layers,
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/categoria', label: 'Categorías' },
      { href: '/buscar', label: 'Buscar' },
      { href: '/faq', label: 'Preguntas frecuentes' },
      { href: '/acerca-de', label: 'Acerca de CalculaChile' },
    ],
  },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border)] bg-[var(--surface-muted)]"
    >
      <div className="container-base py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Columna 1 — Marca */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
              aria-label={`${SITE_NAME} - Inicio`}
            >
              <img
                src="/logo-calculator-icon.png"
                alt=""
                width={32}
                height={32}
                draggable={false}
                className="h-8 w-8 rounded-lg transition-transform group-hover:scale-105"
              />
              <span className="inline-flex items-baseline whitespace-nowrap font-heading text-[20px] font-bold leading-none tracking-tight">
                <span className="text-[var(--foreground)]">Calculadora</span>
                <span className="text-[var(--color-primary-500)]">Chile</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Calculadoras laborales, tributarias y financieras para Chile. Actualizadas a 2026.
            </p>
            <p className="mt-5 text-xs text-[var(--foreground-muted)]">
              © {year} {SITE_NAME} · Hecho en Chile
            </p>
          </div>

          {/* Columna 2 — Calculadoras */}
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterColumn
              title={footerLinks.calculadoras.title}
              icon={footerLinks.calculadoras.icon}
              links={footerLinks.calculadoras.links}
              viewAll={footerLinks.calculadoras.viewAll}
            />
          </div>

          {/* Columna 3 — Guías */}
          <div className="lg:col-span-2">
            <FooterColumn
              title={footerLinks.guias.title}
              icon={footerLinks.guias.icon}
              links={footerLinks.guias.links}
              viewAll={footerLinks.guias.viewAll}
            />
          </div>

          {/* Columna 4 — Recursos */}
          <div className="lg:col-span-2">
            <FooterColumn
              title={footerLinks.recursos.title}
              icon={footerLinks.recursos.icon}
              links={footerLinks.recursos.links}
            />
          </div>
        </div>
      </div>

      {/* Barra legal */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="container-base flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--foreground-muted)]">
            Los valores son referenciales. Consulta con un profesional para decisiones formales.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--foreground-muted)]">
            <Link
              href="/privacidad"
              className="transition-colors duration-150 hover:text-[var(--foreground-secondary)]"
            >
              Privacidad
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/terminos"
              className="transition-colors duration-150 hover:text-[var(--foreground-secondary)]"
            >
              Términos
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/cookies"
              className="transition-colors duration-150 hover:text-[var(--foreground-secondary)]"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  icon: Icon,
  links,
  viewAll,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: { href: string; label: string }[];
  viewAll?: { href: string; label: string };
}) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
        <Icon className="h-4 w-4 text-[var(--accent)]" />
        {title}
      </h2>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group/link inline-flex items-center gap-1.5 text-sm text-[var(--foreground-secondary)] transition-colors duration-150 hover:text-[var(--accent)]"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-0.5 translate-y-0.5 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0" />
            </Link>
          </li>
        ))}
        {viewAll && (
          <li>
            <Link
              href={viewAll.href}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
            >
              <span>{viewAll.label}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
