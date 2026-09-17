import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FullscreenPlayer } from "@/components/FullscreenPlayer";
import { getMovie } from "@/lib/api";

export type WatchPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return { title: movie === null ? "webshow" : `Watch ${movie.title}` };
}

// Reached by a direct load or refresh: the player is the whole page, and Back goes home
export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    notFound();
  }

  return <FullscreenPlayer movie={movie} exit="home" />;
}
