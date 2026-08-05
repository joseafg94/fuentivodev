import { defineProject } from "./schema";

export const alturaArquitectura = defineProject({
  slug: "altura-arquitectura",
  title: { es: "Altura Arquitectura", en: "Altura Arquitectura" },
  shortDescription: {
    es: "Sitio web premium y editorial para un estudio ficticio de arquitectura y diseño de interiores en Panamá.",
    en: "Premium editorial website for a fictional architecture and interior design studio in Panama.",
  },
  summary: {
    es: "Altura Arquitectura es un caso de estudio conceptual que demuestra cómo un estudio de arquitectura puede presentar su trabajo con una experiencia editorial, visual y orientada a la captación, sin sacrificar rendimiento, navegación ni experiencia móvil.",
    en: "Altura Arquitectura is a concept case study showing how an architecture studio can present its work through an editorial, visual, and lead-oriented experience without compromising performance, navigation, or mobile usability.",
  },
  category: "web",
  commercialType: "concept",
  commercialLabel: { es: "Caso de estudio conceptual", en: "Concept case study" },
  status: "published",
  year: 2026,
  featured: true,
  featuredOrder: 1,
  industry: {
    es: "Arquitectura y diseño de interiores",
    en: "Architecture and interior design",
  },
  coverImage: {
    src: "/projects/altura-arquitectura/cover.webp",
    width: 1672,
    height: 940,
    aspectRatio: "16/9",
    alt: {
      es: "Vista amplia del sitio de Altura Arquitectura con una residencia contemporánea y fotografía arquitectónica.",
      en: "Wide view of the Altura Arquitectura website featuring a contemporary residence and architectural photography.",
    },
  },
  thumbnailImage: {
    src: "/projects/altura-arquitectura/thumbnail.webp",
    width: 1407,
    height: 1055,
    aspectRatio: "4/3",
    alt: {
      es: "Vista editorial del sitio de Altura Arquitectura con proyectos y fotografía arquitectónica.",
      en: "Editorial view of the Altura Arquitectura website featuring projects and architectural photography.",
    },
  },
  liveUrl: "https://alturaarquitectura.vercel.app/",
  services: [
    { es: "Diseño web editorial", en: "Editorial web design" },
    { es: "Desarrollo web responsive", en: "Responsive web development" },
    { es: "SEO técnico", en: "Technical SEO" },
    { es: "Internacionalización ES/EN", en: "ES/EN internationalization" },
  ],
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Motion",
    "Lucide React",
    "next/image",
    "Vercel",
  ],
  tags: ["Architecture", "Editorial", "Bilingual", "Responsive"],
  challenge: {
    es: "Muchos estudios de arquitectura dependen de su portafolio visual, pero sus sitios suelen presentar imágenes pesadas, navegación confusa, escasa jerarquía, mala experiencia móvil y pocos mecanismos de captación.",
    en: "Many architecture studios depend heavily on their visual portfolio, yet their websites often suffer from oversized imagery, confusing navigation, weak hierarchy, poor mobile experiences, and limited lead-generation mechanisms.",
  },
  objective: {
    es: "Demostrar que Fuentivo puede crear una web visualmente sobresaliente que comunique profesionalismo, presente proyectos con claridad y convierta visitas en solicitudes comerciales.",
    en: "Demonstrate Fuentivo's ability to create a visually distinctive website that communicates professionalism, presents projects clearly, and turns visits into business inquiries.",
  },
  solution: {
    es: "Una experiencia web bilingüe, editorial y completamente responsive que combina fotografía arquitectónica, narrativa visual, proyectos filtrables, páginas detalladas, servicios, contacto y optimización técnica.",
    en: "A bilingual, editorial, and fully responsive web experience combining architectural photography, visual storytelling, filterable projects, detailed project pages, services, contact flows, and technical optimization.",
  },
  features: [
    { es: "Hero arquitectónico a pantalla completa.", en: "Full-screen architectural hero." },
    { es: "Portafolio con filtros por categoría.", en: "Portfolio with category filters." },
    { es: "Página individual y galerías editoriales para cada obra.", en: "Individual project pages with editorial galleries." },
    { es: "Comparador de plano y resultado o antes y después.", en: "Plan-to-result or before-and-after comparison." },
    { es: "Servicios y perfil del estudio.", en: "Services and studio profile." },
    { es: "Formulario de contacto y CTA por WhatsApp.", en: "Contact form and WhatsApp call to action." },
    { es: "Navegación entre proyectos.", en: "Navigation between projects." },
    { es: "Contenido completo en español e inglés.", en: "Complete Spanish and English content." },
    { es: "Metadata SEO localizada e imágenes optimizadas.", en: "Localized SEO metadata and optimized images." },
    { es: "Animaciones suaves, diseño responsive y accesibilidad.", en: "Subtle motion, responsive design, and accessibility." },
  ],
  seo: {
    es: {
      title: "Altura Arquitectura — Web editorial para estudio de arquitectura",
      description: "Caso conceptual de una web bilingüe y editorial que presenta proyectos de arquitectura con navegación clara, experiencia móvil y vías de contacto.",
      image: "/projects/altura-arquitectura/cover.webp",
    },
    en: {
      title: "Altura Arquitectura — Editorial Website for an Architecture Studio",
      description: "Concept case study for a bilingual editorial website that presents architectural work through clear navigation, mobile usability, and focused contact paths.",
      image: "/projects/altura-arquitectura/cover.webp",
    },
  },
});
