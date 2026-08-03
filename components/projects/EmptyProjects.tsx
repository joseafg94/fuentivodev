import { FolderSearch } from "lucide-react";

type EmptyProjectsProps = {
  title: string;
  description: string;
};

export function EmptyProjects({ title, description }: EmptyProjectsProps) {
  return (
    <div className="rounded-card-large border border-dashed border-border bg-card px-6 py-14 text-center sm:px-10">
      <span className="mx-auto grid size-12 place-items-center rounded-control border border-primary/25 bg-primary/10 text-primary">
        <FolderSearch aria-hidden="true" className="size-5" />
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-fuentivo-secondary">
        {description}
      </p>
    </div>
  );
}
