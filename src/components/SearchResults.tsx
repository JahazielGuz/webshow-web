import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { PosterTile } from "@/components/PosterTile";
import { searchMovies } from "@/lib/api";
import { neutral } from "@/lib/tokens";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pt: 12, pb: 6 };
const column: SxProps<Theme> = { px: { xs: 2, md: 3 } };
const heading: SxProps<Theme> = {
  fontSize: { xs: "1.25rem", md: "1.5rem" },
  fontWeight: 600,
  color: neutral[100],
};
const term: SxProps<Theme> = { color: "#fff" };
const empty: SxProps<Theme> = { color: neutral[400], py: 6 };
const grid: SxProps<Theme> = {
  // a grid rather than a scrolling row: results are a set, not a shelf
  display: "grid",
  gap: 2,
  gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
};

export type SearchResultsProps = {
  query: string;
};

// What the home page shows while there is a query in the URL. A whole page of results rather
// than a dropdown, so the posters are the same size they are everywhere else.
export async function SearchResults({ query }: SearchResultsProps) {
  const { items, total } = await searchMovies(query);

  return (
    <Box component="main" sx={main}>
      <Stack spacing={2.5} sx={column}>
        <Typography component="h1" sx={heading}>
          {total === 0 ? "No titles match " : `${total} ${total === 1 ? "title" : "titles"} for `}
          <Box component="span" sx={term}>
            {query}
          </Box>
        </Typography>
        {items.length === 0 ? (
          <Typography sx={empty}>Try a film title, an actor or a genre.</Typography>
        ) : (
          <Box sx={grid}>
            {items.map((movie, index) => (
              <PosterTile key={movie.id} movie={movie} priority={index < 6} />
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
