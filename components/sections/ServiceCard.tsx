import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceCardProps = ComponentProps<"article"> & {
  icon: LucideIcon;
  index: string;
  title: string;
};

export function ServiceCard({
  icon: Icon,
  index,
  title,
  children,
  className,
  ...props
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "motion-card group flex min-h-full flex-col rounded-card-large border border-border bg-background p-6 transition-[border-color,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none sm:p-7",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-control border border-primary/25 bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
      </div>
      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      {children}
    </article>
  );
}
