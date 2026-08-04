import { ArrowRight, Globe2, MessageCircle, PanelsTopLeft, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getWhatsAppUrl } from "@/lib/contact";
import { appRoutes } from "@/lib/routes";

type HeroProps = {
  locale: Locale;
};

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "Home.hero" });

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden border-b border-border/70"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_22%,rgba(0,184,106,0.16),transparent_30%),linear-gradient(to_bottom,rgba(17,19,23,0.2),#111317)]"
      />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-40" />

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-20 lg:pt-28">
        <div className="max-w-3xl">
          <p className="hero-copy-eyebrow font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm">
            {t("eyebrow")}
          </p>
          <h1
            id="home-hero-title"
            className="hero-copy-title mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
          >
            {t("title")}
          </h1>
          <p className="hero-copy-description mt-6 max-w-2xl text-pretty text-base leading-7 text-fuentivo-secondary sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          <div className="hero-copy-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-12 px-5 text-base">
              <Link href={appRoutes.contact} prefetch={false}>
                {t("primaryCta")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-5 text-base">
              <Link href={appRoutes.projects}>{t("secondaryCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 px-5 text-base text-fuentivo-secondary">
              <a
                href={getWhatsAppUrl(t("whatsappMessage"))}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                {t("whatsapp")}
              </a>
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-system relative mx-auto hidden aspect-[4/3] w-full max-w-xl overflow-hidden rounded-card-large border border-primary/20 bg-surface/65 shadow-[0_32px_120px_-48px_rgba(0,184,106,0.6)] backdrop-blur-sm sm:block lg:-translate-y-12"
        >
          <div className="hero-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-x-[14%] top-1/2 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="hero-flow-signal absolute left-[14%] top-[calc(50%-4px)] size-2 rounded-full bg-primary shadow-[0_0_22px_6px_rgba(0,184,106,0.65)]" />

          <div className="absolute left-[7%] top-[18%] w-[42%] rounded-card border border-border bg-background/90 p-4 shadow-2xl sm:p-5">
            <Globe2 className="size-5 text-primary" />
            <p className="mt-8 font-heading text-sm font-semibold sm:text-base">
              {t("visual.presence")}
            </p>
            <div className="mt-3 h-1.5 w-3/4 rounded-full bg-border" />
            <div className="mt-2 h-1.5 w-1/2 rounded-full bg-primary/50" />
          </div>

          <div className="absolute right-[7%] top-[29%] w-[44%] rounded-card border border-primary/25 bg-background/95 p-4 shadow-2xl sm:p-5">
            <PanelsTopLeft className="size-5 text-primary" />
            <p className="mt-8 font-heading text-sm font-semibold sm:text-base">
              {t("visual.system")}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <span className="h-8 rounded-md bg-primary/20" />
              <span className="h-8 rounded-md bg-border" />
              <span className="h-8 rounded-md bg-border" />
            </div>
          </div>

          <div className="absolute bottom-[8%] left-[22%] flex w-[56%] items-center gap-3 rounded-card border border-border bg-background/90 p-3 shadow-2xl sm:p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-primary/15 text-primary">
              <Workflow className="size-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold sm:text-base">
                {t("visual.automation")}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("visual.connected")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
