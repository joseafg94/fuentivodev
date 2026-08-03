import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublicProjects, shouldIndexProject } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { appRoutes, getLocalizedPath, getLocalizedProjectPath } from "@/lib/routes";

const staticRoutes = [
  appRoutes.home,
  appRoutes.services,
  appRoutes.projects,
  appRoutes.websites,
  appRoutes.about,
  appRoutes.contact,
  appRoutes.privacy,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.flatMap((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(getLocalizedPath(locale, href), siteConfig.url).toString(),
      ]),
    );
    languages["x-default"] = siteConfig.url.toString();

    return routing.locales.map((locale) => ({
      url: new URL(getLocalizedPath(locale, href), siteConfig.url).toString(),
      alternates: { languages },
    }));
  });

  const projects = getPublicProjects().filter(shouldIndexProject).flatMap((project) => {
    const projectLanguages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(getLocalizedProjectPath(locale, project.slug), siteConfig.url).toString(),
      ]),
    );
    projectLanguages["x-default"] = siteConfig.url.toString();

    return routing.locales.map((locale) => ({
      url: new URL(
        getLocalizedProjectPath(locale, project.slug),
        siteConfig.url,
      ).toString(),
      alternates: { languages: projectLanguages },
    }));
  });

  return [...pages, ...projects];
}
