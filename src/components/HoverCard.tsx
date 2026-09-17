"use client";

import { keyframes } from "@emotion/react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import NextLink from "next/link";
import type { CSSProperties } from "react";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { MovieSummary } from "@/lib/types";

const SCALE = 1.5;
const MAX_WIDTH = 260;
const VIEWPORT_GUTTER = 8;

const enter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const card: SxProps<Theme> = {
  // floats above the tile; width and offset come from the anchor rect
  position: "fixed",
  zIndex: 50,
  // surface: rounded, dark, a hairline ring and a soft shadow
  overflow: "hidden",
  borderRadius: 2,
  bgcolor: neutral[900],
  boxShadow: [
    "0 0 0 1px rgba(255, 255, 255, 0.1)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  ].join(", "),
  // entrance, skipped for reduced-motion users
  "@media (prefers-reduced-motion: no-preference)": { animation: `${enter} 150ms ease-out` },
};
const poster: SxProps<Theme> = {
  display: "block",
  position: "relative",
  aspectRatio: "2 / 3",
  bgcolor: neutral[800],
};
const image: CSSProperties = { objectFit: "cover" };
const body: SxProps<Theme> = { p: 1.5 };
const title: SxProps<Theme> = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontWeight: 600,
  color: neutral[100],
};
const year: SxProps<Theme> = { fontSize: "0.875rem", lineHeight: "1.25rem", color: neutral[400] };
const moreInfo: SxProps<Theme> = {
  // pill, sized to its label
  alignSelf: "flex-start",
  minWidth: 0,
  borderRadius: 9999,
  px: 1.5,
  py: 0.5,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  // colour
  bgcolor: neutral[100],
  color: neutral[900],
  // interaction
  transition,
  "&:hover": { bgcolor: "#fff" },
  ...focusRing,
};

export type HoverCardProps = {
  movie: MovieSummary;
  anchor: DOMRect;
};

// Grow around the tile: 1.5x its width, centred on it, kept 8px inside the viewport
function placeOver(anchor: DOMRect) {
  const width = Math.min(anchor.width * SCALE, MAX_WIDTH);
  const centred = anchor.left + (anchor.width - width) / 2;
  const maxLeft = window.innerWidth - width - VIEWPORT_GUTTER;
  const left = Math.min(Math.max(centred, VIEWPORT_GUTTER), maxLeft);

  return { width, left, top: anchor.top };
}

export function HoverCard({ movie, anchor }: HoverCardProps) {
  return (
    <Box sx={card} style={placeOver(anchor)}>
      <Link
        component={NextLink}
        href={`/watch/${movie.id}`}
        aria-label={movie.title}
        underline="none"
        sx={poster}
      >
        <Image src={movie.posterUrl} alt="" fill sizes="260px" style={image} />
      </Link>
      <Stack spacing={1} sx={body}>
        <Typography component="h3" sx={title}>
          {movie.title}
        </Typography>
        <Typography sx={year}>{movie.releaseYear}</Typography>
        <Button component={NextLink} href={`/movies/${movie.id}`} sx={moreInfo}>
          More info
        </Button>
      </Stack>
    </Box>
  );
}
