import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PROJECT_CATEGORIES } from "@/content/projects";
import type { ProjectCategory } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { getPublicProjects } from "@/lib/projects";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type ProjectsPageProps = {
  params: Promise<{ locale: Locale }>;
};

type FilterValue = "all" | ProjectCategory;

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.projects,
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  const projects = getPublicProjects();
  const categoryCounts = Object.fromEntries(
    PROJECT_CATEGORIES.map((category) => [
      category,
      projects.filter((project) => project.category === category).length,
    ]),
  ) as Record<ProjectCategory, number>;
  const counts: Record<FilterValue, number> = {
    all: projects.length,
    ...categoryCounts,
  };
  const filters = [
    { value: "all" as const, label: t("filters.all") },
    ...PROJECT_CATEGORIES.filter(
      (category) => category !== "experiment" || categoryCounts.experiment > 0,
    ).map((category) => ({
      value: category,
      label: t(`filters.${category}`),
    })),
  ];

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <section
        aria-labelledby="projects-page-title"
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
              id="projects-page-title"
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

      <Section aria-labelledby="projects-catalog-title" className="section-reveal">
        <Container>
          <div className="max-w-3xl">
            <h2 id="projects-catalog-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("catalog.title")}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
              {t("catalog.description")}
            </p>
          </div>

          <div className="mt-10">
            {projects.length === 0 ? (
              <EmptyProjects
                title={t("empty.allTitle")}
                description={t("empty.allDescription")}
              />
            ) : (
              <ProjectFilters
                filters={filters}
                counts={counts}
                filterLabel={t("filterLabel")}
                resultsLabel={t("resultsLabel")}
                emptyTitle={t("empty.filterTitle")}
                emptyDescription={t("empty.filterDescription")}
              >
                <ProjectGrid projects={projects} locale={locale} />
              </ProjectFilters>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
