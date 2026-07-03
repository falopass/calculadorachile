// ============================================
// /terminos — Términos de uso
// ----------------------------------------------
// noindex, follow. Página legal utilitaria: debe existir y ser
// accesible pero no suma a la evaluación de contenido de AdSense.
//
// Basada en el Entregable D del informe AdSense.
// ============================================

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import JsonLd from '@/components/seo/JsonLd';
import {
  webPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/terminos',
  title: 'Términos de uso',
  description:
    'Términos y condiciones de uso de CalculaChile. Reglas para usar nuestras calculadoras gratuitas, limitación de responsabilidad y propiedad intelectual.',
  noIndex: true,
});

const CONTACTO_EMAIL = 'ddiegosebastianbb@gmail.com';

export default function TerminosPage() {
  const url = absoluteUrl('/terminos');
  const schemas = [
    webPageSchema({
      url,
      name: `Términos de Uso de ${SITE_NAME}`,
      description:
        'Términos y condiciones aplicables al uso del sitio CalculaChile y sus calculadoras.',
      datePublished: '2026-07-02',
      dateModified: '2026-07-02',
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Términos de uso' },
    ]),
  ];

  return (
    <>
      <JsonLd id="terms-schemas" data={schemas} />
      <LegalPageLayout
        title="Términos de Uso"
        description="Al usar CalculaChile aceptas estos términos. Si no estás de acuerdo, no utilices el sitio."
        lastUpdated="2 de Julio de 2026"
      >
        <p>
          Al usar CalculaChile aceptas estos términos. Si no estás de acuerdo,
          no utilices el sitio.
        </p>

        <h2>Naturaleza del servicio</h2>
        <p>
          CalculaChile ofrece calculadoras y guías informativas basadas en
          fuentes públicas chilenas. Los resultados son estimaciones
          referenciales y pueden variar por datos incompletos, cambios
          normativos, criterios administrativos, redondeos o situaciones
          particulares.
        </p>

        <h2>No asesoría profesional</h2>
        <p>
          El sitio no constituye asesoría legal, financiera, previsional,
          tributaria, contable ni laboral. Para decisiones formales, trámites,
          contratos, declaraciones, demandas, beneficios estatales o
          inversiones, debes verificar en la institución competente o
          consultar a un profesional calificado.
        </p>

        <h2>Fuentes y actualización</h2>
        <p>
          Cada calculadora debe indicar las fuentes consultadas y su fecha de
          actualización. Aunque se procura mantener información vigente, no se
          garantiza que todos los datos estén libres de errores o actualizados
          al minuto.
        </p>

        <h2>Uso permitido</h2>
        <p>
          Puedes usar el sitio para fines personales, educativos o
          informativos. No puedes intentar afectar su disponibilidad,
          automatizar consultas abusivas, explotar errores, copiar masivamente
          contenido o presentar resultados como certificación oficial.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          El diseño, textos, estructura, código y contenidos pertenecen a sus
          autores o se usan conforme a licencias aplicables. Las fuentes
          oficiales citadas pertenecen a sus instituciones respectivas.
        </p>

        <h2>Publicidad y afiliación</h2>
        <p>
          El sitio puede mostrar anuncios o enlaces de afiliados. La existencia
          de publicidad no altera la independencia editorial de las
          calculadoras. Cuando exista una relación comercial relevante, se
          informará de forma visible.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          CalculaChile no se hace responsable por decisiones tomadas
          exclusivamente con base en resultados del sitio. La responsabilidad
          máxima, si la ley lo permite, se limita a corregir o retirar
          información inexacta una vez conocida.
        </p>

        <h2>Contacto</h2>
        <p>
          Para reportar errores, solicitar correcciones o enviar consultas,
          escribe a{' '}
          <a href={`mailto:${CONTACTO_EMAIL}`}>{CONTACTO_EMAIL}</a>.
        </p>

        <h2>Cambios</h2>
        <p>
          Los términos pueden modificarse por razones legales, técnicas o
          editoriales. La versión vigente será la publicada en esta URL.
        </p>
      </LegalPageLayout>
    </>
  );
}
