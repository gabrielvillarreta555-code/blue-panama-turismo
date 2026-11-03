/**
 * Prefija una ruta interna con la base configurada (`BASE_PATH` en la compilación).
 * Sin base, devuelve la ruta sin cambios, por lo que el sitio en la raíz no varía.
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Ruta interna sin barra inicial: ${path}`);
  return `${base}${path}`;
}

/** Ruta actual sin la base, para comparar con rutas internas como `/explorar/`. */
export function withoutBase(pathname: string): string {
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}
