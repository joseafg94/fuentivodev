import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "web",
  "system",
  "application",
  "automation",
  "product",
  "experiment",
] as const;

export const PROJECT_STATUSES = [
  "published",
  "in-progress",
  "concept",
  "archived",
] as const;

const requiredText = z.string().trim().min(1);
const imagePath = requiredText.startsWith("/");

export const localizedTextSchema = z
  .object({
    es: requiredText,
    en: requiredText,
  })
  .strict();

const seoEntrySchema = z
  .object({
    title: requiredText,
    description: requiredText,
    image: imagePath.optional(),
  })
  .strict();

const testimonialSchema = z
  .object({
    quote: localizedTextSchema,
    author: requiredText,
    role: requiredText.optional(),
  })
  .strict();

export const projectSchema = z
  .object({
    slug: requiredText.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: localizedTextSchema,
    shortDescription: localizedTextSchema,
    summary: localizedTextSchema,
    category: z.enum(PROJECT_CATEGORIES),
    status: z.enum(PROJECT_STATUSES),
    year: z.number().int().min(2000).max(2100),
    featured: z.boolean(),
    client: requiredText.optional(),
    industry: localizedTextSchema.optional(),
    location: requiredText.optional(),
    coverImage: imagePath,
    thumbnailImage: imagePath,
    gallery: z.array(imagePath).min(1).optional(),
    liveUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
    services: z.array(requiredText).min(1),
    technologies: z.array(requiredText).min(1),
    tags: z.array(requiredText).min(1),
    challenge: localizedTextSchema,
    objective: localizedTextSchema,
    solution: localizedTextSchema,
    process: z.array(localizedTextSchema).min(1).optional(),
    features: z.array(localizedTextSchema).min(1).optional(),
    uxDecisions: z.array(localizedTextSchema).min(1).optional(),
    results: z.array(localizedTextSchema).min(1).optional(),
    testimonial: testimonialSchema.optional(),
    seo: z
      .object({
        es: seoEntrySchema,
        en: seoEntrySchema,
      })
      .strict(),
  })
  .strict();

export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectSeo = z.infer<typeof seoEntrySchema>;
export type ProjectTestimonial = z.infer<typeof testimonialSchema>;
export type Project = z.infer<typeof projectSchema>;

export function defineProject(project: unknown): Project {
  return projectSchema.parse(project);
}
