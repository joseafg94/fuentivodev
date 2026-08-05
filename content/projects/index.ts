import { alturaArquitectura } from "./altura-arquitectura";
import { meniva } from "./meniva";
import { ordena } from "./ordena";
import { scope } from "./scope";
import type { Project } from "./schema";
import { splitly } from "./splitly";

export function assertUniqueProjectSlugs(projects: readonly Project[]): void {
  const seenSlugs = new Set<string>();

  for (const project of projects) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    seenSlugs.add(project.slug);
  }
}

export const projects: readonly Project[] = [
  meniva,
  alturaArquitectura,
  scope,
  ordena,
  splitly,
];

assertUniqueProjectSlugs(projects);

export { alturaArquitectura, meniva, ordena, scope, splitly };
export type {
  LocalizedText,
  Project,
  ProjectCategory,
  ProjectCommercialType,
  ProjectImage,
  ProjectSeo,
  ProjectStatus,
  ProjectTestimonial,
} from "./schema";
export {
  PROJECT_CATEGORIES,
  PROJECT_COMMERCIAL_TYPES,
  PROJECT_STATUSES,
  localizedTextSchema,
  projectImageSchema,
  projectSchema,
} from "./schema";
