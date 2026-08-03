# PROJECT_CONTEXT.md — Contexto de Negocio y Producto (Fuentivo)

## 1. Qué es Fuentivo

Fuentivo es un **estudio de producto y soluciones digitales**, fundado y liderado por
**José Fuentes**, con base en **Panamá** y foco comercial en **Panamá y Latinoamérica**.

> Fuentivo es un estudio digital que crea páginas web, sistemas y automatizaciones diseñadas
> para hacer avanzar negocios reales.

Fuentivo **no es**:

- una agencia de marketing genérica;
- un portafolio personal disfrazado de empresa;
- un negocio que "solo hace páginas web".

La IA (incluyendo el desarrollo asistido por agentes) se usa **internamente** para ganar
velocidad, consistencia y calidad. **No es el argumento de venta.** El cliente no compra
herramientas, compra resultados.

---

## 2. Objetivo de la web

Esta web es simultáneamente: portafolio profesional, sitio corporativo, canal de captación,
demostración de capacidades, repositorio de proyectos, y activo comercial.

**Conversión principal:** Solicitar diagnóstico (formulario y/o WhatsApp).

**Conversiones secundarias:** ver proyectos, ver páginas web desarrolladas, conocer servicios,
abrir un caso de estudio, enviar formulario, escribir por WhatsApp.

**Recorrido ideal:**
Visitante → entiende qué hace Fuentivo → reconoce un problema propio → revisa proyectos →
percibe capacidad y confianza → solicita diagnóstico.

---

## 3. Marca: tono y atributos

Atributos a transmitir siempre: **precisión, dirección, velocidad, claridad, confianza,
tecnología, ejecución, progreso.**

Tono de voz:

- directo, sin relleno corporativo;
- profesional pero cercano (estilo latinoamericano, no rígido);
- orientado a resultados, no a jerga técnica;
- nunca exagerado ni "hype" vacío.

Mensaje central:

> Creamos soluciones digitales que hacen avanzar tu negocio.

Líneas de apoyo: _Menos procesos manuales. Más claridad. Más velocidad. Más negocio._
Línea secundaria: _Tecnología precisa, diseñada alrededor de cómo realmente funciona tu negocio._

---

## 4. Audiencia y contexto de tráfico (Panamá / LatAm)

Gran parte del tráfico llega desde WhatsApp, Instagram, TikTok, LinkedIn, Google Maps y enlaces
compartidos directamente entre personas. Esto implica:

- diseño **mobile-first** real, no adaptado después;
- carga rápida y textos breves;
- CTA de contacto siempre visible, nunca escondido;
- formularios cortos (nada de flujos largos tipo "agenda una llamada" como único camino);
- prueba social con proyectos reales, no testimonios genéricos;
- precios "desde" cuando se muestren, nunca ambigüedad total.

Evitar: lenguaje corporativo vacío, navegación compleja, menús extensos, textos densos.

---

## 5. Canales de contacto y cobro — WhatsApp y Yappy

Panamá tiene hábitos de pago y comunicación muy específicos que la web debe reflejar con
naturalidad (no como un aviso legal ni un banner forzado):

