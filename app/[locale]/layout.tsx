import type { Metadata } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";
import { createLocalizedMetadata } from "@/lib/seo";

import "../globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const localizedMetadata = siteConfig.metadata[locale];

  return {
    metadataBase: siteConfig.url,
    manifest: "/manifest.webmanifest",
    ...createLocalizedMetadata({
      locale,
      href: appRoutes.home,
      title: localizedMetadata.title,
      description: localizedMetadata.description,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "Layout" }),
  ]);

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-control bg-primary px-4 py-3 font-medium text-primary-foreground transition-transform focus:translate-y-0"
          >
            {t("skipToContent")}
          </a>
          <Header locale={locale} />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
