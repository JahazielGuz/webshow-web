"use client";

import { Box, IconButton, InputBase, SvgIcon } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { focusRing, neutral, transition } from "@/lib/tokens";

// Long enough that a word is typed before the first request, short enough to feel immediate
const DEBOUNCE_MS = 250;

const icons = {
  search:
    "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  close:
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
};

const button: SxProps<Theme> = {
  color: neutral[300],
  transition,
  "&:hover": { color: "#fff", bgcolor: "transparent" },
  ...focusRing,
};
const field: SxProps<Theme> = {
  // the open box: a bordered strip holding the icon, the input and the clear button
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  pl: 1,
  border: `1px solid ${neutral[700]}`,
  borderRadius: 1,
  bgcolor: "rgba(0, 0, 0, 0.75)",
};
const input: SxProps<Theme> = {
  width: { xs: 160, sm: 240 },
  fontSize: "0.875rem",
  color: "#fff",
  "& input::placeholder": { color: neutral[400], opacity: 1 },
};
const glyph: SxProps<Theme> = { fontSize: 22 };

export function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("q") ?? "";
  const [open, setOpen] = useState(active !== "");
  const [value, setValue] = useState(active);
  const inputRef = useRef<HTMLInputElement>(null);

  // The last query this box put in the URL. Compared against, rather than against what is in the
  // URL now, because those differ for a second reason: opening a film's dialog navigates to
  // /movies/:id and takes the query string with it. Correcting that would bounce the viewer
  // straight back out of the dialog they just opened, which is what it used to do.
  const pushed = useRef(active);

  // Typing drives the URL, and the URL drives the page. Debounced, so a word costs one request
  // rather than one per letter.
  useEffect(() => {
    if (value === pushed.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      const trimmed = value.trim();

      pushed.current = trimmed;
      router.replace(trimmed === "" ? "/" : `/?q=${encodeURIComponent(trimmed)}`);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [value, router]);

  function show() {
    setOpen(true);
    // the input does not exist until this render commits
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  // Closing is also how you leave the results, so it clears the query as well as the box
  function close() {
    setOpen(false);
    setValue("");
    pushed.current = "";
    router.replace("/");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      close();
    }
  }

  if (!open) {
    return (
      <IconButton aria-label="Search" onClick={show} sx={button}>
        <SvgIcon sx={glyph}>
          <path d={icons.search} />
        </SvgIcon>
      </IconButton>
    );
  }

  return (
    <Box sx={field} onKeyDown={handleKeyDown}>
      <SvgIcon aria-hidden="true" sx={{ ...glyph, color: neutral[400] }}>
        <path d={icons.search} />
      </SvgIcon>
      <InputBase
        inputRef={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Titles, names, genres"
        inputProps={{ "aria-label": "Search titles, names and genres" }}
        sx={input}
      />
      <IconButton aria-label="Close search" onClick={close} sx={button}>
        <SvgIcon sx={glyph}>
          <path d={icons.close} />
        </SvgIcon>
      </IconButton>
    </Box>
  );
}
