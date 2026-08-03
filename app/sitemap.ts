import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(`/${locale}`, siteConfig.url).toString(),
    ]),
  );

  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteConfig.url).toString(),
    alternates: { languages },
  }));
}
