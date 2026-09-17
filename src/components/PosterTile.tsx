"use client";

import { Box, Link } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import NextLink from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { HoverCard } from "@/components/HoverCard";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { MovieSummary } from "@/lib/types";

const OPEN_DELAY_MS = 300;

const tile: SxProps<Theme> = { flexShrink: 0 };
const link: SxProps<Theme> = {
  // box + responsive width
  display: "block",
  width: { xs: 128, sm: 144, md: 160 },
  // shape
  borderRadius: 2,
  // hover zooms the poster
  "&:hover img": { transform: "scale(1.05)" },
  // keyboard focus
  ...focusRing,
};
const frame: SxProps<Theme> = {
  // reserve the 2:3 box before the poster loads
  position: "relative",
  aspectRatio: "2 / 3",
  // shape
  overflow: "hidden",
  borderRadius: 2,
  // placeholder colour while the poster streams in
  bgcolor: neutral[800],
};
const image: CSSProperties = { objectFit: "cover", transition };

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
    <Box
      sx={tile}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={closeCard}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        ref={linkRef}
        component={NextLink}
        href={`/watch/${movie.id}`}
        underline="none"
        sx={link}
        aria-expanded={open}
      >
        <Box sx={frame}>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
            priority={priority}
            style={image}
          />
        </Box>
      </Link>
      {anchor !== null && <HoverCard movie={movie} anchor={anchor} />}
    </Box>
  );
}
