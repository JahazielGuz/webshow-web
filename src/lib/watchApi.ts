import { apiUrl } from "@/lib/api";
import type { KeepWatchingItem, ResumePoint } from "@/lib/types";

// Progress is reported, not requested: the player is the only thing that knows the position, and
// nothing is waiting on the answer, so a failure here is swallowed rather than shown. Losing one
// report costs a few seconds of memory; an error screen over a playing trailer costs the viewing.
export async function putProgress(
  accessToken: string,
  movieId: string,
  positionSeconds: number,
  durationSeconds: number,
): Promise<void> {
  try {
    await fetch(apiUrl(`/watch-progress/${movieId}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ positionSeconds, durationSeconds }),
      cache: "no-store",
    });
  } catch {
    // The viewer is watching a film; they do not need to hear about this
  }
}

export async function getResumePoint(
  accessToken: string,
  movieId: string,
): Promise<ResumePoint | null> {
  const res = await fetch(apiUrl(`/watch-progress/${movieId}`), {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const point = await res.json();

  return point;
}

export type WatchStatus = "in-progress" | "completed";

// The two home page rows read opposite sides of the same flag: Keep watching wants what is
// unfinished, "Because you watched" wants what is done.
export async function getWatchProgress(
  accessToken: string,
  status: WatchStatus,
): Promise<KeepWatchingItem[]> {
  const res = await fetch(apiUrl(`/watch-progress?status=${status}`), {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const body = await res.json();

  return body.items;
}
