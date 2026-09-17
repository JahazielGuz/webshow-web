import { Box, Skeleton, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { neutral } from "@/lib/tokens";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pb: 3 };
// the hero's reserved height
const hero: SxProps<Theme> = {
  height: { xs: 420, md: "56vh" },
  minHeight: 360,
  bgcolor: neutral[900],
};
const rows: SxProps<Theme> = { pt: 3 };
const heading: SxProps<Theme> = {
  // gutter
  mx: { xs: 2, md: 3 },
  // a heading-sized bar
  height: 24,
  width: 160,
  borderRadius: 1,
  bgcolor: neutral[800],
};
const strip: SxProps<Theme> = {
  // a row of tiles, clipped at the edge
  display: "flex",
  gap: 2,
  overflow: "hidden",
  // side gutters
  px: { xs: 2, md: 3 },
};
const poster: SxProps<Theme> = {
  // the same 2:3 box as a real tile
  flexShrink: 0,
  width: { xs: 128, sm: 144, md: 160 },
  aspectRatio: "2 / 3",
  borderRadius: 2,
  bgcolor: neutral[800],
};

const ROWS = 4;
const TILES = 8;

export default function Loading() {
  return (
    <Box component="main" sx={main}>
      <Skeleton variant="rectangular" sx={hero} />
      <Stack spacing={4} sx={rows}>
        {Array.from({ length: ROWS }).map((_, row) => (
          <Stack key={row} component="section" spacing={1.5}>
            <Skeleton variant="rectangular" sx={heading} />
            <Box sx={strip}>
              {Array.from({ length: TILES }).map((_, tileIndex) => (
                <Skeleton key={tileIndex} variant="rectangular" sx={poster} />
              ))}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
