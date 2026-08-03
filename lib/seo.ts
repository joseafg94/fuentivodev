import type { Metadata } from "next";

import type { Project } from "@/content/projects";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { shouldIndexProject } from "@/lib/projects";
import { getProjectRoute } from "@/lib/routes";
import type { AppRoute } from "@/lib/routes";

type LocalizedMetadataOptions = {
  locale: Locale;
  href: AppRoute;
  title: string;
  description: string;
};

export function createLocalizedMetadata({
  locale,
  href,
  title,
  description,
}: LocalizedMetadataOptions): Metadata {
  const canonical = getPathname({ locale, href });

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: getPathname({ locale: "es", href }),
        en: getPathname({ locale: "en", href }),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      locale: locale === "es" ? "es_PA" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PA"],
    },
  };
}

export function createProjectMetadata(
  project: Project,
  locale: Locale,
): Metadata {
  const seo = project.seo[locale];
  const href = getProjectRoute(project.slug);
  const canonical = getPathname({ locale, href });
  const image = seo.image ?? project.coverImage;
  const shouldIndex = shouldIndexProject(project);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        es: getPathname({ locale: "es", href }),
        en: getPathname({ locale: "en", href }),
      },
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
    openGraph: {
      type: "article",
      title: seo.title,
      description: seo.description,
      url: canonical,
      images: [{ url: image, alt: project.title[locale] }],
      locale: locale === "es" ? "es_PA" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PA"],
    },
  };
}
