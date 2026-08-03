import { defineRouting } from "next-intl/routing";

import { localizedPathnames } from "@/i18n/pathnames";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localeDetection: false,
  localePrefix: "always",
  pathnames: localizedPathnames,
});

export type Locale = (typeof routing.locales)[number];
