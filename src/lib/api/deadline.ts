/**
 * Corta una promesa a los `ms` milisegundos devolviendo `fallback`.
 *
 * `AbortSignal.timeout` en el fetch no basta: el fetch parcheado de Next.js
 * no reenvía el signal en algunas rutas (p. ej. revalidación de una entrada
 * vencida del fetch-cache) y en los builds de Cloudflare se observaron
 * páginas que superaron los 60 s sin que el fetch llegara a rechazarse.
 * Este plazo no depende del fetch: la página sigue con el respaldo.
 */
export function withDeadline<T>(
  promise: Promise<T>,
  ms: number,
  fallback: T,
  onTimeout?: () => void,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      onTimeout?.();
      resolve(fallback);
    }, ms);
  });
  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));
}
