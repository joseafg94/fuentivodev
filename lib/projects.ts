import { projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/projects";

const publicInProgressSlugs = new Set<string>();

function compareProjects(a: Project, b: Project): number {
  return b.year - a.year || a.title.es.localeCompare(b.title.es, "es");
}

export function sortProjects(projectList: readonly Project[]): Project[] {
  return [...projectList].sort(compareProjects);
}

export function isProjectPublic(project: Project): boolean {
  return (
    project.status === "published" ||
    project.status === "concept" ||
    (project.status === "in-progress" &&
      publicInProgressSlugs.has(project.slug))
  );
}

export function getAllProjects(): Project[] {
  return sortProjects(projects);
}

export function getPublicProjects(): Project[] {
  return getAllProjects().filter(isProjectPublic);
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featuredProjects = getPublicProjects()
    .filter((project) => project.featured)
    .sort((a, b) => {
      const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY;
      const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY;

      return aOrder - bOrder || compareProjects(a, b);
    });

  return limit === undefined ? featuredProjects : featuredProjects.slice(0, Math.max(0, limit));
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getPublicProjects().filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublicProjects().find((project) => project.slug === slug);
}

export function getProjectStaticParams(locales: readonly string[]) {
  return locales.flatMap((locale) =>
    getPublicProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export function shouldIndexProject(project: Project): boolean {
  return project.status === "published";
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  if (limit <= 0) {
    return [];
  }

  return getPublicProjects()
    .filter(
      (candidate) =>
        candidate.slug !== project.slug &&
        candidate.category === project.category,
    )
    .slice(0, limit);
}
