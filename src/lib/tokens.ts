// The neutral scale the design is built on (the same hex values Tailwind's `neutral` palette used)
export const neutral = {
  950: "#0a0a0a",
  900: "#171717",
  800: "#262626",
  700: "#404040",
  400: "#a3a3a3",
  300: "#d4d4d4",
  200: "#e5e5e5",
  100: "#f5f5f5",
} as const;

// 150 ms ease on the properties Tailwind's `transition` utility covered
export const transition = [
  "color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)",
].join(", ");

// White 2px keyboard focus ring, only for :focus-visible
export const focusRing = {
  "&:focus": { outline: "none" },
  "&:focus-visible": { boxShadow: "0 0 0 2px #fff" },
} as const;
