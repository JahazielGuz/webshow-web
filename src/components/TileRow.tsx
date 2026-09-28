import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { neutral } from "@/lib/tokens";

const heading: SxProps<Theme> = {
  // gutter
  px: { xs: 2, md: 3 },
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
  px: { xs: 2, md: 3 },
  // keep a focused tile off the edge
  scrollPaddingInline: { xs: "16px", md: "24px" },
  // scroller focus ring
  "&:focus": { outline: "none" },
  "&:focus-visible": { boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4)" },
};

export type TileRowProps = {
  title: string;
  children: ReactNode;
};

// A titled, horizontally scrolling strip of tiles. Shared so every row on the home page scrolls,
// gutters and takes focus identically; only what goes inside it differs.
export function TileRow({ title, children }: TileRowProps) {
  return (
    <Stack component="section" spacing={1.5}>
      <Typography component="h2" sx={heading}>
        {title}
      </Typography>
      <Box sx={strip} tabIndex={0} aria-label={`${title} movies`}>
        {children}
      </Box>
    </Stack>
  );
}
