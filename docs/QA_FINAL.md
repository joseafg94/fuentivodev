# QA final y preparación para Vercel

Fecha: 3 de agosto de 2026.

## Resumen ejecutivo

El repositorio queda preparado como candidato para un Preview de Vercel. El QA corrigió cuatro
defectos confirmados: bucles 307 en rutas españolas localizadas, 404 dependiente de hidratación,
texto inglés dentro de la tarjeta Open Graph española, dependencias transitivas con
vulnerabilidades altas y un paquete transitivo incompleto que impedía iniciar Vitest. También se
fijó Node.js 24, se añadieron headers defensivos y se documentaron las variables de entorno.

No debe promoverse todavía a producción pública. Faltan confirmar la identidad legal responsable
del tratamiento y el plazo interno de conservación, configurar y verificar el dominio remitente
de Resend, y ejecutar las pruebas post-deploy indicadas al final de este documento.

## Estado de las fases

| Fase | Estado | Evidencia principal |
| --- | --- | --- |
| 0 — Fundamento técnico | Cumplido | Next.js App Router, TypeScript, Tailwind, UI base, fuentes e i18n compilan. |
| 1 — Layout y navegación | Cumplido | Header, MobileNav, Footer, ES/EN y WhatsApp presentes. |
| 2 — Sistema de proyectos | Cumplido | Zod, registro central, helpers y pruebas de integridad. |
| 3 — Inicio | Cumplido | Inicio ES/EN, servicios, proceso, destacados y CTA. |
| 4 — Servicios | Cumplido | Página editorial ES/EN y metadata localizada. |
| 5 — Proyectos y Webs | Cumplido | Catálogo compartido, filtros y estado vacío de Webs. |
| 6 — Caso de estudio | Cumplido | Meniva SSG, metadata, JSON-LD y 404 para slug inválido. |
| 7 — Sobre Fuentivo | Cumplido | Página ES/EN y datos estructurados sin datos inventados. |
| 8 — Contacto | Cumplido con limitación | Formulario, Server Action, Resend y anti-spam; sin rate limit distribuido. |
| 9 — Privacidad y SEO | Cumplido con pendiente legal | Implementación completa; identidad responsable y retención siguen pendientes. |
| 10 — Movimiento | Cumplido | Patrones centralizados y reduced motion presente. |
| 11 — Accesibilidad y rendimiento | Cumplido con mediciones pendientes | Lighthouse base aprobado; INP y repetición post-deploy pendientes. |
| 12 — QA y Vercel | Candidato a Preview | Build y rutas aprobados; no autorizado ni listo todavía para producción pública. |

## Checklist de aceptación completo

### 1. Idioma y contenido

- **Cumplido** — La aplicación funciona en ES y EN en las 16 rutas públicas aprobadas.
- **Cumplido** — Las traducciones fueron revisadas como contenido natural, no como calco literal.
- **Cumplido** — No aparecen resultados, clientes, testimonios ni métricas inventadas.
- **Cumplido** — Meniva se presenta como producto SaaS, sin atribuirlo a un cliente.
- **Cumplido** — Los campos opcionales sin información real se omiten; no hay `N/A` visible.

### 2. Diseño y consistencia visual

- **Cumplido** — Colores, tipografías y espaciado usan los tokens existentes.
- **Cumplido** — Se reutilizan `ProjectCard`, `ServiceCard`, `Container`, `Section` y CTA.
- **Cumplido** — Header, Footer y navegación visual no se modificaron durante este QA.
- **Cumplido** — Hero, entradas y microinteracciones conservan el sistema documentado.
- **Cumplido** — `prefers-reduced-motion` elimina desplazamientos y conserva el contenido.
- **Cumplido** — No se añadió ninguna librería de UI o animación.

### 3. Datos y arquitectura

