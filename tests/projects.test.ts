import { describe, expect, it } from "vitest";

import {
  alturaArquitectura,
  assertUniqueProjectSlugs,
  meniva,
  ordena,
  projectSchema,
  projects,
  scope,
  splitly,
} from "@/content/projects";
import type { Project } from "@/content/projects";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectStaticParams,
  getProjectsByCategory,
  getPublicProjects,
  isProjectPublic,
  shouldIndexProject,
} from "@/lib/projects";

const newProjects = [alturaArquitectura, scope, ordena, splitly] as const;

describe("project data", () => {
  it.each([
    ["Meniva", meniva],
    ["Altura Arquitectura", alturaArquitectura],
    ["Scope", scope],
    ["Ordena", ordena],
    ["Splitly", splitly],
  ])("validates %s against the official schema", (_name, project) => {
    expect(projectSchema.safeParse(project).success).toBe(true);
  });

  it("requires complete Spanish and English content", () => {
    const incompleteProject = {
      ...alturaArquitectura,
      title: { ...alturaArquitectura.title, en: "" },
    };

    expect(projectSchema.safeParse(incompleteProject).success).toBe(false);
  });

  it("keeps project slugs unique", () => {
    expect(() => assertUniqueProjectSlugs(projects)).not.toThrow();
    expect(() => assertUniqueProjectSlugs([meniva, meniva])).toThrow(
      "Duplicate project slug: meniva",
    );
  });

  it("keeps the required category, commercial type, status, and featured order", () => {
    expect(newProjects.map((project) => ({
      slug: project.slug,
      category: project.category,
      commercialType: project.commercialType,
      status: project.status,
      featured: project.featured,
      featuredOrder: project.featuredOrder,
    }))).toEqual([
      { slug: "altura-arquitectura", category: "web", commercialType: "concept", status: "published", featured: true, featuredOrder: 1 },
      { slug: "scope", category: "product", commercialType: "concept", status: "published", featured: true, featuredOrder: 2 },
      { slug: "ordena", category: "system", commercialType: "internal-project", status: "published", featured: true, featuredOrder: 3 },
      { slug: "splitly", category: "application", commercialType: "mvp", status: "published", featured: true, featuredOrder: 4 },
    ]);
  });

  it("orders featured projects centrally and applies an optional limit", () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      "altura-arquitectura",
      "scope",
      "ordena",
      "splitly",
      "meniva",
    ]);
    expect(getFeaturedProjects(4).map((project) => project.slug)).toEqual([
      "altura-arquitectura",
      "scope",
      "ordena",
      "splitly",
    ]);
    expect(getFeaturedProjects(0)).toEqual([]);
  });

  it("rejects featuredOrder when a project is not featured", () => {
    expect(projectSchema.safeParse({
      ...alturaArquitectura,
      featured: false,
      featuredOrder: 1,
    }).success).toBe(false);
  });

  it("filters public projects by their official category", () => {
    expect(getProjectsByCategory("web").map((project) => project.slug)).toEqual([
      "altura-arquitectura",
    ]);
    expect(getProjectsByCategory("product").map((project) => project.slug)).toEqual([
      "meniva",
      "scope",
    ]);
    expect(getProjectsByCategory("system").map((project) => project.slug)).toEqual([
      "ordena",
    ]);
    expect(getProjectsByCategory("application").map((project) => project.slug)).toEqual([
      "splitly",
    ]);
  });

  it.each(newProjects)("finds $slug by slug", (project) => {
    expect(getProjectBySlug(project.slug)).toBe(project);
  });

  it("keeps Meniva in the public catalog", () => {
    expect(getProjectBySlug("meniva")).toBe(meniva);
  });

  it("excludes archived projects from public views", () => {
    const archivedProject: Project = {
      ...meniva,
      slug: "archived-project",
      status: "archived",
    };

    expect(isProjectPublic(archivedProject)).toBe(false);
    expect(getPublicProjects().some((project) => project.status === "archived")).toBe(false);
  });

  it("generates both localized static routes for every public project", () => {
    const params = getProjectStaticParams(["es", "en"]);

    for (const project of projects) {
      expect(params).toEqual(expect.arrayContaining([
        { locale: "es", slug: project.slug },
        { locale: "en", slug: project.slug },
      ]));
    }
  });

  it("uses valid HTTPS demos without clients or invented results", () => {
    for (const project of newProjects) {
      expect(new URL(project.liveUrl ?? "").protocol).toBe("https:");
      expect(project).not.toHaveProperty("client");
      expect(project).not.toHaveProperty("results");
      expect(project).not.toHaveProperty("testimonial");
    }
  });

  it("only indexes published projects", () => {
    const concept: Project = { ...meniva, status: "concept" };

    expect(newProjects.every(shouldIndexProject)).toBe(true);
    expect(shouldIndexProject(concept)).toBe(false);
  });
});
