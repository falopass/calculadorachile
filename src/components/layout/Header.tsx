'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Search,
  ChevronRight,
  LayoutGrid,
  BookOpen,
  GraduationCap,
  HelpCircle,
} from 'lucide-react';

import SiteSearch from '@/components/search/SiteSearch';

const navLinks = [
  { href: '/calculadoras', label: 'Calculadoras', icon: LayoutGrid },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/guias', label: 'Guías', icon: GraduationCap },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const isTyping =
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.isContentEditable);
      if (!isTyping && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      role="banner"
    >
      <nav
        className="container-base flex h-16 items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo — no tocar */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="CalculaChile - Inicio"
        >
          <img
            src="/logo-calculator-icon.png"
            alt=""
            width={40}
            height={40}
            loading="eager"
            draggable={false}
            className="h-10 w-10 rounded-lg transition-transform group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="inline-flex items-baseline whitespace-nowrap font-heading text-[22px] font-bold leading-none tracking-tight transition-transform group-hover:scale-105"
          >
            <span className="text-[var(--foreground)]">Calculadora</span>
            <span className="text-[var(--color-primary-500)]">Chile</span>
          </span>
        </Link>

        {/* Desktop nav — barra de tabs con iconos */}
        <ul className="hidden md:flex items-center gap-1 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] p-1.5 shadow-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200 ${
                    active
                      ? 'bg-[var(--accent)] text-white shadow-sm'
                      : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      active ? 'text-white' : ''
                    }`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Buscador como mini barra */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar en el sitio"
            className="group inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] hover:shadow-sm transition-all duration-200"
          >
            <Search className="h-4 w-4 transition-colors group-hover:text-[var(--accent)]" />
            <span className="hidden sm:inline text-sm font-medium text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)] transition-colors">
              Buscar…
            </span>
            <kbd
              aria-hidden
              className="hidden md:inline-flex items-center justify-center min-w-[24px] h-5 px-1.5 text-[11px] font-mono font-medium rounded-md border border-[var(--border-strong)] text-[var(--foreground-muted)] bg-[var(--surface-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors"
            >
              /
            </kbd>
          </button>

          {/* Botón menú mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all duration-200"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Overlay de búsqueda */}
      {searchOpen && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en el sitio"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SiteSearch
              variant="overlay"
              // eslint-disable-next-line jsx-a11y/no-autofocus -- intencional: foco automático al abrir el overlay es la UX esperada (Cmd+K, "/").
              autoFocus
              maxResults={20}
            />
            <p className="mt-3 text-center text-xs text-[var(--foreground-muted)]">
              Esc para cerrar · Enter para ver todos los resultados
            </p>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 z-30 bg-[var(--surface)]">
          <nav
            className="container-base pt-6 pb-8"
            aria-label="Navegación mobile"
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <li
                    key={link.href}
                    style={{
                      animation: `slide-in-right 0.25s ease-out ${i * 45}ms both`,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-[var(--accent)] text-white shadow-sm'
                          : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          active ? 'text-white' : 'text-[var(--foreground-muted)]'
                        }`}
                      />
                      {link.label}
                      <ChevronRight
                        className={`ml-auto h-5 w-5 transition-transform ${
                          active ? 'text-white' : 'text-[var(--foreground-muted)]'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setTimeout(() => setSearchOpen(true), 100);
              }}
              className="mt-6 w-full flex items-center gap-3 px-4 py-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all duration-200"
            >
              <Search className="h-5 w-5" />
              <span className="text-base font-medium">Buscar</span>
            </button>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
