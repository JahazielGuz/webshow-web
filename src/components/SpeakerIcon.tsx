import { SvgIcon } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

// 20px stroked glyph
const icon: SxProps<Theme> = {
  fontSize: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export type SpeakerIconProps = {
  muted: boolean;
};

export function SpeakerIcon({ muted }: SpeakerIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" sx={icon} aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      {muted ? <path d="m23 9-6 6M17 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7" />}
    </SvgIcon>
  );
}
