# INTERNATIONALIZATION.md — Reglas de Bilingüe ES/EN (Fuentivo)

## 1. Idiomas y jerarquía

- **Español (LatAm/Panamá)** — idioma **primario**, bajo el prefijo obligatorio `/es`.
- **Inglés (americano)** — idioma **secundario**, para clientes internacionales o partners
  angloparlantes, bajo el prefijo obligatorio `/en`.

Ningún idioma es "el traducido" en el sentido de segunda clase: ambos deben sentirse
escritos con cuidado, no como output automático de un traductor.

---

## 2. Estrategia oficial de enrutamiento

La V1 usa prefijo obligatorio en todas las páginas públicas: `/es` para español y `/en` para
inglés. La raíz `/` redirige siempre a `/es`; no se usa detección automática para sustituir
esa decisión.

Los segmentos estáticos también se localizan:

- `/es/servicios` ↔ `/en/services`
- `/es/proyectos` ↔ `/en/projects`
- `/es/webs` ↔ `/en/websites`
- `/es/sobre-fuentivo` ↔ `/en/about`
- `/es/contacto` ↔ `/en/contact`
- `/es/privacidad` ↔ `/en/privacy`

Los slugs de proyectos permanecen iguales: `/es/proyectos/meniva` ↔
`/en/projects/meniva`. Esta decisión es definitiva para la V1; no implementar un selector
sin cambio de URL.

---

## 3. Dónde vive cada tipo de contenido

- **Strings de interfaz** (botones, navegación, labels fijos) → `locales/es/*.json` y
  `locales/en/*.json`.
- **Contenido de portafolio** (proyectos) → campos `LocalizedText` dentro del modelo de
  `docs/CONTENT_MODEL.md`, no en archivos de traducción aparte.
- **Metadata SEO** → objeto `seo.es` / `seo.en` específico por página/proyecto, nunca
  autogenerado por traducción literal del otro idioma.

---

## 4. Calidad de traducción

- Nunca traducción literal palabra por palabra. El inglés debe sonar a inglés americano
  natural de negocios, no a calco del español.
- Revisar especialmente: nombres de servicios, CTAs y "Cómo trabajamos" — son las partes más
  usadas en conversación comercial y las que más se notan si suenan forzadas.
- Ejemplo de lo que se busca evitar: traducir "Solicitar diagnóstico" como _"Request a
  diagnostic"_ (suena clínico/médico en inglés) en vez de algo natural como _"Request a free
  assessment"_ o _"Get a diagnosis call"_ — elegir el que mejor calce con el tono de marca.
- Los términos locales panameños (ej. "Yappy") se mantienen igual en inglés, con una
  aclaración breve entre paréntesis si el contexto lo requiere (ej. "_Yappy (a popular
  Panamanian payment app)_").

---

## 5. El toggle de idioma (ver también `docs/UI_GUIDELINES.md §7`)

- Ubicación: header, visible siempre, sin necesidad de abrir un menú.
- Formato: texto simple `ES · EN`, nunca banderas de países.
- Navega a la ruta localizada equivalente mediante navegación interna de Next.js, sin recarga
  completa del documento.
- Conserva la página o proyecto equivalente. El scroll exacto y el estado local solo se
  preservan cuando sea útil y no añada complejidad innecesaria.
- El idioma elegido debe reflejarse en: `<html lang>`, metadata de la página, Open Graph,
  canonical, alternates y sitemap.

---

## 6. Regla de completitud (Definition of Done bilingüe)

Ninguna tarea que agregue o edite contenido visible se considera terminada si:

- falta la versión en el otro idioma;
- la traducción es literal/mecánica en vez de natural;
- la metadata SEO solo existe en un idioma;
- las imágenes tienen `alt` en un solo idioma.

Ver checklist completo en `docs/ACCEPTANCE_CHECKLIST.md`.
