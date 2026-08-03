import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";

type ProcessProps = {
  locale: Locale;
};

const stepKeys = [
  "diagnosis",
  "strategy",
  "design",
  "development",
  "launch",
  "improvement",
] as const;

export async function Process({ locale }: ProcessProps) {
  const t = await getTranslations({ locale, namespace: "Home.process" });

  return (
    <Section aria-labelledby="process-title" className="section-reveal border-y border-border bg-surface/35">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("eyebrow")}
            </p>
            <h2 id="process-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-fuentivo-secondary">
              {t("description")}
            </p>
            <p className="mt-6 rounded-card border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-fuentivo-secondary">
              {t("operations")}
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-card-large border border-border bg-border sm:grid-cols-2">
            {stepKeys.map((key, index) => (
              <li key={key} className="bg-background p-6 sm:min-h-48">
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.035em]">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-fuentivo-secondary">
                  {t(`steps.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
