import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProjectRoute } from "@/lib/routes";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  categoryLabel: string;
  statusLabel: string;
  viewProjectLabel: string;
  liveProjectLabel: string;
  imageSizes?: string;
};

export function ProjectCard({
  project,
  locale,
  categoryLabel,
  statusLabel,
  viewProjectLabel,
  liveProjectLabel,
  imageSizes = "(min-width: 1280px) 600px, (min-width: 1024px) 50vw, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)",
}: ProjectCardProps) {
  const projectHref = getProjectRoute(project.slug);

  return (
    <article className="motion-card group flex h-full flex-col overflow-hidden rounded-card-large border border-border bg-card transition-[border-color,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none">
      <Link href={projectHref} className="relative block aspect-[4/3] overflow-hidden border-b border-border bg-background">
        <Image
          src={project.thumbnailImage}
          alt={`${project.title[locale]} — ${project.shortDescription[locale]}`}
          fill
          sizes={imageSizes}
          quality={90}
          className="motion-card-image object-cover transition-transform duration-300 ease-out motion-reduce:transition-none"
        />
        <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/85 px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-primary backdrop-blur-md">
          {statusLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span>{categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          {project.industry ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.industry[locale]}</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          <Link href={projectHref} className="rounded-control transition-colors hover:text-primary">
            {project.title[locale]}
          </Link>
        </h3>
        <p className="mt-3 leading-7 text-fuentivo-secondary">
          {project.shortDescription[locale]}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={project.technologies.join(", ")}>
          {project.technologies.slice(0, 4).map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-7">
          <Link href={projectHref} className="inline-flex min-h-11 items-center gap-2 font-medium text-primary">
            {viewProjectLabel}
            <ArrowUpRight
              aria-hidden="true"
              className="motion-card-icon size-4 transition-transform duration-200 ease-out motion-reduce:transition-none"
            />
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-medium text-fuentivo-secondary transition-colors hover:text-foreground"
            >
              {liveProjectLabel}
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
