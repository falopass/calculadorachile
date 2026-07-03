// ============================================
// /acerca-de — Página Acerca de (E-E-A-T)
// ----------------------------------------------
// Indexable. Es la señal de autoría y transparencia que Google
// espera en sitios YMYL. Basada en el Entregable B del informe
// AdSense, con ajustes de contacto.
// ============================================

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import JsonLd from '@/components/seo/JsonLd';
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/acerca-de',
  title: 'Acerca de CalculaChile',
  description:
    'CalculaChile es un sitio independiente creado y mantenido por Diego Bravo, ingeniero de software en Curicó, Chile. Calculadoras transparentes y gratuitas basadas en fuentes oficiales.',
  ogType: 'profile',
});

export default function AcercaDePage() {
  const url = absoluteUrl('/acerca-de');
  const schemas = [
    organizationSchema(),
    webPageSchema({
      url,
      name: `Acerca de ${SITE_NAME}`,
      description:
        'Sitio independiente de calculadoras chilenas creado por Diego Bravo.',
      datePublished: '2026-07-02',
      dateModified: '2026-07-02',
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Acerca de' },
    ]),
  ];

  return (
    <>
      <JsonLd id="about-schemas" data={schemas} />
      <LegalPageLayout
        title="Acerca de CalculaChile"
        description="Sitio independiente de calculadoras chilenas basadas en fuentes públicas."
        lastUpdated="2 de Julio de 2026"
      >
        <p>
          CalculaChile es un sitio independiente creado y mantenido por{' '}
          <strong>Diego Bravo</strong>, ingeniero de software en Curicó, Chile.
          El objetivo del proyecto es convertir reglas públicas chilenas
          —tributarias, laborales, previsionales, habitacionales y de consumo—
          en calculadoras simples, transparentes y gratuitas.
        </p>

        <h2>Independencia editorial</h2>
        <p>
          El sitio no pertenece al Gobierno de Chile ni a instituciones como
          SII, Dirección del Trabajo, IPS, CMF, Banco Central, MINVU o SERNAC.
          Cada calculadora indica las fuentes oficiales consultadas y la fecha
          de actualización para que cualquier persona pueda verificar los datos.
        </p>

        <h2>Metodología</h2>
        <p>
          La metodología de cada herramienta es: identificar la norma o fuente
          oficial vigente, convertirla en fórmula, probar casos numéricos,
          documentar supuestos y publicar limitaciones. Cuando una materia
          requiere interpretación legal, tributaria o financiera personalizada,
          la página lo indica expresamente.
        </p>

        <h2>Responsable y contacto</h2>
        <ul>
          <li>
            <strong>Responsable del sitio:</strong> Diego Bravo.
          </li>
          <li>
            <strong>Contacto:</strong>{' '}
            <a href="mailto:ddiegosebastianbb@gmail.com">
              ddiegosebastianbb@gmail.com
            </a>{' '}
            o a través de la{' '}
            <a href="/equipo">página de equipo</a>.
          </li>
          <li>
            <strong>Repositorio público:</strong>{' '}
            <a
              href="https://github.com/falopass/calculadorachile"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/falopass/calculadorachile
            </a>
            .
          </li>
        </ul>
      </LegalPageLayout>
    </>
  );
}
