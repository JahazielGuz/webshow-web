// What the session looks like on the wire. The middleware and the server actions both need
// these, and the middleware cannot use the request-scoped helpers in session.ts.

export const ACCESS_COOKIE = "webshow_access";
export const REFRESH_COOKIE = "webshow_refresh";

// The refresh cookie outlives the access cookie by a month; the API decides the real lifetimes
// and this only has to agree with them
export const REFRESH_COOKIE_SECONDS = 30 * 24 * 60 * 60;

// httpOnly so no script can read a token, lax so following a link into the site keeps the
// session while a cross-site form post does not carry it
export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  } as const;
}
