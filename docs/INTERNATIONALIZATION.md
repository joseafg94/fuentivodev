# INTERNATIONALIZATION.md — Reglas de Bilingüe ES/EN (Fuentivo)

## 1. Idiomas y jerarquía

- **Español (LatAm/Panamá)** — idioma **primario**, por defecto, sin prefijo de ruta.
- **Inglés (americano)** — idioma **secundario**, para clientes internacionales o partners
  angloparlantes.

Ningún idioma es "el traducido" en el sentido de segunda clase: ambos deben sentirse
escritos con cuidado, no como output automático de un traductor.

---

## 2. Estrategia de enrutamiento (elegir una y documentarla)

Elegir **una sola** estrategia al iniciar el proyecto (Fase 1 de desarrollo) y no mezclarla
a mitad de camino:

- **Opción A — prefijo de ruta** (`/en/servicios`, `/en/proyectos/meniva`): mejor para SEO
  internacional, cada idioma es indexable y compartible por separado. Recomendada si se
  espera tráfico orgánico en inglés a mediano plazo.
- **Opción B — mismo path, toggle en cliente** (estado guardado en cookie, sin cambiar la
  URL): más simple de implementar, pero peor para SEO en inglés (Google indexa una sola
  versión por URL).

Documentar la decisión tomada en `docs/ARCHITECTURE_RULES.md` una vez implementada.

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
- Cambio instantáneo, sin recarga completa de la página, preservando scroll y estado de la
  UI.
- El idioma elegido debe reflejarse en: `<html lang>`, metadata de la página, Open Graph,
  y el sitemap (si se usa la Opción A de enrutamiento).

---

## 6. Regla de completitud (Definition of Done bilingüe)

Ninguna tarea que agregue o edite contenido visible se considera terminada si:

- falta la versión en el otro idioma;
- la traducción es literal/mecánica en vez de natural;
- la metadata SEO solo existe en un idioma;
- las imágenes tienen `alt` en un solo idioma.

Ver checklist completo en `docs/ACCEPTANCE_CHECKLIST.md`.
