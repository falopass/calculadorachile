// ============================================
// /privacidad — Política de privacidad
// ----------------------------------------------
// noindex, follow. Página legal utilitaria: debe existir y ser
// accesible pero no suma a la evaluación de contenido de AdSense.
//
// Basada en el Entregable D del informe AdSense, adaptada a la
// Ley 21.719 (vigente diciembre 2026) que reemplaza a la Ley 19.628.
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
  path: '/privacidad',
  title: 'Política de privacidad',
  description:
    'Política de privacidad de CalculaChile conforme a la Ley 21.719 de protección de datos personales de Chile.',
  noIndex: true,
});

const PRIVACIDAD_EMAIL = 'ddiegosebastianbb@gmail.com';

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
        description="CalculaChile trata datos personales de forma limitada y proporcional al funcionamiento del sitio."
        lastUpdated="2 de Julio de 2026"
      >
        <p>
          CalculaChile trata datos personales de forma limitada y proporcional
          al funcionamiento del sitio. Esta política explica qué datos pueden
          recopilarse, para qué se usan, cómo se protegen y cómo ejercer
          derechos conforme a la normativa chilena de protección de datos,
          incluida la <strong>Ley 19.628</strong> y sus modificaciones por la{' '}
          <strong>Ley 21.719</strong>.
        </p>

        <h2>Responsable</h2>
        <p>
          Responsable del sitio: Diego Bravo. Contacto:{' '}
          <a href={`mailto:${PRIVACIDAD_EMAIL}`}>{PRIVACIDAD_EMAIL}</a>.
        </p>

        <h2>Datos que se pueden tratar</h2>
        <p>
          El sitio puede tratar datos técnicos de navegación, como dirección
          IP abreviada o completa según el proveedor, navegador, dispositivo,
          páginas visitadas, fecha, hora, eventos de uso y preferencias de
          cookies. Si usas el formulario de contacto, se tratarán los datos
          que entregues, como nombre, correo y mensaje.
        </p>

        <h2>Calculadoras</h2>
        <p>
          Los datos ingresados en las calculadoras se procesan para mostrar
          resultados en pantalla. Salvo que una página indique lo contrario,
          los datos de cálculo no se usan para crear perfiles individuales ni
          para tomar decisiones automatizadas con efectos legales.
        </p>

        <h2>Finalidades</h2>
        <p>
          Los datos se usan para operar el sitio, responder consultas, medir
          rendimiento, mejorar contenidos, prevenir abuso, cumplir
          obligaciones legales y, si corresponde, mostrar publicidad
          personalizada o contextual mediante proveedores como Google AdSense.
        </p>

        <h2>Cookies y publicidad</h2>
        <p>
          El sitio puede usar cookies técnicas, analíticas y publicitarias.
          Google y sus socios pueden usar cookies o identificadores para
          personalizar anuncios, medir rendimiento y limitar frecuencia.
          Puedes gestionar preferencias desde el banner de cookies y desde la
          configuración de tu navegador.
        </p>

        <h2>Base de legitimidad</h2>
        <p>
          El tratamiento se basa en el consentimiento cuando corresponda, en
          el interés legítimo de mantener seguridad y medición básica, y en
          el cumplimiento de obligaciones legales aplicables.
        </p>

        <h2>Comunicación a terceros</h2>
        <p>
          Pueden participar proveedores de hosting, analítica, seguridad,
          email y publicidad. Estos proveedores deben tratar datos conforme a
          instrucciones, contratos o sus propias políticas cuando actúen como
          responsables independientes.
        </p>

        <h2>Transferencias internacionales</h2>
        <p>
          Algunos proveedores pueden operar fuera de Chile. En esos casos se
          procurará usar proveedores con medidas contractuales, técnicas y
          organizativas razonables.
        </p>

        <h2>Conservación</h2>
        <p>
          Los datos de contacto se conservarán por el tiempo necesario para
          responder la solicitud. Los registros técnicos y analíticos se
          conservarán según la configuración del proveedor y necesidades de
          seguridad o medición.
        </p>

        <h2>Derechos de las personas</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición,
          bloqueo, portabilidad y demás derechos reconocidos por la normativa
          aplicable escribiendo a{' '}
          <a href={`mailto:${PRIVACIDAD_EMAIL}`}>{PRIVACIDAD_EMAIL}</a>. La
          solicitud debe permitir verificar identidad y responder dentro de
          los plazos legales.
        </p>

        <h2>Seguridad</h2>
        <p>
          El sitio usa HTTPS, control de acceso al repositorio y proveedores
          de infraestructura reconocidos. Ningún sistema es infalible, por lo
          que se recomienda no enviar información sensible por formularios
          generales.
        </p>

        <h2>Cambios</h2>
        <p>
          Esta política puede actualizarse por cambios legales, técnicos o de
          proveedores. La versión vigente se publicará en esta misma URL.
        </p>
      </LegalPageLayout>
    </>
  );
}
