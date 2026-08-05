import Image from "next/image";

import { cn } from "@/lib/utils";

type ProjectImageProps = {
  src: string;
  width: number;
  height: number;
  sizes: string;
  alt: string;
  aspectRatio?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  backgroundColor?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  imageClassName?: string;
};

export function ProjectImage({
  src,
  width,
  height,
  sizes,
  alt,
  aspectRatio,
  objectPosition = "center",
  objectFit = "cover",
  backgroundColor,
  priority = false,
  quality = 90,
  className,
  imageClassName,
}: ProjectImageProps) {
  const fitClass =
    objectFit === "contain"
      ? "object-contain"
      : objectFit === "fill"
        ? "object-fill"
        : objectFit === "none"
          ? "object-none"
          : objectFit === "scale-down"
            ? "object-scale-down"
            : "object-cover";

  return (
    <div
      className={cn("relative overflow-hidden bg-background", className)}
      style={{
        aspectRatio: aspectRatio?.replace("/", " / ") ?? `${width} / ${height}`,
        ...(backgroundColor ? { backgroundColor } : {}),
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn(fitClass, imageClassName)}
        style={{ objectPosition }}
      />
    </div>
  );
}
