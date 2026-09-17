import type { Genre } from "@/lib/types";

const row = "flex flex-wrap gap-2";
const chip = "rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200";

export type GenreChipsProps = {
  genres: Genre[];
};

export function GenreChips({ genres }: GenreChipsProps) {
  if (genres.length === 0) {
    return null;
  }

  return (
    <div className={row}>
      {genres.map((genre) => (
        <span key={genre.id} className={chip}>
          {genre.name}
        </span>
      ))}
    </div>
  );
}
