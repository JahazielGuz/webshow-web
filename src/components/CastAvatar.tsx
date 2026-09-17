import { Avatar } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import type { CSSProperties } from "react";
import { neutral } from "@/lib/tokens";
import type { Actor } from "@/lib/types";

// 64px circle; the initials fallback is set in the same colours
const avatar: SxProps<Theme> = {
  width: 64,
  height: 64,
  bgcolor: neutral[700],
  color: neutral[200],
  fontSize: "1.125rem",
  fontWeight: 500,
};
const headshot: CSSProperties = { objectFit: "cover" };

export type CastAvatarProps = {
  actor: Actor;
};

// First letters of the first two words: "Florence Pugh" -> "FP"
function initialsOf(name: string) {
  const words = name.split(" ").slice(0, 2);
  return words.map((word) => word.charAt(0)).join("");
}

export function CastAvatar({ actor }: CastAvatarProps) {
  if (actor.profileUrl === null) {
    return (
      <Avatar sx={avatar} aria-hidden="true">
        {initialsOf(actor.name)}
      </Avatar>
    );
  }

  return (
    <Avatar sx={avatar}>
      <Image src={actor.profileUrl} alt="" fill sizes="64px" style={headshot} />
    </Avatar>
  );
}
