"use client";

import { Link } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import NextLink from "next/link";
import type { ReactNode } from "react";

export type NavLinkProps = {
  href: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
};

// A styled client-side navigation link that Server Components can render
export function NavLink({ href, sx, children }: NavLinkProps) {
  return (
    <Link component={NextLink} href={href} underline="none" sx={sx}>
      {children}
    </Link>
  );
}
