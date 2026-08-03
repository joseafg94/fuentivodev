import type { Metadata } from "next";
import { describe, expect, it } from "vitest";

import { createRobots } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { meniva } from "@/content/projects";
import type { Project } from "@/content/projects";
import {
  appRoutes,
  getLocalizedPath,
  getLocalizedProjectPath,
} from "@/lib/routes";
import { createLocalizedMetadata, createProjectMetadata } from "@/lib/seo";

function languageAlternates(metadata: Metadata) {
  return metadata.alternates?.languages as Record<string, string>;
}

describe("localized SEO", () => {
  it("resolves official localized routes without pathname replacement", () => {
    expect(getLocalizedPath("es", appRoutes.services)).toBe("/es/servicios");
    expect(getLocalizedPath("en", appRoutes.privacy)).toBe("/en/privacy");
    expect(getLocalizedProjectPath("es", "meniva")).toBe("/es/proyectos/meniva");
    expect(getLocalizedProjectPath("en", "meniva")).toBe("/en/projects/meniva");
  });

  it("creates absolute canonical and language alternates", () => {
    const metadata = createLocalizedMetadata({
      locale: "es",
      href: appRoutes.about,
      title: "Sobre Fuentivo",
      description: "Descripción única",
    });
    const languages = languageAlternates(metadata);

    expect(String(metadata.alternates?.canonical)).toMatch(/\/es\/sobre-fuentivo$/);
    expect(languages.es).toMatch(/\/es\/sobre-fuentivo$/);
    expect(languages.en).toMatch(/\/en\/about$/);
    expect(languages["x-default"]).toMatch(/^https?:\/\/[^/]+\/$/);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("creates localized, indexable metadata for Meniva", () => {
    const metadata = createProjectMetadata(meniva, "en");
    const languages = languageAlternates(metadata);

    expect(String(metadata.alternates?.canonical)).toMatch(/\/en\/projects\/meniva$/);
    expect(languages.es).toMatch(/\/es\/proyectos\/meniva$/);
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });

  it("marks concept and archived project metadata as noindex", () => {
    for (const status of ["concept", "archived"] as const) {
      const project: Project = { ...meniva, status };
      expect(createProjectMetadata(project, "es").robots).toMatchObject({
        index: false,
        follow: false,
      });
    }
  });

  it("includes implemented bilingual routes and indexable projects in sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls.some((url) => url.endsWith("/es/privacidad"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/en/privacy"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/es/proyectos/meniva"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/en/projects/meniva"))).toBe(true);
    expect(urls.some((url) => url.includes("/api/"))).toBe(false);
  });

  it("blocks previews while keeping production public", () => {
    expect(createRobots(true)).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
    expect(createRobots(false)).toMatchObject({
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    });
  });
});
