import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/projects";
import { appRoutes } from "@/lib/routes";

type FeaturedProjectsProps = {
  locale: Locale;
};

export async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations({ locale, namespace: "Home.featured" });
  const projects = getFeaturedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="featured-title" className="section-reveal">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("eyebrow")}
            </p>
            <h2 id="featured-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
              {t("description")}
            </p>
          </div>
          <Link
            href={appRoutes.projects}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-medium text-primary sm:self-auto"
          >
            {t("viewAll")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className={projects.length === 1 ? "mt-12 max-w-5xl" : "mt-12 grid gap-6 lg:grid-cols-2"}>
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              statusLabel={t(`status.${project.status}`)}
              viewProjectLabel={t("viewProject")}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
