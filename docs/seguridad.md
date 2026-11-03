# Seguridad y privacidad

## Medidas implementadas

- Sitio estático, sin base de datos, autenticación, formularios de aportes ni endpoints de escritura.
- Contenido revisado mediante PR, esquemas y validación de referencias. Los borradores se excluyen de HTML, índices y mapas.
- URLs de fuentes HTTPS, slugs validados y JSON escapado. Las búsquedas no se insertan como HTML; los popups usan nodos DOM.
- Sin geolocalización, analítica, cookies propias ni almacenamiento de información personal. El mapa avisa antes de contactar al proveedor externo.
- Dependencias fijadas mediante lockfile; CI con permisos de lectura, sin credenciales de despliegue y acciones fijadas por SHA.

## Auditoría del 2026-11-03

`npm audit --omit=dev` no notificó vulnerabilidades. La auditoría completa notificó 12 entradas moderadas derivadas de un mismo aviso en `minimatch`, transitivo de ESLint y typescript-eslint: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No hay avisos altos ni críticos. Afecta al procesamiento de patrones glob en herramientas de desarrollo; no se incluye en el JavaScript del sitio estático.

Las versiones directas instaladas son las actuales consultadas. El arreglo propuesto por `npm audit` implicaba degradaciones mayores e incompatibles de ESLint y sus plugins; no se aplicó `audit fix --force`. Revisar una actualización compatible de la cadena o un override específico validado antes de introducir patrones no confiables. Este aviso permanece abierto y está documentado, no oculto.

Gitleaks 8.30.1, descargado del release oficial y comprobado contra su SHA-256, no detectó secretos en el historial inicial ni en los archivos del trabajo revisados. Se usó salida redactada. Un escáner no demuestra ausencia absoluta de secretos.

## Antes de un alojamiento público

Se requiere autorización y configuración del proveedor. Activar HTTPS y encabezados apropiados (incluidos política de contenido, protección contra framing y `nosniff`) en el alojamiento elegido, preservando el Referer requerido por OpenStreetMap. Esta versión no presume que un archivo de encabezados de un proveedor funcione en otro.

`noindex` no es autenticación. La privacidad del alojamiento, retención de logs y canal de contacto deben definirse antes de publicar. No hay configuración de despliegue en este repositorio.
