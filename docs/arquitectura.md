# Arquitectura

Astro estático con TypeScript estricto y CSS compartido. No hay servidor de aplicación, cuentas, base de datos ni servicios de pago. La navegación y el contenido usan HTML; menú, búsqueda y mapa tienen mejora progresiva.

`src/pages` define rutas; `src/components` agrupa interfaz reutilizable; `src/layouts` contiene el documento y navegación; `src/lib` separa funciones puras, catálogo y metadatos de imágenes. Las colecciones de contenido incorporarán territorios, fuentes y destinos con validación al compilar. Los identificadores editoriales no dependen de nombres visuales.

El mapa se cargará bajo demanda. Las imágenes son locales y Astro genera variantes optimizadas. Las fuentes tipográficas son del sistema, sin llamadas externas.

Una futura base de datos sustituirá el acceso al contenido, no los componentes. Antes de escalar a miles de destinos medir tamaño del índice y compilación; introducir paginación o índices segmentados cuando los datos lo requieran.

No hay recurso oficial de Blue. `BlueGuide` no genera interfaz si no recibe una imagen oficial.
