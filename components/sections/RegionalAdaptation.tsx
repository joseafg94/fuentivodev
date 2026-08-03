import { MessageCircle, Smartphone, Users, WalletCards } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";

type RegionalAdaptationProps = {
  locale: Locale;
};

const contextKeys = [
  "whatsapp",
  "yappy",
  "payments",
  "processes",
  "smallTeams",
  "mobileUse",
  "onboarding",
] as const;

const signals = [MessageCircle, WalletCards, Smartphone, Users];

export async function RegionalAdaptation({ locale }: RegionalAdaptationProps) {
  const t = await getTranslations({ locale, namespace: "Home.regional" });

  return (
    <Section aria-labelledby="regional-title" className="section-reveal border-y border-border bg-surface/35">
      <Container>
        <div className="overflow-hidden rounded-card-large border border-primary/20 bg-background">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {t("eyebrow")}
              </p>
              <h2 id="regional-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-fuentivo-secondary">
                {t("description")}
              </p>
              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
                {t("context")}
              </p>
            </div>

            <div className="relative border-t border-border p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-35" />
              <div className="relative grid grid-cols-2 gap-3">
                {signals.map((Icon, index) => (
                  <span
                    key={index}
                    className="grid aspect-square place-items-center rounded-card border border-border bg-background/90 text-primary"
                  >
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul className="relative flex flex-wrap gap-2 border-t border-border p-6 sm:p-8">
            {contextKeys.map((key) => (
              <li
                key={key}
                className="rounded-full border border-border bg-surface px-3 py-2 text-sm text-fuentivo-secondary"
              >
                {t(`items.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
