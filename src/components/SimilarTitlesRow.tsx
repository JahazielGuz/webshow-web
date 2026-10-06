import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import { getSession } from "@/lib/session";
import { similarMovies } from "@/lib/similarApi";

export type SimilarTitlesRowProps = {
  movieId: string;
  limit?: number;
};

// Films like the one being viewed. Fetches its own data and renders nothing when there is none,
// which covers a film with no vector, a rebuild that has not reached it, and a recommendations
// service that is down or still waking from zero. Nothing for a visitor either: the sample plays,
// but recommendations are one of the things an account is for.
export async function SimilarTitlesRow({ movieId, limit = 12 }: SimilarTitlesRowProps) {
  const user = await getSession();

  if (user === null) {
    return null;
  }

  const movies = await similarMovies(movieId, limit);

  if (movies.length === 0) {
    return null;
  }

  return (
    <TileRow title="More like this" flush>
      {movies.map((movie) => (
        // These tiles are inside the dialog, so opening one replaces the film on screen rather
        // than stacking another entry. Otherwise browsing four films in a row leaves four behind
        // it, and closing walks back through them one at a time instead of returning to the page
        // the viewer actually came from.
        <PosterTile key={movie.id} movie={movie} replace />
      ))}
    </TileRow>
  );
}
