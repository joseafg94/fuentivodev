import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localeDetection: false,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": {
      es: "/servicios",
      en: "/services",
    },
    "/projects": {
      es: "/proyectos",
      en: "/projects",
    },
    "/projects/[slug]": {
      es: "/proyectos/[slug]",
      en: "/projects/[slug]",
    },
    "/websites": {
      es: "/webs",
      en: "/websites",
    },
    "/about": {
      es: "/sobre-fuentivo",
      en: "/about",
    },
    "/contact": {
      es: "/contacto",
      en: "/contact",
    },
    "/privacy": {
      es: "/privacidad",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
