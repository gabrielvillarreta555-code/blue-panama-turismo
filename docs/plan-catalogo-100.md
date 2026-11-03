# Plan de ampliación: 100 destinos verificados

Entrega posterior, con revisión editorial. **Nada de este documento se publica en el sitio.** Los nombres de la tabla son _candidatos a investigar_, no fichas: cada uno entra como `borrador` y solo pasa a `publicado` si supera la lista de verificación. Un candidato que no se pueda documentar se descarta o se sustituye; la cifra de 100 es una meta, no una obligación.

## Requisitos de cada ficha

Siguen [criterios-editoriales.md](criterios-editoriales.md) y [modelo-datos.md](modelo-datos.md):

- **Fuentes**: mínimo una oficial (ATP/Visit Panamá, MiAmbiente, UNESCO, ACP, municipio, autoridad comarcal) y, si es posible, otra independiente. URL HTTPS y fecha de consulta.
- **Ubicación**: territorio comprobado con la división político-administrativa vigente (INEC/Gaceta Oficial). Coordenadas solo si una fuente las da o se pueden contrastar; si no, `desconocido` (la ficha no aparece en el mapa).
- **Descripción original**: redactada por el equipo; sin copiar textos de terceros.
- **Fotografía autorizada**: licencia libre verificada (p. ej. Wikimedia Commons CC BY/CC BY-SA/CC0), autor y enlace registrados en `src/lib/photos.ts`, o material propio o cedido por escrito. Sin foto válida, la ficha se publica sin imagen.
- **Datos prácticos**: precio, horario, acceso y servicios solo con fuente fechada; si no, `desconocido`. Revisión periódica de los datos temporales.
- **Comarcas**: no se publica ningún sitio comunitario sin las normas o la autorización de la autoridad tradicional (congresos generales). No se atribuye acceso turístico general a una comunidad.

## Distribución por territorio (meta: 100, incluidas las 4 actuales)

| Territorio        | Meta | Candidatos a investigar (ejemplos)                                                                                                                                                                             |
| ----------------- | ---: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panamá            |   14 | Casco Antiguo, Panamá Viejo, Esclusas de Miraflores, Calzada de Amador, Cerro Ancón, Parque Natural Metropolitano, Parque Nacional Soberanía, Isla Taboga, Archipiélago de las Perlas, Parque Nacional Chagres |
| Chiriquí          |   11 | Boquete ✔, Parque Nacional Volcán Barú, Sendero Los Quetzales, Parque Internacional La Amistad (sector Chiriquí), Cerro Punta, Parque Nacional Marino Golfo de Chiriquí, Playa Las Lajas                       |
| Colón             |    9 | Portobelo ✔, Fuerte San Lorenzo, Esclusas de Agua Clara, Isla Grande, Parque Nacional Portobelo, Achiote                                                                                                       |
| Bocas del Toro    |    9 | Isla Colón, Parque Nacional Marino Isla Bastimentos, Cayos Zapatilla, Playa Estrella, Humedal San San Pond Sak                                                                                                 |
| Veraguas          |    9 | Coiba ✔, Santa Catalina, Parque Nacional Santa Fe, Iglesia de San Francisco de la Montaña, Parque Nacional Cerro Hoya                                                                                          |
| Coclé             |    8 | El Valle de Antón ✔, Parque Arqueológico El Caño, Natá de los Caballeros, Parque Nacional Omar Torrijos (El Copé), La Pintada                                                                                  |
| Los Santos        |    8 | Pedasí, Refugio de Vida Silvestre Isla Iguana, Playa Venao, Isla de Cañas, Villa de Los Santos, Las Tablas                                                                                                     |
| Herrera           |    6 | Parque Nacional Sarigua, Ciénaga de Las Macanas, Parita, Chitré, La Arena                                                                                                                                      |
| Panamá Oeste      |    6 | Parque Nacional Altos de Campana, Punta Chame, playas de Chame y San Carlos                                                                                                                                    |
| Darién            |    6 | Parque Nacional Darién (UNESCO), La Palma, Punta Patiño; revisar avisos de seguridad oficiales antes de cada ficha                                                                                             |
| Guna Yala         |    5 | Sector Cartí y otras islas con hospedaje autorizado según las normas del Congreso General Guna                                                                                                                 |
| Ngäbe-Buglé       |    3 | A identificar con las autoridades comarcales                                                                                                                                                                   |
| Emberá-Wounaan    |    2 | A identificar con las autoridades comarcales (las comunidades emberá visitadas en el Chagres están en la provincia de Panamá, no en la comarca)                                                                |
| Naso Tjër Di      |    2 | A identificar con las autoridades naso                                                                                                                                                                         |
| Guna de Madugandí |    1 | Solo con consulta previa                                                                                                                                                                                       |
| Guna de Wargandí  |    1 | Solo con consulta previa                                                                                                                                                                                       |

✔ = ya publicado. La meta comarcal es un máximo: si no hay información verificable o autorización, se queda en cero y los cupos pasan a provincias.

## Fases

| Lote | Fichas | Contenido                                                                          |
| ---- | -----: | ---------------------------------------------------------------------------------- |
| A    |     24 | Lugares con más fuentes oficiales: áreas protegidas, patrimonio UNESCO, Canal      |
| B    |     24 | Resto de capitales y playas principales de Bocas, Chiriquí, Los Santos y Coclé     |
| C    |     24 | Herrera, Panamá Oeste, Veraguas, Darién; segunda ronda de fotos                    |
| D    |     24 | Comarcas (con autorización) y destinos que sustituyan a los candidatos descartados |

Cada lote: un PR propio con las fichas en `borrador` → revisión editorial (fuentes, derechos de imagen, coherencia territorial) → cambio a `publicado` en un commit aparte → `npm run validate`, `check:links`, `test:seo` y Playwright. Sin publicación automática.

## Preparación técnica recomendada (sin funciones grandes)

- Plantilla JSON de ficha en `docs/` y lista de verificación en la descripción del PR.
- Filtros de búsqueda y región ya escalan; con más de 60 fichas, valorar paginación o agrupación de marcadores en el mapa.
- Hoja de seguimiento editorial (candidato, fuentes, foto, revisor, estado) fuera del repositorio o en issues.
