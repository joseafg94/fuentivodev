# SEO y despliegues

- `NEXT_PUBLIC_SITE_URL` debe apuntar al dominio canónico de producción, nunca a una URL de preview.
- En Vercel, los despliegues con `VERCEL_ENV=preview` generan `robots.txt` con `Disallow: /` y sin sitemap.
- Producción permite las páginas públicas, excluye `/api/` y publica el sitemap del dominio canónico.
- Antes del lanzamiento se deben confirmar la identidad legal responsable de los datos y el plazo interno de conservación indicado en la política de privacidad.

## Variables requeridas en Vercel

| Variable | Visibilidad | Formato | Entornos | Propósito |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Pública | URL absoluta HTTPS, sin ruta | Production y Preview | Genera canonical, alternates, Open Graph, sitemap y robots con el dominio de producción. |
| `RESEND_API_KEY` | Privada y Sensitive | Clave `re_...` | Production y Preview | Autoriza el envío server-side del formulario. |
| `CONTACT_EMAIL` | Privada | Correo válido | Production y Preview | Recibe las consultas enviadas. |
| `CONTACT_FROM_EMAIL` | Privada | `Nombre <correo@dominio-verificado>` | Production y Preview | Define el remitente autorizado por Resend. |

Los ejemplos seguros están en `.env.example`. El número de WhatsApp y el correo público viven
en `config/site.ts`; no existe `NEXT_PUBLIC_WHATSAPP_NUMBER` porque el código no la consume.

## Configuración y flujo de lanzamiento

1. Importar el repositorio en Vercel con el directorio raíz del proyecto.
2. Confirmar Framework Preset `Next.js`, Node.js `24.x` y pnpm `11.9.0`.
3. Configurar las cuatro variables anteriores; `NEXT_PUBLIC_SITE_URL` debe conservar el dominio
   canónico también en Preview para evitar canonical hacia dominios temporales.
4. Verificar el dominio remitente en Resend antes de probar el formulario.
5. Crear un Preview, ejecutar el QA de rutas y formulario, y confirmar que `robots.txt` bloquea
   el indexado del Preview.
6. Promover el mismo artefacto validado a Production y repetir las comprobaciones post-deploy.
