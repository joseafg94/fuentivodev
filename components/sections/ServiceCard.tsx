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
        "group flex min-h-full flex-col rounded-card-large border border-border bg-background p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7",
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
