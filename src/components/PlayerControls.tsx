"use client";

import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { PlayerIcon } from "@/components/PlayerIcon";
import { formatTime } from "@/lib/format";
import { focusRing, neutral } from "@/lib/tokens";

const bar: SxProps<Theme> = {
  // pinned to the bottom, fading with the rest of the chrome
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  px: { xs: 2, md: 5 },
  pb: { xs: 2, md: 3 },
  pt: 6,
  backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
  transition: "opacity 300ms ease",
};
const progress: SxProps<Theme> = {
  // thin white track with a small thumb
  color: "#fff",
  height: 4,
  "& .MuiSlider-thumb": {
    width: 14,
    height: 14,
    "&:hover, &.Mui-focusVisible": { boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.2)" },
  },
  "& .MuiSlider-rail": { opacity: 0.3 },
};
const row: SxProps<Theme> = { display: "flex", alignItems: "center", gap: 1 };
const button: SxProps<Theme> = {
  color: neutral[100],
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.12)" },
  ...focusRing,
};
const icon: SxProps<Theme> = { fontSize: 32 };
const time: SxProps<Theme> = {
  fontSize: "0.875rem",
  color: neutral[300],
  fontVariantNumeric: "tabular-nums",
};
const grow: SxProps<Theme> = { flex: 1 };

export type PlayerControlsProps = {
  playing: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  fullscreen: boolean;
  visible: boolean;
  onToggle: () => void;
  onSeekBy: (delta: number) => void;
  onSeekTo: (seconds: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
};

export function PlayerControls({
  playing,
  currentTime,
  duration,
  muted,
  fullscreen,
  visible,
  onToggle,
  onSeekBy,
  onSeekTo,
  onToggleMute,
  onToggleFullscreen,
}: PlayerControlsProps) {
  return (
    <Stack spacing={1} sx={bar} style={{ opacity: visible ? 1 : 0 }} aria-hidden={!visible}>
      <Slider
        aria-label="Progress"
        value={currentTime}
        max={duration}
        step={1}
        onChange={(_, value) => {
          if (typeof value === "number") {
            onSeekTo(value);
          }
        }}
        sx={progress}
      />
      <Box sx={row}>
        <IconButton aria-label={playing ? "Pause" : "Play"} onClick={onToggle} sx={button}>
          <PlayerIcon name={playing ? "pause" : "play"} sx={icon} />
        </IconButton>
        <IconButton aria-label="Back 10 seconds" onClick={() => onSeekBy(-10)} sx={button}>
          <PlayerIcon name="replay" sx={icon} />
        </IconButton>
        <IconButton aria-label="Forward 10 seconds" onClick={() => onSeekBy(10)} sx={button}>
          <PlayerIcon name="forward" sx={icon} />
        </IconButton>
        <IconButton aria-label={muted ? "Unmute" : "Mute"} onClick={onToggleMute} sx={button}>
          <PlayerIcon name={muted ? "muted" : "volume"} sx={icon} />
        </IconButton>
        <Typography sx={time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
        <Box sx={grow} />
        <IconButton
          aria-label={fullscreen ? "Exit full screen" : "Full screen"}
          onClick={onToggleFullscreen}
          sx={button}
        >
          <PlayerIcon name={fullscreen ? "exitFullscreen" : "fullscreen"} sx={icon} />
        </IconButton>
      </Box>
    </Stack>
  );
}
