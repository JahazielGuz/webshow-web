import type { MovieSummary } from "@/lib/types";
import { apiUrl } from "@/lib/api";

// Long enough for a cold start on a machine that scales to zero, short enough that a row cannot
// hold up a page. Whatever happens, a failure here hides a row rather than breaking a page.
const TIMEOUT_MS = 4000;

type SimilarItem = { movieId: string; score: number };

// Ids and scores from the recommendations service. It does not own titles or posters, so this
// is only half an answer; the catalogue turns the ids back into films.
async function similarIds(movieId: string, limit: number): Promise<string[]> {
  const baseUrl = process.env.RECOMMENDATIONS_BASE_URL;

  if (baseUrl === undefined) {
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/similar/${movieId}?limit=${limit}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const body: { items: SimilarItem[] } = await res.json();

    return body.items.map((item) => item.movieId);
  } catch {
    // A film with no vector, a service that is down, or one still waking up. All three mean
    // "no row", which is the first time this site depends on a second service being reachable.
    return [];
  }
}

export async function similarMovies(movieId: string, limit: number): Promise<MovieSummary[]> {
  const ids = await similarIds(movieId, limit);

  if (ids.length === 0) {
    return [];
  }

  // One request for all of them, and the catalogue returns them in the order asked, because
  // that order is the ranking the recommendations service computed.
  const res = await fetch(apiUrl(`/movies?ids=${ids.join(",")}`), { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  const body: { items: MovieSummary[] } = await res.json();

  return body.items;
}
