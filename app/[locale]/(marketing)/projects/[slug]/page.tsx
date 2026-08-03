import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, getProjectStaticParams, getRelatedProjects } from "@/lib/projects";
import { getProjectRoute } from "@/lib/routes";
import { createProjectMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getProjectStaticParams(routing.locales);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return createProjectMetadata(project, locale);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProjectDetail" });
  const relatedProjects = getRelatedProjects(project, 2);
  const href = getProjectRoute(project.slug);
  const projectUrl = new URL(getPathname({ locale, href }), siteConfig.url).toString();
  const projectsUrl = new URL(
    getPathname({ locale, href: "/projects" }),
    siteConfig.url,
  ).toString();
  const homeUrl = new URL(`/${locale}`, siteConfig.url).toString();
  const imageUrl = new URL(
    project.seo[locale].image ?? project.coverImage,
    siteConfig.url,
  ).toString();
  const creativeWork = project.category === "product"
    ? {
        "@type": "SoftwareApplication",
        name: project.title[locale],
        description: project.summary[locale],
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: projectUrl,
        image: imageUrl,
        author: { "@type": "Organization", name: siteConfig.name, url: homeUrl },
      }
    : {
        "@type": "CreativeWork",
        name: project.title[locale],
        description: project.summary[locale],
        url: projectUrl,
        image: imageUrl,
        creator: { "@type": "Organization", name: siteConfig.name, url: homeUrl },
      };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      creativeWork,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("breadcrumbs.home"), item: homeUrl },
          { "@type": "ListItem", position: 2, name: t("breadcrumbs.projects"), item: projectsUrl },
          { "@type": "ListItem", position: 3, name: project.title[locale], item: projectUrl },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <ProjectCaseStudy
        project={project}
        relatedProjects={relatedProjects}
        locale={locale}
        labels={{
          breadcrumbHome: t("breadcrumbs.home"),
          breadcrumbProjects: t("breadcrumbs.projects"),
          overview: t("sections.overview"),
          year: t("metadata.year"),
          category: t("metadata.category"),
          status: t("metadata.status"),
          industry: t("metadata.industry"),
          challenge: t("sections.challenge"),
          objective: t("sections.objective"),
          solution: t("sections.solution"),
          process: t("sections.process"),
          features: t("sections.features"),
          uxDecisions: t("sections.uxDecisions"),
          gallery: t("sections.gallery"),
          galleryAlt: t("galleryAlt"),
          results: t("sections.results"),
          testimonial: t("sections.testimonial"),
          technologies: t("sections.technologies"),
          links: t("sections.links"),
          liveProject: t("links.live"),
          repository: t("links.repository"),
          related: t("sections.related"),
          categoryLabel: t(`category.${project.category}`),
          statusLabel: t(`status.${project.status}`),
          cta: {
            eyebrow: t("cta.eyebrow"),
            title: t("cta.title"),
            description: t("cta.description"),
            primary: t("cta.primary"),
            whatsapp: t("cta.whatsapp"),
            whatsappMessage: t("cta.whatsappMessage"),
          },
        }}
      />
    </>
  );
}
