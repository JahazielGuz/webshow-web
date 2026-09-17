import Image from "next/image";
import type { Actor } from "@/lib/types";

const headshot = "relative size-16 overflow-hidden rounded-full bg-neutral-700";
const image = "object-cover";
const initials =
  "flex size-16 items-center justify-center rounded-full bg-neutral-700 text-lg font-medium text-neutral-200";

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
      <div className={initials} aria-hidden="true">
        {initialsOf(actor.name)}
      </div>
    );
  }

  return (
    <div className={headshot}>
      <Image src={actor.profileUrl} alt="" fill sizes="64px" className={image} />
    </div>
  );
}
