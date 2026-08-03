import { meniva } from "./meniva";
import type { Project } from "./schema";

export function assertUniqueProjectSlugs(projects: readonly Project[]): void {
  const seenSlugs = new Set<string>();

  for (const project of projects) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    seenSlugs.add(project.slug);
  }
}

export const projects: readonly Project[] = [meniva];

assertUniqueProjectSlugs(projects);

export { meniva };
export type {
  LocalizedText,
  Project,
  ProjectCategory,
  ProjectSeo,
  ProjectStatus,
  ProjectTestimonial,
} from "./schema";
export {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  localizedTextSchema,
  projectSchema,
} from "./schema";
