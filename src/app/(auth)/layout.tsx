import { getSession } from "@/server/lucia/lucia"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  if (session?.user || session?.session) {
    redirect("/")
  }
  return (
    <>
      {children}
    </>
  )
}
