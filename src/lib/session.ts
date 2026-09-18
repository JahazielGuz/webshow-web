import { cookies } from "next/headers";
import { cache } from "react";
import { getUser } from "@/lib/authApi";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  REFRESH_COOKIE_SECONDS,
  cookieOptions,
} from "@/lib/sessionCookies";
import type { SessionTokens, User } from "@/lib/types";

// Who is signed in, or null. Cached for the request, so a page and its header share one call.
export const getSession = cache(async (): Promise<User | null> => {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  if (accessToken === undefined) {
    return null;
  }

  const user = await getUser(accessToken);

  return user;
});

// Only a Server Action or a Route Handler may write cookies, which is why signing in and out
// are actions rather than something a page does while rendering
export async function startSession(tokens: SessionTokens) {
  const store = await cookies();

  store.set(ACCESS_COOKIE, tokens.accessToken, cookieOptions(tokens.expiresIn));
  store.set(REFRESH_COOKIE, tokens.refreshToken, cookieOptions(REFRESH_COOKIE_SECONDS));
}

export async function readRefreshToken(): Promise<string | undefined> {
  const store = await cookies();

  return store.get(REFRESH_COOKIE)?.value;
}

export async function clearSession() {
  const store = await cookies();

  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}
