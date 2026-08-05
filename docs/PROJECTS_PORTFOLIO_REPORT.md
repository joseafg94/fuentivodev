# Reporte de incorporación de proyectos

Fecha: 5 de agosto de 2026

## 1. Resumen de la implementación

Se integraron Altura Arquitectura, Scope, Ordena y Splitly en el catálogo central tipado. Los cuatro proyectos usan la ruta dinámica existente, contenido ES/EN, demo pública, metadata localizada, datos estructurados, sitemap derivado y assets WebP reales. No se crearon rutas, tarjetas ni catálogos paralelos.

## 2. Archivos creados

- `content/projects/altura-arquitectura.ts`
- `content/projects/scope.ts`
- `content/projects/ordena.ts`
- `content/projects/splitly.ts`
- `components/projects/ProjectImage.tsx`
- `docs/PROJECTS_PORTFOLIO_REPORT.md`

## 3. Archivos modificados

- Modelo y catálogo: `content/projects/schema.ts`, `content/projects/index.ts`, `content/projects/meniva.ts`, `lib/projects.ts`.
- Renderizado: `ProjectCard`, `ProjectGrid`, `FeaturedProjects`, `ProjectCaseStudy` y la ruta dinámica `[slug]`.
- SEO: `lib/seo.ts`, ruta dinámica y pruebas de sitemap/metadata.
- Idiomas: `locales/es/common.json` y `locales/en/common.json`.
- Documentación: `CONTENT_MODEL.md`, `ARCHITECTURE_RULES.md` y `ADDING_PROJECTS.md`.
- Tests: `tests/projects.test.ts` y `tests/seo.test.ts`.
- Assets: los ocho WebP de los cuatro proyectos fueron normalizados u optimizados; no se generaron imágenes nuevas.

## 4. Estructura del catálogo y clasificación

Se mantuvo un archivo por proyecto en `content/projects/` y un registro explícito único en `content/projects/index.ts`.

| Proyecto | Categoría | Tipo comercial | Estado | Destacado | Orden |
| --- | --- | --- | --- | --- | ---: |
| Altura Arquitectura | `web` | `concept` | `published` | Sí | 1 |
| Scope | `product` | `concept` | `published` | Sí | 2 |
| Ordena | `system` | `internal-project` | `published` | Sí | 3 |
| Splitly | `application` | `mvp` | `published` | Sí | 4 |
| Meniva | `product` | `saas` | `published` | Sí | Sin orden |

`published` expresa que la demo está desplegada, no que exista un cliente. Ninguno de los cuatro proyectos incluye `client`, resultados, métricas, testimonios ni repositorio.

## 5. Migración mínima del modelo y Zod

La documentación reconocía una taxonomía comercial, pero la interfaz y Zod no la implementaban. Se agregó una única propiedad `commercialType`, con los valores aprobados `client`, `internal-project`, `saas`, `concept`, `redesign` y `mvp`; `commercialLabel` conserva la etiqueta editorial localizada sin sustituir la taxonomía.

También se añadió:

- `featuredOrder?: number`, entero positivo y válido solo con `featured: true`;
- imágenes tipadas con `src`, dimensiones, `alt` ES/EN, proporción y `objectPosition` opcional;
- servicios como `LocalizedText[]`, porque ahora se muestran en los casos ES/EN;
- validación estricta de todas estas estructuras.

Meniva conserva estado y `featured`; solo se migró al nuevo contrato con tipo `saas`, servicios localizados e imágenes tipadas.

## 6. Orden de destacados

`getFeaturedProjects(limit?)` ordena de menor a mayor por `featuredOrder`; los proyectos sin orden aparecen después usando el criterio central existente. El resultado es Altura, Scope, Ordena, Splitly y Meniva. La Home no tenía límite, por lo que muestra los cinco sin hardcodear nombres.

## 7. Componentes reutilizados y sistema de imágenes

