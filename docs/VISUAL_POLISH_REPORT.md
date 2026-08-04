# Reporte de refinamiento visual

Fecha: 3 de agosto de 2026

## Resultado

El pase mantiene la identidad, el contenido, las rutas y la arquitectura existentes. Se unificó el ritmo vertical de los heroes, se reforzó la jerarquía visual con ilustraciones contextuales ligeras y se ajustaron detalles de lectura, movimiento e imágenes sin agregar dependencias ni convertir nuevas secciones en Client Components.

## Cambios aplicados

- Se creó `PageHero` como patrón reutilizable para Servicios, Proyectos, Webs, Sobre Fuentivo y Contacto. Cada variante usa el mismo sistema de superficie, borde, radio y color, con una composición contextual distinta y decorativa.
- Se aumentó y normalizó la separación entre el Header y los heroes. El mismo ritmo se aplicó a Privacidad y al hero reutilizable de los casos de estudio.
- En Home, la composición visual derecha se elevó en desktop para alinearla con el bloque editorial. El texto entra por grupos —eyebrow, título, descripción y acciones— entre 650 y 870 ms; el CTA no queda bloqueado.
- El logo oficial `app/icon.svg` sustituyó el símbolo provisional del componente `Logo`, por lo que Header y Footer usan ahora una única fuente visual. Sobre Fuentivo reutiliza ese mismo asset en una composición de marca con ejes, órbita y resplandor contenidos.
- En Servicios, “Resultado buscado” dejó de ocupar toda la altura de la tarjeta y pasó a un bloque compacto alineado al inicio. Los párrafos editoriales largos se justifican solamente desde `md`, con separación silábica; en mobile conservan alineación izquierda.
- En Sobre Fuentivo, título y texto de los bloques editoriales comparten fila de grid y parten de la misma línea visual. Las tarjetas de principios reutilizan el patrón de interacción existente.
- Se unificaron entradas y microinteracciones con transformaciones y opacidad. La navegación añade una señal de hover coherente; no se añadieron loops, parallax ni animaciones dependientes de JavaScript.
- `prefers-reduced-motion` elimina entradas, desplazamientos y escalados, y mantiene todo el contenido visible inmediatamente.
- `ProjectCard` usa ahora la proporción real 4:3 de los assets de Meniva, `sizes` adaptable y calidad 90 permitida centralmente por Next Image. `FeaturedProjects` define el tamaño apropiado para la tarjeta amplia de Home; el patrón queda disponible para proyectos futuros.
- No se modificaron copy, datos de Meniva, metadata, helpers de rutas, traducciones, SEO, formulario ni modelo de proyectos.

## Verificación visual y funcional

- Revisado en Home, Servicios, Proyectos, Webs, Meniva, Sobre Fuentivo, Contacto y Privacidad.
- Revisado en ES y EN, desktop y mobile; comprobaciones específicas en 320, 375, 768, 1024 y 1440 px.
- Confirmados: ausencia de desbordamiento horizontal en las vistas inspeccionadas, un solo `h1`, foco visible, navegación móvil con Escape y retorno de foco, contenido funcional sin hover y reglas de reduced motion.
- Producción local: las 16 rutas públicas localizadas respondieron `200` y mostraron un solo `h1`; el slug inexistente respondió `404`; `/` respondió `307` hacia `/es`; sitemap, robots y manifest respondieron `200`.
- La miniatura de Meniva se comprobó contra el asset 1448 × 1086 y Next Image genera fuentes responsivas con calidad 90.

## Validación técnica

- Lint: aprobado.
- Type-check: aprobado.
- Tests: 25/25 aprobados en 3 archivos.
- Build de producción: aprobado; 22 páginas estáticas generadas.
- `git diff --check`: aprobado.
- Revisión React: `PageHero` permanece como Server Component, no introduce hooks ni estado cliente, conserva `next/image` y no amplía los límites de hidratación.

El primer intento de build no pudo descargar Sora, Inter y Geist Mono por la restricción de red del sandbox; al permitir esa descarga de `next/font`, el build terminó correctamente. El wrapper de `pnpm test` solicitó purgar `node_modules` sin TTY, por lo que la misma suite se ejecutó directamente mediante el binario local de Vitest; lint, TypeScript y Next se validaron del mismo modo contra las dependencias bloqueadas del proyecto.

## Checklist de aceptación

- Arquitectura y reutilización: cumplido.
- Sistema visual, tokens y tipografía: cumplido.
- ES y EN: cumplido.
- Responsive y 320 px: cumplido.
- Accesibilidad, teclado, foco y reduced motion: cumplido.
- Imágenes, dimensiones y carga responsiva: cumplido.
- Rutas, 404, SEO, sitemap, robots y listado de proyectos: cumplido.
- Lint, type-check, tests y build: cumplido.
- Dependencias nuevas, contenido inventado o cambios de alcance: no aplica; no se introdujeron.

## Riesgos restantes

No se ejecutó una nueva medición de Lighthouse porque el alcance fue un pase visual y no se añadieron scripts, fuentes ni dependencias. La calidad 90 se limita a las miniaturas de proyectos para conservar la legibilidad de interfaces dentro de las imágenes; conviene vigilar su peso cuando el catálogo crezca.
