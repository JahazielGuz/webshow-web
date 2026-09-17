import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { GenreRow } from "@/components/GenreRow";
import { Hero } from "@/components/Hero";
import { getBrowse, getMovie, getMovies } from "@/lib/api";
import { neutral } from "@/lib/tokens";
import type { Movie } from "@/lib/types";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pb: 3 };
const rows: SxProps<Theme> = { pt: 3 };
const empty: SxProps<Theme> = {
  // gutter + spacing
  px: { xs: 2, md: 3 },
  py: 8,
  // type
  textAlign: "center",
  color: neutral[400],
};

export default async function HomePage() {
  const [{ rows: genreRows }, { items }] = await Promise.all([
    getBrowse(),
    getMovies({ limit: 1 }),
  ]);

  // The hero features the most popular movie in the catalogue; /movies sorts by popularity
  const [mostPopular] = items;
  let featured: Movie | null = null;

  if (mostPopular !== undefined) {
    featured = await getMovie(mostPopular.id);
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
        {genreRows.map(({ genre, movies }, index) => (
          <GenreRow key={genre.id} genre={genre} movies={movies} priority={index === 0} />
        ))}
      </Stack>
    </Box>
  );
}
