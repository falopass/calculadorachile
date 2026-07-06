// ============================================
// /privacidad — Política de privacidad
// ----------------------------------------------
// noindex, follow. Página legal utilitaria.
// Basada en la Ley 21.719 (vigente diciembre 2026).
// ============================================

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import {
  LegalSection,
  LegalCard,
  LegalList,
  EmailLink,
  ExternalLegalLink,
  InternalLink,
  AlertCircle,
} from '@/components/layout/LegalComponents';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME, CONTACT_EMAIL } from '@/lib/site';
import {
  User,
  Database,
  Calculator,
  Target,
  Cookie,
  Scale,
  Users,
  Globe,
  Clock,
  KeyRound,
  Lock,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = buildPageMetadata({
  path: '/privacidad',
  title: 'Política de privacidad',
  description:
    'Política de privacidad de CalculaChile conforme a la Ley 21.719 de protección de datos personales de Chile.',
  noIndex: true,
});

const sections = [
  { id: 'responsable', title: 'Responsable' },
  { id: 'datos', title: 'Datos que tratamos' },
  { id: 'calculadoras', title: 'Uso de las calculadoras' },
  { id: 'finalidades', title: 'Finalidades' },
  { id: 'cookies', title: 'Cookies y publicidad' },
  { id: 'legitimidad', title: 'Base de legitimidad' },
  { id: 'terceros', title: 'Comunicación a terceros' },
  { id: 'transferencias', title: 'Transferencias internacionales' },
  { id: 'conservacion', title: 'Conservación' },
  { id: 'derechos', title: 'Tus derechos' },
  { id: 'seguridad', title: 'Seguridad' },
  { id: 'cambios', title: 'Cambios' },
];

export default function PrivacidadPage() {
  const url = absoluteUrl('/privacidad');
  const schemas = [
    webPageSchema({
      url,
      name: `Política de Privacidad de ${SITE_NAME}`,
      description:
        'Cómo CalculaChile recopila, usa y protege tu información personal según la Ley 21.719.',
      datePublished: '2026-07-02',
      dateModified: '2026-07-02',
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
        description="Te explicamos qué datos recopilamos, por qué lo hacemos y cómo puedes ejercer tus derechos conforme a la normativa chilena."
        lastUpdated="2 de julio de 2026"
        sections={sections}
      >
        <LegalCard icon={AlertCircle} title="Resumen" variant="accent">
          <p>
            En CalculaChile tratamos datos personales de forma limitada y
            proporcional. No vendemos datos. Puedes contactarnos para ejercer
            tus derechos escribiendo a <EmailLink email={CONTACT_EMAIL} />.
          </p>
        </LegalCard>

        <LegalSection id="responsable" title="Responsable del tratamiento" icon={User}>
          <p>
            El responsable del sitio web es <strong>Diego Bravo Opazo</strong>, en
            adelante CalculaChile. Para cualquier consulta sobre esta política o
            sobre el ejercicio de tus derechos, puedes escribirnos a{' '}
            <EmailLink email={CONTACT_EMAIL} />.
          </p>
        </LegalSection>

        <LegalSection id="datos" title="Datos que tratamos" icon={Database}>
          <p>
            Dependiendo de cómo uses el sitio, podemos tratar los siguientes
            datos:
          </p>
          <LegalList
            items={[
              <>
                <strong>Datos técnicos de navegación:</strong> dirección IP
                (abreviada o completa según el proveedor), tipo y versión de
                navegador, sistema operativo, dispositivo, idioma, páginas
                visitadas, fecha y hora de acceso, tiempos de permanencia y
                eventos de interacción.
              </>,
              <>
                <strong>Datos de uso:</strong> preferencias de visualización,
                respuestas al banner de cookies y errores técnicos que nos
                ayuden a mantener el sitio.
              </>,
              <>
                <strong>Datos de contacto:</strong> si nos escribes, tu nombre,
                correo electrónico y el contenido del mensaje.
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection id="calculadoras" title="Uso de las calculadoras" icon={Calculator}>
          <p>
            Los datos que ingresas en las calculadoras se procesan en tu
            navegador o de forma temporal para mostrarte los resultados en
            pantalla. Salvo que una calculadora indique explícitamente lo
            contrario:
          </p>
          <LegalList
            items={[
              'No almacenamos datos personales sensibles de forma permanente.',
              'No usamos los datos de cálculo para crear perfiles individuales.',
              'No tomamos decisiones automatizadas con efectos jurídicos sobre ti.',
              'Puedes borrar el historial local desde la configuración de tu navegador.',
            ]}
          />
        </LegalSection>

        <LegalSection id="finalidades" title="Finalidades del tratamiento" icon={Target}>
          <p>Usamos los datos para las siguientes finalidades:</p>
          <LegalList
            items={[
              'Operar el sitio y mostrar las calculadoras correctamente.',
              'Responder consultas enviadas a través de los canales de contacto.',
              'Medir audiencia, detectar errores y mejorar el contenido.',
              'Prevenir abuso, fraudes o usos no autorizados.',
              'Cumplir obligaciones legales y regulatorias.',
              'Mostrar publicidad contextual o personalizada mediante proveedores como Google AdSense, si has dado tu consentimiento.',
            ]}
          />
        </LegalSection>

        <LegalSection id="cookies" title="Cookies y publicidad" icon={Cookie}>
          <p>
            Utilizamos cookies técnicas, analíticas y, con tu consentimiento,
            publicitarias. Google y sus socios pueden usar cookies o
            identificadores para personalizar anuncios, medir rendimiento y
            limitar la frecuencia de visualización.
          </p>
          <p>
            Puedes gestionar tus preferencias desde el banner de cookies o
            revisar más detalles en nuestra{' '}
            <InternalLink href="/cookies">Política de Cookies</InternalLink>.
            También puedes configurar tu navegador para bloquear cookies, aunque
            algunas funciones del sitio podrían verse afectadas.
          </p>
        </LegalSection>

        <LegalSection id="legitimidad" title="Base de legitimidad" icon={Scale}>
          <p>
            El tratamiento de datos se basa en una o más de las siguientes
            bases:
          </p>
          <LegalList
            items={[
              'Tu consentimiento, cuando corresponde (por ejemplo, para cookies publicitarias).',
              'El interés legítimo de mantener la seguridad, estabilidad y medición básica del sitio.',
              'La ejecución de medidas precontractuales o contractuales cuando nos contactas.',
              'El cumplimiento de obligaciones legales aplicables.',
            ]}
          />
        </LegalSection>

        <LegalSection id="terceros" title="Comunicación a terceros" icon={Users}>
          <p>
            Para operar el sitio podemos recurrir a proveedores de servicios
            tecnológicos. Estos actúan bajo instrucciones nuestras o bajo sus
            propias políticas cuando actúan como responsables independientes:
          </p>
          <LegalList
            items={[
              <>
                <strong>Hosting y despliegue:</strong> Vercel.{' '}
                <ExternalLegalLink href="https://vercel.com/legal/privacy-policy">
                  Política de privacidad de Vercel
                </ExternalLegalLink>
              </>,
              <>
                <strong>Analítica:</strong> Google Analytics.{' '}
                <ExternalLegalLink href="https://support.google.com/analytics/answer/6004245">
                  Más información
                </ExternalLegalLink>
              </>,
              <>
                <strong>Publicidad:</strong> Google AdSense.{' '}
                <ExternalLegalLink href="https://policies.google.com/technologies/ads">
                  Cómo usa Google la información
                </ExternalLegalLink>
              </>,
              <>
                <strong>Seguridad y comunicación:</strong> proveedores de
                correo electrónico y servicios de protección contra abuso.
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection
          id="transferencias"
          title="Transferencias internacionales"
          icon={Globe}
        >
          <p>
            Algunos proveedores operan desde fuera de Chile. Cuando esto ocurre,
            procuramos que cuenten con medidas contractuales, técnicas y
            organizativas razonables para proteger tus datos personales.
          </p>
        </LegalSection>

        <LegalSection id="conservacion" title="Conservación" icon={Clock}>
          <p>
            Conservamos los datos solo durante el tiempo necesario para cumplir
            la finalidad por la que fueron recopilados:
          </p>
          <LegalList
            items={[
              'Datos de contacto: hasta resolver tu solicitud y el plazo legal de conservación posterior.',
              'Registros técnicos y analíticos: según la configuración del proveedor y nuestras necesidades de seguridad y medición.',
              'Cookies: según su duración técnica y tu configuración de consentimiento.',
            ]}
          />
        </LegalSection>

        <LegalSection id="derechos" title="Tus derechos" icon={KeyRound}>
          <p>
            La normativa chilena reconoce derechos sobre tus datos personales.
            Puedes ejercerlos enviando un correo a{' '}
            <EmailLink email={CONTACT_EMAIL} /> con una solicitud que permita
            verificar tu identidad:
          </p>
          <LegalList
            items={[
              <>
                <strong>Acceso:</strong> saber qué datos personales tuyos
                tratamos.
              </>,
              <>
                <strong>Rectificación:</strong> corregir datos inexactos o
                desactualizados.
              </>,
              <>
                <strong>Cancelación o supresión:</strong> solicitar la
                eliminación de tus datos cuando corresponda.
              </>,
              <>
                <strong>Oposición:</strong> oponerte al tratamiento basado en
                interés legítimo.
              </>,
              <>
                <strong>Bloqueo:</strong> impedir el uso de tus datos
                determinadas finalidades.
              </>,
              <>
                <strong>Portabilidad:</strong> recibir tus datos en formato
                estructurado cuando sea técnicamente posible.
              </>,
            ]}
          />
          <p className="text-sm">
            Responderemos dentro de los plazos legales aplicables. Si no quedas
            satisfecho, podrás acudir a la autoridad de protección de datos
            correspondiente.
          </p>
        </LegalSection>

        <LegalSection id="seguridad" title="Seguridad" icon={Lock}>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger
            tus datos:
          </p>
          <LegalList
            items={[
              'Conexión cifrada mediante HTTPS.',
              'Control de acceso al repositorio y credenciales de servicios.',
              'Uso de proveedores de infraestructura reconocidos con estándares de seguridad.',
            ]}
          />
          <p>
            Ningún sistema es infalible. Te recomendamos no enviar información
            sensible o confidencial a través de formularios de contacto
            generales.
          </p>
        </LegalSection>

        <LegalSection id="cambios" title="Cambios en esta política" icon={RefreshCw}>
          <p>
            Esta política puede actualizarse por cambios legales, técnicos o de
            proveedores. La versión vigente se publicará siempre en esta URL con
            su fecha de actualización correspondiente.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
