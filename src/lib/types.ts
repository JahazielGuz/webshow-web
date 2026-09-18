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

export type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type SessionTokens = {
  accessToken: string;
  refreshToken: string;
  // Seconds the access token stays valid, which is also how long its cookie lives
  expiresIn: number;
};

export type AuthResponse = SessionTokens & { user: User };

// What a sign-in or sign-up form shows after a failed attempt
export type AuthFormState = { message: string | null };
