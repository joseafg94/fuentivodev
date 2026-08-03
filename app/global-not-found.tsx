import type { Metadata } from "next";
import { headers } from "next/headers";

import { Container } from "@/components/ui/container";
import { appRoutes, getLocalizedPath } from "@/lib/routes";

import "./globals.css";

const copy = {
  es: {
    title: "Página no encontrada | Fuentivo",
    heading: "Esta página no existe.",
    description: "La dirección puede ser incorrecta o el contenido ya no está disponible.",
    home: "Volver al inicio",
    projects: "Ver proyectos",
  },
  en: {
    title: "Page not found | Fuentivo",
    heading: "This page does not exist.",
    description: "The address may be incorrect or the content may no longer be available.",
    home: "Return home",
    projects: "View projects",
  },
} as const;

async function getRequestLocale() {
  return (await headers()).get("x-next-intl-locale") === "en" ? "en" : "es";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();

  return {
    title: copy[locale].title,
    robots: { index: false, follow: false },
  };
}

export default async function GlobalNotFound() {
  const locale = await getRequestLocale();
  const labels = copy[locale];

  return (
    <html lang={locale} className="dark">
      <body className="flex min-h-screen bg-background text-foreground antialiased">
        <main id="main-content" className="flex flex-1 items-center border-b border-border py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="font-mono text-sm uppercase tracking-[0.16em] text-primary">404</p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
                {labels.heading}
              </h1>
              <p className="mt-6 text-lg leading-8 text-fuentivo-secondary">
                {labels.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={getLocalizedPath(locale, appRoutes.home)}
                  className="inline-flex min-h-11 items-center rounded-control bg-primary px-5 py-3 font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {labels.home}
                </a>
                <a
                  href={getLocalizedPath(locale, appRoutes.projects)}
                  className="inline-flex min-h-11 items-center rounded-control border border-border px-5 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {labels.projects}
                </a>
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
