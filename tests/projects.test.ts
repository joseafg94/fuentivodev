import { describe, expect, it } from "vitest";

import {
  assertUniqueProjectSlugs,
  meniva,
  projectSchema,
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

describe("project data", () => {
  it("validates Meniva against the official schema", () => {
    expect(projectSchema.safeParse(meniva).success).toBe(true);
  });

  it("requires complete Spanish and English content", () => {
    const incompleteProject = {
      ...meniva,
      title: { ...meniva.title, en: "" },
    };

    expect(projectSchema.safeParse(incompleteProject).success).toBe(false);
  });

  it("rejects duplicate slugs", () => {
    expect(() => assertUniqueProjectSlugs([meniva, meniva])).toThrow(
      "Duplicate project slug: meniva",
    );
  });

  it("returns featured public projects", () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      "meniva",
    ]);
  });

  it("filters public projects by category", () => {
    expect(getProjectsByCategory("product").map((project) => project.slug)).toEqual(
      ["meniva"],
    );
    expect(getProjectsByCategory("web")).toEqual([]);
  });

  it("finds a project by slug", () => {
    expect(getProjectBySlug("meniva")).toBe(meniva);
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("excludes archived projects from public views", () => {
    const archivedProject: Project = {
      ...meniva,
      slug: "archived-project",
      status: "archived",
    };

    expect(isProjectPublic(archivedProject)).toBe(false);
    expect(getPublicProjects().some((project) => project.status === "archived")).toBe(
      false,
    );
  });

  it("generates both localized static routes for Meniva", () => {
    expect(getProjectStaticParams(["es", "en"])).toEqual(
      expect.arrayContaining([
        { locale: "es", slug: "meniva" },
        { locale: "en", slug: "meniva" },
      ]),
    );
  });

  it("only indexes published projects", () => {
    const concept: Project = { ...meniva, status: "concept" };

    expect(shouldIndexProject(meniva)).toBe(true);
    expect(shouldIndexProject(concept)).toBe(false);
  });
});
