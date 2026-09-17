import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { GenreRow } from "@/components/GenreRow";
import { getBrowse } from "@/lib/api";
import { neutral } from "@/lib/tokens";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], py: 3 };
const empty: SxProps<Theme> = {
  // gutter + spacing
  px: { xs: 2, md: 3 },
  py: 8,
  // type
  textAlign: "center",
  color: neutral[400],
};

export default async function HomePage() {
  const { rows } = await getBrowse();

  if (rows.length === 0) {
    return (
      <Box component="main" sx={main}>
        <Typography sx={empty}>No movies to show yet.</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={main}>
      <Stack spacing={4}>
        {rows.map(({ genre, movies }, index) => (
          <GenreRow key={genre.id} genre={genre} movies={movies} priority={index === 0} />
        ))}
      </Stack>
    </Box>
  );
}
