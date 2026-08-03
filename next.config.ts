import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { localizedPathnames } from "./i18n/pathnames";

const locales = ["es", "en"] as const;

function toNextRoute(pathname: string) {
  return pathname.replace(/\[([^\]]+)\]/g, ":$1");
}

const localizedRouteAliases = Object.entries(localizedPathnames).flatMap(
  ([internalPath, localizedPath]) => {
    if (typeof localizedPath === "string") {
      return [];
    }

    return locales.flatMap((locale) => {
      const externalPath = localizedPath[locale];

      if (externalPath === internalPath) {
        return [];
      }

      return [{
        source: `/${locale}${toNextRoute(externalPath)}`,
        destination: `/${locale}${toNextRoute(internalPath)}`,
      }];
    });
  },
);

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return localizedRouteAliases.map(({ source, destination }) => ({
      source: destination,
      destination: source,
      permanent: true,
    }));
  },
  async rewrites() {
    return {
      beforeFiles: localizedRouteAliases,
    };
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    }];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
