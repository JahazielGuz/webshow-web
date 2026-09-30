import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import { similarMovies } from "@/lib/similarApi";

export type SimilarTitlesRowProps = {
  movieId: string;
  limit?: number;
};

// Films like the one being viewed. Fetches its own data and renders nothing when there is none,
// which covers a film with no vector, a rebuild that has not reached it, and a recommendations
// service that is down or still waking from zero.
export async function SimilarTitlesRow({ movieId, limit = 12 }: SimilarTitlesRowProps) {
  const movies = await similarMovies(movieId, limit);

  if (movies.length === 0) {
    return null;
  }

  return (
    <TileRow title="More like this" flush>
      {movies.map((movie) => (
        <PosterTile key={movie.id} movie={movie} />
      ))}
    </TileRow>
  );
}
