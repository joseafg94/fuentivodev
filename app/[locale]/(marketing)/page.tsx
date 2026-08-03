import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { RegionalAdaptation } from "@/components/sections/RegionalAdaptation";
import { Services } from "@/components/sections/Services";
import { WhyFuentivo } from "@/components/sections/WhyFuentivo";
import type { Locale } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.home,
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <Hero locale={locale} />
      <Problems locale={locale} />
      <Services locale={locale} />
      <FeaturedProjects locale={locale} />
      <Process locale={locale} />
      <WhyFuentivo locale={locale} />
      <RegionalAdaptation locale={locale} />
      <FinalCTA locale={locale} />
    </main>
  );
}
