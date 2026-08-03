import { ArrowDownRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";

type ProblemsProps = {
  locale: Locale;
};

const problemKeys = [
  "contacts",
  "presence",
  "manual",
  "scattered",
  "repetitive",
  "complex",
  "rigid",
] as const;

export async function Problems({ locale }: ProblemsProps) {
  const t = await getTranslations({ locale, namespace: "Home.problems" });

  return (
    <Section aria-labelledby="problems-title" className="section-reveal">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {t("eyebrow")}
            </p>
            <h2 id="problems-title" className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-fuentivo-secondary">
              {t("description")}
            </p>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {problemKeys.map((key, index) => (
              <li key={key} className="flex min-h-20 items-center gap-4 py-4 sm:min-h-24">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-medium text-foreground sm:text-lg">
                  {t(`items.${key}`)}
                </span>
                <ArrowDownRight aria-hidden="true" className="size-5 shrink-0 text-primary" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
