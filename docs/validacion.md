# Resultados de validación

## Entrega 1 — 2026-11-03

- Astro/TypeScript: 0 errores, advertencias o hints.
- ESLint, compilación (6 páginas) y Vitest (1 prueba): correctos.
- Playwright Chromium escritorio y Pixel 7 emulado: 5 pruebas correctas, 1 omitida intencionalmente (menú móvil en escritorio).
- axe detectó contraste insuficiente en dos etiquetas: corregido el color turquesa y repetida la verificación con éxito.
- `npm audit --omit=dev`: 0 vulnerabilidades notificadas.
- WebKit descargado; faltan bibliotecas del sistema. La instalación automática solicitó acceso root no disponible y no se completó. No se afirma validación en Safari/iPhone físico.
- Inicio de catálogo vacío intencional. Regiones completas, fichas, filtros y mapa corresponden a las siguientes entregas.
- Astro detecta agentes y puede iniciar preview en segundo plano; Playwright usa `--ignore-lock` para mantener el proceso en primer plano.

## Entrega 2 — 2026-11-03

- Colecciones y relaciones: 7 pruebas unitarias correctas.
- TypeScript, ESLint y compilación de 22 páginas: correctos.
- Playwright Chromium escritorio/móvil: 7 pruebas correctas y 1 omisión intencional.
- 10 provincias y 6 comarcas con páginas propias; 4 destinos documentados. Las fichas individuales se conectan en la entrega 3.
- Sin fotos para todos los territorios: se muestran estados explícitos, no imágenes de otras regiones.

## Entrega 3 — 2026-11-03

- TypeScript, ESLint y compilación de 26 páginas: correctos.
- Vitest: 12 pruebas correctas, incluidos borradores, filtros por costo, tildes, referencias y serialización segura.
- Playwright Chromium escritorio/móvil: 15 pruebas correctas, 1 omisión intencional.
- Búsqueda y filtros compartibles; historial, limpieza, ausencia de resultados, navegación regional y fichas comprobados.
- Catálogo y fichas navegables con JavaScript desactivado.
- Cuatro fichas con fuentes y límites explícitos. No se inventan horarios, servicios, rutas ni precios para completar campos.

## Entrega 4 — revisión final del 2026-11-03

### Controles locales

- `npm run validate`: Astro/TypeScript sin errores, advertencias ni hints; ESLint correcto; 16 pruebas Vitest correctas; compilación estática de 26 páginas más `robots.txt`.
- Playwright: Chromium escritorio, Pixel 7 emulado e iPhone 13 emulado con WebKit. La batería comprende 63 casos: 62 correctos y 1 omisión intencional (menú móvil en escritorio).
- axe cubre WCAG 2 A/AA y 2.1 A/AA en inicio, búsqueda, fichas, regiones, metodología, privacidad y mapa cargado. También se comprobaron teclado, Escape, salto al contenido, movimiento reducido y ausencia de desbordamiento horizontal. No constituye una certificación completa de accesibilidad.
- Mapa: marcadores y enlaces, carga voluntaria, atribución, errores de teselas, fallo del módulo, desconexión, recuperación y timeout. Las pruebas automatizadas simulan teselas para ser deterministas. Una comprobación adicional con OpenStreetMap real cargó 6 teselas correctamente y 0 fallidas.
- `npm run test:seo`: canónicas y metadatos de 26 documentos, cuatro fichas con JSON-LD y sitemap con 25 URLs; 404 excluido. Dominio reservado de prueba `example.test`, sin solicitudes ni publicación. Por defecto permanecen `noindex` y el bloqueo en `robots.txt`.
- `npm run check:links`: comprobación de enlaces, fragmentos y recursos locales sin roturas. El verificador recorre todos los documentos HTML generados.
- Prettier y `git diff --check`: correctos.
- Gitleaks 8.30.1 no detectó secretos en historial ni en archivos del trabajo. `npm audit --omit=dev`: 0 vulnerabilidades. Auditoría completa: 12 entradas moderadas en la cadena de lint, 0 altas/críticas; detalle y limitación en [seguridad](seguridad.md).

