"use server";

import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/sessionCookies";
import { putProgress } from "@/lib/watchApi";

// Called from the player on a timer and once more when it closes. A server action rather than a
// route handler so the token never leaves the server, and so there is no endpoint of our own to
// protect. Signed-out viewers reach the early return and no request is made at all.
export async function reportProgress(
  movieId: string,
  positionSeconds: number,
  durationSeconds: number,
) {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  if (accessToken === undefined || durationSeconds <= 0) {
    return;
  }

  await putProgress(accessToken, movieId, Math.floor(positionSeconds), Math.floor(durationSeconds));
}
