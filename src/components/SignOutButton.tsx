import { Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { signOut } from "@/app/(auth)/actions";
import { focusRing, neutral, transition } from "@/lib/tokens";

const button: SxProps<Theme> = {
  // quiet outline next to the name
  minWidth: 0,
  px: 1.5,
  py: 0.5,
  borderRadius: 1,
  fontSize: "0.875rem",
  color: neutral[300],
  transition,
  "&:hover": { color: "#fff", bgcolor: "rgba(255, 255, 255, 0.12)" },
  ...focusRing,
};

// A form rather than a click handler, so signing out is a POST that works without JavaScript
export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" sx={button}>
        Sign out
      </Button>
    </form>
  );
}
