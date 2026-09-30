import { redirect } from "next/navigation";
import { FullscreenPlayer } from "@/components/FullscreenPlayer";
import { canOpen } from "@/lib/access";
import { getMovie } from "@/lib/api";
import { resumeSeconds } from "@/lib/watchProgress";

export type WatchOverlayPageProps = {
  params: Promise<{ id: string }>;
};

// Reached by a client-side navigation: the player renders into the modal slot, over the page
// the viewer was on, so browsing state and scroll position survive. Back returns there.
export default async function WatchOverlayPage({ params }: WatchOverlayPageProps) {
  const { id } = await params;

  if (!(await canOpen(id))) {
    redirect("/register");
  }

  const movie = await getMovie(id);
  const startAt = await resumeSeconds(id);

  return <FullscreenPlayer movie={movie} exit="back" resumeSeconds={startAt} />;
}
