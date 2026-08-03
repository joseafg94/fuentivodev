# DEVELOPMENT_WORKFLOW.md — Flujo de Trabajo y Plan de Desarrollo (Fuentivo Web)

Este documento reemplaza al antiguo `DEVELOPMENT_PLAN.md`. Cubre dos cosas: (1) cómo debe
comportarse el agente en **cualquier** tarea de desarrollo, y (2) el plan de fases con
prompts listos para construir la V1 desde cero.

Las tareas recurrentes (agregar un proyecto nuevo, mejorar una sección visual) **no** viven
aquí — están en `docs/ADDING_PROJECTS.md` y `docs/UI_GUIDELINES.md §14` respectivamente.

---

## 1. Flujo estándar para cualquier tarea

1. Leer `AGENTS.md` → `rules-workspace.md` → los docs específicos de la tarea.
2. Revisar 1–2 implementaciones existentes similares como referencia de patrón.
3. Planificar el cambio en pasos pequeños y verificables (no un solo commit gigante).
4. Implementar.
5. Ejecutar `lint`, `type-check`, `build`.
6. Verificar visualmente: desktop, mobile, `reduced-motion`, ES y EN.
7. Confirmar que no se rompieron rutas, SEO ni el listado de proyectos.
8. Pasar `docs/ACCEPTANCE_CHECKLIST.md` completo.
9. Resumir el cambio en español, claro y específico (qué se hizo, qué se decidió y por qué).

---

## 2. Plan de fases — construcción de la V1

Ejecutar en orden. No saltar una fase antes de cerrar la anterior con su checklist.

### Fase 0 — Setup del proyecto

**Prompt:**

```
Lee AGENTS.md, rules-workspace.md, docs/PROJECT_CONTEXT.md, docs/ARCHITECTURE_RULES.md y
docs/UI_GUIDELINES.md completos antes de escribir código.

Crea un proyecto Next.js (App Router) con TypeScript, Tailwind CSS y shadcn/ui, siguiendo
exactamente la estructura de carpetas de docs/ARCHITECTURE_RULES.md §2.

Configura en tailwind.config.ts la paleta "fuentivo" de docs/UI_GUIDELINES.md §2, y las
variables CSS del mismo apartado en globals.css.

Configura next/font para Sora, Inter y Geist Mono según docs/PERFORMANCE_RULES.md §3.

Solo el esqueleto, el sistema de diseño (colores, tipografía, espaciado) y layout.tsx base.
Ejecuta lint, type-check y build, y confírmame que pasan.
```

### Fase 1 — Header, Footer y navegación (incluye toggle ES/EN)

**Prompt:**

```
Usando docs/UI_GUIDELINES.md §6-7 y docs/INTERNATIONALIZATION.md, construye:

1. components/layout/Header.tsx (desktop y mobile): logo, enlaces a Servicios, Proyectos,
   Sobre Fuentivo, Contacto, botón "Solicitar diagnóstico", toggle ES/EN (texto simple, sin
   banderas). Semitransparente + blur al hacer scroll.
2. components/layout/Footer.tsx según docs/UI_GUIDELINES.md §6.
3. components/layout/MobileNav.tsx con menú completo + botón de WhatsApp visible.
4. La infraestructura mínima de i18n (lib/i18n.ts + locales/es + locales/en). Decide y
   documenta en un comentario si usas prefijo de ruta /en o toggle sin cambio de ruta, según
   docs/INTERNATIONALIZATION.md §2.

Verifica reduced motion, mobile y ambos idiomas antes de terminar.
```

### Fase 2 — Sistema de proyectos (modelo de datos + registro)

**Prompt:**

```
Implementa exactamente la interfaz Project de docs/CONTENT_MODEL.md en content/projects/
(un archivo por proyecto + index.ts como registro central), y los helpers en
lib/projects.ts: getFeaturedProjects(), getProjectsByCategory(category), getProjectBySlug(slug).

Crea el primer proyecto real: content/projects/meniva.ts, usando el contenido de
docs/PROJECT_CONTEXT.md §9 en ambos idiomas, sin inventar cifras ni resultados no
documentados — si un campo opcional no tiene información real, omítelo.

Solo el modelo de datos y los helpers, con type-check en verde.
```

### Fase 3 — Página de Inicio

**Prompt:**

```
Construye app/(marketing)/page.tsx siguiendo docs/PROJECT_CONTEXT.md §2 y §5 (embeber
WhatsApp/Yappy con naturalidad en "Cómo trabajamos", nunca como sección aislada de pagos):

1. Hero — animación protagonista de docs/UI_GUIDELINES.md §8. Titular: "Creamos soluciones
   digitales que hacen avanzar tu negocio." CTA principal "Solicitar diagnóstico", CTA
   secundario "Ver proyectos".
2. Problemas que resolvemos.
3. Servicios (docs/PROJECT_CONTEXT.md §6, por resultado, no solo entregable).
4. Proyectos destacados — usa lib/projects.ts getFeaturedProjects(), nunca una tarjeta
   escrita a mano.
5. Cómo trabajamos (Diagnóstico → Estrategia → Diseño → Desarrollo → Lanzamiento → Mejora),
   integrando WhatsApp y Yappy de forma natural.
6. Por qué Fuentivo.
7. CTA final con botón de WhatsApp (mensaje precargado de docs/PROJECT_CONTEXT.md §5).

Todo en ambos idiomas. Patrones de animación consistentes entre secciones
(docs/UI_GUIDELINES.md §8). Lazy-load de secciones bajo el pliegue
(docs/PERFORMANCE_RULES.md §5).
```