- **Cumplido** — Meniva valida contra el esquema oficial `Project` de Zod.
- **Cumplido** — El slug `meniva` es único, minúsculo y estable.
- **Cumplido** — Catálogo, destacados, categorías y relacionados usan el registro y helpers centrales.
- **Cumplido** — No se añadieron dependencias; se forzaron versiones parcheadas de PostCSS y Sharp y la versión estable anterior de `expect-type` para evitar el paquete 1.4.0 incompleto.

### 4. SEO y accesibilidad

- **Cumplido** — Las 16 páginas tienen título, descripción, canonical, tres alternates y Open Graph.
- **Cumplido** — Las imágenes visibles usan `next/image`, dimensiones reservadas, `sizes` y alt localizado.
- **Cumplido** — Todas las rutas públicas y la 404 entregan exactamente un `h1` en HTML.
- **Cumplido** — Lighthouse obtuvo Accessibility 100; teclado, errores de formulario y foco fueron verificados en Fase 11.
- **Cumplido** — No hay contenido esencial dependiente únicamente de hover.
- **Cumplido** — `sitemap.xml` contiene 16 URLs únicas y `robots.txt` publica el sitemap canónico.

### 5. Rendimiento

- **Cumplido** — CLS fue 0 en las seis rutas medidas en Fase 11.
- **Cumplido** — Las animaciones de contenido usan `transform` y `opacity`.
- **No aplica** — No existen componentes visuales pesados que requieran otro lazy-load.
- **Cumplido** — No hay scripts de terceros ni analítica cargada.
- **Cumplido** — Lighthouse móvil de Fase 11 obtuvo Performance entre 94 y 99.

### 6. Calidad técnica

- **Cumplido** — `pnpm lint` pasa.
- **Cumplido** — `pnpm type-check` pasa.
- **Cumplido** — `pnpm build` genera 22 páginas sin errores.
- **No verificado** — El pase visual posterior a estas correcciones no pudo repetirse por la restricción del navegador; el pase anterior cubrió 320–1440 px, ES/EN y reduced motion.
- **Cumplido** — Las 16 rutas, la raíz, 404, assets, sitemap, robots y manifest fueron comprobados contra producción local.

### 7. Comunicación

- **Cumplido** — Este reporte explica cambios, decisiones, evidencia y pendientes en español.
- **Cumplido** — Los puntos no verificables y los bloqueos se declaran explícitamente.

## Rutas verificadas en producción local

Todas las siguientes respondieron `200`, con `html lang` correcto, un `h1`, metadata y canonical
propio:

- ES: `/es`, `/es/servicios`, `/es/proyectos`, `/es/webs`, `/es/proyectos/meniva`,
  `/es/sobre-fuentivo`, `/es/contacto`, `/es/privacidad`.
- EN: `/en`, `/en/services`, `/en/projects`, `/en/websites`, `/en/projects/meniva`,
  `/en/about`, `/en/contact`, `/en/privacy`.

Comprobaciones adicionales:

