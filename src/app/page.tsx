import HomeHero from '@/components/home/HomeHero';
import HowItWorks from '@/components/home/HowItWorks';
import PopularCalculators from '@/components/home/PopularCalculators';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import HomeCTA from '@/components/home/HomeCTA';

/**
 * Página principal — Server Component.
 *
 * El SEO depende de que el HTML inicial tenga contenido. La home
 * compone secciones server-first; las únicas islas cliente son el
 * strip de valores en vivo (LiveValuesStrip) y el menú de tema.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PopularCalculators />
      <CategoriesGrid />
      <HowItWorks />
      <HomeCTA />
    </>
  );
}
