import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { CastStrip } from "@/components/CastStrip";
import { SimilarTitlesRow } from "@/components/SimilarTitlesRow";
import { GenreChips } from "@/components/GenreChips";
import { TrailerHeader } from "@/components/TrailerHeader";
import { neutral } from "@/lib/tokens";
import type { Movie } from "@/lib/types";

// The row of similar films is the last thing in the dialog, and hovering one grows a card that
// is taller than the tile. The extra room below lets that card open into space instead of over
// the cast, and lets the row be scrolled up to meet it.
const body: SxProps<Theme> = { px: 3, pt: 2.5, pb: 8 };
const overview: SxProps<Theme> = { lineHeight: 1.625, color: neutral[200] };

export type MovieDetailProps = {
  movie: Movie;
  start: number;
};

export function MovieDetail({ movie, start }: MovieDetailProps) {
  return (
    <Box component="article">
      <TrailerHeader
        movieId={movie.id}
        title={movie.title}
        trailerUrl={movie.trailerUrl}
        backdropUrl={movie.backdropUrl}
        releaseYear={movie.releaseYear}
        runtime={movie.runtime}
        start={start}
      />
      <Stack spacing={2} sx={body}>
        {movie.overview !== "" && <Typography sx={overview}>{movie.overview}</Typography>}
        <GenreChips genres={movie.genres} />
        <CastStrip cast={movie.cast} />
        <SimilarTitlesRow movieId={movie.id} />
      </Stack>
    </Box>
  );
}
