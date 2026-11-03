# Seguridad y privacidad

## Medidas implementadas

- Sitio estático, sin base de datos, autenticación, formularios de aportes ni endpoints de escritura.
- Contenido revisado mediante PR, esquemas y validación de referencias. Los borradores se excluyen de HTML, índices y mapas.
- URLs de fuentes HTTPS, slugs validados y JSON escapado. Las búsquedas no se insertan como HTML; los popups usan nodos DOM.
- Sin geolocalización, analítica, cookies propias ni almacenamiento de información personal. El mapa avisa antes de contactar al proveedor externo.
- Dependencias fijadas mediante lockfile; CI con permisos de lectura, sin credenciales de despliegue y acciones fijadas por SHA.

## Auditoría del 2026-11-03

`npm audit --omit=dev` no notificó vulnerabilidades. La auditoría completa notificó 12 entradas moderadas derivadas de un mismo aviso en `minimatch`, transitivo de ESLint y typescript-eslint: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No hay avisos altos ni críticos. Afecta al procesamiento de patrones glob en herramientas de desarrollo; no se incluye en el JavaScript del sitio estático.

Las versiones directas instaladas son las actuales consultadas. El arreglo propuesto por `npm audit` implicaba degradaciones mayores e incompatibles de ESLint y sus plugins; no se aplicó `audit fix --force`.

**Resuelto en la integración (2026-11-03):** `package.json` añade `"overrides": { "minimatch": "^11.0.4" }`, que sustituye la copia transitiva 10.2.6 por la versión corregida sin tocar ESLint ni sus plugins. Validado: ESLint sigue detectando errores, respeta `ignores` (no analiza `dist/`) y recorre los mismos 41 archivos; `npm audit` completo notifica **0 vulnerabilidades**. Si una versión futura de ESLint ya depende de minimatch ≥ 11.0.1, el override puede retirarse.

Gitleaks 8.30.1, descargado del release oficial y comprobado contra su SHA-256, no detectó secretos en el historial inicial ni en los archivos del trabajo revisados. Se usó salida redactada. Un escáner no demuestra ausencia absoluta de secretos.

## Antes de un alojamiento público

Se requiere autorización y configuración del proveedor. Activar HTTPS y encabezados apropiados (incluidos política de contenido, protección contra framing y `nosniff`) en el alojamiento elegido, preservando el Referer requerido por OpenStreetMap. Esta versión no presume que un archivo de encabezados de un proveedor funcione en otro.

`noindex` no es autenticación. La privacidad del alojamiento, retención de logs y canal de contacto deben definirse antes de publicar.

`.github/workflows/pages.yml` prepara GitHub Pages **solo con ejecución manual** desde `main` (`workflow_dispatch`); no se activa con push ni PR, sale con `noindex` salvo que se marque la casilla de indexación y usa permisos `pages: write`/`id-token: write` únicamente en el trabajo de despliegue. Un sitio de GitHub Pages es **público** aunque el repositorio sea privado (salvo GitHub Enterprise Cloud con visibilidad privada), y en repositorios privados Pages requiere un plan de pago. GitHub Pages no permite encabezados HTTP personalizados (CSP, framing); si se requieren, usar otro alojamiento o un proxy.
