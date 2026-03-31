'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Calculator,
  Sun,
  Moon,
  Sparkles,
  Monitor,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio', icon: Sparkles },
  { href: '/#calculadoras', label: 'Calculadoras', icon: Calculator },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isThemeMenuOpen) return;
    const handleClick = () => setIsThemeMenuOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isThemeMenuOpen]);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8" aria-label="Navegación principal">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ir a la página de inicio">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center shadow-md shadow-[var(--color-primary-500)]/20 group-hover:shadow-[var(--color-primary-500)]/40 transition-shadow"
            >
              <Calculator className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">
                <span className="text-gradient">Calcula</span>
                <span className="text-[var(--foreground)]">Chile</span>
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)] leading-none mt-0.5 hidden sm:block">
                Calculadoras para Chile
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--background-secondary)]/60 backdrop-blur-sm rounded-xl p-1 border border-[var(--border)]/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/nav relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all duration-200"
              >
                <link.icon className="w-4 h-4 transition-transform duration-200 group-hover/nav:scale-110" />
                {link.label}
                <span className="absolute inset-0 rounded-lg bg-[var(--color-primary-500)]/0 group-hover/nav:bg-[var(--color-primary-500)]/5 transition-colors duration-200" />
              </Link>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="relative p-2.5 rounded-xl bg-[var(--background-secondary)]/60 backdrop-blur-sm border border-[var(--border)]/50 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-all duration-300 overflow-hidden"
                aria-label="Cambiar tema"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-[18px] h-[18px]" />
                    </motion.div>
                  ) : theme === 'light' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-[18px] h-[18px]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="system"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Monitor className="w-[18px] h-[18px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Theme Dropdown */}
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-40 py-1.5 rounded-xl bg-[var(--surface)]/95 backdrop-blur-xl shadow-xl shadow-black/10 border border-[var(--border)]"
                  >
                    {[
                      { value: 'light' as const, label: 'Claro', icon: Sun },
                      { value: 'dark' as const, label: 'Oscuro', icon: Moon },
                      { value: 'system' as const, label: 'Sistema', icon: Monitor },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleThemeChange(item.value)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2 text-sm transition-colors ${
                          theme === item.value
                            ? 'text-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                            : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)]'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        {theme === item.value && (
                          <motion.div
                            layoutId="theme-check"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#calculadoras"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] hover:from-[var(--color-primary-500)] hover:to-[var(--color-accent-500)] shadow-md shadow-[var(--color-primary-500)]/20 hover:shadow-lg hover:shadow-[var(--color-primary-500)]/30 transition-all duration-300"
              >
                <Calculator className="w-4 h-4" />
                Calcular
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="md:hidden p-2.5 rounded-xl bg-[var(--background-secondary)]/60 backdrop-blur-sm border border-[var(--border)]/50 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Navigation ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-[var(--border)]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-3 px-4">
                  <Link
                    href="/#calculadoras"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calculator className="w-5 h-5" />
                    Ver Calculadoras
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
