import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { PosterTile } from "@/components/PosterTile";
import { neutral } from "@/lib/tokens";
import type { Genre, MovieSummary } from "@/lib/types";

export type GenreRowProps = {
  genre: Genre;
  movies: MovieSummary[];
  priority?: boolean; // first row on the page - preload its leading posters
};

const heading: SxProps<Theme> = {
  // gutter
  px: { xs: 2, md: 3 },
  // type
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  color: neutral[100],
};
const strip: SxProps<Theme> = {
  // horizontal scroll strip
  display: "flex",
  gap: 2,
  overflowX: "auto",
  // side gutters (align with the heading)
  px: { xs: 2, md: 3 },
  // keep a focused tile off the edge
  scrollPaddingInline: { xs: "16px", md: "24px" },
  // scroller focus ring
  "&:focus": { outline: "none" },
  "&:focus-visible": { boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4)" },
};

export function GenreRow({ genre, movies, priority = false }: GenreRowProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <Stack component="section" spacing={1.5}>
      <Typography component="h2" sx={heading}>
        {genre.name}
      </Typography>
      <Box sx={strip} tabIndex={0} aria-label={`${genre.name} movies`}>
        {movies.map((movie, index) => (
          <PosterTile key={movie.id} movie={movie} priority={priority && index < 3} />
        ))}
      </Box>
    </Stack>
  );
}
