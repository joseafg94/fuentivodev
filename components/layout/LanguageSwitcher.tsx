"use client";

import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/lib/routes";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();

  const getHref = () => {
    if (pathname === "/projects/[slug]") {
      if (!params.slug) {
        return appRoutes.projects;
      }

      return {
        pathname: "/projects/[slug]" as const,
        params: { slug: params.slug },
      };
    }

    return pathname;
  };

  return (
    <nav aria-label={label} className="flex h-11 shrink-0 items-center rounded-control border border-border bg-background/60 p-1 text-xs font-semibold">
      {(["es", "en"] as const).map((targetLocale) => {
        const isActive = locale === targetLocale;

        return (
          <Link
            key={targetLocale}
            href={getHref()}
            locale={targetLocale}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex h-8 min-w-8 items-center justify-center rounded-lg px-1.5 text-muted-foreground transition-colors hover:text-foreground",
              isActive && "bg-surface text-primary",
            )}
          >
            {targetLocale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
