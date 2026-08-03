import { Check, Globe2, PanelsTopLeft, Workflow } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { appRoutes, getLocalizedPath } from "@/lib/routes";
import { absoluteUrl, createLocalizedMetadata } from "@/lib/seo";

type ServicesPageProps = {
  params: Promise<{ locale: Locale }>;
};

const serviceDefinitions = [
  {
    key: "presence",
    icon: Globe2,
    problems: ["noWebsite", "outdated", "mobile", "information", "conversions", "socialOnly"],
    solutions: ["landing", "corporate", "serviceWebsites", "portfolios", "catalogs", "restaurants", "redesigns", "forms", "whatsapp", "seo"],
  },
  {
    key: "systems",
    icon: PanelsTopLeft,
    problems: ["spreadsheets", "scattered", "quotes", "chatTracking", "control", "genericTools"],
    solutions: ["adminPanels", "quoters", "portals", "orders", "bookings", "dashboards", "internalTools", "webApps", "mvps"],
  },
  {
    key: "automation",
    icon: Workflow,
    problems: ["manualFollowup", "repeatedAnswers", "manualTransfer", "missedNotifications", "repeatedDocuments"],
    solutions: ["connectedForms", "notifications", "followup", "documents", "leadClassification", "responses", "integrations", "whatsappAutomation"],
  },
] as const;

const criteria = [
  "problem",
  "users",
  "currentProcess",
  "existingTools",
  "priorities",
  "scope",
  "maintenance",
  "futureGrowth",
] as const;

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.services,
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const servicesUrl = absoluteUrl(getLocalizedPath(locale, appRoutes.services));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": serviceDefinitions.map(({ key }) => ({
      "@type": "Service",
      name: t(`services.${key}.title`),
      description: t(`services.${key}.description`),
      url: `${servicesUrl}#${key}`,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: absoluteUrl(getLocalizedPath(locale, appRoutes.home)),
      },
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
      <section
        aria-labelledby="services-page-title"
        className="relative isolate overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(0,184,106,0.16),transparent_30%)]"
        />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="py-20 sm:py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm">
              {t("intro.eyebrow")}
            </p>
            <h1
              id="services-page-title"
              className="mt-5 text-balance text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
            >
              {t("intro.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-fuentivo-secondary sm:text-lg sm:leading-8">
              {t("intro.description")}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {t("intro.pricing")}
            </p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="service-lines-title" className="section-reveal">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("lines.eyebrow")}
            </p>
            <h2 id="service-lines-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("lines.title")}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
              {t("lines.description")}
            </p>
          </div>

          <div className="mt-12 grid gap-6">
            {serviceDefinitions.map(({ key, icon, problems, solutions }, index) => (
              <ServiceCard
                key={key}
                icon={icon}
                index={`0${index + 1}`}
                title={t(`services.${key}.title`)}
                className="motion-card-static sm:p-8 lg:p-10"
              >
                <p className="mt-4 max-w-3xl text-base leading-7 text-fuentivo-secondary">
                  {t(`services.${key}.description`)}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr_0.8fr]">
                  <div>
                    <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {t("labels.problems")}
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {problems.map((problem) => (
                        <li key={problem} className="flex gap-3 text-sm leading-6 text-fuentivo-secondary">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {t(`services.${key}.problems.${problem}`)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {t("labels.solutions")}
                    </h4>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {solutions.map((solution) => (
                        <li
                          key={solution}
                          className="rounded-full border border-border bg-surface px-3 py-2 text-sm text-fuentivo-secondary"
                        >
                          {t(`services.${key}.solutions.${solution}`)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-card border border-primary/20 bg-primary/5 p-5">
                    <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary">
                      {t("labels.result")}
                    </h4>
                    <p className="mt-4 text-sm leading-6 text-foreground">
                      {t(`services.${key}.result`)}
                    </p>
                  </div>
                </div>

                {key === "automation" ? (
                  <div className="mt-8 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
                    <div className="rounded-card border border-border bg-surface p-5">
                      <h4 className="font-heading font-semibold">{t("services.automation.whatsapp.contactTitle")}</h4>
                      <p className="mt-2 text-sm leading-6 text-fuentivo-secondary">
                        {t("services.automation.whatsapp.contactDescription")}
                      </p>
                    </div>
                    <div className="rounded-card border border-border bg-surface p-5">
                      <h4 className="font-heading font-semibold">{t("services.automation.whatsapp.solutionTitle")}</h4>
                      <p className="mt-2 text-sm leading-6 text-fuentivo-secondary">
                        {t("services.automation.whatsapp.solutionDescription")}
                      </p>
                    </div>
                  </div>
                ) : null}
              </ServiceCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="solution-definition-title" className="section-reveal border-y border-border bg-surface/35">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {t("definition.eyebrow")}
              </p>
              <h2 id="solution-definition-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {t("definition.title")}
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-fuentivo-secondary">
                {t("definition.description")}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {criteria.map((criterion) => (
                <li key={criterion} className="flex min-h-24 gap-3 rounded-card border border-border bg-background p-5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      {t(`definition.criteria.${criterion}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-fuentivo-secondary">
                      {t(`definition.criteria.${criterion}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

        <ContactCTA
        headingId="services-cta-title"
        eyebrow={t("finalCta.eyebrow")}
        title={t("finalCta.title")}
        description={t("finalCta.description")}
        primaryCta={t("finalCta.primaryCta")}
        whatsapp={t("finalCta.whatsapp")}
        whatsappMessage={t("finalCta.whatsappMessage")}
        />
      </main>
    </>
  );
}
