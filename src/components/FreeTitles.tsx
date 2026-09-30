import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import { neutral } from "@/lib/tokens";
import type { MovieSummary } from "@/lib/types";

const ranked: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-end",
  flexShrink: 0,
};
const numeral: SxProps<Theme> = {
  // outlined, oversized and tucked behind the poster's left edge, the way a top-ten row reads
  fontSize: { xs: "5rem", md: "7rem" },
  lineHeight: 0.75,
  fontWeight: 800,
  color: "transparent",
  WebkitTextStroke: `3px ${neutral[700]}`,
  mr: -1.5,
};

export type FreeTitlesProps = {
  movies: MovieSummary[];
};

// The sample a visitor can watch without an account. These tiles are ordinary poster tiles:
// they play, because the whole point is that these five are not a teaser.
export function FreeTitles({ movies }: FreeTitlesProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <TileRow title="Free to watch right now">
      {movies.map((movie, index) => (
        <Box key={movie.id} sx={ranked}>
          <Typography aria-hidden="true" sx={numeral}>
            {index + 1}
          </Typography>
          <PosterTile movie={movie} priority={index === 0} />
        </Box>
      ))}
    </TileRow>
  );
}
