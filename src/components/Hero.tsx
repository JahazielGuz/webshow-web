import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import type { CSSProperties } from "react";
import { NavLink } from "@/components/NavLink";
import { formatRuntime } from "@/lib/format";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { Movie } from "@/lib/types";

const hero: SxProps<Theme> = {
  // full-bleed banner with a reserved height, so nothing below it moves while the image loads
  position: "relative",
  height: { xs: 420, md: "56vh" },
  minHeight: 360,
  overflow: "hidden",
  bgcolor: neutral[900],
};
const backdrop: CSSProperties = { objectFit: "cover", objectPosition: "center top" };
const scrim: SxProps<Theme> = {
  // darkens the left for the text and fades the bottom into the page background
  position: "absolute",
  inset: 0,
  backgroundImage: [
    "linear-gradient(to right, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.45) 50%, rgba(10, 10, 10, 0.1) 100%)",
    `linear-gradient(to top, ${neutral[950]} 0%, rgba(10, 10, 10, 0) 40%)`,
  ].join(", "),
};
const content: SxProps<Theme> = {
  // bottom-left, capped so long overviews do not span the screen
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  px: { xs: 2, md: 6 },
  pb: { xs: 3, md: 6 },
  maxWidth: { md: 720 },
};
const title: SxProps<Theme> = {
  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
  lineHeight: 1.1,
  fontWeight: 700,
  color: "#fff",
};
const meta: SxProps<Theme> = { fontSize: "0.875rem", lineHeight: "1.25rem", color: neutral[300] };
const overview: SxProps<Theme> = {
  // clamp to three lines
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontSize: { xs: "0.9375rem", md: "1.0625rem" },
  lineHeight: 1.5,
  color: neutral[200],
};
const cta: SxProps<Theme> = {
  // primary button
  alignSelf: "flex-start",
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 1,
  px: 3,
  py: 1.25,
  fontSize: "1rem",
  fontWeight: 600,
  // colour
  bgcolor: "#fff",
  color: neutral[900],
  // interaction
  transition,
  "&:hover": { bgcolor: neutral[200] },
  ...focusRing,
};

export type HeroProps = {
  movie: Movie;
};

export function Hero({ movie }: HeroProps) {
  const metaLine =
    movie.runtime === null
      ? String(movie.releaseYear)
      : `${movie.releaseYear} · ${formatRuntime(movie.runtime)}`;

  return (
    <Box component="section" aria-label="Featured" sx={hero}>
      {movie.backdropUrl !== null && (
        <Image src={movie.backdropUrl} alt="" fill priority sizes="100vw" style={backdrop} />
      )}
      <Box sx={scrim} />
      <Stack spacing={1.5} sx={content}>
        <Typography component="h1" sx={title}>
          {movie.title}
        </Typography>
        <Typography sx={meta}>{metaLine}</Typography>
        {movie.overview !== "" && <Typography sx={overview}>{movie.overview}</Typography>}
        <NavLink href={`/movies/${movie.id}`} sx={cta}>
          More info
        </NavLink>
      </Stack>
    </Box>
  );
}
