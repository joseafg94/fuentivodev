import { defineProject } from "./schema";

export const meniva = defineProject({
  slug: "meniva",
  title: {
    es: "Meniva",
    en: "Meniva",
  },
  shortDescription: {
    es: "Plataforma SaaS para crear y administrar menús digitales de restaurantes mediante códigos QR.",
    en: "A SaaS platform for creating and managing restaurant menus shared through QR codes.",
  },
  summary: {
    es: "Meniva reúne la gestión del menú, la identidad visual, las promociones y el contacto con clientes en un panel pensado para operar sin conocimientos técnicos.",
    en: "Meniva brings menu management, branding, promotions, and customer touchpoints into one dashboard designed for non-technical teams.",
  },
  category: "product",
  commercialType: "saas",
  commercialLabel: {
    es: "Producto SaaS",
    en: "SaaS product",
  },
  status: "published",
  year: 2026,
  featured: true,
  industry: {
    es: "Restaurantes",
    en: "Restaurants",
  },
  coverImage: {
    src: "/projects/meniva/cover.png",
    width: 1448,
    height: 1086,
    aspectRatio: "4/3",
    alt: {
      es: "Composición de Meniva con el menú digital móvil y el panel administrativo.",
      en: "Meniva composition featuring the mobile digital menu and administration dashboard.",
    },
  },
  thumbnailImage: {
    src: "/projects/meniva/thumbnail.png",
    width: 1448,
    height: 1086,
    aspectRatio: "4/3",
    alt: {
      es: "Interfaz de Meniva con el panel de gestión y un menú digital para restaurantes.",
      en: "Meniva interface showing the management dashboard and a digital restaurant menu.",
    },
  },
  gallery: [
    {
      src: "/projects/meniva/thumbnail.png",
      width: 1448,
      height: 1086,
      aspectRatio: "4/3",
      alt: {
        es: "Panel de Meniva junto a la vista móvil del menú QR.",
        en: "Meniva dashboard alongside the mobile QR menu view.",
      },
    },
  ],
  services: [
    { es: "Diseño UX/UI", en: "UX/UI design" },
    { es: "Desarrollo de aplicaciones web", en: "Web application development" },
  ],
  technologies: [
    "Next.js 15",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Supabase Auth",
    "Supabase Storage",
    "Vercel",
    "Lucide React",
    "qrcode.react",
    "browser-image-compression",
  ],
  tags: ["SaaS", "QR", "Restaurantes"],
  challenge: {
    es: "Muchos restaurantes dependen de menús físicos, archivos PDF o imágenes que son difíciles de actualizar cuando cambian los productos, precios o la disponibilidad.",
    en: "Many restaurants rely on printed menus, PDFs, or image files that become difficult to maintain whenever items, prices, or availability change.",
  },
  objective: {
    es: "Dar a los restaurantes una forma rápida y centralizada de mantener su menú digital actualizado y compartirlo con sus clientes mediante un código QR.",
    en: "Give restaurants a fast, centralized way to keep their digital menu current and share it with customers through a QR code.",
  },
  solution: {
    es: "Un panel web para administrar categorías, productos, precios, disponibilidad, fotos y colores, con cambios reflejados en el menú digital en tiempo real.",
    en: "A web dashboard for managing categories, items, prices, availability, photos, and colors, with updates reflected on the digital menu in real time.",
  },
  features: [
    {
      es: "Edición en tiempo real de categorías, productos, precios y disponibilidad.",
      en: "Real-time editing for categories, items, prices, and availability.",
    },
    {
      es: "Personalización de colores, tipografías, logotipo y banners promocionales.",
      en: "Custom colors, typography, logos, and promotional banners.",
    },
    {
      es: "Código QR descargable para compartir el menú digital.",
      en: "A downloadable QR code for sharing the digital menu.",
    },
    {
      es: "Accesos directos a WhatsApp y cobros mediante Yappy.",
      en: "Direct WhatsApp contact and Yappy payment access.",
    },
    {
      es: "Herramientas para reseñas y gestión de clientes del Club VIP.",
      en: "Review tools and customer management for the VIP Club.",
    },
  ],
  uxDecisions: [
    {
      es: "Priorizar tareas breves y claras para que una persona sin experiencia técnica pueda actualizar el menú desde su teléfono.",
      en: "Keep tasks short and clear so people without technical experience can update the menu from their phone.",
    },
    {
      es: "Organizar el panel por gestión del menú, personalización, promoción y clientes para reducir la carga al buscar una función.",
      en: "Group the dashboard into menu management, customization, promotion, and customer areas so features are easy to find.",
    },
    {
      es: "Incluir una vista previa para revisar la experiencia del cliente antes de compartir cambios.",
      en: "Provide a preview so teams can review the customer experience before sharing changes.",
    },
  ],
  seo: {
    es: {
      title: "Meniva — Plataforma SaaS de menús digitales | Fuentivo",
      description: "Caso de estudio de Meniva, una plataforma SaaS para administrar menús digitales de restaurantes y compartirlos mediante códigos QR.",
      image: "/projects/meniva/cover.png",
    },
    en: {
      title: "Meniva — Digital Menu SaaS Platform | Fuentivo",
      description: "A case study of Meniva, a SaaS platform for managing restaurant menus and sharing them through QR codes.",
      image: "/projects/meniva/cover.png",
    },
  },
});
