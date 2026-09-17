import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { formatRuntime } from "@/lib/format";
import { neutral } from "@/lib/tokens";

// darkens the bottom of the header so the text reads on any backdrop
const scrim: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  backgroundImage: `linear-gradient(to top, ${neutral[900]}, rgba(23, 23, 23, 0.4), transparent)`,
};
const treatment: SxProps<Theme> = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  p: { xs: 2, sm: 3 },
};
const heading: SxProps<Theme> = {
  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2.25rem" },
  lineHeight: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
  fontWeight: 700,
  color: "#fff",
};
const meta: SxProps<Theme> = { fontSize: "0.875rem", lineHeight: "1.25rem", color: neutral[300] };

export type TitleTreatmentProps = {
  title: string;
  releaseYear: number;
  runtime: number | null;
  children?: ReactNode;
};

export function TitleTreatment({ title, releaseYear, runtime, children }: TitleTreatmentProps) {
  const metaLine =
    runtime === null ? String(releaseYear) : `${releaseYear} · ${formatRuntime(runtime)}`;

  return (
    <>
      <Box sx={scrim} />
      <Stack spacing={{ xs: 0.5, sm: 1 }} sx={treatment}>
        <Typography component="h2" id="movie-title" sx={heading}>
          {title}
        </Typography>
        <Typography sx={meta}>{metaLine}</Typography>
        {children}
      </Stack>
    </>
  );
}
