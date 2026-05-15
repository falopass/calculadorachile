// ============================================
// Componente JsonLd — wrapper para Schemas
// ----------------------------------------------
// Server Component (no `'use client'`) para que el JSON-LD viaje
// en el HTML inicial. Si se usa dentro de un Client Component,
// Next.js lo serializa igual.
//
// Acepta:
//   - `data`: un schema o array de schemas
//   - `id`: opcional, útil para tests/diagnóstico
//
// Si `data` es un array, cada elemento se inyecta como un `<script>`
// independiente. Esto es preferible a `@graph` cuando los schemas no
// están relacionados, porque facilita el debug en herramientas como
// Rich Results Test.
// ============================================

import { serializeSchema } from '@/lib/seo/schema';

interface JsonLdProps {
  data: unknown | unknown[];
  /** ID HTML opcional para identificar el schema en pruebas. */
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((schema, idx) => (
        <script
          key={`${id ?? 'jsonld'}-${idx}`}
          type="application/ld+json"
          // Las funciones de schema producen objetos JSON puros y
          // serializeSchema escapa caracteres peligrosos (</script>).
          dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
        />
      ))}
    </>
  );
}
