import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";
import { getSession } from "@/lib/session";
import { neutral } from "@/lib/tokens";

export const metadata: Metadata = { title: "Account — webshow" };

const main: SxProps<Theme> = { minHeight: "100dvh", bgcolor: neutral[950], pt: 12, pb: 6, px: 2 };
const column: SxProps<Theme> = { mx: "auto", width: "min(100%, 32rem)" };
const heading: SxProps<Theme> = { fontSize: "1.75rem", fontWeight: 700, color: neutral[100] };
const sheet: SxProps<Theme> = { p: 3, borderRadius: 2, bgcolor: neutral[900] };
const label: SxProps<Theme> = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  color: neutral[400],
};
const value: SxProps<Theme> = { fontSize: "1rem", color: neutral[100] };

export default async function AccountPage() {
  const user = await getSession();

  // Nothing here belongs to a visitor without a session
  if (user === null) {
    redirect("/login");
  }

  const since = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box component="main" sx={main}>
      <Stack spacing={3} sx={column}>
        <Typography component="h1" sx={heading}>
          Account
        </Typography>
        <Stack spacing={2.5} sx={sheet}>
          <Box>
            <Typography sx={label}>Name</Typography>
            <Typography sx={value}>{user.displayName}</Typography>
          </Box>
          <Box>
            <Typography sx={label}>Email</Typography>
            <Typography sx={value}>{user.email}</Typography>
          </Box>
          <Box>
            <Typography sx={label}>Member since</Typography>
            <Typography sx={value}>{since}</Typography>
          </Box>
        </Stack>
        <Box>
          <SignOutButton />
        </Box>
      </Stack>
    </Box>
  );
}
