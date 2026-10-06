import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { FreeTitles } from "@/components/FreeTitles";
import { JoinFaq } from "@/components/JoinFaq";
import { JoinReasons } from "@/components/JoinReasons";
import { LandingHero, joinButton } from "@/components/LandingHero";
import { NavLink } from "@/components/NavLink";
import { freeTitles } from "@/lib/access";
import { getMovie } from "@/lib/api";
import { gutter, neutral } from "@/lib/tokens";

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pb: 10 };
const sections: SxProps<Theme> = { pt: 6 };
const closing: SxProps<Theme> = { px: gutter, alignItems: "center", textAlign: "center" };
const closingHeading: SxProps<Theme> = {
  fontSize: { xs: "1.5rem", md: "2rem" },
  fontWeight: 700,
  color: neutral[100],
};
const closingBody: SxProps<Theme> = { fontSize: "1.0625rem", color: neutral[400] };

// The home page for a visitor with no account: what the catalogue is, five titles to prove it,
// and what an account adds. The catalogue itself lives behind the sign-up.
export async function Landing() {
  const { items: movies, total } = await freeTitles();
  const [mostPopular] = movies;
  // the hero borrows the most popular film's backdrop; the summaries in the row have no
  // backdrop of their own, so this is the one extra call the page makes
  const featured = mostPopular === undefined ? null : await getMovie(mostPopular.id);

  return (
    <Box component="main" sx={main}>
      <LandingHero movie={featured} />
      <Stack spacing={7} sx={sections}>
        <FreeTitles movies={movies} />
        <JoinReasons />
        <JoinFaq />
        <Stack spacing={2} sx={closing}>
          <Typography component="h2" sx={closingHeading}>
            Ready to watch?
          </Typography>
          <Typography sx={closingBody}>
            An email and a password, and the other {total - movies.length} films are yours.
          </Typography>
          <NavLink href="/register" sx={joinButton}>
            Get started
          </NavLink>
        </Stack>
      </Stack>
    </Box>
  );
}
