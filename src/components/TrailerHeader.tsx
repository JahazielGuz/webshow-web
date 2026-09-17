"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SpeakerIcon } from "@/components/SpeakerIcon";
import { TitleTreatment } from "@/components/TitleTreatment";
import { cn } from "@/lib/cn";
import { youtubeEmbedUrl, youtubeVideoId } from "@/lib/youtube";

const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

const box = "relative aspect-video overflow-hidden bg-neutral-800";
const player = "absolute inset-0 h-full w-full";
const ambientPlayer = cn(player, "pointer-events-none");
const shield = "absolute inset-0";
const backdrop = "object-cover";
const controls = "flex items-center gap-3 pt-2";
const play = cn(
  // pill
  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold",
  // colour
  "bg-white text-neutral-900",
  // interaction
  "transition hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);
const mute = cn(
  // round icon button
  "flex size-9 items-center justify-center rounded-full border border-neutral-400",
  // colour
  "text-neutral-100",
  // interaction
  "transition hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);

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
      <div className={box}>
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
          className={player}
        />
      </div>
    );
  }

  return (
    <div className={box}>
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
            className={ambientPlayer}
          />
          <div className={shield} />
        </>
      ) : backdropUrl !== null ? (
        <Image
          src={backdropUrl}
          alt=""
          fill
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          className={backdrop}
        />
      ) : null}
      <TitleTreatment title={title} releaseYear={releaseYear} runtime={runtime}>
        {videoId !== null && (
          <div className={controls}>
            <button type="button" className={play} onClick={() => setMode("full")}>
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button
              type="button"
              className={mute}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            >
              <SpeakerIcon muted={muted} />
            </button>
          </div>
        )}
      </TitleTreatment>
    </div>
  );
}
