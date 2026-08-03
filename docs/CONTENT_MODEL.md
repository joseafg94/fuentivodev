# CONTENT_MODEL.md — Modelo de Datos de Proyectos (Fuentivo)

Este documento define la única fuente de verdad sobre cómo se estructura el contenido de
cada proyecto del portafolio. Cualquier agente que cree, edite o lea un proyecto debe
respetar esta interfaz exactamente — no improvisar campos nuevos ni omitir la validación
bilingüe.

---

## 1. Tipos base

```ts
export type ProjectCategory =
  | "web"
  | "system"
  | "application"
  | "automation"
  | "product"
  | "experiment";

export type ProjectStatus =
  | "published"
  | "in-progress"
  | "concept"
  | "archived";

export interface LocalizedText {
  es: string;
  en: string;
}
```

Todo campo de texto visible al usuario usa `LocalizedText`. No existe contenido "solo en
español" o "solo en inglés" dentro del modelo — si falta uno de los dos, el proyecto no está
completo (ver `docs/ACCEPTANCE_CHECKLIST.md`).

---

## 2. Interfaz `Project`

```ts
export interface Project {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  summary: LocalizedText;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  featured: boolean;

  client?: string;
  industry?: LocalizedText;
  location?: string;

  coverImage: string;
  thumbnailImage: string;
  gallery?: string[];

  liveUrl?: string;
  repositoryUrl?: string;

  services: string[];
  technologies: string[];
  tags: string[];

  challenge: LocalizedText;
  objective: LocalizedText;
  solution: LocalizedText;
  process?: LocalizedText[];
  features?: LocalizedText[];
  uxDecisions?: LocalizedText[];
  results?: LocalizedText[];

  testimonial?: {
    quote: LocalizedText;
    author: string;
    role?: string;
  };

  seo: {
    es: { title: string; description: string; image?: string };
    en: { title: string; description: string; image?: string };
  };
}
```

---

## 3. Campos obligatorios vs. opcionales

**Siempre obligatorios:** `slug`, `title`, `shortDescription`, `summary`, `category`,
`status`, `year`, `featured`, `coverImage`, `thumbnailImage`, `services`, `technologies`,
`tags`, `challenge`, `objective`, `solution`, `seo`.

**Opcionales, según el tipo de trabajo:** `client`, `industry`, `location`, `gallery`,
`liveUrl`, `repositoryUrl`, `process`, `features`, `uxDecisions`, `results`, `testimonial`.

Regla: **un campo opcional vacío se omite, nunca se rellena con "N/A", guiones o texto
genérico.** La plantilla de la ruta dinámica debe ocultar la sección completa si el campo
no existe (ver `docs/ARCHITECTURE_RULES.md §4`).

---

## 4. Qué priorizar según el tipo de proyecto

Esto define **qué campos opcionales conviene llenar** para que el caso de estudio se sienta
completo, no una checklist rígida.

**Página web** (`category: "web"`) → priorizar: `industry`, `objective`, `solution`,
`liveUrl`, `gallery`, `technologies`.

**Sistema o aplicación** (`system` / `application`) → priorizar: `challenge` detallado,
`features`, `uxDecisions`, `process`, `results` (solo si son reales).

**Automatización** (`automation`) → priorizar: `challenge` (proceso manual anterior),
`solution` (flujo automatizado), `results` (tiempo ahorrado, solo si es medible y real).

**Producto propio** (`product`) → priorizar: `objective`, `features`, `uxDecisions`,
`process`, estado real de desarrollo en `status`.

**Experimento** (`experiment`) → mínimo viable: `title`, `shortDescription`, `summary`,
`solution`. No requiere `results` ni `testimonial`.

---

## 5. Reglas de integridad de datos

- `slug` único en todo el registro, en minúsculas, sin espacios ni acentos.
- `results` y `testimonial` **nunca se inventan.** Si no hay datos reales o autorización del
  cliente para citarlo, se omiten por completo.
- `client` solo se llena si el trabajo fue realmente para ese cliente. Un concepto o
  prototipo interno no puede tener `client` asignado.
- `technologies` y `services` deben usar los mismos nombres/strings ya usados en otros
  proyectos (revisar el registro antes de escribir uno nuevo con nombre distinto para lo
  mismo, ej. no mezclar "Next.js" y "NextJS").
- `seo.es` y `seo.en` son independientes: no son traducciones automáticas, son metadata
  pensada para cada idioma/mercado.

---

## 6. Dónde vive esto en el código

- Definición de tipos: `content/projects/types.ts` (o archivo equivalente central).
- Un proyecto = un archivo: `content/projects/<slug>.ts`.
- Registro central: `content/projects/index.ts`, exporta el arreglo completo.
- Helpers de lectura: `lib/projects.ts` (`getFeaturedProjects`, `getProjectsByCategory`,
  `getProjectBySlug`) — nunca se filtra o busca un proyecto manualmente fuera de estos
  helpers.

Ver `docs/ADDING_PROJECTS.md` para el flujo paso a paso de cómo crear un proyecto nuevo
usando este modelo.