- **WhatsApp** es el canal prioritario de contacto comercial (hero, CTA final, navegación
  móvil, página de contacto) y también un **servicio que Fuentivo ofrece a sus clientes**
  (chatbots, automatización de atención, notificaciones). Debe aparecer en dos lugares con dos
  funciones distintas:
  1. Como canal de contacto directo con Fuentivo (mensaje precargado, ver más abajo).
  2. Como ejemplo de lo que Fuentivo construye para sus clientes (dentro de "Servicios →
     Automatización" y en el caso de estudio si aplica).

- **Yappy** es el método de cobro local aceptado por el estudio para sus propios servicios.
  Esto se comunica en la sección **"Cómo trabajamos"** o en una sub-sección de **Contacto /
  Proceso** (ej. un paso "06 · Pago y entrega" o una nota breve tipo _"Aceptamos pagos por
  Yappy y transferencia, sin procesos complicados"_). No debe presentarse como una sección
  aislada de "métodos de pago" tipo e-commerce; debe sentirse parte natural del proceso de
  trabajo, reforzando cercanía y practicidad local.

- Mensaje de WhatsApp precargado sugerido:
  > "Hola, vi la web de Fuentivo y me gustaría conversar sobre una solución digital para mi
  > negocio."

Regla: nunca tratar WhatsApp/Yappy como gimmick visual (sin íconos genéricos gigantes ni
badges tipo "aceptamos X, Y, Z" al estilo carrito de compras). Se integran como parte del
**criterio operativo local** de Fuentivo: así es como Fuentivo se comunica y cobra, con
naturalidad y transparencia.

---

## 6. Servicios (líneas comerciales)

1. **Presencia digital** — landing pages, sitios corporativos, portafolios, catálogos,
   restaurantes, SEO técnico/local, formularios de captación, rediseños, CRO.
   _Resultado comercial:_ presencia clara, rápida, diseñada para convertir visitas en contactos.

2. **Sistemas para negocios** — paneles administrativos, cotizadores, portales de clientes,
   gestores de pedidos, reservas, dashboards, MVPs, herramientas internas.
   _Resultado comercial:_ herramientas adaptadas al flujo real del negocio: ahorrar tiempo,
   reducir errores, centralizar información.

3. **Automatización** — formularios conectados, notificaciones, seguimiento de clientes,
   generación de documentos, automatización de respuestas (incl. WhatsApp), integración entre
   plataformas.
   _Resultado comercial:_ menos trabajo repetitivo, más tiempo para tareas que generan ingresos.

Cada servicio se presenta por su **resultado**, no solo por el entregable.

---

## 7. Taxonomía de proyectos (portafolio extensible)

El portafolio **no es una lista fija**: es un sistema. Nuevos proyectos deben poder agregarse
sin rediseñar nada (ver detalle técnico en `ARCHITECTURE_RULES.md`).

**Categoría** (`category`): `web` · `system` · `application` · `automation` · `product` ·
`experiment`

**Tipo comercial:** proyecto para cliente · proyecto interno · producto SaaS · concepto ·
rediseño · MVP

**Estado** (`status`): `published` · `in-progress` · `concept` · `archived`

**Destacado:** `featured: true` → aparece en Inicio. El resto vive en el portafolio general.

---

## 8. Arquitectura de páginas (V1)

- Inicio (`/es` ↔ `/en`)
- Servicios (`/es/servicios` ↔ `/en/services`)
- Proyectos (`/es/proyectos` ↔ `/en/projects`)
- Webs (`/es/webs` ↔ `/en/websites`, vista filtrada de `category: "web"`)
- Caso de estudio: Meniva (`/es/proyectos/meniva` ↔ `/en/projects/meniva`)
- Sobre Fuentivo (`/es/sobre-fuentivo` ↔ `/en/about`)
- Contacto (`/es/contacto` ↔ `/en/contact`)
- Política de privacidad (`/es/privacidad` ↔ `/en/privacy`)

**Futuro (no V1):** Blog, Recursos, Plantillas, Casos de éxito, FAQ, páginas por industria,
páginas por servicio, Experimentos, Productos propios.

---

## 9. Caso de estudio inicial: Meniva

- **Problema:** restaurantes dependen de menús físicos/PDF/imágenes difíciles de actualizar.
- **Solución:** panel simple para crear categorías, productos, precios, disponibilidad, fotos,
  colores, y compartir el menú vía QR, en tiempo real.
- **Enfoque UX:** pensado para personas sin experiencia técnica; cualquier cambio debe poder
  hacerse rápido desde el teléfono.
- **Clasificación:** categoría `product`, tipo "Aplicación web", estado según corresponda.
- Regla: nunca inventar cifras de impacto que no existan; si no hay datos reales, se describe
  el beneficio cualitativo, no un porcentaje inventado.

---

## 10. Sobre Fuentivo (fundador)

Fuentivo es la marca principal; José Fuentes aparece como fundador, no al revés.

> Fuentivo nace de una idea simple: la tecnología debe hacer que los negocios avancen, no que
> sus procesos se vuelvan más complicados.

La sección "Sobre Fuentivo" debe responder, sin volverse autobiografía: quién lidera, qué
criterio tiene, cómo trabaja, por qué se puede confiar. Máximo 3–4 párrafos.

---

## 11. Bilingüe: ES (primario) / EN (secundario)

- Idioma por defecto: **español latinoamericano** (Panamá/LatAm), sin regionalismos que no se
  entiendan fuera de Panamá salvo en contexto explicado (ej. "Yappy").
- Idioma secundario: **inglés americano**, para clientes internacionales, freelance en el
  exterior o revisar el sitio con partners angloparlantes.
- El cambio de idioma es un **toggle explícito** en el header (no autodetección forzada que
  reemplace la elección del usuario sin control), ver detalle en `UI_GUIDELINES.md`.
- Todas las páginas públicas usan prefijo obligatorio (`/es` o `/en`) y la raíz `/` redirige
  a `/es`. Los segmentos estáticos se localizan; los slugs de proyectos permanecen iguales.
- Ningún contenido puede existir solo en un idioma. Si se agrega una sección/proyecto nuevo,
  la tarea no está completa sin su versión en el otro idioma (ver `rules-workspace.md`).
- Las traducciones deben sonar naturales en cada idioma, no traducciones literales palabra por
  palabra (esto aplica sobre todo a "Cómo trabajamos", CTAs y nombres de servicios).

---

## 12. SEO — intención comercial

Palabras clave objetivo: desarrollo web en Panamá, diseño de páginas web en Panamá, páginas web
para negocios, desarrollo de sistemas para empresas, automatización de procesos, páginas web
para restaurantes, menús digitales, desarrollo de aplicaciones web, software para pequeñas
empresas, automatización para PyMEs, diseño UX/UI en Panamá (+ equivalentes en inglés para la
versión EN, sin traducir keywords 1:1 sino investigar intención real en inglés).

---

## 13. Qué NO va en la V1

Blog complejo, CMS pesado, login, dashboard de cliente, chatbot embebido, animaciones 3D
pesadas, más de 2 idiomas, calculadora compleja, efectos WebGL, GSAP sin necesidad real,
múltiples fondos animados, una librería de animación distinta por sección.
