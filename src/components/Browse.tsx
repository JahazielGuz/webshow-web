import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { GenreRow } from "@/components/GenreRow";
import { Hero } from "@/components/Hero";
import { BecauseYouWatchedRow } from "@/components/BecauseYouWatchedRow";
import { KeepWatchingRow } from "@/components/KeepWatchingRow";
import { getBrowse, getMovie, getMovies } from "@/lib/api";
import { gutter, neutral } from "@/lib/tokens";
import type { BrowseRow, Movie, MovieSummary } from "@/lib/types";

// The bottom padding is room for the last row's hover card, which is taller than its tile
const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pb: 10 };
const rows: SxProps<Theme> = { pt: 3 };
const empty: SxProps<Theme> = {
  // gutter + spacing
  px: gutter,
  py: 8,
  // type
  textAlign: "center",
  color: neutral[400],
};

// The hero is an editorial pick rather than whatever happens to be most popular. There is no
// search endpoint, so it is found by title among the rows the page has already loaded, and falls
// back to the most popular movie if the title is not among them.
const FEATURED_TITLE = "Minions & Monsters";

function pickFeatured(
  genreRows: BrowseRow[],
  mostPopular: MovieSummary | undefined,
): MovieSummary | undefined {
  for (const { movies } of genreRows) {
    const match = movies.find((movie) => movie.title === FEATURED_TITLE);

    if (match !== undefined) {
      return match;
    }
  }

  return mostPopular;
}

// The catalogue itself: a hero and a row per genre. The home page is this and nothing else;
// the movie page renders it too, so a modal reached by a direct link has its context behind it
export async function Browse() {
  const [{ rows: genreRows }, { items }] = await Promise.all([
    getBrowse(),
    // the fallback for the hero; /movies sorts by popularity
    getMovies({ limit: 1 }),
  ]);

  // the rows carry summaries, so the pick is fetched again in full for the hero's overview
  const pick = pickFeatured(genreRows, items[0]);
  let featured: Movie | null = null;

  if (pick !== undefined) {
    featured = await getMovie(pick.id);
  }

  if (genreRows.length === 0) {
    return (
      <Box component="main" sx={main}>
        <Typography sx={empty}>No movies to show yet.</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={main}>
      {featured !== null && <Hero movie={featured} />}
      <Stack spacing={4} sx={rows}>
        <KeepWatchingRow />
        <BecauseYouWatchedRow />
        {genreRows.map(({ genre, movies }, index) => (
          <GenreRow key={genre.id} genre={genre} movies={movies} priority={index === 0} />
        ))}
      </Stack>
    </Box>
  );
}
