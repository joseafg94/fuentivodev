import { Check } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { StructuredData } from "@/components/seo/StructuredData";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

const approachKeys = ["understand", "define", "build"] as const;
const principleKeys = [
  "clarity",
  "fit",
  "mobile",
  "structured",
  "direct",
  "outcomes",
  "maintainable",
] as const;

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.about,
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const aboutUrl = new URL(
    getPathname({ locale, href: appRoutes.about }),
    siteConfig.url,
  ).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: aboutUrl,
    description: t("identity.description"),
    founder: {
      "@type": "Person",
      name: "José Fuentes",
      jobTitle: t("founder.role"),
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section
          aria-labelledby="about-page-title"
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
                id="about-page-title"
                className="mt-5 text-balance text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
              >
                {t("intro.title")}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-fuentivo-secondary sm:text-xl sm:leading-9">
                {t("intro.description")}
              </p>
            </div>
          </Container>
        </section>

        <Section aria-labelledby="about-identity-title" className="section-reveal">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {t("identity.eyebrow")}
                </p>
                <h2 id="about-identity-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {t("identity.title")}
                </h2>
              </div>
              <p className="max-w-3xl text-pretty text-lg leading-8 text-fuentivo-secondary">
                {t("identity.description")}
              </p>
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="about-approach-title" className="section-reveal border-y border-border bg-surface/35">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {t("approach.eyebrow")}
                </p>
                <h2 id="about-approach-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {t("approach.title")}
                </h2>
                <p className="mt-5 max-w-xl leading-7 text-fuentivo-secondary">
                  {t("approach.description")}
                </p>
              </div>

              <ol className="grid gap-px overflow-hidden rounded-card-large border border-border bg-border">
                {approachKeys.map((key, index) => (
                  <li key={key} className="grid gap-4 bg-background p-6 sm:grid-cols-[3rem_1fr] sm:p-8">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.035em]">
                        {t(`approach.steps.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-fuentivo-secondary">
                        {t(`approach.steps.${key}.description`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="about-principles-title" className="section-reveal">
          <Container>
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {t("principles.eyebrow")}
              </p>
              <h2 id="about-principles-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {t("principles.title")}
              </h2>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {principleKeys.map((key) => (
                <li key={key} className="flex min-h-24 gap-3 rounded-card border border-border bg-card p-5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      {t(`principles.items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-fuentivo-secondary">
                      {t(`principles.items.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section aria-labelledby="about-founder-title" className="section-reveal border-y border-border bg-surface/35">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {t("founder.eyebrow")}
                </p>
                <h2 id="about-founder-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  José Fuentes
                </h2>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-primary">
                  {t("founder.role")}
                </p>
              </div>
              <p className="max-w-3xl text-pretty text-lg leading-8 text-fuentivo-secondary">
                {t("founder.description")}
              </p>
            </div>
          </Container>
        </Section>

        <ContactCTA
          headingId="about-cta-title"
          eyebrow={t("cta.eyebrow")}
          title={t("cta.title")}
          description={t("cta.description")}
          primaryCta={t("cta.primary")}
          whatsapp={t("cta.whatsapp")}
          whatsappMessage={t("cta.whatsappMessage")}
        />
      </main>
    </>
  );
}
