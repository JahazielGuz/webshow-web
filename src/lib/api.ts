import type { BrowseResponse } from "@/lib/types";

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
