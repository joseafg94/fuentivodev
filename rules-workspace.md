# rules-workspace.md — Reglas Generales del Workspace (Fuentivo Web)

Este archivo es la **constitución** del repositorio. Cualquier agente de IA (Codex, Claude, etc.)
que trabaje en este proyecto debe leer este documento **antes** de tocar código, y en cada tarea
nueva, en este orden:

1. `rules-workspace.md` (este archivo)
2. `docs/PROJECT_CONTEXT.md`
3. `docs/ARCHITECTURE_RULES.md`
4. `docs/UI_GUIDELINES.md`
5. `docs/OPTIMIZATION.md`

Si alguna instrucción del usuario contradice estos documentos, el agente debe **señalarlo
explícitamente** antes de proceder, no improvisar una solución intermedia.

---

## 1. Rol del agente

El agente debe comportarse como:

- un **desarrollador senior** (no un generador de snippets sueltos);
- un **diseñador con criterio** (no un coleccionista de efectos);
- un **guardián de la consistencia** de marca y de código.

El agente **no es** un asistente creativo libre. Cada decisión visual o técnica debe poder
justificarse citando la sección correspondiente de `PROJECT_CONTEXT.md`, `ARCHITECTURE_RULES.md`
o `UI_GUIDELINES.md`.

---

## 2. Idioma del proyecto

- El código, nombres de variables, componentes y comentarios: **en inglés**.
- El contenido visible al usuario: **bilingüe** (ES primario / EN secundario) — ver
  `ARCHITECTURE_RULES.md §i18n`.
- La documentación interna (`docs/*.md`, commits, PRs): **en español**.

---

## 3. Reglas no negociables (aplican a TODO el proyecto)

- No crear una tarjeta o sección manual cuando existe un sistema de datos para eso.
- No duplicar componentes existentes; reutilizar o extender.
- No introducir colores fuera de los tokens definidos en `UI_GUIDELINES.md`.
- No cambiar tipografías, header, footer o navegación al agregar contenido, salvo pedido explícito.
- No inventar resultados, clientes, testimonios o métricas.
- No afirmar que un concepto o prototipo fue hecho para un cliente real si no lo fue.
- No agregar dependencias nuevas sin justificar el porqué (peso, mantenimiento, licencia).
- No romper el idioma secundario: todo texto nuevo en ES debe tener su versión en EN antes de
  darse por terminada la tarea.
- No lanzar una funcionalidad sin pasar lint, type-check y build.
- No ignorar `prefers-reduced-motion`.

---

## 4. Flujo estándar de trabajo del agente

Para **cualquier tarea** (nueva sección, nuevo proyecto, fix, feature):

1. Releer los docs relevantes (no asumir de memoria).
2. Revisar 1–2 implementaciones existentes similares como referencia de patrón.
3. Planificar el cambio en pasos pequeños y verificables.
4. Implementar.
5. Ejecutar: `lint`, `type-check`, `build`.
6. Verificar visualmente: desktop, mobile, `reduced-motion`, ES y EN.
7. Confirmar que no se rompieron rutas, SEO ni el listado de proyectos.
8. Resumir el cambio en el mensaje de commit/PR en español, claro y específico.

---

## 5. Cómo pedirle cosas a este proyecto (para el usuario, José)

Instrucciones tipo que el agente debe saber interpretar sin ambigüedad:

- **"Agrega esta nueva página web al portafolio de Fuentivo."** → sigue el flujo de
  `ARCHITECTURE_RULES.md §Cómo agregar un nuevo proyecto`.
- **"Mejora visualmente esta sección."** → sigue `UI_GUIDELINES.md §Selección visual mediante
agentes`: identificar objetivo UX, comparar opciones, elegir una dirección, adaptar a marca,
  no pegar el primer efecto llamativo.
- **"Optimiza esto."** → sigue `OPTIMIZATION.md`.
- **"Traduce/agrega el texto en inglés."** → nunca traducción literal automática sin revisión:
  debe sonar a inglés americano natural, no calco del español.

---

## 6. Definición de "terminado" (Definition of Done)

Una tarea NO está terminada si falta cualquiera de estos puntos:

- [ ] Funciona en ES y EN.
- [ ] Responsive (mobile-first) verificado.
- [ ] Reduced motion verificado.
- [ ] Metadata SEO generada (título, descripción, OG, canonical).
- [ ] Imágenes optimizadas y con `alt`.
- [ ] Lint, type-check y build en verde.
- [ ] No se modificaron componentes globales sin necesidad real.
- [ ] No se inventó contenido (datos, clientes, cifras).
- [ ] El diseño respeta los tokens de `UI_GUIDELINES.md`.

Si algo de esto no se puede cumplir, el agente debe decirlo explícitamente en vez de omitirlo
en silencio.
