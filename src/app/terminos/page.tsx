// ============================================
// /terminos — Términos de uso
// ----------------------------------------------
// noindex, follow. Página legal utilitaria.
// ============================================

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import {
  LegalSection,
  LegalCard,
  LegalList,
  EmailLink,
  AlertCircle,
} from '@/components/layout/LegalComponents';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, SITE_NAME, CONTACT_EMAIL } from '@/lib/site';
import {
  Info,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Copyright,
  Megaphone,
  AlertTriangle,
  Mail,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = buildPageMetadata({
  path: '/terminos',
  title: 'Términos de uso',
  description:
    'Términos y condiciones de uso de CalculaChile. Reglas para usar nuestras calculadoras gratuitas, limitación de responsabilidad y propiedad intelectual.',
  noIndex: true,
});

const sections = [
  { id: 'naturaleza', title: 'Naturaleza del servicio' },
  { id: 'asesoria', title: 'No asesoría profesional' },
  { id: 'fuentes', title: 'Fuentes y actualización' },
  { id: 'uso', title: 'Uso permitido' },
  { id: 'propiedad', title: 'Propiedad intelectual' },
  { id: 'publicidad', title: 'Publicidad y afiliación' },
  { id: 'responsabilidad', title: 'Responsabilidad' },
  { id: 'contacto', title: 'Contacto' },
  { id: 'cambios', title: 'Cambios' },
];

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
        description="Al usar CalculaChile aceptas estas reglas. Léelas con atención; son importantes para entender qué puedes esperar del sitio."
        lastUpdated="2 de julio de 2026"
        sections={sections}
      >
        <LegalCard icon={AlertCircle} title="Importante" variant="warning">
          <p>
            Las calculadoras son herramientas informativas. No sustituyen la
            opinión de un profesional ni constituyen una certificación oficial.
            Antes de decisiones formales, verifica con la institución
            competente.
          </p>
        </LegalCard>

        <LegalSection id="naturaleza" title="Naturaleza del servicio" icon={Info}>
          <p>
            CalculaChile ofrece calculadoras, simuladores y guías informativas
            de acceso gratuito. Los contenidos se elaboran a partir de fuentes
            públicas chilenas, normativa vigente y datos técnicos disponibles al
            momento de su publicación.
          </p>
          <p>
            Los resultados son estimaciones referenciales y pueden variar por
            datos incompletos, cambios normativos posteriores, criterios
            administrativos de cada institución, redondeos o situaciones
            particulares de cada usuario.
          </p>
        </LegalSection>

        <LegalSection id="asesoria" title="No asesoría profesional" icon={GraduationCap}>
          <p>
            El sitio <strong>no constituye asesoría legal, financiera,</strong>{' '}
            previsional, tributaria, contable ni laboral. Para decisiones
            formales, trámites, contratos, declaraciones, demandas, beneficios
            estatales o inversiones, debes:
          </p>
          <LegalList
            items={[
              'Verificar la información en la institución competente (SII, BCCh, Dirección del Trabajo, AFP, etc.).',
              'Consultar a un profesional calificado según la materia.',
              'No usar los resultados como única fuente para decisiones con efectos jurídicos o patrimoniales.',
            ]}
          />
        </LegalSection>

        <LegalSection id="fuentes" title="Fuentes y actualización" icon={BookOpen}>
          <p>
            Cada calculadora indica las fuentes consultadas y la fecha de
            actualización de sus parámetros. Aunque trabajamos para mantener la
            información vigente, no garantizamos que todos los datos estén
            libres de errores o actualizados al minuto.
          </p>
          <p>
            Los valores oficiales (UF, UTM, IPC, tasas, montos impositivos,
            etc.) dependen de publicaciones de terceros. Te recomendamos
            contrastar siempre los resultados con las fuentes oficiales antes
            de actuar.
          </p>
        </LegalSection>

        <LegalSection id="uso" title="Uso permitido" icon={CheckCircle}>
          <p>Puedes usar el sitio para fines personales, educativos o informativos. Está prohibido:</p>
          <LegalList
            items={[
              'Afectar la disponibilidad o estabilidad del sitio.',
              'Realizar consultas automatizadas abusivas o scraping masivo.',
              'Explotar errores, vulnerabilidades o inconsistencias.',
              'Copiar masivamente contenido sin autorización expresa.',
              'Presentar los resultados como certificación, dictamen o documento oficial.',
              'Reutilizar la marca, el logo o los textos sin permiso.',
            ]}
          />
        </LegalSection>

        <LegalSection id="propiedad" title="Propiedad intelectual" icon={Copyright}>
          <p>
            El diseño, textos, estructura, código fuente, gráficos y contenidos
            originales de CalculaChile pertenecen a sus autores o se usan
            conforme a licencias aplicables. Las fuentes oficiales citadas
            pertenecen a sus instituciones respectivas.
          </p>
          <p>
            No se concede ninguna licencia sobre la propiedad intelectual del
            sitio salvo el derecho de uso personal y no transferible para
            navegar y utilizar las calculadoras conforme a estos términos.
          </p>
        </LegalSection>

        <LegalSection id="publicidad" title="Publicidad y afiliación" icon={Megaphone}>
          <p>
            CalculaChile puede mostrar publicidad mediante redes como Google
            AdSense o enlaces de afiliación. La existencia de publicidad no
            altera la independencia editorial de las calculadoras y guías.
          </p>
          <p>
            Cuando exista una relación comercial relevante con algún producto o
            servicio mencionado, se informará de forma visible. Los anuncios
            mostrados son responsabilidad de los proveedores publicitarios.
          </p>
        </LegalSection>

        <LegalSection id="responsabilidad" title="Responsabilidad" icon={AlertTriangle}>
          <p>
            CalculaChile no se hace responsable por decisiones tomadas
            exclusivamente con base en resultados del sitio. En la medida que
            lo permita la ley aplicable, la responsabilidad máxima se limita a
            corregir o retirar información inexacta una vez conocida.
          </p>
          <p>
            Tampoco respondemos por fallas técnicas, interrupciones del
            servicio, errores de terceros proveedores o por el uso que hagas de
            la información fuera de los fines permitidos.
          </p>
        </LegalSection>

        <LegalSection id="contacto" title="Contacto" icon={Mail}>
          <p>
            Para reportar errores, solicitar correcciones o enviar consultas
            sobre estos términos, escríbenos a{' '}
            <EmailLink email={CONTACT_EMAIL} />.
          </p>
        </LegalSection>

        <LegalSection id="cambios" title="Cambios" icon={RefreshCw}>
          <p>
            Los términos pueden modificarse por razones legales, técnicas o
            editoriales. La versión vigente será la publicada en esta URL con
            su fecha de actualización. Te recomendamos revisarlos
            periódicamente.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
