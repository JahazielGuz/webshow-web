"use client";

import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerIcon, type PlayerIconName } from "@/components/PlayerIcon";
import type { PlayerExit } from "@/lib/playerExit";
import { focusRing, neutral } from "@/lib/tokens";
import { useYouTubePlayer } from "@/lib/useYouTubePlayer";

// YouTube paints its title bar, a play bezel and captions for the first seconds of playback;
// the cover stays up that long
const REVEAL_DELAY_MS = 3500;
// Controls fade after this long without input while playing. YouTube also shows its chrome for
// a few seconds after every seek, play and pause — all of which are our own input — so our
// chrome (and the shutters that hide theirs) is up for at least as long as theirs.
const IDLE_MS = 4000;
// The action bezel is shown this long; it sits where YouTube draws its own, and covers it
const BEZEL_MS = 700;

const shell: SxProps<Theme> = {
  // the whole viewport, black, above everything else on the page
  position: "fixed",
  inset: 0,
  zIndex: "modal",
  bgcolor: "#000",
  color: neutral[100],
  overflow: "hidden",
};
const stage: SxProps<Theme> = {
  // the largest 16:9 box that fits, centred (letterboxed)
  position: "absolute",
  inset: 0,
  m: "auto",
  width: "min(100vw, calc(100dvh * 16 / 9))",
  aspectRatio: "16 / 9",
};
const layer: SxProps<Theme> = { position: "absolute", inset: 0 };
const host: SxProps<Theme> = {
  // never receives the pointer, so YouTube's hover overlays never appear
  ...layer,
  pointerEvents: "none",
  "& iframe": { width: "100%", height: "100%", border: 0 },
};
const cover: SxProps<Theme> = { ...layer, bgcolor: neutral[900], transition: "opacity 700ms ease" };
const coverImage: CSSProperties = { objectFit: "cover" };
const dim: SxProps<Theme> = {
  // our own paused / ended screen
  ...layer,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(0, 0, 0, 0.55)",
};
const bigButton: SxProps<Theme> = {
  width: 96,
  height: 96,
  color: "#fff",
  bgcolor: "rgba(255, 255, 255, 0.15)",
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.25)" },
  ...focusRing,
};
const bigIcon: SxProps<Theme> = { fontSize: 64 };
const spinner: SxProps<Theme> = { ...dim, bgcolor: "transparent", pointerEvents: "none" };
// opaque strips over the top and bottom of the stage, where YouTube draws its title bar and
// its "more videos" row; shown together with our chrome
const shutter = {
  position: "absolute",
  left: 0,
  right: 0,
  bgcolor: "#000",
  pointerEvents: "none",
  transition: "opacity 300ms ease",
} as const;
const shutterTop: SxProps<Theme> = { ...shutter, top: 0, height: "max(12%, 64px)" };
const shutterBottom: SxProps<Theme> = { ...shutter, bottom: 0, height: "max(16%, 100px)" };
const bezel: SxProps<Theme> = {
  // centred feedback for play / pause / skip
  ...dim,
  bgcolor: "transparent",
  pointerEvents: "none",
  "& > div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: "50%",
    bgcolor: "rgba(0, 0, 0, 0.85)",
    color: "#fff",
  },
};
const bezelIcon: SxProps<Theme> = { fontSize: 64 };
const top: SxProps<Theme> = {
  // back button and title, fading with the rest of the chrome
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: { xs: 2, md: 5 },
  py: { xs: 2, md: 3 },
  backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
  transition: "opacity 300ms ease",
};
const backButton: SxProps<Theme> = {
  color: "#fff",
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.12)" },
  ...focusRing,
};
const backIcon: SxProps<Theme> = { fontSize: 36 };
const heading: SxProps<Theme> = { fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: 600 };

export type TrailerPlayerProps = {
  videoId: string;
  title: string;
  coverUrl: string | null;
  exit: PlayerExit;
};

