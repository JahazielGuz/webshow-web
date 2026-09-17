import { CastAvatar } from "@/components/CastAvatar";
import type { Actor } from "@/lib/types";

const section = "space-y-3";
const heading = "text-sm font-semibold text-neutral-400";
const strip = "flex gap-4 overflow-x-auto pb-2";
const item = "flex w-16 shrink-0 flex-col items-center gap-2";
const name = "max-w-[4rem] text-center text-xs break-words text-neutral-300";

export type CastStripProps = {
  cast: Actor[];
};

export function CastStrip({ cast }: CastStripProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <section className={section}>
      <h3 className={heading}>Cast</h3>
      <ul className={strip}>
        {cast.map((actor) => (
          <li key={actor.id} className={item}>
            <CastAvatar actor={actor} />
            <span className={name}>{actor.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
