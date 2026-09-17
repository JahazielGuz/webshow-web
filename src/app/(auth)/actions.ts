"use server";

import { redirect } from "next/navigation";
import * as authApi from "@/lib/authApi";
import { clearSession, readRefreshToken, startSession } from "@/lib/session";
import type { AuthFormState } from "@/lib/types";

const MIN_PASSWORD = 8;

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export async function signIn(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (email === "" || password === "") {
    return { message: "Enter your email and password." };
  }

  const result = await authApi.login(email, password);

  if (!result.ok) {
    return { message: result.message };
  }

  await startSession(result.data);
  redirect("/");
}

export async function signUp(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const displayName = field(formData, "displayName");
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (displayName === "" || email === "") {
    return { message: "Enter your name and email." };
  }

  // Said here as well as in the API, so the visitor hears it in their own words
  if (password.length < MIN_PASSWORD) {
    return { message: `Use at least ${MIN_PASSWORD} characters for your password.` };
  }

  const result = await authApi.register(email, password, displayName);

  if (!result.ok) {
    return { message: result.message };
  }

  await startSession(result.data);
  redirect("/");
}

export async function signOut() {
  const refreshToken = await readRefreshToken();

  // Revoke it at the API as well, so the session cannot be resumed with a stolen copy
  if (refreshToken !== undefined) {
    await authApi.revokeRefreshToken(refreshToken);
  }

  await clearSession();
  redirect("/");
}
