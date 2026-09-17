import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { CastAvatar } from "@/components/CastAvatar";
import { neutral } from "@/lib/tokens";
import type { Actor } from "@/lib/types";

const heading: SxProps<Theme> = {
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 600,
  color: neutral[400],
};
const strip: SxProps<Theme> = {
  // horizontally scrolling list
  display: "flex",
  gap: 2,
  overflowX: "auto",
  pb: 1,
  // plain list
  listStyle: "none",
  m: 0,
  p: 0,
};
const item: SxProps<Theme> = {
  display: "flex",
  width: 64,
  flexShrink: 0,
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};
const name: SxProps<Theme> = {
  maxWidth: 64,
  textAlign: "center",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  wordBreak: "break-word",
  color: neutral[300],
};

export type CastStripProps = {
  cast: Actor[];
};

export function CastStrip({ cast }: CastStripProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <Stack component="section" spacing={1.5}>
      <Typography component="h3" sx={heading}>
        Cast
      </Typography>
      <Box component="ul" sx={strip}>
        {cast.map((actor) => (
          <Box key={actor.id} component="li" sx={item}>
            <CastAvatar actor={actor} />
            <Typography component="span" sx={name}>
              {actor.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
