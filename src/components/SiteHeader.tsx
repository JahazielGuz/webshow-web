import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { NavLink } from "@/components/NavLink";
import { SignOutButton } from "@/components/SignOutButton";
import { getSession } from "@/lib/session";
import { focusRing, neutral, transition } from "@/lib/tokens";

const bar: SxProps<Theme> = {
  // over the page, not above it, so the hero still starts at the top of the viewport
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: "appBar",
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: { xs: 2, md: 5 },
  py: { xs: 1.5, md: 2 },
  backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
};
const wordmark: SxProps<Theme> = {
  fontSize: { xs: "1.125rem", md: "1.375rem" },
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#fff",
  ...focusRing,
};
const spacer: SxProps<Theme> = { flex: 1 };
const account: SxProps<Theme> = {
  fontSize: "0.875rem",
  color: neutral[300],
  transition,
  "&:hover": { color: "#fff" },
  ...focusRing,
};
const signIn: SxProps<Theme> = {
  // primary pill
  px: 2,
  py: 0.75,
  borderRadius: 1,
  fontSize: "0.875rem",
  fontWeight: 600,
  bgcolor: "#fff",
  color: neutral[900],
  transition,
  "&:hover": { bgcolor: neutral[200] },
  ...focusRing,
};

// On every page: the wordmark, and who is signed in
export async function SiteHeader() {
  const user = await getSession();

  return (
    <Box component="header" sx={bar}>
      <NavLink href="/" sx={wordmark}>
        webshow
      </NavLink>
      <Box sx={spacer} />
      {user === null ? (
        <NavLink href="/login" sx={signIn}>
          Sign in
        </NavLink>
      ) : (
        <>
          <NavLink href="/account" sx={account}>
            {user.displayName}
          </NavLink>
          <SignOutButton />
        </>
      )}
    </Box>
  );
}
