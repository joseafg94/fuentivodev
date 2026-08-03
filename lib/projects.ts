import { projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/projects";

const publicInProgressSlugs = new Set<string>();

export function sortProjects(projectList: readonly Project[]): Project[] {
  return [...projectList].sort(
    (a, b) => b.year - a.year || a.title.es.localeCompare(b.title.es, "es"),
  );
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

export function getFeaturedProjects(): Project[] {
  return getPublicProjects().filter((project) => project.featured);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getPublicProjects().filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublicProjects().find((project) => project.slug === slug);
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
