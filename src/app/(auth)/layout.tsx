import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { neutral } from "@/lib/tokens";

const main: SxProps<Theme> = {
  // the card, centred, clear of the fixed header
  minHeight: "100dvh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: 2,
  pt: 10,
  pb: 6,
  bgcolor: neutral[950],
};

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box component="main" sx={main}>
      {children}
    </Box>
  );
}
