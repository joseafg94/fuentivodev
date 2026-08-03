"use client";

import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { appRoutes, mobileNavigation } from "@/lib/routes";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavigationLinks, type NavigationLabels } from "./NavigationLinks";

type MobileNavProps = {
  locale: Locale;
  labels: NavigationLabels;
  ctaLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  menuTitle: string;
  navigationLabel: string;
  languageLabel: string;
  whatsappLabel: string;
  whatsappUrl: string;
};

export function MobileNav({
  locale,
  labels,
  ctaLabel,
  menuOpenLabel,
  menuCloseLabel,
  menuTitle,
  navigationLabel,
  languageLabel,
  whatsappLabel,
  whatsappUrl,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <div className="flex items-center gap-1.5 lg:hidden">
      <LanguageSwitcher locale={locale} label={languageLabel} />

      <Button
        asChild
        variant="outline"
        size="icon-lg"
        className="size-11 bg-background/60"
      >
        <a href={whatsappUrl} aria-label={whatsappLabel} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" />
        </a>
      </Button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button
            variant="outline"
            size="icon-lg"
            className="size-11 bg-background/60"
            aria-label={menuOpenLabel}
          >
            <Menu aria-hidden="true" />
          </Button>
        </DialogPrimitive.Trigger>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-background/80 transition-opacity duration-200 motion-reduce:transition-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100 sm:backdrop-blur-sm" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed inset-y-0 right-0 z-[61] flex w-[min(90vw,24rem)] flex-col border-l border-border bg-surface p-6 shadow-xl focus:outline-none"
          >
            <div className="flex h-11 items-center justify-between">
              <DialogPrimitive.Title className="font-heading text-lg font-semibold">
                {menuTitle}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" size="icon-lg" className="size-11" aria-label={menuCloseLabel}>
                  <X aria-hidden="true" />
                </Button>
              </DialogPrimitive.Close>
            </div>

            <nav aria-label={navigationLabel} className="mt-8">
              <NavigationLinks
                labels={labels}
                items={mobileNavigation}
                onNavigate={closeMenu}
                className="flex flex-col gap-1"
                linkClassName="justify-start px-3 text-base after:inset-x-3"
              />
            </nav>

            <div className="mt-auto grid gap-3 pt-8">
              <Button asChild size="lg" className="h-11 bg-primary px-4 text-primary-foreground hover:bg-fuentivo-emerald-hover">
                <Link href={appRoutes.contact} prefetch={false} onClick={closeMenu}>
                  {ctaLabel}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 px-4">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  <MessageCircle aria-hidden="true" />
                  {whatsappLabel}
                </a>
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
