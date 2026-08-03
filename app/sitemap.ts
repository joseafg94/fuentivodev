import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublicProjects } from "@/lib/projects";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectRoute } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(`/${locale}`, siteConfig.url).toString(),
    ]),
  );

  const pages = routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteConfig.url).toString(),
    alternates: { languages },
  }));

  const projects = getPublicProjects().flatMap((project) => {
    const href = getProjectRoute(project.slug);
    const projectLanguages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(getPathname({ locale, href }), siteConfig.url).toString(),
      ]),
    );

    return routing.locales.map((locale) => ({
      url: new URL(getPathname({ locale, href }), siteConfig.url).toString(),
      alternates: { languages: projectLanguages },
    }));
  });

  return [...pages, ...projects];
}
