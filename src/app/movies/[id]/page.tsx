import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MovieDetail } from "@/components/MovieDetail";
import { getMovie } from "@/lib/api";
import { randomStart } from "@/lib/youtube";

const main = "min-h-dvh bg-neutral-950 py-6";
const column = "mx-auto max-w-3xl space-y-4 px-4 md:px-6";
const back = "inline-block text-sm text-neutral-400 transition hover:text-white";
const sheet = "overflow-hidden rounded-lg bg-neutral-900 text-neutral-100";

export type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return { title: movie === null ? "webshow" : movie.title };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie === null) {
    notFound();
  }

  const start = randomStart();

  return (
    <main className={main}>
      <div className={column}>
        <Link href="/" className={back}>
          &larr; Back to home
        </Link>
        <div className={sheet}>
          <MovieDetail movie={movie} start={start} />
        </div>
      </div>
    </main>
  );
}
