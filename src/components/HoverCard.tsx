"use client";

import { keyframes } from "@emotion/react";
import { Box, IconButton, Link, Stack, SvgIcon, Tooltip, Typography } from "@mui/material";
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
// The label moves into a tooltip, so the control is a ringed circle holding a chevron
const CHEVRON = "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z";

const moreInfo: SxProps<Theme> = {
  alignSelf: "flex-start",
  width: 34,
  height: 34,
  border: `2px solid ${neutral[400]}`,
  color: neutral[100],
  bgcolor: "rgba(42, 42, 42, 0.6)",
  transition,
  "&:hover": { borderColor: "#fff", color: "#fff", bgcolor: "rgba(42, 42, 42, 0.9)" },
  ...focusRing,
};
const chevron: SxProps<Theme> = { fontSize: 20 };

export type HoverCardProps = {
  movie: MovieSummary;
  anchor: DOMRect;
  // see PosterTile: inside a dialog, one film replaces another rather than stacking
  replace?: boolean;
};

// Grow around the tile: 1.5x its width, centred on it, kept 8px inside the viewport on every
// side. The card is half as tall again as it is wide, so a tile in the last row of a page or at
// the foot of a dialog would otherwise open a card that runs off the bottom of the window and
// gets cut in half. Height is estimated rather than measured, because where to put the card is
// decided before it exists: the poster is a fixed 2:3 and the body under it is a title, a year
// and a button, which is the constant below.
const BODY_HEIGHT = 118;

function placeOver(anchor: DOMRect) {
  const width = Math.min(anchor.width * SCALE, MAX_WIDTH);
  const height = width * 1.5 + BODY_HEIGHT;
  const centred = anchor.left + (anchor.width - width) / 2;
  const maxLeft = window.innerWidth - width - VIEWPORT_GUTTER;
  const left = Math.min(Math.max(centred, VIEWPORT_GUTTER), maxLeft);
  // a card taller than the window is pinned to the top of it rather than pushed off the top
  const maxTop = Math.max(window.innerHeight - height - VIEWPORT_GUTTER, VIEWPORT_GUTTER);
  const top = Math.min(anchor.top, maxTop);

  return { width, left, top };
}

export function HoverCard({ movie, anchor, replace = false }: HoverCardProps) {
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
        <Tooltip title="More info" placement="top" arrow>
          <IconButton
            component={NextLink}
            href={`/movies/${movie.id}`}
            replace={replace}
            aria-label="More info"
            sx={moreInfo}
          >
            <SvgIcon sx={chevron}>
              <path d={CHEVRON} />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
