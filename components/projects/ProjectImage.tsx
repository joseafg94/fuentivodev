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
  priority = false,
  quality = 90,
  className,
  imageClassName,
}: ProjectImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background", className)}
      style={{ aspectRatio: aspectRatio?.replace("/", " / ") ?? `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-cover", imageClassName)}
        style={{ objectPosition }}
      />
    </div>
  );
}
