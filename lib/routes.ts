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

export function isRouteActive(pathname: string, href: AppRoute) {
  if (href === appRoutes.home) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
