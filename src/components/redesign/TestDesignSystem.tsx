'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function TestDesignSystem() {
  useEffect(() => {
    // Test de que GSAP está correctamente importado y registrado
    console.log('GSAP version:', gsap.version);
    console.log('ScrollTrigger registered:', ScrollTrigger);
  }, []);

  return (
    <div className="min-h-screen bg-offwhite text-charcoal">
      <div className="noise-overlay"></div>
      
      <div className="p-8">
        <h1 className="text-4xl font-heading font-bold text-chilean-blue mb-4">Test del Design System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-card p-6 shadow-lg">
            <h2 className="text-2xl font-heading text-chilean-blue mb-2">Colores Chilean</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-chilean-blue"></div>
                <span>Chilean Blue: #1E3A8A</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-chilean-red"></div>
                <span>Chilean Red: #DC2626</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-offwhite border"></div>
                <span>Off White: #F8FAFC</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-charcoal"></div>
                <span>Charcoal: #1E293B</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-card p-6 shadow-lg">
            <h2 className="text-2xl font-heading text-chilean-blue mb-2">Tipografías</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-heading text-xl">Fuente Heading (Syne)</h3>
                <p className="font-body">Fuente Body (DM Sans) - Texto normal y párrafos</p>
                <p className="font-drama italic">Fuente Drama (Playfair Display) - Énfasis y citas</p>
                <p className="font-mono numbers-mono">Fuente Mono (JetBrains) - Números y código</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-card p-6 shadow-lg">
            <h2 className="text-2xl font-heading text-chilean-blue mb-2">Radios</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chilean-blue rounded-lg flex items-center justify-center text-white">lg</div>
              <div className="w-12 h-12 bg-chilean-blue rounded-xl flex items-center justify-center text-white">xl</div>
              <div className="w-12 h-12 bg-chilean-blue rounded-card flex items-center justify-center text-white">2xl</div>
              <div className="w-12 h-12 bg-chilean-blue rounded-pill flex items-center justify-center text-white">pill</div>
              <div className="w-12 h-12 bg-chilean-blue rounded-3xl flex items-center justify-center text-white">3xl</div>
            </div>
          </div>
          
          <div className="bg-white rounded-card p-6 shadow-lg">
            <h2 className="text-2xl font-heading text-chilean-blue mb-2">Gradientes y Efectos</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-chilean text-white">Gradiente Chilean</div>
              <div className="p-4 rounded-lg chilean-gradient-text">Texto con Gradiente Chilean</div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">Glassmorphism</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-chilean-blue text-white rounded-card">
          <h3 className="text-xl font-heading mb-2">Test de GSAP</h3>
          <p>Este componente verifica que GSAP y ScrollTrigger estén correctamente registrados.</p>
          <p className="text-chilean-red mt-2">Si ves este texto, la integración es exitosa.</p>
        </div>
      </div>
    </div>
  );
}