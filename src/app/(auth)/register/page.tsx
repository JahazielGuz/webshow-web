import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signUp } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/AuthForm";
import { NavLink } from "@/components/NavLink";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Create an account — webshow" };

export default async function RegisterPage() {
  const user = await getSession();

  if (user !== null) {
    redirect("/");
  }

  return (
    <AuthForm
      heading="Create an account"
      submitLabel="Create account"
      withName
      action={signUp}
      footer={
        <>
          Already have one? <NavLink href="/login">Sign in</NavLink>.
        </>
      }
    />
  );
}
