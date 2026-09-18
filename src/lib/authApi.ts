import { apiUrl } from "@/lib/api";
import type { AuthResponse, SessionTokens, User } from "@/lib/types";

// A failed sign-in is an ordinary outcome with something to show the visitor, not an exception
export type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

function errorMessage(payload: unknown): string {
  if (typeof payload === "object" && payload !== null && "error" in payload) {
    const { error } = payload as { error: { message?: unknown } };

    if (typeof error?.message === "string") {
      return error.message;
    }
  }

  return "Something went wrong. Please try again.";
}

async function post<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Signing out answers 204 with no body
  if (res.status === 204) {
    return { ok: true, data: null as T };
  }

  const payload: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    return { ok: false, message: errorMessage(payload) };
  }

  return { ok: true, data: payload as T };
}

export function register(email: string, password: string, displayName: string) {
  return post<AuthResponse>("/auth/register", { email, password, displayName });
}

export function login(email: string, password: string) {
  return post<AuthResponse>("/auth/login", { email, password });
}

export function refreshTokens(refreshToken: string) {
  return post<SessionTokens>("/auth/refresh", { refreshToken });
}

export function revokeRefreshToken(refreshToken: string) {
  return post<null>("/auth/logout", { refreshToken });
}

// Null for any reason the token will not do: missing, expired, revoked user
export async function getUser(accessToken: string): Promise<User | null> {
  const res = await fetch(apiUrl("/auth/me"), {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const payload = (await res.json()) as { user: User };

  return payload.user;
}
