import { Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { MovieDetail } from "@/components/MovieDetail";
import { MovieModal } from "@/components/MovieModal";
import { getMovie } from "@/lib/api";
import { neutral } from "@/lib/tokens";
import { randomStart } from "@/lib/youtube";

// padded, with room on the right for the close button
const missing: SxProps<Theme> = { p: 3, pr: 7 };
const missingTitle: SxProps<Theme> = { fontSize: "1.5rem", lineHeight: "2rem", fontWeight: 700 };
const missingText: SxProps<Theme> = { color: neutral[400] };

export type MovieModalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieModalPage({ params }: MovieModalPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  // A stale link (for example after a reseed) gets a small message, not a full-page 404
  if (movie === null) {
    return (
      <MovieModal title="Movie not found">
        <Stack spacing={1} sx={missing}>
          <Typography component="h2" id="movie-title" sx={missingTitle}>
            Movie not found
          </Typography>
          <Typography sx={missingText}>That movie is no longer in the catalogue.</Typography>
        </Stack>
      </MovieModal>
    );
  }

  const start = randomStart();

  return (
    <MovieModal title={movie.title}>
      <MovieDetail movie={movie} start={start} />
    </MovieModal>
  );
}