export function TrailerPlayer({ videoId, title, coverUrl, exit }: TrailerPlayerProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const player = useYouTubePlayer(hostRef, { videoId, autoplay: true });
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [flash, setFlash] = useState<{ icon: PlayerIconName; at: number } | null>(null);

  const playing = player.status === "playing";
  const showChrome = active || !playing;

  // First playback: wait out YouTube's start chrome under the cover
  useEffect(() => {
    if (revealed || !playing) {
      return;
    }

    const timer = window.setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [revealed, playing]);

  // The bezel disappears on its own
  useEffect(() => {
    if (flash === null) {
      return;
    }

    const timer = window.setTimeout(() => setFlash(null), BEZEL_MS);
    return () => window.clearTimeout(timer);
  }, [flash]);

  // Any input shows the chrome; silence hides it again while playing
  useEffect(() => {
    let timer = 0;

    function wake() {
      setActive(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setActive(false), IDLE_MS);
    }

    wake();
    window.addEventListener("mousemove", wake);
    window.addEventListener("keydown", wake);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);

  // The page underneath must not scroll while the player covers it
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function sync() {
      setFullscreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  function toggle() {
    if (playing) {
      player.pause();
      setFlash({ icon: "pause", at: Date.now() });
    } else {
      player.play();
      setFlash({ icon: "play", at: Date.now() });
    }
  }

  function skip(delta: number) {
    player.seekBy(delta);
    setFlash({ icon: delta < 0 ? "replay" : "forward", at: Date.now() });
  }

  function toggleFullscreen() {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      shellRef.current?.requestFullscreen();
    }
  }

  // Back to wherever the player was opened from, or home after a direct load
  function leave() {
    if (exit === "back") {
      router.back();
    } else {
      router.push("/");
    }
  }

  // Netflix's keys: space, arrows, m, f, escape
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowLeft") {
        skip(-10);
      } else if (event.key === "ArrowRight") {
        skip(10);
      } else if (event.key === "m") {
        player.toggleMute();
      } else if (event.key === "f") {
        toggleFullscreen();
      } else if (event.key === "Escape" && document.fullscreenElement === null) {
        leave();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Box
      ref={shellRef}
      sx={shell}
      style={{ cursor: showChrome ? "auto" : "none" }}
      data-status={player.status}
    >
      <Box sx={stage}>
        <Box ref={hostRef} sx={host} />
        <Box sx={cover} style={{ opacity: revealed ? 0 : 1 }}>
          {coverUrl !== null && (
            <Image src={coverUrl} alt="" fill priority sizes="100vw" style={coverImage} />
          )}
        </Box>
        {player.status === "buffering" && revealed && (
          <Box sx={spinner}>
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        )}
        <Box sx={shutterTop} style={{ opacity: showChrome ? 1 : 0 }} />
        <Box sx={shutterBottom} style={{ opacity: showChrome ? 1 : 0 }} />
        {flash !== null && (
          <Box sx={bezel} key={flash.at}>
            <div>
              <PlayerIcon name={flash.icon} sx={bezelIcon} />
            </div>
          </Box>
        )}
        {(player.status === "paused" || player.status === "ended") && (
          <Box sx={dim}>
            <IconButton
              aria-label={player.status === "ended" ? "Replay" : "Play"}
              onClick={player.status === "ended" ? () => player.seekTo(0) : toggle}
              sx={bigButton}
            >
              <PlayerIcon name={player.status === "ended" ? "replay" : "play"} sx={bigIcon} />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box sx={top} style={{ opacity: showChrome ? 1 : 0 }}>
        <IconButton aria-label="Back to browse" onClick={leave} sx={backButton}>
          <PlayerIcon name="back" sx={backIcon} />
        </IconButton>
        <Typography component="h1" sx={heading}>
          {title}
        </Typography>
      </Box>
      <PlayerControls
        playing={playing}
        currentTime={player.currentTime}
        duration={player.duration}
        muted={player.muted}
        fullscreen={fullscreen}
        visible={showChrome}
        onToggle={toggle}
        onSeekBy={skip}
        onSeekTo={player.seekTo}
        onToggleMute={player.toggleMute}
        onToggleFullscreen={toggleFullscreen}
      />
    </Box>
  );
}
