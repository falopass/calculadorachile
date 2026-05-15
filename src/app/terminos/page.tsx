import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import JsonLd from '@/components/seo/JsonLd';
import {
  webPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_URL, SITE_NAME, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/terminos',
  title: 'Términos de uso',
  description:
    'Términos y condiciones de uso de CalculaChile. Reglas para usar nuestras calculadoras gratuitas, limitación de responsabilidad y propiedad intelectual.',
});

export default function TerminosPage() {
  const url = absoluteUrl('/terminos');
  // Schema.org no tiene "TermsOfService" como tipo top-level usable
  // por sí mismo. Usamos WebPage genérico (Google lo respalda en
  // su guía de structured data para páginas de términos).
  const schemas = [
    webPageSchema({
      url,
      name: `Términos de Uso de ${SITE_NAME}`,
      description:
        'Términos y condiciones aplicables al uso del sitio CalculaChile y sus calculadoras.',
      datePublished: '2026-01-01',
      dateModified: '2026-03-31',
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
        description="Al acceder y usar CalculaChile, aceptas los siguientes términos y condiciones."
        lastUpdated="31 de Marzo de 2026"
      >
        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar el sitio web{' '}
          <strong>{SITE_URL.replace(/^https?:\/\//, '')}</strong> (en adelante,
          &quot;{SITE_NAME}&quot;), aceptas cumplir con estos Términos de Uso.
          Si no estás de acuerdo con alguno de estos términos, te pedimos que
          no utilices el sitio.
        </p>

        <h2>2. Descripción del Servicio</h2>
        <p>
          CalculaChile proporciona herramientas de cálculo financiero y laboral
          de uso gratuito. Las calculadoras incluyen, entre otras: sueldo
          líquido, finiquito, conversor UF, IVA, crédito hipotecario, y más.
        </p>
        <p>
          <strong>Importante:</strong> Los resultados proporcionados son{' '}
          <strong>estimaciones informativas</strong> basadas en fórmulas y
          valores oficiales. No constituyen asesoría legal, financiera ni
          tributaria.
        </p>

        <h2>3. Limitación de Responsabilidad</h2>
        <p>CalculaChile no se hace responsable por:</p>
        <ul>
          <li>Decisiones tomadas en base a los resultados de las calculadoras.</li>
          <li>Errores u omisiones en los cálculos debido a valores desactualizados.</li>
          <li>Daños directos o indirectos derivados del uso del sitio.</li>
        </ul>
        <p>
          Te recomendamos verificar los resultados con fuentes oficiales como la
          <a
            href="https://www.dt.gob.cl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Dirección del Trabajo
          </a>
          ,
          <a
            href="https://www.sii.cl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Servicio de Impuestos Internos
          </a>
          , u organismos competentes.
        </p>

        <h2>4. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de CalculaChile, incluyendo textos, gráficos,
          logotipos, código fuente y diseño, es propiedad de CalculaChile y
          está protegido por las leyes de propiedad intelectual de Chile. Queda
          prohibida su reproducción, distribución o modificación sin
          autorización previa por escrito.
        </p>

        <h2>5. Uso Aceptable</h2>
        <p>Te comprometes a usar CalculaChile de manera legal y ética. No está permitido:</p>
        <ul>
          <li>Utilizar el sitio para actividades fraudulentas o ilegales.</li>
          <li>Intentar acceder a sistemas o datos no autorizados.</li>
          <li>Interferir con el funcionamiento normal del sitio.</li>
          <li>Extraer contenido del sitio de forma automatizada sin permiso.</li>
        </ul>

        <h2>6. Servicios de Terceros</h2>
        <p>
          CalculaChile puede contener enlaces a sitios web de terceros (Google,
          AFP, Isapres, etc.). No nos hacemos responsables por el contenido ni
          las políticas de privacidad de estos sitios. Te recomendamos leer sus
          respectivos términos y políticas.
        </p>

        <h2>7. Plan Premium</h2>
        <p>
          CalculaChile puede ofrecer funcionalidades premium bajo suscripción.
          Los términos específicos del plan premium, incluyendo precio,
          funcionalidades y condiciones de cancelación, se detallan en la
          página correspondiente.
        </p>

        <h2>8. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Los cambios entrarán en vigor desde su publicación en el
          sitio. Te recomendamos revisar esta página periódicamente.
        </p>

        <h2>9. Ley Aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República de Chile.
          Cualquier controversia será sometida a los tribunales competentes de
          Santiago.
        </p>

        <h2>10. Contacto</h2>
        <p>Para consultas sobre estos términos:</p>
        <ul>
          <li>
            <strong>Email:</strong> {CONTACT_EMAIL}
          </li>
          <li>
            <strong>Sitio web:</strong> {SITE_URL}
          </li>
        </ul>
      </LegalPageLayout>
    </>
  );
}
