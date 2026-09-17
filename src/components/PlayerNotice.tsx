"use client";

import { Box, Button, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { PlayerExit } from "@/lib/playerExit";

const shell: SxProps<Theme> = {
  // the whole viewport, above everything else
  position: "fixed",
  inset: 0,
  zIndex: "modal",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  px: 2,
  textAlign: "center",
  bgcolor: "#000",
  color: neutral[100],
};
const backdrop: CSSProperties = { objectFit: "cover", opacity: 0.35 };
const title: SxProps<Theme> = { position: "relative", fontSize: "1.5rem", fontWeight: 700 };
const message: SxProps<Theme> = { position: "relative", color: neutral[300] };
const back: SxProps<Theme> = {
  // pill
  position: "relative",
  minWidth: 0,
  borderRadius: 9999,
  px: 2.5,
  py: 1,
  fontSize: "0.875rem",
  fontWeight: 600,
  // colour
  bgcolor: "#fff",
  color: neutral[900],
  // interaction
  transition,
  "&:hover": { bgcolor: neutral[200] },
  ...focusRing,
};

export type PlayerNoticeProps = {
  heading: string;
  text: string;
  backdropUrl: string | null;
  exit: PlayerExit;
};

// The player's full-viewport message screen: no trailer, or no such movie
export function PlayerNotice({ heading, text, backdropUrl, exit }: PlayerNoticeProps) {
  const router = useRouter();

  function leave() {
    if (exit === "back") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Box component="main" sx={shell}>
      {backdropUrl !== null && (
        <Image src={backdropUrl} alt="" fill priority sizes="100vw" style={backdrop} />
      )}
      <Typography component="h1" sx={title}>
        {heading}
      </Typography>
      <Typography sx={message}>{text}</Typography>
      <Button type="button" onClick={leave} sx={back}>
        Back to browse
      </Button>
    </Box>
  );
}
