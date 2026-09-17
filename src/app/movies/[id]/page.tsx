import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Browse } from "@/components/Browse";
import { getMovie } from "@/lib/api";

export type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return { title: movie === null ? "webshow" : movie.title };
}

// A direct load or refresh of a movie URL renders the browse page here, under the dialog the
// modal slot puts in front of it, so the scene looks the same as it does after a click.
// An unknown id is a real 404, and the slot renders nothing for it.
export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    notFound();
  }

  return <Browse />;
}
