import { Box, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieDetail } from "@/components/MovieDetail";
import { NavLink } from "@/components/NavLink";
import { getMovie } from "@/lib/api";
import { neutral, transition } from "@/lib/tokens";
import { randomStart } from "@/lib/youtube";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], py: 3 };
const column: SxProps<Theme> = { mx: "auto", maxWidth: 768, px: { xs: 2, md: 3 } };
const back: SxProps<Theme> = {
  // inline link, small and muted until hovered
  display: "inline-block",
  alignSelf: "flex-start",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: neutral[400],
  transition,
  "&:hover": { color: "#fff" },
};
const sheet: SxProps<Theme> = {
  overflow: "hidden",
  borderRadius: 2,
  bgcolor: neutral[900],
  color: neutral[100],
};

export type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return { title: movie === null ? "webshow" : movie.title };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    notFound();
  }

  const start = randomStart();

  return (
    <Box component="main" sx={main}>
      <Stack spacing={2} sx={column}>
        <NavLink href="/" sx={back}>
          &larr; Back to home
        </NavLink>
        <Box sx={sheet}>
          <MovieDetail movie={movie} start={start} />
        </Box>
      </Stack>
    </Box>
  );
}
