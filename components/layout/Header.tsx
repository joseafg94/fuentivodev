import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getWhatsAppUrl } from "@/lib/contact";
import { appRoutes } from "@/lib/routes";

import { HeaderScrollState } from "./HeaderScrollState";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavigationLinks, type NavigationLabels } from "./NavigationLinks";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  const labels: NavigationLabels = {
    home: t("nav.home"),
    services: t("nav.services"),
    projects: t("nav.projects"),
    websites: t("nav.websites"),
    about: t("nav.about"),
    contact: t("nav.contact"),
  };
  const whatsappUrl = getWhatsAppUrl(t("whatsappMessage"));

  return (
    <header
      id="site-header"
      data-scrolled="false"
      className="sticky top-0 z-50 h-16 border-b border-transparent bg-background/20 transition-[background-color,border-color,backdrop-filter] duration-200 data-[scrolled=true]:border-border/80 data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-xl"
    >
      <HeaderScrollState />
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo label={t("brandHomeLabel")} />

        <nav aria-label={t("navigationLabel")} className="hidden lg:block">
          <NavigationLinks labels={labels} className="flex items-center gap-1" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="lg" className="h-11 bg-primary px-4 text-primary-foreground hover:bg-fuentivo-emerald-hover">
            <Link href={appRoutes.contact}>{t("cta")}</Link>
          </Button>
          <LanguageSwitcher locale={locale} label={t("languageLabel")} />
        </div>

        <MobileNav
          locale={locale}
          labels={labels}
          ctaLabel={t("cta")}
          menuOpenLabel={t("menuOpen")}
          menuCloseLabel={t("menuClose")}
          menuTitle={t("menuTitle")}
          navigationLabel={t("navigationLabel")}
          languageLabel={t("languageLabel")}
          whatsappLabel={t("whatsappLabel")}
          whatsappUrl={whatsappUrl}
        />
      </div>
    </header>
  );
}
