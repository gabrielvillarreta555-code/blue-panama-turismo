# Blue Panamá Turismo 🇵🇦

Catálogo turístico de Blue Lab Studios. Proyecto privado, en desarrollo editorial. Sin publicación ni despliegue autorizado.

## Desarrollo

Requiere Node.js 24 y npm. Ejecutar `npm ci`, `npm run dev` y abrir http://localhost:4321.

- `npm run check`: tipos y plantillas Astro.
- `npm run lint`: ESLint.
- `npm test`: Vitest.
- `npm run build`: genera `dist/`.
- `npm run preview`: sirve la compilación local.
- `npx playwright install --with-deps chromium webkit` y `npm run test:e2e`: pruebas de navegador.

Consulta [arquitectura](docs/arquitectura.md), [modelo](docs/modelo-datos.md), [fuentes](docs/fuentes.md), [hoja de ruta](docs/hoja-de-ruta.md) y [criterios editoriales](docs/criterios-editoriales.md).

## Revisión

Las entregas se proponen en ramas y PR en borrador. Los PR siguientes se apilan sobre la entrega anterior; revisar en orden. No fusionar ni desplegar sin autorización. La configuración predeterminada excluye la indexación.

El código no concede una licencia pública al proyecto privado. Las fotografías conservan sus licencias individuales y atribución, visibles en el sitio y en `src/lib/photos.ts`.

## Estado de las entregas 1–4

Inicio, navegación móvil, 16 páginas regionales, 4 fichas documentadas, búsqueda local con filtros y mapa interactivo. El catálogo inicial abarca Boquete, El Valle de Antón, Portobelo y Coiba con su zona especial de protección marina. Solo Coiba tiene coordenadas verificadas; los demás lugares no reciben marcadores ficticios.

Los PR #2–#4 se fusionaron hacia ramas intermedias, de modo que `main` solo recibió la entrega 1. La integración de las cuatro entregas en `main` se propone en un PR dedicado; ver [auditoría de integración](docs/auditoria-integracion.md).

[Resultados y limitaciones](docs/validacion.md) · [Vista de escritorio](docs/capturas/inicio-escritorio.png) · [Vista móvil](docs/capturas/inicio-movil.png) · [Mapa móvil](docs/capturas/mapa-movil.png).

## Calidad adicional

Python 3 se usa únicamente para comprobaciones de HTML, enlaces y SEO; no forma parte del sitio ni requiere paquetes adicionales.

- `npm run check:links`: enlaces, fragmentos y recursos internos de `dist/`.
- `npm run test:seo`: compila en una carpeta temporal con `example.test`, comprueba canónicas, sitemap y JSON-LD y elimina los archivos. No realiza solicitudes al dominio ni despliegues.
- `npm run format:check` / `npm run format`: formato consistente con Prettier.
- `npm audit`: revisión de dependencias; consultar los avisos documentados.

GitHub Actions define los mismos controles, sin tareas de despliegue, con permisos de lectura y acciones fijadas por SHA.

## GitHub Pages (preparado, manual)

`BASE_PATH` permite compilar bajo una subruta (`BASE_PATH=/blue-panama-turismo/ npm run build`); sin él, el sitio se genera en la raíz como siempre. `.github/workflows/pages.yml` compila, valida y despliega **solo al ejecutarlo manualmente** desde `main`:

1. Aprobar y fusionar la integración en `main`.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions** (en repos privados requiere GitHub Pro/Team; el sitio resultante es público).
3. Actions → **GitHub Pages** → Run workflow (dejar la indexación desmarcada hasta la revisión editorial).
4. URL esperada: `https://gabrielvillarreta555-code.github.io/blue-panama-turismo/`.

Para comprobar los enlaces de esa compilación: `BASE_PATH=/blue-panama-turismo/ npm run check:links`.

## Configuración futura del dominio

Sin `SITE_URL`, las revisiones llevan `noindex`, `robots.txt` bloquea indexación y no se genera sitemap ni se inventan canónicas. Cuando exista un dominio y autorización de publicación, pasar `SITE_URL` (origen HTTPS sin ruta) y `SITE_INDEXABLE=true` al proceso de compilación. La configuración no despliega nada. `.env.example` describe las variables; `astro.config.mjs` las lee del entorno del proceso. Para cargarlas desde un archivo local con Node 24: `node --env-file=.env node_modules/astro/bin/astro.mjs build`.

Configurar una URL por sí sola no habilita la indexación. No confundir `noindex` con control de acceso: el repositorio es privado, pero el alojamiento futuro debe configurar su propia privacidad.
