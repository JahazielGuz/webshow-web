"use client";

import { Box, Button, IconButton, SvgIcon } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { SpeakerIcon } from "@/components/SpeakerIcon";
import { TitleTreatment } from "@/components/TitleTreatment";
import { focusRing, neutral, transition } from "@/lib/tokens";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";

const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

// 16:9 header box
const box: SxProps<Theme> = {
  position: "relative",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  bgcolor: neutral[800],
};
const player: CSSProperties = {
  position: "absolute",
  inset: 0,
  height: "100%",
  width: "100%",
  border: 0,
};
// the ambient clip cannot be clicked
const ambientPlayer: CSSProperties = { ...player, pointerEvents: "none" };
const shield: SxProps<Theme> = { position: "absolute", inset: 0 };
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
  title: string;
  trailerUrl: string | null;
  backdropUrl: string | null;
  releaseYear: number;
  runtime: number | null;
  start: number;
};

export function TrailerHeader({
  title,
  trailerUrl,
  backdropUrl,
  releaseYear,
  runtime,
  start,
}: TrailerHeaderProps) {
  const videoId = trailerUrl === null ? null : youtubeVideoId(trailerUrl);
  const [mode, setMode] = useState<"ambient" | "full">("ambient");
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Talk to the running player (enablejsapi=1) instead of reloading the iframe
  function toggleMute() {
    const command = JSON.stringify({ event: "command", func: muted ? "unMute" : "mute", args: [] });
    iframeRef.current?.contentWindow?.postMessage(command, YOUTUBE_ORIGIN);
    setMuted(!muted);
  }

  if (videoId !== null && mode === "full") {
    return (
      <Box sx={box}>
        <iframe
          src={youtubeEmbedUrl(videoId, {
            autoplay: 1,
            controls: 1,
            rel: 0,
            playsinline: 1,
            start: 0,
          })}
          title={`${title} trailer`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={player}
        />
      </Box>
    );
  }

  return (
    <Box sx={box}>
      {videoId !== null ? (
        <>
          <iframe
            ref={iframeRef}
            src={youtubeEmbedUrl(videoId, {
              autoplay: 1,
              mute: 1,
              controls: 0,
              disablekb: 1,
              rel: 0,
              playsinline: 1,
              enablejsapi: 1,
              start,
            })}
            title={`${title} trailer`}
            allow="autoplay; encrypted-media"
            style={ambientPlayer}
          />
          <Box sx={shield} />
        </>
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
            <Button type="button" sx={play} onClick={() => setMode("full")}>
              <SvgIcon viewBox="0 0 24 24" sx={playIcon} aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </SvgIcon>
              Play
            </Button>
            <IconButton
              type="button"
              sx={mute}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            >
              <SpeakerIcon muted={muted} />
            </IconButton>
          </Box>
        )}
      </TitleTreatment>
    </Box>
  );
}
