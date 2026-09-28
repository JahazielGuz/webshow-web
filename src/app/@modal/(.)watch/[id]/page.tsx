import { FullscreenPlayer } from "@/components/FullscreenPlayer";
import { getMovie } from "@/lib/api";
import { resumeSeconds } from "@/lib/watchProgress";

export type WatchOverlayPageProps = {
  params: Promise<{ id: string }>;
};

// Reached by a client-side navigation: the player renders into the modal slot, over the page
// the viewer was on, so browsing state and scroll position survive. Back returns there.
export default async function WatchOverlayPage({ params }: WatchOverlayPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);
  const startAt = await resumeSeconds(id);

  return <FullscreenPlayer movie={movie} exit="back" resumeSeconds={startAt} />;
}
