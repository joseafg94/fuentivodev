export const appRoutes = {
  home: "/",
  services: "/services",
  projects: "/projects",
  websites: "/websites",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];

export const primaryNavigation = [
  { key: "services", href: appRoutes.services },
  { key: "projects", href: appRoutes.projects },
  { key: "websites", href: appRoutes.websites },
  { key: "about", href: appRoutes.about },
  { key: "contact", href: appRoutes.contact },
] as const;

export const mobileNavigation = [
  { key: "home", href: appRoutes.home },
  ...primaryNavigation,
] as const;

export function getProjectRoute(slug: string) {
  return {
    pathname: "/projects/[slug]" as const,
    params: { slug },
  };
}

export function getLocalizedPath(locale: Locale, href: AppRoute) {
  const pathname = localizedPathnames[href];
  const localizedPath = typeof pathname === "string" ? pathname : pathname[locale];

  return `/${locale}${localizedPath === "/" ? "" : localizedPath}`;
}

export function getLocalizedProjectPath(locale: Locale, slug: string) {
  const pattern = localizedPathnames["/projects/[slug]"][locale];

  return `/${locale}${pattern.replace("[slug]", encodeURIComponent(slug))}`;
}

export function isRouteActive(pathname: string, href: AppRoute) {
  if (href === appRoutes.home) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
import { localizedPathnames } from "@/i18n/pathnames";
import type { Locale } from "@/i18n/routing";
