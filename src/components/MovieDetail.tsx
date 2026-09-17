import { CastStrip } from "@/components/CastStrip";
import { GenreChips } from "@/components/GenreChips";
import { TrailerHeader } from "@/components/TrailerHeader";
import type { Movie } from "@/lib/types";

const body = "space-y-4 px-6 py-5";
const overview = "leading-relaxed text-neutral-200";

export type MovieDetailProps = {
  movie: Movie;
  start: number;
};

export function MovieDetail({ movie, start }: MovieDetailProps) {
  return (
    <article>
      <TrailerHeader
        title={movie.title}
        trailerUrl={movie.trailerUrl}
        backdropUrl={movie.backdropUrl}
        releaseYear={movie.releaseYear}
        runtime={movie.runtime}
        start={start}
      />
      <div className={body}>
        {movie.overview !== "" && <p className={overview}>{movie.overview}</p>}
        <GenreChips genres={movie.genres} />
        <CastStrip cast={movie.cast} />
      </div>
    </article>
  );
}
