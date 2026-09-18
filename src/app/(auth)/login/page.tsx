import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signIn } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/AuthForm";
import { NavLink } from "@/components/NavLink";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in — webshow" };

export default async function LoginPage() {
  const user = await getSession();

  if (user !== null) {
    redirect("/");
  }

  return (
    <AuthForm
      heading="Sign in"
      submitLabel="Sign in"
      withName={false}
      action={signIn}
      footer={
        <>
          New to webshow? <NavLink href="/register">Create an account</NavLink>.
        </>
      }
    />
  );
}