### Fase 4 — Servicios (página propia)

**Prompt:**

```
Construye app/(marketing)/servicios/page.tsx desarrollando en profundidad las 3 líneas de
docs/PROJECT_CONTEXT.md §6. En Automatización, menciona el uso de WhatsApp para
chatbots/atención automatizada como parte de lo que Fuentivo construye para clientes (sin
confundirlo con el WhatsApp de contacto con Fuentivo). Reutiliza componentes existentes.
```

### Fase 5 — Proyectos y Webs (listado + filtros)

**Prompt:**

```
Construye:
1. app/(marketing)/proyectos/page.tsx — listado completo con filtros por categoría (Todos,
   Webs, Sistemas, Aplicaciones, Automatizaciones, Productos), orden por fecha, usando
   lib/projects.ts. Sin paginación por ahora (docs/PERFORMANCE_RULES.md §8), pero preparado
   para agregarla.
2. app/(marketing)/webs/page.tsx — misma infraestructura, filtrando category:"web"
   automáticamente, sin duplicar datos.

Usa components/projects/ProjectCard.tsx reutilizable en ambas vistas y en Inicio.
```

### Fase 6 — Ruta dinámica de proyecto (caso de estudio)

**Prompt:**

```
Construye app/(marketing)/proyectos/[slug]/page.tsx siguiendo docs/ARCHITECTURE_RULES.md
§4: busca por slug, genera metadata en el idioma activo (docs/SEO_ACCESSIBILITY.md §3),
muestra solo las secciones con contenido disponible (docs/CONTENT_MODEL.md §3), agrega
proyectos relacionados de la misma categoría, devuelve 404 si el slug no existe.

Verifica el caso de estudio de Meniva completo, en ambos idiomas, sin secciones vacías
visibles.
```

### Fase 7 — Sobre Fuentivo

**Prompt:**

```
Construye app/(marketing)/sobre-fuentivo/page.tsx con el contenido de
docs/PROJECT_CONTEXT.md §10, máximo 3-4 párrafos, presentando a José Fuentes como fundador
de la marca (la marca es protagonista). Sin inventar premios, clientes o cifras.
```

### Fase 8 — Contacto (formulario + WhatsApp)

**Prompt:**

```
Construye app/(marketing)/contacto/page.tsx y app/api/contact/route.ts siguiendo
docs/ARCHITECTURE_RULES.md §9: formulario (Nombre, Negocio/empresa, WhatsApp o correo,
"¿Qué necesitas?"), validado con Zod + React Hook Form, enviado vía Resend (variables de
entorno, sin claves hardcodeadas).

Agrega rate limiting básico (docs/PERFORMANCE_RULES.md §4 y §10).

Incluye el botón de WhatsApp con mensaje precargado de docs/PROJECT_CONTEXT.md §5, y una
mención breve y natural de Yappy como método de pago aceptado (texto simple, sin componente
interactivo).
```

### Fase 9 — Privacidad, SEO técnico y sitemap

**Prompt:**

```
Crea app/(marketing)/privacidad/page.tsx con una política de privacidad estándar y clara.

Implementa SEO técnico completo según docs/SEO_ACCESSIBILITY.md: metadata única por página
en ambos idiomas, sitemap.xml dinámico incluyendo todos los proyectos y ambas variantes de
idioma si aplica, robots.txt, Open Graph, datos estructurados donde corresponda.
```

### Fase 10 — Pase de animación y microinteracciones

**Prompt:**

```
Revisa todas las páginas construidas contra docs/UI_GUIDELINES.md §8-11. Confirma: una sola
animación protagonista (Hero), dos patrones secundarios consistentes en todas las secciones,
prefers-reduced-motion respetado sin pérdida de funcionalidad, ninguna animación bloquea
lectura, scroll o CTAs. Ajusta lo necesario sin librerías nuevas no autorizadas.
```

### Fase 11 — Accesibilidad y performance final

**Prompt:**

```
Audita el sitio completo contra docs/PERFORMANCE_RULES.md §11 y docs/SEO_ACCESSIBILITY.md
§5-6: corre Lighthouse en mobile por página principal, corrige imágenes sin optimizar, CLS
visible o scripts bloqueantes. Confirma navegación por teclado y foco visible en todo
elemento interactivo, incluyendo el toggle de idioma y el formulario. Repórtame resultados
de Lighthouse antes/después.
```

### Fase 12 — QA final y deploy

**Prompt:**

```
Ejecuta el checklist completo de docs/ACCEPTANCE_CHECKLIST.md sobre todo el sitio. Prepara
el proyecto para deploy en Vercel (variables de entorno en .env.example, sin secretos en el
repo). Indícame qué variables de entorno debo configurar manualmente en Vercel antes del
primer deploy.
```

---

## 3. Tareas recurrentes (no son "fases", se repiten en el tiempo)

- **Agregar un proyecto nuevo** → `docs/ADDING_PROJECTS.md` (prompt incluido ahí).
- **Mejorar una sección visualmente** → `docs/UI_GUIDELINES.md §14` (prompt sugerido: _"Quiero
  mejorar visualmente la sección `<nombre>`. Sigue docs/UI_GUIDELINES.md §14..."_).
- **Optimizar rendimiento de algo puntual** → `docs/PERFORMANCE_RULES.md`.
- **Revisar SEO/accesibilidad de una página existente** → `docs/SEO_ACCESSIBILITY.md`.
