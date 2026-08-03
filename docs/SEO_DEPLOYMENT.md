# SEO y despliegues

- `NEXT_PUBLIC_SITE_URL` debe apuntar al dominio canónico de producción, nunca a una URL de preview.
- En Vercel, los despliegues con `VERCEL_ENV=preview` generan `robots.txt` con `Disallow: /` y sin sitemap.
- Producción permite las páginas públicas, excluye `/api/` y publica el sitemap del dominio canónico.
- Antes del lanzamiento se deben confirmar la identidad legal responsable de los datos y el plazo interno de conservación indicado en la política de privacidad.
