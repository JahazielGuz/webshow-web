import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import { similarMovies } from "@/lib/similarApi";
import { lastCompleted } from "@/lib/watchProgress";

// Films like the last one the viewer finished. Three things have to be true for this to render:
// they are signed in, they have finished something, and the recommendations service answers.
// Any of them missing means no row at all, rather than an empty shelf or an error.
export async function BecauseYouWatchedRow() {
  const watched = await lastCompleted();

  if (watched === null) {
    return null;
  }

  const movies = await similarMovies(watched.id, 12);

  if (movies.length === 0) {
    return null;
  }

  return (
    <TileRow title={`Because you watched ${watched.title}`}>
      {movies.map((movie) => (
        <PosterTile key={movie.id} movie={movie} />
      ))}
    </TileRow>
  );
}
