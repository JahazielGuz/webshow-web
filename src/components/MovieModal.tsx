"use client";

import { Dialog, IconButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { OverlayExit } from "@/lib/overlayExit";
import { focusRing, neutral, transition } from "@/lib/tokens";

const paper: SxProps<Theme> = {
  // centred sheet that scrolls inside itself
  m: 0,
  width: "min(100% - 2rem, 56rem)",
  maxWidth: "none",
  maxHeight: "90dvh",
  // surface
  borderRadius: 2,
  bgcolor: neutral[900],
  backgroundImage: "none",
  color: neutral[100],
};
// dimmed page behind it
const backdrop: SxProps<Theme> = { bgcolor: "rgba(0, 0, 0, 0.7)" };
const close: SxProps<Theme> = {
  // pinned top-right, above the trailer
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 1,
  // round icon button
  width: 36,
  height: 36,
  borderRadius: "50%",
  bgcolor: "rgba(23, 23, 23, 0.8)",
  color: neutral[100],
  fontSize: "1.5rem",
  lineHeight: 1,
  // interaction
  transition,
  "&:hover": { bgcolor: neutral[800] },
  ...focusRing,
};

export type MovieModalProps = {
  title: string;
  exit: OverlayExit;
  children: ReactNode;
};

export function MovieModal({ title, exit, children }: MovieModalProps) {
  const router = useRouter();

  // Esc, the backdrop and the close button all leave the same way: back to the page the viewer
  // came from, or to the browse page when this URL was loaded directly
  function leave() {
    if (exit === "back") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Dialog
      open
      onClose={leave}
      maxWidth={false}
      transitionDuration={0}
      aria-labelledby="movie-title"
      aria-label={title}
      slotProps={{ paper: { sx: paper }, backdrop: { sx: backdrop } }}
    >
      <IconButton aria-label="Close" onClick={leave} sx={close}>
        &times;
      </IconButton>
      {children}
    </Dialog>
  );
}
