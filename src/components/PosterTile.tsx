import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { MovieSummary } from "@/lib/types";

const link = cn(
  "group block w-32 shrink-0 sm:w-36 md:w-40", // box + repsonsive width
  "rounded-lg", // shape
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white", // keyboard focus
);

const frame = cn(
  "relative aspect-[2/3]", // layout - reserve the 2:3 box before load
  "overflow-hidden rounded-lg", // shape
  "bg-neutral-800", // placeholder colour while the poster streams in
);

const image = cn("object-cover", "transition group-hover:scale-105");

export type PosterTileProps = {
  movie: MovieSummary;
  priority?: boolean;
};

export function PosterTile({ movie, priority = false }: PosterTileProps) {
  return (
    <Link href={`/movies/${movie.id}`} className={link}>
      <div className={frame}>
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
          priority={priority}
          className={image}
        />
      </div>
    </Link>
  );
}
