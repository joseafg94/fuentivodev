import type { Metadata } from "next";

import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
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
