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
Lee completamente, en este orden:

1. AGENTS.md
2. rules-workspace.md
3. docs/PROJECT_CONTEXT.md
4. docs/ARCHITECTURE_RULES.md
5. docs/CONTENT_MODEL.md
6. docs/UI_GUIDELINES.md
7. docs/PERFORMANCE_RULES.md
8. docs/INTERNATIONALIZATION.md
9. docs/SEO_ACCESSIBILITY.md
10. docs/DEVELOPMENT_WORKFLOW.md
11. docs/ACCEPTANCE_CHECKLIST.md

Antes de modificar código, inspecciona el estado actual del repositorio y reporta cualquier
contradicción entre la implementación existente y la documentación.

Implementa únicamente la Fase 0: fundamento técnico del proyecto. No construyas todavía la
Home, Header, Footer, páginas de servicio, páginas de proyectos ni componentes editoriales.

Objetivos:

1. Configurar Next.js con App Router, React y TypeScript estricto.
2. Configurar Tailwind CSS siguiendo el mecanismo recomendado por la versión instalada.
3. Configurar shadcn/ui.
4. Instalar y configurar Motion mediante `motion/react`.
5. Configurar la infraestructura base de `next-intl`.
6. Usar prefijos obligatorios `/es` y `/en`; `/` debe redirigir a `/es`.
7. Preparar rutas localizadas, sin implementar todavía las páginas comerciales completas.
8. Configurar `next/font` para Sora, Inter y Geist Mono con los pesos necesarios.
9. Configurar los tokens oficiales de color, tipografía, espaciado, radios y foco de
   `docs/UI_GUIDELINES.md`.
10. Crear la estructura base de carpetas definida en `docs/ARCHITECTURE_RULES.md`, sin añadir
    archivos especulativos que todavía no tengan función.
11. Configurar alias `@/*`, ESLint, `type-check`, `.env.example`, configuración central
    mínima del sitio, metadata global base, manifest PWA básico, robots y sitemap base sin
    inventar rutas no implementadas.
12. Mantener Server Components por defecto y no usar `use client` salvo necesidad real.
13. No agregar PostHog, Resend, formularios, GSAP, WebGL, Canvas, CMS, base de datos ni Redux.
14. No implementar animaciones visuales; solo dejar Motion instalado y preparado.
15. No crear contenido falso ni placeholders públicos.

Sigue las versiones instaladas y su documentación vigente. No crees `tailwind.config.ts` si
la versión usa configuración CSS-first; no dupliques tokens ni páginas por idioma; no uses
`dynamic()` o `ssr: false` para contenido estático. Documenta cualquier desviación necesaria.

Al terminar ejecuta `pnpm lint`, `pnpm type-check` y `pnpm build`, y entrega el reporte de
Fase 0 definido en este documento sin avanzar a Fase 1.
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
4. Extiende la infraestructura de i18n creada en Fase 0 (`i18n/` + `locales/es` +
   `locales/en`) usando las rutas localizadas definitivas de `docs/INTERNATIONALIZATION.md §2`.

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
Construye app/[locale]/(marketing)/page.tsx siguiendo docs/PROJECT_CONTEXT.md §2 y §5 (embeber
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
(docs/UI_GUIDELINES.md §8). Mantén las secciones editoriales como Server Components. Aplica
lazy loading únicamente a imágenes, galerías o elementos interactivos no críticos.
```

### Fase 4 — Servicios (página propia)

**Prompt:**

```
Construye app/[locale]/(marketing)/services/page.tsx desarrollando en profundidad las 3 líneas de
docs/PROJECT_CONTEXT.md §6. En Automatización, menciona el uso de WhatsApp para
chatbots/atención automatizada como parte de lo que Fuentivo construye para clientes (sin
confundirlo con el WhatsApp de contacto con Fuentivo). Reutiliza componentes existentes.
```

### Fase 5 — Proyectos y Webs (listado + filtros)

**Prompt:**

```
Construye:
1. app/[locale]/(marketing)/projects/page.tsx — listado completo con filtros por categoría (Todos,
   Webs, Sistemas, Aplicaciones, Automatizaciones, Productos), orden por fecha, usando
   lib/projects.ts. Sin paginación por ahora (docs/PERFORMANCE_RULES.md §8), pero preparado
   para agregarla.
2. app/[locale]/(marketing)/websites/page.tsx — misma infraestructura, filtrando category:"web"
   automáticamente, sin duplicar datos.

Usa components/projects/ProjectCard.tsx reutilizable en ambas vistas y en Inicio.
```

### Fase 6 — Ruta dinámica de proyecto (caso de estudio)

**Prompt:**

```
Construye app/[locale]/(marketing)/projects/[slug]/page.tsx siguiendo docs/ARCHITECTURE_RULES.md
§4: busca por slug, genera metadata en el idioma activo (docs/SEO_ACCESSIBILITY.md §3),
muestra solo las secciones con contenido disponible (docs/CONTENT_MODEL.md §3), agrega
proyectos relacionados de la misma categoría, devuelve 404 si el slug no existe.

Verifica el caso de estudio de Meniva completo, en ambos idiomas, sin secciones vacías
visibles.
```

### Fase 7 — Sobre Fuentivo

**Prompt:**

```
Construye app/[locale]/(marketing)/about/page.tsx con el contenido de
docs/PROJECT_CONTEXT.md §10, máximo 3-4 párrafos, presentando a José Fuentes como fundador
de la marca (la marca es protagonista). Sin inventar premios, clientes o cifras.
```

### Fase 8 — Contacto (formulario + WhatsApp)

**Prompt:**

```
Construye app/[locale]/(marketing)/contact/page.tsx y app/api/contact/route.ts siguiendo
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
Crea app/[locale]/(marketing)/privacy/page.tsx con una política de privacidad estándar y clara.

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
