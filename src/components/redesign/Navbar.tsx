'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const navLinks = [
  { href: '/calculadoras', label: 'Calculadoras', icon: Calculator },
  { href: '/calculadoras#todas', label: 'Todas', icon: Calculator },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Ir a la página de inicio">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#DC2626] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white font-heading">Calculadoras</span>
              <span className="text-white/60 font-drama italic ml-2">Chile.</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/nav relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white transition-all duration-200"
              >
                <link.icon className="w-4 h-4 transition-transform duration-200 group-hover/nav:scale-110" />
                {link.label}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover/nav:bg-white/5 transition-colors duration-200" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/calculadoras"
              className="ml-4 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] hover:from-[#1E3A8A] hover:to-[#B91C1C] shadow-lg shadow-[#1E3A8A]/20 hover:shadow-xl hover:shadow-[#1E3A8A]/30 transition-all duration-300 hover:scale-105"
            >
              Calcular
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}