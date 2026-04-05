'use client';

import Navbar from '@/components/redesign/Navbar';
import HeroSection from '@/components/redesign/HeroSection';
import FeaturesDashboard from '@/components/redesign/FeaturesDashboard';
import ManifestoSection from '@/components/redesign/ManifestoSection';
import CategoryStickyStack from '@/components/redesign/CategoryStickyStack';
import CinematicFooter from '@/components/redesign/CinematicFooter';

export default function RediseñoPage() {
  return (
    <div className="min-h-screen text-white noise-overlay">
      <Navbar />
      <HeroSection />
      <FeaturesDashboard />
      <ManifestoSection />
      <CategoryStickyStack />
      <CinematicFooter />
    </div>
  );
}