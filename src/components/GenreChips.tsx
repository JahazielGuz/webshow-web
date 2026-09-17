import { Box, Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { neutral } from "@/lib/tokens";
import type { Genre } from "@/lib/types";

const row: SxProps<Theme> = { display: "flex", flexWrap: "wrap", gap: 1 };
const chip: SxProps<Theme> = {
  // small pill sized to its label
  height: "auto",
  borderRadius: 9999,
  fontSize: "0.75rem",
  lineHeight: "1rem",
  "& .MuiChip-label": { px: 1.5, py: 0.5 },
  // colour
  bgcolor: neutral[800],
  color: neutral[200],
};

export type GenreChipsProps = {
  genres: Genre[];
};

export function GenreChips({ genres }: GenreChipsProps) {
  if (genres.length === 0) {
    return null;
  }

  return (
    <Box sx={row}>
      {genres.map((genre) => (
        <Chip key={genre.id} label={genre.name} sx={chip} />
      ))}
    </Box>
  );
}
