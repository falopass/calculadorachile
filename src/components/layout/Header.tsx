'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Calculator, Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const navLinks = [
  { href: '/calculadoras', label: 'Calculadoras' },
  { href: '/blog', label: 'Blog' },
  { href: '/guias', label: 'Guías' },
  { href: '/faq', label: 'FAQ' },
];

const THEME_STORAGE_KEY = 'theme';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {}
  return 'system';
}

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const sysDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const wantDark = t === 'dark' || (t === 'system' && sysDark);
  root.classList.toggle('dark', wantDark);
  root.dataset.theme = t;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, t);
  } catch {}
}

function ThemeToggle() {
  // Usamos `null` durante el primer render para evitar mismatches de
  // hidratación. El icono se renderiza recién cuando leemos el storage
  // en el cliente.
  const [theme, setTheme] = useState<Theme | null>(null);
  const [open, setOpen] = useState(false);

  // Carga inicial: lee preferencia guardada y la aplica.
  useEffect(() => {
    const initial = readStoredTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Escuchar cambios del sistema operativo SOLO cuando estamos en 'system'.
  // Sin esto, si el usuario cambia su SO de light a dark, la página queda
  // pegada en lo que tenía al cargar.
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    // Compatibilidad: Safari < 14 sólo soporta addListener.
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, [theme]);

  // Sincroniza entre pestañas (cambio de tema en otra pestaña → propaga aquí).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY || !e.newValue) return;
      if (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system') {
        setTheme(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Cerrar al click fuera.
  useEffect(() => {
    if (!open) return;
    const h = () => setOpen(false);
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, [open]);

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Cambiar tema"
        aria-expanded={open}
        // suppressHydrationWarning porque el icono concreto se decide en el cliente.
        suppressHydrationWarning
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
      >
        <Icon className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] shadow-lg overflow-hidden"
        >
          {(
            [
              { value: 'light', label: 'Claro', icon: Sun },
              { value: 'dark', label: 'Oscuro', icon: Moon },
              { value: 'system', label: 'Sistema', icon: Monitor },
            ] as { value: Theme; label: string; icon: typeof Sun }[]
          ).map((opt) => (
            <button
              key={opt.value}
              role="menuitemradio"
              aria-checked={theme === opt.value}
              onClick={() => {
                setTheme(opt.value);
                applyTheme(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                theme === opt.value
                  ? 'text-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--background-secondary)]'
              }`}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--surface-overlay)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-base flex h-16 items-center justify-between" aria-label="Navegación principal">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="CalculaChile - Inicio"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white shadow-sm transition-transform group-hover:scale-105">
            <Calculator className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-base font-bold tracking-tight">
            <span className="text-[var(--foreground)]">Calcula</span>
            <span className="text-gradient">Chile</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link href="/calculadoras" className="hidden sm:inline-flex btn-primary">
            Calcular ahora
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--foreground-secondary)] hover:bg-[var(--background-secondary)] transition-colors"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]">
          <ul className="container-base py-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/calculadoras"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Calcular ahora
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
