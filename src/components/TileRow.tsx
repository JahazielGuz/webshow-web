import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { gutter, neutral } from "@/lib/tokens";

const heading: SxProps<Theme> = {
  // gutter
  px: gutter,
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
  px: gutter,
  // keep a focused tile off the edge
  scrollPaddingInline: gutter,
  // scroller focus ring
  "&:focus": { outline: "none" },
  "&:focus-visible": { boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4)" },
};

const flushHeading: SxProps<Theme> = { ...heading, px: 0 };
// The scroll padding stays: a focused tile still needs room before the edge it scrolls to
const flushStrip: SxProps<Theme> = { ...strip, px: 0 };

export type TileRowProps = {
  title: string;
  // The home page needs its own gutters; inside an already-padded container they double up
  flush?: boolean;
  children: ReactNode;
};

// A titled, horizontally scrolling strip of tiles. Shared so every row on the home page scrolls,
// gutters and takes focus identically; only what goes inside it differs.
export function TileRow({ title, flush = false, children }: TileRowProps) {
  return (
    <Stack component="section" spacing={1.5}>
      <Typography component="h2" sx={flush ? flushHeading : heading}>
        {title}
      </Typography>
      <Box sx={flush ? flushStrip : strip} tabIndex={0} aria-label={`${title} movies`}>
        {children}
      </Box>
    </Stack>
  );
}
