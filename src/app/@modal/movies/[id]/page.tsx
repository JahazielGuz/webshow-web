import { MovieDetail } from "@/components/MovieDetail";
import { MovieModal } from "@/components/MovieModal";
import { getMovie } from "@/lib/api";
import { randomStart } from "@/lib/youtube";

export type MovieOverlayPageProps = {
  params: Promise<{ id: string }>;
};

// A direct load or refresh of a movie URL: the dialog belongs in the modal slot, over the
// browse page the route below renders. Closing it goes to the browse page, since there is no
// history to step back to. An unknown id renders nothing and the route below answers 404.
export default async function MovieOverlayPage({ params }: MovieOverlayPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    return null;
  }

  const start = randomStart();

  return (
    <MovieModal title={movie.title} exit="home">
      <MovieDetail movie={movie} start={start} />
    </MovieModal>
  );
}
