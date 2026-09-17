// The "v" search param of a full watch URL (https://www.youtube.com/watch?v=KEY)
export function youtubeVideoId(watchUrl: string): string | null {
  const url = new URL(watchUrl);
  return url.searchParams.get("v");
}

// A random offset 10-60s into the trailer so the ambient clip skips the intro
export function randomStart(): number {
  return 10 + Math.floor(Math.random() * 51);
}
