import { ArrowRight, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getWhatsAppUrl } from "@/lib/contact";
import { appRoutes } from "@/lib/routes";

type FinalCTAProps = {
  locale: Locale;
};

export async function FinalCTA({ locale }: FinalCTAProps) {
  const t = await getTranslations({ locale, namespace: "Home.finalCta" });

  return (
    <Section aria-labelledby="final-cta-title" className="section-reveal">
      <Container>
        <div className="relative isolate overflow-hidden rounded-card-large border border-primary/25 bg-card px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(0,184,106,0.2),transparent_35%)]"
          />
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("eyebrow")}
            </p>
            <h2 id="final-cta-title" className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-fuentivo-secondary sm:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-12 px-5 text-base">
              <Link href={appRoutes.contact}>
                {t("primaryCta")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-5 text-base">
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
      </Container>
    </Section>
  );
}
