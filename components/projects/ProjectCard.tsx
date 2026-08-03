import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  statusLabel: string;
  viewProjectLabel: string;
};

export function ProjectCard({
  project,
  locale,
  statusLabel,
  viewProjectLabel,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-card-large border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_80px_-40px_rgba(0,184,106,0.5)]">
      <Link
        href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
        className="block rounded-card-large"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-background">
          <Image
            src={project.thumbnailImage}
            alt={`${project.title[locale]} — ${project.shortDescription[locale]}`}
            fill
            sizes="(min-width: 1280px) 800px, (min-width: 768px) 75vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/85 px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-primary backdrop-blur-md">
            {statusLabel}
          </span>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <span>{project.year}</span>
              {project.industry ? <span>{project.industry[locale]}</span> : null}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              {project.title[locale]}
            </h3>
            <p className="mt-3 max-w-2xl leading-7 text-fuentivo-secondary">
              {project.shortDescription[locale]}
            </p>
          </div>

          <span className="inline-flex min-h-11 items-center gap-2 self-end font-medium text-primary">
            {viewProjectLabel}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
