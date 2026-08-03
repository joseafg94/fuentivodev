# OPTIMIZATION.md — Rendimiento y Escalabilidad (Fuentivo Web)

Este documento existe porque la web es un activo comercial: si se pone lenta o se traba con
tráfico (ej. un enlace viral por WhatsApp/Instagram/TikTok), pierde credibilidad justo en el
momento en que más importa. "La estética premium desaparece rápido cuando la web se desplaza
como una presentación de PowerPoint en una tostadora."

## 1. Objetivos (Lighthouse)

- Performance: **90+**
- Accessibility: **95+**
- Best Practices: **95+**
- SEO: **95+**

Medir en mobile (no solo desktop) y en ambos idiomas.

---

## 2. Imágenes

- Usar siempre `next/image`, nunca `<img>` plano.
- Formatos modernos (`avif`/`webp`) con fallback automático.
- `sizes` correcto por breakpoint; nunca servir la imagen desktop completa en mobile.
- Comprimir antes de subir (el agente no debe subir assets sin optimizar, ver
  `ARCHITECTURE_RULES.md`).
- `alt` obligatorio y localizado (ES/EN).
- Evitar videos de fondo en mobile; si existe una demo animada, usar imagen estática + play
  opcional, no autoplay pesado.

---

## 3. Fuentes

- Auto-hospedar con `next/font` (Sora, Inter, Geist Mono), no cargar desde CDNs externos.
- Subsetear (latin) y usar `font-display: swap` para evitar bloqueo de render.
- No cargar más de 2–3 pesos por familia.

---

## 4. Cacheo y datos

- Páginas de marketing (Inicio, Servicios, Sobre Fuentivo) como estáticas (SSG) siempre que
  sea posible.
- Páginas de proyectos (`/proyectos/[slug]`) generadas estáticamente en build (los datos viven
  en archivos TS del repo, no en una API externa) — no requieren revalidación runtime salvo que
  se migre a CMS a futuro.
- Si se migra a un CMS headless más adelante, usar ISR (`revalidate`) en vez de SSR completo
  por request.
- El endpoint de contacto (`api/contact`) debe tener rate limiting básico para evitar abuso o
  saturación (ej. límite por IP/minuto).

---

## 5. JavaScript y code-splitting

- Cargar componentes de animación pesados (Aceternity/Magic UI/React Bits) con `dynamic()` y
  `ssr: false` cuando no afecten el contenido crítico visible sin JS.
- Nunca importar una librería completa por un solo efecto (tree-shaking siempre revisado).
- Diferir (lazy-load) secciones bajo el pliegue (below the fold): Proyectos destacados,
  Cómo trabajamos, Por qué Fuentivo, CTA final — cargarlas cuando entran en viewport.
- Un único observer de scroll reutilizado para animaciones de entrada, no uno por sección.

---

## 6. Evitar layout shift (CLS)

- Reservar espacio (`width`/`height` o `aspect-ratio`) para imágenes y componentes de
  animación antes de que carguen.
- No inyectar el toggle de idioma de forma que desplace el header al montar.
- Fuentes con `font-display: swap` + fallback de ancho similar para minimizar reflow al
  aplicar la fuente final.

---

## 7. Animación y rendimiento (ver también `UI_GUIDELINES.md §9-11`)

- Animar solo `transform` y `opacity`; evitar animar `width`, `height`, `top`, `left`.
- Máximo un fondo animado por viewport.
- Minimizar partículas; usar `canvas` solo si aporta valor real y con throttling de frame rate
  en dispositivos de bajo rendimiento.
- No mezclar más de una librería de animación en la misma sección.

---

## 8. Escalabilidad del catálogo de proyectos

- Con pocos proyectos (V1): renderizar todo el listado sin paginación.
- Cuando el catálogo crezca (aprox. >18–24 proyectos): agregar paginación o "cargar más" en
  `/proyectos`, y considerar búsqueda (client-side simple, sin librería pesada, hasta que el
  volumen lo justifique).
- Filtros por categoría deben operar sobre datos ya cargados (sin refetch), evitando
  llamadas de red innecesarias.

---

## 9. Terceros y scripts

- Cargar analítica (PostHog/Vercel Analytics) de forma diferida y sin bloquear el render
  inicial.
- No agregar scripts de terceros "porque podrían servir" — cada script debe justificar su
  costo de peso/rendimiento.
- Ningún script de terceros debe tener acceso a bloquear el hilo principal en el hero.

---

## 10. Monitoreo bajo tráfico alto

- Vercel Edge Network / CDN para assets estáticos e imágenes: absorbe picos sin backend
  adicional.
- Revisar Core Web Vitals reales (no solo lab data) vía la analítica configurada.
- El formulario de contacto y cualquier ruta `api/*` deben poder fallar de forma controlada
  (mensaje claro al usuario) si hay saturación, nunca colgar la página completa.
- Si en el futuro se agregan automatizaciones/webhooks (ej. n8n, Zapier) conectados al sitio,
  deben ser asíncronos respecto a la respuesta al usuario (no bloquear el envío del formulario
  esperando la automatización completa).

---

## 11. Checklist de rendimiento antes de cerrar cualquier tarea

- [ ] Lighthouse mobile ≥ 90 performance.
- [ ] Sin imágenes sin optimizar.
- [ ] Sin CLS visible al cargar.
- [ ] Animaciones limitadas a `transform`/`opacity`.
- [ ] Componentes pesados con lazy-load donde corresponde.
- [ ] Sin dependencias nuevas no justificadas.
- [ ] Formulario de contacto probado bajo envío repetido (rate limit funciona).
