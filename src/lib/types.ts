export type Genre = { id: string; name: string; slug: string };

export type Actor = { id: string; name: string; profileUrl: string | null };

export type MovieSummary = {
  id: string;
  title: string;
  posterUrl: string;
  releaseYear: number;
};

export type Movie = MovieSummary & {
  overview: string;
  backdropUrl: string | null;
  runtime: number | null;
  trailerUrl: string | null;
  genres: Genre[];
  cast: Actor[];
};

// Response envelopes - match webshow-core's controllers exactly
export type GenresResponse = { items: Genre[] };

export type BrowseRow = { genre: Genre; movies: MovieSummary[] };
export type BrowseResponse = { rows: BrowseRow[] };

export type MoviesResponse = {
  items: MovieSummary[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};
