import { NextResponse, type NextRequest } from "next/server";
import { refreshTokens } from "@/lib/authApi";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  REFRESH_COOKIE_SECONDS,
  cookieOptions,
} from "@/lib/sessionCookies";

// The browser drops the access cookie the moment it expires. If the refresh cookie is still
// here, spend it for a new pair before the page renders: the visitor stays signed in for weeks
// without a long-lived token riding along on every request.
export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  if (request.cookies.has(ACCESS_COOKIE) || refreshToken === undefined) {
    return NextResponse.next();
  }

  const result = await refreshTokens(refreshToken);

  if (!result.ok) {
    // The refresh token is spent, revoked or expired: there is no session to keep
    const response = NextResponse.next();
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);

    return response;
  }

  // On the request so this render already sees the new token, on the response so the browser
  // keeps it
  request.cookies.set(ACCESS_COOKIE, result.data.accessToken);

  const response = NextResponse.next({ request });
  response.cookies.set(
    ACCESS_COOKIE,
    result.data.accessToken,
    cookieOptions(result.data.expiresIn),
  );
  response.cookies.set(
    REFRESH_COOKIE,
    result.data.refreshToken,
    cookieOptions(REFRESH_COOKIE_SECONDS),
  );

  return response;
}

// Everything except Next's own assets: a page render is the only thing that needs a session
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
