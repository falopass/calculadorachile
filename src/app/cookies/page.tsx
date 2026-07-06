import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import {
  LegalSection,
  LegalCard,
  LegalList,
  EmailLink,
  ExternalLegalLink,
  AlertCircle,
} from '@/components/layout/LegalComponents';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import {
  HelpCircle,
  Layers,
  Settings,
  Users,
  CheckCircle,
  RefreshCw,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = buildPageMetadata({
  path: '/cookies',
  title: 'Política de cookies',
  description:
    'Política de cookies de CalculaChile: qué cookies usamos (esenciales, analíticas, publicidad) y cómo gestionarlas en tu navegador.',
});

const sections = [
  { id: 'que-son', title: '¿Qué son las cookies?' },
  { id: 'tipos', title: 'Tipos de cookies' },
  { id: 'tabla', title: 'Tabla de cookies' },
  { id: 'gestion', title: 'Cómo gestionarlas' },
  { id: 'terceros', title: 'Cookies de terceros' },
  { id: 'consentimiento', title: 'Consentimiento' },
  { id: 'actualizaciones', title: 'Actualizaciones' },
  { id: 'contacto', title: 'Contacto' },
];

const cookieRows = [
  {
    name: 'theme',
    type: 'Esencial',
    provider: 'CalculaChile',
    purpose: 'Recuerda tu preferencia de tema visual (claro/oscuro).',
    duration: 'Persistente',
  },
  {
    name: '_ga',
    type: 'Analítica',
    provider: 'Google Analytics',
    purpose: 'Distingue usuarios únicos para generar estadísticas de uso.',
    duration: '2 años',
  },
  {
    name: '_gid',
    type: 'Analítica',
    provider: 'Google Analytics',
    purpose: 'Distingue usuarios durante 24 horas.',
    duration: '24 horas',
  },
  {
    name: '_gat',
    type: 'Analítica',
    provider: 'Google Analytics',
    purpose: 'Limita la frecuencia de solicitudes.',
    duration: '1 minuto',
  },
  {
    name: 'NID, IDE',
    type: 'Publicidad',
    provider: 'Google / AdSense',
    purpose: 'Personaliza anuncios, mide rendimiento y limita frecuencia.',
    duration: '6-18 meses',
  },
];

export default function CookiesPage() {
  const url = absoluteUrl('/cookies');
  const schemas = [
    webPageSchema({
      url,
      name: 'Política de cookies',
      description:
        'Información sobre las cookies utilizadas por CalculaChile y cómo gestionarlas.',
      datePublished: '2026-01-01',
      dateModified: '2026-07-02',
    }),
    breadcrumbSchema([
      { name: 'Inicio', path: '/' },
      { name: 'Política de cookies' },
    ]),
  ];

  return (
    <>
      <JsonLd id="cookies-schemas" data={schemas} />
      <LegalPageLayout
        title="Política de Cookies"
        description="Te explicamos qué cookies usamos, para qué sirven y cómo puedes gestionar tus preferencias."
        lastUpdated="2 de julio de 2026"
        sections={sections}
      >
        <LegalCard icon={AlertCircle} title="En resumen" variant="accent">
          <p>
            Usamos cookies técnicas para que el sitio funcione, analíticas para
            entender cómo se usa y publicitarias para mostrar anuncios
            relevantes. Puedes gestionarlas desde tu navegador o desde el
            banner de cookies.
          </p>
        </LegalCard>

        <LegalSection id="que-son" title="¿Qué son las cookies?" icon={HelpCircle}>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Sirven para recordar tus
            preferencias, entender cómo usas el sitio y mostrar contenido
            publicitario relevante.
          </p>
          <p>
            También usamos tecnologías similares como <em>localStorage</em> para
            guardar preferencias locales que no se envían a nuestros servidores.
          </p>
        </LegalSection>

        <LegalSection id="tipos" title="Tipos de cookies que usamos" icon={Layers}>
          <LegalList
            items={[
              <>
                <strong>Esenciales:</strong> necesarias para el funcionamiento
                básico del sitio, como recordar tu preferencia de tema.
              </>,
              <>
                <strong>Analíticas:</strong> nos ayudan a conocer cómo usas el
                sitio, qué páginas visitas y desde dónde llegan los usuarios.
              </>,
              <>
                <strong>Publicitarias:</strong> permiten mostrar anuncios
                relevantes y limitar cuántas veces ves el mismo anuncio.
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection id="tabla" title="Tabla de cookies" icon={Layers}>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                  <th className="px-4 py-3">Cookie</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Proveedor</th>
                  <th className="px-4 py-3">Propósito</th>
                  <th className="px-4 py-3">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {cookieRows.map((row) => (
                  <tr key={row.name} className="text-[var(--foreground-secondary)]">
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]">
                      {row.name}
                    </td>
                    <td className="px-4 py-3">
                      <CookieTypeBadge type={row.type} />
                    </td>
                    <td className="px-4 py-3">{row.provider}</td>
                    <td className="px-4 py-3 leading-relaxed">{row.purpose}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection id="gestion" title="Cómo gestionar las cookies" icon={Settings}>
          <p>
            Puedes controlar y desactivar las cookies desde la configuración de
            tu navegador:
          </p>
          <LegalList
            items={[
              <>
                <strong>Chrome:</strong> Configuración → Privacidad y seguridad
                → Cookies y otros datos de sitios.
              </>,
              <>
                <strong>Firefox:</strong> Opciones → Privacidad y seguridad →
                Cookies y datos de sitios.
              </>,
              <>
                <strong>Safari:</strong> Preferencias → Privacidad → Gestión de
                datos de sitios web.
              </>,
              <>
                <strong>Edge:</strong> Configuración → Cookies y permisos del
                sitio.
              </>,
            ]}
          />
          <p>
            También puedes gestionar la publicidad personalizada de Google en{' '}
            <ExternalLegalLink href="https://www.google.com/settings/ads">
              Google Ads Settings
            </ExternalLegalLink>{' '}
            y en{' '}
            <ExternalLegalLink href="https://optout.aboutads.info">
              Your Online Choices
            </ExternalLegalLink>.
          </p>
          <LegalCard variant="warning" icon={AlertCircle} title="Nota">
            Desactivar cookies esenciales puede afectar el funcionamiento del
            sitio. Desactivar cookies analíticas o publicitarias no impide que
            uses las calculadoras.
          </LegalCard>
        </LegalSection>

        <LegalSection id="terceros" title="Cookies de terceros" icon={Users}>
          <p>
            Algunas cookies son colocadas por servicios de terceros que operan
            bajo sus propias políticas. No tenemos control directo sobre estas
            cookies. Te recomendamos revisar sus políticas:
          </p>
          <LegalList
            items={[
              <>
                <ExternalLegalLink href="https://policies.google.com/privacy">
                  Política de privacidad de Google
                </ExternalLegalLink>
              </>,
              <>
                <ExternalLegalLink href="https://policies.google.com/technologies/ads">
                  Cómo usa Google la información de las cookies
                </ExternalLegalLink>
              </>,
              <>
                <ExternalLegalLink href="https://support.google.com/analytics/answer/6004245">
                  Información sobre Google Analytics
                </ExternalLegalLink>
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection id="consentimiento" title="Consentimiento" icon={CheckCircle}>
          <p>
            Al usar CalculaChile, consientes el uso de cookies esenciales. Para
            cookies analíticas y publicitarias solicitamos tu consentimiento a
            través del banner de cookies. Puedes retirar tu consentimiento en
            cualquier momento:
          </p>
          <LegalList
            items={[
              'Desde la configuración de tu navegador.',
              'Desde las herramientas de privacidad de Google y otros proveedores.',
              'Eliminando las cookies almacenadas en tu dispositivo.',
            ]}
          />
        </LegalSection>

        <LegalSection id="actualizaciones" title="Actualizaciones" icon={RefreshCw}>
          <p>
            Esta política puede actualizarse cuando agreguemos o modifiquemos
            los servicios que utilizamos. Los cambios significativos se
            publicarán en esta URL con su fecha de actualización.
          </p>
        </LegalSection>

        <LegalSection id="contacto" title="Contacto" icon={Mail}>
          <p>
            Si tienes dudas sobre esta política de cookies, escríbenos a{' '}
            <EmailLink email={CONTACT_EMAIL} /> o visita{' '}
            <ExternalLegalLink href={SITE_URL}>{SITE_URL}</ExternalLegalLink>.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}

function CookieTypeBadge({ type }: { type: string }) {
  const styles = {
    Esencial:
      'bg-[var(--accent-muted)] text-[var(--accent)]',
    Analítica:
      'bg-blue-100 text-blue-700',
    Publicidad:
      'bg-amber-100 text-amber-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
        styles[type as keyof typeof styles] ?? 'bg-[var(--surface-muted)] text-[var(--foreground-muted)]'
      }`}
    >
      {type}
    </span>
  );
}
