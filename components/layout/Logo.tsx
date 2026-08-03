import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/lib/routes";

type LogoProps = {
  label: string;
};

export function Logo({ label }: LogoProps) {
  return (
    <Link
      href={appRoutes.home}
      aria-label={label}
      className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control font-heading text-lg font-semibold tracking-[-0.03em] text-foreground"
    >
      <span
        aria-hidden="true"
        className="size-3 rotate-45 rounded-[2px] border border-primary bg-primary/15"
      />
      Fuentivo
    </Link>
  );
}
