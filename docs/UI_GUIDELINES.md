# UI_GUIDELINES.md — Identidad Visual y Sistema de UI (Fuentivo)

## 1. Concepto: Precision Forward

La identidad visual comunica: dirección, avance, precisión, velocidad, estructura,
tecnología, movimiento controlado. Debe sentirse **premium pero no futurista genérico**.

**Evitar siempre:** esferas flotantes sin función, degradados exagerados, textos abstractos
sin propósito, animaciones decorativas, brillos constantes, elementos 3D aleatorios, efectos
de 5 librerías distintas sin dirección común.

Regla rectora: **más preciso que decorativo.**

---

## 2. Color

| Token              | Hex       | Uso                                                               |
| ------------------ | --------- | ----------------------------------------------------------------- |
| `--brand`          | `#00B86A` | CTA principal, isotipo destacado, enlaces activos, foco de inputs |
| `--brand-hover`    | `#00945A` | hover de botón principal, estados presionados                     |
| `--brand-light`    | `#42D98F` | etiquetas pequeñas, elementos decorativos, texto de apoyo puntual |
| `--background`     | `#111317` | body, header, footer, hero, fondos oscuros                        |
| `--surface`        | `#1B1F24` | tarjetas, formularios, paneles, navegación móvil                  |
| `--border`         | `#2A3038` | bordes, divisores, inputs, botones secundarios                    |
| `--text-primary`   | `#F7F8FA` | títulos, navegación, logo                                         |
| `--text-secondary` | `#D7DBE0` | párrafos importantes, descripciones                               |
| `--text-muted`     | `#8D949D` | metadatos, fechas, categorías, placeholders                       |

```css
:root {
  --brand: #00b86a;
  --brand-hover: #00945a;
  --brand-light: #42d98f;
  --background: #111317;
  --surface: #1b1f24;
  --border: #2a3038;
  --text-primary: #f7f8fa;
  --text-secondary: #d7dbe0;
  --text-muted: #8d949d;
}
```

Los tokens se exponen a Tailwind mediante el mecanismo recomendado por la versión instalada:
configuración CSS-first cuando corresponda, o `tailwind.config.ts` cuando la versión lo
requiera. Las variables anteriores son la única fuente de verdad; no duplicar valores hex.

**Proporción de uso:** ~75% fondos/superficies oscuras · ~20% texto blanco/gris · ~5% emerald.
El emerald **dirige la atención**, no compite por ella. Nunca cubrir grandes áreas con emerald.

---

## 3. Tipografía

- Títulos: **Sora**
- Texto e interfaz: **Inter**
- Etiquetas técnicas (categorías, estados, tecnologías): **Geist Mono**

**Escala desktop:** H1 64–80px · H2 42–56px · H3 28–36px · Body Large 20px · Body 16–18px ·
Small 14px · Label 12–13px

**Escala mobile:** H1 40–48px · H2 32–38px · H3 24–28px · Body Large 18px · Body 16px ·
Small 14px · Label 12px

Nota bilingüe: el inglés suele ocupar más ancho que el español en botones cortos — probar
ambos idiomas en CTAs para evitar quiebres de línea no deseados (ej. "Solicitar diagnóstico"
vs "Request a diagnosis").

---

## 4. Espaciado