### Rendimiento observado

Lighthouse 13.6.0, inicio en servidor local, perfil móvil con ralentización CPU ×4 y red simulada. Última medición: **98 rendimiento, 100 accesibilidad automatizada, 100 buenas prácticas y 66 SEO**. LCP 2.3 s, FCP 0.8 s, TBT 0 ms y CLS 0. SEO está reducido intencionalmente por el bloqueo de indexación de la revisión. No representa tráfico real ni garantiza resultados futuros.

El [resumen de medición](evidencias/lighthouse-resumen.json) conserva fecha, configuración y métricas. La primera medición mostró una etiqueta del logo que no coincidía con su texto visible; se corrigió. Una repetición detectó CLS 0.228 al ocultar tardíamente el menú móvil; el menú ahora se inicializa antes del contenido y la medición posterior dio CLS 0. No se ocultan estos hallazgos iniciales.

### Entorno y limitaciones

La instalación de bibliotecas de WebKit mediante root falló inicialmente. Se descargaron paquetes de Debian al espacio temporal, se extrajeron y enlazaron a la caché local de Playwright. WebKit ejecutó finalmente las pruebas; se omitió únicamente la detección automática de bibliotecas del host, no las pruebas del navegador. En un entorno normal o CI usar `npx playwright install --with-deps chromium webkit`.

El primer verificador SEO falló por un movimiento de archivos entre discos distintos (`EXDEV`); su carpeta temporal ahora se crea en el mismo sistema de archivos y se elimina al terminar.

Las pruebas de teléfono son emulación; no se probaron dispositivos Android/iPhone físicos. Solo un destino cuenta con coordenadas verificadas. Precios, horarios y servicios iniciales siguen sin confirmar. Las regiones sin imagen documentada muestran estados explícitos; no se sustituyen por fotos de otros territorios.

Las capturas de [escritorio](capturas/inicio-escritorio.png), [móvil](capturas/inicio-movil.png) y [mapa móvil](capturas/mapa-movil.png) corresponden a la compilación local. No hay despliegue ni dominio público configurado. El workflow de CI se entrega para revisión; su ejecución remota se documentará al comprobar GitHub.

## Integración en main — 2026-11-03

Verificación independiente sobre la rama de integración (contenido idéntico a `feat/entrega-4-mapa-calidad` más las correcciones de este apartado), con Node.js 24.22.2:

- `npm ci`; `format:check`, `check` (42 archivos, 0 errores/advertencias/hints), `lint`, `test` (18 pruebas, 2 nuevas para rutas base), `build` (26 páginas), `check:links` (621 referencias, 0 roturas), `test:seo` (26 documentos, 25 URLs de sitemap, JSON-LD válido): correctos.
- Playwright 1.64.1 (Chromium escritorio, Pixel 7 emulado, iPhone 13 emulado con WebKit; bibliotecas instaladas con `playwright install-deps`): 62 correctas, 1 omitida intencionalmente (menú móvil en escritorio).
- `npm audit`: 0 vulnerabilidades tras el override de minimatch (antes: 12 moderadas). Gitleaks 8.30.1 (SHA-256 verificado): sin hallazgos en historial ni archivos.
- Compilación con `BASE_PATH=/blue-panama-turismo/` y `SITE_URL=https://gabrielvillarreta555-code.github.io`: `validate` correcto, 621 referencias dentro de la base sin roturas; canónicas, `og:image` y JSON-LD incluyen la ruta; `noindex` y `robots.txt` bloqueante por defecto. Prueba de humo en navegador servida bajo la subruta: inicio, búsqueda, mapa Leaflet (marcador de Coiba y enlace del popup), ficha → región y 404.
- La compilación sin `BASE_PATH` produce HTML idéntico al de la entrega 4 (solo cambia el hash del script del mapa).
- No se ejecutó el workflow de GitHub Pages ni se publicó el sitio. Lighthouse no se repitió.
