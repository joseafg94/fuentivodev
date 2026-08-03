# Formulario de contacto

El envío usa Resend desde una Server Action y requiere `RESEND_API_KEY`, `CONTACT_EMAIL` y
`CONTACT_FROM_EMAIL`. El dominio de `CONTACT_FROM_EMAIL` debe estar verificado en Resend.

La protección actual combina validación estricta en cliente y servidor, límite de payload,
honeypot, tiempo mínimo de llenado e idempotencia de Resend por intervalos de diez minutos.
No existe un rate limit distribuido porque el proyecto no tiene almacenamiento persistente;
un límite en memoria no sería confiable en Vercel serverless. Si el volumen lo exige, debe
aprobarse un almacén compartido antes de añadir esa capa.
