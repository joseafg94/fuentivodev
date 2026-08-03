import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.metadata.es.description,
    start_url: "/es",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    lang: "es",
  };
}
