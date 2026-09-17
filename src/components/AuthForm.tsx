"use client";

import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useActionState } from "react";
import type { ReactNode } from "react";
import { focusRing, neutral, transition } from "@/lib/tokens";
import type { AuthFormState } from "@/lib/types";

const card: SxProps<Theme> = {
  // centred sheet, full width on a phone
  width: "min(100%, 26rem)",
  p: { xs: 3, sm: 4 },
  borderRadius: 2,
  bgcolor: "rgba(23, 23, 23, 0.9)",
  color: neutral[100],
};
const heading: SxProps<Theme> = { fontSize: "2rem", fontWeight: 700, pb: 1 };
const input: SxProps<Theme> = {
  // filled grey field on the dark sheet
  "& .MuiFilledInput-root": {
    borderRadius: 1,
    bgcolor: neutral[800],
    "&:hover, &.Mui-focused": { bgcolor: neutral[700] },
  },
};
const submit: SxProps<Theme> = {
  // primary button
  py: 1.25,
  borderRadius: 1,
  fontSize: "1rem",
  fontWeight: 600,
  bgcolor: "#fff",
  color: neutral[900],
  transition,
  "&:hover": { bgcolor: neutral[200] },
  "&.Mui-disabled": { bgcolor: neutral[400], color: neutral[900] },
  ...focusRing,
};
const note: SxProps<Theme> = {
  // the link to the other form, in the theme's own colours rather than MUI's default blue
  pt: 1,
  fontSize: "0.875rem",
  color: neutral[400],
  "& a": { color: neutral[100], textDecoration: "underline" },
};

export type AuthFormProps = {
  heading: string;
  submitLabel: string;
  // Only creating an account asks for a name
  withName: boolean;
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  footer: ReactNode;
};

export function AuthForm({ heading: title, submitLabel, withName, action, footer }: AuthFormProps) {
  const [state, submitAction, pending] = useActionState(action, { message: null });

  return (
    <Box component="form" action={submitAction} sx={card}>
      <Stack spacing={2}>
        <Typography component="h1" sx={heading}>
          {title}
        </Typography>

        {state.message !== null && <Alert severity="error">{state.message}</Alert>}

        {withName && (
          <TextField
            name="displayName"
            label="Name"
            variant="filled"
            required
            autoComplete="name"
            sx={input}
          />
        )}
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="filled"
          required
          autoComplete="email"
          sx={input}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="filled"
          required
          autoComplete={withName ? "new-password" : "current-password"}
          sx={input}
        />

        <Button type="submit" disabled={pending} sx={submit}>
          {pending ? "One moment…" : submitLabel}
        </Button>

        <Typography sx={note}>{footer}</Typography>
      </Stack>
    </Box>
  );
}
