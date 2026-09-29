import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import type { Genre, MovieSummary } from "@/lib/types";

export type GenreRowProps = {
  genre: Genre;
  movies: MovieSummary[];
  priority?: boolean; // first row on the page - preload its leading posters
};

export function GenreRow({ genre, movies, priority = false }: GenreRowProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <TileRow title={genre.name}>
      {movies.map((movie, index) => (
        <PosterTile key={movie.id} movie={movie} priority={priority && index < 3} />
      ))}
    </TileRow>
  );
}
