import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHero } from "@/components/sections/PageHero";
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
      <PageHero
        headingId="websites-page-title"
        eyebrow={t("intro.eyebrow")}
        title={t("intro.title")}
        description={t("intro.description")}
        variant="websites"
      />

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
