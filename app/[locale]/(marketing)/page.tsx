import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main id="main-content" className="flex-1" tabIndex={-1} />;
}
