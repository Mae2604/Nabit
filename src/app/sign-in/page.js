import SignInComponent from '../components/login/page'
import { redirect } from "next/navigation"
import { auth } from "../../auth"
import { headers } from "next/headers"
export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect("/dashboard")
  }
  return (
    <SignInComponent/>
  );
}
