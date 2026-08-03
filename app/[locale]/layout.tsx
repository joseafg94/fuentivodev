import type { Metadata } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

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
    title: localizedMetadata.title,
    description: localizedMetadata.description,
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
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
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
