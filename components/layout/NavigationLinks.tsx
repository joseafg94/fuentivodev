"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { appRoutes, isRouteActive, primaryNavigation } from "@/lib/routes";

export type NavigationLabels = Record<
  "home" | (typeof primaryNavigation)[number]["key"],
  string
>;

type NavigationLinksProps = {
  labels: NavigationLabels;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  items?: ReadonlyArray<{ key: keyof NavigationLabels; href: (typeof primaryNavigation)[number]["href"] | "/" }>;
};

export function NavigationLinks({
  labels,
  className,
  linkClassName,
  onNavigate,
  items = primaryNavigation,
}: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {items.map(({ key, href }) => {
        const isActive = isRouteActive(pathname, href);

        return (
          <Link
            key={key}
            href={href}
            prefetch={href === appRoutes.contact ? false : undefined}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "relative flex min-h-11 items-center rounded-control px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              "after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100 motion-reduce:after:transition-none",
              isActive && "text-foreground after:scale-x-100",
              linkClassName,
            )}
          >
            {labels[key]}
          </Link>
        );
      })}
    </div>
  );
}
