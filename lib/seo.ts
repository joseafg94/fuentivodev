import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { shouldIndexProject } from "@/lib/projects";
import { getLocalizedPath, getLocalizedProjectPath } from "@/lib/routes";
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
  const canonical = absoluteUrl(getLocalizedPath(locale, href));
  const image = absoluteUrl(`/${locale}${siteConfig.socialImage.path}`);
  const spanishUrl = absoluteUrl(getLocalizedPath("es", href));
  const englishUrl = absoluteUrl(getLocalizedPath("en", href));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: spanishUrl,
        en: englishUrl,
        "x-default": absoluteUrl("/"),
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      locale: locale === "es" ? "es_PA" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PA"],
      siteName: siteConfig.name,
      images: [{
        url: image,
        width: siteConfig.socialImage.width,
        height: siteConfig.socialImage.height,
        alt: siteConfig.name,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function createProjectMetadata(
  project: Project,
  locale: Locale,
): Metadata {
  const seo = project.seo[locale];
  const canonical = absoluteUrl(getLocalizedProjectPath(locale, project.slug));
  const spanishUrl = absoluteUrl(getLocalizedProjectPath("es", project.slug));
  const englishUrl = absoluteUrl(getLocalizedProjectPath("en", project.slug));
  const image = absoluteUrl(seo.image ?? project.coverImage);
  const shouldIndex = shouldIndexProject(project);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        es: spanishUrl,
        en: englishUrl,
        "x-default": absoluteUrl("/"),
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
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}
