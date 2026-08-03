import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";
import { getProjectsByCategory } from "@/lib/projects";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type WebsitesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: WebsitesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WebsitesPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.websites,
    title: t("title"),
    description: t("description"),
  });
}

export default async function WebsitesPage({ params }: WebsitesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "WebsitesPage" });
  const projects = getProjectsByCategory("web");

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <section
        aria-labelledby="websites-page-title"
        className="relative isolate overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(0,184,106,0.16),transparent_30%)]"
        />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="py-20 sm:py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm">
              {t("intro.eyebrow")}
            </p>
            <h1
              id="websites-page-title"
              className="mt-5 text-balance text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
            >
              {t("intro.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-fuentivo-secondary sm:text-lg sm:leading-8">
              {t("intro.description")}
            </p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="websites-catalog-title" className="section-reveal">
        <Container>
          <div className="max-w-3xl">
            <h2 id="websites-catalog-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("catalog.title")}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
              {t("catalog.description")}
            </p>
          </div>

          <div className="mt-10">
            {projects.length === 0 ? (
              <EmptyProjects
                title={t("empty.title")}
                description={t("empty.description")}
              />
            ) : (
              <ProjectGrid projects={projects} locale={locale} />
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
