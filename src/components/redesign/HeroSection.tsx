'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MountainsSVG from './MountainsSVG';
import { gsap } from '@/lib/gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const calculaRef = useRef<HTMLDivElement>(null);
  const chileRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (calculaRef.current) {
        gsap.from(calculaRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out'
        });
      }

      if (chileRef.current) {
        gsap.from(chileRef.current, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out'
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.4
        });
      }

      if (ctaPrimaryRef.current) {
        gsap.from(ctaPrimaryRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.6
        });
      }

      if (ctaSecondaryRef.current) {
        gsap.from(ctaSecondaryRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.75
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-[#1E3A8A] to-[#0F172A]"
      aria-label="Sección principal - Calculadoras laborales para Chile"
    >
      {/* SVG de montañas chilenas - hidden on mobile to save space */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-2/3 overflow-hidden">
        <MountainsSVG />
      </div>

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/30 via-[#0F172A]/60 to-[#0F172A] pointer-events-none" />

      {/* Elementos decorativos flotantes - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 right-1/4 w-64 h-64 bg-[#DC2626]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden md:block absolute bottom-1/3 left-1/3 w-48 h-48 bg-[#1E3A8A]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Contenido del hero */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-4 sm:px-6 md:px-16 py-16 md:py-20">
        <div className="w-full max-w-full">
          {/* Badge superior */}
          <div
            ref={calculaRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm text-white/80 font-medium">Valores actualizados 2026</span>
          </div>

          <h1 className="mb-4 md:mb-6">
            <span
              className="block text-white font-heading tracking-tight"
              style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', lineHeight: '1.1' }}
            >
              Calculadoras
            </span>
            <span
              ref={chileRef}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#DC2626] font-drama italic mt-1"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 10rem)', lineHeight: '1.0' }}
            >
              Chile.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-white/80 text-sm sm:text-base md:text-lg mb-6 md:mb-10 max-w-2xl font-body"
          >
            50+ calculadoras laborales, tributarias y financieras. Gratis, precisas y actualizadas con los valores oficiales de Chile.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-16">
            <Link
              href="/calculadoras"
              ref={ctaPrimaryRef}
              className="px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] hover:from-[#1E3A8A] hover:to-[#B91C1C] shadow-lg shadow-[#1E3A8A]/30 hover:shadow-xl hover:shadow-[#1E3A8A]/40 transition-all duration-300 inline-block text-center"
            >
              Explorar calculadoras
            </Link>

            <Link
              href="/calculadoras"
              ref={ctaSecondaryRef}
              className="px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base md:text-lg border-2 border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-sm transition-all duration-300 inline-block text-center"
            >
              ¿Cómo funciona?
            </Link>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-mono">50+</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">Calculadoras</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-mono">100%</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">Gratis</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-mono">2026</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">Actualizado</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-mono">24/7</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">Disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs">Scroll</span>
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
