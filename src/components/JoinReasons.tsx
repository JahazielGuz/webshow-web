import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { neutral } from "@/lib/tokens";

const section: SxProps<Theme> = { px: { xs: 2, md: 3 } };
const heading: SxProps<Theme> = {
  fontSize: { xs: "1.5rem", md: "2rem" },
  fontWeight: 700,
  color: neutral[100],
};
const grid: SxProps<Theme> = {
  display: "grid",
  gap: 2,
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
};
const card: SxProps<Theme> = {
  p: 3,
  borderRadius: 2,
  bgcolor: neutral[900],
  // a hairline so the cards read as cards against a near-black page
  border: `1px solid ${neutral[800]}`,
};
const cardTitle: SxProps<Theme> = {
  fontSize: "1.125rem",
  fontWeight: 600,
  color: neutral[100],
};
const cardBody: SxProps<Theme> = { fontSize: "0.9375rem", lineHeight: 1.6, color: neutral[400] };

// Each of these is a feature an account actually switches on, described in the terms the app
// enforces. Nothing here is aspirational: the numbers are the ones in the code.
const reasons = [
  {
    title: "Pick up where you left off",
    body: "Your place is saved every ten seconds. Open the film again and it starts from that second, on any device you sign in on.",
  },
  {
    title: "A row that remembers",
    body: "Keep watching gathers everything you started and did not finish, most recent first, with a progress bar on every poster.",
  },
  {
    title: "Recommendations from what you finish",
    body: "Finish a trailer and a Because you watched row appears, built from what that film is about rather than the genre printed on it.",
  },
  {
    title: "The rest of the catalogue",
    body: "A thousand films across every genre, with cast, runtime and a trailer for each one, instead of the five on this page.",
  },
];

export function JoinReasons() {
  return (
    <Stack component="section" spacing={2.5} sx={section}>
      <Typography component="h2" sx={heading}>
        More reasons to sign up
      </Typography>
      <Box sx={grid}>
        {reasons.map((reason) => (
          <Stack key={reason.title} spacing={1} sx={card}>
            <Typography component="h3" sx={cardTitle}>
              {reason.title}
            </Typography>
            <Typography sx={cardBody}>{reason.body}</Typography>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}
