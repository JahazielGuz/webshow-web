"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

const main =
  "flex min-h-dvh flex-col items-center justify-center gap-4 bg-neutral-950 px-4 text-center";
const title = "text-lg font-semibold text-neutral-100";
const message = "text-sm text-neutral-400";
const button = cn(
  // shape + spacing
  "rounded-md px-4 py-2",
  // colour
  "bg-neutral-100 text-neutral-900",
  // interaction
  "transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={main}>
      <h1 className={title}>Something went wrong</h1>
      <p className={message}>We couldn&apos;t load the catalogue. Please try again.</p>
      <button type="button" onClick={reset} className={button}>
        Retry
      </button>
    </main>
  );
}
