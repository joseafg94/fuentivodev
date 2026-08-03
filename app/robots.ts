import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export function createRobots(isPreview: boolean): MetadataRoute.Robots {
  if (isPreview) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url.origin,
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobots(process.env.VERCEL_ENV === "preview");
}
