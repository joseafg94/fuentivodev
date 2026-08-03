import { Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getEmailUrl, getWhatsAppUrl } from "@/lib/contact";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.metadata" });

  return createLocalizedMetadata({
    locale,
    href: appRoutes.contact,
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const whatsappUrl = getWhatsAppUrl(t("whatsapp.message"));

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <section aria-labelledby="contact-page-title" className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(0,184,106,0.16),transparent_30%)]" />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="py-20 sm:py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm">{t("intro.eyebrow")}</p>
            <h1 id="contact-page-title" className="mt-5 text-balance text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]">{t("intro.title")}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-fuentivo-secondary sm:text-lg sm:leading-8">{t("intro.description")}</p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="contact-form-title" className="section-reveal">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-16">
            <div>
              <h2 id="contact-form-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{t("form.title")}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-fuentivo-secondary">{t("form.description")}</p>
              <div className="mt-8"><ContactForm locale={locale} whatsappUrl={whatsappUrl} /></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {t("privacy.description")} <Link href={appRoutes.privacy} className="rounded-control font-medium text-primary underline-offset-4 hover:underline">{t("privacy.link")}</Link>
              </p>
            </div>

            <aside aria-label={t("alternatives.label")} className="space-y-5 lg:pt-20">
              <div className="rounded-card-large border border-border bg-card p-6">
                <h2 className="text-xl font-semibold tracking-[-0.035em]">{t("alternatives.title")}</h2>
                <p className="mt-3 text-sm leading-6 text-fuentivo-secondary">{t("alternatives.description")}</p>
                <div className="mt-6 space-y-3">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-3 rounded-control border border-primary/25 bg-primary/5 px-4 font-medium text-primary">
                    <MessageCircle aria-hidden="true" className="size-5" />
                    {t("whatsapp.cta")}
                  </a>
                  <a href={getEmailUrl()} className="flex min-h-12 items-center gap-3 rounded-control border border-border bg-background px-4 font-medium text-foreground">
                    <Mail aria-hidden="true" className="size-5 text-primary" />
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="rounded-card border border-border bg-surface/50 p-5">
                <h2 className="font-heading text-base font-semibold">{t("payments.title")}</h2>
                <p className="mt-2 text-sm leading-6 text-fuentivo-secondary">{t("payments.description")}</p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
