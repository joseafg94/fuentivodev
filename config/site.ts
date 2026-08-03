const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Fuentivo",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl),
  themeColor: "#111317",
  contact: {
    email: "fuentivo@gmail.com",
    whatsappNumber: "50768564698",
  },
  socialLinks: [] as ReadonlyArray<{ label: string; href: string }>,
  metadata: {
    es: {
      title: "Fuentivo",
      description: "Soluciones digitales para negocios que quieren avanzar.",
    },
    en: {
      title: "Fuentivo",
      description: "Digital solutions for businesses ready to move forward.",
    },
  },
} as const;
