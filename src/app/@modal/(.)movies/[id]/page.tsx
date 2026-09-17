import { MovieDetail } from "@/components/MovieDetail";
import { MovieModal } from "@/components/MovieModal";
import { getMovie } from "@/lib/api";
import { randomStart } from "@/lib/youtube";

const missing = "space-y-2 p-6 pr-14";
const missingTitle = "text-2xl font-bold";
const missingText = "text-neutral-400";

export type MovieModalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieModalPage({ params }: MovieModalPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  // A stale link (for example after a reseed) gets a small message, not a full-page 404
  if (movie === null) {
    return (
      <MovieModal title="Movie not found">
        <div className={missing}>
          <h2 id="movie-title" className={missingTitle}>
            Movie not found
          </h2>
          <p className={missingText}>That movie is no longer in the catalogue.</p>
        </div>
      </MovieModal>
    );
  }

  const start = randomStart();

  return (
    <MovieModal title={movie.title}>
      <MovieDetail movie={movie} start={start} />
    </MovieModal>
  );
}
