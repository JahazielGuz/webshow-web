import { notFound } from "next/navigation";
import { MovieDetail } from "@/components/MovieDetail";
import { MovieModal } from "@/components/MovieModal";
import { getMovie } from "@/lib/api";
import { randomStart } from "@/lib/youtube";

export type MovieModalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieModalPage({ params }: MovieModalPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    notFound();
  }

  const start = randomStart();

  return (
    <MovieModal title={movie.title}>
      <MovieDetail movie={movie} start={start} />
    </MovieModal>
  );
}
