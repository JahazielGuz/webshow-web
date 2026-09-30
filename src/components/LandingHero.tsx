import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import type { CSSProperties } from "react";
import { NavLink } from "@/components/NavLink";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { Movie } from "@/lib/types";

const hero: SxProps<Theme> = {
  // taller than the browse banner: this one is the whole pitch, not a strip above the rows
  position: "relative",
  minHeight: { xs: 560, md: "80vh" },
  display: "flex",
  overflow: "hidden",
  bgcolor: neutral[900],
};
const backdrop: CSSProperties = { objectFit: "cover", objectPosition: "center" };
const scrim: SxProps<Theme> = {
  // centred text needs the middle darkened, not just one side
  position: "absolute",
  inset: 0,
  backgroundImage: [
    "radial-gradient(ellipse at center, rgba(10, 10, 10, 0.75) 0%, rgba(10, 10, 10, 0.9) 100%)",
    `linear-gradient(to top, ${neutral[950]} 0%, rgba(10, 10, 10, 0) 35%)`,
  ].join(", "),
};
const content: SxProps<Theme> = {
  position: "relative",
  m: "auto",
  px: 2,
  py: { xs: 12, md: 14 },
  maxWidth: 720,
  textAlign: "center",
  alignItems: "center",
};
const headline: SxProps<Theme> = {
  fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
  lineHeight: 1.1,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "#fff",
};
const subhead: SxProps<Theme> = {
  fontSize: { xs: "1.0625rem", md: "1.25rem" },
  lineHeight: 1.5,
  color: neutral[200],
};
const prompt: SxProps<Theme> = { fontSize: "1rem", color: neutral[300] };
const buttons: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 1.5,
};
const button = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 1,
  px: 3.5,
  py: 1.5,
  fontSize: "1.0625rem",
  fontWeight: 600,
  transition,
  ...focusRing,
} as const;
// exported so the closing call to action on the landing page is the same pill, defined once
export const joinButton: SxProps<Theme> = {
  ...button,
  bgcolor: "#fff",
  color: neutral[900],
  "&:hover": { bgcolor: neutral[200] },
};
const signIn: SxProps<Theme> = {
  ...button,
  bgcolor: "rgba(109, 109, 110, 0.7)",
  color: "#fff",
  "&:hover": { bgcolor: "rgba(109, 109, 110, 0.4)" },
};

export type LandingHeroProps = {
  // The most popular film, lending its backdrop. Null only if the catalogue is empty, and then
  // the pitch still reads against flat colour
  movie: Movie | null;
};

export function LandingHero({ movie }: LandingHeroProps) {
  return (
    <Box component="section" sx={hero}>
      {movie?.backdropUrl != null && (
        <Image src={movie.backdropUrl} alt="" fill priority sizes="100vw" style={backdrop} />
      )}
      <Box sx={scrim} />
      <Stack spacing={3} sx={content}>
        <Typography component="h1" sx={headline}>
          A thousand films. Five of them are already open.
        </Typography>
        <Typography sx={subhead}>
          Watch the five most popular trailers below without signing up. Create a free account for
          the rest of the catalogue, and for a home page that remembers what you watched.
        </Typography>
        <Typography sx={prompt}>Ready to watch? It takes an email and a password.</Typography>
        <Box sx={buttons}>
          <NavLink href="/register" sx={joinButton}>
            Get started
          </NavLink>
          <NavLink href="/login" sx={signIn}>
            Sign in
          </NavLink>
        </Box>
      </Stack>
    </Box>
  );
}
