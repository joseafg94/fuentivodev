# ARCHITECTURE_RULES.md — Arquitectura Técnica (Fuentivo Web)

## 1. Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Motion** (`motion/react`) para animación
- Componentes visuales adaptados de **Magic UI** y **Aceternity UI** (ver `UI_GUIDELINES.md`)
- **Vercel** para hosting/deploy
- Analítica: **PostHog** o **Vercel Analytics**
- Email transaccional: **Resend** (o equivalente)
- Formularios: **React Hook Form** + **Zod**
- Iconos: **Lucide**
- Imágenes: **Next Image**

No agregar GSAP, WebGL, un CMS pesado, o librerías de animación adicionales en la V1
(ver `PROJECT_CONTEXT.md §13`).

---

## 2. Estructura de carpetas

```
content/
└── projects/
    ├── meniva.ts
    ├── <nuevo-proyecto>.ts
    └── index.ts          ← registro central, exporta todos los proyectos

app/
├── (marketing)/
│   ├── page.tsx                    ← Inicio
│   ├── servicios/page.tsx
│   ├── proyectos/page.tsx          ← listado + filtros
│   ├── proyectos/[slug]/page.tsx   ← ruta dinámica de caso de estudio
│   ├── webs/page.tsx               ← vista filtrada category:"web"
│   ├── sobre-fuentivo/page.tsx
│   ├── contacto/page.tsx
│   └── privacidad/page.tsx
├── api/
│   └── contact/route.ts
└── layout.tsx

components/
├── layout/        (Header, Footer, MobileNav)
├── sections/       (Hero, Services, FeaturedProjects, Process, WhyFuentivo, FinalCTA)
├── projects/       (ProjectCard, ProjectFilters, ProjectGallery)
└── ui/             (botones, inputs, tarjetas base — shadcn extendido)

lib/
├── i18n.ts          ← utilidades de idioma
├── projects.ts      ← helpers (getFeatured, getByCategory, getBySlug)
└── seo.ts           ← helpers de metadata

locales/
├── es/*.json
└── en/*.json

docs/
├── rules-workspace.md
├── PROJECT_CONTEXT.md
├── ARCHITECTURE_RULES.md
├── UI_GUIDELINES.md
└── OPTIMIZATION.md
```

Cada proyecto en su propio archivo (no un archivo gigante `projects.ts` con todos adentro):
reduce conflictos y facilita que un agente edite un solo proyecto sin tocar los demás.

---

## 3. Modelo de datos — `Project`

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

Nota: todos los campos de texto usan `LocalizedText` (`{ es, en }`) porque el sitio es bilingüe
por diseño — no un idioma con traducción "pegada" después.

No todos los campos son obligatorios. Una página web simple no necesita el mismo nivel de
detalle que un sistema complejo. La plantilla de la ruta dinámica se adapta según los campos
presentes (ocultar secciones vacías, nunca mostrar "N/A").

---

## 4. Ruta dinámica de proyectos

`/proyectos/[slug]` debe:

1. Buscar el proyecto por `slug` en el registro central.
2. Generar metadata (título, descripción, OG, canonical) en el idioma activo.
3. Construir la cabecera según los datos disponibles.
4. Mostrar solo las secciones con contenido (ocultar campos vacíos, no dejar huecos).
5. Mostrar proyectos relacionados (misma categoría, excluyendo el actual).
6. Mantener el mismo sistema visual sin excepciones por proyecto.
7. Devolver 404 si el slug no existe.

`/webs` reutiliza el mismo catálogo, filtrando `category === "web"`. No debe duplicar datos.

---

## 5. i18n — arquitectura

- Estrategia recomendada V1: **toggle de idioma en cliente sin duplicar rutas** (mismo path,
  contenido cambia según `locale` guardado en cookie/localStorage-equivalente de servidor +
  parámetro `?lang=` como fallback para compartir enlaces), **o** prefijo de ruta `/en/...`
  si se prioriza SEO internacional (`/en/services`, `/en/projects`). Elegir una sola estrategia
  y documentarla en el PR — no mezclar ambas a mitad de proyecto.
- Español es el idioma por defecto (sin prefijo `/es`).
- Todo string visible vive en `locales/es/*.json` y `locales/en/*.json`, o en el campo
  `LocalizedText` del proyecto si es contenido de portafolio.
