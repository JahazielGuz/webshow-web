"use client";

import { Box, Button, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useEffect } from "react";
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
const button: SxProps<Theme> = {
  // shape + spacing
  minWidth: 0,
  borderRadius: 1.5,
  px: 2,
  py: 1,
  // type
  fontSize: "1rem",
  lineHeight: 1.5,
  fontWeight: 400,
  // colour
  bgcolor: neutral[100],
  color: neutral[900],
  // interaction
  transition,
  "&:hover": { bgcolor: "#fff" },
  ...focusRing,
};

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box component="main" sx={main}>
      <Typography component="h1" sx={title}>
        Something went wrong
      </Typography>
      <Typography sx={message}>We couldn&apos;t load the catalogue. Please try again.</Typography>
      <Button type="button" onClick={reset} sx={button}>
        Retry
      </Button>
    </Box>
  );
}
