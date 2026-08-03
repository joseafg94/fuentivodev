# ADDING_PROJECTS.md — Cómo Agregar un Nuevo Proyecto al Portafolio

Este documento es el que se activa cada vez que José dice algo como _"Agrega esta nueva web
al portafolio"_ o _"Quiero añadir otro proyecto"_. El portafolio es un sistema extensible,
no una lista escrita a mano — este flujo existe para que agregar contenido nunca implique
rediseñar nada.

---

## 1. Antes de escribir código

1. Releer `docs/CONTENT_MODEL.md` (interfaz `Project` completa).
2. Revisar 1–2 proyectos ya existentes en `content/projects/` como referencia directa de
   formato y nivel de detalle.
3. Identificar la categoría correcta (`web` · `system` · `application` · `automation` ·
   `product` · `experiment`) — ver `docs/PROJECT_CONTEXT.md §7` para criterios.
4. Confirmar si el proyecto es `featured` (aparecerá en Inicio) o no.

---

## 2. Información mínima que José debe proveer

```
Tipo/categoría: <web | system | application | automation | product | experiment>
Nombre: <nombre>
Slug: <slug-en-minusculas>
Descripción corta: <1 línea>
Cliente: <nombre o "proyecto interno">
Industria: <industria>
Año: <año>
Estado: <published | in-progress | concept | archived>
¿Destacado?: <sí/no>
URL publicada: <url o "no aplica">
Problema: <descripción real>
Solución: <descripción real>
Resultados: <solo si son reales y verificables; si no, se omite el campo>
Tecnologías: <lista>
Imágenes: <ruta o descripción de lo que se subirá>
```

Si falta información crítica (ej. no está claro el problema/solución real), el agente debe
preguntar antes de inventar contenido — nunca rellenar huecos con suposiciones.

---

## 3. Pasos de implementación (obligatorios, en orden)

1. Crear `content/projects/<slug>.ts` respetando la interfaz `Project` exactamente.
2. Escribir **ambos idiomas** (`es` y `en`) para cada campo `LocalizedText` — ver
   `docs/INTERNATIONALIZATION.md §4` sobre calidad de traducción.
3. Optimizar imágenes y ubicarlas en `public/projects/<slug>/` (ver
   `docs/PERFORMANCE_RULES.md §2`).
4. Agregar el proyecto al registro central `content/projects/index.ts`.
5. Completar `seo.es` y `seo.en` (título, descripción, imagen) — ver
   `docs/SEO_ACCESSIBILITY.md §3`.
6. Confirmar que `/proyectos/<slug>` (y `/en/proyectos/<slug>` si aplica) carga
   correctamente y que el proyecto aparece en `/proyectos` y, si corresponde, en `/webs` o
   en Inicio (si es `featured`).
7. Ejecutar `lint`, `type-check`, `build`.
8. Verificar visualmente: desktop, mobile, `reduced-motion`, ES y EN.
9. No modificar componentes globales (Header, Footer, Hero, ProjectCard) salvo necesidad real
   y explícitamente señalada por José.

---

## 4. Prohibido en este flujo

- Crear una tarjeta manual en Inicio en vez de usar `featured: true` + el helper
  `getFeaturedProjects()`.
- Duplicar `ProjectCard` u otro componente para "que se vea distinto" este proyecto.
- Inventar `results` o `testimonial` que no fueron provistos.
- Asignar `client` a un proyecto que en realidad es interno/concepto.
- Dejar el proyecto en un solo idioma "por ahora".
- Omitir la optimización de imágenes "porque son pocas".

---

## 5. Checklist final (copiar antes de cerrar la tarea)

- [ ] Usa la interfaz `Project` oficial sin campos inventados.
- [ ] Slug único, en minúsculas.
- [ ] Aparece en el listado y filtro de categoría correctos.
- [ ] Aparece en Inicio si `featured: true`.
- [ ] Página dinámica carga en ES y EN, sin secciones vacías visibles.
- [ ] Metadata SEO completa en ambos idiomas.
- [ ] Imágenes optimizadas, con `alt` en ambos idiomas.
- [ ] No se inventaron resultados ni cliente.
- [ ] No se duplicaron componentes.
- [ ] Desktop, mobile y reduced motion verificados.
- [ ] Lint, type-check y build en verde.
- [ ] Diseño global (Header/Footer/Hero) intacto.

Ver el checklist consolidado de todo el sitio en `docs/ACCEPTANCE_CHECKLIST.md`.

---

## 6. Prompt listo para pegar en el agente

```
Agrega un nuevo proyecto al portafolio de Fuentivo siguiendo exactamente
docs/ADDING_PROJECTS.md y la interfaz Project de docs/CONTENT_MODEL.md.

Tipo/categoría: <...>
Nombre: <...>
Slug: <...>
Descripción corta: <...>
Cliente: <...>
Industria: <...>
Año: <...>
Estado: <...>
¿Destacado?: <...>
URL publicada: <...>
Problema: <...>
Solución: <...>
Resultados: <...>
Tecnologías: <...>
Imágenes: <...>

Escribe todo el contenido en español e inglés. No inventes resultados que no te di. No
dupliques componentes existentes. No cambies el diseño global. Genera metadata SEO en
ambos idiomas. Ejecuta lint, type-check y build, y verifica desktop, mobile y reduced
motion antes de darlo por terminado. Confirma contra el checklist de
docs/ADDING_PROJECTS.md §5 antes de cerrar la tarea.
```
