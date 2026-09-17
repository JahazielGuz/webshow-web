import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { MovieSummary } from "@/lib/types";

const SCALE = 1.5;
const MAX_WIDTH = 260;
const VIEWPORT_GUTTER = 8;

const card = cn(
  // floats above the tile; width and offset come from the anchor rect
  "fixed z-50",
  // surface
  "overflow-hidden rounded-lg bg-neutral-900 shadow-xl ring-1 ring-white/10",
  // entrance, skipped for reduced-motion users
  "motion-safe:animate-hover-card",
);
const poster = "relative block aspect-[2/3] bg-neutral-800";
const image = "object-cover";
const body = "space-y-2 p-3";
const title = "text-base font-semibold text-neutral-100";
const year = "text-sm text-neutral-400";
const moreInfo = cn(
  // pill
  "inline-block rounded-full px-3 py-1 text-sm font-medium",
  // colour
  "bg-neutral-100 text-neutral-900",
  // interaction
  "transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);

export type HoverCardProps = {
  movie: MovieSummary;
  anchor: DOMRect;
};

// Grow around the tile: 1.5x its width, centred on it, kept 8px inside the viewport
function placeOver(anchor: DOMRect) {
  const width = Math.min(anchor.width * SCALE, MAX_WIDTH);
  const centred = anchor.left + (anchor.width - width) / 2;
  const maxLeft = window.innerWidth - width - VIEWPORT_GUTTER;
  const left = Math.min(Math.max(centred, VIEWPORT_GUTTER), maxLeft);

  return { width, left, top: anchor.top };
}

export function HoverCard({ movie, anchor }: HoverCardProps) {
  return (
    <div className={card} style={placeOver(anchor)}>
      <Link href={`/movies/${movie.id}`} className={poster} aria-label={movie.title}>
        <Image src={movie.posterUrl} alt="" fill sizes="260px" className={image} />
      </Link>
      <div className={body}>
        <h3 className={title}>{movie.title}</h3>
        <p className={year}>{movie.releaseYear}</p>
        <Link href={`/movies/${movie.id}`} className={moreInfo}>
          More info
        </Link>
      </div>
    </div>
  );
}
