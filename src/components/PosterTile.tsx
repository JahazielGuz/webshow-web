"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { HoverCard } from "@/components/HoverCard";
import { cn } from "@/lib/cn";
import type { MovieSummary } from "@/lib/types";

const OPEN_DELAY_MS = 300;

const tile = "shrink-0";
const link = cn(
  // box + responsive width
  "group block w-32 sm:w-36 md:w-40",
  // shape
  "rounded-lg",
  // keyboard focus
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
);
const frame = cn(
  // reserve the 2:3 box before the poster loads
  "relative aspect-[2/3]",
  // shape
  "overflow-hidden rounded-lg",
  // placeholder colour while the poster streams in
  "bg-neutral-800",
);
const image = cn(
  // fill the frame
  "object-cover",
  // hover
  "transition group-hover:scale-105",
);

export type PosterTileProps = {
  movie: MovieSummary;
  priority?: boolean;
};

export function PosterTile({ movie, priority = false }: PosterTileProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timer = useRef(0);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const open = anchor !== null;

  function openCard() {
    if (linkRef.current !== null) {
      setAnchor(linkRef.current.getBoundingClientRect());
    }
  }

  function closeCard() {
    window.clearTimeout(timer.current);
    setAnchor(null);
  }

  // Hover intent: only open after the pointer has rested on the tile
  function handleMouseEnter() {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    timer.current = window.setTimeout(openCard, OPEN_DELAY_MS);
  }

  // Keyboard focus opens the card; a mouse click is already a navigation
  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    if (event.target.matches(":focus-visible")) {
      openCard();
    }
  }

  // Close once focus has left both the tile and the card
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeCard();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      closeCard();
      linkRef.current?.focus();
    }
  }

  // The card is pinned to the viewport, so any scroll or resize would detach it
  useEffect(() => {
    if (!open) {
      return;
    }

    function close() {
      setAnchor(null);
    }

    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <div
      className={tile}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={closeCard}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link ref={linkRef} href={`/movies/${movie.id}`} className={link} aria-expanded={open}>
        <div className={frame}>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
            priority={priority}
            className={image}
          />
        </div>
      </Link>
      {anchor !== null && <HoverCard movie={movie} anchor={anchor} />}
    </div>
  );
}
