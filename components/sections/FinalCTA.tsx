import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

import { ContactCTA } from "./ContactCTA";

type FinalCTAProps = {
  locale: Locale;
};

export async function FinalCTA({ locale }: FinalCTAProps) {
  const t = await getTranslations({ locale, namespace: "Home.finalCta" });

  return (
    <ContactCTA
      headingId="final-cta-title"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      primaryCta={t("primaryCta")}
      whatsapp={t("whatsapp")}
      whatsappMessage={t("whatsappMessage")}
    />
  );
}
