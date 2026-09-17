import { PosterTile } from "@/components/PosterTile";
import { cn } from "@/lib/cn";
import type { Genre, MovieSummary } from "@/lib/types";

export type GenreRowProps = {
  genre: Genre;
  movies: MovieSummary[];
  priority?: boolean; // first row on the page - preload its leading posters
};

const section = "space-y-3";
const heading = cn(
  // gutter
  "px-4 md:px-6",
  // type
  "text-lg font-semibold text-neutral-100",
);
const strip = cn(
  // horizontal scroll strip
  "flex gap-4 overflow-x-auto",
  // side gutters (align with heading)
  "px-4 md:px-6",
  // keep a focused tile off the edge
  "scroll-px-4 md:scroll-px-6",
  // scroller focus ring
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
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
