# ACCEPTANCE_CHECKLIST.md — Checklist Consolidado de Aceptación (Fuentivo Web)

Este es el checklist final que se revisa **antes de cerrar cualquier tarea**, sin
excepción — nueva sección, nuevo proyecto, fix, feature, optimización o mejora visual. Si
algún punto no aplica a la tarea puntual, se marca como "no aplica" explícitamente, nunca se
omite en silencio.

---

## 1. Idioma y contenido

- [ ] La tarea funciona completa en ES y en EN (no solo el idioma en el que se pidió).
- [ ] Las traducciones suenan naturales, no literales (`docs/INTERNATIONALIZATION.md §4`).
- [ ] No se inventaron resultados, clientes, testimonios ni métricas.
- [ ] No se afirmó que un concepto/prototipo fue hecho para un cliente real si no lo fue.
- [ ] Los campos opcionales sin datos reales se omitieron, no se rellenaron con texto genérico.

## 2. Diseño y consistencia visual

- [ ] Se usaron los tokens de color, tipografía y espaciado de `docs/UI_GUIDELINES.md` (nada
      fuera del sistema).
- [ ] No se duplicó ningún componente existente; se reutilizó o extendió.
- [ ] No se modificó Header, Footer o navegación global sin necesidad real explícita.
- [ ] La animación sigue el patrón existente (protagonista solo en Hero, dos patrones
      secundarios consistentes) — `docs/UI_GUIDELINES.md §8`.
- [ ] `prefers-reduced-motion` respetado, sin pérdida de funcionalidad.
- [ ] No se agregó una librería de animación o UI nueva sin justificación explícita.

## 3. Datos y arquitectura

- [ ] Si involucra proyectos: respeta exactamente la interfaz `Project` de
      `docs/CONTENT_MODEL.md`.
- [ ] `slug` único, en minúsculas, sin acentos ni espacios.
- [ ] El contenido se alimenta desde el registro central (`content/projects/index.ts` +
      `lib/projects.ts`) — nunca una tarjeta o lista escrita a mano.
- [ ] No se agregaron dependencias nuevas sin justificar peso/mantenimiento/licencia.

## 4. SEO y accesibilidad

- [ ] Metadata única (título, descripción, OG, canonical) generada en ambos idiomas —
      `docs/SEO_ACCESSIBILITY.md §3`.
- [ ] Imágenes optimizadas (`next/image`, formato moderno) con `alt` localizado.
- [ ] Un solo `h1` por página, jerarquía de encabezados correcta.
- [ ] Contraste, navegación por teclado y foco visible verificados.
- [ ] Ningún elemento depende solo del `hover` (crítico en mobile).
- [ ] `sitemap.xml` y `robots.txt` no se rompieron.

## 5. Rendimiento

- [ ] Sin CLS visible al cargar (imágenes/componentes con espacio reservado).
- [ ] Animaciones limitadas a `transform`/`opacity`.
- [ ] Componentes pesados con lazy-load donde corresponde
      (`docs/PERFORMANCE_RULES.md §5`).
- [ ] Sin scripts de terceros añadidos sin justificación.
- [ ] Lighthouse mobile ≥ 90 en performance (si la tarea afecta una página completa).

## 6. Calidad técnica

- [ ] `lint` en verde.
- [ ] `type-check` en verde.
- [ ] `build` en verde.
- [ ] Verificado en desktop y mobile.
- [ ] No se rompió ninguna ruta existente ni el listado de proyectos.

## 7. Comunicación del cambio

- [ ] El resumen del cambio (commit/PR/respuesta a José) está en español, es claro y
      específico sobre qué se hizo y por qué.
- [ ] Si algo de este checklist no se pudo cumplir, se dijo explícitamente — no se omitió en
      silencio.

---

**Regla final:** una tarea que no pasa este checklist completo no está terminada, sin
importar qué tan bien se vea a simple vista.