- **Cumplido** — `/` responde `307` hacia `/es` sin detección automática.
- **Cumplido** — Slugs y rutas desconocidas responden `404`, `noindex`, idioma correcto y UI localizada desde el HTML inicial.
- **No aplica** — No existe `/api/contact`: la implementación aprobada usa una Server Action validada en servidor.
- **Cumplido** — `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `icon.svg` y las dos imágenes de Meniva responden `200`.
- **Cumplido** — Las variantes internas inglesas bajo `/es` redirigen permanentemente a sus URLs españolas canónicas.
- **Cumplido** — Se revisaron 17 destinos internos renderizados y ninguno devuelve error.

## Idiomas y contenido

- **Cumplido** — El selector conserva la página equivalente en los ocho pares de rutas.
- **Cumplido** — `html lang`, canonical, alternates, metadata y mensajes de formulario cambian con el locale.
- **Cumplido** — WhatsApp usa `50768564698` y mensajes naturales distintos en ES y EN.
- **Cumplido** — No hay lorem ipsum, placeholders públicos, `example.com`, TODO/FIXME críticos ni assets faltantes.
- **No aplica** — Las direcciones `example.test` solo aparecen como ejemplos seguros en `.env.example`.
- **Cumplido** — Redes sociales permanecen vacías en configuración y no se inventaron enlaces.

## Proyectos

- **Cumplido** — Meniva está en categoría `product`, estado `published`, año 2026 y `featured: true`.
- **Cumplido** — Catálogo, filtro Productos, destacado, metadata, sitemap y schema `SoftwareApplication` derivan del mismo dato.
- **Cumplido** — Zod valida campos bilingües, URLs, imágenes, arrays, categorías y estados.
- **Cumplido** — Las pruebas rechazan slugs duplicados y excluyen `archived`.
- **Cumplido** — Webs muestra su estado vacío porque no hay proyectos `web`; no se inventó contenido.
- **No aplica** — No hay proyecto relacionado de la misma categoría, por lo que la sección se omite.

## Contacto

- **Cumplido** — React Hook Form y Zod validan cliente; Zod vuelve a validar en la Server Action.
- **Cumplido** — Trimming, límites, locale, contacto, honeypot, tiempo mínimo y payload máximo están cubiertos.
- **Cumplido** — El correo escapa HTML y Resend solo se instancia en servidor.
- **Cumplido** — Las pruebas cubren configuración faltante, fallo del proveedor, spam e idempotencia.
- **Cumplido** — WhatsApp funciona como fallback; Yappy y privacidad aparecen en contexto.
- **No verificado** — El envío real no puede aprobarse hasta configurar una clave y un remitente verificado en el Preview.
- **No verificado** — No existe rate limiting distribuido; la idempotencia reduce duplicados, pero no sustituye un límite compartido en serverless.

## SEO y seguridad

- **Cumplido** — Se validaron ocho bloques JSON-LD; todos son JSON válido y usan datos visibles.
- **Cumplido** — La 404 no tiene canonical y recibe `noindex`.
- **Cumplido** — Preview está cubierto por la prueba de `robots` con `Disallow: /`; producción permite páginas y excluye `/api/`.
- **Cumplido** — `.env.local` está ignorado y no está versionado; el escaneo de archivos rastreados no encontró secretos.
- **Cumplido** — `pnpm audit --prod --audit-level high` devuelve cero vulnerabilidades conocidas.
- **Cumplido** — Enlaces externos con nueva pestaña usan `noreferrer`.
- **Cumplido** — El único `dangerouslySetInnerHTML` serializa JSON-LD y escapa `<`.
- **Cumplido** — Se probaron `nosniff`, `DENY`, `strict-origin-when-cross-origin` y la política de permisos.
- **No aplica** — No se añadió CSP porque no se realizó una prueba completa de compatibilidad de directivas.

## Accesibilidad y rendimiento

- **Cumplido** — Lighthouse móvil previo: Home ES 99/100/96/92, Home EN 99/100/96/92,
  Servicios 97/100/96/92, Proyectos 94/100/96/92, Meniva 96/100/96/92 y Contacto 94/100/96/92
  en Performance/Accessibility/Best Practices/SEO.
- **Cumplido** — Tras ese pase se corrigieron favicon y `x-default`; las nuevas puntuaciones requieren redeploy.
- **Cumplido** — CLS 0, TBT 30–110 ms y LCP de laboratorio 1.9–2.9 s en las mediciones disponibles.
- **No verificado** — INP necesita datos de campo.
- **No verificado** — Zoom al 200 % no se repitió en esta fase.
- **Cumplido** — Seis Client Components aislados; no hay scripts de terceros ni fuentes desde CDN.
- **Cumplido** — Sora, Inter y Geist Mono usan `next/font`, subset Latin, `swap` y 2–3 pesos.

## Variables de entorno para Vercel

Configurar exactamente estas cuatro variables:

| Variable | Valor que debe configurar el usuario | Entornos |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio HTTPS canónico final, sin ruta; usar el mismo dominio canónico en Preview | Production y Preview |
| `RESEND_API_KEY` | Clave privada `re_...`, marcada como Sensitive | Production y Preview |
| `CONTACT_EMAIL` | `fuentivo@gmail.com` | Production y Preview |
| `CONTACT_FROM_EMAIL` | `Fuentivo <contacto@dominio-verificado>` | Production y Preview |

`NEXT_PUBLIC_SITE_URL` es pública. Las otras tres son server-only y nunca deben llevar el
prefijo `NEXT_PUBLIC_`. El número de WhatsApp está centralizado como dato público en
`config/site.ts`; `NEXT_PUBLIC_WHATSAPP_NUMBER` no se usa y no debe configurarse.

## Preparación de Vercel

- **Cumplido** — Framework detectable como Next.js 16.2.12.
- **Cumplido** — Node.js fijado a `24.x`, versión disponible y predeterminada actualmente en Vercel.
- **Cumplido** — pnpm fijado a `11.9.0` mediante `packageManager` y lockfile actualizado.
- **Cumplido** — Build, redirects, rewrites, imágenes, sitemap, robots y headers funcionan localmente.
- **No verificado** — El repositorio no está enlazado a un proyecto Vercel dentro de este entorno.
- **No verificado** — No se creó Preview ni se desplegó porque no hubo autorización explícita.

## Pasos manuales exactos

1. Confirmar la identidad legal responsable del tratamiento y el plazo interno de conservación;
   actualizar únicamente esas dos frases de la política.
2. Verificar en Resend el dominio que se usará en `CONTACT_FROM_EMAIL`.
3. Importar el repositorio en Vercel y confirmar Root Directory en la raíz, Framework `Next.js`,
   Node.js `24.x` y pnpm detectado desde `packageManager`.
4. Crear las cuatro variables indicadas para Preview y Production; no copiar `.env.local`.
5. Desplegar primero un Preview y comprobar que `robots.txt` contiene `Disallow: /`.
6. Probar un envío válido real y confirmar recepción, Reply-To, error visible y fallback de WhatsApp.
7. Recorrer las 16 rutas, selector ES/EN, 404, navegación móvil, filtros y formulario a 320 px,
   desktop, teclado, reduced motion y zoom 200 %.
8. Ejecutar Lighthouse móvil en Home ES/EN, Servicios, Proyectos, Meniva y Contacto sobre el Preview.
9. Promover el mismo artefacto aprobado a Production.
10. Confirmar canonical, hreflang, OG, sitemap y robots con el dominio final; ejecutar otro envío
    y revisar logs de funciones sin registrar el payload completo.

## Comandos ejecutados

- `pnpm lint` — pasa.
- `pnpm type-check` — pasa.
- `pnpm test` — 25 pruebas pasan; `expect-type` queda fijado en 1.3.0 porque el artefacto 1.4.0 instalado no contiene `dist/branding.js` y bloquea los workers de Vitest.
- `pnpm build` — pasa; 22 páginas generadas.
- `pnpm audit --prod --audit-level high` — cero vulnerabilidades conocidas tras overrides.
- `pnpm test:e2e` — **No aplica**; no existe ese script ni configuración E2E.

## Riesgos y pendientes

- **Bloqueante legal** — Identidad responsable y retención no confirmadas.
- **Bloqueante operativo** — Resend no puede aprobarse sin credenciales y dominio remitente reales.
- **Pendiente de despliegue** — Preview, logs, robots efectivo y scores posteriores aún no medidos.
- **Riesgo conocido** — La protección anti-spam carece de rate limiting distribuido.
- **Riesgo de plataforma** — `globalNotFound` sigue marcado experimental en Next.js; se usa porque
  es la convención oficial para un layout raíz bajo `[locale]` y fue validado localmente con 404 real.
- **Pendiente de campo** — INP y Core Web Vitals reales requieren tráfico y observabilidad.

Referencias de plataforma: [versiones Node.js en Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions),
[global-not-found en Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) y
[variables de entorno de Vercel](https://vercel.com/docs/environment-variables).
