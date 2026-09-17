"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { neutral } from "@/lib/tokens";
import { hideCaptions, loadYouTubeApi } from "@/lib/youtubeApi";

// The banner stays this long after the clip mounts, and no longer once the video is playing
const BANNER_MS = 2000;
// ...then crossfades into the video
const FADE_MS = 600;
// The player is scaled up and clipped, so the strips where YouTube draws its chrome fall
// outside the visible box
const CROP_SCALE = 1.3;

const box: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  bgcolor: neutral[800],
};
const stage: SxProps<Theme> = {
  // oversized and centred; never receives the pointer, so hover overlays never appear
  position: "absolute",
  top: "50%",
  left: "50%",
  width: `${CROP_SCALE * 100}%`,
  height: `${CROP_SCALE * 100}%`,
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  "& iframe": { width: "100%", height: "100%", border: 0 },
};
const cover: SxProps<Theme> = {
  // the backdrop, crossfading into the video once it is up; back at once if the video stops
  position: "absolute",
  inset: 0,
  bgcolor: neutral[800],
  pointerEvents: "none",
};
const coverImage: CSSProperties = { objectFit: "cover" };

export type AmbientTrailerProps = {
  videoId: string;
  start: number;
  muted: boolean;
  coverUrl: string | null;
  title: string;
};

export function AmbientTrailer({ videoId, start, muted, coverUrl, title }: AmbientTrailerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  // The banner has had its time
  const [bannerDone, setBannerDone] = useState(false);
  // YouTube reports the video as playing; buffering keeps it, paused and ended clear it
  const [playing, setPlaying] = useState(false);
  const revealed = bannerDone && playing;

  useEffect(() => {
    const host = hostRef.current;

    if (host === null) {
      return;
    }

    let cancelled = false;
    const bannerTimer = window.setTimeout(() => setBannerDone(true), BANNER_MS);
    // The API replaces this element with its iframe, so give it one of its own to consume
    const mount = document.createElement("div");
    host.append(mount);

    loadYouTubeApi().then((api) => {
      if (cancelled) {
        return;
      }

      playerRef.current = new api.Player(mount, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          start,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            hideCaptions(event.target);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === api.PlayerState.PLAYING) {
              hideCaptions(event.target);
              setPlaying(true);
            } else if (
              event.data === api.PlayerState.PAUSED ||
              event.data === api.PlayerState.ENDED
            ) {
              // YouTube's paused and end screens must never show (a hidden tab pauses the
              // clip, a loop restart ends it): back under the banner until it plays again
              setPlaying(false);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(bannerTimer);
      playerRef.current?.destroy();
      playerRef.current = null;
      mount.remove();
    };
  }, [videoId, start]);

  // Mute is toggled on the running player, never by reloading it
  useEffect(() => {
    const player = playerRef.current;

    if (player === null || !revealed) {
      return;
    }

    if (muted) {
      player.mute();
    } else {
      player.unMute();
    }
  }, [muted, revealed]);

  return (
    <Box sx={box} aria-label={`${title} trailer`} role="img">
      <Box ref={hostRef} sx={stage} />
      <Box
        sx={cover}
        style={{
          opacity: revealed ? 0 : 1,
          transition: revealed ? `opacity ${FADE_MS}ms ease` : "none",
        }}
      >
        {coverUrl !== null && (
          <Image
            src={coverUrl}
            alt=""
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            style={coverImage}
          />
        )}
      </Box>
    </Box>
  );
}