- Metadata, `<html lang>`, Open Graph y sitemap deben reflejar el idioma activo.
- El toggle no debe recargar toda la experiencia visual (mismo scroll, mismo estado).

---

## 6. Cómo agregar un nuevo proyecto (flujo obligatorio del agente)

Cuando el usuario diga _"Agrega esta nueva web/proyecto al portafolio"_, el agente debe:

1. Releer `PROJECT_CONTEXT.md` y este archivo.
2. Revisar 1–2 proyectos existentes como referencia directa de formato.
3. Identificar la categoría correcta (`ProjectCategory`).
4. Crear un archivo nuevo en `content/projects/<slug>.ts` respetando `Project` exactamente.
5. Escribir **ambos idiomas** (`es` y `en`) para cada campo `LocalizedText`.
6. Optimizar y ubicar imágenes en `public/projects/<slug>/`.
7. Agregar el proyecto al `index.ts` del registro.
8. Verificar que la metadata SEO esté completa en ambos idiomas.
9. Confirmar que la ruta `/proyectos/<slug>` carga, sin romper otras rutas.
10. Ejecutar `lint`, `type-check`, `build`.
11. Verificar desktop, mobile y `reduced-motion`.
12. No modificar componentes globales (Header, Footer, Hero) salvo necesidad real y explícita.

Opcional (recomendado a futuro): script `pnpm create:project` que pregunte nombre, slug,
categoría, año, estado, destacado, y genere el archivo base + carpeta de imágenes + metadata
inicial automáticamente.

---

## 7. Reglas obligatorias (prohibiciones)

- No crear una tarjeta manual dentro de Inicio: la sección de destacados se alimenta del
  registro central, filtrando `featured: true`.
- No duplicar componentes existentes.
- No crear colores nuevos fuera de los tokens de `UI_GUIDELINES.md`.
- No introducir una animación distinta por proyecto.
- No modificar header, footer o navegación al agregar contenido.
- No cambiar tipografías.
- No crear rutas estáticas manuales para proyectos individuales.
- No omitir metadata SEO en ningún idioma.
- No usar imágenes sin optimizar.
- No romper el orden cronológico ni los filtros existentes.
- No inventar resultados, clientes o métricas.
- No afirmar que un concepto fue desarrollado para un cliente real.
- No agregar dependencias sin justificación explícita en el commit/PR.
- No alterar el formato general de los casos de estudio.

---

## 8. SEO técnico — arquitectura de rutas

```
/servicios/desarrollo-web
/servicios/sistemas-personalizados
/servicios/automatizacion
/soluciones/restaurantes
/soluciones/negocios-de-servicios
/proyectos
/proyectos/[slug]
/webs
```

Cada proyecto genera automáticamente: título, descripción, canonical, Open Graph, imagen
social, datos estructurados, URL limpia — en el idioma correspondiente. El sitemap debe
incorporar automáticamente los nuevos proyectos y ambas variantes de idioma si se usa
prefijo de ruta.

---

## 9. Formulario de contacto y WhatsApp

- Campos: Nombre, Negocio/empresa, WhatsApp o correo, "¿Qué necesitas?" (Página web / Sistema
  personalizado / Automatización / Mejorar un proyecto existente / No estoy seguro).
- CTA: "Solicitar diagnóstico".
- Envío vía `api/contact/route.ts` → Resend (o equivalente), con validación Zod y protección
  básica anti-spam (honeypot o rate limit simple).
- Enlace directo de WhatsApp con mensaje precargado (ver `PROJECT_CONTEXT.md §5`) en: hero,
  CTA final, navegación móvil, página de contacto.
- Yappy no requiere integración de pasarela en la V1 (no es checkout); se menciona como método
  de pago aceptado en el contenido de "Cómo trabajamos"/Contacto, no como componente funcional.

---

## 10. Checklist de aceptación (agente)

- [ ] Usa la interfaz `Project` oficial.
- [ ] Slug único.
- [ ] Aparece en el listado y filtros correctos.
- [ ] Página dinámica carga en ES y EN.
- [ ] Metadata completa en ambos idiomas.
- [ ] Imágenes optimizadas con `alt` en ambos idiomas.
- [ ] No se inventaron resultados.
- [ ] No se duplicaron componentes.
- [ ] Desktop y mobile verificados.
- [ ] Reduced motion verificado.
- [ ] Lint, type-check y build pasan.
- [ ] Diseño global intacto.
