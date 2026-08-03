import { ArrowUpRight, Globe2, PanelsTopLeft, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";

import { ServiceCard } from "./ServiceCard";

type ServicesProps = {
  locale: Locale;
};

const services = [
  { key: "presence", icon: Globe2 },
  { key: "systems", icon: PanelsTopLeft },
  { key: "automation", icon: Workflow },
] as const;

export async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: "Home.services" });

  return (
    <Section aria-labelledby="services-title" className="section-reveal border-y border-border bg-surface/35">
      <Container>
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
            {t("eyebrow")}
          </p>
          <h2 id="services-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {services.map(({ key, icon: Icon }, index) => (
            <ServiceCard
              key={key}
              icon={Icon}
              index={`0${index + 1}`}
              title={t(`items.${key}.title`)}
            >
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {t("problemLabel")}
              </p>
              <p className="mt-2 leading-7 text-fuentivo-secondary">
                {t(`items.${key}.problem`)}
              </p>
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {t("outcomeLabel")}
              </p>
              <p className="mt-2 leading-7 text-foreground">
                {t(`items.${key}.outcome`)}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                {t(`items.${key}.examples`)}
              </p>
              <Link
                href={appRoutes.services}
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-medium text-primary"
              >
                {t("link")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
            </ServiceCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
