# SEO_ACCESSIBILITY.md — SEO Técnico y Accesibilidad (Fuentivo)

## 1. Intención comercial (SEO de contenido)

Palabras clave objetivo (ES): desarrollo web en Panamá, diseño de páginas web en Panamá,
páginas web para negocios, desarrollo de sistemas para empresas, automatización de
procesos, sistemas personalizados para negocios, páginas web para restaurantes, menús
digitales para restaurantes, desarrollo de aplicaciones web, software para pequeñas
empresas, automatización para PyMEs, diseño UX/UI en Panamá.

Para la versión EN: no traducir estas keywords 1:1; investigar intención de búsqueda real
en inglés (ej. "web design agency Panama", "custom business software Latin America").

---

## 2. Arquitectura de rutas SEO

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

Si se usa prefijo de idioma (`docs/INTERNATIONALIZATION.md §2`, Opción A), cada ruta existe
también como `/en/...` con su propia metadata.

---

## 3. Qué debe generarse automáticamente por página/proyecto

- título único;
- descripción única;
- canonical;
- Open Graph (título, descripción, imagen);
- imagen social (fallback si el proyecto no tiene una propia);
- datos estructurados donde aplique (ej. `Organization`, `Article`/`CreativeWork` para casos
  de estudio);
- URL limpia, sin parámetros innecesarios.

El `sitemap.xml` debe incorporar automáticamente cada proyecto nuevo (y ambas variantes de
idioma, si aplica) sin edición manual.

---

## 4. Checklist técnico general

- [ ] Metadata única por página (nunca duplicada entre rutas).
- [ ] `robots.txt` configurado correctamente (sin bloquear rutas públicas por error).
- [ ] `sitemap.xml` dinámico, actualizado en cada build.
- [ ] Imágenes con `alt` descriptivo y localizado.
- [ ] Estructura semántica correcta: un solo `h1` por página, jerarquía `h2`→`h3` sin saltos.
- [ ] URLs limpias y consistentes (sin mayúsculas, sin espacios, sin sufijos técnicos).
- [ ] Velocidad de carga dentro de los objetivos de `docs/PERFORMANCE_RULES.md`.

---

## 5. Accesibilidad (WCAG AA como referencia práctica)

- Contraste de color adecuado entre texto y fondo (los tokens de `UI_GUIDELINES.md` ya están
  pensados para esto — no bajar el contraste por estética).
- Navegación completa por teclado (Tab/Shift+Tab/Enter) en todos los flujos, incluyendo el
  toggle de idioma y el formulario de contacto.
- Foco visible en todo elemento interactivo (nunca `outline: none` sin un reemplazo visual
  equivalente).
- `label` asociado a cada campo de formulario (no solo `placeholder`).
- Textos alternativos (`alt`) en todas las imágenes, en el idioma activo.
- Tamaños de texto legibles y botones con área de toque suficiente en mobile (mínimo ~44px).
- Ninguna interacción o información depende únicamente del `hover` (crítico en mobile, donde
  no existe hover).
- Soporte de `prefers-reduced-motion` sin pérdida de funcionalidad (ver
  `docs/UI_GUIDELINES.md §10`).

---

## 6. Checklist antes de cerrar cualquier tarea de contenido/UI

- [ ] `h1` único y correcto por página.
- [ ] Metadata SEO completa en ES y EN.
- [ ] Contraste e interacción por teclado verificados.
- [ ] `alt` en ambos idiomas.
- [ ] Sin romper el sitemap ni el `robots.txt`.

Ver también el checklist consolidado en `docs/ACCEPTANCE_CHECKLIST.md`.
