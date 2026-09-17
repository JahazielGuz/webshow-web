"use client";

import { Box, Button, IconButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import NextLink from "next/link";
import { useState, type CSSProperties } from "react";
import { AmbientTrailer } from "@/components/AmbientTrailer";
import { PlayerIcon } from "@/components/PlayerIcon";
import { SpeakerIcon } from "@/components/SpeakerIcon";
import { TitleTreatment } from "@/components/TitleTreatment";
import { focusRing, neutral, transition } from "@/lib/tokens";
import { youtubeVideoId } from "@/lib/youtube";

// 16:9 header box
const box: SxProps<Theme> = {
  position: "relative",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  bgcolor: neutral[800],
};
const backdrop: CSSProperties = { objectFit: "cover" };
const controls: SxProps<Theme> = { display: "flex", alignItems: "center", gap: 1.5, pt: 1 };
const play: SxProps<Theme> = {
  // pill
  gap: 1,
  minWidth: 0,
  borderRadius: 9999,
  px: 2.5,
  py: 1,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 600,
  // colour
  bgcolor: "#fff",
  color: neutral[900],
  // interaction
  transition,
  "&:hover": { bgcolor: neutral[200] },
  ...focusRing,
};
const playIcon: SxProps<Theme> = { fontSize: 20 };
const mute: SxProps<Theme> = {
  // round icon button
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: `1px solid ${neutral[400]}`,
  // colour
  color: neutral[100],
  // interaction
  transition,
  "&:hover": { borderColor: "#fff", bgcolor: "transparent" },
  ...focusRing,
};

export type TrailerHeaderProps = {
  movieId: string;
  title: string;
  trailerUrl: string | null;
  backdropUrl: string | null;
  releaseYear: number;
  runtime: number | null;
  start: number;
};

export function TrailerHeader({
  movieId,
  title,
  trailerUrl,
  backdropUrl,
  releaseYear,
  runtime,
  start,
}: TrailerHeaderProps) {
  const videoId = trailerUrl === null ? null : youtubeVideoId(trailerUrl);
  const [muted, setMuted] = useState(true);

  return (
    <Box sx={box}>
      {videoId !== null ? (
        <AmbientTrailer
          videoId={videoId}
          start={start}
          muted={muted}
          coverUrl={backdropUrl}
          title={title}
        />
      ) : backdropUrl !== null ? (
        <Image
          src={backdropUrl}
          alt=""
          fill
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          style={backdrop}
        />
      ) : null}
      <TitleTreatment title={title} releaseYear={releaseYear} runtime={runtime}>
        {videoId !== null && (
          <Box sx={controls}>
            <Button component={NextLink} href={`/watch/${movieId}`} sx={play}>
              <PlayerIcon name="play" sx={playIcon} />
              Play
            </Button>
            <IconButton
              type="button"
              sx={mute}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => setMuted(!muted)}
            >
              <SpeakerIcon muted={muted} />
            </IconButton>
          </Box>
        )}
      </TitleTreatment>
    </Box>
  );
}
