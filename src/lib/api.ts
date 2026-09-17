import type { BrowseResponse, Movie, MoviesResponse } from "@/lib/types";

const baseUrl = process.env.API_BASE_URL;

if (!baseUrl) {
  throw new Error("API_BASE_URL is not set");
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getHealth() {
  return apiGet<{ status: string; uptime: number }>("/health");
}

export function getBrowse() {
  return apiGet<BrowseResponse>("/browse");
}

export type MoviesQuery = {
  genre?: string;
  page?: number;
  limit?: number;
};

// GET /movies?genre=&page=&limit= — every param is optional, so only the given ones are sent
export function getMovies(query: MoviesQuery = {}) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  return apiGet<MoviesResponse>(`/movies?${params}`);
}

export async function getMovie(id: string): Promise<Movie | null> {
  const res = await fetch(`${baseUrl}/movies/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`GET /movies/${id} failed with ${res.status}`);
  }

  const movie = (await res.json()) as Movie;
  return movie;
}