Escala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128`

Espacios grandes entre secciones; espacios pequeños dentro de componentes. La web debe
"respirar" — nunca sentirse comprimida.

---

## 5. Componentes

**Tarjetas:** fondo `--surface`, borde `--border`, radio 16–24px, sombra muy sutil.

**Botón primario:** fondo `--brand`, texto `--background`, hover `--brand-hover`, radio 10–14px.

**Botón secundario:** fondo transparente, texto `--text-primary`, borde `--border`, hover
`--surface`.

**Inputs:** fondo `--surface`, borde `--border`, texto `--text-primary`, placeholder
`--text-muted`, foco `--brand`.

---

## 6. Navegación

**Header (desktop):** Logo · Servicios · Proyectos · Sobre Fuentivo · Contacto · [Solicitar
diagnóstico] · **[ES/EN]** (toggle de idioma, texto simple, no banderas — más profesional y
evita ambigüedad región/idioma). Limpio, compacto, ligeramente transparente + blur al hacer
scroll, borde inferior sutil, transición suave. No debe ocupar demasiado espacio vertical.

**Mobile:** Logo · botón menú · botón WhatsApp visible. Menú: Inicio, Servicios, Proyectos,
Sobre Fuentivo, Contacto, Hablar por WhatsApp, toggle ES/EN.

**Footer:** logo, descripción breve, navegación, servicios, redes, correo, WhatsApp,
copyright, política de privacidad, toggle de idioma (si no está ya fijo en header).

Descripción de footer:

> Fuentivo diseña y construye páginas web, sistemas y automatizaciones para negocios que
> quieren operar mejor y avanzar más rápido.

---

## 7. Toggle de idioma (ES/EN)

- Ubicación: header (desktop y mobile), visible siempre, sin necesidad de abrir un menú.
- Formato: texto simple `ES · EN` o switch de dos estados, usando tokens de color existentes
  (estado activo en `--text-primary` o `--brand`, inactivo en `--text-muted`). Nunca banderas
  de países (Panamá no es representativo de "español" ni EE.UU. de "inglés" para esta marca).
- El selector navega a la ruta equivalente mediante navegación interna de Next.js, sin recarga
  completa del documento. Debe conservar la página o proyecto equivalente; preservar el scroll
  exacto o el estado local solo cuando sea útil y no añada complejidad innecesaria.
- Debe respetarse en toda página, incluyendo metadata y `<html lang>`.

---

## 8. Estrategia de animación

Regla general: **una animación protagonista, dos patrones secundarios, microinteracciones
consistentes.** Nunca una demostración caótica de librerías.

**Animación protagonista (solo en el Hero):** combinación de spotlight suave + grid técnico +
entrada escalonada del titular + pequeño efecto de profundidad. Una sola, claramente
reconocible.

**Patrón secundario 1 — entrada de contenido:** fade + desplazamiento vertical corto +
aparición escalonada, duración controlada, igual en todas las secciones.

**Patrón secundario 2 — interacción de componentes:** elevación sutil, cambio de borde a
emerald, transición de imagen, transformación pequeña. Igual en tarjetas/botones — nunca un
efecto distinto por tarjeta.

### Fuentes de componentes (usar según función, no según qué se ve "más llamativo")

| Fuente                      | Uso                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Magic UI**                | microinteracciones, border beam, number ticker, marquee, botones                      |
| **Aceternity UI**           | estructura del hero, spotlight, fondos grid, bento grids, profundidad                 |
| **Motion** (`motion/react`) | base de coordinación: entradas, scroll, hover, tap, stagger, reduced motion           |
| **React Bits**              | 1–2 efectos memorables máximo (isotipo, texto protagonista)                           |
| **21st.dev**                | directorio de búsqueda cuando falte un patrón — nunca copiar sin adaptar              |
| **Motion Primitives**       | diálogos, acordeones, popovers, transiciones funcionales                              |
| **LottieFiles**             | confirmaciones, formularios enviados, estados vacíos, loaders, 404 — nunca el hero    |
| **Rive**                    | no necesario en V1                                                                    |
| **GSAP**                    | no incluir en V1; solo si se justifica una secuencia de scroll que Motion no resuelve |

---

## 9. Sistema de movimiento (timing)

- Microinteracción: 120–200ms
- Botones/controles: 150–250ms
- Entrada de tarjetas: 350–500ms
- Entrada de secciones: 450–650ms
- Animación protagonista: máx. 1.2s
- Desplazamiento: elementos pequeños 4–8px · tarjetas 8–16px · secciones 16–32px
- Escala: hover 1.01–1.03 · tap 0.97–0.99 (nunca escalas agresivas que muevan el layout)

---

## 10. Reduced motion (obligatorio)

```css
@media (prefers-reduced-motion: reduce) { ... }
```

```ts
import { useReducedMotion } from "motion/react";
```

Cuando esté activo: sin desplazamientos, fondos animados detenidos, marquees convertidos en
listas estáticas, transiciones reducidas, contenido visible de inmediato — **sin pérdida de
ninguna función**.

---

## 11. Reglas de animación (prohibiciones)

No impedir la lectura · el contenido debe existir sin JS · no más de un fondo animado por
viewport · no animar texto palabra por palabra · no blur excesivo en párrafos · no retrasar
CTAs artificialmente · no bloquear scroll · no ocultar info tras hover en mobile · no cursores
personalizados · no sonidos · no parallax en todo · no mezclar estilos de movimiento
incompatibles · no animar "porque la librería lo ofrece".

---

## 12. Responsive

Breakpoints: Mobile 320–767px · Tablet 768–1023px · Desktop 1024–1439px · Wide 1440px+

En mobile: titular más corto, botones apilados, navegación compacta, mockup simplificado,
tarjetas de una columna, menos decoración, CTA siempre visible, animaciones reducidas, cero
contenido dependiente solo de hover.

---

## 13. WhatsApp y Yappy — tratamiento visual

- Íconos de marca discretos (Lucide/oficiales, tamaño moderado), nunca badges gigantes tipo
  checkout de e-commerce.
- WhatsApp: botón con ícono + texto, estilo consistente con el botón secundario/CTA, presente
  en header móvil, hero, CTA final y contacto.
  Cuando se hable de WhatsApp como **servicio** (automatización/chatbots), se representa como
  parte del contenido de "Automatización" — con las mismas tarjetas de servicio, no un
  elemento gráfico especial.
- Yappy: mención textual dentro de "Cómo trabajamos" o "Contacto" (ej. junto a métodos de
  pago aceptados), con el ícono oficial si se dispone de asset con licencia; si no, texto
  simple sin ícono. No requiere componente interactivo en V1.

---

## 14. Selección visual mediante agentes

Cuando se pida mejorar una sección visualmente, el agente debe:

1. identificar el objetivo UX real;
2. revisar el sistema visual existente antes de proponer algo nuevo;
3. buscar referencias solo en las fuentes autorizadas (§8);
4. comparar 2–3 opciones internamente y elegir **una sola dirección**;
5. adaptar el componente a los tokens de Fuentivo (eliminar colores/estilos originales);
6. verificar accesibilidad, mobile, rendimiento y reduced motion;
7. documentar de qué fuente vino el patrón, si aplica.

El agente actúa como diseñador-desarrollador, no como coleccionista de efectos.

---

## 15. Accesibilidad

Contraste adecuado, navegación por teclado, foco visible, labels en formularios, alt en
imágenes, tamaños legibles, botones con área de toque suficiente, jerarquía semántica
correcta (`h1`→`h2`→`h3`), soporte reduced motion, ninguna interacción dependiente
únicamente del hover.
