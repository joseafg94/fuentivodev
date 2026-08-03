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
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home.metadata" });
  const canonical = getPathname({ locale, href: appRoutes.home });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        es: getPathname({ locale: "es", href: appRoutes.home }),
        en: getPathname({ locale: "en", href: appRoutes.home }),
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonical,
      locale: locale === "es" ? "es_PA" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PA"],
    },
  };
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
