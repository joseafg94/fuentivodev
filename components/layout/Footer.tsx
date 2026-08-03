import { Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { getEmailUrl, getWhatsAppUrl } from "@/lib/contact";
import { appRoutes, mobileNavigation } from "@/lib/routes";

import { Logo } from "./Logo";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  const navLabels = {
    home: t("nav.home"),
    services: t("nav.services"),
    projects: t("nav.projects"),
    websites: t("nav.websites"),
    about: t("nav.about"),
    contact: t("nav.contact"),
  };
  const services = [
    t("footer.serviceWebsites"),
    t("footer.serviceSystems"),
    t("footer.serviceAutomation"),
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-md">
          <Logo label={t("brandHomeLabel")} />
          <p className="mt-4 text-sm leading-6 text-fuentivo-secondary">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {t("footer.navigation")}
          </h2>
          <ul className="mt-4 space-y-2">
            {mobileNavigation.map(({ key, href }) => (
              <li key={key}>
                <Link className="inline-flex min-h-11 items-center text-sm text-fuentivo-secondary transition-colors hover:text-foreground" href={href}>
                  {navLabels[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {t("footer.services")}
          </h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service}>
                <Link className="inline-flex min-h-11 items-center text-sm text-fuentivo-secondary transition-colors hover:text-foreground" href={appRoutes.services}>
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {t("footer.contact")}
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            <a className="inline-flex min-h-11 items-center gap-2 text-sm text-fuentivo-secondary transition-colors hover:text-foreground" href={getEmailUrl()}>
              <Mail aria-hidden="true" className="size-4" />
              {siteConfig.contact.email}
            </a>
            <a className="inline-flex min-h-11 items-center gap-2 text-sm text-fuentivo-secondary transition-colors hover:text-foreground" href={getWhatsAppUrl(t("whatsappMessage"))} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" className="size-4" />
              {t("whatsappLabel")}
            </a>
            {siteConfig.socialLinks.map((social) => (
              <a key={social.href} className="inline-flex min-h-11 items-center text-sm text-fuentivo-secondary transition-colors hover:text-foreground" href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
          <Link className="inline-flex min-h-11 items-center transition-colors hover:text-foreground" href={appRoutes.privacy}>
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
