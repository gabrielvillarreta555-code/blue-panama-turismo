# Arquitectura

Astro estático con TypeScript estricto y CSS compartido. No hay servidor de aplicación, cuentas, base de datos ni servicios de pago. La navegación y el contenido usan HTML; menú, búsqueda y mapa tienen mejora progresiva.

`src/pages` define rutas; `src/components` agrupa interfaz reutilizable; `src/layouts` contiene el documento y navegación; `src/lib` separa funciones puras, catálogo y metadatos de imágenes. Las colecciones de contenido incorporarán territorios, fuentes y destinos con validación al compilar. Los identificadores editoriales no dependen de nombres visuales.

El mapa se cargará bajo demanda. Las imágenes son locales y Astro genera variantes optimizadas. Las fuentes tipográficas son del sistema, sin llamadas externas.

Una futura base de datos sustituirá el acceso al contenido, no los componentes. Antes de escalar a miles de destinos medir tamaño del índice y compilación; introducir paginación o índices segmentados cuando los datos lo requieran.

No hay recurso oficial de Blue. `BlueGuide` no genera interfaz si no recibe una imagen oficial.

## Exploración

El índice de búsqueda solo serializa destinos publicados y campos mínimos: nombre, regiones y ancestros, categorías, actividades y tipo de costo confirmado. Se genera en la compilación y se incluye en `/explorar/`; no se consulta un servicio externo. Todos los destinos permanecen en el HTML para navegación sin JavaScript. Para miles de fichas se deberá medir y segmentar el HTML/índice.

Los filtros se combinan por intersección; la búsqueda exige todas las palabras en nombre o regiones y normaliza tildes y mayúsculas. Los parámetros son `q`, `region`, `categoria`, `actividad`, `acceso`; los valores no reconocidos se descartan y la consulta se limita a 160 caracteres. El texto nunca se inserta como HTML. Cambios de filtro crean historial; escritura usa reemplazo; atrás/adelante restaura la interfaz.

## Mapa y SEO

Leaflet 1.9.4 (BSD-2-Clause) se importa dinámicamente al pulsar Cargar mapa. Las teselas estándar de OpenStreetMap se solicitan directamente desde el navegador, con su User-Agent, Referer y caché HTTP normal. No hay geolocalización, precarga masiva, proxy de teselas ni descarga offline. La interfaz conserva la lista cuando falla una importación, una tesela o la conexión; una carga superior a 12 segundos ofrece reintento. Los popups se construyen con nodos DOM y `textContent`.

La atribución permanece visible dentro y fuera del mapa. Política consultada: https://operations.osmfoundation.org/policies/tiles/. El servicio es de disponibilidad no garantizada; antes de crecer en tráfico revisar sus condiciones y elegir otro proveedor si es necesario. No se requiere clave. La URL de teselas está concentrada en `src/scripts/map.ts`; cualquier cambio de proveedor debe revisar licencia, atribución y privacidad.

SEO se genera durante la compilación. Solo una URL configurada permite canónicas y datos estructurados con URLs absolutas. La indexación requiere además `SITE_INDEXABLE=true`; el sitemap excluye el 404. Los datos estructurados no contienen precios, horarios, calificaciones ni coordenadas desconocidas. Las regiones sin fotografía documentada no reciben una imagen social de otro territorio.

Las colecciones se validan también antes de cargarse: se comprueban los arrays originales para evitar que una clave repetida quede oculta al convertirlos en un índice. La CI conserva permisos `contents: read` y no contiene despliegues.
