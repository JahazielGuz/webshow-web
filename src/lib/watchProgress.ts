import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/sessionCookies";
import { getResumePoint, getWatchProgress } from "@/lib/watchApi";
import type { KeepWatchingItem, MovieSummary } from "@/lib/types";

// Where to start a film for the signed-in viewer. Zero for everyone else, and for anyone who
// has already finished it, so a completed trailer replays from the beginning.
export async function resumeSeconds(movieId: string): Promise<number> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  if (accessToken === undefined) {
    return 0;
  }

  const point = await getResumePoint(accessToken, movieId);

  return point?.positionSeconds ?? 0;
}

// Unfinished films for the signed-in viewer, newest first. An empty list for everyone else,
// which is what makes the row vanish rather than render empty.
export async function keepWatching(): Promise<KeepWatchingItem[]> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  if (accessToken === undefined) {
    return [];
  }

  const items = await getWatchProgress(accessToken, "in-progress");

  return items;
}

// The film the viewer most recently finished, or null. Completion rather than progress is
// deliberate: "because you watched" is a claim about something they saw, not started.
export async function lastCompleted(): Promise<MovieSummary | null> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  if (accessToken === undefined) {
    return null;
  }

  const items = await getWatchProgress(accessToken, "completed");

  return items[0]?.movie ?? null;
}
