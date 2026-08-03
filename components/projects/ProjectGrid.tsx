import { getTranslations } from "next-intl/server";

import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  projects: readonly Project[];
  locale: Locale;
};

export async function ProjectGrid({ projects, locale }: ProjectGridProps) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((project) => (
        <div key={project.slug} data-project-category={project.category}>
          <ProjectCard
            project={project}
            locale={locale}
            categoryLabel={t(`category.${project.category}`)}
            statusLabel={t(`status.${project.status}`)}
            viewProjectLabel={t("viewProject")}
            liveProjectLabel={t("liveProject")}
          />
        </div>
      ))}
    </div>
  );
}
