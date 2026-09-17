import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { CastStrip } from "@/components/CastStrip";
import { GenreChips } from "@/components/GenreChips";
import { TrailerHeader } from "@/components/TrailerHeader";
import { neutral } from "@/lib/tokens";
import type { Movie } from "@/lib/types";

const body: SxProps<Theme> = { px: 3, py: 2.5 };
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
      </Stack>
    </Box>
  );
}
