import {
  ArrowUpRight,
  FolderKanban,
  Globe2,
  LayoutTemplate,
  MessageCircle,
  PanelsTopLeft,
  Send,
  Workflow,
} from "lucide-react";
import { FuentivoLogo } from "@/components/branding/FuentivoLogo";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroVariant = "services" | "projects" | "websites" | "about" | "contact";

type PageHeroProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  supportingText?: string;
  variant: PageHeroVariant;
};

function PageHeroVisual({ variant }: { variant: PageHeroVariant }) {
  if (variant === "about") {
    return (
      <div className="brand-mark-stage page-hero-visual" aria-hidden="true">
        <span className="brand-mark-orbit" />
        <span className="brand-mark-axis brand-mark-axis-horizontal" />
        <span className="brand-mark-axis brand-mark-axis-vertical" />
        <span className="brand-mark-frame flex items-center justify-center p-6 sm:p-8">
          <FuentivoLogo
            variant="icon"
            format="svg"
            size={320}
            asLink={false}
            priority
            iconClassName="brand-mark-image size-full object-contain drop-shadow-[0_0_24px_rgba(0,184,106,0.3)]"
          />
        </span>
      </div>
    );
  }

  if (variant === "services") {
    return (
      <div className="page-hero-visual page-hero-panel" aria-hidden="true">
        <div className="page-hero-node left-[8%] top-[12%] w-[48%]">
          <Globe2 className="size-5 text-primary" />
          <span className="mt-6 block h-1.5 w-3/4 rounded-full bg-border" />
          <span className="mt-2 block h-1.5 w-1/2 rounded-full bg-primary/45" />
        </div>
        <div className="page-hero-node right-[7%] top-[34%] w-[48%]">
          <PanelsTopLeft className="size-5 text-primary" />
          <span className="mt-6 grid grid-cols-3 gap-1.5">
            <span className="h-7 rounded bg-primary/20" />
            <span className="h-7 rounded bg-border" />
            <span className="h-7 rounded bg-border" />
          </span>
        </div>
        <div className="page-hero-node bottom-[9%] left-[18%] flex w-[56%] items-center gap-3">
          <Workflow className="size-5 text-primary" />
          <span className="h-1.5 flex-1 rounded-full bg-primary/35" />
        </div>
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div className="page-hero-visual page-hero-panel" aria-hidden="true">
        <div className="page-hero-node inset-x-[8%] top-[11%] flex items-center justify-between">
          <FolderKanban className="size-5 text-primary" />
          <ArrowUpRight className="size-4 text-muted-foreground" />
        </div>
        <div className="page-hero-node inset-x-[14%] top-[38%] flex h-[23%] items-end gap-2 border-primary/25 bg-primary/5">
          <span className="h-2/3 flex-1 rounded bg-primary/30" />
          <span className="h-full flex-1 rounded bg-border" />
          <span className="h-1/2 flex-1 rounded bg-border" />
        </div>
        <div className="page-hero-node inset-x-[20%] bottom-[9%] flex h-[18%] items-center gap-3">
          <span className="size-6 rounded-control bg-primary/15" />
          <span className="h-1.5 flex-1 rounded-full bg-border" />
        </div>
      </div>
    );
  }

  if (variant === "websites") {
    return (
      <div className="page-hero-visual page-hero-panel p-[8%]" aria-hidden="true">
        <div className="h-full overflow-hidden rounded-card border border-border bg-background/90 shadow-2xl">
          <div className="flex h-9 items-center gap-1.5 border-b border-border px-3">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
          </div>
          <div className="grid h-[calc(100%_-_2.25rem)] grid-cols-[0.7fr_1.3fr] gap-4 p-4">
            <div className="flex flex-col justify-between">
              <LayoutTemplate className="size-5 text-primary" />
              <div className="space-y-2">
                <span className="block h-2 w-full rounded-full bg-border" />
                <span className="block h-2 w-2/3 rounded-full bg-primary/45" />
              </div>
            </div>
            <div className="hero-grid rounded-control border border-primary/20 bg-primary/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-hero-visual page-hero-panel" aria-hidden="true">
      <div className="page-hero-node left-[8%] top-[14%] flex w-[64%] items-center gap-3">
        <MessageCircle className="size-5 text-primary" />
        <span className="h-1.5 flex-1 rounded-full bg-border" />
      </div>
      <span className="absolute left-[23%] top-[46%] h-px w-[44%] bg-gradient-to-r from-primary/10 via-primary/70 to-primary/10" />
      <div className="page-hero-node bottom-[12%] right-[8%] flex w-[58%] items-center gap-3 border-primary/25 bg-primary/5">
        <span className="h-1.5 flex-1 rounded-full bg-primary/35" />
        <Send className="size-5 text-primary" />
      </div>
    </div>
  );
}

export function PageHero({
  headingId,
  eyebrow,
  title,
  description,
  supportingText,
  variant,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(0,184,106,0.16),transparent_30%)]"
      />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-35" />
      <Container className="grid items-center gap-12 pb-20 pt-24 sm:pb-24 sm:pt-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-20 lg:pb-32 lg:pt-36">
        <div className={cn("max-w-4xl", variant === "about" && "lg:max-w-3xl")}>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-sm">
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="mt-5 text-balance text-[clamp(2.75rem,6.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
          >
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-fuentivo-secondary sm:text-lg sm:leading-8">
            {description}
          </p>
          {supportingText ? (
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {supportingText}
            </p>
          ) : null}
        </div>

        <PageHeroVisual variant={variant} />
      </Container>
    </section>
  );
}
