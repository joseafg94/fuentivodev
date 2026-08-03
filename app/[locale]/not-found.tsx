import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";

export default async function NotFound() {
  const requestedLocale = await getLocale();
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <main id="main-content" className="flex flex-1 items-center border-b border-border py-24" tabIndex={-1}>
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.16em] text-primary">404</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">{t("title")}</h1>
          <p className="mt-6 text-lg leading-8 text-fuentivo-secondary">{t("description")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href={appRoutes.home}>{t("home")}</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href={appRoutes.projects}>{t("projects")}</Link></Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