Se reutilizaron `ProjectCard`, `ProjectGrid`, `FeaturedProjects`, `ProjectFilters`, `ProjectCaseStudy`, `ContactCTA` y la ruta dinámica. `ProjectImage` centraliza `next/image`, dimensiones naturales, `sizes`, `alt`, proporción, posición, prioridad y calidad 90; solo el cover LCP usa prioridad.

Los thumbnails quedaron en 4:3 y los covers en 16:9. El espacio queda reservado antes de cargar, no hay placeholder borroso ni escala permanente, y los recortes ya no dependen de `object-cover` para corregir proporciones incompatibles.

## 8. Assets localizados y verificados

El repositorio solo contenía los ocho WebP ya nombrados como `thumbnail.webp` y `cover.webp`; no había originales adicionales. Las dimensiones y pesos originales corresponden a esos archivos antes de este pase.

| Proyecto | Fuentes existentes | Originales | Thumbnail final | Peso | Cover final | Peso | Logo / nitidez |
| --- | --- | --- | --- | ---: | --- | ---: | --- |
| Altura Arquitectura | `thumbnail.webp`, `cover.webp` | 1672×941 / 1491×1055 | `public/projects/altura-arquitectura/thumbnail.webp`, 1407×1055 | 260,652 B | `public/projects/altura-arquitectura/cover.webp`, 1672×940 | 228,010 B | Logo A correcto; nítido en desktop y mobile |
| Scope | `thumbnail.webp`, `cover.webp` | 1491×1055 / 1672×941 | `public/projects/scope/thumbnail.webp`, 1407×1055 | 167,868 B | `public/projects/scope/cover.webp`, 1407×791 | 138,910 B | S con cuatro esquinas correcta; nítido en desktop y mobile |
| Ordena | `thumbnail.webp`, `cover.webp` | 1491×1055 / 1672×941 | `public/projects/ordena/thumbnail.webp`, 1407×1055 | 161,316 B | `public/projects/ordena/cover.webp`, 1672×941 | 156,590 B | Tres barras azules correctas; nítido en desktop y mobile |
| Splitly | `thumbnail.webp`, `cover.webp` | 1491×1055 / 1672×941 | `public/projects/splitly/thumbnail.webp`, 1407×1055 | 220,102 B | `public/projects/splitly/cover.webp`, 1672×941 | 209,532 B | Nodos morados y punto lima correctos; nítido en desktop y mobile |

En Altura se intercambiaron los encuadres: el archivo originalmente ancho pasó a cover y la composición originalmente más alta pasó a thumbnail. El cover original de Scope tenía un símbolo de tres barras incorrecto; como no existía otro cover aprobado, el cover final es un recorte 16:9 del thumbnail correcto. Todos los WebP se optimizaron a calidad 94 sin ampliar ningún original; existen los cuatro thumbnails y cuatro covers finales.

## 9. Rutas, filtros y enlaces

Las ocho rutas dinámicas respondieron 200 y contienen un solo H1:

- `/es/proyectos/altura-arquitectura` ↔ `/en/projects/altura-arquitectura`
- `/es/proyectos/scope` ↔ `/en/projects/scope`
- `/es/proyectos/ordena` ↔ `/en/projects/ordena`
- `/es/proyectos/splitly` ↔ `/en/projects/splitly`

El catálogo contiene los cinco proyectos públicos. Webs contiene únicamente Altura; las categorías comprobadas por helper son Altura→Web, Scope→Producto, Ordena→Sistema y Splitly→Aplicación. Las demos proporcionadas respondieron HTTP 200 y conservan `target="_blank"` con `rel="noopener noreferrer"`. Altura usa “Visitar sitio / Visit website”; los otros tres usan “Abrir demo / Open demo”.

## 10. Metadata, structured data y sitemap

Cada ruta genera title, description, canonical, alternates ES/EN, Open Graph, Twitter y robots desde los datos del proyecto. Los covers son la imagen social y usan alt localizado.

- Altura: `WebSite` + `BreadcrumbList`.
- Scope, Ordena y Splitly: `SoftwareApplication` + `BreadcrumbList`.
- No se añadieron ratings, reviews, offers, precios, usuarios ni métricas.

