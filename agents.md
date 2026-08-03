# AGENTS.md

Este archivo es lo primero que debe leer cualquier agente de IA (Codex, Claude Code, etc.)
al abrir este repositorio. Es la puerta de entrada, no el detalle — el detalle vive en
`rules-workspace.md` y en `docs/`.

## Lectura obligatoria, en este orden, antes de cualquier tarea

1. `rules-workspace.md` — reglas no negociables y flujo de trabajo.
2. `docs/PROJECT_CONTEXT.md` — qué es Fuentivo, marca, servicios, audiencia.
3. `docs/ARCHITECTURE_RULES.md` — stack, carpetas, rutas.
4. `docs/CONTENT_MODEL.md` — modelo de datos de proyectos (`Project`, `LocalizedText`).
5. `docs/UI_GUIDELINES.md` — identidad visual, componentes, animación.
6. `docs/PERFORMANCE_RULES.md` — rendimiento y escalabilidad.
7. `docs/INTERNATIONALIZATION.md` — reglas de bilingüe ES/EN.
8. `docs/SEO_ACCESSIBILITY.md` — SEO técnico y accesibilidad.

## Según el tipo de tarea, además

- **Agregar un proyecto nuevo al portafolio** → `docs/ADDING_PROJECTS.md`.
- **Cualquier tarea de desarrollo (fix, feature, sección nueva)** → `docs/DEVELOPMENT_WORKFLOW.md`.
- **Antes de dar cualquier tarea por terminada** → `docs/ACCEPTANCE_CHECKLIST.md`. Ninguna
  tarea se considera terminada sin pasar ese checklist completo.

## Reglas de oro (resumen — el detalle está en cada doc)

- Nunca improvises fuera de lo documentado: si el usuario pide algo que contradice un doc,
  dilo explícitamente antes de proceder.
- Nunca dupliques componentes, colores o patrones de animación existentes.
- Nunca entregues contenido en un solo idioma (ES y EN son obligatorios los dos).
- Nunca inventes clientes, resultados o métricas.
- Nunca omitas lint, type-check, build y verificación mobile/reduced-motion antes de cerrar
  una tarea.

Si algún doc referenciado aquí todavía no existe en el repo, el agente debe decirlo en vez
de asumir contenido o inventar reglas por su cuenta.
