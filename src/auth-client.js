import { createAuthClient } from "better-auth/client";
import { redirect } from "next/navigation"
const authClient = createAuthClient();

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard"
  });
};

export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/sign-in")
      }
    }
  })
}