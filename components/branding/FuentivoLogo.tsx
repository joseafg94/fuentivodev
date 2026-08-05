import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type FuentivoLogoProps = {
  variant?: "full" | "icon" | "wordmark";
  format?: "svg" | "png";
  size?: "sm" | "md" | "lg" | "xl" | number;
  label?: string;
  asLink?: boolean;
  priority?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

const sizeMap = {
  sm: { dimension: 20, textClass: "text-base" },
  md: { dimension: 28, textClass: "text-lg" },
  lg: { dimension: 36, textClass: "text-xl" },
  xl: { dimension: 48, textClass: "text-2xl" },
} as const;

export function FuentivoLogo({
  variant = "full",
  format = "svg",
  size = "md",
  label = "Fuentivo",
  asLink = true,
  priority = false,
  className,
  iconClassName,
  textClassName,
}: FuentivoLogoProps) {
  const numericSize = typeof size === "number" ? size : sizeMap[size].dimension;
  const defaultTextClass = typeof size === "string" ? sizeMap[size].textClass : "text-lg";

  const src = format === "png" ? "/brand/fuentivo-icon.png" : "/brand/fuentivo-logo.svg";

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-heading font-semibold tracking-[-0.03em] text-foreground",
        defaultTextClass,
        className
      )}
    >
      {variant !== "wordmark" ? (
        <Image
          src={src}
          alt={variant === "icon" ? label : ""}
          width={numericSize}
          height={numericSize}
          priority={priority}
          aria-hidden={variant !== "icon"}
          className={cn("shrink-0 object-contain", iconClassName)}
          style={{ width: numericSize, height: numericSize }}
        />
      ) : null}

      {variant !== "icon" ? (
        <span className={cn("leading-none", textClassName)}>Fuentivo</span>
      ) : null}
    </span>
  );

  if (asLink) {
    return (
      <Link
        href={appRoutes.home}
        aria-label={label}
        className="inline-flex min-h-11 shrink-0 items-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
      </Link>
    );
  }

  return content;
}
