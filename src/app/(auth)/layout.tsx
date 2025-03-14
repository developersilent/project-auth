import { useSession } from "@/server/lucia/lucia"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, session } = await useSession()
  if (user || session) {
    redirect("/")
  }
  return (
    <>
      {children}
    </>
  )
}
