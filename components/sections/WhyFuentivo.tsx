import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";

type WhyFuentivoProps = {
  locale: Locale;
};

const reasonKeys = [
  "fit",
  "simpleUx",
  "mobile",
  "structured",
  "regional",
  "direct",
  "scalable",
] as const;

export async function WhyFuentivo({ locale }: WhyFuentivoProps) {
  const t = await getTranslations({ locale, namespace: "Home.why" });

  return (
    <Section aria-labelledby="why-title" className="section-reveal">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("eyebrow")}
            </p>
            <h2 id="why-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 leading-7 text-fuentivo-secondary">
              {t("description")}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {reasonKeys.map((key) => (
              <li
                key={key}
                className="flex min-h-24 gap-3 rounded-card border border-border bg-card p-5"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                <span className="text-sm leading-6 text-fuentivo-secondary">
                  {t(`items.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
