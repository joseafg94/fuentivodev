import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type PrivacyPageProps = {
  params: Promise<{ locale: Locale }>;
};

const sectionKeys = [
  "collected",
  "purpose",
  "delivery",
  "analytics",
  "providers",
  "requests",
  "pending",
] as const;

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.privacy,
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <Container className="py-20 sm:py-24 lg:py-32">
        <article className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-fuentivo-secondary">{t("intro")}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("updated")}</p>

          <div className="mt-14 space-y-10 border-t border-border pt-10">
            {sectionKeys.map((key) => (
              <section key={key} aria-labelledby={`privacy-${key}`}>
                <h2 id={`privacy-${key}`} className="text-2xl font-semibold tracking-[-0.03em]">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="mt-3 leading-7 text-fuentivo-secondary">
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>

          <Link
            href={appRoutes.contact}
            prefetch={false}
            className="mt-12 inline-flex min-h-11 items-center rounded-control bg-primary px-5 py-3 font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("contact")}
          </Link>
        </article>
      </Container>
    </main>
  );
}
