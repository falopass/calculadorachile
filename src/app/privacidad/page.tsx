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
  path: '/privacidad',
  title: 'Política de privacidad',
  description:
    'Política de privacidad de CalculaChile. Tus datos están seguros: los cálculos ocurren en tu navegador y cumplimos con la Ley 19.628 de Chile.',
});

export default function PrivacidadPage() {
  const url = absoluteUrl('/privacidad');
  // Schema.org no tiene "PrivacyPolicy" como tipo top-level. Usamos
  // WebPage genérico, que es la práctica recomendada de Google para
  // páginas legales.
  const schemas = [
    webPageSchema({
      url,
      name: `Política de Privacidad de ${SITE_NAME}`,
      description:
        'Cómo CalculaChile recopila, usa y protege tu información personal según la Ley 19.628.',
      datePublished: '2026-01-01',
      dateModified: '2026-03-31',
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Política de privacidad' },
    ]),
  ];

  return (
    <>
      <JsonLd id="privacy-schemas" data={schemas} />
      <LegalPageLayout
        title="Política de Privacidad"
        description="Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información personal."
        lastUpdated="31 de Marzo de 2026"
      >
        <h2>1. Introducción</h2>
        <p>
          {SITE_NAME} ({SITE_URL.replace(/^https?:\/\//, '')}) es un sitio web
          que proporciona herramientas de cálculo financiero y laboral para
          trabajadores chilenos. Nos comprometemos a proteger tu privacidad de
          acuerdo con la <strong>Ley 19.628 sobre Protección de la Vida Privada</strong>{' '}
          de Chile.
        </p>

        <h2>2. Datos que Recopilamos</h2>
        <p>
          CalculaChile opera principalmente <strong>sin recopilar datos personales</strong>.
          Específicamente:
        </p>
        <ul>
          <li>
            <strong>Calculadoras:</strong> Todos los cálculos se realizan
            localmente en tu navegador. No enviamos tus datos a ningún servidor.
          </li>
          <li>
            <strong>Historial local:</strong> Si usas la función de historial,
            los datos se guardan exclusivamente en tu dispositivo (localStorage).
          </li>
          <li>
            <strong>Cookies:</strong> Usamos cookies esenciales para el
            funcionamiento del sitio (preferencia de tema) y cookies de terceros
            para análisis y publicidad (Google Analytics, Google AdSense).
          </li>
          <li>
            <strong>Analytics:</strong> Recopilamos datos anónimos de uso
            (páginas visitadas, tiempo en sitio) a través de Google Analytics.
          </li>
        </ul>

        <h2>3. Uso de la Información</h2>
        <p>La información que se recopila se utiliza exclusivamente para:</p>
        <ul>
          <li>Mejorar la experiencia de usuario del sitio.</li>
          <li>Analizar tendencias de uso para optimizar nuestras herramientas.</li>
          <li>Mostrar publicidad relevante a través de Google AdSense.</li>
        </ul>

        <h2>4. Cookies de Terceros</h2>
        <p>Utilizamos servicios de terceros que pueden instalar cookies:</p>
        <ul>
          <li>
            <strong>Google AdSense:</strong> Muestra anuncios personalizados.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de privacidad de Google
            </a>
          </li>
          <li>
            <strong>Google Analytics:</strong> Analiza el tráfico del sitio.{' '}
            <a
              href="https://support.google.com/analytics/answer/6004245"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo desactivar Google Analytics
            </a>
          </li>
        </ul>

        <h2>5. Tus Derechos (ARCO)</h2>
        <p>De acuerdo con la Ley 19.628, tienes derecho a:</p>
        <ul>
          <li>
            <strong>Acceso:</strong> Solicitar información sobre los datos
            personales que poseemos.
          </li>
          <li>
            <strong>Rectificación:</strong> Solicitar la corrección de datos
            inexactos.
          </li>
          <li>
            <strong>Cancelación:</strong> Solicitar la eliminación de tus datos.
          </li>
          <li>
            <strong>Oposición:</strong> Oponerte al tratamiento de tus datos
            para ciertos fines.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, contáctanos a <strong>{CONTACT_EMAIL}</strong>.
        </p>

        <h2>6. Seguridad</h2>
        <p>
          Implementamos medidas de seguridad técnicas para proteger la
          información. El sitio utiliza HTTPS y no almacenamos datos personales
          en nuestros servidores.
        </p>

        <h2>7. Cambios en esta Política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política. Cualquier
          cambio será publicado en esta página con la fecha de actualización
          correspondiente.
        </p>

        <h2>8. Contacto</h2>
        <p>Si tienes dudas sobre esta política de privacidad, contáctanos:</p>
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
