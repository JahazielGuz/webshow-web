import Link from "next/link";
import { cn } from "@/lib/cn";

const main =
  "flex min-h-dvh flex-col items-center justify-center gap-4 bg-neutral-950 px-4 text-center";
const title = "text-lg font-semibold text-neutral-100";
const message = "text-sm text-neutral-400";
const home = cn(
  // pill
  "rounded-full px-4 py-2 text-sm font-medium",
  // colour
  "bg-neutral-100 text-neutral-900",
  // interaction
  "transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);

export default function NotFound() {
  return (
    <main className={main}>
      <h1 className={title}>Movie not found</h1>
      <p className={message}>That movie is not in the catalogue.</p>
      <Link href="/" className={home}>
        Back to home
      </Link>
    </main>
  );
}
