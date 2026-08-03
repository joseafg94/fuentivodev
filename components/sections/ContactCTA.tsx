import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/contact";
import { appRoutes } from "@/lib/routes";

type ContactCTAProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  whatsapp: string;
  whatsappMessage: string;
};

export function ContactCTA({
  headingId,
  eyebrow,
  title,
  description,
  primaryCta,
  whatsapp,
  whatsappMessage,
}: ContactCTAProps) {
  return (
    <Section aria-labelledby={headingId} className="section-reveal">
      <Container>
        <div className="relative isolate overflow-hidden rounded-card-large border border-primary/25 bg-card px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(0,184,106,0.2),transparent_35%)]"
          />
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </p>
            <h2 id={headingId} className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-fuentivo-secondary sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-12 px-5 text-base">
              <Link href={appRoutes.contact}>
                {primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-5 text-base">
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                {whatsapp}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
