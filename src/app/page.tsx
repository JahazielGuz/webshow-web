import { GenreRow } from "@/components/GenreRow";
import { getBrowse } from "@/lib/api";

const main = "min-h-dvh bg-neutral-950 py-6 ";
const stack = "space-y-8";
const empty = "px-4 py-16 text-center text-neutral-400 md:px-6";

export default async function HomePage() {
  const { rows } = await getBrowse();

  if (rows.length === 0) {
    return (
      <main className={main}>
        <p className={empty}>No movies to show yet.</p>
      </main>
    );
  }

  return (
    <main className={main}>
      <div className={stack}>
        {rows.map(({ genre, movies }, index) => (
          <GenreRow key={genre.id} genre={genre} movies={movies} priority={index === 0} />
        ))}
      </div>
    </main>
  );
}
