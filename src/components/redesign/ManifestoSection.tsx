'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function ManifestoSection() {
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = manifestoRef.current?.querySelectorAll('.manifesto-word') || [];
      
      gsap.from(words, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.05,
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={manifestoRef}
      className="py-24 md:py-32 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A]/20 to-[#0F172A] text-white relative overflow-hidden"
      aria-label="Sección de manifiesto de la plataforma"
    >
      {/* Fondo con patrón geométrico */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#1E3A8A]/30 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-[#DC2626]/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#059669]/30 rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto del manifiesto */}
          <div className="text-center lg:text-left">
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight tracking-tight">
              <div className="mb-4">
                {`CalculaChile te da una respuesta.`.split(' ').map((word, index) => (
                  <span
                    key={`manifesto-${index}`}
                    className="manifesto-word inline-block mx-1.5 text-white"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="text-[#DC2626] italic font-drama text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none">
                {`CalculaChile te explica el resultado.`.split(' ').map((word, index) => (
                  <span
                    key={`explanation-${index}`}
                    className="manifesto-word inline-block mx-1.5"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mt-8">
              No solo calculamos resultados, te explicamos cada paso del proceso con base en la legislación chilena.
            </p>
          </div>
          
          {/* Gráficos e iconos */}
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1: Transparencia */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#1E3A8A]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#312E81] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Transparencia</h3>
              <p className="text-white/60 text-sm">Fuentes oficiales y fórmulas explicadas</p>
            </div>
            
            {/* Card 2: Precisión */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#DC2626]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Precisión</h3>
              <p className="text-white/60 text-sm">Datos actualizados con valores oficiales</p>
            </div>
            
            {/* Card 3: Educación */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#059669]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Educación</h3>
              <p className="text-white/60 text-sm">Explicaciones claras del porqué de los cálculos</p>
            </div>
            
            {/* Card 4: Accesibilidad */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#0891B2]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891B2] to-[#0E7490] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Accesibilidad</h3>
              <p className="text-white/60 text-sm">Gratis, rápido y disponible para todos</p>
            </div>
          </div>
        </div>
        
        {/* Línea divisoria con iconos */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent"></div>
          <div className="mx-4 p-3 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#DC2626]">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" />
            </svg>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DC2626] to-transparent"></div>
        </div>
        
        {/* Frase adicional */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl text-white/80 font-drama italic max-w-4xl mx-auto">
            "La única calculadora que te explica cómo llegó al resultado"
          </p>
        </div>
      </div>
    </section>
  );
}