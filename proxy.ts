import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: routing.localeDetection,
  localePrefix: "always",
  alternateLinks: false,
});

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
