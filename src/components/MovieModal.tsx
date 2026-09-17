"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const dialog = cn(
  // centred sheet that scrolls inside itself
  "fixed inset-0 m-auto max-h-[90dvh] w-[min(100%-2rem,56rem)] overflow-y-auto",
  // surface
  "rounded-lg bg-neutral-900 p-0 text-neutral-100",
  // dimmed page behind it
  "backdrop:bg-black/70",
);
const close = cn(
  // pinned top-right, above the trailer
  "absolute top-3 right-3 z-10",
  // round icon button
  "flex size-9 items-center justify-center rounded-full bg-neutral-900/80 text-2xl leading-none",
  // interaction
  "transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);

export type MovieModalProps = {
  title: string;
  children: ReactNode;
};

export function MovieModal({ title, children }: MovieModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() puts the dialog in the top layer and traps focus for us
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function goBack() {
    router.back();
  }

  // Esc takes the same single close path as the button and the backdrop
  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      dialogRef.current?.close();
    }
  }

  // Only clicks on the ::backdrop have the dialog itself as target
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      goBack();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={dialog}
      aria-labelledby="movie-title"
      aria-label={title}
      onClose={goBack}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <button type="button" aria-label="Close" className={close} onClick={goBack}>
        &times;
      </button>
      {children}
    </dialog>
  );
}