El sitemap sigue derivándose del catálogo y contiene automáticamente las ocho URLs localizadas. Un slug desconocido devuelve 404.

## 11. Tests y comandos

Se ampliaron las pruebas para Zod, bilingüe obligatorio, slugs, categorías, tipos comerciales, estado, `featuredOrder`, orden y límite de destacados, permanencia de Meniva, helpers, visibilidad, URLs HTTPS, ausencia de cliente/resultados/testimonios, metadata y las ocho entradas del sitemap.

| Comando | Resultado exacto |
| --- | --- |
| `pnpm lint` | Exit 0 — `eslint .` |
| `pnpm type-check` | Exit 0 — `tsc --noEmit` |
| `pnpm test` | Exit 0 — 3 archivos y 40 tests aprobados |
| `pnpm build` | Exit 0 — compilación correcta y 30 páginas estáticas generadas |
| `pnpm test:e2e` | No aplica: el proyecto no define ese script |

## 12. Validación visual

- Breakpoints inspeccionados: 320, 375, 390, 768, 1024, 1280 y 1440 px.
- Home: orden Altura, Scope, Ordena, Splitly, Meniva; thumbnails cargados a calidad 90 con fuente suficiente para su caja.
- Proyectos y Webs: cards, labels comerciales, estados, enlaces, áreas táctiles de 44 px y alt ES/EN.
- Casos: Altura, Scope, Ordena y Splitly en ES/EN; covers, contenido condicional, servicios, funciones, tecnologías, demos, related cuando existe y JSON-LD.
- No hay bloques N/A, cliente, resultados ni testimonios ficticios.
- No se observaron overlays ni errores de consola en las rutas inspeccionadas.

## 13. Checklist de aceptación

| Punto | Estado |
| --- | --- |
| ES y EN completos; traducciones naturales | Cumplido |
| Sin datos inventados; opcionales ausentes omitidos | Cumplido |
| Tokens y patrones visuales existentes | Cumplido |
| Sin componentes duplicados; Header/Footer intactos | Cumplido |
| Reduced motion conservado y sin librerías nuevas | Cumplido por revisión de código; no se emuló en runtime |
| Interfaz Project, slugs y catálogo central | Cumplido |
| Metadata, OG, canonical, alt y un H1 | Cumplido |
| Contraste | Cumplido por reutilización de componentes existentes |
| Navegación por teclado y foco | No verificado en esta ejecución: el navegador integrado no activó eventos de teclado/click |
| Sin dependencias exclusivas de hover | Cumplido |
| Sitemap y robots | Cumplido |
| Imágenes con espacio reservado; sin CLS visible | Cumplido en las vistas inspeccionadas |
| Lazy-load y prioridad de imágenes | Cumplido; prioridad solo en cover LCP |
| Scripts o dependencias de terceros nuevas | No aplica |
| Lighthouse mobile ≥ 90 | No verificado; Lighthouse no está configurado en el repositorio |
| Lint, type-check, test y build | Cumplido |
| Desktop, mobile, rutas y listado | Cumplido salvo la limitación de 320 px indicada abajo |
| Reporte claro en español y fallos explícitos | Cumplido |

## 14. Limitaciones y pendientes

- A 320 px existe un desbordamiento horizontal global de aproximadamente 7 px causado por los controles del Header; no aparece desde 375 px. Esta tarea prohíbe modificar Header, por lo que queda pendiente para un cambio global autorizado.
- El navegador integrado renderizó correctamente el estado inicial de filtros y sus labels, pero no propagó eventos de click o teclado durante esta sesión. La lógica de categorías y conteos está cubierta por tests; la interacción UI y el foco quedan pendientes de una comprobación manual o E2E.
- `prefers-reduced-motion` se confirmó en las reglas existentes, pero no se emuló en runtime.
- No se ejecutó Lighthouse ni existe `test:e2e`.
- Solo Meniva existía como proyecto de datos antes de esta tarea; no fue posible revisar dos proyectos previos independientes. Se usaron Meniva y el sistema dinámico existente como referencias, y los cuatro nuevos mantienen ese patrón.
