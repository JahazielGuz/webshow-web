import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { NavLink } from "@/components/NavLink";
import { focusRing, neutral, transition } from "@/lib/tokens";

const main: SxProps<Theme> = {
  // centred column filling the viewport
  display: "flex",
  minHeight: "100dvh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  px: 2,
  // surface + type
  bgcolor: neutral[950],
  textAlign: "center",
};
const title: SxProps<Theme> = {
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  color: neutral[100],
};
const message: SxProps<Theme> = {
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: neutral[400],
};
const home: SxProps<Theme> = {
  // pill
  borderRadius: 9999,
  px: 2,
  py: 1,
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

export default function NotFound() {
  return (
    <Box component="main" sx={main}>
      <Typography component="h1" sx={title}>
        Movie not found
      </Typography>
      <Typography sx={message}>That movie is not in the catalogue.</Typography>
      <NavLink href="/" sx={home}>
        Back to home
      </NavLink>
    </Box>
  );
}
