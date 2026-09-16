import { PosterTile } from "@/components/PosterTile";
import { cn } from "@/lib/cn";
import type { Genre, MovieSummary } from "@/lib/types";

export type GenreRowProps = {
  genre: Genre;
  movies: MovieSummary[];
  priority?: boolean; // first row on the page - preload its leading posters
};

const section = "space-y-3";
const heading = cn("px-4 md:px-6", "text-lg font-semibold text-neutral-100"); // gutter + type
const strip = cn(
  "flex gap-4 overflow-x-auto", // horizontal scroll strip
  "px-4 md:px-6", // side gutters (align with heading)
  "scroll-px-4 md:scroll-px-6", // keep a focused tile off edge
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40", // scroller focus ring
);

export function GenreRow({ genre, movies, priority = false }: GenreRowProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className={section}>
      <h2 className={heading}>{genre.name}</h2>
      <div className={strip} tabIndex={0} aria-label={`${genre.name} movies`}>
        {movies.map((movie, index) => (
          <PosterTile key={movie.id} movie={movie} priority={priority && index < 3} />
        ))}
      </div>
    </section>
  );
}
