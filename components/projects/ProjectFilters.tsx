"use client";

import { useState, type ReactNode } from "react";

import type { ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/utils";

import { EmptyProjects } from "./EmptyProjects";

type FilterValue = "all" | ProjectCategory;

type ProjectFiltersProps = {
  filters: ReadonlyArray<{ value: FilterValue; label: string }>;
  counts: Record<FilterValue, number>;
  filterLabel: string;
  resultsLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  children: ReactNode;
};

export function ProjectFilters({
  filters,
  counts,
  filterLabel,
  resultsLabel,
  emptyTitle,
  emptyDescription,
  children,
}: ProjectFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const activeCount = counts[activeFilter];

  return (
    <div data-active-project-filter={activeFilter}>
      <div
        role="group"
        aria-label={filterLabel}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-fuentivo-secondary hover:border-primary/45 hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {activeCount} {resultsLabel}
      </p>

      {activeCount === 0 ? (
        <div className="mt-8">
          <EmptyProjects title={emptyTitle} description={emptyDescription} />
        </div>
      ) : null}

      <div className="mt-8">{children}</div>
    </div>
  );
}
