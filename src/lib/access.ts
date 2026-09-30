import { cache } from "react";
import { getMovies } from "@/lib/api";
import { getSession } from "@/lib/session";

// What a visitor gets without an account: a sample of the catalogue rather than a locked door.
// /movies sorts by popularity, so the sample follows the catalogue instead of being a hand-kept
// list that goes stale the next time the data changes.
export const FREE_TITLE_COUNT = 5;

// The sample, and the size of the catalogue behind it. Cached for the request, so the page that
// lists these titles and the check that guards the rest share one call.
export const freeTitles = cache(async () => {
  const { items, total } = await getMovies({ limit: FREE_TITLE_COUNT });

  return { items, total };
});

// Whether this visitor may open a film at all. An account opens the catalogue; without one only
// the sample does. Every route that can reach a film asks this, so the rule has one home.
export async function canOpen(movieId: string): Promise<boolean> {
  const user = await getSession();

  if (user !== null) {
    return true;
  }

  const { items } = await freeTitles();

  return items.some((movie) => movie.id === movieId);
}
