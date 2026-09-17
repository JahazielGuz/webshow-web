import { PlayerNotice } from "@/components/PlayerNotice";
import { TrailerPlayer } from "@/components/TrailerPlayer";
import type { PlayerExit } from "@/lib/playerExit";
import type { Movie } from "@/lib/types";
import { youtubeVideoId } from "@/lib/youtube";

export type FullscreenPlayerProps = {
  movie: Movie | null;
  exit: PlayerExit;
};

// Hands the viewport to the trailer player, or explains why it cannot
export function FullscreenPlayer({ movie, exit }: FullscreenPlayerProps) {
  if (movie === null) {
    return (
      <PlayerNotice
        heading="Movie not found"
        text="That movie is no longer in the catalogue."
        backdropUrl={null}
        exit={exit}
      />
    );
  }

  const videoId = movie.trailerUrl === null ? null : youtubeVideoId(movie.trailerUrl);

  if (videoId === null) {
    return (
      <PlayerNotice
        heading={movie.title}
        text="No trailer is available for this title yet."
        backdropUrl={movie.backdropUrl}
        exit={exit}
      />
    );
  }

  return (
    <TrailerPlayer videoId={videoId} title={movie.title} coverUrl={movie.backdropUrl} exit={exit} />
  );
}
