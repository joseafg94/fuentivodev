import { ExternalLink } from "lucide-react";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { appRoutes } from "@/lib/routes";

import { ProjectGrid } from "./ProjectGrid";
import { ProjectImage } from "./ProjectImage";

type ProjectCaseStudyLabels = {
  breadcrumbHome: string;
  breadcrumbProjects: string;
  overview: string;
  year: string;
  category: string;
  commercialType: string;
  status: string;
  industry: string;
  challenge: string;
  objective: string;
  solution: string;
  process: string;
  features: string;
  uxDecisions: string;
  gallery: string;
  services: string;
  results: string;
  testimonial: string;
  technologies: string;
  links: string;
  liveProject: string;
  repository: string;
  related: string;
  categoryLabel: string;
  statusLabel: string;
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    whatsapp: string;
    whatsappMessage: string;
  };
};

type ProjectCaseStudyProps = {
  project: Project;
  relatedProjects: readonly Project[];
  locale: Locale;
  labels: ProjectCaseStudyLabels;
};

function TextList({ items, locale }: { items: NonNullable<Project["features"]>; locale: Locale }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item[locale]} className="rounded-card border border-border bg-card p-5 leading-7 text-fuentivo-secondary">
          {item[locale]}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy({
  project,
  relatedProjects,
  locale,
  labels,
}: ProjectCaseStudyProps) {
  const localized = (text: Project["summary"]) => text[locale];

  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <section aria-labelledby="project-title" className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(0,184,106,0.16),transparent_30%)]" />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={appRoutes.home} className="rounded-control hover:text-primary">{labels.breadcrumbHome}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={appRoutes.projects} className="rounded-control hover:text-primary">{labels.breadcrumbProjects}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{localized(project.title)}</li>
            </ol>
          </nav>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-primary">
                <span>{labels.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{labels.statusLabel}</span>
              </div>
              <h1 id="project-title" className="mt-5 text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-none tracking-[-0.07em]">
                {localized(project.title)}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-fuentivo-secondary">
                {localized(project.shortDescription)}
              </p>
            </div>

            <ProjectImage
                src={project.coverImage.src}
                width={project.coverImage.width}
                height={project.coverImage.height}
                alt={project.coverImage.alt[locale]}
                aspectRatio={project.coverImage.aspectRatio}
                objectPosition={project.coverImage.objectPosition}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="rounded-card-large border border-border bg-card"
              />
          </div>
        </Container>
      </section>

      <Section aria-labelledby="project-overview-title" className="section-reveal">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl">
            <h2 id="project-overview-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.overview}</h2>
            <p className="mt-6 text-lg leading-8 text-fuentivo-secondary">{localized(project.summary)}</p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4 lg:grid-cols-1">
            {[
              [labels.year, String(project.year)],
              [labels.category, labels.categoryLabel],
              [labels.commercialType, localized(project.commercialLabel)],
              [labels.status, labels.statusLabel],
              ...(project.industry ? [[labels.industry, localized(project.industry)]] : []),
            ].map(([term, value]) => (
              <div key={term} className="bg-card p-5">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{term}</dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section className="section-reveal border-y border-border bg-card/35">
        <Container className="grid gap-10 lg:grid-cols-3">
          {[
            [labels.challenge, project.challenge],
            [labels.objective, project.objective],
            [labels.solution, project.solution],
          ].map(([title, content]) => (
            <article key={title as string}>
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">{title as string}</h2>
              <p className="mt-4 leading-7 text-fuentivo-secondary">{localized(content as Project["summary"])}</p>
            </article>
          ))}
        </Container>
      </Section>

      {project.process ? (
        <Section aria-labelledby="project-process-title" className="section-reveal">
          <Container>
            <h2 id="project-process-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.process}</h2>
            <div className="mt-8"><TextList items={project.process} locale={locale} /></div>
          </Container>
        </Section>
      ) : null}

      {project.features ? (
        <Section aria-labelledby="project-features-title" className="section-reveal">
          <Container>
            <h2 id="project-features-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.features}</h2>
            <div className="mt-8"><TextList items={project.features} locale={locale} /></div>
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="project-services-title" className="section-reveal border-y border-border bg-card/35">
        <Container>
          <h2 id="project-services-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.services}</h2>
          <div className="mt-8"><TextList items={project.services} locale={locale} /></div>
        </Container>
      </Section>

      {project.uxDecisions ? (
        <Section aria-labelledby="project-ux-title" className="section-reveal border-y border-border bg-card/35">
          <Container>
            <h2 id="project-ux-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.uxDecisions}</h2>
            <div className="mt-8"><TextList items={project.uxDecisions} locale={locale} /></div>
          </Container>
        </Section>
      ) : null}

      {project.gallery ? (
        <Section aria-labelledby="project-gallery-title" className="section-reveal">
          <Container>
            <h2 id="project-gallery-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.gallery}</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {project.gallery.map((image) => (
                <figure key={image.src}>
                  <ProjectImage
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt[locale]}
                    aspectRatio={image.aspectRatio}
                    objectPosition={image.objectPosition}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="rounded-card-large border border-border bg-card"
                  />
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {project.results ? (
        <Section aria-labelledby="project-results-title" className="section-reveal">
          <Container>
            <h2 id="project-results-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.results}</h2>
            <div className="mt-8"><TextList items={project.results} locale={locale} /></div>
          </Container>
        </Section>
      ) : null}

      {project.testimonial ? (
        <Section aria-labelledby="project-testimonial-title" className="section-reveal">
          <Container>
            <h2 id="project-testimonial-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.testimonial}</h2>
            <figure className="mt-8 max-w-4xl rounded-card-large border border-border bg-card p-6 sm:p-10">
              <blockquote className="text-xl leading-9 text-fuentivo-secondary sm:text-2xl">“{localized(project.testimonial.quote)}”</blockquote>
              <figcaption className="mt-6 font-medium">
                {project.testimonial.author}
                {project.testimonial.role ? <span className="text-muted-foreground"> · {project.testimonial.role}</span> : null}
              </figcaption>
            </figure>
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="project-technologies-title" className="section-reveal border-y border-border bg-card/35">
        <Container>
          <h2 id="project-technologies-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.technologies}</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-full border border-border bg-background px-4 py-2 text-sm text-fuentivo-secondary">{technology}</li>
            ))}
          </ul>
        </Container>
      </Section>

      {project.liveUrl || project.repositoryUrl ? (
        <Section aria-labelledby="project-links-title" className="section-reveal">
          <Container>
            <h2 id="project-links-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.links}</h2>
            <div className="mt-7 flex flex-wrap gap-5">
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium text-primary">{labels.liveProject}<ExternalLink aria-hidden="true" className="size-4" /></a> : null}
              {project.repositoryUrl ? <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium text-primary">{labels.repository}<ExternalLink aria-hidden="true" className="size-4" /></a> : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <Section aria-labelledby="related-projects-title" className="section-reveal">
          <Container>
            <h2 id="related-projects-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{labels.related}</h2>
            <div className="mt-8">
              <ProjectGrid projects={relatedProjects} locale={locale} />
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactCTA headingId="project-cta-title" eyebrow={labels.cta.eyebrow} title={labels.cta.title} description={labels.cta.description} primaryCta={labels.cta.primary} whatsapp={labels.cta.whatsapp} whatsappMessage={labels.cta.whatsappMessage} />
    </main>
  );
}
