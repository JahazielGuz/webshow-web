// 118 -> "1h 58m", 120 -> "2h", 45 -> "45m"
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) {
    return `${rest}m`;
  }

  if (rest === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${rest}m`;
}

// 83 -> "1:23", 3723 -> "1:02:03"
export function formatTime(totalSeconds: number): string {
  const seconds = Math.floor(totalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, "0");

  if (hours === 0) {
    return `${minutes}:${rest}`;
  }

  return `${hours}:${String(minutes).padStart(2, "0")}:${rest}`;
}
